# myincomesecure.com — migration history

Two moves, in order: WordPress to Astro, then a conversion rebuild on top of it.

---

## Phase 1 — WordPress to Astro (lift and shift)

Source: `myincomesecure_WordPress_2026-08-29.xml` (WXR export, WordPress 7.1).

Almost nothing was WordPress-specific. Three of the four real pages were a
single `wp:html` Gutenberg block each — hand-written HTML with inline `<style>`
and `<script>`, pasted into the editor. WordPress was acting as a file host.

- Elementor installed but unused: an empty Default Kit and a blank draft.
- No images. The media library was referenced by nothing.
- No forms, no contact plugin, no shortcodes.

So the migration was a lift-and-shift. Each page's HTML went into `src/html/`
verbatim, injected by a thin Astro wrapper, rendering byte-identically to what
WordPress emitted.

Dropped: `Hello world!`, `Sample Page`, `Elementor #17`, and the
`wp_global_styles` / `wp_navigation` / `elementor_library` internals.

---

## Phase 2 — conversion rebuild

The lift-and-shift preserved the site faithfully, including the reasons it did
not sell. The homepage was four sections with no pricing, no tiers, and no
trust content. The filing guide — the strongest asset — had no conversion
mechanism across its entire length. Checkout was a placeholder constant with a
`mailto:` fallback, so nothing could actually be bought.

The rebuild collapses everything to one path:

```
gap reveal  →  plan selection  →  checkout
```

### What replaced what

| Before | After |
|---|---|
| `src/html/index.html` | `src/pages/index.astro` + components |
| `src/html/what-would-state-...html` | `src/pages/what-would-state-...astro`, now a 4-step flow |
| `src/html/what-to-do-if-you-...html` | `src/pages/what-to-do-if-you-...astro`, monetized |
| `src/html/privacy-policy.html` | **kept, imported verbatim** — legal text, restyled only |
| 3 copies of nav, footer, and CSS custom properties | `components/Nav`, `components/Footer`, `styles/tokens.css` |
| 20KB DOL dataset inline in a `<script>` | `src/lib/states.js` |
| 53-row agency table hard-coded in markup | `src/lib/state-agencies.js` |
| `WUS_CHECKOUT_URL = 'REPLACE_WITH...'` | `src/config/plans.js` + `lib/checkout.js` + `/api/checkout` |

The two data modules were extracted mechanically from the migrated HTML rather
than retyped, so the values are the originals.

### Design direction

Navy `#1B3A6B` stays as the anchor. Two changes carry the rest:

- **Hierarchy runs on the width axis.** Archivo (wdth 62–125) sets display and
  figures; the gap number is Expanded Black at up to 8.5rem. Public Sans — the
  US Web Design System face — sets body and data, which is the right register
  for content sourced from the Department of Labor. Both self-hosted as variable
  woff2, both preloaded, ~117KB total.
- **Amber and green became semantic.** They now encode only the coverage gap:
  green for what the state covers, amber for the shortfall, in opposing visual
  weights so the deficit reads before any text does. They appear nowhere else.

The gap reveal is the one dark moment on an otherwise light site, and the only
place anything animates. It appears twice — the homepage worked example and the
calculator result — using the same component both times, so the homepage teaches
the reader how to read their own number before they have one.

### Structural notes

- All four original URLs are byte-identical, trailing slashes included.
- `/plans/` and `/checkout/` are new.
- Every page is prerendered. `/api/checkout` is the only SSR route, which is why
  `@astrojs/node` is in the build.
- Funnel events are declared in `src/lib/analytics.js` and push to
  `window.dataLayer`. No provider is connected yet.

### Content that did not survive, and why

Every specific claim on the old site that could not be traced to a source was
left out rather than carried forward — the benefit range, approval time,
eligible ages, "no exam", the tier names, two eligibility rules, and the
$2,600/mo expense benchmark. The homepage worked example was rebuilt to run off
a visitor-entered figure against each state's statutory maximum, so it needs no
benchmark at all.

`OPEN-ITEMS.md` lists all of it, plus what the privacy policy no longer covers.

---

## Phase 3 — real program data

The program documents arrived and corrected a structural assumption. The site
had been built as though each tier paid a *monthly benefit* for an unstated
duration. It does not: each tier's headline figure is a **total**, paid in three
installments at 30-day intervals, each one only if the member is still out of
work. Re-employment forfeits the rest.

That is a materially different product, and the change runs deeper than copy.

### Schema

`src/config/plans.js` now authors two numbers per tier — total limit and monthly
price — and derives everything else:

```
totalLimit      the headline figure, and the tier's name
monthlyBenefit  floor(totalLimit / 3), what is measured against the gap
installments    3
```

Floor rather than round, deliberately. On a thirds division the monthly figure
must understate the installment: 3 × $666 fits inside a $2,000 limit where
3 × $667 exceeds it and reads as a discrepancy against the certificate.

`lib/format.js` gained `coverageLine()` and a `price()` formatter — `money()`
rounds to whole dollars, which is correct for an estimate and wrong for $24.99.

### Eleven tiers, three cards

Three cards could not hold an eleven-step ladder, so `PlanGrid` became
`PlanWindow`: every tier renders server-side into a scroll track, and JavaScript
narrows the view to three. Without JavaScript the whole ladder is present and
scrolls. Good / Better / Best label the three visible *slots* and re-label as
the window moves; they are positions, not tiers.

The window opens centred on whichever tier closes the visitor's computed gap.
With no gap it opens at the **bottom** of the ladder, and `/plans/` makes the
calculator its primary action rather than a tier — a visitor without a number
has given us nothing to recommend from, and any other default would be a nudge
dressed as a suggestion. Nothing carries "most popular" styling. Where no tier
closes the gap, the copy says so and names what is left uncovered, rather than
presenting the top of the ladder as the answer.

### Disclosure structure

`DISCLOSURES` in `config/site.js` holds three pieces of legal wording that must
be supplied verbatim: the underwriting entities, the surplus lines notice, and
the Florida license. Each renders only once populated — an unfinished disclosure
frame is worse than none.

The surplus lines notice additionally gates the sale. It is a separate
acknowledgement from the TCPA consent, separately required, recorded with its
own version and timestamp, and enforced in `/api/checkout` as well as in the
form.

The non-insurance disclaimer was **not** touched. There is an underlying policy
placed as surplus lines, which the current wording does not distinguish from the
membership itself. That is a question for counsel, and it leads `OPEN-ITEMS.md`.

### The filing guide became load-bearing

A claim requires the member to be approved for state unemployment for the same
period. That turns the guide from top-of-funnel content into part of the
product — a member who never files cannot collect — and it is now stated on the
homepage, the calculator result, `/plans/`, at checkout, and in the guide itself.

---

## Phase 4 — visual system

The structure was right and the surface was unfinished: no imagery anywhere, a
body face that read like a government form, desktop layouts that were mobile
stretched into a narrow left column, and — worst — a signature gap band that
arrived empty.

### Nothing renders as an empty state

The homepage gap band now arrives fully painted: a real state, a real statutory
maximum, a real split. The spending figure is a **slider position** rather than
a text field, which is what keeps it from reading as a claim about what anyone
spends — a handle is visibly a thing you move. `renderGap` gained an `animate`
flag so the band can paint complete on first load and still count up when it
scrolls into view.

The calculator's first step gained an orientation panel that tracks progress,
so step one is a screen rather than a lone dropdown. Plan cards kept a live
primary action; "not yet purchasable" is stated once at section level and again
as a proper pending state at checkout, instead of eleven dead grey buttons.

### Type

Public Sans out, **Literata** in. Public Sans is the US Web Design System face
and it made the site read like the benefits form it is arguing against. Archivo
stays and takes on more: display, figures, buttons, labels, and all tabular
data. Literata carries prose only. The split is by role, so a table and a
paragraph no longer speak in the same voice. No italic file ships.

### Imagery

Four `ImageSlot`s, sized and reserved in `config/images.js`, each rendering a
layered navy placeholder until a photograph exists. An inline SVG `Icon` set
drawn on a 24-unit grid at Archivo's weight — no icon library. A typographic
`Wordmark` with an `MIS` monogram; deliberately **no invented logo mark**.

### Depth and desktop

Four elevation steps and a three-step surface ladder replaced "white rectangle,
1px border, white background". Adjacent sections never share a surface. The
hero, `/plans/` terms, the calculator, the guide header, the trust section and
checkout all became real two-column compositions, several with sticky columns —
the hero's statutory-maximum card deliberately overlaps the image edge, which
is what makes it a composition rather than two boxes side by side.

---

## Running it

```
npm install
npm run dev
npm run build
```

See `README.md` for structure and deployment.
