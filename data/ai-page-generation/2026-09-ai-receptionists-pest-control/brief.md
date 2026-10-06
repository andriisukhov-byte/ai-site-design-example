# Page brief: /ai-receptionists-for-pest-control-companies/

Track: B (loose brief supplied by the author as a section-by-section spec; copy written by the pipeline against `ai/contracts/copy-rules.md`).
Batch: `2026-09-ai-receptionists-pest-control`. Created 2026-09-16.

## Header

| Field | Value |
|---|---|
| Type | Ranked comparison listicle, editorial. Same page type as `/ai-receptionists-for-cleaning-services/`, which is its structural sibling. |
| Collection / template | `posts`, `article`, status `draft` |
| Route | `/ai-receptionists-for-pest-control-companies/` - free in the running CMS across all six collections with an admin token (drafts included), free in `data/cms/pages.json` (361 docs), no synonym route, not referenced by the nav. `qa:keyword-collision` clean. |
| Primary keyword | **AI receptionist for pest control companies** - present in the meta title, the meta description, the first sentence, and the URL. The rendered H1 carries the **plural** variant ("Top AI Receptionists for Pest Control Companies [2026]"), because the H1 is the article title and a listicle title is plural. Same convention as the sibling listicle. |
| Meta title | Top AI Receptionists for Pest Control Companies [2026] (54 chars). The sibling listicle appends " \| Acme"; here that would run 68 chars, over the 60-char ceiling, so the suffix is dropped. |
| Meta description | An AI receptionist for pest control companies answers every call. Compare Acme, Smith.ai, ServiceAgent.ai, NextPhone and Synthflow AI on price and scope. (159 chars) |
| Robots | default (indexable). No `robots` value is set on the document. |
| Read time | ~8 minutes, per the author's spec. Target body length 1,500-1,700 words. |
| CTA | None. The sibling listicle carries no CTA block, and `copy-rules.md` keeps conversion pressure off research-stage content. |
| Blocks | One `rich-text` block. Every article on this site is a single `rich-text` block rendered by `SingleArticle.astro`. |

## Author's spec, section by section (binding order)

1. Intro / definition - one paragraph defining an AI receptionist for pest control plus the core value: it closes the biggest leak, same-day emergency calls going to voicemail. Leads with a speed stat.
2. **The real problems pest control companies are trying to solve** - framing paragraph plus 5 bolded pains: after-hours emergency calls (rodents, wasps, bed bugs) to voicemail; speed wins the job, not the lowest quote; inspection quotes go cold before follow-up; leads scattered across phone, site chat, Google/Yelp and text; quarterly and seasonal treatment plans lapse without renewal outreach.
3. Bridge sentence into the tools.
4. Ranked tools, 5, each as what it does -> trade-offs -> Best for. Order and positioning fixed by the author: Acme (1, longest, 3-4 short paragraphs, plus its own Trade-off line), Smith.ai (2), ServiceAgent.ai (3), NextPhone (4), Synthflow AI (5).
5. Comparison table - 10 rows (Channels, Qualifies the lead, Books on a live calendar, Booking integrations, Automated quote follow-up, Seasonal / renewal outreach, Model, Pricing, Free tier, Best for) x 5 tool columns.
6. **How to choose the right AI receptionist** - phone-only -> ServiceAgent.ai / NextPhone; human safety net -> Smith.ai; self-built voice -> Synthflow; end-to-end on every channel -> Acme.
7. Related Articles (3) and the footer.

Tone required by the author: credible buyer's guide. Acme is ranked first and every tool gets a fair "Best for" plus an honest trade-off, Acme's own build-and-own setup step included.

## Decisions taken by the pipeline

1. **Sections 7 (Related Articles) and the footer are not authored.** `SingleArticle.astro` renders a 3-card Related Articles section for every post automatically, and the footer comes from `SiteLayout.astro`. Writing them into the HTML would duplicate them.
2. **The opening stat is the sourced HBR figure, not the 68% in the spec.** The spec asked to lead with "a stat like 68% of pest-control leads book with whoever answers first". That figure is not in `copy-data.md`, which holds no sourced pain data for pest control at all, and `copy-rules.md` forbids filling a gap with a plausible-sounding figure. The page ships the approved cross-vertical figure instead - a 5-minute response is 21x more likely to qualify the lead than a 30-minute one (HBR via Verse.ai, 2025) - which carries the same argument. Author confirmed this choice on 2026-09-16. If a source for the 68% arrives, it is a one-line swap.
3. **No images.** The sibling article carries 6 (a featured image plus one screenshot per vendor). None exist for pest control, and the cleaning screenshots show cleaning copy. `SingleArticle.astro` degrades to a placeholder block when `featuredImage` is absent, so the page renders correctly without them. The asset spec is in `review.md`.
4. **Route is plural (`ai-receptionists-`).** It matches the sibling listicle and keeps the listicle namespace clear of the landing-page namespace (`/ai-receptionist-for-cleaning-companies/` is a landing page), so a future pest control landing page has a free route.
5. **Internal links:** `/ai-receptionist/` (the cluster page this article links up to - there is no pest control landing page) and `/best-ai-agents-for-home-services/`. Both verified 200.
6. **PestPac is named from the author's spec.** `copy-data.md` has no integration row for pest control. Jobber is approved there; PestPac comes from the spec and is recorded in `review.md` for confirmation.

## Approved facts used on this page

From `ai/contracts/copy-data.md`:
- A 5-minute response is 21x more likely to qualify the lead than a 30-minute one (HBR via Verse.ai, 2025). Year is on record, the URL is not - see `review.md`.
- Jobber, as an approved booking integration name.
- Pricing facts: credits from $10, no monthly fee, no per-seat fee, 5,000 credits free at signup, credits never expire, production deployment included from the free tier, conversations never used to train public AI models.

## Figures on the page and where each comes from

Every figure below is either in `copy-data.md` or is a competitor price supplied by the author in this spec. `qa:copy --brief` resolves them against this file.

| Figure | Where it appears | Source |
|---|---|---|
| 21x | Intro | `copy-data.md`, HBR via Verse.ai, 2025 |
| $10 | Acme, pricing paragraph | `copy-data.md` |
| 5,000 (5000) credits | Acme, pricing paragraph | `copy-data.md` |
| $97.50 | Smith.ai, pricing | Author's spec |
| $25-300 (25, 300) | ServiceAgent.ai, pricing | Author's spec |
| $199 | NextPhone, pricing | Author's spec |
| $0.45-0.58 (0.45, 0.58) | Synthflow AI, pricing | Author's spec |
| 300+ voices | Synthflow AI | Author's spec |
| 50+ languages | Synthflow AI | Published sibling article `/ai-receptionists-for-cleaning-services/`, inherited approved copy |
| 2,700+ (2700+) | not used on this page | - |

## Declared departures from the rules

1. **Named competitors sit outside the approved competitor set.** `copy-data.md` approves Voiceflow, Botpress, Relevance AI and Make, and says "Do not name a competitor outside this list". This page names Smith.ai, ServiceAgent.ai, NextPhone and Synthflow AI. The spec mandates all four by name, the page type is a comparison listicle that cannot exist without them, and the published sibling `/ai-receptionists-for-cleaning-services/` shipped with exactly this set. The brief wins on content. Worth adding this set to `copy-data.md` at the next sync rather than re-deciding it per article.
2. **Competitor facts inherited from the sibling article.** "CRM plus Zapier", "North America-based human receptionists", "HubSpot, Salesforce, Cal.com", "Limited trial", "spam filtering", "emergency dispatch handling", "50+ languages", "Managed service", "Field service stack" and every "No" cell are carried over verbatim in substance from the published cleaning listicle, which is approved copy. They are not new claims.
3. **Acme runs 4 paragraphs, each at most 3 sentences.** The spec asked for "3-4 short paras"; `copy-rules.md` caps a paragraph at 3 sentences (Clarity rule 7 and the Copy length table). Both are satisfied at 4 paragraphs, which required tightening the prose rather than adding paragraphs.

## Out of scope

- No testimonials, customer names, or Acme outcome metrics. None are approved.
- No certification claims (SOC, HIPAA, GDPR, ISO). Acme holds none.
- No pest-control-specific pain statistics. `copy-data.md` has none, and the spec supplied no sources.
