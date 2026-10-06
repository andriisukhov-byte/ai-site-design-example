# Lead Qualification Agent

- Canonical route: `/lead-qualification-agent/`
- Content type: `use-case`
- Collection and template: `use-cases` / `use-case`
- Audience and problem: marketing and sales-ops owners of inbound demand. Inbound leads arrive on many channels and wait in a queue until a human triages them, so speed-to-lead collapses, reps spend selling hours sorting unqualified traffic, and not-ready leads go dark.
- Primary outcome: every inbound lead is qualified in conversation the moment it arrives, scored for fit, routed to the owning rep while intent is live, and nurtured if it is not ready - all written back to the CRM.
- Approved proof: none required by the brief. No statistics, customer names, or testimonials are claimed on this page; the impact section is written as defensible before/after statements without invented metrics.
- Required topics: channel coverage; conversational qualification and scoring; routing to reps with summary and transcript; nurture for not-ready leads; CRM sync; setup journey in days.
- Primary CTA: Get Started Free (`/signup`). Source label "Get Start For Free" is corrected to "Get Started Free".
- Secondary CTA: none (brief specifies a single CTA).
- SEO:
  - meta title: `Lead Qualification Agent | Acme`
  - meta description: `A lead qualification agent that scores fit the instant a lead arrives, routes hot ones to the right rep, and nurtures the rest - synced to your CRM.`
  - canonical: `https://acme.example/lead-qualification-agent/`
  - primary keyword "lead qualification agent" appears in H1, meta title, meta description, first sentence, and URL.
- Navigation: `none` (the brief does not request a menu link).
- Publication decision: `draft`. No named content owner has approved publication.

## Section plan and block mapping

| # | Brief section | Block | Notes |
|---|---|---|---|
| 1 | Hero | `hero` | eyebrow "Sales Use Cases", H1 exact keyword, one-sentence subhead, single CTA |
| 2 | Core Automation Capabilities | `functional-capabilities` | 6 capability cards, `preset: sales` |
| 3 | Why Good Leads Never Reach a Rep | `feature-stack` | 3 pain cards, heading + explanation |
| 4 | How It Works | `industry-expertise` | 6 stages, interactive, `visualType: capabilities` |
| 5 | The Real Impact for Marketing Teams | `pain-points-comparison` | before/after with column headings, 5 rows |
| 6 | Step-by-Step Setup | `how-it-works` | Start/Build/Test/Launch, day-marked, homepage model |
| 7 | Closing CTA banner | `cta` | value restatement + single CTA |
| 8 | FAQ | `faq` | 4 questions |

Lean template confirmed: no `pricing-cards`, no competitor `difference`, no `security`, no `news-insights`.

## Interpretation decisions

1. **"6 icon chips" implemented as `functional-capabilities` cards.** The literal chip block is `capability-strip`, but its renderer ships only four named icons (`code-xml`, `layout-grid`, `bot-message-square`, `user-round-check`) and falls back to one generic shield glyph for anything else, so six chips would repeat the same icon twice. `functional-capabilities` carries ~30 icons, is the registry-endorsed block for "what this agent handles/automates", and keeps titles as short noun phrases. Design-system gap recorded below.
2. **Section 4 "swap to homepage model" implemented as `industry-expertise`.** The homepage's own `how-it-works` block is the Start/Build/Test/Launch day-marked journey, which the brief already assigns to section 6. Using it twice would duplicate the section. `industry-expertise` gives the 5-6 stage narration with heading plus one sentence, is interactive, and renders its own platform visual - satisfying "include a product visual" without inventing an asset.
3. **Meta description adjusted to carry the keyword.** The brief supplies meta copy that omits the primary keyword while also requiring the keyword in the meta description. Kept the brief's wording and structure, inserted the exact keyword phrase, and trimmed to 148 characters.
4. **No invented numbers in section 5.** The brief asks for five metric rows and says to keep numbers defensible. Since no approved measurement exists for this page, rows are written as directional before/after statements rather than fabricated percentages.

## Open items for the content owner

- `capability-strip` icon vocabulary is only four icons - a candidate for a `create-block` pass if the literal chip layout is wanted.
- Section 4 has no dedicated product screenshot; it currently uses the block's built-in platform visual.
