import { pageBlockSchema, type PageBlock } from '@acme/blocks';

export const enterpriseUpgradeSourceFixture: PageBlock = pageBlockSchema.parse({
  type: 'enterprise-upgrade',
  title: 'Move to Enterprise',
  description: 'Volume discount, SSO, custom seats, fully assisted onboarding, and a Acme team that builds and configures your agents.',
  tableTitle: 'Everything in Your Pay-as-you-go Plan, Plus:',
  leftHeading: 'Capability',
  rightHeading: "What's Included",
  benefits: [
    ['Pricing', 'Personalized volume discount'], ['Credits', 'Annual credit package'], ['User seats', 'Custom'], ['Authentication', 'SSO'], ['Usage logs', 'Extended retention'], ['Onboarding', 'Fully assisted by the Acme team'], ['Training', 'Included'], ['Agent build and configuration', 'Acme team works to fine-tune and customize your workflows and agents'], ['Support', 'Premium support with SLA'],
  ].map(([capability, included]) => ({ capability, included })),
  form: { title: 'Help Us Prepare for the Call', description: 'A few quick questions so the Acme team comes into the call ready with relevant examples for your business.' },
});
