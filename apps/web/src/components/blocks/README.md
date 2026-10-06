# Block Renderer Folders

Block renderers are grouped by frontend purpose, not by source technology.

- `Heroes/`: top-of-page hero variants.
- `Grids/`: repeated card/logo/channel/use-case grids.
- `Proof/`: trust, capability, metric, contrast, security, and testimonial blocks.
- `Content/`: narrative, media, tabs, process, and article-style blocks.
- `Conversion/`: CTA, contact, pricing, enterprise, concierge, and launch reassurance blocks.
- `Navigation/`: FAQ, related content, anchor navigation, and compact navigation strips.

Rules:

- Keep source BEM classes and DOM contracts inside the renderer.
- Keep SCSS in `apps/web/src/styles/blocks/`.
- Keep block assets in `apps/web/public/assets/blocks/<block-name>/`.
- Do not add inline `<style>` blocks or inline `style=` attributes.
- Use React TSX islands for dynamic behavior when Astro-only markup would create a workaround.
- Update `packages/blocks/src/categories.ts` when a block is added or moved.
