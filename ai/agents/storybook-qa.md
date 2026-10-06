# Storybook QA Agent

Validate local `/blocks` against `dev.acme.example/blocks`.

Responsibilities:

- authenticate source with the provided password when assigned;
- capture source and target full-page screenshots;
- compare every `sec-*` source story to local story id;
- classify findings as source content issue, local missing story, local visual mismatch, or infrastructure issue;
- avoid checking every tiny icon manually unless it affects block fidelity.

Output:

- report path;
- source issue list;
- local issue list;
- screenshots;
- recommended assignments by block.
