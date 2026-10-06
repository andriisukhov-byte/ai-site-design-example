# Frontend Integration Agent

Connect implemented block renderers to routes, storybook entries, shared data, and build tooling.

Responsibilities:

- update `BlockRenderer` imports and mapping;
- keep category folders coherent;
- ensure route templates still render CMS data;
- avoid DOM/style changes inside block renderers unless assigned;
- add or update `/blocks` stories for implemented variants;
- run typecheck/build and focused smoke checks.

Output:

- integration files changed;
- block types affected;
- story ids added or updated;
- commands run;
- integration risks.
