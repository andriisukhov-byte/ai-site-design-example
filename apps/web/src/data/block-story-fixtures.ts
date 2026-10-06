import type { PageBlock } from '@acme/blocks';
import {
  agentCapabilitiesSourceFixture,
  agentCapabilitiesWithCardImagesSourceFixture,
} from './fixtures/agent-capabilities-source';
import { channelsGridWorkflowsFixture } from './fixtures/channels-grid-workflows';
import { conciergeFlowCallCenterFixture } from './fixtures/concierge-flow-call-center';
import { contactUsSourceFixture } from './fixtures/contact-us-source';
import { enterpriseUpgradeSourceFixture } from './fixtures/enterprise-upgrade-source';
import { featureGridFourColumnsFixture } from './fixtures/feature-grid-four-columns';
import { functionalCapabilitiesWorkflowsFixture } from './fixtures/functional-capabilities-workflows';
import { howItWorksWorkflowFixture } from './fixtures/how-it-works-workflow';
import { logosGridWorkflowFixture } from './fixtures/logos-grid-workflow';
import { mediaShowcaseSupportFixture } from './fixtures/media-showcase-support';
import { resultsStatsSourceFixture } from './fixtures/results-stats-source';
import { sideBySideWorkflowFixture } from './fixtures/side-by-side-workflow';
import { securitySourceFixture } from './fixtures/security-source';
import { conversationReplaySourceFixture } from './fixtures/conversation-replay-source';
import { recoveryCalculatorSourceFixture } from './fixtures/recovery-calculator-source';
import { tabsShowcaseSourceFixture } from './fixtures/tabs-showcase-source';

export const sourceBlockStoryOrder = [
  'hero',
  'hero-extended',
  'feature-rows',
  'feature-rows-builder-variant',
  'feature-grid',
  'feature-grid-3-columns',
  'feature-grid-4-columns',
  'feature-stack',
  'agent-capabilities',
  'agent-capabilities-with-card-images',
  'agent-solutions',
  'functional-capabilities',
  'capability-tools',
  'capability-trio',
  'industry-expertise',
  'coverage-grid',
  'channels-grid',
  'use-cases-grid',
  'use-cases-flow',
  'tabs-showcase',
  'concierge-flow',
  'media-showcase',
  'side-by-side',
  'side-by-side-with-integration-icons',
  'side-by-side-with-info-cards',
  'logos-grid',
  'integrations-banner',
  'testimonials',
  'difference',
  'pain-points-comparison',
  'pain-points-comparison-general-preset',
  'results-stats',
  'stats-cards',
  'alternatives-grid',
  'how-it-works',
  'how-it-works-open-first-auto-cycle',
  'live-in-days',
  'story',
  'anchor-pills',
  'faq',
  'news-insights',
  'security',
  'cta',
  'cta-two-buttons',
  'contact-us',
  'enterprise-upgrade',
  'pricing-cards',
  'pricing-details',
  'pricing-details-workflow-node-table',
  'pricing-details-competitor-comparison',
  'pricing-policy',
  'conversation-replay',
  'recovery-calculator',
] as const;

export const sourceBlockStoryPages = [
  sourceBlockStoryOrder.slice(0, 6),
  sourceBlockStoryOrder.slice(6, 12),
  sourceBlockStoryOrder.slice(12, 18),
  sourceBlockStoryOrder.slice(18, 24),
  sourceBlockStoryOrder.slice(24, 29),
  sourceBlockStoryOrder.slice(29, 35),
  sourceBlockStoryOrder.slice(35, 41),
  sourceBlockStoryOrder.slice(41, 47),
  sourceBlockStoryOrder.slice(47),
] as const;

export const currentSourceStorySourceSlugs: Record<string, string> = {
  'industry-expertise': 'industry-expertise-industry-preview',
};

const toolLogos = [
  { src: '/assets/blocks/capability-tools/cleaning-jobber.png', alt: 'cleaning jobber' },
  { src: '/assets/blocks/capability-tools/cleaning-twilio-scaled.png', alt: 'cleaning twilio' },
  { src: '/assets/blocks/capability-tools/cleaning-stripe.png', alt: 'cleaning stripe' },
];

const capabilityToolCards = [
  ['First Contact and Missed Call Recovery', 'Live voice answer, seconds-fast missed-call text-back, after-hours triage, and caller-intent capture.'],
  ['Service Request Intake', 'Property type and size, beds and baths, square footage, pets, access notes, scope, and frequency.'],
  ['Lead Qualification', 'Service-area validation, one-time vs. recurring intent, budget check, residential/commercial routing.'],
  ['Quote and Estimate Coordination', 'Instant flat-rate quotes, custom hourly rates, walk-through scheduling, and an add-on menu surfaced.'],
  ['Appointment Scheduling', 'Live availability, skill-and-zone matching, time-window pick, calendar block, and confirmations.'],
  ['Confirmation and Reminders', '24-hour and 1-hour reminders, en-route ETA, reschedule, no-show recovery, and cancellation rebooking.'],
  ['After-Hours and Urgent Request Triage', 'Same-day flagging, post-event cleanups, emergency commercial response, and on-call manager alerts.'],
  ['Quote Follow-Up and Re-Engagement', 'Day-1/3/7 open-quote nudges, objection capture, recurring reminders, and seasonal re-engagement.'],
  ['Recurring Plan and Membership Sales', 'One-time-to-recurring offers, cadence selection, payment-on-file, and auto-renewal reminders sent.'],
  ['Post-Service Follow-Up', 'Completion check-in, cleaner rating, review routing (Google, Yelp), and a referral-program invite.'],
] as const;

export const currentSourceStoryFixtures: Record<string, PageBlock> = {
  'agent-capabilities': agentCapabilitiesSourceFixture,
  'agent-capabilities-with-card-images': agentCapabilitiesWithCardImagesSourceFixture,
  'channels-grid': channelsGridWorkflowsFixture,
  'contact-us': contactUsSourceFixture,
  'concierge-flow': conciergeFlowCallCenterFixture,
  'feature-grid-4-columns': featureGridFourColumnsFixture,
  'enterprise-upgrade': enterpriseUpgradeSourceFixture,
  'functional-capabilities': functionalCapabilitiesWorkflowsFixture,
  'how-it-works': howItWorksWorkflowFixture,
  'logos-grid': logosGridWorkflowFixture,
  'media-showcase': mediaShowcaseSupportFixture,
  'results-stats': resultsStatsSourceFixture,
  security: securitySourceFixture,
  'side-by-side': sideBySideWorkflowFixture,
  'tabs-showcase': tabsShowcaseSourceFixture,
  'conversation-replay': conversationReplaySourceFixture,
  'recovery-calculator': recoveryCalculatorSourceFixture,
  'capability-tools': {
    type: 'capability-tools',
    title: 'What Your {{AI Receptionist Agent}} Runs',
    description: 'The full lead lifecycle on a single canvas — with live access to your booking software, calendar, and CRM, across every channel.',
    cards: capabilityToolCards.map(([title, description]) => ({
      title,
      description,
      logos: toolLogos,
      extraTools: 5,
    })),
  },
  'capability-trio': {
    type: 'capability-trio',
    title: '{{Set Up, Test, and Launch Real Automation}}||Without an Engineering Team',
    centerLabel: 'Deterministic workflow engine',
    cards: [
      {
        icon: 'messages-square',
        title: 'Conversational AI',
        description: 'Multi-turn dialogue across voice and text, responding without a script.',
        highlighted: true,
      },
      {
        icon: 'orbit',
        title: 'Autonomous AI',
        description: 'Background agents triggered by events or schedules, running multi-step tasks',
      },
      {
        icon: 'brain-circuit',
        title: 'Cognitive AI Agents',
        description: 'They check live systems and resolve requests mid-conversation',
      },
    ],
  },
  cta: {
    type: 'cta',
    title: 'DIY Your First Agent – or Let Us Do It for You',
    description: '5,000 credits free on signup – templates and the AI Concierge get you to a working canvas in minutes. Prefer hands-off? Our team builds, tests, and deploys the agent for you on Enterprise.',
    primaryAction: {
      label: 'Talk to Sales',
      href: '#popup-open-popupRequestDemo',
    },
    secondaryAction: {
      label: 'Start Building Free',
      href: 'https://app.acme.example/signup?utm_content=blocks-8',
    },
  },
  faq: {
    type: 'faq',
    title: 'Questions About',
    titleGradient: 'Deterministic Automation',
    searchPlaceholder: 'Search FAQ',
    items: [
      {
        category: 'product',
        question: 'What is deterministic automation and how is it different from AI automation?',
        answer: 'Deterministic automation executes workflows based on explicit rules — triggers, conditions, and branching logic you define. The output for any given input is always the same. AI automation introduces reasoning and inference, which is valuable for conversations and decisions but unsuitable for processes that require consistent, auditable outcomes every time. Acme supports both on the same platform — use each where it fits.',
      },
      {
        category: 'product',
        question: 'What happens when a workflow hits an exception?',
        answer: 'Exception branches are defined as part of the workflow before deployment. When an unexpected input or condition is encountered, the workflow routes to the exception path you configured — flagging, logging, notifying, or escalating, depending on how you’ve mapped it. Nothing fails silently.',
      },
      {
        category: 'product',
        question: 'How is execution tracked and reported?',
        answer: 'Every workflow run produces a timestamped execution log — trigger source, conditions evaluated, branch path taken, each action completed, systems updated, and any exceptions flagged. Logs are accessible from the unified dashboard and exportable for compliance reporting.',
      },
      {
        category: 'technical',
        question: 'What kinds of triggers can start a workflow?',
        answer: 'Any event your connected systems can surface — a form submission, an inbound email, a CRM record update, a database threshold crossed, a scheduled time, or an inbound API call or webhook. If the event can be defined, it can trigger a workflow.',
      },
      {
        category: 'technical',
        question: 'How deep can branching logic go?',
        answer: 'There is no enforced limit on branching depth. Workflows support nested conditions, multi-path branching, loop handling, and parallel execution branches — all configurable on the visual canvas without code.',
      },
      {
        category: 'technical',
        question: "Can I connect workflows to systems we've already built internally?",
        answer: 'Yes. Acme supports API and webhook connections, so any system with an accessible endpoint can be connected as a trigger source or action target. The 2,700+ native integrations cover most standard business tools; custom connections handle the rest.',
      },
      {
        category: 'support',
        question: 'Can workflows be updated without taking them offline?',
        answer: 'Logic updates can be staged and tested before replacing the live version. For minor adjustments, changes can be applied to active workflows with execution resuming against the updated logic from the next trigger. Full redeployment is only required for structural changes.',
      },
      {
        category: 'support',
        question: 'How quickly can a workflow go live?',
        answer: 'Simple trigger-action workflows can be live in under an hour using pre-built templates. Complex multi-branch, multi-system workflows typically take one to three days to configure, test, and deploy. Enterprise accounts get workflows built by the Acme team, typically within two to three weeks from kickoff.',
      },
      {
        category: 'pricing',
        question: 'How does credit-based pricing work for high-volume workflows?',
        answer: 'Each workflow execution draws from your credit balance based on the number of nodes executed and integration calls made. High-volume operations benefit from the Enterprise plan’s negotiated rate on prepaid credit volume. There are no per-workflow fees and no seat costs for automation — you pay for what runs.',
      },
    ],
  },
  'pricing-cards': {
    type: 'pricing-cards',
    root: {
      className: 'pricing-page',
    },
    cards: [
      {
        accent: 'gradient',
        title: 'Pay-as-you-go',
        description: 'Free to start. Buy credits from $10.',
        features: [
          '5,000 credits on signup',
          'Full canvas, all AI features',
          '2700+ integrations, templates',
          'Free messaging channels',
          'Up to 5 user seats',
          'Production deployment',
          'Human chat support*',
          'Credits never expire',
        ],
        note: '* activates on first credit purchase',
        button: {
          label: 'Start Free',
          href: 'https://app.acme.example/signup?utm_content=blocks-8',
        },
      },
      {
        accent: 'dark',
        title: 'Enterprise',
        description: 'Annual prepay. Negotiated rate.',
        features: [
          'Annual credit package',
          'Custom user seats',
          'SSO',
          'Bring your own LLM API keys',
          'Extended usage logs',
          'Assisted onboarding + training',
          'Agents built by Acme team',
          'Premium support + SLA',
        ],
        button: {
          label: 'Talk to Sales',
          href: '#popup-open-popupRequestDemo',
        },
      },
    ],
  },
};

export function applyCurrentSourceStoryCopy(slug: string, block: PageBlock): PageBlock {
  if (slug === 'hero-extended' && block.type === 'hero-extended') {
    return {
      ...block,
      description: 'Your business automation runs first –||pay as you go after',
    };
  }

  if (slug === 'feature-rows' && block.type === 'feature-rows') {
    return {
      ...block,
      rows: block.rows.map((row) => row.title === 'Virtual Employees'
        ? {
            ...row,
            description: 'Autonomous AI agents configured by role – with multi-agent orchestration (coming soon)',
          }
        : row),
    };
  }

  if (slug === 'feature-stack' && block.type === 'feature-stack') {
    return {
      ...block,
      title: 'Why  {{ Customers Don’t Notice }}||They’re Not Talking to a Person',
    };
  }

  if (slug === 'pain-points-comparison' && block.type === 'pain-points-comparison') {
    return {
      ...block,
      eyebrow: 'WHY THIS MATTERS NOW',
    };
  }

  if (slug === 'pain-points-comparison-general-preset' && block.type === 'pain-points-comparison') {
    return {
      ...block,
      eyebrow: 'PAIN POINTS',
      rows: block.rows.map((row) => ({
        ...row,
        leftDescription: row.leftDescription?.replace(/\r?\n/g, '<br>'),
      })),
    };
  }

  if (slug === 'coverage-grid' && block.type === 'coverage-grid') {
    return {
      ...block,
      title: '{{ One Agent Across }}||Every Trade You Bill',
    };
  }

  if (slug === 'pricing-details' && block.type === 'pricing-details') {
    const sourceDash = (value?: string) => value?.replace(/ - /g, ' – ');

    return {
      ...block,
      sections: block.sections.map((section) => ({
        ...section,
        info: sourceDash(section.info),
        note: sourceDash(section.note),
        rows: section.rows.map((row) => ({
          ...row,
          cells: row.cells.map((cell) => ({
            ...cell,
            text: sourceDash(cell.text) ?? cell.text,
          })),
        })),
      })),
    };
  }

  if (slug === 'side-by-side-with-integration-icons' && block.type === 'side-by-side') {
    const plain = (value?: string) => value?.replace(/\{\{\s*([^}]+?)\s*\}\}/g, '$1').replace(/\|\|/g, ' ');
    const paragraphs = (value?: string) => value
      ?.replace(/^\{\{\s*([^}]+?)\s*\}\}\s*\{\{\s*([^}]+?)\s*\}\}\s*(<ul>[\s\S]*<\/ul>)\s*\{\{\s*([^}]+?)\s*\}\}$/i, '<p>$1</p><p>$2</p>$3<p>$4</p>')
      ?? plain(value);

    return {
      ...block,
      title: plain(block.title) ?? block.title,
      description: plain(block.description),
      cardTitle: plain(block.cardTitle),
      cardSubtitle: plain(block.cardSubtitle),
      cardDescription: paragraphs(block.cardDescription),
      cardNote: plain(block.cardNote),
      bullets: block.bullets.map((bullet) => ({
        ...bullet,
        title: plain(bullet.title) ?? bullet.title,
        text: plain(bullet.text),
        description: plain(bullet.description),
      })),
    };
  }

  return block;
}
