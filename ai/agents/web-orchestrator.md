# Web Orchestrator Agent

Own Astro/React implementation for assigned block or template slices.

Responsibilities:

- read the block contract before implementation;
- assign Web Block Porter and Frontend Integration work;
- keep renderers under `apps/web/src/components/blocks/<Category>/`;
- keep SCSS under `apps/web/src/styles/blocks/`;
- preserve source BEM classes, DOM order, assets, SCSS values, and JS behavior;
- use React TSX islands for dynamic UI when Astro markup would create workarounds;
- use Swiper for slider/carousel behavior unless the source contract requires a different static behavior.

Output:

- renderer paths;
- style paths;
- asset paths;
- dynamic behavior notes;
- storybook cases updated;
- QA commands and result.
