import { pageBlockSchema } from '@acme/blocks';

export const tabsShowcaseSourceFixture = pageBlockSchema.parse({
  type: 'tabs-showcase',
  background: 'gray',
  title: 'See It In Action: {{ Workflow Examples }}',
  autoplaySeconds: 0,
  tabs: [
    {
      label: 'Seamless Sales to Fulfillment',
      icon: 'briefcase',
      steps: [
        { text: 'Customer places new order', icon: 'phone-outgoing' },
        { text: 'Sales agent AI confirms details', icon: 'bot' },
        { text: 'Checks stock', icon: 'clipboard-check' },
        { text: 'Support agent updates status', icon: 'calendar-check-2' },
        { text: 'Shipping agent arranges delivery', icon: 'mail-check' },
        { text: 'Notification agent sends updates', icon: 'siren' },
      ],
    },
    {
      label: 'From Proposal to Completion',
      icon: 'shopping-basket',
      steps: [
        { text: 'Inquiry agent logs request', icon: 'phone-outgoing' },
        { text: 'Proposal agent drafts offer', icon: 'bot' },
        { text: 'Schedules kickoff', icon: 'clipboard-check' },
        { text: 'Resource agent assigns team', icon: 'calendar-check-2' },
        { text: 'Progress agent tracks delivery', icon: 'mail-check' },
        { text: 'Account agent reports outcome', icon: 'siren' },
      ],
    },
    {
      label: 'End-to-End Production Control',
      icon: 'hand-heart',
      steps: [
        { text: 'Order agent receives request', icon: 'phone-outgoing' },
        { text: 'Planning agent schedules production', icon: 'bot' },
        { text: 'Inspects materials', icon: 'clipboard-check' },
        { text: 'Operations agent monitors output', icon: 'calendar-check-2' },
        { text: 'Logistics agent coordinates shipment', icon: 'mail-check' },
        { text: 'Reporting agent tracks delivery', icon: 'siren' },
      ],
    },
    {
      label: 'Intelligent Client Management',
      icon: 'layers',
      steps: [
        { text: 'Onboarding agent verifies documents', icon: 'phone-outgoing' },
        { text: 'Compliance agent reviews policies', icon: 'bot' },
        { text: 'Account agent sets up profile', icon: 'clipboard-check' },
        { text: 'Transaction agent processes requests', icon: 'calendar-check-2' },
        { text: 'Audit agent checks accuracy', icon: 'mail-check' },
      ],
    },
  ],
  root: {
    anchor: 'workflows',
  },
});
