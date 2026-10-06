import type { PageBlock } from '@acme/blocks';

export const logosGridWorkflowFixture: PageBlock = {
  type: 'logo-grid',
  eyebrow: 'Integrations',
  title: 'Every Workflow Step Connects to {{ the System That Owns That Data }}',
  description: '2,700+ native integrations — connected in real time, not queued and synced after the fact. Acme reads and writes live, mid-execution.',
  columns: [
    {
      heading: 'ATS & HR',
      items: [
        { image: { id: '9345', src: '/media/2026/06/Workable.svg', alt: 'Workable' } },
        { image: { id: '8900', src: '/media/2026/05/greenhouse-1-scaled.png', alt: 'greenhouse 1' } },
        { image: { id: '9346', src: '/media/2026/06/SmartRecruiters-logo.png-e1780572017506.webp', alt: 'SmartRecruiters logo.png' } },
        { image: { id: '8919', src: '/media/2026/05/bullhorn-2.svg', alt: 'bullhorn 2' } },
      ],
    },
    {
      heading: 'Workforce & Scheduling',
      items: [
        { image: { id: '9343', src: '/media/2026/06/WhenIWork.svg', alt: 'WhenIWork' } },
        { image: { id: '8904', src: '/media/2026/05/deputy-1.png', alt: 'deputy 1' } },
        { image: { id: '8903', src: '/media/2026/05/connecteam-1.png', alt: 'connecteam 1' } },
        { image: { id: '9348', src: '/media/2026/06/TrackTik-Security-Software-LGb.png-e1780572135567.webp', alt: 'TrackTik Security Software LGb.png' } },
      ],
    },
    {
      heading: 'Compliance & Verification',
      items: [
        { image: { id: '8907', src: '/media/2026/05/checkr-1.png', alt: 'checkr 1' } },
        { image: { id: '8908', src: '/media/2026/05/sterling-1.png', alt: 'sterling 1' } },
        { image: { id: '8910', src: '/media/2026/05/first-advantage-1.png', alt: 'first advantage 1' } },
        { image: { id: '9347', src: '/media/2026/06/GoodHire.svg', alt: 'GoodHire' } },
      ],
    },
    {
      heading: 'Communications',
      items: [
        { image: { id: '8912', src: '/media/2026/05/twilio-1-scaled.png', alt: 'twilio 1' } },
        {
          image: { id: '8920', src: '/media/2026/05/whatsapp-business-2.svg', alt: 'whatsapp business 2' },
          label: 'WhatsApp',
          subLabel: 'business',
        },
        { image: { id: '8914', src: '/media/2026/05/gmail-outlook-1.png', alt: 'gmail outlook 1' } },
        {
          image: { id: '8916', src: '/media/2026/05/slack-1-scaled.png', alt: 'slack 1' },
          secondaryImage: { id: '8917', src: '/media/2026/05/teams-1.png', alt: 'teams 1' },
        },
      ],
    },
  ],
};
