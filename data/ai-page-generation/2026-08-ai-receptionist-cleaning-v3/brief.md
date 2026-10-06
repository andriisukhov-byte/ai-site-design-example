# Brief — /ai-receptionist-for-cleaning-companies-v3/

Control run for Task A of the 2026-08-14 feedback round. Same source TZ as the v2 demo page, rebuilt under the updated rules (reuse-first, new-block threshold, CTA policy, separate copy-refinement step).

## Source TZ (verbatim excerpt, from `docs/page-generation-v2/README.md`)

> **Page:** `/ai-receptionist-for-cleaning-companies/`
> **Type:** Industry landing page.
> **Primary keyword:** "AI receptionist for cleaning companies" (H1, title, meta description, first 100 words, URL).
> **CTAs (approved only):** Book a Demo (30-min consultation) + Get Started Free (No monthly fee).
> **Sections, in order:** Hero · What Your AI Receptionist Agent Runs (8–10 cards) · Challenge → Solution (5 pairs) · How It Works (3 steps) · In Action · Every Channel (5) · Mid-page CTA · The Platform Behind It · Integrations (2,700+, grouped) · vs Standard Answering Services (7-vs-7) · The Measurable Shift (4 stats) · Pricing · Security · FAQ

Additional TZ detail recovered from `data/ai-page-generation/2026-08-ai-receptionist-cleaning-audit/review.md`: meta description ~140–150 chars containing the keyword; canonical route is part of the SEO spec; section 10 CTA label is "Talk to Sales"; the TZ contradicts itself on FAQ count (header says 9, list enumerates 10).

## Audience and job

Owners and office managers of residential and commercial cleaning companies. The recurring pain: the phone rings while crews are on site, calls go to voicemail, quotes go cold, and recurring plans never get sold.

## Route

`/ai-receptionist-for-cleaning-companies-v3/`, collection `pages`, template `standard`. Confirmed free in all six CMS collections and in `data/cms/pages.json`. Not linked from the nav — this is a comparison page, reachable by direct link only.

## Deliberate deviations from the TZ

- **`-v3` route, not the TZ route.** The TZ route is occupied by a live published page (`pages` id 19). This run must be comparable against v2 without touching production content.
- **One section added that the TZ does not list**: the recovery calculator ("what the silence costs"), carried over from v2. Task A requires checking that block's value typography, so the block has to be on the page. Recorded as a deviation, not as an improvement.
- **Statistics kept as published on v1.** The v2 walkthrough left an open decision on the "21x (HBR)" and "40% (Allclean)" figures. This run does not resolve it — it carries the live page's four stats with their existing source lines, because inventing replacements is forbidden and resolving the citation question is a content-owner call.

## Copy provenance

Block copy is carried over from the live, approved v1 page (`/ai-receptionist-for-cleaning-companies/`) and, for the two blocks v1 does not have, from v2. This is deliberate: it isolates the effect of Phase 2.5. Any change visible in the before/after diff in `review.md` is attributable to `ai/prompts/copy-refiner.md` and to nothing else.

Defects fixed during assembly, carried from the v1 audit: hero headline grammar ("Into a Booked Jobs"), a Cyrillic `С` inside the channels title, a stale recruiting-vertical `gradientText`, a null-valued `how-it-works` button, a missing image on the SMS channel card, and signup links normalised to `/signup`.

## CTA plan

Primary path: **Get Started Free → `/signup`**, four times — hero, Challenge→Solution, mid-page CTA block, closing CTA block. Secondary **Book a Demo → demo popup** once, in the hero. The TZ additionally mandates **Talk to Sales** on the vs-answering-services section; that is honoured over the CTA policy, because the brief wins on content.
