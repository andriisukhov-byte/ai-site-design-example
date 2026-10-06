# Review - /lead-qualification-agent/

**Verdict: CHANGES REQUIRED. Do not import this batch as-is.**

The page was composed, schema-validated, imported, rendered, and reviewed. It is clean on content hygiene and reads well, but an independent review found five blockers, and two of them invalidate the premise the page was built on. The generated document was reverted to `draft` in the local CMS and the route is no longer served locally.

## Gate results

| Gate | Result |
|---|---|
| Schema dry-run (`cms:upsert --write false`) | pass |
| Renders 200, all 8 sections present in spec order | pass |
| Internal links resolve | pass - no internal links in page content; the 11 broken links on the page come from the site's global nav |
| Media - no broken images | pass - 17 images, all local under `/assets/`, no hotlinks |
| Keyword in meta title / meta description / URL | pass |
| Keyword in H1 | **fail - see B1** |
| Keyword in first sentence | fail - see B6 |
| No invented statistics, testimonials, or customer names | pass - verified independently |
| Element density within registry `idealItems` | pass on all six blocks |
| Independent review verdict | **CHANGES REQUIRED** |

## Blockers

**B1 - The page's only H1 is "Sales Use Cases".** Verified in the served markup: `apps/web/src/components/blocks/Heroes/HeroBlock.astro:31` sets `titleTag = block.eyebrow ? 'p' : 'h1'` and wraps the eyebrow in `<h1>`. So whenever a `hero` block has an eyebrow, the eyebrow becomes the H1 and the headline is demoted to `<p>`. The brief's hardest SEO requirement - primary keyword in the H1 - therefore fails, even though the headline text is correct on screen. This is a site-wide trap, not a typo in this page.

**B2 - The route already exists as a published page, and the brief is a revision spec for it.** `data/cms/pages.json` contains `/lead-qualification-agent/` in collection `pages`, template `standard`, status `published`, contentKey `8e6b194d8dadaa1f`. It also contains the exact defect the brief asks to fix: the string `Get Start For Free` appears once on it. The brief's other hints point the same way - "SWAP to homepage model, **per prior request**" and "fix **source's** inconsistent label" both describe editing something that exists.

Why the check missed it: the local CMS was seeded from `data/source/cms-pages.json` (332 documents), but `data/cms/pages.json` holds a newer 361-document snapshot that includes this page. The route-availability check queried only the running CMS, so the route looked free. A route is only free when it is absent from the running CMS **and** from `data/cms/pages.json`.

**B3 - The site has a use-case template family this composition ignored.** `BlockRenderer.astro:119-141` swaps in six dedicated renderers based on `root.className` markers: `uc-hero`, `uc-features`, `uc-problem`, `uc-hiw`, `uc-impact`, `uc-onboarding`. The existing `/lead-qualification-agent/` page uses exactly that chain, as do many sibling use-case pages. Nothing in `ai/` or in the page-generation skills mentions the family - `grep` returns no hits - so the composition used generic homepage-styled blocks instead. `uc-hero` is also the fix for B1: `UseCaseHeroBlock.astro:38-39` renders the eyebrow as a `<span>` and the title as the `<h1>`.

**B4 - Wrong collection means a duplicate, not an update.** `tools/cms/upsert-content.ts` matches an existing document by `path` **within the declared collection**. This batch declares `use-cases`; the live record is in `pages`. Importing therefore creates a second document on a live route rather than updating it. Confirmed against the code path and the snapshot; the local import did create a separate `use-cases` document (id 6).

**B5 - Section 5 does not deliver the five requested metric rows, and the stated reason was wrong.** The brief asked for a before/after table with five metric rows and defensible numbers; this page used `pain-points-comparison`, which has no metric column, and the batch brief justified dropping the numbers as "no approved measurement exists". That is false: the existing published page carries all five rows in a `pricing-details` `variant: "comparison"` table with approved figures (time to qualify, share of inbound worked, rep time on unqualified leads, hot leads contacted same day, triage hours per week). The numbers existed in the repo and were not used.

**B6 - Section 4 has no product visual and the chosen block cannot show one.** `_industry-expertise.scss` sets `display: none` on the preview image, diagram, and preview copy for the `--capabilities` variant, so the "include a product visual" requirement cannot be met with this block even by supplying an image. The block also renders hardcoded demo copy from its source section ("Ethan Walker", "Is the XL black hoodie back in stock?") into the DOM - CSS-hidden, but present and off-topic.

## Should-fix (independent of the structural decision)

1. `faq` - the four questions split across two accordion groups (`product` x3, `platform_overview` x1), leaving an orphan group with one item and three filter chips for four questions. Drop the categories; the existing page's FAQ has none.
2. `faq.titleGradient` is `"Lead Qualification"`, so the visible phrase stops short of "Agent".
3. `pain-points-comparison.rows[4].leftDescription` ends in a dangling clause: "...every week the team keeps up."
4. Channel roster contradicts itself three ways across `functional-capabilities.cards[0]`, `industry-expertise.items[0]`, and `faq.items[0]` - SMS appears in one and not the others. Pick one roster.
5. Two unverified product claims: cross-channel identity stitching ("keeps their history and score" when a lead switches channels) and a specifically named "lead-qualification template".
6. `functional-capabilities` cards have a fixed `min-height: 341px`, so one-line descriptions leave large empty boxes.
7. `feature-stack` mobile description is `#8B8B8B` on `#F9F9F9` at 16px - 3.24:1, below WCAG AA. Stylesheet-level, affects every page using the block.

## Recommendation

Rebuild this as a revision of the existing document: `collection: pages`, `contentKey: 8e6b194d8dadaa1f`, on the `uc-*` renderer chain, carrying the existing approved impact numbers, and applying the brief's actual asks - fix the "Get Start For Free" label, swap section 4 to the homepage model, and keep the lean section set. That fixes B1 through B6 at once.

Open question for the content owner: `/ai-lead-qualification/` also exists as a published `use-cases` page titled "AI Lead Qualification Agent", and the site nav's "Use Cases -> Lead Qualification" item points at it. Two published pages then compete for the same primary keyword. Someone needs to decide which route is canonical before either is revised.

## What was left behind

- Generated document: `use-cases` id 6, reverted to `draft`, not serving.
- Nothing was changed on any pre-existing page.
