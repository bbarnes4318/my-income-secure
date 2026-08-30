// ---------------------------------------------------------------------------
// Conversion instrumentation.
//
// Every event name the site emits is declared here. `track()` pushes onto
// window.dataLayer and is otherwise a no-op, so nothing breaks before an
// analytics provider is connected. To wire one up, replace the body of
// `deliver()` — no component needs to change.
// ---------------------------------------------------------------------------

export const EVENTS = {
  /** Calculator opened and the first step rendered. */
  CALC_START: 'calc_start',
  /** One step completed. Payload: { step, stepName }. */
  CALC_STEP_COMPLETE: 'calc_step_complete',
  /** The gap number was shown. Payload: { state, monthlyGap, monthlyBenefit }. */
  GAP_REVEAL: 'gap_reveal',
  /** A plan grid entered the viewport. Payload: { placement }. */
  PLAN_VIEW: 'plan_view',
  /** The tier window moved. Payload: { placement, direction, tiers }. */
  PLAN_WINDOW: 'plan_window',
  /** A tier was chosen. Payload: { planId, recommended }. */
  PLAN_SELECT: 'plan_select',
  /** Checkout page reached. Payload: { planId }. */
  CHECKOUT_START: 'checkout_start',
  /** Payment completed — fired on the Stripe return URL. Payload: { planId }. */
  PURCHASE: 'purchase',
};

/** Step names, used for CALC_STEP_COMPLETE and the progress indicator. */
export const CALC_STEPS = ['state', 'income', 'expenses', 'eligibility'];

function deliver(name, payload) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });
}

/**
 * Record a conversion event.
 * @param {string} name one of EVENTS
 * @param {Record<string, unknown>} [payload]
 */
export function track(name, payload = {}) {
  try {
    deliver(name, payload);
  } catch {
    // Instrumentation must never break the purchase path.
  }
}

/** Fire once when an element first enters the viewport. */
export function trackOnVisible(el, name, payload = {}) {
  if (!el || typeof IntersectionObserver === 'undefined') return;
  let fired = false;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !fired) {
          fired = true;
          track(name, payload);
          io.disconnect();
        }
      }
    },
    { threshold: 0.4 }
  );
  io.observe(el);
}
