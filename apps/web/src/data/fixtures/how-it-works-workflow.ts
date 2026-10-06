import { pageBlockSchema, type PageBlock } from '@acme/blocks';

export const howItWorksWorkflowFixture: PageBlock = pageBlockSchema.parse({
  background: 'white',
  type: 'how-it-works',
  title: 'Map It Once.',
  gradientText: 'Let It Run.',
  subtitle: 'Every deterministic workflow starts with a trigger and a clear definition of what happens next. You set the conditions, map the branches, connect the systems, and deploy. From that point, the workflow handles itself.',
  openFirst: false,
  steps: [
    { label: 'Step 1', title: 'Define the Trigger', description: 'A form submission, record update, inbound email, scheduled time, or threshold crossed in a connected system — any defined event becomes the workflow\'s entry point.' },
    { label: 'Step 2', title: 'Map the Logic', description: 'Use the visual canvas to build branching paths — conditions, exceptions, and every edge case configured before the workflow goes live.' },
    { label: 'Step 3', title: 'Connect Your Systems', description: 'Attach the tools each step needs from 2,700+ integrations. Each node reads and writes live data at the moment it executes — no middleware layer.' },
    { label: 'Step 4', title: 'Deploy and Monitor', description: 'Activate and track every execution from a unified dashboard. Every trigger, branch, and exception is logged in real time, audit-ready by default.' },
  ],
  button: { label: 'Schedule Your Consultation', href: '#popup-open-popupRequestDemo', target: '_self' },
});
