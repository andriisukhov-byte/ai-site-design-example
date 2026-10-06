# Review — AI Receptionist for Cleaning Companies (v4 control build)

Run date 2026-08-19. Payload `pages` id **162**, route `/ai-receptionist-for-cleaning-companies-v4/`, status `draft`
(published locally for QA only, reverted at handover).

This was a test of the page pipeline after the copy-rules rework, driven by TASK 1 from the marketing owner.

---

## Phase 1 finding: this brief describes an existing page

The route in the task, `/ai-receptionist-for-cleaning-companies/`, is taken by a **published** page
(`pages`, contentKey `fa1598b2e635fb75`). Checked against all three required sources: the snapshot
`data/cms/pages.json`, the live CMS with an admin token across all six collections (161 pages docs), and
synonym routes.

All 14 sections of the brief are already on that page, in the same order, down to the four stats and the
five platform block names. So the brief is the specification of a page that already shipped, and TASK 1 is
a revision brief, not a creation brief. Agreed with the owner on 2026-08-19: build a control version on a
free route, leave the live page untouched, compare afterwards.

`npm run qa:keyword-collision -- --keyword "AI receptionist for cleaning companies" --path /ai-receptionist-for-cleaning-companies/`
returns two blockers (route taken, keyword already owns another page's rendered H1). That is the correct
answer and it is what stopped this from becoming a duplicate on a live route.

### Defects found on the live page while comparing

Reported for the owner; not fixed here, because this run did not touch that document.

| Severity | Live page defect |
|---|---|
| blocker | `channels-grid.gradientText` reads **"One AI Recruiting Agent."** - leftover from a recruiting page, on a receptionist page |
| blocker | `channels-grid.title` contains a Cyrillic **С** in "Every Сhannel" (U+0421), so the word is broken for search and for screen readers |
| major | Hero title reads "Turn Every Missed Call Into a Booked **Jobs**" - grammatical error, above the fold |
| major | `functional-capabilities.eyebrow` is "WHAT ACME AUTOMATES" - breaks the platform-framing rule, and all-caps against the sentence-case rule |
| major | `results-stats.title` is "{{ The Measurable Shift }}From Day One" - missing space after the marker |
| major | `industry-expertise` has `autoplay: true` with a 5-second interval - auto-advancing revealed content, which WCAG 2.2.2 does not exempt at any duration |
| minor | The same button points at two different addresses: `/signup` on the pricing card, `https://app.acme.example/signup` in the hero |
| minor | Enterprise pricing button href is a self-referencing anchor `/ai-receptionist-for-cleaning-companies/#popup-open-popupRequestDemo` where every other popup CTA uses the bare anchor |
| minor | The brief asks for 5 integrations per group; the live page has 6 |
| ~~minor~~ | ~~The brief asks for 9 FAQ questions; the live page has 10~~ - withdrawn. The task says 9 and then lists 10 topics, so 10 questions is a defensible reading of its own brief. The contradiction is in the task, not the page |
| minor | Em dashes throughout, against the copy rules |

---

## Block verdicts - new block threshold

Zero new blocks. Every section maps onto a registered type, and the live page is the proof: it uses the
same set.

| Brief section | Block | Verdict | Why |
|---|---|---|---|
| Hero | `hero` | reuse | Three-layer hero lands natively: `eyebrow` becomes the `<h1>`, so the keyword sits in the H1 and the visual title drops to `<p>` |
| What Your AI Receptionist Agent Runs | `functional-capabilities` | reuse | `preset: "sales"`, 2-4 word labels plus 20-35 word descriptions is exactly this block's card shape |
| Challenge to Solution | `pain-points-comparison` | reuse | The block is problem → agent response, which is what the brief asks for |
| How It Works | `how-it-works` | reuse | 3 steps, `showStepNumbers`, one sentence each |
| In Action | `media-showcase` | reuse | Caption plus product visual |
| Every Channel | `channels-grid` | reuse | Exactly five channel cards, `mail` as the full-width closer |
| Mid-page CTA | `cta` | reuse | Title, description, two actions |
| The Platform Behind | `industry-expertise` | reuse | `visualType: "capabilities"`, five interactive items |
| Cleaning Stack | `logo-grid` | reuse | Four headed columns of logos |
| 7-vs-7 contrast | `difference` | reuse | Two columns of seven, with an action |
| Measurable Shift | `results-stats` | reuse | Value-first stat items plus `infoNote` |
| Pricing | `pricing-cards` | reuse | Two cards, locked tier names, `info` for the pricing-page link |
| Security | `security` | reuse | Four proof cards, matching the four-part boilerplate |
| FAQ | `faq` | reuse | Categorised items, two-line heading |

---

## Fit report

Two conflicts between the brief and the design system. Both need the author's confirmation; neither was
resolved by rewriting the brief's intent.

```
[fit] Section 2 / functional-capabilities / cards[*].description
      brief asks:  "8-10 lifecycle capability cards, one line each"
      block needs: cards are min-height 341px, and a one-line description leaves the card
                   visibly half empty - which is what the live page looks like today
      written as:  20-30 words, two to three lines, filling the card
      options:     a) accept the two-to-three line card (what this build does)
                   b) keep one line and accept the empty card
                   c) move the section to `feature-grid`, which has no card height floor
```

```
[fit] Section 2 / functional-capabilities / card count
      brief asks:  8-10 cards
      built with:  8
      why:         10 cards means a ragged final row of two. Closing it needs `width: "wide"`,
                   and a wide card keeps the 341px height while gaining double the width, so it
                   ends up half empty - visible in the first screenshot pass. 8 cards is inside
                   the brief's range and gives two clean rows of four.
      folded in:   "After-Hours and Urgent Triage" into "First Contact and Missed-Call Recovery",
                   which already described after-hours triage; "Post-Service Follow-Up" and
                   "Recurring Plan Sales" into "Post-Visit Follow-Up and Recurring Plans"
      options:     a) accept 8 cards (what this build does)
                   b) restore all 10 and accept the two half-empty wide cards
```

---

## Accepted findings from the copy gate

`npm run qa:copy -- --file <batch>/pages.json --brief <batch>/brief.md` → 1 blocker, 0 major, 0 suspicion.

| Finding | Decision |
|---|---|
| `platform-framing` on `blocks[9].title` - "What Acme Does That Standard Cleaning Answering Services Don't" | **Accepted.** The brief mandates this exact section name and the live page ships it. Content authority is the brief. Flagged for the next rules sync with marketing, since the rule as written forbids it |

## Rule contradictions surfaced by this run

Both were fixed in the rules, not worked around in the copy.

1. **Sentence length.** The marketing rhythm rule wants one sentence over 25 words in any block of five or
   more sentences. The ASD-STE100 clarity rule capped sentences at 20 words. On this page the two rules
   fired against each other 20 times. Resolved as project decision 9 in `copy-rules.md`: the 20-word
   ceiling binds short-form copy, rhythm wins in prose blocks, and `qa:copy` flags above 25 words and
   above 30 inside a FAQ answer.
2. **CTA label.** The brief says "CTAs (approved only): Book a Demo"; the marketing source table lists
   only "Request Demo". Resolved with the owner as project decision 8: both approved, the page brief
   chooses. `Book a Demo` added to the gate's locked label set.

## Written by the pipeline

Fields the brief has no slot for, generated here. Every one is a label or an image description, never a
headline, a card description, a CTA label, or a FAQ answer.

| Field | Value |
|---|---|
| `blocks[3].steps[*].label` | "Step 1", "Step 2", "Step 3" |
| `blocks[1].leftHeading` / `rightHeading` | "The Challenge" / "Acme AI Receptionist" (matching the live page) |
| `blocks[4].image.alt` | "AI receptionist for cleaning companies booking a job on the Acme canvas" |
| `blocks[5].cards[*].image.alt` | Four channel-specific ALT strings, all under 125 characters, no two alike |
| `blocks[*].icon` | Preset icon names, reused from the live page so the visual language matches |
| `seo.ogTitle` / `ogDescription` | Social variants of the hero copy |
| `blocks[11].info` | "Per-action costs and worked examples are on the pricing page." with the link the brief asked for |

## Gates

| Gate | Result |
|---|---|
| Schema dry-run | pass, clean |
| Page renders 200 | pass |
| All 14 sections present in HTML | pass, checked by string match, not by screenshot alone |
| Rendered `<h1>` | pass - exactly one, and it is "AI Receptionist for Cleaning Companies" |
| Keyword in title, meta description, slug, first 100 words | pass |
| Internal links | pass - every link this page adds resolves 200, including `/pricing/` |
| Media | pass - 123 page resources, all 200 |
| `qa:copy` | 1 accepted blocker, 0 major, 0 suspicion |
| `qa:keyword-collision` for the v4 route | pass |
| CTA policy | pass - 4 self-serve CTAs, all to one address with UTM appended by the renderer; sales path is one popup |
| No CTA after FAQ | pass - `faq` is the last block |
| Typecheck | pass, 0 errors |
| Independent reviewer | see the verdict section below |

## Open tails

1. **Blocker: the SMS channel card has no image of its own.** The renderer substitutes
   `/assets/blocks/channels-grid/images/sms.png`, which is a **recruiting** conversation - "Thanks for
   applying for Cleaner at Sparkle Clean… Are you available to work weekends?" - on a page about booking
   cleans. Confirmed in the screenshots. No cleaning SMS mockup exists: the only SMS mockups in the media
   library are plumbing (`sms.jpg`), appliance installation (`image-109400.png`), HVAC
   (`image-109405.png`) and roofing (`image-109395.png`). The live page has the same defect.
   Asset needed: a 372x372 SMS thread mockup in the same visual language as the other four channel cards,
   showing a booking conversation - missed call, text back, scope question, flat price, slot confirmed.
   Systemic alternative worth considering: the default is wrong for every non-recruiting page, so either
   replace that asset with a vertical-neutral booking thread, or drop the default so a card with no image
   renders text-only instead of a misleading one.
2. No canvas screenshot asset of our own - `media-showcase` reuses the live page's image (id 9940), which
   does show an AI Receptionist canvas, so this is acceptable rather than ideal.
3. No approved testimonials, so no testimonials section. Same position as every other page.
4. No citation block exists in the library, so stat attributions are inline in the stat descriptions
   rather than in a Sources section. Noted as a design gap in `copy-rules.md`.
5. `capability-tools` and `news-insights` sit on the live page but are not in this brief, so they are not
   here. If the content is later moved onto the live route, the owner has to decide whether those two
   sections stay.
6. Local database holds 326 pages against 361 in the snapshot, so several footer routes
   (`/ai-cleaning-agent/`, `/ai-use-cases/`, `/cognitive-ai-platform/`) 404 locally. Local-only artifact,
   not a page defect.

## Independent reviewer

Three passes, all three **CHANGES REQUIRED**. What the reviewer found is the record of what
self-review missed, so it is written down rather than summarised away.

### Pass 1 - 1 blocker, 14 major, 9 minor

The three that mattered most, because all three were defects in the **rules**, not in the page:

1. **The CTA gate scored a false pass.** The page carries nine buttons; `page-compose.md` said "never more
   than 5". The self-review counted only the self-serve path and called it a pass. Root cause: the 19-section
   marketing framework was adopted while the old arc's CTA ceiling was left in place, and the framework's own
   table defines six CTA positions plus one per pricing tier. Rewritten as a **per-destination** rule - one
   self-serve destination, one sales destination, nothing else - and `qa:copy` now counts destinations. Run
   against the live page, the new check independently reproduces both split-destination defects that two
   humans had found by hand.
2. **"See It In Action" was listed as a self-serve label** in the rules while every shipped page treats it as
   a demo CTA. Rule corrected.
3. **"A dedicated `cta` block immediately before `faq`, always"** was also from the old arc, and the framework
   puts the final push mid-page. Rule corrected, and positions 3 and 4 merged so the next author cannot read
   "always" twice and add a second banner.

The sharpest page-level finding: the FAQ's admitted limit read *"if you take fewer than 40 calls a month,
your voicemail is probably fine"* - and the reviewer traced the number to the **style example** inside
`copy-rules.md`, repurposed as an operational threshold told to a buyer. The page's one honest sentence was
resting on the one invented figure. `qa:copy` could not see it: `checkStatSourcing` matches `%`, `+`, `x`,
`M+` and `$` shapes, and a bare integer passes. Removed; the limit is now non-numeric.

Fixed in the page in the same round: gradient markers narrowed to 1-3 words (four section headings had been
rendering fully in the brand gradient, two of them with the ramp restarting on the second line); the channel
list appeared 5 times, "live availability" 4 times, the answering-service argument 3 times, and the
sub-minute claim in five different quantifications; Apollo and ZoomInfo sat in "Lead Sources" while Nextdoor
had been trimmed out; 20 logo ALTs were filename dumps; "Virtual Employees" was unpaired with "AI"; "Step 1"
labels duplicated the number badge beside them; the canonical was relative where 305 of 361 pages store an
absolute one.

### Pass 2 - 1 new blocker, 3 regressions from the pass-1 fixes

Three of the pass-1 fixes broke something else, which is the part worth remembering:

| Fix | What it broke |
|---|---|
| Sources block added | Three `[INPUT NEEDED: source URL]` markers and a paragraph explaining "the approved figure list" **rendered to the reader**. The instinct that stopped me inventing URLs was right; the placeholder belonged in this file, not on the page |
| Uniform card openers varied | The variation was achieved by **deleting the actor**. Four of eight cards and three of five pain rows stopped naming the agent; one card had no finite verb at all ("Live availability, the crew matched by skill and zone, and the booking written into your calendar"); one row opened with a pronoun whose antecedent was in a different element |
| 20 ALTs rewritten | The filename dumps became **20 unsourced product claims** - "GoCardless, collecting recurring cleaning plans by direct debit" - visible only to screen-reader users, in the one place no gate and no reviewer looks |

Also caught: the negative-parallelism cap was satisfied by **dropping two brief-mandated facts** ("no
contract", "no per-seat fee") instead of changing the sentence shape.

All four fixed. Rules and gate changed as a result:

- `[INPUT NEEDED]` and friends in a copy field are now a **gate blocker** (decision 14).
- ALTs name the tool and its category and stop before the claim.
- The actor is back as the subject in every card and row; variation lives in the verb and the shape.
- An attempt to make the actor rule mechanical was **removed**: a verb whitelist produced four false
  positives out of five on this page. It is now listed explicitly under what the gate does not check, because
  a gate that cries wolf is worse than a missing one.
- Two gate holes the reviewer found in the check written that same round: off-label CTAs escaped the
  destination rule, and `/start/` classified any href containing "start" as self-serve. Both closed.

### Two reviewer arguments that changed a decision

- **On the word ceiling.** My framing was "the item counts don't fit 1,800". The reviewer showed that at the
  *bottom* of every range the arc fits in ~1,700, so the real conflict is 1,800 against **project decision 4**
  (block floors force the top of each range). More accurate and harder to argue with, so it was rewritten that
  way. The reviewer also rejected "advisory" - it gives a page nothing to fail against - so the full arc now
  carries a provisional **2,300-word ceiling**. This page is at 2,067.
- **On platform framing.** The accepted per-page waiver was the wrong shape: "the brief overrides the rule" is
  a far broader precedent than intended. Narrowed in the rule instead (decision 13): a heading whose object is
  a competitor *category*, making no claim about a customer conversation, is exempt. The gate implements the
  same narrow test, and it still blocks "WHAT ACME AUTOMATES" on the live page.

### Pass 3 - 2 blockers, 12 major, 12 minor

Two blockers neither earlier pass nor the self-review had seen, both of them risk rather than style:

1. **The hero headline was an unqualified guarantee.** *"Every Missed Call Turns Into a Booked Job"* promises a
   100% conversion rate, contradicted one section later by the page's own sourced *"85% of missed callers never
   call back"* and by its own admitted limit in the FAQ. `copy-rules.md` bans guarantees without a named case
   study. The live page carried the same absolute plus a grammar bug; this build had fixed the grammar and kept
   the absolute. Now "Turn Missed Calls Into Booked Jobs".
2. **The page described review gating, and named Yelp doing it.** *"routes happy customers to Google or Yelp"* -
   soliciting reviews is against Yelp's terms, routing only *happy* customers is the practice the FTC's
   consumer-review rule targets, and neither platform is in `copy-data.md`. It also contradicted the product
   visual, whose canvas shows the opposite path (negative review → escalation to a person). Now "invites the
   customer to leave a review", no split and no platform named.

**A correction to this file.** Open tail: *"the local media collection returns 0 docs, so nobody can verify
whether ZenMaid or Housecall Pro logos exist"* was wrong. Page media resolve from
`PUBLIC_MEDIA_BASE_URL=https://staging.example.com`, and the assets are in `data/cms/pages.json` all along:
`cleaning-zenmaid.png` (8939), `HousecallPro.svg` (8691), `cleaning-bookingkoala.png` (8941),
`cleaning-maid-central.png` (8943), `cleaning-aspire.png` (8944), `cleaning-swept.png` (8945). The
integration wall was a curation problem, not an asset problem: "Booking and Field Service" held three generic
schedulers while `blocks[3]` promised "Connect Jobber or ZenMaid" and the wall omitted ZenMaid. The column is
now five real cleaning tools. Two of the five Lead Sources are still B2B tools (HubSpot, ZoomInfo) - open, no
inbound-lead asset found.

Other page fixes this round: three logo labels an earlier pass had stripped rendered as bare 48px icons in a
wall of wordmarks, and restoring them exposed the inverse defect - a `label` beside a *wordmark* prints the
name twice, so labels now sit only on the icon-only marks, which is why the live page labels exactly three;
the gradient ramp restarting mid-phrase turned out to be **line wrapping**, not marker width, so the pass-1
"narrow the markers" fix had never addressed it - now handled with `||`; "Annual subscription" on the
Enterprise card contradicted "No subscription" two inches left and the shipped `/pricing/` wording, now
"Annual prepay"; "Conversational Voice AI" imported a technical-cluster term onto a business-operator page
against the brief's "Voice AI"; four capability specifics with no source (en-route ETA, crew matching by skill
and zone, cleaner ratings) removed; "confirms budget" was B2B lead-qual vocabulary that also contradicted the
flat-rate card; the urgency escalation the first card promised was missing from the FAQ's list of handoff
triggers, so the list now names it; the product-visual caption described an availability lookup and a CRM
write that the canvas does not show; and the pain-points right column had become five items all opening "Your
agent", which is the banned pattern the pass-2 fix overshot into.

### The gate was inspecting a third of the page

The most consequential finding of the run, and it is about the gate rather than the page.

- **`stat-repeated` had never worked.** Its pattern ended in `\b` *after* `%`, `+` and `M+`, all non-word
  characters, so it could only match when a word character followed. `"40%"`, `"2,700+"` and `"5,000 credits"`
  all returned no match; only the `Nx` shape ever fired. "Each stat appears exactly once per page" was
  unenforced across the whole site. Fixed, and it immediately found `5,000` stated twice on this page.
- **59 of the 94 string fields in `schemas.ts` were never inspected.** The field list was an allowlist, and it
  silently missed everything not on it - the entire `pain-points-comparison` block (`leftTitle`,
  `leftDescription`, `rightTitle`, `rightDescription`), plus `primaryNote`, `secondaryNote`, `gradientText`,
  `titleStart`, `titleAccent`, `cardTitle`, `cardDescription`, `html`, `intro`, `outcomeTitle` and 45 more.
  Inverted to a denylist with a value-shape guard: everything is copy unless its key names configuration or
  its value is plainly not prose. An allowlist fails silently when a block adds a field; a denylist fails
  loudly. Validation: on the live page the rebuilt gate immediately reported an em-dash blocker in
  `rows[3].leftDescription`, a field it had never read.
- Three more holes, each demonstrated by a live defect: the participial-tail list missed "keeping", the
  antithesis regex missed the compact "X, not Y" form, and rhythm and opener checks only ever ran *inside* one
  field, so five sibling descriptions all opening "Your agent" were invisible. A cross-sibling uniformity check
  now exists, scoped to prose - card titles are mandated 2-4 word labels and are uniform by construction, and a
  two-column contrast table is a comparison matrix rather than a bullet set.

### Two more reviewer arguments that changed a decision

- **The sources block was reverted.** With publication and year but no URLs, every line already appeared inline
  beside its figure, so the block restated four strings and put an `<h2>` "Sources" in the outline beside
  "Pricing". Decisions 6 and 14 collided and this page was the collision. Decision 6 is now narrowed: a closing
  citation block only once the citations carry URLs. The mandated cluster up-link moved into the FAQ answer that
  invites it ("Can the platform extend beyond lead handling later?"), which renders HTML links natively.
- **The 40% stat.** Sitting under "The Measurable Shift From Day One" it read as something the product delivers,
  while it is a problem-severity figure. The task mandates the figure in that section, so the wording changed
  rather than the placement.

### Handover state

Both pages are back to `draft`: v4 (id 162) and v3 (id 161), the latter an open tail carried over from the
previous run. `/ai-receptionist-for-cleaning-companies-v4/` now 302s on the site, which is correct for a draft.

A fourth review pass has not been run. Passes 1-3 each found real defects, and pass 3's two blockers were
things the first two passes and the self-review had all walked past, so the loop had not converged when it
stopped. The remaining known-open items are listed below; a fourth pass is a judgement call for the owner
rather than something to keep spending automatically.

### Gate state after three rounds

`npm run qa:copy -- --file <batch>/pages.json --brief <batch>/brief.md` → **0 blockers, 0 major, 0 suspicion**,
with no accepted exceptions left standing. Body 2,067 words against the provisional 2,300 ceiling.

## Sources with no URL

The rules require publication, year and URL on every figure. `copy-data.md` carries publication and year but
no URLs, so the page ships what the attribution can honestly claim and the gap is recorded here:

| Figure | Source on the page | Missing |
|---|---|---|
| 85% never call back; 25-40% unanswered | Allclean, 2025 | URL |
| 21x on a 5-minute reply | Harvard Business Review, via Verse.ai, 2025 | URL |
| 98% of texts read | Sakari, 2025 | URL |

The 44% InsideSales figure was dropped from the page entirely: `copy-data.md` gives it no year, so the
"nothing older than 3 years" rule cannot be evaluated. It needs a year and a URL before any page uses it.
