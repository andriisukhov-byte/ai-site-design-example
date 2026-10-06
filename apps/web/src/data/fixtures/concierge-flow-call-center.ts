import { pageBlockSchema } from '@acme/blocks';

export const conciergeFlowCallCenterFixture = pageBlockSchema.parse({
  type: 'concierge-flow',
  title: 'Describe Your Call Flows||{{ AI Builds the Agent. }}',
  description: 'Tell AI Concierge how your call center operates \u2014 your most common call types, your escalation triggers, your resolution criteria. It generates a working AI call center agent canvas. You adjust what doesn\'t fit. You don\'t start from zero.',
  cards: [
    {
      eyebrow: 'AI Concierge',
      title: 'Your call flows in \u2014 a working agent out',
      description: 'Describe your inbound and outbound scenarios in plain language. AI Concierge structures them into a deployable voice agent canvas \u2014 call logic, escalation rules, and data lookups included.',
    },
    {
      eyebrow: 'One Canvas',
      title: 'Voice automation and call center workflows together',
      description: 'Call handling, live data lookup, ticket creation, and post-call follow-up all on one canvas. No separate IVR tool, no separate CRM integration, no gap between what the agent says and what your system records.',
    },
    {
      eyebrow: 'Low / No-Code',
      title: 'Running in days, not after a sprint',
      description: 'No telephony engineering required. Connect your call center stack and go live. When your call flows change, you update the canvas \u2014 no developer, no ticket, no waiting.',
    },
  ],
  button: {
    label: 'Try AI Concierge Free',
    href: 'https://app.acme.example/signup',
    target: '_self',
  },
});
