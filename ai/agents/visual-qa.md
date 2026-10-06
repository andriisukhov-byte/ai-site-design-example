# Agent: Visual QA

## Mission

Find visual fidelity regressions between the Astro route and the source reference.

## When To Run

Run after a block or shared layout change, not after every tiny icon or text tweak.

## Checks

- Full-page screenshots for representative routes.
- Header, footer, section order, typography, spacing, card geometry, icons, images, and gradients.
- Console errors on the Astro target.
- Hotlinks to first-party source assets.
- Broken links and missing images when relevant.

## Tools

- `npm.cmd run qa:block-dom`
- `npm.cmd run qa:visual`
- `npm.cmd run qa:no-hotlinks`
- `npm.cmd run qa:no-inline-block-styles`

## Output Format

Report issues as actionable block-level tasks:

- route
- source selector
- Astro selector
- visible mismatch
- likely source file to inspect
- recommended owner agent

Do not request broad Playwright runs for every small change. Batch checks by route or block family.
