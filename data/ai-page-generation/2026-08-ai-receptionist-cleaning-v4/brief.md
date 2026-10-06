# Brief — AI Receptionist for Cleaning Companies (v4 control build)

## Source

TASK 1, handed over verbatim by the marketing owner on 2026-08-19. Track B: the brief specifies
sections and their shape, it does not supply written copy. Copy is therefore written here against
`ai/contracts/copy-rules.md`, with facts limited to `ai/contracts/copy-data.md`.

## Why v4 and not the live route

`/ai-receptionist-for-cleaning-companies/` is taken by a published page (`pages`,
contentKey `fa1598b2e635fb75`) that already implements all 14 sections of this brief in the same
order. Verified against three sources: the snapshot, the live CMS with an admin token across all
six collections, and synonym routes. So the brief describes an existing page, and this run is a
control build on a free route rather than a creation on the live one. Decided with the owner
2026-08-19.

Structural reference: the live page itself (same block set, same template, `root` empty on every
block, so standard renderers - no `uc-*` family).

## Page

- Route: `/ai-receptionist-for-cleaning-companies-v4/`
- Collection: `pages`, template `standard`, status `draft`
- Type: industry landing page
- Primary keyword: **AI receptionist for cleaning companies** - in the rendered H1, the meta title,
  the meta description, the first 100 words, and the URL
- Meta description: 150-155 characters with the primary keyword. The brief asks ~140-150 and
  `copy-rules.md` asks 150-160; 150-155 satisfies both.

## Audience and angle

Cleaning and janitorial operators, roughly 5-20 employees, owner or office manager deciding.
GTM angle: lead handling. Funnel position: consideration to decision - the page has to support both
self-serve signup and a demo request.

## CTAs

Approved for this page: **Book a Demo** (note "30-min consultation") and **Get Started Free**
(note "No monthly fee").

"Book a Demo" is not in the marketing source's locked label table, which lists "Request Demo".
Resolved with the owner 2026-08-19: the brief wins, and the label was added to
`ai/contracts/copy-rules.md` as project decision 8, to be re-confirmed at the next rules sync.

Self-serve path: every self-serve CTA resolves to one address, `https://app.acme.example/signup`.
The live page mixes `/signup` and the absolute URL on the same button; this build uses one.
Sales path: the demo popup anchor, consistent across the page.

## Sections, as specified

1. Hero - H1 the primary keyword, subhead up to 10 words, one-sentence description covering the
   channels and what the agent does end to end, both CTAs.
2. What Your AI Receptionist Agent Runs - 8-10 lifecycle capability cards, one line each, adapted
   to the cleaning workflow.
3. Challenge to Solution - 5 pain/solution pairs: missed calls, speed-to-lead, cold quotes,
   multi-channel, recurring sales. CTA below.
4. How It Works - 3 steps with one sentence each: start from a template, connect the stack and
   channels, go live and tune. No developer, days not quarters.
5. Your AI Receptionist in Action - short caption on single-canvas live booking, plus a product visual.
6. One AI Receptionist, Every Channel - 5 channel blocks (SMS, Voice AI, Web Chat, WhatsApp, Email),
   one line each on how that channel is used in cleaning.
7. Mid-page CTA banner - free to start, pay-as-you-go, no contract, live in days. Both CTAs.
8. The Platform Behind Your AI Receptionist - 5 blocks: Cognitive Reasoning + Live System Access,
   Template Center, AI Concierge, Multi-Channel From One Canvas, Virtual Employees.
9. Connects to Your Entire Cleaning Stack - 2,700+ integrations in 4 groups of 5: Booking/Field
   Service, Communications, Payments, Lead Sources.
10. What Acme Does That Standard Cleaning Answering Services Don't - 7-vs-7 contrast,
    CTA "Talk to Sales".
11. The Measurable Shift From Day One - 4 stats: 24/7, <1 min, 21x, 40%, plus the indicative-outcomes
    disclaimer.
12. Pricing - Pay-as-you-go (credits from $10, 5,000 on signup, credits never expire, up to 5 seats)
    and Enterprise, pointing at https://acme.example/pricing/.
13. Security & Compliance - 4 blocks: Data Protection, Privacy Assurance, Secure System Integration,
    Audit & Monitoring, cleaning-specific (addresses, access codes, payment, recordings).
14. FAQ - 9 questions across product, business, support, pricing and platform, in that group order.
    Note a contradiction inside the task: it asks for 9 questions and then lists **10** topics
    (…commercial walk-throughs · works for my cleaning type…). Resolved by merging those two into one
    question, "Does it work for our cleaning type, including commercial walk-throughs?", which keeps all
    ten topics covered in nine questions. Flag for the owner rather than silently dropping a topic.

## Figures allowed on this page

All four stats are sourced in `ai/contracts/copy-data.md`:

- 21x - 5-minute response is 21x more likely to qualify the lead vs. 30-minute (HBR via Verse.ai, 2025)
- 40% - top of the 25-40% unanswered-call range for cleaning operators (Allclean, 2025)
- 24/7 and <1 min - capability statements, not benchmarks
- 2,700+ integrations, 5,000 signup credits, credits from $10 - locked product facts
- 85% of missed callers never call back (Allclean, 2025)
- 44% of reps give up after one follow-up attempt (InsideSales)
- 98% of texts are read vs. 6% of emails (Sakari, 2025)
- 25-40% of inbound calls go unanswered during cleaning business hours (Allclean, 2025)
- Deployment 5-15 days - operational range stated in this brief, per TASK 1
- Reminder windows 24 hours and 1 hour before the visit - configuration detail, not a benchmark
- Follow-up cadence day 1, day 3, day 7 - configuration detail
- Integration names for cleaning: Jobber, ZenMaid, Housecall Pro, BookingKoala, Launch27,
  Maid Central, Aspire, Swept

Nothing outside that list goes on the page. No testimonials: none are approved, so the section is
omitted rather than filled.

## Sections deliberately not included

- `capability-tools` and `news-insights` sit on the live page but are not in this brief. Left out;
  noted for the owner in `review.md`.
- `testimonials` - no approved quotes exist.
