import { pageBlockSchema } from '@acme/blocks';

export const mediaShowcaseSupportFixture = pageBlockSchema.parse({
  type: 'media-showcase',
  background: 'gray',
  title: 'A {{ Support Conversation }}That Resolves Itself',
  description: 'Triage logic, resolution branches, helpdesk actions, and escalation triggers \u2014 all on one canvas. No separate tools. No manual ticket creation after the fact.',
});
