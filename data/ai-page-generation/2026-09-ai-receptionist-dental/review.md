# Review: /ai-receptionist-for-dental-clinics/

Batch `2026-09-ai-receptionist-dental`, built 2026-09-15 from an abstract page spec (8 fixed sections, lean type).
Payload id 165, collection `pages`, status `draft`.

All departures from the page-type template live in the **header of `brief.md`**, where the spec requires them. They are not repeated here.

## Block threshold table

| Spec section | Candidate from registry.ts | Verdict | Why |
|---|---|---|---|
| 1 Hero | `hero` | reuse | Industry-page pattern on this site. |
| 2 Capabilities | `capability-strip` -> `functional-capabilities` | reuse | `capability-strip` ships only 4 named icons and repeats one shield glyph for anything else. Same finding as batch `2026-08-lead-qualification-agent`. |
| 3 Problem | `feature-grid`, columns 3 | reuse | Icon + bold heading + 2-3 sentences, no minimum card height. |
| 4 How it works | `how-it-works` | reuse | The only block with ordered stages carrying a time label plus one sentence. |
| 4b Product visual | `media-showcase` | reuse | `conversation-replay` would need a scripted story this page does not have. |
| 5 What changes | `pain-points-comparison` | reuse | Two-column before/after table, 4-6 rows. |
| 6 How to launch | `live-in-days` | reuse | Start / Build / Test / Launch reassurance. Placement is a declared departure. |
| 7 Closing CTA | `cta` | reuse | - |
| 8 FAQ | `faq` | reuse | - |

No `new` verdicts. No new block was created for this page.

## Written by the pipeline

All copy was written here (track B), not transported from a marketing `lp.md`. Service fields worth an author's eye:

- `blocks[3].steps[].label`: "Ring 1", "Second 20", "Minute 1", "Minute 2", "Minute 3", "Hour 48"
- `blocks[6].items[].label`: "Start - Day 1", "Build - Days 2-4", "Test - Days 5-7", "Launch - Days 8-15"
- `blocks[0].primaryNote` "No monthly fee.", `secondaryNote` "30-min consultation"
- `blocks[4].image.alt` - describes the nodes actually visible in the asset, not the ones the section would prefer
- All icon names

## Gates

| Gate | Result |
|---|---|
| `cms:upsert --write false` | clean |
| `qa:keyword-collision` | `ok: true`, no findings |
| `qa:copy --brief` | `ok: true`, 0 findings |
| `qa:no-hotlinks` | run against a production build, see the run log |
| page 200, all 9 sections in HTML | pass |
| rendered `<h1>` | `AI Receptionist for Dental Clinics` - keyword, one H1 |
| internal links | `/conversational-ai-platform/` 200; 3 primary CTAs, all to `/signup` |
| media | no 404 among page resources |
| `typecheck` | 0 errors, 153 files |
| `qa:no-inline-block-styles` | `ok: true`, 55 scanned |
| independent reviewer | pass 1: NOT APPROVED, 19 findings (2 blockers). pass 2: NOT APPROVED, 10 (2 blockers), 4 of them introduced by the pass-1 rewrite. pass 3: NOT APPROVED, 4 (1 major), introduced by the pass-2 rewrite. All fixed. |

## What the independent reviewer caught that self-review did not

Recorded because it is the point of the gate, not an embarrassment to hide.

- **Blocker.** The page was left `published` in Payload while `review.md` claimed it was back in `draft`. A recurring tail across runs.
- **Blocker.** `seo.robots: "noindex, nofollow"` was copied from a sibling test page onto a keyword landing page. Dev masks it through `PUBLIC_SITE_NOINDEX`, so it would only have surfaced in production.
- **Major.** The product visual's alt text described nodes the image does not contain (insurance, web chat). The borrowed-asset tail was recorded, but the alt text turned it into a false statement.
- **Major.** Five near-verbatim phrase repeats across sections, which `qa:copy` does not check.
- **Major.** Triadic lists x4 and negative parallelism x3, both capped at one per page by `copy-rules.md` and both unchecked by the gate.
- **Major.** Departures were argued in this file instead of the brief header, so `brief.md` contradicted the page it describes.
- Minors: overlapping day markers (Test Day 5 / Launch Days 5-15), a `{{ }}` marker leaking into an `aria-label`, the FAQ's fourth objection type hidden inside a collapsed second category, meta description drift between brief and JSON, the keyword missing from the hero sentence.

All of the above are fixed. Two findings were answered with a declared departure rather than a change: the relaxed 2 -> 4 -> 5 linkage for three capability cards, and the missing heading in section 6.

## Importer trap found on this page

`cms:upsert` writes the fields that are **present** in the JSON. Deleting a key from the batch file does not clear the stored value - the document keeps whatever it had. `seo.robots: "noindex, nofollow"` was removed from `pages.json`, the re-import ran and updated every other field, and the live document still carried `noindex, nofollow`. In dev this is masked by `PUBLIC_SITE_NOINDEX` in `apps/web/src/layouts/SiteLayout.astro`, so a rendered-HTML check does not catch it either.

Two consequences:

1. The field is now written as an explicit empty string in the batch file, and the stored value was cleared with `PATCH /api/pages/165 {"seo":{"robots":null}}`. Verified against the API, not against the file.
2. **Any earlier batch that removed a field by deleting its key should be re-checked against the API.** "Delete the key to remove the value" does not work through this importer.

## What the second review round caught

Four of the ten findings were **introduced by the first round of fixes**, which is the argument for reviewing twice rather than once:

- The repetition fix replaced a sourced claim with an unsourced one ("three callbacks over two days is the normal path"). `qa:copy` could not see it: `statShape` in `tools/qa/copy-gate.ts` matches digits attached to `%`, `+`, `x` or `$`, so a spelled-out number is invisible to the figure check.
- Two new tricolons appeared in the rewritten alt description and FAQ answer.
- The measurable-quantity fix created a same-row echo: "Minutes Lost to Routine Questions" opposite "Routine Questions Leave the Desk".
- Prefixing the keyword pushed the hero description from 21 to 23 words, over the copy-length ceiling of 20. `qa:copy` flags at 25.

Also fixed: residual verbatim heads, and numerals spelled out in about a dozen places against the "numerals for all figures, including under ten" rule, which nothing in `qa:copy` checks.

The third round found four more, all of them created by the second round's fixes:

- Shortening the hero sentence to satisfy the 20-word ceiling silently broke the template's required subtitle shape: the "when" disappeared, the third outcome disappeared, and "and text" went with it - so the hero promised voice only while the comparison table and the FAQ promised five channels, and the meta description still promised a confirmation the hero no longer mentioned.
- Breaking a head-repeat left an answer without an actor: "Pain ... reaches you directly." Pain does not reach anyone.
- Applying the numeral rule in seven places made it inconsistent with the places it was not applied: "the 2 that fit" in one section against "the two slots that fit" in another.
- De-duplicating a verb cost precision: "puts it on the right provider" is not something a reader can picture.

The hero finding is the one worth keeping. The template requires both the keyword in the first hero sentence and a subtitle of the shape "what happens + when + three outcomes"; the keyword alone is 6 words and the two requirements do not both fit inside the 20-word description ceiling. That is a fit-report, not a copy problem. The shape and the keyword won, the length rule gave, and the overrun is declared as departure 8 in the brief header.

Three findings were answered with a declaration rather than a change:

- `live-in-days` labels sit close to the separator rules at 1440 now that the day markers are longer. No clipping, no overlap; the alternative is dropping the day marker the spec requires.
- The `faq` filter renders "All | Product" - two chips producing the same result - now that all four questions are in one category. Renderer behaviour; recorded as a library gap, because the spec's requirement that all four objection types be visible outranks a cosmetic filter.

## Open tails

- **Figures need marketing sign-off.** `copy-data.md` carries no dental or healthcare pain data. The four figures on this page (Peerlogic 2026, Dentina 2026 x2, Planet DDS 2025) live in `brief.md` with sources. They must be approved and added to `copy-data.md`, or removed, before publication.
- **Channel order for healthcare is unresearched.** The page is built voice-first. `copy-data.md` forbids defaulting either way for healthcare; the decision is recorded in the brief header and needs the author's confirmation.
- **No practice-management tool is named.** A researched dental integration list would make the capability and flow sections concrete.
- **Product visual is borrowed.** `media-showcase` reuses `/media/2026/07/img-3-scaled.png`. A dental-specific canvas shot would carry the section.
- **`capability-strip` icon vocabulary is 4 icons.** A `create-block` candidate if the literal chip layout is ever wanted.
- **`live-in-days` has no heading element.** Section 6 is invisible to a heading-navigating reader. A library gap, not a page defect.
- **`faq` shows a filter row at one category.** Two chips, identical results. Someone should decide whether the block hides the filter below two categories.
- **`qa:copy` cannot see spelled-out figures, tricolons, negative parallelism, or numeral casing.** All four are rules in `copy-rules.md` and all four had to be caught by a reader. Candidates for the gate.
- Also filed in `docs/migration/open-questions.md`.
