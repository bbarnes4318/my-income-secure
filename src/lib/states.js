// State unemployment benefit formulas, floors, ceilings, and durations.
//
// Source: U.S. Department of Labor, Employment & Training Administration —
// "Significant Provisions of State UI Laws", effective January 2026.
// https://oui.doleta.gov/unemploy/content/sigpros/2020-2029/January2026.pdf
//
// Monthly figures are weekly x 52/12; no state pays UI on a monthly basis.

export const DOL_SOURCE_URL =
  'https://oui.doleta.gov/unemploy/content/sigpros/2020-2029/January2026.pdf';
export const DOL_SOURCE_LABEL =
  'Significant Provisions of State UI Laws, effective January 2026';

/**
 * @typedef {object} State
 * @property {string} code
 * @property {string} name
 * @property {number} min      Statutory weekly minimum
 * @property {number} max      Statutory weekly maximum
 * @property {number|null} wmin Minimum weeks of duration
 * @property {number} wmax     Maximum weeks of duration
 * @property {string} type     Formula family
 * @property {number} param    Formula parameter
 * @property {string} formula  Human-readable formula
 * @property {number|null} dep Per-dependent weekly allowance
 * @property {number} depCap   Max dependents counted
 * @property {boolean} [approx] Formula is an approximation
 * @property {string} [approxNote] Why it is approximated
 */

/** @type {State[]} */
export const STATES = [
  {
    "code": "AL",
    "name": "Alabama",
    "min": 45,
    "max": 275,
    "wmin": null,
    "wmax": 14,
    "type": "frac_hqw",
    "param": 26,
    "formula": "1/26 avg of 2 highest qtrs",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "AK",
    "name": "Alaska",
    "min": 56,
    "max": 442,
    "wmin": 16,
    "wmax": 26,
    "type": "pct_bpw",
    "param": 0.0155,
    "formula": "0.9-2.2% of annual wages",
    "dep": 14.4,
    "depCap": 5
  },
  {
    "code": "AZ",
    "name": "Arizona",
    "min": 229,
    "max": 320,
    "wmin": 8,
    "wmax": 24,
    "type": "frac_hqw",
    "param": 25,
    "formula": "1/25 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "AR",
    "name": "Arkansas",
    "min": 81,
    "max": 451,
    "wmin": 9,
    "wmax": 12,
    "type": "pct_bpw",
    "param": 0.00962,
    "formula": "1/26 of avg of 4 qtrs in BP",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "CA",
    "name": "California",
    "min": 40,
    "max": 450,
    "wmin": 14,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 24.5,
    "formula": "1/23 to 1/26 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "CO",
    "name": "Colorado",
    "min": 25,
    "max": 844,
    "wmin": 13,
    "wmax": 26,
    "type": "pct_aww",
    "param": 0.55,
    "formula": "Higher of two capped wage-replacement methods",
    "dep": null,
    "depCap": 0,
    "approx": true,
    "approxNote": "CO uses the higher of two calculation methods (capped % of recent wages vs. capped % of annual base-period earnings), not a single formula — shown here as a simplified approximation."
  },
  {
    "code": "CT",
    "name": "Connecticut",
    "min": 44,
    "max": 796,
    "wmin": 26,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 26,
    "formula": "1/26 avg of 2 HQs + dependents",
    "dep": 15,
    "depCap": 5
  },
  {
    "code": "DE",
    "name": "Delaware",
    "min": 20,
    "max": 450,
    "wmin": 24,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 23,
    "formula": "1/46 total wages in 2 highest qtrs",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "DC",
    "name": "District of Columbia",
    "min": 50,
    "max": 444,
    "wmin": 26,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 26,
    "formula": "1/26 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "FL",
    "name": "Florida",
    "min": 32,
    "max": 275,
    "wmin": 9,
    "wmax": 12,
    "type": "frac_hqw",
    "param": 26,
    "formula": "1/26 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "GA",
    "name": "Georgia",
    "min": 55,
    "max": 365,
    "wmin": 6,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 21,
    "formula": "1/42 of wages in highest 2 qtrs (=1/21 HQW)",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "HI",
    "name": "Hawaii",
    "min": 5,
    "max": 868,
    "wmin": 26,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 21,
    "formula": "1/21 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "ID",
    "name": "Idaho",
    "min": 72,
    "max": 624,
    "wmin": 10,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 26,
    "formula": "1/26 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "IL",
    "name": "Illinois",
    "min": 51,
    "max": 859,
    "wmin": 26,
    "wmax": 26,
    "type": "pct_aww",
    "param": 0.47,
    "formula": "47% of AWW in 2 highest qtrs",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "IN",
    "name": "Indiana",
    "min": 37,
    "max": 390,
    "wmin": 26,
    "wmax": 26,
    "type": "pct_aww",
    "param": 0.47,
    "formula": "47% of AWW in BP",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "IA",
    "name": "Iowa",
    "min": 93,
    "max": 763,
    "wmin": 9,
    "wmax": 16,
    "type": "frac_hqw",
    "param": 23,
    "formula": "1/23 HQW (1/19-1/22 with dependents)",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "KS",
    "name": "Kansas",
    "min": 159,
    "max": 637,
    "wmin": 10,
    "wmax": 16,
    "type": "pct_hqw",
    "param": 0.0425,
    "formula": "4.25% HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "KY",
    "name": "Kentucky",
    "min": 39,
    "max": 720,
    "wmin": 16,
    "wmax": 24,
    "type": "pct_bpw",
    "param": 0.011923,
    "formula": "1.1923% BPW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "LA",
    "name": "Louisiana",
    "min": 35,
    "max": 282,
    "wmin": 12,
    "wmax": 20,
    "type": "pct_bpw",
    "param": 0.01,
    "formula": "1/25 of avg wages across 4 BP qtrs",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "ME",
    "name": "Maine",
    "min": 108,
    "max": 1090,
    "wmin": 15,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 22,
    "formula": "1/22 avg of 2 highest qtrs + dependents",
    "dep": 25,
    "depCap": 99
  },
  {
    "code": "MD",
    "name": "Maryland",
    "min": 50,
    "max": 430,
    "wmin": 26,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 24,
    "formula": "1/24 HQW + dependents",
    "dep": 8,
    "depCap": 5
  },
  {
    "code": "MA",
    "name": "Massachusetts",
    "min": 60,
    "max": 1105,
    "wmin": 10,
    "wmax": 30,
    "type": "pct_aww",
    "param": 0.5,
    "formula": "50% AWW + dependents (no cap on dep. allowance)",
    "dep": 25,
    "depCap": 99
  },
  {
    "code": "MI",
    "name": "Michigan",
    "min": 218,
    "max": 530,
    "wmin": 14,
    "wmax": 26,
    "type": "pct_hqw",
    "param": 0.041,
    "formula": "4.1% HQW + dependents",
    "dep": 19.33,
    "depCap": 5
  },
  {
    "code": "MN",
    "name": "Minnesota",
    "min": 37,
    "max": 948,
    "wmin": 9,
    "wmax": 26,
    "type": "pct_aww",
    "param": 0.6,
    "formula": "Higher of two capped wage-replacement methods",
    "dep": null,
    "depCap": 0,
    "approx": true,
    "approxNote": "MN uses the higher of two calculation methods (capped % of high-quarter wages vs. capped % of base-period wages), not a single formula — shown here as a simplified approximation."
  },
  {
    "code": "MS",
    "name": "Mississippi",
    "min": 30,
    "max": 235,
    "wmin": 13,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 26,
    "formula": "1/26 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "MO",
    "name": "Missouri",
    "min": 35,
    "max": 320,
    "wmin": 8,
    "wmax": 20,
    "type": "pct_hqw",
    "param": 0.04,
    "formula": "4% of avg of 2 highest qtrs",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "MT",
    "name": "Montana",
    "min": 227,
    "max": 767,
    "wmin": 8,
    "wmax": 24,
    "type": "pct_bpw",
    "param": 0.01,
    "formula": "Higher of 1% BPW or 1.9% wages in 2 HQs",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "NE",
    "name": "Nebraska",
    "min": 70,
    "max": 582,
    "wmin": 10,
    "wmax": 26,
    "type": "pct_aww",
    "param": 0.5,
    "formula": "1/2 AWW of High Quarter",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "NV",
    "name": "Nevada",
    "min": 16,
    "max": 631,
    "wmin": 8,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 25,
    "formula": "1/25 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "NH",
    "name": "New Hampshire",
    "min": 32,
    "max": 427,
    "wmin": 26,
    "wmax": 26,
    "type": "pct_bpw",
    "param": 0.0105,
    "formula": "1%-1.1% of annual wages",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "NJ",
    "name": "New Jersey",
    "min": 186,
    "max": 905,
    "wmin": 20,
    "wmax": 26,
    "type": "pct_aww",
    "param": 0.6,
    "formula": "60% of AWW + dependents",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "NM",
    "name": "New Mexico",
    "min": 116,
    "max": 674,
    "wmin": 14,
    "wmax": 26,
    "type": "pct_aww",
    "param": 0.535,
    "formula": "53.5% of AWW in highest-wage BP qtr",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "NY",
    "name": "New York",
    "min": 140,
    "max": 869,
    "wmin": 26,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 25.5,
    "formula": "1/25 to 1/26 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "NC",
    "name": "North Carolina",
    "min": 15,
    "max": 350,
    "wmin": 12,
    "wmax": 20,
    "type": "pct_bpw",
    "param": 0.0096,
    "formula": "Last 2 qtrs of BP / 52",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "ND",
    "name": "North Dakota",
    "min": 43,
    "max": 815,
    "wmin": 12,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 26,
    "formula": "1/65 wages in 2 HQs + 1/2 wages in 3rd HQ",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "OH",
    "name": "Ohio",
    "min": 176,
    "max": 842,
    "wmin": 20,
    "wmax": 26,
    "type": "pct_aww",
    "param": 0.5,
    "formula": "1/2 AWW + dependents",
    "dep": 1,
    "depCap": 99
  },
  {
    "code": "OK",
    "name": "Oklahoma",
    "min": 16,
    "max": 649,
    "wmin": 16,
    "wmax": 16,
    "type": "frac_hqw",
    "param": 23,
    "formula": "1/23 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "OR",
    "name": "Oregon",
    "min": 204,
    "max": 872,
    "wmin": 1,
    "wmax": 26,
    "type": "pct_bpw",
    "param": 0.0125,
    "formula": "1.25% BPW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "PA",
    "name": "Pennsylvania",
    "min": 68,
    "max": 613,
    "wmin": 18,
    "wmax": 26,
    "type": "pct_hqw",
    "param": 0.0392,
    "formula": "(4% HQW + $2) x 0.98 + dependents",
    "dep": 5,
    "depCap": 2
  },
  {
    "code": "PR",
    "name": "Puerto Rico",
    "min": 60,
    "max": 240,
    "wmin": 26,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 18.5,
    "formula": "1/11 to 1/26 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "RI",
    "name": "Rhode Island",
    "min": 82,
    "max": 931,
    "wmin": 17,
    "wmax": 26,
    "type": "pct_hqw",
    "param": 0.0385,
    "formula": "3.85% of avg of 2 highest qtrs + dependents",
    "dep": 15,
    "depCap": 99
  },
  {
    "code": "SC",
    "name": "South Carolina",
    "min": 42,
    "max": 350,
    "wmin": 13,
    "wmax": 20,
    "type": "pct_aww",
    "param": 0.5,
    "formula": "50% of high-quarter AWW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "SD",
    "name": "South Dakota",
    "min": 28,
    "max": 553,
    "wmin": 15,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 26,
    "formula": "1/26 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "TN",
    "name": "Tennessee",
    "min": 55,
    "max": 325,
    "wmin": 12,
    "wmax": 20,
    "type": "frac_hqw",
    "param": 26,
    "formula": "1/26 of avg of 2 highest qtrs",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "TX",
    "name": "Texas",
    "min": 75,
    "max": 605,
    "wmin": 10,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 25,
    "formula": "1/25 HQW (capped at 47.6% of AWW)",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "UT",
    "name": "Utah",
    "min": 47,
    "max": 806,
    "wmin": 10,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 26,
    "formula": "1/26 HQW minus $5",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "VT",
    "name": "Vermont",
    "min": 94,
    "max": 757,
    "wmin": 23,
    "wmax": 26,
    "type": "frac_hqw",
    "param": 22.5,
    "formula": "Wages in 2 highest qtrs / 45",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "VA",
    "name": "Virginia",
    "min": 112,
    "max": 430,
    "wmin": 12,
    "wmax": 26,
    "type": "flat_class",
    "param": 0.5,
    "formula": "Set via statute lookup tables (not a formula)",
    "dep": null,
    "depCap": 0,
    "approx": true,
    "approxNote": "VA sets WBA via statutory lookup tables indexed to wages, not a formula — no public formula exists to replicate this. Shown as a proportional estimate only."
  },
  {
    "code": "VI",
    "name": "Virgin Islands",
    "min": 33,
    "max": 648,
    "wmin": 13,
    "wmax": 16,
    "type": "frac_hqw",
    "param": 16,
    "formula": "1/16 HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "WA",
    "name": "Washington",
    "min": 366,
    "max": 1152,
    "wmin": 1,
    "wmax": 26,
    "type": "pct_hqw",
    "param": 0.0385,
    "formula": "3.85% of avg of 2 highest qtrs",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "WV",
    "name": "West Virginia",
    "min": 24,
    "max": 662,
    "wmin": 26,
    "wmax": 26,
    "type": "flat_class",
    "param": 0.5,
    "formula": "55% of 1/52 of median wages in worker's wage class",
    "dep": null,
    "depCap": 0,
    "approx": true,
    "approxNote": "WV assigns a wage class based on BP earnings, then pays 55% of that class's median weekly wage — not directly your own wage. Shown as a proportional estimate only."
  },
  {
    "code": "WI",
    "name": "Wisconsin",
    "min": 54,
    "max": 370,
    "wmin": 14,
    "wmax": 26,
    "type": "pct_hqw",
    "param": 0.04,
    "formula": "4% HQW",
    "dep": null,
    "depCap": 0
  },
  {
    "code": "WY",
    "name": "Wyoming",
    "min": 47,
    "max": 651,
    "wmin": 11,
    "wmax": 26,
    "type": "pct_hqw",
    "param": 0.04,
    "formula": "4% HQW",
    "dep": null,
    "depCap": 0
  }
];

export const WEEKS_PER_MONTH = 52 / 12;

/** @param {string} code */
export function findState(code) {
  return STATES.find((s) => s.code === code) || null;
}

/** True when this state's formula adds a per-dependent allowance. */
export function hasDependentAllowance(state) {
  return Boolean(state && state.dep);
}

/**
 * Weekly benefit amount, clamped to the state's statutory floor and ceiling.
 * @param {State} s
 * @param {number} annualIncome gross, pre-tax
 * @param {number} deps
 */
export function computeWeeklyBenefit(s, annualIncome, deps = 0) {
  const HQW = annualIncome / 4;
  const AWW = annualIncome / 52;
  const BPW = annualIncome;
  let wba;
  switch (s.type) {
    case 'frac_hqw':
      wba = HQW / s.param;
      break;
    case 'pct_hqw':
      wba = s.param * HQW;
      break;
    case 'pct_aww':
      wba = s.param * AWW;
      break;
    case 'pct_bpw':
      wba = s.param * BPW;
      break;
    case 'flat_class':
      wba = s.min + (s.max - s.min) * Math.min(AWW / 1500, 1);
      break;
    default:
      wba = AWW * 0.5;
  }
  if (s.dep && deps > 0) wba += s.dep * Math.min(deps, s.depCap);
  return Math.max(s.min, Math.min(s.max, wba));
}

/** Annual income at which a given weekly benefit is reached. Inverse of the above. */
export function incomeForWeeklyBenefit(s, targetWBA, deps = 0) {
  const depAllow = s.dep && deps > 0 ? s.dep * Math.min(deps, s.depCap) : 0;
  const target = targetWBA - depAllow;
  if (target <= 0) return 0;
  switch (s.type) {
    case 'frac_hqw':
      return target * 4 * s.param;
    case 'pct_hqw':
      return (target * 4) / s.param;
    case 'pct_aww':
      return (target * 52) / s.param;
    case 'pct_bpw':
      return target / s.param;
    case 'flat_class':
      return 1500 * 52;
    default:
      return (target * 52) / 0.5;
  }
}

/** @param {number} weekly */
export function toMonthly(weekly) {
  return weekly * WEEKS_PER_MONTH;
}

/** Where a computed benefit sits relative to the statutory band. */
export function benefitPosition(s, wba) {
  if (wba >= s.max) return 'at-max';
  if (wba <= s.min) return 'at-min';
  return 'between';
}

/** Duration label, e.g. "12-26 wks" or "up to 26 wks". */
export function durationLabel(s) {
  return (s.wmin ? `${s.wmin}-${s.wmax}` : `up to ${s.wmax}`) + ' wks';
}
