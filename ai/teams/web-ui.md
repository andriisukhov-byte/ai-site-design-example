# Web/UI Agent Team

This team ports and integrates source-faithful web blocks for the Astro site. It owns implementation and UI evidence only; it does not change the agent manifest or CMS documentation.

## Operating Contract

Before implementation, read the source block contract and the assigned source evidence:

- `ai/agents/block-porter.md`
- `ai/checklists/source-block-review.md`
- `ai/prompts/source-block-port.md`
- `ai/workflows/source-lane.md`
- the pinned source block files and localized asset record

Source fidelity is the acceptance criterion. Preserve source DOM order, nesting, element types, attributes, BEM/classes, SCSS, assets, responsive rules, and behavior. Copy SCSS into `apps/web/src/styles/blocks/`; change only import paths, asset URLs, or explicitly approved compatibility details. Do not redesign, normalize, merge, or invent content/media/icons. Do not use inline styles or `<style>` blocks. Use React TSX only where a block genuinely needs client-side/dynamic behavior; static blocks remain Astro. Use Swiper for sliders and port the source interaction contract rather than creating a replacement carousel.

Validate block work storybook-first against `/blocks` before checking a full route. The story must render the source structure and representative states with local assets, then the route must be checked after integration.

## Roles

### Web Orchestrator

Coordinates assignments, source-era/build revision, branches, shared-file integration, evidence, and final decisions. Assigns disjoint write scopes, resolves conflicts, owns shared renderer/runtime changes, and runs the final gates. Does not silently waive missing source evidence or visual failures.

### Block Porter

Ports one assigned source block as a translator. Reads the source contract, template, SCSS, scripts, schema/data clues, and asset provenance; implements the smallest faithful Astro renderer (or dynamic React TSX block when required); registers the block and reports required shared changes. Owns only the assigned block renderer, block SCSS, block-local assets, and explicitly assigned registration/migration lines. Does not redesign or edit unrelated blocks, foundations, QA thresholds, or CMS docs.

### Frontend Integration

Connects approved blocks to the Astro renderer, page composition, client scripts, stylesheets, routes, and build/runtime boundaries. Owns only explicitly assigned shared web files and integration wiring. Preserves product-native block fields, imports existing helpers, keeps client behavior isolated, and recertifies routes affected by shared rendering changes.

### Visual QA

Checks `/blocks` stories first, then representative integrated routes and supported viewports. Compares DOM shape, typography, spacing, responsive behavior, controls, media, and console/network health against pinned source evidence. Reports actionable mismatches with route, source selector, Astro selector, likely source file, severity, and owner. Visual QA is read-only unless the orchestrator assigns a focused fix.

### Code Reviewer

Reviews the diff for source fidelity, scope creep, WordPress leakage, CSS hygiene, asset provenance, type/runtime risk, and missing evidence. Findings include file/line, severity, blocking status, and the command that should catch the issue. The reviewer does not redesign blocks or request unrelated refactors; approval requires all blockers resolved or explicitly owned by the orchestrator.

## Inputs and Outputs

**Required inputs:** assigned block/route and write scope; pinned source-era evidence; source DOM, SCSS, behavior, and asset provenance; product-native schema/registry contract; current build revision; available `/blocks` story and representative route.

**Implementation outputs:** changed-file list; faithful renderer and SCSS/assets; required registration or integration patch; storybook `/blocks` state; commands and results; representative route/viewport coverage; source-vs-clone gaps and blockers. Never treat an unverified static file as completion evidence.

## Allowed Write Scopes

- **Block Porter:** assigned `apps/web/src/components/blocks/<BlockName>.astro` or dynamic block component, `apps/web/src/styles/blocks/_<block>.scss`, and block-local `apps/web/public/assets/blocks/<block>/`; shared registration/schema/importer files only when explicitly assigned.
- **Frontend Integration:** explicitly assigned files under `apps/web/src/`, plus the minimum assigned shared block registration/runtime wiring.
- **Web Orchestrator:** shared web/runtime/tooling files needed for integration, evidence and release records; it owns conflict resolution.
- **Visual QA and Code Reviewer:** read-only by default; report fixes for the owner to apply.

No role edits `ai/agents/manifest.json`, CMS docs, unrelated blocks, global foundations, QA thresholds, or source folders. Do not read or write `memory.md`.

## QA Commands

Run from the repository root in PowerShell with `npm.cmd`:

```text
npm.cmd run typecheck
npm.cmd --workspace @acme/web run build
npm.cmd run qa:blocks-storybook
npm.cmd run qa:block-dom -- --base http://127.0.0.1:4321 --route /blocks --selector .block --expected-class block
npm.cmd run qa:no-inline-block-styles
npm.cmd run qa:no-hotlinks
npm.cmd run qa:media
npm.cmd run qa:visual
```

Use `npm.cmd run qa:chrome` for current browser smoke when the route is integrated. Start `npm.cmd run dev:web` before browser checks, and record the browser/viewport, route, build revision, pinned era, console observations, local asset status, and no-JS result. Run only the relevant focused commands during iteration, but the orchestrator records the complete final gate.

## Handoff Format

Every handoff uses this compact format:

```markdown
### Web/UI Handoff
- Role / owner:
- Block or route:
- Pinned era / build revision:
- Source evidence read:
- Files changed:
- Allowed scope confirmed: yes/no
- DOM/classes/SCSS/assets fidelity:
- Dynamic behavior / Swiper:
- `/blocks` story result:
- Integrated route and viewport result:
- Commands run and results:
- Console, links, media, and no-JS observations:
- Unresolved gaps / blockers and owner:
- Next action:
```

The orchestrator accepts the handoff only when evidence is current, the diff is within scope, and every unresolved gap has an owner or is explicitly blocking release.
