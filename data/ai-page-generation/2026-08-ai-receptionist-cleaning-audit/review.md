# TASK 1 audit - /ai-receptionist-for-cleaning-companies/

Checked the brief for TASK 1 against the page that already exists in the CMS (`pages` id 19, status `published`, 16 blocks). The page was **not** created for this brief - it came in with the production content import - and it is genuinely adapted to the cleaning vertical, not boilerplate: every block except `news-insights` differs from the generic `/ai-receptionist/` page.

Structurally the page already implements all 14 brief sections in the requested order, with two extra blocks. What follows is only the delta.

## Section-by-section state

| # | Brief section | Block on page | State |
|---|---|---|---|
| 1 | Hero | `hero` | deviates - see D1 |
| - | (extra) | `logo-strip` | not in brief - see D6 |
| 2 | What Your AI Receptionist Agent Runs | `functional-capabilities`, 10 cards | matches (brief allows 8-10) |
| 3 | Challenge -> Solution | `pain-points-comparison`, 5 rows + CTA | matches |
| 4 | How It Works | `how-it-works`, 3 steps | matches - see D5 for a data defect |
| 5 | Your AI Receptionist in Action | `media-showcase` | matches |
| 6 | One AI Receptionist - Every Channel | `channels-grid`, 5 cards | typo + stale field - see D2, D3 |
| 7 | Mid-page CTA | `cta`, both CTAs | matches |
| 8 | The Platform Behind | `industry-expertise`, 5 items | matches |
| 9 | Connects to Your Cleaning Stack | `logo-grid`, 4 groups x 6 | deviates - see D7 |
| 10 | 7-vs-7 contrast | `difference`, 7/7 + "Talk to Sales" | matches |
| 11 | The Measurable Shift | `results-stats`, 4 stats + disclaimer | matches, sources cited |
| 12 | Pricing | `pricing-cards`, 2 cards | internal note leaking - see D4 |
| 13 | Security & Compliance | `security`, 4 cards | matches |
| - | (extra) | `news-insights` | not in brief, byte-identical boilerplate - see D6 |
| 14 | FAQ | `faq`, 10 items, grouped | count mismatch in the brief itself - see D8 |

## Deviations and defects

**D1 (corrected) - The keyword IS in the rendered H1; the headline has a grammar error.** An earlier draft of this audit claimed the primary keyword was missing from the H1. That was wrong, and the correction matters for how the section gets edited. `apps/web/src/components/blocks/Heroes/HeroBlock.astro:31` sets `titleTag = block.eyebrow ? 'p' : 'h1'` and wraps the eyebrow in `<h1>`. Verified in the served markup: this page's `<h1>` is "AI Receptionist for Cleaning Companies" (the eyebrow), and the visual headline "Turn Every Missed Call ||{{ Into a Booked Jobs }}" renders as `<p class="hero__title">`. So the brief's keyword-in-H1 requirement is satisfied.

What remains real: the visual headline reads "Into a Booked Jobs" - singular article with a plural noun. Fix to "Into a Booked Job" or "Into Booked Jobs".

Worth knowing before editing any hero on this site: removing the eyebrow would move the H1 onto the headline and drop the keyword out of the H1. If this section ever needs the brief's three-part shape (H1 + subhead up to 10 words + description), that requires `hero-extended`, and the H1 behavior must be re-checked after the switch.

**D2 - Cyrillic character inside an English title.** `channels-grid.title` reads `Every Сhannel`, where "С" is Cyrillic U+0421, not Latin "C". It looks correct on screen but breaks find-in-page, search indexing, and any string matching.

**D3 - Stale field from another vertical.** `channels-grid.gradientText` is `"One AI Recruiting Agent."` - recruiting copy left over on a receptionist page. Verified in the renderer: `titleText()` ignores `gradientText` whenever the title already contains `{{ }}` markers, which it does here, so **this is not visible today**. It is wrong data that becomes visible the moment someone removes the markers from the title.

**D4 - Internal working notes are published on a live marketing page.** `pricing-cards.info` renders below the pricing cards and currently contains: "Open items: per-channel pricing for Phone / SMS / WhatsApp pending Twilio billing API confirmation. Auto-recharge (optional threshold-based) is a v2 feature." This is internal backlog language, publicly visible. The brief wants this slot to point at the pricing page instead.

**D5 - Malformed link object.** `how-it-works.button` is `{ "label": null, "href": null, "target": "_self" }` - an empty button object rather than an absent one.

**D6 - Two blocks are not in the brief.** `logo-strip` (social proof, adapted to cleaning) and `news-insights` (byte-identical to the generic page). The brief lists 14 sections in order and neither appears. `logo-strip` is defensible extra social proof; `news-insights` adds nothing vertical-specific. Both are a content-owner decision, so nothing was removed.

**D7 - Integration groups have 6 logos, brief says 5.** Group headings match the brief (Booking/Field Service, Communications, Payments, Lead Sources). Also, most items in three of the four groups carry no `label`, so they depend entirely on the logo image being recognizable.

**D8 - The brief contradicts itself on FAQ count.** The header says "FAQ - 9 Qs" but the list underneath enumerates 10 questions. The page has exactly those 10. Nothing was deleted; the brief needs the fix, not the page.

**D9 - Meta description is 152 characters.** The brief asks for ~140-150. It does contain the primary keyword. Two words shorter would satisfy it.

**D10 - `canonicalUrl` is empty.** The brief treats the canonical route as part of the SEO spec, and comparable pages carry a canonical. This page has none.

## Verified as compliant

- Meta title 54 chars, keyword-first.
- Approved CTA set only, with the brief's exact note pairings: "Get Started Free" / "No monthly fee" and "Book a Demo" / "30-min consultation".
- Statistics in section 11 carry their sources (HBR via Verse.ai 2025, Allclean 2025) plus the "indicative outcomes" disclaimer.
- Section 10 CTA label is "Talk to Sales" as specified.
- No invented testimonials anywhere on the page.

## Recommendation

D1, D2, D4 and D5 are worth fixing regardless of the rest: a keyword-less H1 with a grammar error, a Cyrillic character in a heading, internal backlog notes on a public page, and a malformed button. D3, D9 and D10 are cheap hygiene. D6, D7 and D8 need a decision from the content owner before anything is changed.

Nothing was modified on this page. Applying the fixes is a separate, approved pass.
