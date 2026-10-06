import { pageBlockSchema } from '@acme/blocks';

export const functionalCapabilitiesWorkflowsFixture = pageBlockSchema.parse({
  type: 'functional-capabilities',
  preset: 'sales',
  eyebrow: 'WHAT ACME AUTOMATES',
  title: 'Some Processes Cannot {{ Afford to Be Interpreted }}',
  description: 'Deterministic automation runs on structured logic. Every branch, every action, every exception path is explicitly defined and executed exactly as configured. The result is predictable, auditable, and fully traceable — what compliance, finance, operations, and IT processes actually require.',
  cards: [
    {
      icon: 'filter',
      title: 'Explicit Branching',
      description: 'Every path through the workflow is defined before execution. There are no inferred decisions, no probabilistic outputs. If condition A is met, branch A runs. Every time.',
      width: 'default',
    },
    {
      icon: 'filter',
      title: 'Full Execution Traceability',
      description: 'Every workflow run produces a complete log — trigger received, conditions evaluated, branch taken, actions executed, systems updated, outcome recorded. Nothing happens off the record.',
      width: 'default',
    },
    {
      icon: 'shield-check',
      title: 'Validated Inputs at Every Node',
      description: 'Before a workflow step executes, the inputs it requires are checked for completeness and format. Mismatches are caught and routed before they produce downstream errors.',
      width: 'default',
    },
    {
      icon: 'filter',
      title: 'Logic That Stays Stable',
      description: 'Your workflow runs against the rules you set — not against a model that may interpret them differently over time. Update the logic when your process changes. Until then, it executes identically.',
      width: 'default',
    },
  ],
});
