# Marketing LP skills - what we adapted and why

The marketing team writes landing page copy with four Claude skills:

| Skill | Role |
|---|---|
| `acme-lp-shared-rules` | Canonical copy rules, v5.0. Builds nothing on its own |
| `lp-creator-segments-acme` | Vertical + GTM function pages (AI Agent for HVAC). 19 sections |
| `lp-creator-platform-acme` | Category / technology-cluster pages (AI Receptionist, Agentic AI Platform). 18 sections |
| `lp-creator-acme` | Condensed general version of the segments skill |

They are good, and the rule set is more mature than anything this repo had. So the adaptation is deliberately small: **one add-on skill plus a short patch list**, not a fork. Forking 176 KB of rules is exactly how their own bundled reference files went stale.

## What lives here

- `acme-lp-handoff/` - the add-on skill. Loads alongside any `lp-creator-*` skill and adds only what those skills cannot know: the section-id format the build pipeline reads, which sections the site can actually render, and the guarantee that the build side never rewrites the copy. Zip the folder and upload it as a skill.
- `acme-lp-handoff/references/blocks-available.md` - generated from `packages/blocks/src/registry.ts` by `npm run ai:block-catalog`. Regenerate it whenever a block is added, or the marketing side will keep writing to a stale catalog.

## Patch list for the three `lp-creator-*` skills

Four edits each, no rewriting:

1. **Load the add-on.** In the frontmatter description, next to "Load the acme-lp-shared-rules skill alongside this one", add "and load acme-lp-handoff when the page will be built on the site".
2. **Section ids.** Change section headings from `### Section 4 - Pain Points` to `### S4 - Pain Points`, and use `## S4 - Pain Points` in the output document. Numbering is already stable in all three skills, so this is mechanical.
3. **Cannibalization step.** Replace "Check the content plan and the LP tracker" with "Run `npm run qa:keyword-collision` against the site - see the acme-lp-handoff skill". The tracker does not exist on the build side.
4. **Delete `references/acme-shared-rules.md`** from each bundle. It is a stale fork of the canonical rules skill, which is now strictly larger. Keep `acme-product-rules.md` and `acme-platform-rules.md` - those hold data, not rules.

Optional but recommended: in the "file saved" line of the verification checklist, replace the "Landing Pages subfolder" destination with `lp.md` in the page batch.

## What the build side changed to meet them halfway

- `ai/contracts/copy-rules.md` - the canonical rules, mirrored with a version line. The only copy rule set in the repo.
- `ai/contracts/copy-data.md` - the approved facts: vertical pain data with sources, integration stacks, channel order, budget anchors, cluster mapping, competitor set, category definitions.
- `ai/contracts/lp-handoff.md` - the transport contract: copy is an input, three modes for text, and the fit-report that replaces rewriting.
- `npm run qa:copy` - the mechanical half of the rules, run over a page batch. It reports, it never edits.
- `npm run qa:keyword-collision` - the real version of the tracker check.

## Sync

The rules live with marketing; this repo holds a mirror. When the rules change: marketing ships the new version, the mirror is updated wholesale, and the version line at the top of `ai/contracts/copy-rules.md` is bumped. Where mirror and source disagree, the source is right and the mirror is stale.
