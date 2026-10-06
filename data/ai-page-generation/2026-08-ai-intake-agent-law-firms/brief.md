# Brief - AI Intake Agent for Law Firms

## Source

TASK 2, handed over verbatim by the marketing owner on 2026-08-20. Track B: the task specifies the
sections, their shape and a compliance guardrail; it supplies no written copy. Copy is written in this
run against `ai/contracts/copy-rules.md` (v5.0 mirror), with facts limited to
`ai/contracts/copy-data.md` plus what this task introduces.

## Page

- Route: `/ai-intake-agent-for-law-firms/`
- Collection: `pages`, template `standard`, status `draft`
- Type: industry landing page
- Primary keyword: **AI intake agent for law firms** - in the rendered H1 (`hero.eyebrow` renders as
  the `<h1>`), the meta title, the meta description, the first 100 words, and the URL
- Secondary keywords, placed once each where they read naturally: legal intake automation, law firm
  answering service, 24/7 legal intake, client intake software for attorneys
- Meta description: 150-152 characters with the primary keyword. The task asks ~140-150 and
  `copy-rules.md` asks 150-160; 150-152 is the overlap
- No `robots` override. Unlike the cleaning control build, this route and this keyword are free

## Route freedom - checked against all three sources, 2026-08-20

- Running CMS with an admin token, all six collections: no legal page. The two `intake` routes that
  exist are different intents - `/applicant-intake-pre-screen-agent/` (recruiting) and
  `/24-7-emergency-call-intake/` (field services)
- Snapshot `data/cms/pages.json`, 361 docs: same two, nothing legal
- Site navigation in Payload globals: no legal or intake entry, so no planned slot to fill
- `npm run qa:keyword-collision -- --keyword "AI intake agent for law firms" --path /ai-intake-agent-for-law-firms/`
  → `ok: true`, zero findings

## Audience and angle

Small and mid-size firms, roughly 2-30 attorneys, where the managing partner or the intake lead
decides. Practice areas named by the task: personal injury, family, criminal, immigration, estate.
GTM angle: intake and speed to lead. Funnel position: consideration to decision, so the page carries
both self-serve signup and a demo request.

## Compliance guardrail, carried into every section

The task's guardrail is not a tone preference, it is what keeps the page on the right side of
unauthorized practice of law:

- the agent captures, qualifies, schedules and follows up. It never gives legal advice, never states
  case value, never confirms representation
- "AI paralegal" and "AI lawyer" appear nowhere on the page
- the statute-of-limitations capability is written as *recording the incident date and flagging it
  against a window the firm configures*, never as computing or interpreting a deadline
- the conflict pre-check is written as *screening names against the firm's own system and routing
  possible hits to a human*, never as clearing a conflict
- the guardrail is also stated as page content, in the `conversation-replay` outcome note and in the
  FAQ answer about legal advice, rather than only being respected silently

`copy-rules.md` → Certifications applies as usual: no SOC, HIPAA, GDPR or ISO claims. The security
section is written around handling, access and retention.

## CTAs

Approved by the task: **Get Started Free** (note "No monthly fee.") and **Book a Demo** (note
"30-min consultation"). Two destinations, per `page-compose.md`: self-serve
`https://app.acme.example/signup`, sales `#popup-open-popupRequestDemo`. Nine CTAs across the six
framework positions plus one per pricing tier. Nothing after the FAQ.

## What `copy-data.md` does not have for this vertical

This is the largest constraint on the page, and it is deliberate: `copy-data.md` states that where a
vertical is missing, it must be researched before the page ships, and that "reuse the numbers you
have" is the failure mode the file exists to prevent. For legal there is **no** pain data, **no**
integration stack, **no** channel order, **no** budget anchor and **no** security opener.

Consequences, all of them recorded rather than worked around:

1. **No legal statistics on the page.** Not one. The pain section carries mechanism and operational
   detail instead of severity figures, which the Substance rule accepts. Nothing about missed legal
   calls, PI conversion or intake volume is asserted.
2. **The fourth stat in section 11 is not shipped.** The task itself says the legal-vertical
   conversion or signed-case metric needs a confirmed source and that no unattributed number may
   ship. `results-stats` accepts 2-8 items, so the section ships with three: 24/7, <1 min, and the
   21x reply figure that `copy-data.md` does carry. The fourth is an owner action, not a gap the
   pipeline fills.
3. **Integration names come from the task.** Clio, MyCase, Filevine, PracticePanther, Lawmatics,
   LawPay, DocuSign, Dropbox Sign, Google Local Services Ads, Facebook Lead Ads and the rest are
   named in TASK 2 itself, which is the page brief, so they are inside the rule. They should still be
   added to `copy-data.md` as the legal stack so the next legal page does not re-derive them.
4. **Channel order comes from the task** (SMS, Voice AI, Web Chat, WhatsApp, Email), with the
   per-channel role the task gives each one. `copy-data.md` has no order for legal.
5. **The security opener is written here**, since `copy-data.md` has no legal entry. It follows the
   shape of the existing openers and names what a firm actually holds before engagement: intake
   recordings, conflict data, identity documents, matter files.
6. **21x is the only sourced figure on the page**: a 5-minute reply qualifies the lead 21x more often
   than a 30-minute reply (Harvard Business Review via Verse.ai, 2025). It is owned by the results
   section and appears nowhere else.

## Missing assets, and what the composition does about them

Checked on 2026-08-20: the media library has **no legal-vertical assets at all**.

- **Channel mockups.** Four vertical sets exist (`image-109390`-`109394` cleaning, `-109395`-`399`
  roofing, `-109400`-`404` installation and repair, `-109405`-`409` HVAC) plus a plumbing set
  (`sms.jpg` and friends). All five show another trade's conversation. `channels-grid` requires one
  image per card and falls back to a *recruiting* mockup for a cleaning company when an image is
  missing, so every option puts the wrong vertical on a law-firm page. Section 6 therefore uses
  `functional-capabilities` with `preset: "channels"`, which `page-compose.md` designates for
  cross-channel delivery sections and which needs no mockups.
- **Product visual.** The two canvas screenshots that exist are `img-3-scaled.png` (an "AI
  Receptionist Agent" canvas whose nodes include *Send Quote with Price*) and
  `features-acme-canvas-2.png` (an "Invoice Processing Flow"). The first contradicts the UPL
  guardrail on this page, the second is off-topic. Section 5 therefore uses `conversation-replay`,
  which carries the same "single canvas, live intake" claim as an interactive replay and needs no
  screenshot.
- **Legal stack logos.** None of Clio, MyCase, Filevine, PracticePanther, Lawmatics, LawPay or
  Dropbox Sign exists in the media library or the snapshot. Real brand marks exist for **ten** of the
  twenty (Twilio, RingCentral, Outlook, Gmail, Slack, Stripe, DocuSign, QuickBooks, Google Local
  Services, Facebook Lead Ads), so a brand-logo grid is impossible and a half-logo grid reads as
  missing images. Section 9 first shipped as `logo-grid` text cells; after the owner flagged the
  empty cells on 2026-08-20 every cell carries a repo-owned line icon from the design system's own
  sets plus `label` and `subLabel` (`subLabel` is also what keeps the importer from dropping the
  item). The icons are category glyphs, not imitations of the real marks, and they are decorative -
  `alt` is empty because the tool name is already in the visible label. Recorded as an owner decision
  in `review.md`: an independent review argues that generic glyphs in a brand-logo slot are worse
  than the text cells were.

Asset requests for the owner are listed in `review.md`.

## Sections, as specified

1. Hero - H1 the primary keyword, subhead up to 10 words, one-sentence description covering the
   channels and the end-to-end job, both CTAs.
2. What Your AI Intake Agent Runs - 8-10 lifecycle capability cards, adapted to firm workflow.
3. Challenge to Solution - 5 pain/solution pairs: court-day calls, PI leads shopping three firms,
   unqualified consults, handwritten intake, unsigned retainers. CTA below.
4. How It Works - 3 steps: legal intake template, connect case management and channels, go live per
   practice area. No developer, days not quarters, no change to how attorneys work.
5. Your AI Intake Agent in Action - single-canvas live intake: call in, qualification, conflict
   pre-check, consult booked, matter created.
6. One AI Intake Agent, Every Channel - SMS, Voice AI, Web Chat, WhatsApp, Email with the role the
   task gives each in this vertical.
7. Mid-page CTA banner - free to start, pay-as-you-go, no contract, live in days. Both CTAs.
8. The Platform Behind Your AI Intake Agent - Cognitive Reasoning + Live System Access, Template
   Center, AI Concierge, Multi-Channel From One Canvas, Virtual Employees.
9. Connects to Your Entire Legal Stack - 2,700+ integrations, four groups of five.
10. What Acme Does That Standard Legal Answering Services Don't - 7-vs-7 contrast, CTA
    "Talk to Sales".
11. The Measurable Shift From Day One - three stats plus the indicative-outcomes disclaimer; the
    fourth stat is held back, see above.
12. Pricing - Pay-as-you-go and Enterprise, pointing at the pricing page.
13. Security & Compliance - four cards, legal-specific.
14. FAQ - 9 questions across product, business, support, pricing and platform, in that group order.

### Contradictions inside the task, resolved here

- **9 questions, 10 topics.** The FAQ list names ten topics and asks for nine questions. "What it
  handles vs. what still goes to an attorney" and "does it give legal advice" are two halves of the
  same handoff, so they merge into one question whose answer states the UPL position explicitly. All
  ten topics stay covered.
- **10 capability cards, 8 shipped.** The task lists ten lifecycle capabilities and allows 8-10
  cards. `functional-capabilities` renders four columns, so ten cards leave a two-card final row;
  closing it needs `width: "wide"` on the last two, and a double-width card needs about 40 words to
  fill against a `qa:copy` ceiling of 35. Eight cards fill two rows exactly. The two capabilities
  that lose their card - declined-case referral routing and post-consult no-show recovery - are
  stated in the FAQ answer about what the agent handles, so neither topic disappears.
- **"One line each" versus the card floor.** `functional-capabilities` cards are `min-height: 341px`.
  A one-line card renders visibly empty, so cards carry one to three sentences at the top of the
  20-35 word range, which is what `copy-rules.md` prescribes for this block.

## Arc sections not on this page

`page-compose.md` S8, "Who it is built for", is absent. The task's fourteen sections do not include
it, and the audience split it would carry - practice areas - is already the subject of the case-type
triage card, the platform Template Center item and a dedicated FAQ answer. Recorded here because
`page-compose.md` asks for the reason, not just the omission.

## Sections deliberately not included

- `testimonials` - no approved quotes exist, and none for legal specifically.
- `logo-strip`, `news-insights` - not in the task.
- A closing sources block - the one sourced figure carries its attribution inline; project
  decision 6 (narrowed) says a citation block waits until `copy-data.md` holds URLs.
