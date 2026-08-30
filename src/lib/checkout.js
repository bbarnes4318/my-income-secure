// ---------------------------------------------------------------------------
// Plan -> Stripe handoff.
//
// Two paths, chosen per-plan by what is populated in config/plans.js:
//
//   stripePriceId    -> POST /api/checkout, which creates a real Checkout
//                       Session with UTMs as Stripe metadata. Preferred.
//   stripePaymentLink -> redirect straight to a Payment Link. No backend, so
//                       attribution rides in client_reference_id, which is the
//                       only field a Payment Link carries through.
//
// If both are set the Price ID wins. Component code never chooses between them.
// ---------------------------------------------------------------------------

import { getUtms } from './storage.js';
import { track, EVENTS } from './analytics.js';

// The trailing slash is required: astro.config.mjs sets trailingSlash 'always',
// which applies to API routes as well as pages. Without it the POST 404s.
export const CHECKOUT_ENDPOINT = '/api/checkout/';

/** @returns {'session'|'payment-link'|'unavailable'} */
export function checkoutMode(plan) {
  if (!plan) return 'unavailable';
  if (plan.stripePriceId) return 'session';
  if (plan.stripePaymentLink) return 'payment-link';
  return 'unavailable';
}

/**
 * Payment Links accept only [A-Za-z0-9_-], max 200 chars, in
 * client_reference_id. Pack attribution into that budget without losing the
 * plan id, which is the part we cannot reconstruct later.
 */
function buildClientReferenceId(planId, utms) {
  const clean = (v) => String(v).replace(/[^A-Za-z0-9_-]/g, '').slice(0, 32);
  const parts = [clean(planId)];
  const short = {
    utm_source: 's',
    utm_medium: 'm',
    utm_campaign: 'c',
    utm_content: 'n',
    utm_term: 't',
  };
  for (const [key, prefix] of Object.entries(short)) {
    if (utms[key]) parts.push(`${prefix}-${clean(utms[key])}`);
  }
  return parts.join('__').slice(0, 200);
}

/**
 * Begin checkout for a plan.
 *
 * @param {object} plan            a Plan from config/plans.js
 * @param {object} context
 * @param {object} context.contact { fullName, email, phone }
 * @param {object} context.consent { given, textVersion, text, timestamp }
 * @param {object} [context.surplusLines] { acknowledged, textVersion, timestamp }
 *                                        Required by the API wherever income
 *                                        protection is sold and the notice
 *                                        wording is configured.
 * @param {object} [context.estimate] persisted calculator result, for metadata
 * @returns {Promise<void>} redirects on success; throws with a usable message
 */
export async function startCheckout(plan, context) {
  const mode = checkoutMode(plan);
  const utms = getUtms();

  track(EVENTS.CHECKOUT_START, { planId: plan?.id, mode });

  if (mode === 'unavailable') {
    throw new Error(
      'This plan is not connected to Stripe yet. Add a Price ID or a Payment Link in src/config/plans.js.'
    );
  }

  if (mode === 'payment-link') {
    const url = new URL(plan.stripePaymentLink);
    if (context?.contact?.email) {
      url.searchParams.set('prefilled_email', context.contact.email);
    }
    url.searchParams.set(
      'client_reference_id',
      buildClientReferenceId(plan.id, utms)
    );
    window.location.href = url.toString();
    return;
  }

  const response = await fetch(CHECKOUT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      planId: plan.id,
      utms,
      contact: context.contact,
      consent: context.consent,
      surplusLines: context.surplusLines || null,
      estimate: context.estimate || null,
      returnTo: window.location.origin,
    }),
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail.error || 'Could not start checkout. Please try again.');
  }

  const { url } = await response.json();
  if (!url) throw new Error('Checkout session did not return a URL.');
  window.location.href = url;
}
