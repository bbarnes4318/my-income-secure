// ---------------------------------------------------------------------------
// POST /api/checkout — creates a Stripe Checkout Session.
//
// The only server-rendered route on the site; every page stays static. Requires
// STRIPE_SECRET_KEY in the container environment. Until that is set, plans fall
// back to the Payment Link path in lib/checkout.js and this route is unused.
// ---------------------------------------------------------------------------

import Stripe from 'stripe';
import { findPlan, isPlanConfigured, isPlanSellable } from '../../config/plans.js';
import { canSellIncomeProtection } from '../../config/site.js';

export const prerender = false;

const SECRET_KEY =
  import.meta.env.STRIPE_SECRET_KEY ?? process.env.STRIPE_SECRET_KEY;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Stripe caps metadata values at 500 characters. */
function clip(value) {
  if (value == null) return undefined;
  return String(value).slice(0, 500);
}

export async function POST({ request }) {
  if (!SECRET_KEY) {
    return json(
      { error: 'Checkout is not configured. STRIPE_SECRET_KEY is not set.' },
      503
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Malformed request.' }, 400);
  }

  const {
    planId,
    utms = {},
    contact = {},
    consent = {},
    surplusLines = null,
    estimate,
    returnTo,
  } = body;

  const plan = findPlan(planId);
  if (!plan || !isPlanConfigured(plan)) {
    return json({ error: 'Unknown plan.' }, 400);
  }
  if (!plan.stripePriceId) {
    return json({ error: 'This plan has no Stripe Price ID.' }, 400);
  }
  if (!contact.email) {
    return json({ error: 'An email address is required.' }, 400);
  }
  // A phone number may only be collected alongside express written consent.
  if (contact.phone && !consent.given) {
    return json({ error: 'Consent is required to submit a phone number.' }, 400);
  }
  // Income protection cannot be sold until the surplus lines notice is
  // APPROVED — draft text existing is not approval. Enforced here as well as
  // in the form, because the form is client-side and this endpoint is what
  // actually takes the money.
  if (plan.incomeProtection && !canSellIncomeProtection()) {
    return json(
      {
        error:
          'Income protection is not available for purchase yet. The surplus ' +
          'lines notice has not been approved.',
      },
      403
    );
  }
  if (!isPlanSellable(plan)) {
    return json({ error: 'This plan is not available for purchase.' }, 403);
  }
  if (plan.incomeProtection && (!surplusLines || !surplusLines.acknowledged)) {
    return json(
      { error: 'The surplus lines notice must be acknowledged.' },
      400
    );
  }

  const origin = returnTo || new URL(request.url).origin;

  const metadata = {
    plan_id: plan.id,
    plan_name: clip(plan.name),
    monthly_benefit: clip(plan.monthlyBenefit),
    total_limit: clip(plan.totalLimit),
    installments: clip(plan.installments),
    full_name: clip(contact.fullName),
    phone: clip(contact.phone),
    // TCPA: record what they agreed to, which version, and when.
    consent_given: consent.given ? 'true' : 'false',
    consent_version: clip(consent.textVersion),
    consent_timestamp: clip(consent.timestamp),
    consent_text: clip(consent.text),
    // Surplus lines: a separate acknowledgement with its own version and
    // timestamp, so it is never inferred from the marketing consent above.
    surplus_ack: surplusLines?.acknowledged ? 'true' : undefined,
    surplus_version: clip(surplusLines?.textVersion),
    surplus_timestamp: clip(surplusLines?.timestamp),
    // Attribution, as real Stripe metadata rather than a packed reference id.
    ...Object.fromEntries(
      Object.entries(utms)
        .filter(([, v]) => v)
        .map(([k, v]) => [k, clip(v)])
    ),
  };

  if (estimate) {
    metadata.est_state = clip(estimate.stateCode);
    metadata.est_monthly_benefit = clip(estimate.monthlyBenefit);
    metadata.est_monthly_expenses = clip(estimate.monthlyExpenses);
    metadata.est_monthly_gap = clip(estimate.monthlyGap);
  }

  // Drop undefined values — Stripe rejects them.
  for (const key of Object.keys(metadata)) {
    if (metadata[key] === undefined) delete metadata[key];
  }

  try {
    const stripe = new Stripe(SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: plan.stripePriceId, quantity: 1 }],
      customer_email: contact.email,
      client_reference_id: plan.id,
      metadata,
      subscription_data: { metadata },
      success_url: `${origin}/checkout/?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/?status=cancelled`,
    });
    return json({ url: session.url });
  } catch (error) {
    console.error('[checkout] Stripe session creation failed:', error);
    return json({ error: 'Could not start checkout. Please try again.' }, 502);
  }
}
