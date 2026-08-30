// Shared number formatting. Currency is always whole dollars — cents in a gap
// figure read as false precision on an estimate.

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/** @param {number} n */
export function money(n) {
  return usd.format(Math.round(n || 0));
}

const usdCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

/**
 * A price the member is actually charged. Never rounded: `money()` drops cents
 * because false precision on an *estimate* reads badly, but doing that to a
 * price turns $24.99 into $25 and misstates what is being charged.
 *
 * @param {number} n
 */
export function price(n) {
  if (typeof n !== 'number') return null;
  return Number.isInteger(n) ? usd.format(n) : usdCents.format(n);
}

/** Bare grouped integer, for animating a figure that already has a $ beside it. */
export function grouped(n) {
  return Math.round(n || 0).toLocaleString('en-US');
}

// ---------------------------------------------------------------------------
// Benefit phrasing.
//
// A tier card carries exactly ONE display-sized number, and it is the total.
// Two large dollar figures of different kinds sitting adjacent read as
// contradictory — "$6,000" over "$2,000/mo" looks like a mistake. The monthly
// amount belongs inside the schedule sentence at body size, where it explains
// the total rather than competing with it.
//
// The exception is the coverage line below, where the monthly figure is
// measured against the visitor's shortfall. There the two numbers are the
// point.
// ---------------------------------------------------------------------------

/**
 * How a tier stands against a shortfall. When a tier does not close the gap
 * this says so plainly rather than framing the tier as the answer.
 */
export function coverageLine(plan, monthlyGap) {
  if (!plan || typeof plan.monthlyBenefit !== 'number') return null;
  if (!(monthlyGap > 0)) return null;
  // The only place the monthly figure and the shortfall sit side by side,
  // because here the contrast IS the message.
  return plan.monthlyBenefit >= monthlyGap
    ? `Covers ${money(plan.monthlyBenefit)} a month against your ` +
      `${money(monthlyGap)} shortfall — enough to close it, for ` +
      `${plan.installments} months`
    : `Covers ${money(plan.monthlyBenefit)} a month against your ` +
      `${money(monthlyGap)} shortfall`;
}
