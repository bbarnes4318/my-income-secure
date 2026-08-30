// Brand, entity, and the legally load-bearing disclaimer text.
// The disclaimer is reproduced verbatim from the pre-rebuild site and must
// appear on every page. Do not reword it without counsel.

export const SITE = {
  name: 'My Income Secure',
  domain: 'myincomesecure.com',
  url: 'https://www.myincomesecure.com',
  program: 'My Secure Life Series',
  entity: 'Ascendant Benefits LLC',
  email: 'sean.grove@ascendantbenefits.com',
  phone: '305-204-7979',
};

/**
 * Non-insurance disclaimer. Rendered in the footer of every page.
 * Verbatim from the pre-rebuild homepage footer.
 */
export const DISCLAIMER =
  'My Income Secure is operated by Ascendant Benefits LLC. The My Secure Life ' +
  'Series is a membership benefit program providing job-loss income protection ' +
  'payments — it is a separate, non-insurance benefit program and not a policy ' +
  'of insurance. Estimates shown are for illustration only and are not a ' +
  'guarantee of enrollment, eligibility, or payment. See program terms for full ' +
  'eligibility rules, benefit amounts, and conditions.';

/** Shown wherever an estimate is displayed. */
export const ESTIMATE_DISCLAIMER =
  'This is an estimate, not an official determination. State agencies calculate ' +
  'your actual benefit from your real quarterly wage records, which this tool ' +
  'cannot access. Use it to understand the ballpark and the gap — not as a ' +
  'guarantee of what you would receive.';

/**
 * TCPA express written consent, shown wherever a phone number is collected.
 *
 * The checkbox is unchecked by default and is never a condition of purchase.
 * `version` is recorded with the submission alongside a timestamp, so what a
 * given member agreed to can be reconstructed after the wording changes. Bump
 * the version whenever `text` changes.
 */
export const TCPA_CONSENT = {
  version: '2026-08-29.v1',
  text:
    'I agree that Ascendant Benefits LLC may call and send text messages to the ' +
    'number I provided, including using an automatic telephone dialing system or ' +
    'a prerecorded voice, about the My Secure Life Series. Consent is not a ' +
    'condition of purchase. Message and data rates may apply. Reply STOP to opt ' +
    'out at any time.',
};

/**
 * Required disclosures.
 *
 * `underwriting` and `floridaLicense` carry supplied facts and render on every
 * page. `surplusLines` is DRAFT TEXT written here and approved by nobody — see
 * the gate immediately below it.
 */
export const DISCLOSURES = {
  /**
   * Who is who. Rendered in the footer. Each role is stated as supplied — in
   * particular, that ASNA sells the membership but neither underwrites nor
   * adjudicates the benefit, which is the distinction the whole product rests
   * on.
   */
  underwriting: {
    /**
     * The structural line. Sits between the non-insurance disclaimer and the
     * entity list, and describes ONLY who does what.
     *
     * It deliberately makes no claim about whether the program as a whole is
     * or is not insurance — that question is open with counsel and this
     * sentence must not pre-empt it in either direction. It says who sells,
     * who insures, and who administers, and stops there.
     *
     * "on a surplus lines basis" stays: it is a fact about the arrangement,
     * and it is the fact the surplus lines notice at enrollment depends on the
     * reader having understood.
     */
    structure:
      'The My Secure Life Series membership is sold by American Safety Net ' +
      'Association. The income protection benefit within it is insured by ' +
      'Everspan Indemnity Insurance Company on a surplus lines basis and ' +
      'administered by STP Insurance Services LLC.',
    entities: [
      {
        name: 'American Safety Net Association (ASNA)',
        role:
          'A non-profit membership association organized under Arizona law. ' +
          'ASNA sells the membership. It is not an insurer and does not ' +
          'underwrite, administer, or adjudicate the income protection benefit.',
      },
      {
        name: 'Everspan Indemnity Insurance Company',
        role:
          'The insurer for the income protection benefit. Non-admitted, ' +
          'placed through the surplus lines market.',
      },
      {
        name: 'STP Insurance Services LLC',
        role:
          'Surplus lines broker and claims administrator. Handles all claims ' +
          'for the income protection benefit.',
        license: 'AZ License No. 3001433047',
      },
    ],
  },

  /** Ascendant Benefits LLC's licensing. Rendered in the footer. */
  floridaLicense: {
    legalName: 'Ascendant Benefits LLC DBA Ascendant Benefits Insurance Group',
    licenseNumber: 'L135613',
    licenseState: 'Florida',
    address: '7901 4th St N, Ste 300, St. Petersburg, FL 33702',
  },

  /**
   * ============================ DRAFT — NOT APPROVED ======================
   *
   * Surplus lines notices, keyed by state code with a `default` fallback.
   *
   * Every entry below is PLACEHOLDER TEXT DRAFTED IN THIS REPOSITORY. It has
   * not been reviewed or approved by counsel and is not any state's prescribed
   * wording. It exists so the enrollment step can be built and reviewed.
   *
   * States prescribe their own surplus lines wording, which is why this is a
   * map rather than one national notice: fill in a state's confirmed text
   * under its code as it is confirmed, and it takes precedence over `default`
   * with no other change required.
   *
   * ======================================================================
   */
  surplusLines: {
    default:
      'This insurance is issued by an insurer that is not licensed or admitted ' +
      'in your state. The insurer is not subject to the supervision of your ' +
      "state's insurance department, and your state's insurance guaranty fund " +
      'does not protect you if the insurer becomes insolvent. Surplus lines ' +
      'insurers do not generally participate in state guaranty funds, and you ' +
      'are not protected by such a fund with respect to this coverage.',
    // Confirmed per-state wording goes here, e.g.:
    //   FL: '...',
  },

  /**
   * THE GATE. Selling income protection is disabled until this is true.
   *
   * Deliberately separate from whether `surplusLines` has text in it: the
   * draft above renders for review, and text existing must never be mistaken
   * for text being approved. Only flipping this to `true` opens purchasing.
   */
  surplusLinesApproved: false,

  /** Bump whenever the notice text changes. Prefixed `draft-` while unapproved. */
  surplusLinesVersion: 'draft-2026-08-30.v0',
};

/**
 * The surplus lines notice for a buyer in `stateCode`, falling back to the
 * default entry. Returns null when nothing is configured at all.
 */
export function surplusLinesNoticeFor(stateCode) {
  const map = DISCLOSURES.surplusLines || {};
  return (stateCode && map[stateCode]) || map.default || null;
}

/** Whether income protection may actually be sold. The text is not the gate. */
export function canSellIncomeProtection() {
  return DISCLOSURES.surplusLinesApproved === true;
}

/**
 * A claim requires the member to be eligible for and approved to receive state
 * unemployment benefits for the same period. That makes the filing guide part
 * of the product, not marketing — a member who never files cannot collect.
 */
export const STATE_FILING_REQUIREMENT =
  'To claim, you must be eligible for and approved to receive state ' +
  'unemployment benefits for the period you are out of work. Filing with your ' +
  'state is not optional — it is what makes a claim payable.';

export const ROUTES = {
  home: '/',
  calculator: '/what-would-state-unemployment-actually-pay-you/',
  guide: '/what-to-do-if-you-become-unemployed-state-by-state-guide/',
  plans: '/plans/',
  checkout: '/checkout/',
  privacy: '/privacy-policy/',
};

export const NAV_LINKS = [
  { href: ROUTES.calculator, label: 'Benefit estimator' },
  { href: ROUTES.plans, label: 'Plans' },
  { href: ROUTES.guide, label: 'Filing guide' },
];

/**
 * The honest urgency argument. This is the real constraint — you cannot enroll
 * after the job is already gone — and it is the only urgency claim on the site.
 * No countdowns, no seat counts, no invented deadlines.
 */
export const URGENCY =
  'The program covers job loss that happens after your membership starts. ' +
  'Once you have already lost your job, it is too late to enrol — which is why ' +
  'this only works as something you set up beforehand.';
