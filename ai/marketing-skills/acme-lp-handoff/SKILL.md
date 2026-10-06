---
name: "acme-lp-handoff"
description: "Load alongside any lp-creator-* Acme skill when the landing page copy will actually be built on acme.example. Adds the three things the LP skills cannot know on their own: the section-id format the build pipeline reads, the list of sections the site can actually render, and the fact that the build side never rewrites your copy. Also replaces the 'check the content plan and LP tracker' step with the collision check that runs against the live site. Use it whenever the output is a page that ships, not a copy draft for review. Carries no copy rules of its own - acme-lp-shared-rules stays canonical."
---

# Acme LP Handoff

Your LP skill writes the copy. This skill makes that copy buildable without anyone re-typing or re-editing it.

**The contract, in one line: what you write is what ships.** The build pipeline transports your words into page sections byte for byte. It does not shorten them, re-voice them, fix your punctuation, or "refine" them. That is a hard rule on the build side, not a courtesy - see `ai/contracts/lp-handoff.md` in the site repository.

It is also checked, not promised: `npm run qa:copy-fidelity` compares every line of your `lp.md` against the built page and fails on any difference, down to a dropped comma. If a line of yours does not fit the section, you get a fit-report - the measured length, the section's real limit, and options including moving that content to a different section - and you decide. Nobody on the build side edits your sentence.

Three things follow from that, and they are the whole job of this skill.

---

## 1. Write section ids

The build pipeline reads your markdown by section id. Same sections as your LP skill already produces - just carry the id in the heading.

```markdown
## S1 - Hero
## S4 - Pain Points
## S19 - FAQ
```

The number is the contract; the words after it are for humans. Rename a section freely, renumber it never.

Inside a section, use flat `Key: value` lines and simple lists. No nesting, no tables, no JSON.

```markdown
## S1 - Hero

Focus keyword: AI receptionist for cleaning companies
Title: Every inbound call answered, every job booked
Description: Your agent picks up in 2 rings, qualifies the job, and books it into ZenMaid.
Primary CTA: Get Started Free -> /signup
Secondary CTA: Request Demo -> /request-demo
Primary note: No credit card required.
Secondary note: 30-min consultation
ALT: Cleaning company owner reviewing an AI receptionist handling a Saturday booking request
```

```markdown
## S3 - Business Benefits

Card 1 headline: Missed-Call Recovery
Card 1 description: Every call that rings out gets a text back inside 30 seconds, with the scope question already asked.
Card 2 headline: Instant Quoting
Card 2 description: Standard scopes get a flat price on the spot. Anything unusual routes to you with the photos attached.
```

Two ids the numbered list does not cover, if your page has them: `## Sources` and `## Category Definition`.

The finished file is named `lp.md` and it is the only artifact the build side needs. It replaces the "save into the Landing Pages subfolder" step in your LP skill.

---

## 2. Only ask for sections the site can render

`references/blocks-available.md` is the full list of section types the site can build, generated from the live registry. Read it before planning the page.

Two rules follow:

- **A section with no entry there cannot be rendered.** If your page needs one, describe the *role* it plays in the brief ("a citation list for the sourced stats") rather than describing the visual. The design side then either maps it to the closest existing section or grows a new one through its own approval track. Do not design around the gap yourself and do not assume it will be built.
- **Some sections carry hard shapes.** Card counts, card heights, and item ranges are in that file. A section that wants 7 cards where the block takes 6 is a rework; catching it while writing costs nothing.

Known shapes worth writing to, because they bite most often:

| Section | Shape |
|---|---|
| Hero | Focus keyword renders as the H1 and the visual title renders below it as plain text. That is exactly the three-layer hero your LP skill describes, so it works natively - and it means the keyword must sit in the keyword line, not in the title |
| Business benefits, `functional-capabilities` | Cards have a fixed height. A 12-word description leaves a visibly empty card, so use the top of the 20-35 word range |
| Pain points, `pain-points-comparison` | The block is two columns: problem, then what the agent does about it. If you write only problem + consequence + stat, say so - the section then maps to a plain card grid instead |
| Channels | Exactly five cards, and each one needs its own image or the block substitutes a stock mockup |
| Integrations, `logo-grid` | Each entry needs a tool name **and** either a category line or a URL. A bare name gets dropped |
| Security | Exactly four cards, matching the four-part boilerplate |
| FAQ | The heading renders as two lines: write the first half and the second half separately, and keep gradient markers out of the first half |
| Testimonials | Omitted until approved quotes exist. Do not write placeholders |

---

## 3. Run the collision check, do not check a tracker

Your LP skill's cannibalization step says to check the content plan and the LP tracker. Neither exists in the site repository, and "the tracker doesn't list it" has already been wrong. The site has better sources: a 361-document content snapshot, the live CMS, and the navigation menu.

Ask for this to be run before you draft:

```sh
npm run qa:keyword-collision -- --keyword "<focus keyword>" --path /<slug>/
```

It reports four things: the route is already taken, a synonym route exists, the keyword is already another page's H1, or the navigation already links to your route - which means the slot was planned for you and you should be filling it rather than making a new one.

A route that looks free in the CMS may still hold an unpublished draft. The check names that risk when it runs without an admin token.

---

## What this skill does not change

- **`acme-lp-shared-rules` stays canonical for every copy rule.** Vocabulary, the five humanized-writing blocks, lengths, stats, pricing, CTA labels, security boilerplate - all of it, unchanged. This skill carries no copy rules and must never restate one.
- Your intake questions, brief header, section order, ALT rules, and verification table stay as they are.
- The site repository holds a mirror of the shared rules at `ai/contracts/copy-rules.md`, with a version line. When you ship a new version of the rules, tell the site side so the mirror gets updated. The mirror is a copy for the build tools to check against - it is not a second opinion, and where the two disagree yours is right and the mirror is stale.

## Delete the stale copies

Each `lp-creator-*` skill bundles `references/acme-shared-rules.md`. Those files are older forks of `acme-lp-shared-rules` and the canonical skill is now strictly larger than all of them. They already caused three wrong rules to survive a version (the "no/low code" mandate, the ban on "No subscription", and the old architecture description). Delete them from the bundles and let the skills read the canonical skill only. The product-data references (`acme-product-rules.md`, `acme-platform-rules.md`) stay - they hold data, not rules.
