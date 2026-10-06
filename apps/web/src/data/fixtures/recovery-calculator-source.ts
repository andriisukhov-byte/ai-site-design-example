import { pageBlockSchema, type PageBlock } from '@acme/blocks';

export const recoveryCalculatorSourceFixture: PageBlock = pageBlockSchema.parse({
  type: 'recovery-calculator',
  background: 'dark',
  title: 'What the silence {{actually costs}}',
  description:
    'Three sliders plus the booking frequency, because a recovered caller in a recurring-service business is a contract rather than a single job.',
  clientsLabel: 'new clients a month you are not booking',
  resultLabel: 'Work that is worth',
  annualLabel: 'over a year, if they stay',
  frequencyLabel: 'How often a new client books',
  frequencyDefault: 'biweekly',
  breakEvenNote:
    'One recovered client covers the platform for months. The sliders start deliberately low, because the argument only works if it can be checked.',
  assumptionNote:
    'What this assumes: the annual figure holds only if those clients stay the year, and it ignores referrals and reviews. It is an estimate to argue with, not a promise.',
  action: { label: 'Get Started Free', href: '/signup' },
  controls: [
    { key: 'missed', label: 'Calls you miss in a typical week', value: 12, min: 0, max: 80, step: 1 },
    { key: 'share', label: 'Share of them that would have booked', value: 30, min: 5, max: 60, step: 5, suffix: '%' },
    { key: 'jobValue', label: 'Your price per clean', value: 180, min: 60, max: 600, step: 10, prefix: '$' },
  ],
});
