import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { pageDocumentSchema, type PageDocument } from '@acme/blocks';

const out = readArg('--out', 'data/ai-page-generation/use-case-pages.json');
const demo = { label: 'Book a Demo', href: '#popup-open-popupRequestDemo', target: '_self' as const };
const startFree = { label: 'Get Started Free', href: 'https://app.acme.example/signup', target: '_self' as const };

type Definition = {
  key: string;
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  details: string[];
  questions: string[];
};

const definitions: Definition[] = [
  {
    key: 'lead-qualification', path: '/ai-lead-qualification/', title: 'AI Lead Qualification Agent', eyebrow: 'Sales use case',
    description: 'Respond to every inbound inquiry, collect the details your team needs, and route qualified opportunities to the right next step.',
    details: ['Fit, timeline, budget, and location', 'Buying intent and product need', 'Correct owner and next action', 'Follow-up preference and consent'],
    questions: ['Can we use our own qualification questions?', 'Can the agent hand a conversation to a person?', 'Can it work with our CRM?'],
  },
  {
    key: 'insurance', path: '/ai-insurance-agent/', title: 'AI Agent for Insurance Teams', eyebrow: 'Insurance industry',
    description: 'Give policyholders and prospects a clear first response while collecting accurate context for service, claims, and sales teams.',
    details: ['Request type and policy context', 'Permitted intake information', 'Licensed or specialist handoff', 'Approved status and next-step updates'],
    questions: ['Can the workflow be reviewed by our compliance team?', 'Does the agent make coverage decisions?', 'Can customers move to a human agent?'],
  },
  {
    key: 'security', path: '/ai-security-agent/', title: 'AI Agent for Security Companies', eyebrow: 'Security industry',
    description: 'Capture inquiries, triage routine service requests, and give operations teams complete context before they take over.',
    details: ['Urgency, location, and request type', 'Approved escalation path', 'Operations handoff summary', 'Customer updates and follow-through'],
    questions: ['Can we define emergency escalation rules?', 'Can it support sales and existing customer service?', 'What does the operations team receive?'],
  },
  {
    key: 'auto-repair', path: '/ai-auto-repair-agent/', title: 'AI Agent for Auto Repair Shops', eyebrow: 'Auto repair industry',
    description: 'Answer service inquiries, collect vehicle details, and help your shop move qualified requests toward a booked visit.',
    details: ['Vehicle, concern, and contact preference', 'Service request and visit context', 'Appointment options and reminders', 'Advisor handoff summary'],
    questions: ['Can the agent collect vehicle information?', 'Can it book service appointments?', 'Does it diagnose vehicles?'],
  },
  {
    key: 'cleaning', path: '/ai-cleaning-agent/', title: 'AI Agent for Cleaning Companies', eyebrow: 'Cleaning industry',
    description: 'Respond to every request, collect job details, and help your team turn inquiries into the right booked service.',
    details: ['Residential or commercial service type', 'Property, timing, and service-area details', 'Recurring or one-time service needs', 'Quote and booking follow-up'],
    questions: ['Can it distinguish residential and commercial cleaning?', 'Can it work after business hours?', 'Can staff take over a conversation?'],
  },
];

const pages = [...definitions.map(makeUseCase), makeDirectory()].map((page) => pageDocumentSchema.parse(page));
await mkdir(dirname(out), { recursive: true });
await writeFile(out, `${JSON.stringify({ generatedAt: new Date().toISOString(), pages }, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ ok: true, out, pages: pages.map((page) => ({ path: page.path, title: page.title, blocks: page.blocks.length })) }, null, 2));

function makeUseCase(definition: Definition): PageDocument {
  const cards = definition.details.map((detail, index) => ({
    title: ['Respond with context', 'Collect the right details', 'Route the next step', 'Keep the work moving'][index]!,
    description: detail,
    width: 'default' as const,
  }));
  const rows = definition.details.map((detail) => ({
    leftTitle: `Manual intake loses ${detail.toLowerCase()}`,
    rightDescription: `A configured workflow gathers ${detail.toLowerCase()} before the human handoff.`,
  }));

  return {
    contentKey: `ai-page:${definition.key}`,
    collection: 'use-cases',
    path: definition.path,
    title: definition.title,
    excerpt: definition.description,
    status: 'published',
    template: 'industry-use-case',
    seo: { metaTitle: `${definition.title} | Acme`, metaDescription: definition.description, canonicalUrl: definition.path },
    blocks: [
      { type: 'hero', eyebrow: definition.eyebrow, title: definition.title, description: definition.description, primaryAction: startFree, secondaryAction: demo },
      { type: 'functional-capabilities', preset: 'service', title: `Turn every conversation into {{ useful context }}`, description: 'Build the workflow around your operating rules, human handoffs, and connected systems.', cards },
      { type: 'use-case-flow', background: 'gray', title: 'A clear {{ workflow }} from first message to handoff', columns: [
        { label: 'Capture', items: [{ text: 'Answer the inquiry' }, { text: 'Identify the request' }, { text: 'Confirm contact details' }] },
        { label: 'Understand', items: [{ text: definition.details[0]! }, { text: definition.details[1]! }, { text: 'Apply your routing rules' }] },
        { label: 'Advance', items: [{ text: 'Confirm the next step' }, { text: 'Notify the right team' }, { text: 'Keep a concise handoff summary' }] },
      ] },
      { type: 'pain-points-comparison', background: 'white', title: 'Replace manual {{ follow-up }} with a clearer workflow', showColumnHeadings: true, leftHeading: 'Without a workflow', rightHeading: 'With a Acme workflow', rows },
      securityBlock(),
      { type: 'cta', eyebrow: 'Ready to map your workflow?', title: 'Build the next step with {{ your team }}', description: 'Start with the conversation your customers have most often, then connect the handoff and follow-up your team needs.', primaryAction: startFree, secondaryAction: demo },
      { type: 'faq', title: 'Questions about', titleGradient: definition.title, searchPlaceholder: 'Search questions', items: definition.questions.map((question) => ({ question, answer: answerFor(question) })) },
    ],
  };
}

function makeDirectory(): PageDocument {
  const cards = [
    ['AI Lead Qualification', 'Qualify and route inbound opportunities with useful sales context.', '/ai-lead-qualification/', 'filter'],
    ['AI Agent for Insurance Teams', 'Guide structured intake and route the right next step.', '/ai-insurance-agent/', 'shield-check'],
    ['AI Agent for Security Companies', 'Triage inquiries and prepare operational handoffs.', '/ai-security-agent/', 'shield-check'],
    ['AI Agent for Auto Repair Shops', 'Collect vehicle service details and coordinate visits.', '/ai-auto-repair-agent/', 'hammer'],
    ['AI Agent for Cleaning Companies', 'Capture job details and help every inquiry reach a booking path.', '/ai-cleaning-agent/', 'calendar-check'],
    ['AI Agent for HVAC', 'Manage service inquiries, scheduling, and follow-up.', '/hvac-ai-agent/', 'cloud-cog'],
    ['AI Agent for Real Estate', 'Respond to property inquiries and keep prospects moving.', '/real-estate-ai-agent/', 'building'],
    ['Customer Service AI Agent', 'Support customers across channels and route complex issues.', '/customer-service-ai-agent/', 'headset'],
  ];
  return {
    contentKey: 'ai-page:use-cases-directory', collection: 'pages', path: '/ai-use-cases/', title: 'AI Use Cases',
    excerpt: 'Explore practical AI-agent workflows for sales, customer service, operations, and industry teams.', status: 'published', template: 'landing',
    seo: { metaTitle: 'AI Use Cases | Acme', metaDescription: 'Explore practical AI-agent workflows for sales, customer service, operations, and industry teams.', canonicalUrl: '/ai-use-cases/' },
    blocks: [
      { type: 'hero', eyebrow: 'AI use cases', title: 'AI agents for the work {{ your team repeats }}', description: 'Explore practical workflows for turning conversations into completed next steps.', primaryAction: startFree, secondaryAction: demo },
      { type: 'use-cases-grid', title: 'Find the workflow that fits {{ your operation }}', description: 'Start with a specific use case, then adapt questions, routing, handoffs, and integrations to how your team works.', cards: cards.map(([title, description, href, icon]) => ({ title, description, href, icon })) },
      { type: 'how-it-works', background: 'gray', title: 'Start with one {{ high-value workflow }}', subtitle: 'Turn a recurring conversation into an agent-led process with clear human ownership.', openFirst: false, steps: [
        { label: '1', title: 'Choose the conversation', description: 'Pick a recurring request where speed, structure, or follow-up makes a difference.' },
        { label: '2', title: 'Define the handoff', description: 'Set the questions, routing rules, connected systems, and moments a person takes over.' },
        { label: '3', title: 'Launch and improve', description: 'Review real conversations with your team and refine the workflow as you learn.' },
      ], button: demo },
      securityBlock(),
      { type: 'cta', eyebrow: 'Not sure where to start?', title: 'Map an AI workflow around {{ your next priority }}', description: 'Choose the customer or operational conversation that creates the most repeat work today.', primaryAction: startFree, secondaryAction: demo },
      { type: 'faq', title: 'AI use case', titleGradient: 'questions', searchPlaceholder: 'Search questions', items: [
        { question: 'Can we start with a single use case?', answer: 'Yes. Start with one high-volume workflow, then add more as the team is ready.' },
        { question: 'Can each workflow use different routing rules?', answer: 'Yes. Each workflow can have its own questions, escalation rules, and connected systems.' },
        { question: 'Can our team update the workflow later?', answer: 'Yes. The workflow is designed to be iterated as your process changes.' },
      ] },
    ],
  };
}

function securityBlock() {
  return {
    type: 'security' as const, background: 'gray' as const, title: 'Built for', titleGradient: 'controlled workflows',
    subtitle: 'Configure the data, access, escalation, and review rules that match your operating requirements.',
    cards: [
      { icon: 'database_zap' as const, title: 'Data protection', description: 'Use controlled data handling and retention choices that fit your team’s policies.' },
      { icon: 'shield_ellipsis' as const, title: 'Permission-aware access', description: 'Connect systems and actions according to the access your workflow permits.' },
      { icon: 'file_key' as const, title: 'Human decision points', description: 'Keep exceptions and sensitive decisions with the appropriate people.' },
      { icon: 'text_search' as const, title: 'Reviewable activity', description: 'Give teams clear conversation and handoff context for ongoing review.' },
    ],
  };
}

function answerFor(question: string): string {
  if (question.includes('coverage decisions') || question.includes('diagnose')) return 'No. The agent can collect information and route the request; qualified people retain the decision-making responsibility.';
  if (question.includes('human') || question.includes('staff')) return 'Yes. Configure the handoff rules for the requests, exceptions, or customer preferences that require a person.';
  return 'Yes. The workflow can be configured around your approved questions, routing rules, and connected systems.';
}

function readArg(name: string, fallback: string): string {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1] ?? fallback;
}
