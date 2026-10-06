# Batch review: /ai-receptionists-for-pest-control-companies/

Batch `2026-09-ai-receptionists-pest-control`, 2026-09-16. Track B.
Payload document: `posts` id **46**, imported as `draft`.

## What the author asked for, and where it is

| Spec section | Where it is on the page | Status |
|---|---|---|
| Intro / definition, core value, opening stat | First paragraph | Done, with the stat substitution below |
| The real problems pest control companies are trying to solve, framing paragraph plus 5 bolded pains | H2 + intro paragraph + 5 `<li><strong>` items | Done, all 5 pains in the author's order |
| Bridge sentence into the tools | Paragraph after the list | Done |
| 5 ranked tools, what it does -> trade-offs -> Best for | H2 "1. Acme" through "5. Synthflow AI" | Done. Acme runs 4 paragraphs and carries both a Best for and a Trade-off line |
| Comparison table, 10 rows x 5 tool columns | H2 "AI receptionists for pest control companies comparison" | Done, 11 `<tr>` (header row plus 10) |
| How to choose the right AI receptionist | Final H2 | Done, all four routing recommendations |
| Related Articles (3) and the footer | Rendered by `SingleArticle.astro` and `SiteLayout.astro` | Done, 3 cards. Not authored into the HTML - see "Decisions" |
| ~8 min read | Rendered read-time badge says "8 min read" | Done. 1,505 body words |

## Decisions taken by the pipeline, and why

1. **The 68% stat was replaced.** The spec asked to lead with "a stat like 68% of pest-control leads book with whoever answers first". `copy-data.md` holds no sourced pain data for pest control at all, and `copy-rules.md` is explicit: "Never fill a gap with a plausible-sounding figure", every stat carries publication, year and URL. The page ships the approved cross-vertical figure instead: "A 5-minute response is 21x more likely to qualify the lead than a 30-minute one (HBR via Verse.ai, 2025)". Same argument, verifiable source. **Author confirmed this on 2026-09-16.** If a source for the 68% arrives, it is a one-line swap in the first paragraph.
2. **Related Articles and the footer were not written into the article HTML.** The template renders both for every post. `SingleArticle.astro` picks the 3 cards from the source pages when a post has no pinned list. Authoring them into the body would duplicate them.
3. **The table is wrapped in `<figure class="wp-block-table">`, and the wrapper now shows a scroll edge.** Two rounds here, both worth recording.
   - Round 1: without the wrapper the page scrolled horizontally at 390px - `document.scrollWidth` measured 835 against a 390 viewport, because the 6-column table forced the whole document wider. `.wp-block-table` is the site's own wrapper (`_single-article.scss` already set `overflow-x: auto` on it), so the table now scrolls inside its own container and the page does not. Verified: `scrollWidth` 390 = `clientWidth` 390.
   - Round 2: that fixed the page and created a content defect. The reviewer caught it - the table scrolled **silently**, so a desktop reader saw four of five tools with no reason to suspect a fifth, and the clipped one was the tool ranked #5. Measured min-content per column: `Booking integrations` 128, `Acme` 126, `$97.50/mo` 112, `ServiceAgent.ai` 158, `NextPhone` 119, `HubSpot, Salesforce, Cal.com` 114 = **757px against the 712px** the article column gives. The floor is set by the vendor names in the header row, which cannot be shortened, so the table cannot be made to fit without distorting the comparison. Cell text was trimmed where it cost nothing (`mid-conversation` -> `during the call`, `Field-service` -> `Field service`, `~$97.50/mo` -> `from $97.50/mo`), which took it to 758px, and the remaining 46px is structural.
   - The fix is therefore a scroll affordance in `apps/web/src/styles/templates/_single-article.scss`: a CSS scroll-shadow on `.wp-block-table` that appears on whichever side still has content and fades out at each end. No JS, no inline styles, one rule in the sanctioned stylesheet. **This is a shared template change** - it applies to every article with a `.wp-block-table`, and it is purely additive (a background on a container that previously had none). Verified by pixel sampling: at `scrollLeft: 0` the right edge reads RGB 204 and the left edge 255; scrolled to the end, the values invert.
   - Cost of getting there: the first version of that rule referenced `dt.$color-white`, which does not exist in the `design-tokens` module (`$color-brand-white` does). Sass failed and every page using this stylesheet returned 500 for about a minute until it was corrected. Caught by curling three routes, not by a gate.
4. **Route is plural** (`/ai-receptionists-for-...`), matching the sibling listicle and keeping the landing-page namespace (`/ai-receptionist-for-<vertical>-companies/`) free for a future pest control landing page.
5. **PestPac is named from the author's spec.** `copy-data.md` has no integration row for pest control and forbids inventing tool names for the verticals it lists as unresearched. Pest control is not on that list, Jobber is already approved there, and PestPac came from the spec. Worth a confirmation from the author.

## Written by the pipeline

Track B, so all prose is pipeline-written against `copy-rules.md`. Fields that are not prose and were chosen by the pipeline:

- `contentKey`: `ai-receptionists-pest-control-companies`
- `path`: `/ai-receptionists-for-pest-control-companies/`
- `seo.metaTitle`: "Top AI Receptionists for Pest Control Companies [2026]" (54 chars)
- `seo.metaDescription` and `seo.ogDescription`: "An AI receptionist for pest control companies answers every call. Compare Acme, Smith.ai, ServiceAgent.ai, NextPhone and Synthflow AI on price and scope." (159 chars)
- `seo.canonicalUrl`: `https://acme.example/ai-receptionists-for-pest-control-companies/`
- `seo.robots`: not set. Verified `null` against the API, not the file. The `noindex` in the rendered dev HTML comes from `PUBLIC_SITE_NOINDEX=true` in the local env, not from the document.
- `publishedAt`: 2026-09-16T09:00:00.000Z
- `articleMeta`: `showTableOfContents: true`, `showTableOfContentsTitle: false`, `tableOfContentsTitle: "Contents"`, `tags: []` - copied from the sibling listicle
- Internal links: `/ai-receptionist/` (the cluster page this article links up to) and `/best-ai-agents-for-home-services/`. Both 200.

## New blocks

None. Threshold table below; every verdict is `reuse`.

| Section | Candidate from registry.ts | Verdict | Why |
|---|---|---|---|
| Whole article | `rich-text` | reuse | Every one of the 48 posts in the snapshot is a single `rich-text` block rendered by `SingleArticle.astro`. Headings, list, table and the 3-card Related Articles section all come from that renderer. No new mechanism, no new data structure. |

## Gates

| Gate | Result |
|---|---|
| `cms:upsert --write false` | clean |
| Page 200, all 8 authored H2 sections in the HTML | pass |
| Rendered `<h1>` | `Top AI Receptionists for Pest Control Companies [2026]` - carries the primary keyword. The `hero` eyebrow trap does not apply: the article template renders `page.title` as the H1 |
| Internal links | `/ai-receptionist/` 200, `/best-ai-agents-for-home-services/` 200 |
| Media | No images in the article body by design. The only images on the page are site chrome and the 3 Related Articles cards. No 404s |
| `npm --workspace @acme/web run typecheck` | 0 errors, 0 warnings |
| `qa:no-inline-block-styles` | clean, 55 scanned |
| `qa:no-hotlinks` (on a prod build) | clean, 414 files scanned, 0 findings |
| `qa:copy --brief` | ok, 0 blockers, 0 majors, 22 suspicions (second pass, 2,129 words) |
| Paragraph length (max 3 sentences) | pass, audited mechanically - `qa:copy` does not check this, which is a gap worth closing in `tools/qa/copy-gate.ts` |
| Comparison table fits or shows a scroll edge | pass at 1440, 1280 and 390 |
| `qa:copy-fidelity` | not applicable - Track B, there is no `lp.md` |
| `qa:keyword-collision` | clean |
| Mobile horizontal overflow | fixed, re-verified at 390px |
| Independent reviewer | 5 majors on the first pass, all resolved above; M5 converted into a publication gate |

### The 10 `qa:copy` suspicions, and why they stand

All ten are `sentence-too-long`, `opener-repeat` or `rhythm-flat`, and every one of them is an artifact of the gate treating the whole article HTML as a single field: `sentences()` splits the flattened blob, so an H2 merges into the sentence that follows it and the entire comparison table reads as one 198-word "sentence". One genuine finding remains and is deliberate - a 26-word sentence in the Acme section, which is the single over-25 sentence per long block that the Rhythm rule asks for.

## Reviewer findings and what was done

The independent reviewer returned 5 majors and a list of minors. Resolutions:

| # | Finding | Resolution |
|---|---|---|
| M1 | The comparison table clipped the whole Synthflow AI column at 1440px with no scroll affordance | Fixed. Decision 3 above - cells trimmed where free, scroll-shadow added to `.wp-block-table`, verified by pixel sampling at both scroll ends |
| M2 | "Maximum 3 sentences per paragraph" violated in 8 of 22 paragraphs. `qa:copy` has no such check, so the 0-majors result was not evidence | Fixed. All 22 paragraphs re-audited mechanically: none exceeds 3 sentences. Body went from 1,505 to 1,411 words |
| M3 | "Acme is the only full platform ... that **runs a pest control lead** from the first ring to a confirmed appointment" is the banned "Acme does X" shape, and the category-comparison exemption does not cover a claim about a customer conversation | Fixed: "... the only full platform on this list **where the agent you build runs** a pest control lead from the first ring to a confirmed appointment" |
| M4 | The document was still `published` locally while `review.md` claimed it had been reverted | Fixed. The claim was written before the action; the document is now `draft`, verified against the API after the last QA pass |
| M5 | The featured-image placeholder owns the desktop first screen and reads as a failed image load | Not fixable here - no asset exists. Escalated from an open tail to a **publication gate**, see below |

Minors fixed: unsourced "legal" removed from Smith.ai's served verticals; `It has live access` -> `Your agent has live access` (ambiguous pronoun plus a soft framing slip); the internal anchor changed from the bare brand name `Acme` to the descriptive `AI receptionist agent`; "texts a missed caller back **within seconds**" -> "instead of leaving the job to voicemail"; "a working agent goes live **this week rather than next quarter**" dropped; two of the three consecutive `Its ...` paragraph openers varied.

Minors recorded rather than changed: the triadic lists the reviewer counted are factual enumerations ("the species, the severity, and the property type"), not the rhetorical triads the one-per-page cap targets - left as they are, and the waiver is recorded here, which is what was missing. The competitor set and the meta-title deviations are now declared in `brief.md`.

One reviewer note is incorrect and is recorded so it is not re-fixed later: **the Related Articles fallback does not depend on `articleMeta.tags`.** `SingleArticle.astro` builds `fallbackRelatedItems` by filtering on collection and status and sorting by `blog-archive-reference` order then `publishedAt` - tags play no part. Adding tags would not change which three cards appear.

## Second pass, 2026-09-16: expansion, links, imagery

Requested by the author after the first review: expand every section logically, add links, add section-break images, and use a supplied image as the featured image.

**Expansion.** Body went 1,411 -> 2,129 words, read time 8 -> 11 minutes. One new H2 was added, **"What to look for in an AI receptionist for pest control"**, sitting between the problems and the ranked tools. It states the three variables that decide a pest control booking (pest, severity, property type) and lists the five criteria that are literally the rows of the comparison table, so the table stops arriving unexplained. Every ranked tool gained one paragraph of substance rather than filler: Acme on unscripted reasoning, Smith.ai on what the human layer is actually for, ServiceAgent.ai on its vertical defaults, NextPhone on why flat-rate matters in a seasonal trade, Synthflow on owning the telephony across a franchise. "How to choose" now opens with a concrete first step (count last month's enquiries by channel) instead of going straight to recommendations.

The 2,200-word ceiling binds here: the first expanded draft measured 2,212 words and failed `qa:copy` with `body-too-long`. Five sentences were cut to land at 2,129. **There is roughly 70 words of headroom left on this page** - anything further added has to displace something.

**Links.** Ten internal links, each with descriptive anchor text, each route verified 200: `/ai-receptionist/`, `/missed-call-text-back/`, `/lead-form-to-crm-sync-automation/`, `/lead-qualification-agent/`, `/appointment-reminder-confirmation/`, `/conversational-ai-platform/`, `/autonomous-ai-agents/`, `/pricing/`, `/best-ai-agents-for-home-services/`, `/top-conversational-ai-for-home-services/`. Four external vendor links unchanged. Each link sits where the sentence already needed it, not appended for volume.

**Featured image - PLACEHOLDER, NOT PUBLISHABLE.** The author supplied a photograph of a notebook, a paperclip and an instant photo of a dog. Two problems, both stated to the author on the spot:
1. It is an **Unsplash+ watermarked preview**. The "Unsplash+" mark is tiled across the entire frame and renders at full width in the article hero. Shipping it is a licensing violation and it reads as a failed image load.
2. It is portrait, 1334x2000, in a landscape slot (1080 wide, 560 max height, `object-fit: cover`), so it is cropped to a middle band, and the subject has nothing to do with pest control.
It is wired in because the author asked for it and the document is a draft. **Replace before publishing.**

**How the featured image is attached, because it is not obvious.** `featuredImage` on the Posts collection is a Payload `upload` relation to the `media` collection, not an inline `{src, alt}`. `tools/cms/upsert-content.ts` passes `page.featuredImage` straight through, so putting an object there fails with `ValidationError: This relationship field has the following invalid relationships`. The shape in `data/cms/pages.json` (`{"id": "10158", "src": ...}`) is an export artifact, not an importable one. What works:
1. The file lives in the repo at `apps/web/public/assets/images/posts/top-ai-receptionists-pest-control-2026.png`.
2. It was uploaded to `POST /api/media` with `publicPath` overridden to that same `/assets/...` path. The Media collection defaults `publicPath` to `/media/<filename>`, and `/media/` is rewritten to `PUBLIC_MEDIA_BASE_URL` (staging), which would 404 for a repo-committed asset. The override keeps the path local and makes it work on staging too, since `public/assets` ships with the repo. Media document **id 1**.
3. `featuredImage` is set on the post **by API PATCH**, not through the batch. It is deliberately absent from `pages.json`: `cms:upsert` writes only the keys present, so a re-import leaves the relation intact.

**Section-break images: not done, and here is why.** The request was for "random images". Three constraints make that unshippable as stated, so no image was invented:
- `qa:no-hotlinks` forbids external image hosts outright, so a random web image cannot ship at all - it has to be a file in the repo or a `media` document.
- The staging media library has no pest control imagery. The sibling article's five vendor screenshots (`/media/2026/07/...`) **404 on staging** - they were never uploaded - so they cannot be reused either.
- A watermarked stock preview has the same licensing problem as the featured image, five times over.
The slots are ready and the upload path above is proven. Any files the author drops in can be placed in minutes.

## Open tails

1. **Imagery. PUBLICATION GATE - resolve before the page goes live.** The independent reviewer reached the same conclusion, and the second pass did not change it: the featured image is a watermarked placeholder and there are still no section-break images. The sibling article carries 6. `SingleArticle.astro` falls back to an empty placeholder panel, and at 1440px that is a ~570px tall blank block directly under the H1 - the first thing a reader sees. Asset spec:
   - 1 featured image, 1733x1055 webp, named `Top-AI-Receptionists-for-Pest-Control-Companies-2026.webp`, ALT under 125 chars, no "screenshot of" prefix
   - 5 vendor screenshots at the same size, one per H2, for Acme, Smith.ai, ServiceAgent.ai, NextPhone and Synthflow AI
   - The cleaning article's screenshots cannot be reused: they show cleaning-company copy and their ALT and title text names cleaning
   - Second consequence, beyond the empty panel: with no `featuredImage` and no `seo.ogImage`, every social share of this article renders as a text-only card. The featured image fixes both
2. **The 68% figure has no source.** Replaced as agreed. Reinstatable in one line if a publication, year and URL arrive.
3. **The HBR figure has no URL in `copy-data.md`.** It ships with publication and year, per project decision 14. The missing URL is recorded here rather than on the page.
4. **Related Articles are generic.** (Not caused by empty tags - see the note above.) The 3 cards are the fallback set (two HR articles and one home-services roundup), not pest-control-adjacent. Pinning them needs a `relatedPaths` entry in `apps/web/src/data/production-taxonomies.ts`, which is a generated production export, so it was left alone. Worth noting that both sibling listicles show **no** Related Articles section at all, because they are in that export with no `relatedPaths` - this page is the better of the three as it stands.
5. **PestPac needs author confirmation** as an integration name (see decision 5).
6. **No testimonials, no customer names, no Acme outcome metrics.** None are approved, so none appear.

## Publication

The document is `draft` in Payload. It was published locally only for QA and reverted to `draft` afterwards. Publishing is a human action in Payload Admin.
