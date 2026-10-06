import { pageBlockSchema, type PageBlock } from '@acme/blocks';

export const sideBySideWorkflowFixture: PageBlock = pageBlockSchema.parse({
  background: 'gray',
  type: 'side-by-side',
  title: 'Business Workflow Automation',
  description: 'Automate complex business operations with intelligent, event-driven workflows that make decisions, coordinate teams, update systems, and execute tasks autonomously, without human micromanagement.',
  media: {
    id: '9033',
    src: '/media/2026/05/features-business-workflow-automation-1.png',
    alt: 'Business Workflow Automation illustration',
  },
  mediaSide: 'left',
  imageSide: 'left',
  image: {
    id: '9033',
    src: '/media/2026/05/features-business-workflow-automation-1.png',
    alt: 'Business Workflow Automation illustration',
  },
  cardTitle: 'Business Workflow Automation',
  cardSubtitle: 'End-to-end process orchestration with cognitive AI',
  cardDescription: 'Automate complex business operations with intelligent, event-driven workflows that make decisions, coordinate teams, update systems, and execute tasks autonomously, without human micromanagement.',
  bullets: [],
  smallIcons: [],
  primaryAction: {
    label: 'Learn More',
    href: '/business-workflow-automation/',
    target: '_self',
  },
  bottomCards: [
    {
      title: 'Perfect For',
      items: [
        { icon: 'users', title: 'Operations Teams.', description: 'Automate scheduling, escalations, reporting, and cross-department approvals.' },
        { icon: 'credit-card', title: 'Finance & Accounting.', description: 'Process invoices, match POs, reconcile payments, and run compliance workflows automatically.' },
        { icon: 'headset', title: 'Customer Support.', description: 'Route tickets, handle requests, automate follow-ups, and trigger backend actions without manual steps.' },
        { icon: 'clipboard', title: 'Administrative Departments.', description: 'Onboarding, document workflows, contract processing, lead qualification, and policy-driven operations.' },
      ],
    },
    {
      title: 'Use Cases',
      items: [
        { icon: 'file-check', title: 'Invoice Processing Automation', description: 'Validate documents, match POs, and post payments automatically' },
        { icon: 'truck', title: 'Order-to-Delivery Automation', description: 'Route orders, sync inventory, and trigger shipping updates in real time' },
        { icon: 'users', title: 'Client Onboarding Automation', description: 'Collect data, verify documents, and update CRMs without manual steps' },
        { icon: 'shield-alert', title: 'Incident & Escalation Automation', description: 'Detect issues, assign tasks, and notify teams instantly across systems' },
      ],
    },
  ],
});
