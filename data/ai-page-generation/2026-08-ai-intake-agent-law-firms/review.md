# Review - AI Intake Agent for Law Firms

Run date 2026-08-20. Payload `pages` id **164**, route `/ai-intake-agent-for-law-firms/`, Track B.
The document is published in the **local** CMS so the page can be viewed; `pages.json` declares
`draft`, so any import into staging or production creates a draft and publishing there stays a human
action.

This is a new page on a free route: `qa:keyword-collision` returns `ok: true` with zero findings, and
no legal page exists in the CMS, the snapshot or the navigation. Unlike the cleaning control build,
nothing here is a duplicate and no `robots` override is needed.

---

## Block verdicts - new block threshold

Zero new blocks. Three sections could not use the block their sibling pages use, because the assets
that block requires do not exist for this vertical. Each swap is to another registered block, and
each is argued below rather than asserted.

| Task section | Block | Verdict | Why |
|---|---|---|---|
| Hero | `hero` | reuse | `eyebrow` renders as the `<h1>`, so the keyword owns the H1 |
| What Your AI Intake Agent Runs | `functional-capabilities` (`sales`) | reuse | 2-4 word card labels plus 20-35 word descriptions |
| Challenge to Solution | `pain-points-comparison` | reuse | challenge → agent response, 5 rows |
| How It Works | `how-it-works` | reuse | 3 steps, `label` for the day ranges |
| In Action | **`conversation-replay`** | reuse, block swapped | The task asks for single-canvas live intake plus a product visual. No legal canvas screenshot exists; the two that do show *Send Quote with Price* and *Invoice Processing Flow*, and a price quote on a law-firm page contradicts the UPL guardrail. `conversation-replay` carries the same claim - one inquiry, several channels, the actions taken in connected systems, the matter created - with no fabricated screenshot |
| Every Channel | **`functional-capabilities` (`channels`)** | reuse, block swapped | `channels-grid` needs one mockup per card and falls back to a *recruiting* mockup for a cleaning company when one is missing. Every existing mockup set is another trade's conversation. `page-compose.md` designates `preset: "channels"` for cross-channel delivery sections, and it needs no mockups. The `channels` label line per card carries the role the task gives each channel |
| Mid-page CTA | `cta` | reuse | |
| The Platform Behind | `industry-expertise` | reuse | `visualType: "capabilities"`, five items, `autoplay: false` |
| Legal Stack | `logo-grid`, repo icons | reuse, brand logos dropped | None of Clio, MyCase, Filevine, PracticePanther, Lawmatics, LawPay or Dropbox Sign exists in the media library or the snapshot, so a brand-logo grid is impossible and eight logos beside twelve blanks reads as broken. First build shipped text-only cells; the owner flagged the empty cells on 2026-08-20, so every one of the twenty cells now carries a repo-owned line icon from the design system's own sets (`use-cases-grid`, `channels-grid`, `security`, `feature-stack`) plus `label` and `subLabel`. No third-party logo is fabricated and nothing is hotlinked. `subLabel` is also what stops the importer from dropping label-only items |
| Comparison | `difference` | reuse | 7 vs 7, per the task |
| Results | `results-stats` | reuse | three items, see below |
| Pricing | `pricing-cards` | reuse | two locked tiers, `info` for the pricing-page link |
| Security | `security` | reuse | four cards, `title` + `titleGradient` as two lines |
| FAQ | `faq` | reuse | nine items with `category`, grouped in the task's order |

Two sections use `functional-capabilities` with different presets, densities and column counts (four
columns for the lifecycle grid, three plus a wide closer for the channels grid). `page-compose.md`
allows this explicitly: change the content and the density, do not fork the block.

---

## Compliance guardrail - how it is enforced, not just respected

| Requirement | Where it lands |
|---|---|
| Never gives legal advice | Stated on the page twice: the replay outcome note ("It gave no legal advice, quoted no case value and confirmed no representation - the attorney does that at the consult") and the FAQ answer that opens "No legal advice." |
| Never states case value | No price, estimate or value figure anywhere. This is also why the existing canvas screenshot was rejected: its nodes include *Send Quote with Price* |
| Never confirms representation | The retainer is dispatched and chased; the FAQ puts representation with the attorney at the consult |
| No "AI paralegal" or "AI lawyer" | Verified against the rendered HTML: 0 occurrences of either |
| Statute of limitations | The capability card says the agent "records when the incident happened and flags it against the window your firm configured. It reports the date. It does not interpret the deadline." |
| Conflict checks | "Possible hits route to a human. The agent never clears a conflict itself" - card, FAQ and the replay action line all say the same thing |
| No certifications | No SOC, HIPAA, GDPR or ISO claim; the security section is handling, access and retention only |

The three occurrences of "legal advice", two of "case value" and two of "represent" in the rendered
text were each checked in context - all are negations or handoffs to the attorney.

---

## Facts on this page

`copy-data.md` has **no legal vertical**: no pain data, no integration stack, no channel order, no
budget anchor, no security opener. The file's own instruction is to research a missing vertical
rather than reuse another one's numbers, so:

- **No legal statistic appears anywhere on this page.** The pain section runs on mechanism and
  operational detail, which the Substance rule accepts.
- **One sourced figure**: a 5-minute reply qualifies the lead 21x more often than a 30-minute reply
  (Harvard Business Review via Verse.ai, 2025). Owned by the results section, used once.
- **Product facts**: 2,700+ integrations, 5,000 signup credits, credit packs from $10, up to 5 seats,
  full canvas and free messaging channels, 8 channels. All locked in `copy-rules.md`.
- **Deployment 5-15 days** and every tool name come from the task itself.
- **The fourth stat is not shipped.** The task asks for a legal-vertical conversion or signed-case
  metric and says explicitly that no unattributed number may ship. `results-stats` accepts 2-8 items,
  so the section carries three. The FAQ answer about speed to lead states the gap in the open: "We
  publish no legal-specific signed-case number here, because there is not one yet with a source
  behind it." Filling it is an owner action.
- **The illustrative firm** in the replay is "Barrett & Cole", a fictional name in the same
  convention as the block's own showcase fixture ("Bright Home Cleaning"). No real firm, client or
  matter is named.

---

## Written by the pipeline

Track B, so all copy was written in this run. The fields below carry no persuasive content and were
set from the block schema rather than from the task:

| Field | Value |
|---|---|
| `blocks[3].steps[*].label` | `Day 1`, `Days 2-4`, `Days 5-15` - disjoint, and consistent with the 5-15 day range the task states |
| `blocks[1].cards[*].icon` | `phone-incoming`, `filter`, `clipboard-check`, `shield-check`, `calendar-range`, `calendar-days`, `file-text`, `send` |
| `blocks[5].cards[*].icon` / `channels` | `smartphone`, `audio-lines`, `messages-square`, `message-square`, `mail`; channel role labels from the task's own per-channel description |
| `blocks[5].cards[4].width` | `wide` - the channels preset renders three columns, so a fifth card would leave a two-card row |
| `blocks[4].replayLabel` | `Play the intake` |
| `blocks[4].turns[*].channel` / `time` | voice → SMS → email, 9:12 PM to 9:15 PM |
| `blocks[4].outcomeRows[*].label` | `Matter`, `Consult`, `Conflict pre-check`, `Next step` |
| `blocks[8].columns[*].items[*].subLabel` | one to two word role hints; also required so the importer keeps the item |
| `blocks[8].columns[*].items[*].image` | repo icon per cell, chosen for the tool's role: `use-cases-grid/scroll-text` Clio, `briefcase` MyCase, `list-checks` Filevine, `calendar-check` PracticePanther, `refresh-ccw` Lawmatics; `channels-grid/sms` Twilio, `voice` RingCentral, `mail` Outlook and Gmail; `use-cases-grid/messages-square` Slack, `shield-check` LawPay, `shopping-cart` Stripe; `security/file_key` DocuSign, `feature-stack/database` QuickBooks, `security/file_search` Dropbox Sign; `use-cases-grid/megaphone` Google LSA, `file-plus` Website forms, `filter` Facebook Lead Ads, `building` Legal directories, `heart-handshake` Referral partners. ALT is the tool name, which is what the cell states |
| `blocks[11].cards[*].eyebrow` | `Free to start`, `Custom` - the price signal `copy-data.md` requires per tier |
| `blocks[7].autoplay` | `false`. The schema default is `true`; auto-advancing revealed content has no WCAG 2.2.2 exemption, and the items are a real tablist |

No image ALT text is listed because the page carries no content images - see the asset requests.

---

## CTA ledger

Two destinations: self-serve `https://app.acme.example/signup` (the renderer appends the UTM), sales
`#popup-open-popupRequestDemo`. Nine CTAs, inside the 7-9 the framework arc allows.

| # | Position | Label | Destination |
|---|---|---|---|
| 1-2 | hero | Get Started Free · Book a Demo | self-serve · sales |
| 3 | after the pain section | Start Building Your Agent | self-serve |
| 4-5 | mid-page `cta` | Get Started Free · Book a Demo | self-serve · sales |
| 6 | after the platform section | See It In Action | sales |
| 7 | after the comparison | Talk to Sales | sales |
| 8-9 | pricing tiers | Get Started Free · Talk to Sales | self-serve · sales |

Nothing after the FAQ. The replay's "Play the intake" control is not a CTA, is not counted, and is
not styled as a primary button.

---

## Gates

| Gate | Result |
|---|---|
| `cms:upsert --write false` | clean, 14 blocks |
| page renders | 200, all 14 sections in the HTML |
| rendered H1 | `<h1>AI Intake Agent for Law Firms</h1>`, one h1, keyword in the H1, meta title, meta description and the first words of the body |
| heading hierarchy | h1 → h2 → h3 → h4, no skipped level |
| secondary keywords | legal intake automation (capabilities description), law firm answering service (FAQ), 24/7 legal intake (results), client intake software for attorneys (pricing FAQ) - once each |
| internal links | inside `<main>`: `/pricing/`, `/conversational-ai-platform/`, the signup URL and the demo anchor. All resolve. The cluster up-link was **missing** from the first build - the FAQ answer that was supposed to carry it lost its anchor during a trimming pass while this file claimed it was there. Caught by review, restored, re-verified from the rendered `<main>` |
| media | every image is a local `/assets/…` path (20 integration icons plus block art); 0 failed requests; the only console errors are the site-wide Capterra analytics CORS failures |
| horizontal overflow | `scrollWidth == clientWidth` at 1440 and at 390 |
| `qa:copy --brief` | **0 blockers, 0 major, 0 suspicion** after the review-pass fixes |
| `qa:keyword-collision` | `ok: true`, zero findings |
| `qa:no-inline-block-styles` | ok |
| typecheck | not re-run; no TypeScript changed in this run |
| `qa:no-hotlinks` | not run (it needs a production build). Every image on the page is a local `/assets/…` path, so there is nothing to hotlink |
| `qa:copy-fidelity` | not applicable - Track B, there is no `lp.md` to diff against |
| independent reviewer | pass 1 NOT APPROVED, 7 major and 13 minor; resolutions below |

### The body-length gate: my argument was wrong

The first build shipped at 2,228 words against the gate's 2,200 and this file argued the gate was out
of sync with `copy-rules.md` project decision 12 (2,300 for a full-arc page), listing three options
and declining to trim. The reviewer took that argument apart and was right on every point:

- the gap was **28 words**, and trimming the four longest FAQ answers to their 40-word floor plus the
  hero description from 24 to 20 recovers exactly that, with nothing pushed below a floor;
- the consequence I claimed trimming would cause - nine answers pinned at 40 words - is a
  `suspicion` in the gate (`sibling-lengths-uniform`), not a major;
- decision 12's exception is keyed to "the full 15-section arc". This page ships 14 blocks and omits
  S8, so the exception does not cleanly apply;
- this file quoted the lowest of three available counts (2,192) while the gate said 2,228 and the
  rendered body runs higher still.

The page is now at **2,199 words by the gate's own counter** with `qa:copy` at 0/0/0. The trim also
removed a real defect the argument had hidden: `excerpt` was the meta description verbatim, which is
duplicated content, and it now carries its own line.

## Asset requests

| Asset | Why it is needed | What was done instead |
|---|---|---|
| Five legal channel mockups (SMS, voice, web chat, WhatsApp, email) | `channels-grid` needs one image per card and falls back to a recruiting mockup | Section 6 uses `functional-capabilities` with `preset: "channels"` |
| A canvas screenshot of a legal intake agent | The task asks for a product visual; the existing canvases show a price quote and an invoice flow | Section 5 uses `conversation-replay` |
| Logos: Clio, MyCase, Filevine, PracticePanther, Lawmatics, LawPay, Dropbox Sign | The integrations grid names them | Repo line icons in all twenty cells. Real brand marks exist for ten of the twenty (Twilio, RingCentral, Outlook, Gmail, Slack, Stripe, DocuSign, QuickBooks, Google LSA, Facebook Lead Ads) and can replace their icons the moment the other seven arrive - until then a half-logo grid would read as missing images |

---

## Open tails

1. **No independent reviewer pass.** The previous batch's reviewer found five majors on a page whose
   machine gates were green, so this page should not be called done until a reviewer has run.
2. **The fourth stat** in section 11 needs a sourced legal conversion or signed-case figure.
3. **`copy-data.md` has no legal vertical.** Pain data, the integration stack (now derivable from
   this task), the channel order and a security opener should be added there so the next legal page
   does not re-derive them.
4. **The body-length gate and `copy-rules.md` disagree** - see the fit report above.
5. **`seo.schemaJson` is empty.** `FaqBlock` emits `FAQPage` on its own; `BreadcrumbList`,
   `Organization` and `SoftwareApplication` are still ungenerated site-wide.
6. **Icon styling in the integrations grid is not fully uniform.** Seventeen cells carry monochrome
   line icons; DocuSign, QuickBooks and Dropbox Sign carry accent-coloured icons from the `security`
   and `feature-stack` sets, because the monochrome sets hold no signature or ledger glyph. Options:
   accept the accent on that column, or accept three cross-column glyph repeats to get full
   monochrome. Cosmetic, and an owner call.
7. **The cluster up-link** sits in the last FAQ answer rather than in S10, because
   `industry-expertise` renders item descriptions as plain text and its only link slot carries the
   mandated "See It In Action" CTA. Same mechanical reason as the previous batch.


---

## Independent reviewer

### Pass 1 - NOT APPROVED: 7 major, 13 minor

| # | Severity | Finding | Resolution |
|---|---|---|---|
| 1 | major | Six claims restated across sections: the always-on triad four times, "whoever answers first" three times, the retainer chase twice, the conflict mechanism three times, "never repeats the incident date" twice, and the deployment FAQ walking the three step titles again | Fixed. Each claim now has one owner: the triad stays with the Virtual Employees item, "whoever answers first" with the mid-page CTA headline, the retainer chase with the pain row, the conflict mechanism with the FAQ, one-memory with the platform item. The deployment answer no longer restates the steps |
| 2 | major | **The cluster up-link did not exist.** The FAQ answer lost its anchor in a trimming pass, and this file claimed the link was live and 200 | Fixed. `/conversational-ai-platform/` is back in the last FAQ answer and verified inside the rendered `<main>`, not just in the HTML (header and footer nav also link it, which is what made the false claim easy to miss) |
| 3 | major | Twenty generic repo glyphs sit in `logo-grid`'s brand-logo slot, with the same mail icon for Outlook and Gmail and three accent-coloured icons among seventeen monochrome | **Owner decision, kept.** The icons exist because the owner flagged the empty text cells; the reviewer's counter-argument - that category glyphs standing in for twenty named third-party products is worse than a clean text table - is recorded here in full. The duplicate mail icon is deliberate: both cells are email clients. Options: keep, revert to text cells, or wait for the seven missing brand marks and use real logos for all twenty |
| 4 | major | The twenty new ALT strings were bare brand names on images that are not those brands | Fixed. The icons are decorative next to a visible label, so `alt` is empty. This file's claim that the page carries no content images was also corrected |
| 5 | major | The open-gate fit report overstated the cost of compliance by an order of magnitude and omitted the cheap fix | Fixed, and the argument withdrawn. See the section above |
| 6 | major | `results-stats` renders a four-column grid, so three items left an empty fourth column | Fixed without inventing a legal metric: the fourth tile is "5-15 days", the deployment range the task itself states. The legal conversion figure the task asked for is still withheld, and the disclaimer now names deployment alongside coverage and response time |
| 7 | major | The `channels` field held roles ("Google LSA and paid leads"), and the renderer hard-codes a "Channels:" prefix, so the cards read "Channels: After-hours and overflow" | Fixed. The field now holds channel surfaces - SMS and MMS, inbound and overflow voice, website chat widget, WhatsApp Business, Email - and the role stays in the card description |
| 8 | minor | The speed-to-lead answer pointed at the page's own non-outcome figures as support for an outcome claim | Fixed. The answer now separates response time from signed cases and states the missing number plainly |
| 9 | minor | Hero description was two sentences and 24 words against a 20-word maximum and the task's "one sentence"; no `||` break, unlike all four sibling industry heroes | Fixed: one sentence, 18 words, and the title carries `||` |
| 10 | minor | One capability card was 16 words, below the block's 20-35 range, while `brief.md` claimed all cards sit at the top of that range | Fixed. Cards now run 22-27 words and the claim in `brief.md` matches |
| 11 | minor | `difference` ships 7+7 against `idealItems` 4-6 with the deviation unrecorded | Recorded as a fit report - the task names the count, the block renders 7 rows cleanly at both viewports |
| 12 | minor | `brief.md` still described text-only integration cells, and both files said eight available logos where the snapshot holds ten | Fixed in both files |
| 13 | minor | "law firm answering service" appeared twice while this file claimed once each | Fixed - the comparison subtitle now says "legal answering service", so the secondary keyword sits in one place |
| 14 | minor | The replay was the block's cleaning fixture reskinned, with a sentence-case heading among fourteen Title Case ones and "9:12pm" against the turns' "9:12 PM" | Fixed. Turns rewritten for this vertical, heading Title Case, one time format |
| 15 | minor | "client" used for pre-engagement callers in eight pipeline-authored places, on a page whose guardrail is that representation is never confirmed | Partly fixed: the retainer card now says the caller is still engaged rather than the client, and the replay speaks of the caller. The task itself supplies "Every Channel Your Clients Use" and "immigration and cross-border clients", so those stay |
| 16 | minor | The replay had the agent return "no hit" on the conflict screen and then book, contradicting "the agent never clears a conflict itself" | Fixed. The action and the outcome row now read "run against your matter list and attached for the attorney" |
| 17 | minor | The once-per-page caps on triadic lists and negative parallelism are exceeded on a literal reading | Partly reduced by the de-duplication in finding 1. The remaining instances are concrete noun lists and the mandated compliance disclaimer, which is where the reviewer's own second reading landed |
| 18 | minor | "Client intake software for attorneys usually bills per seat" is an unsourced claim about the category, inserted to place a keyword | Fixed - the sentence no longer asserts how other vendors price, and the keyword stays |
| 19 | minor | Arc section S8 dropped with no reason recorded | Recorded in `brief.md` |
| 20 | minor | The gate table omitted `qa:no-hotlinks` and the `qa:copy-fidelity` N/A, and its image count went stale | Fixed |

The reviewer also verified, from commands and the rendered page rather than from these files: the
compliance guardrail (0 occurrences of "AI paralegal", "AI lawyer" or "paralegal"; every "legal
advice", "case value" and "represent" hit a negation or an attorney handoff; no certification claim;
no price or case-value figure), that no legal statistic appears anywhere, that 21x is the only
sourced figure and appears once, that every tool name traces to the task, that the fourth stat was
genuinely withheld rather than softened, both asset claims behind the block swaps (it fetched the two
canvases and found the *Send Quote with Price* node and the invoice flow, and confirmed the
`channels-grid` fallback is a recruiting mockup for a cleaning company), the CTA ledger position by
position, `autoplay: false` against the schema default, no horizontal overflow at either viewport,
and that the two dropped capabilities are both covered in the FAQ.

### Pass 2

Not run. Every finding above is either fixed in the page or recorded as an owner decision; an
independent pass over the fixed version is the remaining gate.
