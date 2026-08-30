# Open items

What is still needed from you. Ordered by what blocks a sale first.

---

## 1. The non-insurance disclaimer — a question for counsel

**Nothing has been changed here. This is flagged, not acted on.**

The site-wide footer disclaimer says the program is *"a separate, non-insurance
benefit program and not a policy of insurance."* That wording is untouched and
appears on every page.

But there is an underlying insurance policy: underwritten by Everspan Indemnity
Insurance Company and placed as surplus lines. So the position is that the
membership is not insurance while the income protection benefit inside it is
backed by insurance — and the current sentence does not distinguish between
those two things.

**This got sharper when the underwriting entities went in.** The footer of every
page now carries these two paragraphs, one directly beneath the other:

> ...it is a separate, non-insurance benefit program and **not a policy of
> insurance**.

> The income protection benefit within it is **insured by Everspan Indemnity
> Insurance Company** on a surplus lines basis...

Both are true under the reading you gave me — the membership is not insurance,
the benefit inside it is insured — but a reader is not given that distinction,
and as written the second paragraph reads as a direct contradiction of the
first. It was a theoretical conflict when the entities were unnamed. It is now
visible on every page.

**A structural line now sits between the two.** It states only who does what —
ASNA sells the membership; Everspan insures the income protection benefit on a
surplus lines basis; STP administers it — and makes no claim either way about
whether the program as a whole is insurance. It is a bridge, not an answer.

"Insured by Everspan" stays exactly as written, per your instruction: Everspan
is an insurance company and there is a real policy, and softening it would
obscure the fact the surplus lines notice depends on the reader understanding.

**The disclaimer itself is untouched and this remains open.** The structural
line reduces how abruptly the two paragraphs collide; it does not resolve
whether the disclaimer is defensible as written. Counsel still needs to decide
that, and most likely to supply wording that states the distinction explicitly.
I have not attempted that sentence and will not — getting it wrong is the
specific risk the disclaimer exists to prevent.

---

## 2. Surplus lines — draft written, selling gated shut

**`DISCLOSURES.surplusLinesApproved` is `false`, and that alone is what blocks
selling.** Flipping it to `true` is the act that opens purchasing, and nothing
else does.

Draft notice text now exists in `DISCLOSURES.surplusLines`. It covers the
substance common to state warnings — the insurer is not licensed or admitted in
the buyer's state, is not subject to that state's supervision, and the state
guaranty fund does not protect the policyholder on insolvency. **It is my
drafting, approved by nobody, and it is not any state's prescribed wording.**

Text existing is deliberately not the same thing as text being approved. That
was the previous design and it was wrong: it meant pasting wording in for review
would silently switch selling on. Now:

- The notice **renders at checkout for review**, outside the form so it is
  visible even while the form is hidden, under a visible banner reading *"Draft
  notice — not approved."* Remove the banner by approving, not by editing it.
- The acknowledgement checkbox renders **disabled**.
- `isPlanSellable()` in `plans.js` returns false for every income-protection
  tier, so cards, `/plans/`, and checkout all refuse together.
- `/api/checkout` returns **403** for any income-protection plan. Verified with
  a live Stripe key, populated Price IDs, and a forged acknowledgement in the
  request body — it still refused.

Essentials is unaffected: it carries no income protection, so the gate does not
apply to it.

### Structured per state, because states prescribe their own wording

`surplusLines` is a map keyed by state code with a `default` entry. Add a
state's confirmed text under its code and it takes precedence automatically:

```js
surplusLines: {
  default: '...',
  FL: '...',   // takes precedence for Florida buyers
}
```

`surplusLinesNoticeFor(stateCode)` does the lookup. Nothing else needs changing
as states are filled in.

### Two things this exposed

**The buyer's state is never captured.** Checkout collects name, email, and
phone — not the state they live in. So the per-state lookup currently always
falls back to `default`. Before selling opens, checkout needs an explicit state
field; inferring it from a saved calculator estimate is not good enough, because
the estimate is about where someone *worked* and may not exist at all.

**Surplus lines is licensed state by state, and Ascendant is Florida-licensed.**
Selling into all states raises a licensing question that this codebase cannot
answer and does not attempt to: whether the placement is being made through a
broker licensed in each buyer's state, and what that means for states where it
is not. Flagging it because the site is built to sell nationally and that
assumption is now visible in the code. This belongs with counsel, not here.

---

## 3. Underwriting entities and licence — supplied and live

Both now render in the footer of every page from `DISCLOSURES` in
`src/config/site.js`:

- **Underwriting** — ASNA, Everspan, and STP named with their roles as you gave
  them, including that ASNA sells the membership but neither underwrites nor
  adjudicates the benefit, and STP's AZ licence number.
- **Florida licence** — legal name including the DBA, licence L135613, and the
  St. Petersburg address.

Check the wording renders as you need it to; the *roles* are yours, but the
sentence that introduces them is mine and can be replaced with supplied text.

See §1 — naming Everspan as the insurer is what made the disclaimer conflict
visible rather than theoretical.

---

## 4. Stripe Price IDs — blocks every sale

Everything else about checkout is done. Each tier needs its `stripePriceId` in
`src/config/plans.js`; there are eleven, plus Essentials.

Note that Price IDs alone will **not** open selling for income protection — the
surplus lines approval flag in §2 gates that independently, and both have to be
satisfied. Essentials needs only a Price ID.

To launch before the endpoint is live, add `stripePaymentLink` instead —
`lib/checkout.js` picks whichever is populated, Price ID winning if both are
set. On the Payment Link path attribution packs into `client_reference_id`,
because that is the only field a Payment Link carries through.

Two decisions:

- **Subscription vs one-off.** The endpoint creates `mode: 'subscription'`. Given
  that the price is annual and billed monthly, check that a monthly Stripe
  subscription is actually how you want this billed — the billing model and the
  contractual model are not the same thing here, and the cancellation copy now
  says so out loud.
- **Purchase tracking is client-side.** The `purchase` event fires when the buyer
  lands on `/checkout/?status=success`. If they close the tab at Stripe it never
  fires. A webhook is the reliable source of truth for revenue reporting.

---

## 5. Photography — four slots, sized and waiting

There are four image slots in the layout. Each one reserves its space now, so
dropping a photograph in is a two-line change in `src/config/images.js` and
nothing moves. Until then each renders a composed navy placeholder rather than
an empty box.

Supply at **2x the listed size**, JPEG or WebP, into `public/img/`.

| Slot | Ratio | Min size | Where | What it has to show |
|---|---|---|---|---|
| `home-hero` | 4:5 portrait | 1000 × 1250 | Homepage hero, right column | One person, mid-30s to 50s, at home in daylight — at a kitchen table with paperwork, or on the phone. Composed and thinking, **not** distressed, crying, or head-in-hands. The product is bought by someone being sensible in advance, not by someone in crisis. |
| `guide-header` | 16:10 landscape | 1200 × 750 | Filing guide header, on navy | Practical and procedural: a laptop with a form open, a desk, a phone being used. Can be close-cropped with no face. It sits on a dark ground, so mid-to-dark tones work better than a bright white scene. |
| `plans-terms` | 3:4 portrait | 720 × 960 | `/plans/`, beside the terms list | Quieter and more documentary than the hero. Someone reading something carefully. Supports "read the rules before you buy". |
| `trust-operator` | 1:1 square | 640 × 640 | Trust section | The most literal of the four: real people at Ascendant Benefits, or the actual office. If a real photograph is not available, **leave it null** — a stock office is worse than the placeholder. |

Direction that applies to all four:

- **Real people, licensed for commercial use, with releases.** Not AI-generated.
- **No stock-photo body language** — no arms-crossed advisors, no handshakes, no
  smiling couples with a laptop.
- **Not visibly wealthy, not visibly destitute.** The audience is employed now
  and worried about later.
- **Warm, natural light.** The palette is navy and off-white; cool blue-grey
  corporate photography will fight it.
- Every slot needs **alt text** written when you supply it — what the photograph
  shows, not "hero image". The field is required in `images.js`.

**Decided: photography appears on this site.** The placeholders currently in
the layout are provisional, not a final treatment — they exist so the page
looks finished while the shots are commissioned, and they come out when real
images go in.

The single hardest line to hold when briefing a photographer or reviewing
options: **composed and thinking, not distressed.** No head-in-hands, no crying
at a kitchen table, nothing that reads as stock despair. The person in these
frames is being sensible in advance, which is who actually buys this. Anything
that looks like a crisis photograph is the wrong shot even when it is
technically good.

## 6. Two discrepancies — recorded, not resolved

- **28 days vs 30 days.** The tier mockups describe 3 × 28-day benefit periods;
  the policy wording describes installments at 30-day intervals. Copy uses 30
  throughout, from `PROGRAM_TERMS.installmentIntervalDays` — change that one
  value and every page follows. Worth reconciling against the certificate.
- **Pricing expires 18 September 2026.** The card you supplied is valid for 30
  days from 19 August 2026. The ladder in `src/config/plans.js` carries that
  date in a comment at the top of the file.

---

## 7. Program terms — still no published document

Copy now states the confirmed rules directly: installments, the 30-day claim
threshold, the first payment at 30 days, forfeiture on re-employment, the
enrollment attestations, and the 48-hour refund window.

Three references to "the program terms" remain, each because the underlying rule
is genuinely still unknown to me:

- **Waiting period.** How long a membership must be active before a job loss
  qualifies. This is a *different rule* from the 30-day unemployment threshold,
  and conflating them would be wrong — so `PROGRAM_TERMS.waitingPeriodDays`
  stays `null` and `/plans/` shows it as unpublished.
- **Qualifying separation reasons.** Which separations count beyond "job loss you
  did not choose".
- **Tier changes.** Whether a member can move up or down, and when.

There is still no program terms page or document at any URL. Either supply the
terms so they can be published, or tell me where those references should point.

---

## 8. Cancellation copy — written by me, should be reviewed

You asked me to rewrite the cancellation answer, so I did, from your bullets. It
now appears in three places (homepage FAQ, `/plans/` FAQ, trust section) and says:
cancel any time; full refund only within 48 hours of purchase and only if no
benefits have been used; no refund after; the price is annual and billed monthly
for convenience, so cancelling or claiming early can mean the unpaid annual
balance is deducted from a benefit payment.

That last clause is the sharpest disclosure on the site and the one most likely
to be disputed by a member. It is my wording, not yours — worth a read before
launch.

---

## 9. Claims still unverified

None appear anywhere on the site. Each needs a source or it stays out.

| Claim | Where it was |
|---|---|
| `$500–$3,500` monthly benefit range | old homepage hero + stats bar |
| `1–48 hrs` claim approval time | old homepage stats bar + "How it works" |
| Ages `18–70` eligible | old homepage hero + stats bar |
| "No exam" | old homepage stats bar |
| `$2,600/mo` national expense benchmark | old calculator default |

The old "guaranteed monthly income benefits" hero line also stays out — it
contradicted the disclaimer directly beneath it. **Confirm it stays out**, or
have counsel supply wording they are comfortable with.

Two now resolved: the W-2 and 90-day eligibility rules. W-2 is confirmed and is
in the attestation list. The 90-day rule turned out to be something else
entirely — it is the window in which the *insurer* may cancel a certificate for
pre-existing layoffs, not a tenure requirement on the member, and it is now
stated as such.

On the `$2,600` benchmark: still no source, still unused. Expenses are a
required three-field step and the homepage example runs off a number the visitor
types. If you have a source (BLS Consumer Expenditure Survey being the obvious
one) it can return as a labelled, cited default.

---

## 10. Privacy policy — sections now inaccurate

Wording **untouched**, as instructed. Restyled into the shared layout, nothing
else. Below is what checkout now does that the current text does not cover, for
whoever drafts the revision.

**"Information you provide" — three problems.**

1. It says estimator figures *"are not transmitted to or stored on our servers."*
   Still true of the calculation, but the result is saved to the visitor's
   browser (`localStorage`, key `mis.calc.v1`) so they can return to it. Needs
   disclosing as local storage.
2. Estimate values (state, monthly benefit, monthly expenses, monthly gap) are
   sent to `/api/checkout` and attached to the Stripe Checkout Session as
   metadata on purchase. Not covered.
3. It says clicking "Get covered" may put the estimate *"in an email you choose
   to send to our team, or passed to our enrollment partner."* That mailto
   fallback no longer exists.

**Not mentioned at all, and now collected:**

- **Name, email, and phone** at checkout.
- **TCPA consent** — text, version string, and timestamp recorded with the
  submission when a phone number is given.
- **Surplus lines acknowledgement** — a second, separate consent record with its
  own version and timestamp, recorded as Stripe metadata (`surplus_ack`,
  `surplus_version`, `surplus_timestamp`) once selling opens.
- **The buyer's state**, if §2's per-state notice requirement means it has to be
  collected at checkout.
- **Stripe as a payment processor**, and what is shared with it.
- **Attribution tracking** — the five `utm_*` keys captured into `sessionStorage`
  on every page and attached to the purchase. Predates the rebuild, never
  disclosed.
- **A cookies / local storage section.** There is none, and the site uses both
  `sessionStorage` and `localStorage`.

**Also:** the "Last updated: August 2026" date will need bumping.

---

## 11. Trust and proof — section built, deliberately empty

`src/components/TrustSection.astro` renders four verifiable things: who operates
the program, a plain statement of what it is and is not, the DOL source behind
the numbers, and the cancellation and refund terms.

No testimonials, ratings, member counts, press mentions, or approval-time
figures have been generated — not even as marked samples. Real sourced content
needed: testimonials with real attribution and permission, any rating with its
platform, member counts as of a stated date, press links, approval-time data if
it is measured.

---

## 12. Smaller findings

- **Texas waiting week.** The old guide's step 5 named five states as waiving the
  unpaid waiting week; its own table marked **six**, including Texas. The
  sentence is generated from the table data now, so they cannot disagree again —
  but the underlying fact is worth confirming against DOL.
- **Analytics provider.** Every funnel event is instrumented and pushes to
  `window.dataLayer`, including the new `plan_window` event. Nothing consumes
  it. Name a provider and it is a one-function change in `src/lib/analytics.js`.
- **Homepage worked example defaults to Florida.** Inherited from the old
  calculator, and now also the state named on the hero's statutory-maximum
  card. The visitor can change the first; the second is set in `index.astro`.
  Say if it should be a different state.
- **The gap slider's starting position is $3,000/month.** It is a round number
  chosen to be obviously a starting value, not a figure with a source, and
  nothing on the page calls it typical or average — the slider handle is what
  signals it is yours to move. Set `START_SPEND` in
  `src/components/HomeGapExample.astro` if you want it elsewhere.
- **No italic font file ships.** Literata's italic is a separate 53KB face and
  was not worth it for incidental emphasis. Anything that needs emphasis uses
  weight or colour. If you want real italics, say so and it is one line plus
  the file.
