# LP Handoff

How copy written by the marketing team becomes a page in this repo.

Marketing writes landing page copy with their own skills (`lp-creator-segments-acme`, `lp-creator-platform-acme`, `lp-creator-acme`, all governed by `acme-lp-shared-rules`). Those rules are mirrored here as `ai/contracts/copy-rules.md` and the approved facts as `ai/contracts/copy-data.md`.

**The one rule this contract exists to enforce: marketing copy is an input, not a draft.** The pipeline transports it into blocks. It does not improve it, shorten it, re-voice it, or "refine" it. When copy and block disagree, the pipeline reports the conflict and stops - it never resolves the conflict by rewriting a marketer's sentence.

---

## Three modes for text

Which mode applies is decided by where the text came from, not by how good it looks.

### R1 - transported verbatim (default)

Every field that has a counterpart in the LP document is copied **byte for byte**. No re-casing, no trimming, no "tightening", no em-dash normalization, no synonym swap. `ai/prompts/copy-refiner.md` is not run at all in this mode.

The only permitted transformation is markup the renderer requires, and only where the LP document asked for it:
- `{{word}}` for a gradient highlight
- `||` for a deliberate line break

Both are added only when the LP document marks the intent. Neither may change a word.

### R2 - mechanical gap fill

Blocks require fields the LP document has no slot for: step labels (`label: "Days 1-3"`), icon choices, `alt` strings, card `note` lines, tab labels, `outcomeRows` headers. These get written by the pipeline, under two constraints:

1. **Never a persuasive field.** No headline, no hero line, no card description, no CTA label, no FAQ answer. If a persuasive field is missing from the LP document, that is a fit-report item, not a gap fill.
2. **Always declared.** Every generated string is listed in the batch `review.md` under `## Written by the pipeline`, field path and value, for the copy author to approve or replace.

ALT text is the one exception worth naming: marketing's skills already generate ALT per section, so ALT is R1 when the LP document carries it and R2 only when it does not.

### R3 - the pipeline writes for itself

`ai/prompts/copy-refiner.md` survives for exactly this: demo content for a new block, `/blocks` showcase fixtures, and contract examples. There is no marketing copy in those places by definition. R3 never touches a page built from an LP document.

---

## Fit-report instead of rewriting

When copy does not fit the block, the pipeline produces a fit-report line and stops before import. It does not shorten, pad, split, or move copy on its own authority.

Format, one line per conflict, collected in the batch `review.md` under `## Fit report` and shown to the author:

```
[fit] S4 / pain-points-comparison / items[2].description
      got:      212 chars, 34 words
      fits:     ~170 chars before the card grows a third line at 1440px
      options:  a) cut to the first two clauses (author's call)
                b) move this row to `feature-grid`, which has no card height floor
                c) keep as is and accept a 3-line card
```

Rules for the report:
- State the measured number and the block's real limit, never "too long".
- Offer options, do not pick one. Option (a) is always "the author cuts it".
- A block swap is a legitimate option and often the right one - the block library exists to fit the copy, not the reverse.
- Never propose "let me rewrite this".

The reverse case counts too: copy **shorter** than a block's floor. `functional-capabilities` cards are `min-height: 341px`, so a 12-word description leaves a visibly empty card. That is a fit-report item, not an invitation to pad.

---

## The LP document

Marketing's skills already produce a markdown file: a brief header, then the sections, then their own verification table. Two additions make it machine-readable without asking a marketer to write JSON.

**1. Stable section ids.** Each section heading carries its id: `## S4 - Pain Points`. The number is the contract, the words after it are for humans. A renamed section still maps; a renumbered one does not.

**2. Labelled fields inside a section.** Flat `Key: value` lines and simple lists, no nesting:

```markdown
## S1 - Hero

Focus keyword: AI receptionist for cleaning companies
Title: Every inbound call answered, every job booked
Description: Your agent picks up in 2 rings, qualifies the job, and books it into ZenMaid.
Primary CTA: Get Started Free -> /signup
Secondary CTA: Request Demo -> /request-demo
Primary note: No credit card required.
Secondary note: 30-min consultation
ALT: Cleaning company owner reviewing an AI receptionist handling a Saturday booking request
```

The file lands at `data/ai-page-generation/<batch-id>/lp.md`. It is the input to `create-page`, and it stays in the batch as the record of what the author actually wrote.

Anything the pipeline cannot map raises an error naming the section id. It never guesses which block a stray heading meant.

---

## Section to block mapping

Verified against all 45 registered types. This mapping needs no new blocks; the two exceptions are called out at the bottom.

| LP section | Block | Notes |
|---|---|---|
| S1 Hero | `hero` | The three layers land natively: `eyebrow` = focus keyword, and it renders as the `<h1>` while `title` drops to `<p>`. That is exactly the marketing intent ("keyword as a small H1"). `mediaSize: wide`. Use `hero-extended` only for the homepage-style extended hero |
| S2 Social proof | `logo-strip` or `metrics` | `logo-strip` for logos plus compact stats, `metrics` when the four platform numbers are the point |
| S3 Business benefits / Core capabilities | `use-cases-grid` or `functional-capabilities` | Card shape matches: 2-4 word label + 20-35 word description. `functional-capabilities` has a 341px card floor - use the top of the word range. `width: "wide"` closes a ragged final row |
| S4 Pain points | `pain-points-comparison` | The block wants problem → agent response. The LP section gives problem + consequence + stat. Either the author supplies the response column, or the section goes to `feature-grid`. Decide in the brief, do not improvise |
| S5 How it works | `how-it-works` | 3, 4, or 6 steps. `label` for day ranges. `infoNote` only for a closing caveat |
| S6 Product screenshot | `hero.media` or `feature-rows` | No canvas screenshot asset exists yet. Until one does, this section is skipped with the reason recorded, or carries a placeholder path plus an asset request in the review |
| S7 Mid-page CTA | `cta` | |
| S8 Who it's built for | `coverage-grid` or `use-cases-grid` | `coverage-grid` for service lines and coverage, 6-8 cards |
| S9 Channels | `channels-grid` | Five cards, ordered per `copy-data.md`. Every card needs its own image or the block falls back to recruiting mockups |
| S10 Platform capabilities / architecture | `feature-stack` or `industry-expertise` | `feature-stack` for three stacked proof cards plus an evidence note; `industry-expertise` with `visualType: "capabilities"` when 5-6 capabilities need interactive explanation. Note that variant hides the preview image |
| S11 Integrations | `logo-grid` or `capability-tools` | `capability-tools` when each capability must show the tools behind it. `logo-grid` items need `subLabel` or `url` or they get dropped |
| S12 Comparison | `difference` or `pricing-details` (`variant: "comparison"`) | `difference` for a two-column us-vs-them contrast; `pricing-details` when it is a real criteria table |
| S13 Results | `results-stats` or `metrics` | Number first, explanation second - the block's typography assumes it |
| S14 Pricing | `pricing-cards` + `pricing-policy` | Two cards, locked tier names, `info` for mechanics below the cards. `pricing-policy` for billing caveats |
| S15 Budget comparison | `pricing-details` (`variant: "comparison"`) | Rows from the anchors in `copy-data.md` |
| S16 Security | `security` | Four cards, matching the four-part boilerplate exactly. `title` and `titleGradient` render as two lines |
| S17 Testimonials | `testimonials` | Omitted while no approved quotes exist - see `copy-data.md` → Testimonials |
| S18 Blog | `news-insights` | Position and filtering only; the site resolves posts at render time |
| S19 FAQ | `faq` | 6-10 items, answers 40-60 words. `title` + `titleGradient` are two lines; no `{{ }}` inside `title` |
| Sources | none, until URLs exist | No citation block exists, and a `rich-text` list of publication-plus-year only restates the inline attributions. Citations stay in the batch review until `copy-data.md` holds URLs - `copy-rules.md` project decision 6, narrowed |
| Category definition (platform pages) | `rich-text` or `side-by-side` | 40-70 words, must read standalone. If neither block carries it with acceptable design, this is the strongest candidate for the one new block a page is allowed |

Two more marketing sections have no block and are not page content:
- **SEO metadata** → the document's `seo` fields.
- **Schema markup** → `seo.schemaJson`. `SiteLayout.astro` renders it and `FaqBlock` already emits `FAQPage` on its own. `BreadcrumbList`, `Organization`, `SoftwareApplication`, and `DefinedTerm` are not generated yet - open dev work.

---

## Gates specific to this handoff

On top of the standard page gates:

- `npm run qa:copy -- --file <batch>/pages.json --brief <batch>/brief.md` passes, or every finding is an accepted fit-report item signed off by the author. Passing `--brief` matters: without it every figure the brief introduced reads as unsourced.
- `npm run qa:keyword-collision -- --keyword "<focus keyword>" --path <path>` passes. This replaces marketing's "check the content plan and LP tracker" step, which has no equivalent artifact in this repo: the check runs against the live CMS, `data/cms/pages.json`, and site navigation instead.
- Every R2-generated string is listed in the review under `## Written by the pipeline`.
- The fit report is empty or explicitly accepted.
- `npm run qa:copy-fidelity -- --lp <batch>/lp.md --file <batch>/pages.json` passes. This is the mechanical proof that nothing was rewritten: every value in `lp.md` must appear in the built page unchanged, and the check reports the closest match when it does not, so the diff is visible. A single changed character is a bug in the pipeline, not a style improvement - it catches a dropped Oxford comma, a pluralized noun, a normalized dash.
- The same run lists every string on the page that is **not** in `lp.md`. That list is what goes into the review under `## Written by the pipeline`. It is expected to be non-empty (step labels, icons, ALT the author omitted) and it is never allowed to include a headline or a description.
