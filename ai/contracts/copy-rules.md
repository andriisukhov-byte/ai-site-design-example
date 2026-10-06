# Copy Rules

**Source:** `acme-lp-shared-rules` skill, marketing team, **v5.0** (strategy 2026-06-24, corrections through 2026-07-01).
**Synced into this repo:** 2026-08-18. Ported verbatim except where a line is tagged `[project]`.

This file is the single source of truth for every rule about *words* on this site. Nothing else in the repo may restate a copy rule — `ai/prompts/copy-refiner.md`, `ai/instructions/page-compose.md`, and the `create-page` / `create-block` skills all point here instead of carrying their own copy.

## Who this binds

- **Marketing-authored copy is authoritative.** When text arrives from the marketing LP skills, it was already written against this file. The page pipeline transports it, it does not rewrite it. See `ai/contracts/lp-handoff.md`.
- **This file is the checklist for text the system writes itself** — a new block's demo content, showcase fixtures, and the mechanical fields a block requires that the LP document has no slot for.
- **The gate `npm run qa:copy` enforces the mechanically checkable half.** It reports; it never edits.

## Sync discipline

Marketing maintains the rules in their skill; this is a copy. Their own skills already drifted this way — the reference files bundled inside `lp-creator-*` are stale forks of this same document. So:

- The version line at the top of this file is load-bearing. When marketing ships a new version, update the whole file and bump the line.
- Do not fork this file, do not summarize it into another file, do not paraphrase a rule from it somewhere else.
- `[project]` tags mark decisions taken on this side that are not in the marketing source. Every one of them is listed in `## Project decisions` at the bottom so a re-sync can re-apply them.

---

## No-code

Always: **no-code** or **build no-code AI agents**. Confirmed 2026-06-24 as the approved phrasing across all Acme marketing copy. The earlier "no/low code" requirement is retired - do not hedge with it.

---

## Platform framing

Acme is a platform. The user builds the agent. The agent does the work. Never write "Acme does X."

| Avoid | Use instead |
|---------|--------------|
| "Acme contacts every applicant within seconds" | "Build a recruiting agent that contacts every applicant within seconds" |
| "Acme's agent screens for role fit" | "Your agent screens for role fit - without manager involvement" |
| "Acme handles inbound calls" | "Your agent answers every inbound call, qualifies the lead, and books the appointment" |
| "Acme does X" | "Build an agent that does X" / "Your agent does X" |

This framing gets blurriest on platform pages, where the page is literally about the platform - still say "build an agent that..." rather than "Acme provides..." whenever describing a customer-facing conversation or workflow.

`[project]` **Category comparison is exempt.** A heading whose object is a competitor *category* rather than a customer conversation - "What Acme Does That Standard Answering Services Don't" - is comparing vendors, which is what the rule was never about. The exemption is narrow: the subject is Acme, the object is a named category or competitor, and the sentence makes no claim about what happens inside a customer's conversation. Decided 2026-08-19 in place of a per-page waiver, because "the brief overrides the rule" is a far broader precedent than either side wants.

`[project]` The live content snapshot has 62 sentences in the banned shape ("Acme picks up every inbound call or SMS the moment it arrives"). The rule binds new and edited pages. A retrofit of the existing 361 documents is a separate, explicitly scoped task - do not start one as a side effect of shipping a page.

---

## Banned vocabulary

**Outright.** delve, tapestry, realm, landscape (figurative), navigate (figurative), testament, underscore, pivotal, paramount, foster, elevate, harness, leverage, unlock, unleash, empower, revolutionize, transform (as a vendor claim), supercharge, turbocharge, seamless, seamlessly, robust, cutting-edge, next-generation, best-in-class, world-class, state-of-the-art, game-changing, holistic, synergy, ecosystem (unless literal), journey (figurative), frictionless, effortless, myriad, plethora, meticulous, commendable, unwavering, resonate, showcase, embark, dive in, valuable insights, actionable insights, in the ever-evolving.

**Allowed only inside a customer quote.** streamline, intuitive, powerful, comprehensive, innovative, scalable, solution (as a name for the product).

**Allowed only with a concrete object.** optimize, automate, integrate, orchestrate, unify. "Optimize the intake script" passes. "Optimize your operations" does not.

**Adverb intensifiers come out.** truly, simply, effortlessly, instantly (unless literal), significantly without a figure.

`[project]` Same retrofit boundary as platform framing. The snapshot currently carries seamless x211, journey x81, showcase x41, effortless x36, unlock x32, ecosystem x30, leverage x29, empower x25.

---

## Em dash rule

Never use an em dash. Use " - " (hyphen with spaces) instead.

`[project]` 960 em dashes exist in the live snapshot. New and edited pages only, same as above. Note this rule applies to copy, not to code, file paths, or these instruction documents.

---

## Heading hierarchy rule

Headings follow semantic order: H1 → H2 → H3. Never place a lower-level heading above a higher one. Within a section, subheadings sit exactly one level below the section heading - no skipping levels. One H1 per page.

`[project]` On this site the H1 is decided by the renderer, not by the copy. In `hero` and `hero-extended`, when `eyebrow` is set the *eyebrow* becomes the `<h1>` and the title drops to `<p>`. That is deliberate and it is what makes the marketing skills' "layer 1 - focus keyword as a small H1" work natively. Whichever field actually renders as the H1 is the one that must carry the focus keyword. Always verify against rendered HTML, never against the JSON.

---

## No repetition rule

Never say the same thing twice - not across sections, and especially not within the same section. This applies to synonyms too, not just identical phrasing. If the title says "Build AI agents," the subtitle cannot say "Create AI agents." Each element must add something the previous one didn't. Before writing any description or subheading, check whether it restates the heading above it.

---

## Humanized writing rule

Content must read like it was written by an experienced marketer who knows this industry, not generated by AI. A word blacklist alone does not achieve this - copy fails on substance, rhythm, and stance long before it fails on vocabulary. All five blocks apply.

### 1. Substance

- Every section carries at least one thing a competitor could not publish - a proprietary number, a named tool, an operational detail, a dated benchmark, an admitted constraint, or a mechanism explanation
- Every claim is quantified and scoped where data allows; a bare qualitative benefit is the floor, not the target
- Every section names at least one real entity - tool, role title, dollar figure, time window, or workflow step
- Concrete nouns replace category nouns: "your dispatcher" not "your team", "missed calls after 5pm" not "communication gaps"
- Vocabulary comes from voice-of-customer material where it exists (call recordings, chat transcripts, reviews, forum threads); when it doesn't, say so in the brief rather than inventing the audience's language
- Interchangeability test: cover the Acme name. Any section that could sit on a competitor's page unchanged gets rewritten, not softened.

### 2. Rhythm

- No three consecutive sentences within ±3 words of each other
- In any block over four sentences, average 14-18 words with at least one under 8 and one over 25
- One fragment or sub-6-word sentence per long block, used once and not as a tic
- Paragraph length varies - never three consecutive paragraphs with the same sentence count
- No two consecutive sentences open with the same word or the same grammatical shape
- Bullet sets break parallel construction in at least one item
- Card sets vary internally - uniform length and shape across a 6-card grid is the most common tell in LP copy

### 3. Banned constructions

- Participial tail clauses - "..., ensuring that", "..., allowing you to", "..., making it easier to", "..., helping teams", "..., enabling", "..., driving", "..., resulting in". The most reliable AI fingerprint in this format. Split into a second sentence or cut.
- Scene-setting openers - "In today's", "As businesses increasingly", "In an era where", "Whether you're X or Y", "Picture this"
- Summary closers - "In short", "Ultimately", "At the end of the day", "The bottom line is", "When it comes to"
- Antithesis frames - "It's not just X, it's Y", "X isn't about Y, it's about Z"
- Symmetrical bicolons - "Built for X, trusted by Y"
- Hedged authority - "can help", "may allow", "is designed to", "works to". Commit or cut.
- Nominalizations - "provides automation of" becomes "automates". Active voice in 90%+ of sentences.
- Abstract title-case headings - "Operational Excellence", "Intelligent Automation"
- Transition openers - "Moreover", "Furthermore", "Additionally", "It's worth noting that"

Capped at one instance per page: triadic lists ("faster, smarter, more reliable"), range constructions ("from X to Y"), negative parallelism ("No more X. No more Y.").

### 4. Banned vocabulary

See the Banned vocabulary section above.

### 5. Stance

- Hold one defensible position a competitor would not publish - why the standard approach fails, what the category gets wrong, or a tradeoff accepted deliberately
- Admit one limit - who this is not for, or what it does not do. "If you take fewer than 40 calls a month, your voicemail is fine." Nearly no AI-generated page does this, and it buys more trust than an extra testimonial.
- Every sentence passes the read-aloud test - you could say it to a customer on the phone without sounding like a brochure
- Every adjective has a number behind it or comes out
- No reader flattery - "You already know that", "As a savvy operator"

**Do not write to beat AI detection tools.** Their accuracy claims come from the vendors selling them, and the standard evasion tactics - synonym swapping, deliberate typos, randomized sentence length - make copy worse. The interchangeability and read-aloud tests are the ones that matter.

---

## Clarity rules (ASD-STE100, rules only)

`[project]` These come from the project side, not the marketing source. They were added after the 2026-08-13 review, where naming ASD-STE100 (Simplified Technical English) in the writing prompt turned out to be the fastest way to kill generated slop: the standard's name points the model at a whole register it already holds.

Take the **rules section only**. Do NOT apply the approved-vocabulary dictionary - that is aerospace maintenance vocabulary and it is wrong for a marketing page. If the copy starts to read like a procedure, the standard has been over-applied.

1. **One term per concept, across the whole page.** Pick "agent", "call", "booking" once and never vary them for elegance. A synonym introduced for rhythm is a defect. *Exception, from the marketing source:* the "AI employee → autonomous agent" bridge is allowed exactly once per page, in the form given under Terminology.
2. **Maximum 20 words per sentence. One idea per sentence.** `[project]` This collides with the Rhythm rule above, which requires one sentence over 25 words in any block of five or more. Precedence: the 20-word ceiling binds **short-form copy** - headings, hero lines, card one-liners, step descriptions, CTA notes. In **prose blocks** - FAQ answers, section subtitles, long card descriptions - Rhythm wins: aim for 20, accept up to 25, and allow the one deliberate longer sentence the rhythm rule asks for. `qa:copy` flags above 25 words, and above 30 inside a FAQ answer.
3. **Active voice.** A named actor performs the action: the agent answers, the customer books, you connect the calendar.
4. **Present tense.** Not "will transform", not "can help you to".
5. **Maximum three nouns in a row.** "AI-powered customer engagement automation platform" is a four-noun stack. Rewrite as a verb phrase: "agents that answer your calls".
6. **No -ing forms where a finite verb works.** "Booking jobs automatically" becomes "books jobs automatically".
7. **Maximum 3 sentences per paragraph.**
8. **Do not drop articles or words to fit a line.** Cut the idea instead.
9. **Repeat the noun** wherever a pronoun would be ambiguous.

**What clarity does not authorize removing: the promise.** Every section keeps exactly one persuasive move - a named outcome, the stated cost of doing nothing, or a concrete before/after. Clarity is the constraint, not the goal. A page that is perfectly clear and sells nothing has failed.

---

## POV, casing, and numerals

- Second person for the reader throughout. First-person plural only in brand or testimonial voice. Never third-person description of the reader ("businesses like yours often struggle").
- Sentence case for all headings. `[project]` **The shipped site is Title Case throughout** - every heading on every page, not one page's choice. The rule and the site contradict each other, and one page is the wrong place to resolve it. Until marketing confirms which way to go, match the surrounding site (Title Case) and do not rewrite a page's headings for this rule alone. `qa:copy` does not check casing for the same reason.
- Numerals for all figures, including under ten.
- No emoji in body copy.

---

## Copy length

The single length table for the whole system. `[project]` It replaces the numbers that used to live in `ai/prompts/copy-refiner.md`; those were set by estimate and conflicted with these.

| Element | Limit |
|---|---|
| Titles and headings (hero title, section headings, card headlines, CTA headings) | 6 words ideal, **8-9 words is the ceiling**. Do not flag a headline until it passes 9-10 words. Category-leading SaaS headlines (Voiceflow, Botpress, Intercom) all sit at 8-9, none at 5-6 |
| Descriptions and subheadings | 1 sentence, ideally 12-15 words, **20 maximum**. 2 sentences only when one genuinely cannot carry the meaning |
| Card description | 1-2 sentences, **20-35 words** |
| Card headline | 2-4 word category label, not an outcome sentence |
| Category definition block (platform pages) | 40-70 words, quotable standalone |
| FAQ answer | 40-60 words, direct answer first |
| Meta title | under 60 characters |
| Meta description | 150-160 characters |
| ALT text | under 125 characters |
| Body copy, vertical/segment page | 900-1,400 words, 1,800 ceiling |
| Body copy, platform/category page | 1,200-1,800 words, 2,200 ceiling |
| Body paragraph | max 3 sentences |

**2-row wrap check.** A headline must still read as a headline, which means wrapping to at most 2 lines at standard desktop width. Word count cannot predict this - a few long words wrap sooner than several short ones - so it is a render check. Flag any headline in doubt as `[CHECK WRAP: verify this headline doesn't exceed 2 lines at desktop width]` and clear the flag against the rendered page.

**Hero fold.** The hero title and its description must both clear the mobile fold - roughly 40 characters per line on a phone. Vertical traffic skews mobile, so this usually binds tighter than the desktop wrap check.

`[project]` **The 1,800 ceiling collides with project decision 4, not with the item counts.** Taking the bottom of every range - FAQ answers at 40 words, cards at 20, subtitles at 12 - a full 15-section arc lands near 1,700 words and fits. What pushes it over is the block-floor rule: `functional-capabilities` cards need the top of the 20-35 range or they render half empty, and `industry-expertise` items need 170-188 characters. Measured on a real page, that is **2,150-2,250 words**.

Provisional resolution, to be taken to marketing at the next sync: a page carrying the **full 15-section arc** has a ceiling of **2,300 words**; the 900-1,400 target and the 1,800 ceiling stand for everything shorter. A provisional number is deliberate - "advisory" gives a page nothing to fail against, and the first long page then becomes the precedent for every long page. A page that runs long *because a claim is repeated across five sections* is still a defect, and the No repetition rule is what to check before blaming the ceiling.

`[project]` **Blocks impose their own floors, and a floor beats an ideal.** `functional-capabilities` cards are `min-height: 341px`, so a 20-word description leaves them visibly half empty; use the top of the 20-35 word range there. `industry-expertise` item descriptions need 170-188 characters or the mechanism disappears. When a block's floor and this table disagree, the page does not get shorter copy - it gets a different block, or the conflict goes back to the copy author as a fit-report. Never pad and never truncate silently.

---

## Terminology

Terminology follows the audience, not a blanket rule.

| Context | Use |
|---------|-----|
| Vertical/segment pages, ads, onboarding email, nurture copy (business-operator audience) | **"AI employees"** (primary). "Virtual AI employees" and "digital employees" are acceptable variants |
| Canvas UI labels, `/pricing` node names, developer docs, platform/technology pages (technical audience) | "autonomous agents" / "autonomous AI agents" / "agentic AI" |
| Channel-specific platform terms that split traffic (AI Voice Agent, AI SMS Agent, WhatsApp AI Agent) | Lead the hero business-generic, bridge to the technical framing by the platform-architecture section |

"Virtual employees" alone is ambiguous - it reads as outsourced human workers. Always pair with "AI".

The bridge, when used, looks like this and appears once:

> "Your AI employee - technically an autonomous agent - handles the full intake flow without manager involvement."

Never use both terms interchangeably in the same paragraph without that bridge.

---

## Product facts (locked)

### Architecture, v5.0 three pillars

1. **Conversational AI Agents** - the dialogue layer ("if you want them to talk")
2. **Autonomous AI Agents** - background execution ("if you want them to act"); the 2,700+ integrations are a capability of this pillar
3. **Cognitive AI Agents** - the differentiator: native combination of talking and acting on one canvas ("if you want them to talk and act")

All three combine on one workflow canvas. "Agentic AI" is a secondary, rising positioning term used alongside "AI Agent Platform" - it is not a fourth pillar.

### Integration count

| Use | Where |
|-----|-------|
| **2,700+** | All marketing copy: bullets, plan cards, ad callouts, comparison tables, About page |
| **600+** | Node-level pricing description only (Integration Action node via Pipedream/Composio) |

If both appear in one document, make the scope explicit: "2,700+ integrations across all connection paths - including 600+ through the Integration Action node with AI-assisted parameter filling."

### Pricing

Tier names are locked. **Pay-as-you-go** and **Enterprise**. Not "Launch", "Starter", "Free", or "Basic".

Approved LP-facing hooks, verbatim:
- "Get started free - no card required."
- "Pay only for what you use."
- "No subscription. No contracts." (the live pricing card ships "No subscription. No monthly fee." - `[project]` also approved, project decision 10)
- "Credits never expire."
- Trust strip: "Free Plan - No Card Required."
- Final CTA subline: "No credit card required. Free plan available. Production deployment activates from the first top-up."
- Comparison table starting price for Acme: **"Free"**

Show on a page: tier name + 1-2 sentence description, key differentiators per tier, "Free" / "Custom" price signal, one CTA per tier, and the signup credit total as factual detail inside the pricing section.

Do not show: per-credit math, conversion footnotes, the buy-credits pack table, node-level pricing, or any credit pack amount as a headline, hero line, or CTA. Cold traffic does not know what a credit buys, so the number informs rather than persuades. What persuades: free to start, no card required, pay only for what you use, no subscription.

"No subscription" is an approved v5.0 differentiator (confirmed 2026-07-01). Pair it with "pay only for what you use", since customers do have an account relationship even without a recurring fee.

### Certifications

Do not mention SOC, HIPAA, GDPR, ISO, or any other certification or compliance framework. Acme does not hold these. Write persuasively around security *principles* instead: data handling, infrastructure reliability, access control, TCPA-aware messaging design, and the operator's ability to audit conversations.

---

## Stats

Each stat appears **exactly once** per page. The section that first uses it owns it.

**Default social-proof stats, safe on any page:**
- 700+ agents built
- 2,300+ workflows automated
- 3.2M+ conversations handled
- 8 channels supported

**Restricted.** "92% first-attempt success rate vs. 64.5% for tool-augmented solutions" (Acme Comparative Study, Feb 2026, 172 test scenarios). It is derived from a chatbot comparison study. Use it ONLY when the page explicitly frames Acme against scripted chatbots or rule-based tools. In general social proof, platform overviews, results sections, ads, and differentiation lists: omit it entirely, even though it looks like a strong number.

**Not restricted the same way:** "97.3% first-attempt success rate for recruiting scenarios" (74 scenarios, April 2026) - safe on recruiting-angle content.

Pain-point sections own problem-severity stats. Results sections own outcome stats. Sourced vertical pain data lives in `ai/contracts/copy-data.md`.

**Format rule for results:** the number comes first, the explanation follows.
- Right - "27% fewer missed calls in the first 30 days"
- Wrong - "Contractors using the agent report missing 27% fewer calls"

---

## Source quality and claim safety

**Sourcing.** Every stat carries publication name, year, and URL. Nothing older than 3 years. Prefer primary research, industry associations, and analyst reports - a competitor's blog post is not a source.

**Claims.** No unverifiable superlatives ("#1", "the leading", "the best"). No guarantees or ROI promises without a named case study behind them. Client names, logos, and quotes appear only when approved.

**When data is missing.** Mark it `[INPUT NEEDED: x]` or skip the section and note the reason in the brief. Never fill a gap with a plausible-sounding figure.

`[project]` **The marker never renders.** `[INPUT NEEDED: …]` is an authoring artifact for the review loop; it lives in the batch, not in the page. A stat whose URL is missing ships with publication and year - which is all an inline attribution ever claimed - and the missing URL goes in the batch review. Shipping the marker publishes the seam, and no gate catches it.

`[project]` The block library has no citation block. **A closing `rich-text` block only earns its place once the citations carry URLs.** Tried on a real page and reverted: with publication and year only, every line in it already appeared inline beside its figure, so the block restated four strings the reader had just met and put an `<h2>` "Sources" in the outline beside "Pricing". Until `copy-data.md` holds URLs, inline attribution is the whole citation and the missing URLs are recorded in the batch review. This narrows project decision 6, which collided with decision 14.

---

## CTA conventions

| Position | Label |
|----------|-------|
| Hero, primary | "Get Started Free" |
| Hero, secondary | "Request Demo" or "Book a Demo", with the descriptor "30-min consultation" |
| After pain points or core capabilities | "Start Building Your Agent" |
| Mid-page block | "Get Started Free" or "Start Building Your Agent" |
| After the platform section | "See It In Action" |
| After comparison | "Talk to Sales" |

No CTA after the FAQ. Blog, testimonials, and FAQ serve visitors who are still researching, and conversion pressure there works against the page. Never use "Learn More" as a CTA label.

`[project]` **"Book a Demo" is approved alongside "Request Demo".** The marketing source table lists only "Request Demo", but the TASK 1 brief for `/ai-receptionist-for-cleaning-companies/` states "CTAs (approved only): Book a Demo" and the live page has shipped with that label. Decided 2026-08-19: both labels are approved for the hero secondary and the demo path, and the choice per page follows the page brief. Re-confirm the wording with marketing at the next rules sync.

`[project]` **How this squares with one primary CTA path.** The old project rule - every primary CTA uses the same verb and the same destination - conflicted with these labels and with "Talk to Sales". Resolved as: labels and destinations are content, so the marketing table wins.

- **One self-serve destination per page.** Every self-serve CTA resolves to the same address, whatever its label ("Get Started Free", "Start Building Your Agent").
- **One sales destination per page.** "Request Demo" / "Book a Demo", "See It In Action" and "Talk to Sales" all resolve to the demo or contact route. `[project]` "See It In Action" belongs on the sales path, not the self-serve one - the label means *show me*, and every shipped page treats it that way. An earlier draft of this rule listed it as self-serve; that was an error.
- **Count.** The table above defines six CTA positions, and the pricing section separately requires one CTA per tier. A page built to the full framework therefore carries **7-9 CTAs across two destinations**, which is correct and is not the same thing as nine competing offers. `ai/instructions/page-compose.md` holds the placement rule; its old "never more than 5" ceiling predates this framework and has been replaced by a per-destination rule.
- An interactive control - replay button, calculator slider, carousel arrow, anchor link - is not a CTA, does not count, and must not be styled as a primary button.

---

## Anchor text

Descriptive anchor text on every internal link - cluster cross-links, segment links, and pricing links included. Never "click here", "learn more", or a bare URL.

---

## ALT text

- Describe what the image actually shows, in natural language - a sentence a person would write
- Work the focus keyword or one secondary keyword into that description where it fits. Never prefix it for indexing weight
- No two ALTs on a page repeat. The focus keyword appears in 2-3 at most; the rest carry secondary or long-tail terms
- Under 125 characters
- Never "image of", "photo of", or "screenshot of"

Front-loading the same keyword across every ALT produces near-identical strings that read as keyword lists, which Google names as keyword stuffing under its spam policy.

Examples, focus keyword "AI agent for HVAC":
- Wrong - `AI Agent for HVAC Acme - Agent Canvas Workflow`
- Right - `HVAC owner reviewing an AI agent for HVAC handling an after-hours no-heat call`
- Right - `ServiceTitan, Jobber, and Housecall Pro connected to a Acme HVAC agent`

---

## Security & Compliance boilerplate

Reusable body for the security section. Adapt the opening sentence to the page's audience - a named vertical for segment pages (openers by vertical are in `ai/contracts/copy-data.md`), audience-neutral for platform pages. No certification claims.

**Data Protection**
All conversations, recordings, transcripts, and customer records are encrypted in transit and at rest. Configurable data retention windows let you align storage practices with your own policies and your customers' expectations.

**Secure System Integration**
Role-based access controls govern every connection to your dispatch software, CRM, scheduling tools, and payment processors. Every read and write the agent performs mid-conversation runs over encrypted channels - no data in plain text, no uncontrolled API exposure.

**Privacy Assurance**
Your customer data stays yours. Conversations, call recordings, and CRM records are never used to train public AI models. Customers using their own LLM API keys keep all AI calls inside their own provider relationship.

**Audit & Monitoring**
Full activity logs for every call, message, booking, and system write. Time-stamped records support internal compliance reviews, customer dispute resolution, and consent-to-record obligations for outbound messaging.

---

## Renderer traps that change wording

`[project]` These are not style rules. They are places where this site's renderers change what the reader sees, so copy has to be written around them.

- **`{{word}}`** marks 1-3 gradient-highlighted words in a title-like field. Never a whole phrase, never a runtime value. **`||`** is a deliberate line break. No HTML in titles.
- **`hero` / `hero-extended`**: if `eyebrow` is set, the eyebrow renders as the `<h1>` and the title drops to `<p>`. Put the focus keyword in whichever field actually renders as the H1.
- **`faq.title` and `faq.titleGradient`** render as two separate lines: write `title` as the start of the phrase and `titleGradient` as its continuation. A `{{...}}` marker inside `faq.title` renders the word twice. Same for `security`.
- **`logo-grid`** drops items that carry only a `label` - give each item a `subLabel` or a `url`.
- **`channels-grid`** falls back to recruiting mockups when a card has no image.
- The brand gradient dies on dark backgrounds (its mid-stop is `#200000`) - override `.ca-gradient-text` to solid amber there.

---

## Project decisions

Every `[project]` deviation, in one place, so a re-sync from marketing can re-apply them.

| # | Decision | Where it applies |
|---|---|---|
| 1 | CTA labels and destinations are content and follow the marketing table. One self-serve path plus at most one sales path per page. Count and placement stay with `page-compose.md` | CTA conventions |
| 2 | Em dash, platform framing, and banned vocabulary bind new and edited pages. The 361-document legacy retrofit is a separate task | Em dash, Platform framing, Banned vocabulary |
| 3 | The copy length table here is the only one in the repo. The estimated limits previously in `copy-refiner.md` are retired | Copy length |
| 4 | A block's layout floor beats a copy ideal. Conflicts become a fit-report to the copy author, never a silent rewrite | Copy length |
| 5 | ASD-STE100 rules-only added as the Clarity section, with the "AI employee" bridge carved out of rule 1 | Clarity rules |
| 6 | Narrowed 2026-08-19: a closing `rich-text` sources block only when the citations carry URLs. With publication and year only it restates the inline attributions, so those live in the batch review instead | Source quality |
| 7 | Renderer traps documented here because they change wording, not layout | Renderer traps |
| 8 | "Book a Demo" approved alongside "Request Demo" for the demo path, per the TASK 1 brief and the shipped page. Needs re-confirming at the next rules sync | CTA conventions |
| 9 | Sentence-length precedence: the 20-word clarity ceiling binds short-form copy, Rhythm wins in prose blocks. Surfaced on 2026-08-19 when the two rules contradicted each other on a real page | Clarity rules |
| 10 | "No subscription. No monthly fee." approved verbatim alongside "No subscription. No contracts." - it is the wording the live pricing card ships, and `qa:copy` exempts it from sentence-level checks | Pricing |
| 11 | Sentence case: the shipped site is Title Case throughout, so the rule is suspended pending marketing's decision rather than applied to one page | POV, casing and numerals |
| 12 | The 1,800 ceiling collides with the block-floor rule, not with the item counts. Full 15-section arc gets a provisional 2,300-word ceiling; everything shorter keeps 1,800 | Copy length |
| 13 | Category-comparison headings are exempt from platform framing. Narrow rule change, taken instead of a per-page waiver | Platform framing |
| 14 | An `[INPUT NEEDED]` marker is an authoring artifact for the batch, never rendered copy. A stat with no URL ships with publication and year, and the missing URL is recorded in the batch review | Source quality |
