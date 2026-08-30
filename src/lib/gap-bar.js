// ---------------------------------------------------------------------------
// The gap reveal: an enormous shortfall figure over a covered/uncovered split.
//
// Two moments of motion exist on this site and both live here — the figure
// counts up, and the bar grows. Everything else is still. Under
// prefers-reduced-motion both land on their final values immediately.
// ---------------------------------------------------------------------------

import { grouped, money } from './format.js';

const REDUCED = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const DURATION = 900;

/** easeOutExpo — fast commitment, soft landing. */
function ease(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function countTo(el, target, animate, done) {
  if (!el) return;
  if (!animate || REDUCED()) {
    el.textContent = grouped(target);
    done?.();
    return;
  }
  const start = performance.now();
  function frame(now) {
    const t = Math.min((now - start) / DURATION, 1);
    el.textContent = grouped(target * ease(t));
    if (t < 1) requestAnimationFrame(frame);
    else done?.();
  }
  requestAnimationFrame(frame);
}

/**
 * Paint a gap figure.
 *
 * @param {HTMLElement} root         element carrying [data-gap]
 * @param {object} data
 * @param {number} data.covered      what the state benefit pays monthly
 * @param {number} data.uncovered    the monthly shortfall
 * @param {string} data.coveredLabel e.g. "Florida pays"
 * @param {string} data.uncoveredLabel
 * @param {boolean} [data.animate=true] false paints the final values with no
 *        motion. Used when a band must be complete on first paint but should
 *        still count up later, when it actually scrolls into view.
 */
export function renderGap(root, data) {
  if (!root) return;

  const {
    covered = 0,
    uncovered = 0,
    coveredLabel,
    uncoveredLabel,
    animate = true,
  } = data;
  const total = covered + uncovered;
  // Guard against a zero total, and keep each segment visible enough to read.
  const coveredPct = total > 0 ? Math.max(4, Math.min(96, (covered / total) * 100)) : 50;

  const numberEl = root.querySelector('[data-gap-number]');
  const barEl = root.querySelector('[data-gap-bar]');
  const coveredEl = root.querySelector('[data-gap-covered]');
  const uncoveredEl = root.querySelector('[data-gap-uncovered]');

  if (coveredLabel) {
    const el = root.querySelector('[data-gap-covered-label]');
    if (el) el.textContent = coveredLabel;
  }
  if (uncoveredLabel) {
    const el = root.querySelector('[data-gap-uncovered-label]');
    if (el) el.textContent = uncoveredLabel;
  }

  const coveredValueEl = root.querySelector('[data-gap-covered-value]');
  if (coveredValueEl) coveredValueEl.textContent = `${money(covered)}/mo`;
  const uncoveredValueEl = root.querySelector('[data-gap-uncovered-value]');
  if (uncoveredValueEl) uncoveredValueEl.textContent = `${money(uncovered)}/mo`;

  // The bar is decorative to a screen reader without this; state it in words.
  if (barEl) {
    barEl.setAttribute(
      'aria-label',
      `Of ${money(total)} in monthly costs, the state benefit covers ` +
        `${money(covered)} and leaves ${money(uncovered)} uncovered.`
    );
  }

  root.dataset.state = uncovered > 0 ? 'short' : 'covered';

  const paintBar = () => {
    if (coveredEl) coveredEl.style.inlineSize = `${coveredPct}%`;
    if (uncoveredEl) uncoveredEl.style.inlineSize = `${100 - coveredPct}%`;
  };

  countTo(numberEl, uncovered, animate);
  if (!animate || REDUCED()) paintBar();
  else requestAnimationFrame(() => requestAnimationFrame(paintBar));
}

/** Run `fn` the first time `el` is meaningfully on screen. */
export function onReveal(el, fn) {
  if (!el) return;
  if (typeof IntersectionObserver === 'undefined') {
    fn();
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          io.disconnect();
          fn();
        }
      }
    },
    { threshold: 0.35 }
  );
  io.observe(el);
}
