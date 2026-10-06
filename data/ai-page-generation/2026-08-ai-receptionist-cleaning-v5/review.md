# Review - AI Receptionist for Cleaning Companies (v5, clean pipeline run)

Run date 2026-08-20. Payload `pages` id **163**, route `/ai-receptionist-for-cleaning-companies-v5/`,
Track B: the task specified the sections, the copy was written in this run. The document is published
locally while QA runs and is set back to `draft` as the last action of the handover - the state at the
bottom of this file is the authority on where it ended up.

This is a from-scratch run of the page pipeline on the same task the v3 and v4 batches used. Nothing
was copied from those batches. The live page (id 19) and the v4 JSON were read only for structure -
which blocks the page family uses, which fields each block has, which media files exist.

---

## Phase 1 finding: the task describes a page that already shipped

`/ai-receptionist-for-cleaning-companies/` is a **published** page, `pages` id 19, contentKey
`fa1598b2e635fb75`, carrying all 14 sections of this task in the same order. Checked against the
three required sources: the running CMS with an admin token (162 `pages` docs), the snapshot
`data/cms/pages.json` (361 docs), and synonym routes (`/ai-receptionist/`, `…-ai/`, `…-v2/`,
`…-v3/`, `…-v4/`, `/ai-lead-handling-for-cleaning-facility-services/`).

`npm run qa:keyword-collision -- --keyword "AI receptionist for cleaning companies" --path /ai-receptionist-for-cleaning-companies-v5/`
returns, as expected for a control build:

| severity | code | finding |
|---|---|---|
| blocker | `keyword-owned-by-h1` | the keyword is already the rendered H1 of `/ai-receptionist-for-cleaning-companies/` |
| warning | `keyword-in-meta-title` | it is also in that page's meta title |
| warning | `synonym-route` | the two routes share `[receptionist, cleaning, companies]` |

**Accepted, with a mitigation rather than a shrug.** The route in the task is not free, so building
there would be a duplicate on a live route. This build sits on a free route and ships
`seo.robots: "noindex, nofollow"`, which is what keeps a second page carrying the same focus keyword
from competing with the published one. The rendered page confirms it:
`<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">`.

The four earlier builds of this same task are still in the local CMS: id 159 (`…-ai/`) and id 160
(`…-v2/`) are **published**, id 161 (`…-v3/`) and id 162 (`…-v4/`) are drafts. Cleaning those up is
an owner decision, not part of this run - noted as an open tail.

### Defects on the live page, still unfixed

Reported by the v4 run and re-confirmed here from id 19; this run did not touch that document.

| severity | live page defect |
|---|---|
| blocker | `channels-grid.gradientText` reads "One AI Recruiting Agent." on a receptionist page |
| blocker | `channels-grid.title` contains a Cyrillic С (U+0421) in "Every Сhannel" |
| blocker | the SMS card has no image, so it falls back to a mockup from another vertical, and `image-109390.png` - the cleaning SMS mockup - is attached to the voice card as a `customIcon` instead |
| major | hero title reads "Turn Every Missed Call Into a Booked **Jobs**" |
| major | `functional-capabilities.eyebrow` is "WHAT ACME AUTOMATES" - platform framing, and all caps |
| major | `results-stats.title` is "{{ The Measurable Shift }}From Day One" - missing space after the marker |
| major | `industry-expertise` runs `autoplay: true` with a 5-second interval - WCAG 2.2.2 |
| minor | the same button points at `/signup` in one place and `https://app.acme.example/signup` in another |
| minor | 6 integrations per group where the task asks for 5 |
| minor | em dashes throughout |

---

## Block verdicts - new block threshold

Zero new blocks. Every section maps onto a registered type, and the block chain matches the page
family: standard renderers, `root` empty on every block, no `uc-*` template family (id 19 is built
the same way).

| Task section | Block | Verdict | Why |
|---|---|---|---|
| Hero | `hero` | reuse | `eyebrow` renders as the `<h1>`, so the keyword owns the H1 and the visual title drops to `<p>` - exactly the three-layer shape the task asks for |
| What Your AI Receptionist Agent Runs | `functional-capabilities` | reuse | `preset: "sales"`, 2-4 word card labels plus 20-35 word descriptions is this block's card shape |
| Challenge to Solution | `pain-points-comparison` | reuse | The block is challenge → agent response, which is the section |
| How It Works | `how-it-works` | reuse | 3 steps, `showStepNumbers`, `label` for the day ranges |
| In Action | `media-showcase` | reuse | One product visual plus a caption; `conversation-replay` would need a scripted story the task did not supply |
| Every Channel | `channels-grid` | reuse | Five channel cards, `mail` as the full-width closer |
| Mid-page CTA | `cta` | reuse | Title, description, two actions |
| The Platform Behind | `industry-expertise` | reuse | `visualType: "capabilities"`, five interactive items |
| Integrations | `logo-grid` | reuse | Four column headings, five logos each |
| Comparison | `difference` | reuse | Two-column contrast, 7 vs 7, one action |
| Results | `results-stats` | reuse | Value first, description second, `infoNote` for the disclaimer |
| Pricing | `pricing-cards` | reuse | Two locked tiers, `info` for the pricing-page pointer |
| Security | `security` | reuse | Four cards, `title` + `titleGradient` as two lines |
| FAQ | `faq` | reuse | Nine items with `category`, rendered as grouped accordions with search |

---

## Where the task and the block library disagreed

Recorded rather than resolved silently. This is the fit-report mechanism from
`ai/contracts/lp-handoff.md`, applied to a Track B page where the pipeline is also the author.

```
[fit] capabilities / functional-capabilities / cards
      task asks:  8-10 lifecycle cards, "one line each"
      block is:   min-height 341px per card, 4 columns at 1440px
      measured:   a one-line (10-15 word) card leaves roughly half the card empty; the first build of
                  this page shipped 20-28 word cards and still left a quarter to a third of each card
                  blank, which the first review pass caught
      resolved:   8 cards at 29-35 words - the top of the 20-35 word card range, which is what
                  `copy-rules.md` prescribes for this block's floor. Two full rows of four
      dropped:    two candidate cards (commercial walk-throughs, post-clean review requests). The
                  10-card version needs `width: "wide"` on the last two to close the row, and a
                  double-width card needs ~40 words to fill - which `qa:copy` fails at 35. Tried,
                  screenshotted, reverted. Commercial walk-throughs are covered in the FAQ instead
```

```
[fit] comparison / difference / leftItems, rightItems
      task asks:  7-vs-7 two-column contrast
      block is:   idealItems 4-6 per column (`registry.ts`)
      shipped:    7 and 7, per the task
      why:        the task names the count explicitly and the block renders 7 rows cleanly at both
                  viewports (no scroll, no clipping, columns stay balanced)
      options:    a) accept 7-vs-7 as an over-density the task asked for (shipped)
                  b) cut to 6-vs-6 and lose one contrast pair
                  c) raise the block's idealItems to 4-7 in `registry.ts`, which affects every page
```

```
[fit] integrations / logo-grid / columns[1..3]
      task asks:  4 groups, 5 integrations in each
      facts file: `copy-data.md` names 8 cleaning tools, all of them booking or field service
      gap:        15 names (Twilio, RingCentral, WhatsApp Business, Gmail, Slack; Stripe, Square,
                  QuickBooks Payments, PayPal, GoCardless; Yelp, Nextdoor, Angi, Thumbtack, Google
                  Local Services) are in neither the facts file nor the task
      shipped:    on the page, with the provenance recorded in `brief.md` - every one is already
                  named on the published sibling id 19, and their logo assets exist in the media
                  library because that page was built
      options:    a) marketing confirms the list and it goes into `copy-data.md` (the real fix)
                  b) drop the three unconfirmed columns and ship one group of five
                  c) keep the group headings and drop the logos, losing what makes the section legible
```

```
[fit] faq / faq / items
      task asks:  9 questions
      task lists: 10 topics (…commercial walk-throughs · works for my cleaning type…)
      resolved:   the two cleaning-type topics merged into one question, "Does it work for our
                  cleaning type, including commercial walk-throughs?" - 9 questions, 10 topics covered
      author call: split them into a 10th question, or accept the merge
```

```
[fit] pricing / pricing-cards / cards[1].button
      task asks:  Enterprise "(see details on the pricing page) https://acme.example/pricing/"
      rule says:  two destinations per page, one CTA per pricing tier
      resolved:   Enterprise CTA is "Talk to Sales" on the sales path; `/pricing/` is a descriptive
                  link in the `info` line under both cards
      options:    a) accept (shipped)  b) make `/pricing/` the Enterprise button and accept a third
                  destination  c) drop the Enterprise CTA and leave only the info link
```

One more conflict, resolved by rule rather than by judgement: the task asks for a ~140-150 character
meta description and `copy-rules.md` asks for 150-160. Shipped at 151 characters, the overlap.

---

## Written by the pipeline

Track B, so every string on the page was written in this run - there is no `lp.md` to diff against.
This section therefore lists the fields that carry no persuasive content and were set from the block
schema rather than from the task, the ones an author would otherwise have to guess at:

| Field | Value |
|---|---|
| `blocks[3].steps[*].label` | `Day 1`, `Days 2-5`, `Days 5-15` (sum consistent with the 5-15 day deployment the task states) |
| `blocks[1].cards[*].icon` | `phone-incoming`, `inbox`, `filter`, `receipt`, `calendar-days`, `bell`, `clock`, `repeat-2` |
| `blocks[5].cards[*].icon` | `sms`, `voice`, `chat`, `whatsapp`, `mail` (the block's five allowed keys) |
| `blocks[7].items[*].icon` | `brain`, `layers`, `wand`, `globe`, `users` |
| `blocks[12].cards[*].icon` | `database_zap`, `file_key`, `shield_ellipsis`, `text_search` |
| `blocks[2].leftHeading` / `rightHeading` | `The Challenge` / `Your AI Receptionist` |
| `blocks[11].cards[*].accent` | `gradient` for Pay-as-you-go, `dark` for Enterprise |
| ALT text, 27 strings | written to describe what each image actually shows; see the ALT note below |
| `seo.robots` | `noindex, nofollow` - see the keyword-collision decision above |
| `blocks[7].autoplay` | `false`. The schema default is `true`; auto-advancing revealed content has no short-duration exemption under WCAG 2.2.2, and the item list is a real tablist, so it stays user-initiated |

**ALT text.** The 5 channel mockups were checked against the actual image before the ALT was
written; the canvas screenshot was not, and its first ALT claimed a cleaning booking the image does
not contain. Caught by the first review pass and rewritten to describe the canvas itself. The first build used the installation-and-repair mockup set
(`image-109400`…`109404`, "ProFix Installations", appliance repair), which made 5 ALT strings claim
cleaning content the images did not show. Swapped to the cleaning set - `image-109390` (SMS, "you
requested a cleaning quote"), `109392` (voice, "Bright Home Cleaning"), `109393` (web chat, "AI
Cleaning Assistant"), `109391` (WhatsApp, end-of-tenancy deep clean), `109394` (email, recurring
cleaning quote) - and the ALTs rewritten to match. The 20 logo ALTs are the product names, which is
what those images show.

---

## Facts and their sources

Every figure on the page traces to `ai/contracts/copy-data.md` or to the task. One stat, one owner:

| Figure | Section that owns it | Source as printed |
|---|---|---|
| 98% of texts read against 6% of emails | pain row 4 | Sakari, 2025 |
| $80,000 to $250,000 lost per year | pain row 5 | Allclean, 2025 |
| 21x on a 5-minute reply | results | Harvard Business Review via Verse.ai, 2025 |
| 40% of inbound calls unanswered | results | Allclean, 2025 |
| 24/7, <1 min | results | capability statements, not benchmarks |
| 2,700+ integrations | logo-grid | locked product fact |
| 5,000 signup credits, credit packs from $10, up to 5 seats, 8 channels | pricing | locked product facts |
| 5-15 day deployment, day 1/3/7 follow-up, 24h and 1h reminders | how-it-works, capabilities, FAQ | operational detail from the task |

**85% of missed callers never call back was dropped.** `copy-data.md` prints that figure without a
year while the Allclean bullets around it carry 2025, so printing a year would have been the pipeline
inferring one and printing none would have shipped a stat that fails the sourcing rule. The first
pain row carries the operational reality instead. The figure goes back to marketing for a year and a
URL.

The 25-40% unanswered-call range from `copy-data.md` is **not** restated in the pain section, because
the task places its top value (40%) in the results section and a stat has one owner. Deliberately
unused: the 44% InsideSales figure and "50% close after the 5th follow-up" (`copy-data.md` gives
InsideSales no year, so the 3-year recency rule cannot be evaluated), the 17.65% LocaliQ benchmark,
and the restricted 92% first-attempt figure.

**Integration names.** The Booking and Field Service column is the cleaning stack from
`copy-data.md`: Jobber, ZenMaid, Housecall Pro, BookingKoala, Launch27. The other three columns -
Twilio, RingCentral, WhatsApp Business, Gmail and Outlook, Slack; Stripe, Square, QuickBooks
Payments, PayPal, GoCardless; Yelp, Nextdoor, Angi, Thumbtack, Google Local Services - are platform
integrations rather than vertical-specific tools. `copy-data.md` lists the vertical stacks only, so
these come from the task's grouping and from the shipped page, and all 20 logo files were verified
to return 200 from the media host. Worth confirming with marketing that this list is the one they
want named on a cleaning page.

**No testimonials.** None are approved, so the block is omitted rather than filled.

---

## CTA ledger

Two destinations. Self-serve `https://app.acme.example/signup` (the renderer appends the UTM),
sales `#popup-open-popupRequestDemo`. Nine CTAs, which is inside the 7-9 the framework arc allows:

| # | Position | Label | Destination | Note |
|---|---|---|---|---|
| 1 | hero | Get Started Free | self-serve | "No monthly fee." |
| 2 | hero | Book a Demo | sales | "30-min consultation" |
| 3 | after the pain section | Start Building Your Agent | self-serve | - |
| 4 | mid-page `cta` | Get Started Free | self-serve | - |
| 5 | mid-page `cta` | Book a Demo | sales | - |
| 6 | after the platform section | See It In Action | sales | - |
| 7 | after the comparison | Talk to Sales | sales | - |
| 8 | pricing, Pay-as-you-go | Get Started Free | self-serve | - |
| 9 | pricing, Enterprise | Talk to Sales | sales | - |

Nothing after the FAQ. No interactive control is styled as a primary button - the FAQ search and the
platform tablist are not CTAs and are not counted.

---

## Gates

| Gate | Result |
|---|---|
| `cms:upsert --write false` | clean, 14 blocks |
| page renders | 200, all 14 sections in the HTML, 13 section `<h2>`s plus the demo popup heading |
| rendered H1 | `<h1>AI Receptionist for Cleaning Companies</h1>`, one h1 on the page, keyword in the H1, the meta title, the meta description and the first 100 words |
| internal links | `/pricing/` 200, `/conversational-ai-platform/` 200, signup and demo destinations resolve |
| media | 26 page images, all 200; 0 failed requests in the browser; the only console errors are the site-wide Capterra analytics CORS failures |
| horizontal overflow | `scrollWidth == clientWidth` at 1440 and at 390 |
| `qa:copy --brief` | **0 blockers, 0 major, 0 suspicion**, no accepted exceptions left standing |
| `qa:keyword-collision` | 1 blocker, accepted with the noindex mitigation above - the route in the task is taken |
| `qa:no-inline-block-styles` | ok, 55 files scanned |
| `npm --workspace @acme/web run typecheck` | 0 errors, 0 warnings (153 files) |
| body length | 2,031 words against the 2,300 provisional ceiling for the full arc |
| `qa:copy-fidelity` | not applicable - Track B, there is no `lp.md` to diff against |
| independent reviewer | pass 1 NOT APPROVED (5 major, 14 minor); every finding resolved or recorded below; pass 2 result at the bottom of this file |

---

## Sources with no URL

`copy-rules.md` requires publication, year and URL on every figure. `copy-data.md` carries
publication and year only, so the page ships what the attribution can honestly claim and the gap is
recorded here (project decision 14):

| Figure | Printed as | Missing |
|---|---|---|
| 40% unanswered; $80,000-$250,000 | Allclean, 2025 | URL |
| 85% never call back | not on the page | year **and** URL - dropped for this reason |
| 21x on a 5-minute reply | Harvard Business Review via Verse.ai, 2025 | URL |
| 98% of texts read | Sakari, 2025 | URL |

No closing sources block: with publication and year only it would restate four strings that already
sit beside their figures (project decision 6, narrowed).

**Cluster up-link placement.** `page-compose.md` says a vertical page links up to its cluster page
*from S10*. S10 here is `industry-expertise`, whose renderer prints `item.description` as text - not
`set:html` - so a link cannot live inside it, and its only link slot is the `button`, which carries
the mandated "See It In Action" CTA. The up-link therefore sits in the last FAQ answer, which does
render HTML, pointing at `/conversational-ai-platform/`. `/ai-sms-agent/`, the other candidate for an
SMS-led vertical, does not exist yet (302 on the site). The deviation is mechanical, not editorial.

---

## Open tails

1. **Four earlier builds of this task are still in the CMS**, two of them published: id 159
   (`…-ai/`), id 160 (`…-v2/`) published; id 161 (`…-v3/`), id 162 (`…-v4/`) draft. They carry the
   same focus keyword as the live page. Unpublishing or deleting them is an owner call.
2. **The live page's blockers are unfixed** - the recruiting gradient text, the Cyrillic С, the
   SMS card with no image, "Booked Jobs". This run did not touch id 19.
3. **No canvas screenshot asset of our own.** The "in action" section reuses
   `/media/2026/07/img-3-scaled.png` from the live page. A real screenshot of the cleaning agent
   canvas is still the missing asset.
4. **The non-cleaning integration names** in three of the four logo columns need marketing's
   confirmation, see above.
5. **`seo.schemaJson` is empty.** `FaqBlock` emits `FAQPage` on its own; `BreadcrumbList`,
   `Organization` and `SoftwareApplication` are still ungenerated site-wide.
6. **The 5-15 day deployment range** comes from the task, not from `copy-data.md`. If it is to be
   used on other pages it should be added there.


---

## Independent reviewer

### Pass 1 - NOT APPROVED: 5 major, 14 minor

Everything below is what the reviewer found and what happened to it. The five majors were all real.
Two of them were defects in this file, not in the page - the review certified a state the render
contradicted, which is worse than the defect it was hiding.

| # | Severity | Finding | Resolution |
|---|---|---|---|
| 1 | major | Six cross-section duplications, two of them near-verbatim sentences: the stack list in `how-it-works` step 2 repeated in the deployment FAQ (11 identical words), the recurring-plan sentence repeated between pain row 5 and the recurring FAQ, the day 1/3/7 cadence three times, "writes the job record" twice, "applies your rate card" five times, the privacy boilerplate restated in the data-ownership FAQ | Fixed. Every duplication rewritten so the claim has one owner. A 5-gram overlap scan across all prose fields now returns **zero** cross-field matches |
| 2 | major | 15 integration names trace to neither `copy-data.md` nor the task | Recorded, not removed. Provenance written into `brief.md`, fit-report entry added above with three options. The real fix is marketing confirming the list into `copy-data.md` |
| 3 | major | "85% of missed callers never call back (Allclean, **2025**)" - `copy-data.md` prints that figure with no year, so the year was the pipeline's inference | Fixed by dropping the figure. The pain row now carries the operational reality; the stat goes back for a year and a URL |
| 4 | major | `difference` ships 7 items per column against `idealItems` 4-6, and the review recorded it as description rather than as a conflict | Recorded. Fit-report entry added with the three options; the task names the count and the block renders 7 rows cleanly |
| 5 | major | Capability cards measured 20-28 words while `brief.md` promised "the top of the 20-35 range", leaving a quarter to a third of each 341px card blank - and this file claimed "no empty space" | Fixed. All 8 cards rewritten to 29-35 words; longest sentence per card kept under the 25-word ceiling. The claim in this file corrected |
| 6 | minor | `media-showcase` ALT described a cleaning booking; the image is a workflow canvas with Phone Call / Text Message / Email nodes | Fixed. ALT now describes the canvas. The email channel ALT was also tightened - the mockup asks the client to confirm details, it does not confirm a quote |
| 7 | minor | Housecall Pro, Gmail and GoCardless logos rendered 55px wide against 150-190px for their neighbours, because those three assets are square with heavy padding | Fixed. Swapped to the wordmark assets `HousecallPro.svg`, `gmail.svg`, `GoCardless_Wordmark_Regular_Pos_1x.png`, all verified 200 |
| 8 | minor | `functional-capabilities.title` marker held 4 words against the 1-3 rule | Fixed: `What Your {{ AI Receptionist }} Agent Runs`. `{{ Pricing }}` left as one word, which is inside the rule and matches the sibling page |
| 9 | minor | No "Free" / "Custom" price signal per tier, which `copy-data.md` lists as required pricing-section content | Fixed. `cards[].eyebrow` now carries "Free to start" and "Custom" |
| 10 | minor | Enterprise card rendered with a ~90px blank panel where the other card has its note | Fixed. Enterprise note: "Volume pricing is quoted per account." |
| 11 | minor | Step labels `Day 1` / `Days 2-5` / `Days 5-15` put day 5 in two steps | Fixed: `Day 1` / `Days 2-4` / `Days 5-15` |
| 12 | minor | "the agent pays for itself on volume" is an ROI promise with no case study behind it | Fixed. The sentence now states the volume dependency without the promise |
| 13 | minor | The hero failed the interchangeability test - no named tool, number or mechanism in eyebrow, title or description | Fixed by naming the booking software in the hero description ("books it in Jobber"), which the task's "what the agent does end-to-end" allows |
| 14 | minor | The admitted limit was the example sentence printed in `copy-rules.md` itself, not a limit discovered about this vertical | Fixed. The limit is now vertical-specific: a standing schedule with one property manager gives the agent little inbound to answer |
| 15 | minor | The cluster up-link is not in S10 as `page-compose.md` requires | Recorded with the mechanical reason - `industry-expertise` renders item descriptions as text, so no link can live there. See the sources section above |
| 16 | minor | The Enterprise CTA silently replaced the pricing-page destination the task named | Recorded as a fit-report entry with options |
| 17 | minor | "cannot price a 2,400 sq ft move-out" introduces a figure outside the approved facts, even though it describes a competitor | Fixed by removing the number |
| 18 | minor | Doc 163 was published while this file asserted it was a reverted draft | Fixed in wording, and the revert is now the last handover action rather than a claim made in advance |
| 19 | minor | The desktop slices were 1100px canvases with white padding and the mobile slices upscaled to 520px, because the capture script un-stuck the header and pushed document width to 1960px - so the 2-row wrap check had not actually been cleared at 1440 | Fixed. Re-captured with no layout injection: `scrollWidth == clientWidth == 1440` and `== 390`, slices at native width (`v5c-desktop-*.png`, `v5c-mobile-*.png`) |

The reviewer also confirmed clean, from the rendered page rather than the JSON: the H1 and its
keyword, one h1, h1→h2→h3→h4 with no skipped level, every section present with the count the task
asked for, the FAQ group order, zero em dashes, zero banned vocabulary, no banned construction, no
"Acme does X" outside the exempt comparison heading, stat ownership, the "AI employee →
autonomous agent" bridge used exactly once, no certifications, no invented testimonials, 9 CTAs
across exactly two destinations with nothing after the FAQ, `autoplay: false` on the platform tabs
with the items still a real tablist, both internal links 200, all 26 images 200, no `uc-*` className
(matching sibling id 19), and the hero clearing the mobile fold.

### Pass 2 - stopped before it returned a verdict

Launched against the reworked page and **stopped by the owner on 2026-08-20** to move on to another
task. It had read the law files, the batch and the JSON and was starting on the desktop screenshot
slices when it was killed, so there is no pass-2 verdict and none should be inferred. The gate
"reviewer APPROVED" is therefore **not met** on this page: pass 1 was NOT APPROVED, its findings were
resolved as tabulated above, and nothing independent has confirmed the rework.

### Handover state

On the owner's instruction the document is left **published in the local CMS** so that
http://localhost:4321/ai-receptionist-for-cleaning-companies-v5/ keeps serving. This is a local
database only. `pages.json` still declares `"status": "draft"`, so any import into staging or
production creates a draft, and publishing there stays a human action in Payload.

Open before this page could be called done: an independent pass over the reworked version, and the
owner decisions listed in the fit reports (the 15 integration names, 7-vs-7 density, the FAQ merge,
the Enterprise CTA destination).
