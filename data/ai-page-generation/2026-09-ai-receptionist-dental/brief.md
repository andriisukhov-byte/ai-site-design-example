# Page brief: /ai-receptionist-for-dental-clinics/

Track: B (spec supplied as a section template, copy written by the pipeline against `ai/contracts/copy-rules.md`).
Batch: `2026-09-ai-receptionist-dental`. Created 2026-09-15.

## Header

| Field | Value |
|---|---|
| Type | Vertical / industry landing, lean. Excluded from the standard arc: pricing-cards, comparison-grid, security, logo-grid, testimonials, results-stats. |
| Collection / template | `pages`, `standard`, status `draft` |
| Route | `/ai-receptionist-for-dental-clinics/` (free in the running CMS across all collections, free in `data/cms/pages.json`, no synonym route, not referenced by the nav) |
| Primary keyword | **AI receptionist for dental clinics** - present in the rendered H1, meta title, meta description, first sentence of the hero, and the URL. One keyword, no synonym variants in the H1. |
| Meta title | AI Receptionist for Dental Clinics \| Acme |
| Meta description | An AI receptionist for dental clinics answers every inbound call immediately - it qualifies the patient, books the appointment, and confirms it automatically. (158 chars) |
| Robots | default (indexable). No `robots` value is set on the document. |
| CTA | **Get Started Free** -> `https://app.acme.example/signup`, on every block that carries a primary action. Secondary action is Book a Demo, unchanged sitewide. |
| Primary channel | **Voice-led**, then SMS. `copy-data.md` has no channel order for healthcare and forbids defaulting, so this is an author decision for this page: a dental practice's inbound demand arrives on the phone during business hours. It needs confirmation from the author before publication. |

## Declared departures from the page-type template

The template's last cross-page clause requires every departure to be stated here, in the header, not further down.

1. **The keyword is in the eyebrow, not the title.** The template puts the catalogue category in the eyebrow and the keyword in the H1. On this site `hero` promotes `eyebrow` to `<h1>` and demotes `title` to `<p>`. The eyebrow therefore carries the keyword and the category framing is dropped. Verified against rendered HTML.
2. **8 capability cards, not 6.** `functional-capabilities` renders a 4-column grid with a 341px card floor. Six cards leave a two-column hole; two `width: "wide"` cards close the row but render half empty at 31 words. Eight fill two rows without padding the copy.
3. **The 2 -> 4 -> 5 linkage is relaxed for three cards.** A consequence of departure 2. `Reminders and Confirmations` appears as a flow stage but produces no metric row. `Recall Follow-Up` produces a metric row but has no flow stage, because the flow follows one call and recall is not part of it. `Treatment Plan Follow-Up` has neither. All three are real front-desk work; the template's linkage rule is relaxed for them deliberately.
4. **6 flow stages, not 5.** `HowItWorksBlock` picks 3 columns when the step count divides by 3 and 4 otherwise, so 5 steps render as 4 + 1. The sixth stage (escalation to a person) is the one the FAQ negative-path answer already promised.
5. **Two CTA labels, not one.** Get Started Free is the single primary label on every primary action. Book a Demo is the sitewide secondary and appears in the hero and the closing banner. The template asks for one label; the site's convention is a primary/secondary pair, and the site wins on design.
6. **One link inside a FAQ answer.** The template forbids it. The lean arc has no `rich-text` section to hold the required cross-link up to `/conversational-ai-platform/`, so the last answer carries it. Route verified 200.
7. **Section 6 ships without a heading.** `live-in-days` renders its `eyebrow` as a `<p>`, so "How to launch" is absent from the document outline. Accepted rather than forcing a different block; recorded as a library gap.
8. **The hero sentence runs 23 words, over the 20-word ceiling for descriptions.** The template requires the shape "what happens + when + three outcomes" *and* the keyword in the first sentence of the hero. The keyword is 6 words on its own; the two requirements do not both fit in 20. The shape and the keyword win, the length rule is the one that gives. `qa:copy` flags at 25, so this passes the gate - the departure is declared here because it breaks the copy-length table, not the gate.
9. **`live-in-days` sits at position 7, not directly after the hero.** Its registry guidance says "use directly after a hero". On this page the launch path answers the objection that the comparison table raises, so it follows the table. Deliberate, against the quoted guidance.

## Section structure (order is binding)

1. **Hero** - promise. Eyebrow carries the keyword, title carries the promise, one description sentence of the shape "what happens + when + three outcomes" whose outcomes match section 5 (qualify, book, confirm), 2 CTAs. See departure 8 for its length.
2. **Capabilities** - 8 named capabilities (see departure 2), short noun-phrase headings, no overlap.
3. **Problem** - 3 structural causes, bold heading + 2-3 sentences each. Cut by time / reach / ownership.
4. **How it works** - 6 time-ordered stages (see departure 4), one sentence each, plus a product visual.
5. **What changes** - before/after table, 5 rows, each a measurable quantity.
6. **How to launch** - Start / Build / Test / Launch with a day marker on each, non-overlapping.
7. **Closing CTA banner** - value restated in different words than the hero.
8. **FAQ** - 4 questions in one group: coverage, logic, negative path, handoff.

## Approved facts used on this page

`ai/contracts/copy-data.md` has **no** sourced pain data for dental or healthcare, and healthcare is on its "do not invent tool names" list. The figures below were researched for this page and are carried in this brief so `qa:copy` can verify them. They are **author-supplied and pending marketing sign-off** before publication.

- 38% of inbound calls to a 26-practice dental group went unanswered (Peerlogic, 2026)
- 78% of callers who reach voicemail hang up without leaving a message (Dentina, 2026)
- 67% of patients who cannot reach a practice call another practice (Dentina, 2026)
- 7.4% of confirmed appointments lost to no-shows across 3,400 practices (Planet DDS, 2025)
- Platform facts reused from `copy-data.md`: credits priced per resolved conversation and per minute of voice; deployment in days.

**Not used, deliberately:** no dental practice-management tool is named anywhere on the page. Dentrix, Open Dental and Eaglesoft are real products but healthcare is unresearched in `copy-data.md`, so the page says "your practice management system" and the gap is recorded as an open tail.

## Cross-page rules

- One primary CTA label across the page (see departure 5).
- No figure that is not in the list above.
- Affirmative tone. No "can help", no "designed to".
- Voice-led vertical (pending confirmation), so the page links up to `/conversational-ai-platform/` (route verified 200).
