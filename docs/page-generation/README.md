# Text → Page: what the system does

A marketer writes a brief. The system builds the page from the approved block library, checks it, and hands over a draft in the CMS. Nothing is designed from scratch and nothing is invented — the page is a new combination of blocks that already belong to the design system.

This document shows one real run, block by block.

## The brief it was given

Excerpt from the actual task (TASK 1, written by the content team):

> **Page:** `/ai-receptionist-for-cleaning-companies/`
> **Type:** Industry landing page.
> **Primary keyword:** "AI receptionist for cleaning companies" (H1, title, meta description, first 100 words, URL).
> **CTAs (approved only):** Book a Demo (label: 30-min consultation) + Get Started Free (label: No monthly fee).
> **Sections, in order:**
> 1. Hero — H1 "AI Receptionist for Cleaning Companies"; short subhead up to 10 words + description one sentence on channels + what the agent does end-to-end; + 2 CTA
> 2. What Your AI Receptionist Agent Runs — 8–10 lifecycle capability cards, one line each. Adapt each to the vertical's real workflow.
> 3. Challenge → Solution comparison — 5 pain/solution pairs … CTA below.
> … 14 sections in total, ending with a 9-question FAQ.

## How it ran

1. **Brief → plan.** Each requested section is matched to a block in the library by its declared purpose. All 14 sections mapped to existing blocks; nothing new had to be designed.
2. **Write the content.** Copy is written for the vertical — a cleaning company's real workflow, not generic AI-agent language.
3. **Validate.** The page is checked against the block schemas before it can reach the CMS.
4. **Import and look at it.** Draft goes into Payload, the page is screenshotted on desktop and mobile, block by block.
5. **Independent review.** A separate reviewer checks the page against the brief and the design-system rules and returns a verdict, not a summary.

## The result, block by block

**1. Hero** — keyword in the H1, one-line promise, one-sentence explanation, both approved CTAs with their notes.

![Hero](images/01-hero-desktop.png)

**2. What your agent runs** — 10 lifecycle cards, from answering the call to selling the recurring plan.

![Capabilities](images/02-capabilities-desktop.png)

**3. Challenge → Solution** — the five ways cleaning companies lose bookings, each paired with what changes.

![Challenge and solution](images/03-challenge-solution-desktop.png)

**4. How it works** — three steps, no developer, days rather than quarters.

![How it works](images/04-how-it-works-desktop.png)

**5. In action** — the real product canvas, with a caption that describes what is actually on it.

![In action](images/05-in-action-desktop.png)

**6. Every channel** — five channels, each with a cleaning-specific conversation mockup.

![Channels](images/06-channels-desktop.png)

**7. Mid-page CTA**

![CTA banner](images/07-cta-banner-desktop.png)

**8. The platform behind it** — five platform capabilities, interactive.

![Platform](images/08-platform-desktop.png)

**9. Integrations** — four groups of five, each with what it is used for.

![Integrations](images/09-integrations-desktop.png)

**10. Versus a standard answering service** — seven against seven.

![Difference](images/10-difference-desktop.png)

**11. The measurable shift** — the four figures the brief supplied, with sources and an "indicative outcomes" disclaimer.

![Stats](images/11-stats-desktop.png)

**12. Pricing** — pay-as-you-go and enterprise, with the details linked to the pricing page.

![Pricing](images/12-pricing-desktop.png)

**13. Security & compliance** — written around what a cleaning company actually holds: addresses, gate codes, card details, recordings.

![Security](images/13-security-desktop.png)

**14. FAQ** — nine questions, grouped.

![FAQ](images/14-faq-desktop.png)

Every block was also captured at 390px wide; the mobile set is in the same folder (`*-mobile.png`).

## What the checks caught

The value is not that the page came out — it is that four problems were caught before anyone shipped it:

- **The H1 was going to be wrong.** In the standard hero block, whenever an eyebrow is set, the *eyebrow* becomes the `<h1>` and the headline drops to a paragraph. The brief's main SEO requirement would have failed silently. Fixed by dropping the eyebrow so the keyword headline is the H1.
- **Channel mockups showed the wrong business.** Left to its defaults, the channels block ships recruiting screenshots ("Cleaner Position", "Continue Screening") on a receptionist page. Replaced with the cleaning mockups from the media library.
- **The integrations table silently rendered empty.** A platform bug: an item with only a name and no logo is mistaken for an incomplete link and dropped. Worked around by giving every integration a short purpose line — which reads better anyway.
- **A ragged card grid.** Ten cards in a four-column grid left a stray row; the last two are set to span two columns each, so the grid closes cleanly.

No statistics, customers, testimonials, or integrations were invented. The only figures on the page are the four the brief supplied, with their sources. Every integration named is one already published elsewhere on the site.

## Cost

| | |
|---|---|
| Whole session | ~509K tokens written, ~2M read into cache |
| Independent review | ~156K tokens |
| Wall clock, this page | about an hour, unattended |
| Human input needed | the brief, and the final publish decision |

The session figure covers everything: setting the repo up locally, building the system itself, an earlier page, and an audit of an existing page. A single page on a warm setup is a small fraction of it.

## Where things are

- Page (local): `http://localhost:4321/ai-receptionist-for-cleaning-companies-ai/`
- Page data: `data/ai-page-generation/2026-08-ai-receptionist-cleaning-ai/pages.json`
- The system: `.claude/skills/create-page/` (build a page), `.claude/skills/create-block/` (grow a new block into the design system)

The page is a **draft**. Publishing stays a human decision in Payload.
