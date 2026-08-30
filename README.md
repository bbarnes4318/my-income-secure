# My Income Secure

Static site for the My Secure Life Series, a membership benefit program that
pays a fixed benefit in installments on job loss. Astro 5, no CMS.

```
npm install
npm run dev      # localhost:4321
npm run build    # dist/
npm run preview
```

## What you probably came here to edit

**`src/config/plans.js`** — the tier ladder, program terms, eligibility
attestations, and Stripe IDs. The ladder is authored as `[totalLimit, price]`
pairs and everything else derives: tier name, monthly benefit, the lot. Add a
tier by adding a row.

**`src/config/site.js`** — entity details, the non-insurance disclaimer, the TCPA
consent text, and `DISCLOSURES` (underwriting entities, surplus lines, Florida
license). The disclaimer is legally load-bearing and appears in the footer of
every page. Each disclosure renders only once its wording is supplied.

See `OPEN-ITEMS.md` for what still needs filling in.

**`src/styles/tokens.css`** — all colour, type, elevation, and spacing. No
component hard-codes a hex value or a shadow.

**`src/config/images.js`** — every photography slot on the site. All null; each
renders a composed placeholder until filled. See `OPEN-ITEMS.md` for the shot
list with dimensions.

## Structure

```
src/
  config/     plans.js, site.js — the two files that drive the site
  lib/        states.js (DOL benefit formulas), state-agencies.js,
              checkout.js, analytics.js, storage.js, gap-bar.js, format.js
  components/ Nav, Footer, GapBar, PlanCard, PlanWindow, Faq, StickyCta,
              TrustSection, HomeGapExample, Wordmark, Icon, ImageSlot
  layouts/    Base.astro (head, fonts), Page.astro (Base + nav + footer)
  pages/      one file per route, plus api/checkout.js
  styles/     tokens.css, base.css
public/fonts/ two self-hosted variable woff2 faces (Archivo, Literata)
```

## Routes

| Path | |
|---|---|
| `/` | homepage |
| `/what-would-state-unemployment-actually-pay-you/` | the calculator |
| `/what-to-do-if-you-become-unemployed-state-by-state-guide/` | filing guide |
| `/plans/` | the tier ladder |
| `/checkout/` | contact, consent, Stripe handoff |
| `/privacy-policy/` | |
| `/api/checkout/` | POST, creates a Stripe Checkout Session |

The four original URLs are unchanged, trailing slashes included.

## Deployment

Every page is prerendered static. `src/pages/api/checkout.js` is the only
server-rendered route — it sets `prerender = false`, which is why the build uses
`@astrojs/node` in standalone mode. Runs as a container on Coolify.

Needs `STRIPE_SECRET_KEY` in the environment. Without it, checkout falls back to
Stripe Payment Links if those are set in `plans.js`, and reports itself
unavailable if they are not.

`/api/checkout` also refuses to sell income protection unless the surplus lines
notice has been acknowledged, whenever `DISCLOSURES.surplusLines` is populated.
That check is server-side on purpose: the form enforces it too, but the form is
the half an attacker skips.

## Conventions worth knowing

- **Amber and green encode the coverage gap and nothing else.** Green is what
  the state covers, amber is the shortfall. Do not use either decoratively.
- **One primary button style**, for the one primary action per view.
- **Two animations exist**, both in `lib/gap-bar.js`: the gap figure counts up
  and the split bar grows. Nothing else moves.
- **Terminology is fixed**: benefit program, membership, monthly benefit. Never
  insurance, policy, premium, or coverage in a sense implying an insurance
  contract.
- **The benefit is a total, not an income.** It is paid in a fixed number of
  installments and then stops. The monthly figure never appears without its
  total and installment count beside it — see `plan__benefit-total` in
  `PlanCard`, `data-summary-terms` at checkout. Do not separate them.
- **Never recommend upward.** `recommendPlan()` returns the cheapest tier that
  closes the gap. Nothing else on the ladder gets emphasis: no "most popular",
  no default landing on an expensive window. With no computed gap the window
  opens at the *bottom*. Where nothing closes the gap, the copy says so rather
  than offering the top tier as an answer.
- **Prices use `price()`, not `money()`.** `money()` rounds to whole dollars,
  which is right for an estimate and wrong for $24.99.
- **Two faces, split by role, not by importance.** Archivo carries display,
  figures, buttons, labels, and tabular data; Literata carries prose. A table
  and a paragraph should not read in the same voice.
- **Nothing renders as an empty state.** The gap band arrives populated, the
  calculator's first step has an orientation panel, and plan cards keep a live
  CTA even before Stripe is connected — the unavailable state is said once at
  the section level. A page whose every action is dead teaches visitors the
  site is broken.
- **Adjacent sections never share a surface.** The ladder is
  `--surface-sunken` / base / `--surface-warm` / `section--deep`. Cards sit on
  a deeper ground than themselves so they have something to lift off.
- **The wordmark is typographic and there is no logo mark.** The rule under
  "Secure" is the covered green, which is the one place the gap palette appears
  outside a covered/uncovered split — it earns it by meaning the same thing.
