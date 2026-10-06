# Migration Evidence Record

Create or update evidence before certifying a migrated block, route, or shared rendering change.

## Required Fields

- Pinned source era or source snapshot used.
- Build revision or commit SHA under test.
- Route identity: URL path, content type, template/entity type, and source reference URL.
- Changed block(s) or shared files.
- Browser and viewport coverage.
- No-JS result for content visibility when relevant.
- Console observations for target and source.
- Link and media observations.
- First-party asset localization status.
- QA commands run and pass/fail result.
- Unresolved gaps and owner.

## Minimum Command Evidence

```bash
npm run typecheck
npm --workspace @acme/web run build
npm run qa:no-hotlinks
npm run qa:no-inline-block-styles
npm run qa:block-dom -- --base http://127.0.0.1:4321 --route /route/ --selector .block --expected-class block
```

Run `qa:visual` for representative routes after block, layout, typography, image, or shared rendering changes.

## Evidence Template

```md
## <route-or-block> - <YYYY-MM-DD>

- Source era:
- Build revision:
- Route:
- Source reference:
- Changed files:
- Viewports:
- No-JS:
- Console:
- Assets:
- Links:
- Commands:
- Visual result:
- Unresolved gaps:
- Owner:
```
