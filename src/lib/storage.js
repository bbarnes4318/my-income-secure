// ---------------------------------------------------------------------------
// Attribution capture and calculator persistence.
//
// The UTM half reproduces the pre-rebuild pipeline exactly: the same five keys,
// in sessionStorage, under their bare names. Anything already reading those
// keys keeps working. Do not namespace them.
// ---------------------------------------------------------------------------

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

/** Key for the persisted calculator result. Versioned so the shape can change. */
const CALC_KEY = 'mis.calc.v1';

function safeSession() {
  try {
    return window.sessionStorage;
  } catch {
    return null; // Private mode, or storage disabled.
  }
}

function safeLocal() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Read utm_* off the current URL into sessionStorage. Call once per page load.
 * Existing values are kept when the URL carries none, so attribution survives
 * navigation across the funnel.
 */
export function captureUtms() {
  const store = safeSession();
  if (!store) return;
  const params = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) store.setItem(key, value);
  }
}

/** @returns {Record<string, string>} only the keys that have values. */
export function getUtms() {
  const store = safeSession();
  if (!store) return {};
  const out = {};
  for (const key of UTM_KEYS) {
    const value = store.getItem(key);
    if (value) out[key] = value;
  }
  return out;
}

/**
 * Persist the calculator so an abandoner returns straight to their result
 * instead of redoing four steps.
 *
 * @param {object} result
 */
export function saveCalcResult(result) {
  const store = safeLocal();
  if (!store) return;
  try {
    store.setItem(CALC_KEY, JSON.stringify({ ...result, savedAt: Date.now() }));
  } catch {
    // Quota or serialisation failure is not worth interrupting the flow.
  }
}

/** @returns {object|null} */
export function loadCalcResult() {
  const store = safeLocal();
  if (!store) return null;
  try {
    const raw = store.getItem(CALC_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearCalcResult() {
  const store = safeLocal();
  if (!store) return;
  try {
    store.removeItem(CALC_KEY);
  } catch {
    /* no-op */
  }
}
