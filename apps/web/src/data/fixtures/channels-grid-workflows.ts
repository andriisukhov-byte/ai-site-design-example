import { pageBlockSchema } from '@acme/blocks';

export const channelsGridWorkflowsFixture = pageBlockSchema.parse({
  type: 'channels-grid',
  title: 'Your Workflows Fire Wherever Your',
  description: 'Deterministic workflows connect to every surface where process-relevant events occur, and execute the moment a defined trigger condition is met \u2014 regardless of where it originated. All triggers feed into the same workflow engine. One logic layer. Every entry point.',
  cards: [
    {
      icon: 'monitor',
      title: 'Web Forms & Portals',
      description: 'Submissions trigger intake, routing, and follow-up workflows instantly \u2014 with form data mapped directly to workflow variables.',
      fullWidth: false,
    },
    {
      icon: 'mail',
      title: 'Email & Inbox',
      description: 'Inbound emails matching defined criteria trigger classification, routing, response, and logging workflows without manual triage.',
      fullWidth: false,
    },
    {
      icon: 'network',
      title: 'Connected Systems',
      description: 'Record updates, threshold breaches, or status changes in CRMs, ERPs, or databases fire workflows mid-process \u2014 keeping every system in sync.',
      fullWidth: false,
    },
    {
      icon: 'clock',
      title: 'Scheduled Events',
      description: 'Time-based triggers run reporting, reminders, renewals, and compliance checks on the cadence you define \u2014 no manual initiation.',
      fullWidth: false,
    },
    {
      icon: 'webhook',
      title: 'API & Webhooks',
      description: 'External systems push events directly into your workflow layer, triggering downstream processes across your entire stack in real time.',
      fullWidth: false,
    },
  ],
});
