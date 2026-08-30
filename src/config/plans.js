// ---------------------------------------------------------------------------
// PLAN DATA — the only file you need to edit to change pricing or terms.
//
// The benefit is a TOTAL, paid in a fixed number of installments. It is not a
// monthly benefit that runs until the member finds work. Every figure the site
// shows derives from `LADDER` below, so the total and the monthly figure can
// never drift apart.
//
// Still missing: Stripe Price IDs (see OPEN-ITEMS.md).
//
// Pricing valid for 30 days from 19 August 2026 — expires 18 September 2026.
// ---------------------------------------------------------------------------

import { canSellIncomeProtection } from './site.js';

/** Installments per approved claim, paid at 30-day intervals. */
export const INSTALLMENTS = 3;

/**
 * The full ladder: [total limit, monthly price]. These two are the only
 * authored numbers. Name and monthly benefit are derived from them.
 */
const LADDER = [
  [1000, 24.99],
  [1500, 29.99],
  [2000, 34.99],
  [2500, 39.99],
  [3000, 44.99],
  [3500, 49.99],
  [4000, 54.99],
  [4500, 59.99],
  [5000, 64.99],
  [5500, 69.99],
  [6000, 74.99],
];

/**
 * Floor, never round. On a thirds division the monthly figure has to understate
 * the installment rather than overstate it: 3 x $666 = $1,998 sits inside the
 * $2,000 limit, where 3 x $667 would exceed it and read as a discrepancy
 * against the certificate.
 */
function monthlyFrom(totalLimit) {
  return Math.floor(totalLimit / INSTALLMENTS);
}

/**
 * @typedef {object} Plan
 * @property {string} id
 * @property {string} name             "My Income Secure $2,000".
 * @property {number|null} totalLimit  The headline figure and the tier's name.
 * @property {number|null} monthlyBenefit  totalLimit / INSTALLMENTS, floored.
 *                                         What is measured against the gap.
 * @property {number} installments     How many payments the total is split into.
 * @property {number} priceMonthly     What the member is billed each month.
 * @property {boolean} incomeProtection Whether the tier includes the job-loss
 *                                      benefit at all. False for Essentials,
 *                                      which is therefore never recommended.
 * @property {string|null} stripePriceId
 * @property {string|null} stripePaymentLink
 * @property {string[]} features
 */

/** @type {Plan[]} The income-protection ladder, cheapest first. */
export const PLANS = LADDER.map(([totalLimit, priceMonthly]) => ({
  id: `mis-${totalLimit}`,
  name: `My Income Secure $${totalLimit.toLocaleString('en-US')}`,
  totalLimit,
  monthlyBenefit: monthlyFrom(totalLimit),
  installments: INSTALLMENTS,
  priceMonthly,
  incomeProtection: true,
  stripePriceId: null,
  stripePaymentLink: null,
  features: [],
}));

/**
 * The base membership. No income protection, so it is excluded from the
 * recommendation and from the tier window — it appears on /plans/ only, as the
 * entry option, and never as an answer to a shortfall.
 *
 * @type {Plan}
 */
export const ESSENTIALS = {
  id: 'essentials',
  name: 'My Income Secure — Essentials',
  totalLimit: null,
  monthlyBenefit: null,
  installments: INSTALLMENTS,
  priceMonthly: 9.99,
  incomeProtection: false,
  stripePriceId: null,
  stripePaymentLink: null,
  features: [],
};

/** Every purchasable plan, including Essentials. Used by checkout lookup. */
export const ALL_PLANS = [ESSENTIALS, ...PLANS];

/**
 * Confirmed program rules. These drive the copy directly — nothing about
 * installments, thresholds, or refunds is written by hand in a page.
 *
 * `waitingPeriodDays` is deliberately null: how long a membership must be
 * active before a job loss qualifies is a different rule from the 30-day
 * unemployment threshold below, and it has not been supplied.
 */
export const PROGRAM_TERMS = {
  /** Payments per approved claim. */
  installments: INSTALLMENTS,
  /** Days after the qualifying job loss before the first installment. */
  firstInstallmentDays: 30,
  /** Interval between installments. See OPEN-ITEMS.md: mockups say 28. */
  installmentIntervalDays: 30,
  /** Consecutive days unemployed before a claim becomes admissible. */
  claimThresholdDays: 30,
  /** Each installment after the first is paid only if still unemployed. */
  forfeitOnReemployment: true,
  /** Full refund window from purchase, if no benefits have been used. */
  refundWindowHours: 48,
  /** Window in which the insurer may cancel a certificate for prior layoffs. */
  certificateCancellationDays: 90,
  /** A claim requires approval for state unemployment for the same period. */
  requiresStateUnemployment: true,
  /** Not supplied. */
  waitingPeriodDays: null,
};

/**
 * Enrollment attestations. Each is something the member states is true of
 * them at enrollment, not a feature of the program — the wording is written in
 * the first person for that reason.
 *
 * @typedef {object} EligibilityCriterion
 * @property {string} id
 * @property {string} label
 * @property {string} [detail]  Shown smaller, beneath the label.
 * @property {boolean} required Blocks the CTA when unchecked.
 */

/** @type {EligibilityCriterion[]} */
export const ELIGIBILITY_CRITERIA = [
  {
    id: 'w2',
    label: 'I am a full-time W-2 employee',
    detail: 'Contractors and 1099 workers are not eligible.',
    required: true,
  },
  {
    id: 'employer-age',
    label: 'My employer has been incorporated for at least 3 years',
    required: true,
  },
  {
    id: 'not-principal',
    label:
      'I am not a founder, owner, controlling shareholder, board member, or ' +
      'C-suite executive of my employer',
    required: true,
  },
  {
    id: 'no-pending-layoffs',
    label:
      'I know of no pending layoffs or workforce reduction that would affect me',
    detail:
      `The certificate can be cancelled within ${PROGRAM_TERMS.certificateCancellationDays} ` +
      'days if public information shows the employer was already conducting layoffs.',
    required: true,
  },
];

/** A plan is usable in the UI once it has a name and a price. */
export function isPlanConfigured(plan) {
  return Boolean(plan && plan.name && typeof plan.priceMonthly === 'number');
}

/** True when every tier is ready to display and sell. */
export function plansConfigured() {
  return PLANS.length > 0 && PLANS.every(isPlanConfigured);
}

/** A plan can be bought only if it also has a Stripe target. */
export function isPlanPurchasable(plan) {
  return (
    isPlanConfigured(plan) &&
    Boolean(plan.stripePriceId || plan.stripePaymentLink)
  );
}

/**
 * Whether a plan may actually be SOLD, as opposed to merely being configured
 * with a Stripe target.
 *
 * Income protection additionally requires an approved surplus lines notice.
 * This is the single place that rule lives, so no surface can accidentally
 * offer a purchase the disclosure gate has not opened.
 */
export function isPlanSellable(plan) {
  if (!isPlanPurchasable(plan)) return false;
  if (plan.incomeProtection && !canSellIncomeProtection()) return false;
  return true;
}

export function findPlan(id) {
  return ALL_PLANS.find((p) => p.id === id) || null;
}

/** Tiers that can actually answer a shortfall, cheapest first. */
export function protectionPlans() {
  return PLANS.filter((p) => p.incomeProtection && isPlanConfigured(p));
}

/**
 * The cheapest tier whose monthly installment closes the gap.
 *
 * When nothing closes it, the largest tier is returned with closesGap false —
 * and the copy that consumes this must say it covers part of the shortfall, not
 * present it as the answer. Never recommend upward for any other reason.
 *
 * @param {number} monthlyGap shortfall in USD per month
 * @returns {{plan: Plan|null, closesGap: boolean, index: number}}
 */
export function recommendPlan(monthlyGap) {
  const usable = protectionPlans();
  if (usable.length === 0) return { plan: null, closesGap: false, index: -1 };

  const closes = usable.find((p) => p.monthlyBenefit >= monthlyGap);
  const plan = closes || usable[usable.length - 1];
  return {
    plan,
    closesGap: Boolean(closes),
    index: usable.indexOf(plan),
  };
}
