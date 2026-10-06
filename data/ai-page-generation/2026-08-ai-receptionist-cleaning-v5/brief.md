# Brief - AI Receptionist for Cleaning Companies (v5, clean pipeline run)

## Source

TASK 1, handed over verbatim by the marketing owner on 2026-08-20. Track B: the task specifies the
sections and their shape, it does not supply written copy. Copy is therefore written in this run
against `ai/contracts/copy-rules.md` (v5.0 mirror), with figures limited to
`ai/contracts/copy-data.md` plus the ones this task introduces.

Decided with the owner 2026-08-20: a clean run from scratch, not a continuation of the v4 batch.
Nothing was carried over from `2026-08-ai-receptionist-cleaning-v4/pages.json` - every string on
this page was written in this run. v4 and the live page were used only as structural references
(block chain, field shapes, which media files exist).

## Why this route and not the one in the task

`/ai-receptionist-for-cleaning-companies/` is taken by a **published** page, `pages` id 19,
contentKey `fa1598b2e635fb75`, which already implements all 14 sections of this task in the same
order. Verified against the three required sources on 2026-08-20:

- the running CMS with an admin token, all collections (162 `pages` docs);
- the snapshot `data/cms/pages.json` (361 docs);
- synonym routes - `/ai-receptionist/`, `/ai-receptionist-for-cleaning-companies-ai/`, `-v2/`,
  `-v3/`, `-v4/`, `/ai-lead-handling-for-cleaning-facility-services/`.

`npm run qa:keyword-collision -- --keyword "AI receptionist for cleaning companies" --path /ai-receptionist-for-cleaning-companies/`
returns a blocker for the live route, so the task is a revision brief for a page that already
shipped. This run builds a control version on a free route and leaves the live document untouched.

## Page

- Route: `/ai-receptionist-for-cleaning-companies-v5/`
- Collection: `pages`, template `standard`, status `draft`
- Type: industry landing page
- Primary keyword: **AI receptionist for cleaning companies** - in the rendered H1 (the `hero.eyebrow`
  renders as the `<h1>`), the meta title, the meta description, the first 100 words, and the URL
- Meta description: 150-155 characters with the primary keyword. The task asks ~140-150 and
  `copy-rules.md` asks 150-160; 150-155 is the overlap that satisfies both
- `seo.robots: "noindex, nofollow"`. This is a control build carrying the same focus keyword as a
  published page. Noindex is what keeps that from being a live cannibalization rather than an
  accepted finding in a review file

## Audience and angle

Cleaning and janitorial operators, roughly 5-20 employees; the owner or the office manager decides.
GTM angle: lead handling. Funnel position: consideration to decision, so the page supports both
self-serve signup and a demo request.

Channel order follows `copy-data.md` for this vertical: SMS leads, then voice, web chat, email.
The task's channel list (SMS, Voice AI, Web Chat, WhatsApp, Email) is compatible with it and is
used as given.

## CTAs

Approved for this page by the task: **Get Started Free** (note "No monthly fee.") and
**Book a Demo** (note "30-min consultation"). "Book a Demo" is project decision 8 in
`copy-rules.md`, alongside the marketing table's "Request Demo".

- Self-serve destination, one per page: `https://app.acme.example/signup`
- Sales destination, one per page: `#popup-open-popupRequestDemo`

Placement per `page-compose.md` → CTA policy: hero (2), after the pain section (1), mid-page `cta`
block (2), after the platform section (1), after the comparison (1), one per pricing tier (2).
Nine CTAs, two destinations, none after the FAQ.

**The Enterprise tier's CTA is not the destination the task named.** The task writes "Enterprise (see
details on the pricing page) https://acme.example/pricing/". A pricing-page button would be a third
destination, which the two-destination rule forbids, and the tier still needs one CTA. Resolved as:
the Enterprise button is "Talk to Sales" on the sales path, and `/pricing/` is a descriptive link in
the `info` line under the cards, where it also serves the Pay-as-you-go tier. Recorded rather than
decided quietly.

## Sections, as specified

1. Hero - H1 the primary keyword, subhead up to 10 words, one-sentence description covering the
   channels and what the agent does end to end, both CTAs.
2. What Your AI Receptionist Agent Runs - 8-10 lifecycle capability cards, one line each, adapted
   to the cleaning workflow.
3. Challenge to Solution - 5 pain/solution pairs: missed calls, speed-to-lead, cold quotes,
   multi-channel, recurring sales. CTA below.
4. How It Works - 3 steps, one sentence each: start from a template, connect the stack and
   channels, go live and tune. No developer, days not quarters.
5. Your AI Receptionist in Action - short caption on single-canvas live booking, plus a product visual.
6. One AI Receptionist, Every Channel - 5 channel cards (SMS, Voice AI, Web Chat, WhatsApp, Email),
   one line each on how that channel is used in cleaning.
7. Mid-page CTA banner - free to start, pay-as-you-go, no contract, live in days. Both CTAs.
8. The Platform Behind Your AI Receptionist - 5 items: Cognitive Reasoning + Live System Access,
   Template Center, AI Concierge, Multi-Channel From One Canvas, Virtual Employees.
9. Connects to Your Entire Cleaning Stack - 2,700+ integrations in 4 groups of 5: Booking and Field
   Service, Communications, Payments, Lead Sources.
10. What Acme Does That Standard Cleaning Answering Services Don't - 7-vs-7 contrast,
    CTA "Talk to Sales".
11. The Measurable Shift From Day One - 4 stats: 24/7, <1 min, 21x, 40%, plus the
    indicative-outcomes disclaimer.
12. Pricing - Pay-as-you-go (credit packs from $10, 5,000 credits on signup, credits never expire,
    up to 5 seats) and Enterprise, pointing at the pricing page.
13. Security & Compliance - 4 cards: Data Protection, Privacy Assurance, Secure System Integration,
    Audit & Monitoring, with the cleaning-specific opener (addresses, access instructions, payment
    on file, recorded intake calls).
14. FAQ - 9 questions across product, business, support, pricing and platform, in that group order.

### Two contradictions inside the task, resolved here

- **9 questions, 10 topics.** The FAQ list names ten topics and asks for nine questions. Resolved by
  merging "commercial walk-throughs" and "works for my cleaning type" into one question, which keeps
  all ten topics covered. Flagged for the owner rather than dropping a topic.
- **"One line each" versus the card floor.** `functional-capabilities` cards are `min-height: 341px`,
  so a one-line card renders visibly half empty. Project decision 4 says a block floor beats a copy
  ideal, so the cards carry one sentence at the top of the 20-35 word range. Recorded rather than
  decided silently.

## Figures allowed on this page

From `copy-data.md`, cleaning vertical:

- 85% of missed callers never call back (Allclean, 2025) - pain section
- 98% of texts are read against 6% of emails (Sakari, 2025) - pain section
- $80,000-$250,000 lost per year including lifetime value and referrals (Allclean, 2025) - pain section
- 25-40% of inbound calls unanswered during business hours (Allclean, 2025) - the task places the
  top of this range, 40%, in the results section, so the range itself is not restated in the pain
  section. One stat, one owner
- 5-minute reply qualifies 21x more often than a 30-minute reply (HBR via Verse.ai, 2025) - results
- 24/7 and <1 min - capability statements, not benchmarks
- 2,700+ integrations, 5,000 signup credits, credit packs from $10, up to 5 seats, 8 channels -
  locked product facts
- Deployment 5-15 days - operational range stated by this task
- Reminder windows 24 hours and 1 hour before the visit; follow-up cadence day 1, day 3, day 7 -
  configuration details, not benchmarks
- Cleaning integration names: Jobber, ZenMaid, Housecall Pro, BookingKoala, Launch27

**Integration names outside `copy-data.md`.** The task asks for four groups of five integrations but
names none of them, and `copy-data.md` lists only the eight cleaning-vertical tools. The fifteen
names in the Communications, Payments and Lead Sources columns - Twilio, RingCentral, WhatsApp
Business, Gmail, Slack; Stripe, Square, QuickBooks Payments, PayPal, GoCardless; Yelp, Nextdoor,
Angi, Thumbtack, Google Local Services - therefore have no entry in the facts file. They are on the
page under one recorded decision, not by default:

- each one is already named on the published sibling `/ai-receptionist-for-cleaning-companies/`
  (id 19), and the `cleaning-*` logo assets exist in the media library because that page was built;
- the claim the column makes is connectivity, which the locked 2,700+ integration fact covers as a
  category, while the individual name is what makes it legible to the reader;
- the alternative inside the rules is a group of five drawn from the eight approved cleaning tools,
  which cannot fill four groups.

This is a fit-report item for the owner, recorded in `review.md`, not a silent inclusion. If
marketing will not stand behind a name, the honest fix is to add the confirmed list to
`copy-data.md` and rebuild the column - not to leave it and hope.

Deliberately not used: the 44% InsideSales figure and "50% of sales close after the 5th follow-up"
(`copy-data.md` gives InsideSales no year, so the "nothing older than 3 years" rule cannot be
evaluated), the 17.65% LocaliQ click-to-lead benchmark (no section owns it), and the 92%
first-attempt figure (restricted to pages that frame Acme against scripted chatbots).

Also dropped after the first review pass: **85% of missed callers never call back**. `copy-data.md`
prints that figure without a year, unlike the Allclean bullets around it, so printing "(Allclean,
2025)" would have been the pipeline inferring a year and printing "(Allclean)" would have shipped a
stat without one. The pain row carries the operational reality instead, and the figure goes back to
marketing for a year and a URL.

## Sections deliberately not included

- `testimonials` - no approved quotes exist. Omitted rather than filled.
- `logo-strip` and `news-insights` sit on the live page but are not in this task. Left out.
- Sources block - `copy-data.md` carries publication and year but no URLs, so inline attribution is
  the whole citation (project decision 6, narrowed). Missing URLs are recorded in `review.md`.
