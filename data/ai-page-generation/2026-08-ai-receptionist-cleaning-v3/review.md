# Review — /ai-receptionist-for-cleaning-companies-v3/

Control run for Task A of the 2026-08-14 feedback round. Same TZ as the v2 demo, rebuilt under the updated rules. Payload `pages` id **161**, imported as `draft`, published locally for QA only.

---

## 1. New-block threshold

The handoff asks how many sections come back with verdict `new`. Run as-is, that number is meaningless: `conversation-replay` and `recovery-calculator` were the net-new blocks of the v2 run and are now registered, so reusing them scores as reuse. The table is therefore filled twice — once against the registry as it stands, and once with those two entries struck out, which is the only version that actually tests the rule.

### A. Against the registry as it stands today

| # | TZ section | Candidate | Verdict |
|---|---|---|---|
| 1 | Hero | `hero` | reuse |
| 2 | What Your AI Receptionist Runs (8–10 cards) | `functional-capabilities` (roster, 5–10) | reuse |
| 3 | Challenge → Solution (5 pairs) | `pain-points-comparison` (rows 4–6) | reuse |
| 4 | How It Works (3 steps) | `how-it-works` (3–6) | reuse |
| 5 | In Action | `conversation-replay` (proof, turns 4–8) | reuse |
| — | What the silence costs *(not in the TZ)* | `recovery-calculator` | reuse |
| 6 | Every Channel (5) | `channels-grid` (cards 5) | reuse |
| 7 | Mid-page CTA | `cta` | reuse |
| 8 | The Platform Behind It | `industry-expertise` (items 5–6) | reuse |
| 9 | Integrations, grouped | `logo-grid` (columns 3–4) | reuse |
| 10 | vs Standard Answering Services (7-vs-7) | `difference` | reuse |
| 11 | The Measurable Shift (4 stats) | `results-stats` (items 4) | reuse |
| 12 | Pricing | `pricing-cards` (cards 2–3) | reuse |
| 13 | Security | `security` (cards 4) | reuse |
| 14 | FAQ | `faq` (items 4–10) | reuse |
| — | Closing CTA | `cta` | reuse |

**Verdicts `new`: 0.** Expectation in the handoff was 0–1. Met.

### B. Counterfactual — the two v2 blocks struck from the registry

This is the real test: would the threshold have authorised them?

| Section | Nearest remaining candidate | Threshold outcome |
|---|---|---|
| In Action | `media-showcase` — a title, one line, one product visual; it is what the live production page uses for this exact section | **reuse.** Condition 1 fails: a registered block covers the role. `conversation-replay` would not have been created. |
| What the silence costs | `metrics` / `results-stats` — both display fixed published figures, neither computes from reader input | **new, authorised.** Condition 1: no registered block turns reader input into a figure. Condition 2: new mechanism (interactive arithmetic). Condition 3: reusable — any page where the buying decision is arithmetic the operator already does, e.g. lead-response and recruiting verticals. One new block, within the per-page cap. |

So the rule does the work it was written for: it kills one of the two v2 blocks and permits the other. That is the correct split — `conversation-replay` was invented for a slot that already had an owner, `recovery-calculator` genuinely introduced a mechanism the library did not have.

### The mechanical reason the threshold could not have fired on the v2 run

`media-showcase` was **absent from `packages/blocks/src/registry.ts`**, although it validates in `schemas.ts`, is dispatched in `BlockRenderer.astro`, and stands on 15 live pages — including the production `/ai-receptionist-for-cleaning-companies/`, in the "in action" slot. `story` was missing the same way, on 5 live pages.

The registry is the only catalog the `create-page` skill reads in Phase 2, and its hard rule says *use only blocks registered in `registry.ts`*. So the composer could not see the block that already owned the section, and designing a new one was the correct move under the rules it had. This is a stronger cause of "the AI creates brand-new blocks every time" than any wording in the prompt.

Fixed in this run:
- both types added to `registry.ts` with role, description and `aiGuidance` (47 registered, was 45);
- `tools/qa/block-registry-coverage.ts` + `npm run qa:block-registry` added, asserting schema ≡ registry ≡ renderer in both directions. Currently 47/47/47, clean. Belongs in the Phase 4 gate list.

---

## 2. What v2 did to the TZ

Comparing v2's block list against the 14 TZ sections turned up deviations that were never reported at the time:

- **§8 "The Platform Behind It" is missing from v2 entirely.** No `industry-expertise`, no substitute.
- **§3 "Challenge → Solution, 5 pairs" is not what v2 shipped.** It used `feature-stack` with 3 cards ("Three bad options") instead of `pain-points-comparison` with 5 rows. Different mechanism, different count.
- **One section added that the TZ does not list** — the calculator.

v3 carries all 14 sections in the TZ order, plus the calculator (declared as a deviation in `brief.md`) and a closing CTA.

---

## 3. Calculator typography

Measured before the fix:

| | `results-stats__value` (reference) | `recovery-calculator__clients-value` | `__result-value` |
|---|---|---|---|
| font-size | `$type-h4-size` = 48px | **72px** literal | **68px** literal |
| font-weight | `$font-weight-semibold` = 600 | **500** literal | **500** literal |
| letter-spacing | — | **−0.03em** | **−0.03em** |
| mobile step | 40px | **none — stayed 72px at 390px** | 46px |

So the block's headline number was 1.5× the site's established value scale, one weight lighter, with tracking the reference does not use — and the largest number on the block never shrank on mobile. That is the "выпадает из стиля" report, measured.

Fixed in `apps/web/src/styles/blocks/_recovery-calculator.scss`: both headline values now take `dt.$type-h4-size` / `dt.$font-weight-semibold`, no tracking, with a 40px mobile step mirroring `results-stats`. Verified visually at 1440 and 390 against `results-stats` on the same page. Colours were already token-derived (`--rc-ink` etc.) and the gradient is not applied to any runtime value, so those two clauses of the design-system gate already passed.

**Not fixed, reported instead:** the gate's "zero literal values" clause is stricter than the codebase. `_recovery-calculator.scss` still holds 18 literal `font-size` declarations — but `_results-stats.scss` has 5, `_pricing-cards.scss` 7, `_metrics.scss` 4. No block in this repo satisfies the clause as written. It needs rewording to what actually matters — headline values and any new scale step must come from tokens — or it will be ignored on every run.

---

## 4. Copy refinement (Phase 2.5)

Run as a separate subagent on `ai/prompts/copy-refiner.md`. Input `pages.draft.json`, output `pages.json`. The draft copy was carried over verbatim from the live approved v1 page, so the whole diff is attributable to the refiner prompt and nothing else.

**250 text fields, 106 rewritten.** Verified independently, not taken on the agent's word:

| Check | Result |
|---|---|
| Banned words (9 terms) | 0 |
| Sentences over 20 words | 0 of 307 |
| Hero title ≤ 9 words | 7 |
| Section titles ≤ 8 words | 15 of 15 |
| Card descriptions ≤ 120 chars | 0 over, max 119 |
| FAQ answers ≤ 45 words | 10 of 10, range 29–44 |
| `{{ }}` markers 1–3 words | 11 of 11 (input had 5 whole-phrase markers) |
| Marker inside `faq.title` | none |
| Block types / order / counts | identical to input |
| Immutable fields (`href`, media, numeric config) | 0 diffs |
| Schema | `cms:upsert --write false` clean |

The characteristic change is noun-fragment → finite verb with a named actor: *"Live voice answer, seconds-fast missed-call text-back, after-hours triage"* → *"Answers live on voice, texts back missed callers in seconds, and triages after-hours calls."* That is the ASD-STE100 rule set doing exactly what it was brought in for.

Defects the refiner caught that had been live on the production page: *"First-touch in seconds, instead hours"*, *"a live AI receptionist for cleaning business"*, *"Cognitive AI agent for cleaners runs the lead"*, and `results-stats.title` rendering as *"ShiftFrom Day One"*.

Content cut with reason: unsourced age segmentation in the channels copy ("younger customers text, older homeowners call"); a "recurring discount" price claim with nothing behind it; the two `cta` blocks were byte-identical in the input and are now differentiated.

### Open, for the content owner

The page carries two different text-read statistics in the same scroll: `channels-grid.cards[0]` says 90% of texts are read within 3 minutes, `pain-points.rows[3]` says 98% of texts get read. Both were on the production page. They read as a contradiction. One should go.

---

## 5. CTA inventory

Primary path **Get Started Free → `/signup`** (the renderer resolves it to `https://app.acme.example/signup?utm_content=<slug>`), 4 occurrences:

1. `hero` — position 1 of the policy.
2. `pain-points-comparison.action` — position 2, after the first value section.
3. `cta` block, mid-page — the TZ's §7.
4. `cta` block, closing — position 4.

Secondary **Book a Demo → demo popup**, once, in the hero. During assembly a second one had crept onto `industry-expertise.button`; removed.

Two in-block actions the policy does not classify: the TZ's mandated **Talk to Sales** on §10 `difference`, and the Enterprise **Talk to Sales** on `pricing-cards`. Both kept — the TZ names the first explicitly, the second is the site-wide pricing pattern.

Page body carries no relative links; all 11 non-200 links on the page are 302s from the shared site nav and footer and are present on every page including production.

---

## 6. Gates

| Gate | Result |
|---|---|
| Schema — `cms:upsert --write false` | clean |
| Import | `pages` id 161, 16 blocks, `draft` |
| Render — page 200, all 16 sections in HTML | pass |
| `<h1>` | exactly one, "AI Receptionist for Cleaning Companies" — the TZ keyword |
| Links | 0 broken in page body |
| Media | 60 images, 0 broken |
| `npm --workspace @acme/web run typecheck` | 0 errors, 153 files |
| `qa:no-inline-block-styles` | ok, 55 scanned |
| `qa:block-registry` (new) | ok, 47/47/47 |
| Copy limits | pass, see §4 |
| Block threshold | 0 verdicts `new` |
| CTA policy | 4 primary + 1 secondary, see §5 |
| Independent reviewer | see the verdict appended below |
| `qa:no-hotlinks` | not run — needs a production build |

---

## 7. Tooling defect found and fixed

`tools/cms/upsert-content.ts` passed Payload's `{ message, doc }` write envelope straight into `assertPayloadRoundTrip`, which reads `path` and `title` off it. Every successful write through the API therefore threw *"did not map back to PageDocument"* after the document had already been created, and the `id` reported back was `undefined`. Fixed by unwrapping `doc`. This blocks Phase 4 of the skill for anyone running it, so it is worth a look on the next pipeline run.

---

## 8. Open tails

- The v2 walkthrough left the "21x (HBR)" and "40% (Allclean)" citations unresolved. v3 does not resolve them either — it carries the production page's four stats with their existing source lines. A content-owner decision, not a generation one.
- No approved testimonials exist, so no `testimonials` block on the page.
- The nav is not touched. This page is reachable by direct link only, by design.
- `canonicalUrl` points at the production route, matching what v2 did, so the two comparison pages behave the same way.

---

## 9. Independent review — verdict `CHANGES REQUIRED`

3 blockers, 10 major, 12 minor. All three blockers were re-verified in the code before acting on them; none was introduced by this run — all three are live on production today.

### Blockers, all fixed

**B1 — `how-it-works` step descriptions were invisible on desktop.** `_how-it-works.scss` collapses `&__description` to `max-height: 0; opacity: 0` by default, and `how-it-works.js` left every card collapsed unless `openFirst`. The section rendered three titles over ~200px of dead space at 1440px, while the mobile override showed the descriptions — which is why the defect survived a mobile check. The flag conflated two behaviours: *open the first card* and *auto-cycle every 3.5s*. Split them: one card now always opens on load, `openFirst` controls only the auto-cycle. 109 pages carry this block.

**B2 — `industry-expertise` auto-advanced with its stop control removed.** `autoplay: true`, `autoplayInterval: 5`, `hideBottomControls: true` — rendered as `data-autoplay="1"` with zero next/prev buttons in the document, cycling the readable description indefinitely. WCAG 2.2.2 Level A, and the exact hard rule in `CLAUDE.md`. Fixed at the content level: `autoplay: false`.

**B3 — `CtaBlock.astro` inverted the button variants.** `primaryAction → variant 'secondary'`, `secondaryAction → 'primary'`. Every `cta` block on the site rendered its main conversion path as the outline button and promoted the optional one to solid. On this page the closing CTA made "Book a Demo" the dominant button and "Get Started Free" a ghost outline. This is the mechanical cause of "CTA на странице не читаются" — the primary CTA was styled as the weakest element on the section. Swapped. 143 pages carry this block. Also dropped the closing block's `secondaryAction`, so the secondary now appears once, in the hero, per the CTA policy.

### Major, fixed

- **`difference` rendered the drawbacks column with checkmarks.** `DifferenceBlock.astro` called `checkIcon('dark', 0)` on `leftItems`, so seven competitor drawbacks read as seven approved features. Added an exclusion mark on the same disc. 23 pages.
- **Two contradicting text-read statistics** in the same scroll (90% / 3 minutes vs 98%). Dropped the first.
- **Three different triggers for the recurring-plan offer** — the capabilities card, the FAQ and the replay each stated a different one. Notably *"after a one-time clean"* was **invented by the copy refiner**: v1's card stated no trigger at all. Card reverted to no trigger, FAQ aligned to what the replay actually shows.
- **The 25–40% missed-call figure scoped two ways** — total in `pain-points`, business-hours-only in the FAQ with evenings on top. Aligned.
- **"Build your agent this week" vs "five to fifteen working days"** in the FAQ. Timeline removed from the CTA.
- **`faq` heading dropped the primary keyword out of the `<h2>`.** The renderer puts `titleGradient` in a `<p>`, so following the refiner prompt's "title starts the phrase, titleGradient continues it" pushed the keyword out of the heading. Re-split so the `<h2>` carries it. **This is a defect in `ai/prompts/copy-refiner.md`, not in the copy** — the rule needs to say the keyword stays inside whichever field renders as the heading.
- **`pain-points` row 4 lost its only promise** — v1's "the same book-in-under-a-minute treatment" became "the same reply". Restored. This is the exact failure the refiner prompt warns about, so the prompt's promise clause is not strong enough to survive its own length limits.

### Not fixed — reported

- **`.results-stats__description` and `.how-it-works__label` fail WCAG 1.4.3**: `#8B8B8B` on white = 3.41:1 against a 4.5:1 requirement at these sizes. It is a shared token, so this is site-wide and belongs in a foundation change, not a page fix. On this page it is the text carrying the source attributions for the 21x and 40% claims.
- **`.faq__search-input` has no focus indicator** (computed `outline: 0px none`, no box-shadow). WCAG 2.4.7.
- **`.c-btn:focus-visible` ring is ~1.19:1 against the white page** — visible on dark fills, weak elsewhere. WCAG 1.4.11.
- **`recovery-calculator__number` affixes detach**: `field-sizing: content` is declared but a fixed `width: 3.6em` wins, leaving a ~37px gap inside "$ 180" and "30 %".
- **"Talk to Sales" opens a modal titled "Request a Demo"** — the TZ mandates the label, not the destination. A content-owner call.
- **`conversation-replay.turns[0]` is stage direction inside a customer bubble** ("Missed call from a mobile number. Both crews left at seven…"). No customer says that, and the sr-only speaker label announces it as the customer.
- Minor copy tails: `industry-expertise` item descriptions run 170–188 chars against the ~120 limit; the response-time promise appears in four different units; a few v1 details were dropped that other sections still depend on (square footage).

**The page has not yet been re-reviewed after these fixes, so the reviewer gate is not green.** A second pass is the next step before this is called done.
