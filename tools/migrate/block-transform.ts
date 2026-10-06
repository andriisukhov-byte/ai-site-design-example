import type { PageBlock, Seo } from '@acme/blocks';

import type { SourceBlock } from './source-utils';

type SourceMediaRecord = {
  id: number;
  file?: string;
  publicPath: string;
  alt?: string;
};

export type BlockTransformResult = {
  block?: PageBlock;
  reason?: string;
  skipped?: boolean;
};

let sourceMediaById = new Map<number, SourceMediaRecord>();
let sourceMediaByFile = new Map<string, SourceMediaRecord>();
let fallbackTestimonials: Extract<PageBlock, { type: 'testimonials' }>['items'] = [];

const heroSources = new Set(['hero']);
const heroExtendedSources = new Set(['hero-extended']);
const sideBySideSources = new Set(['side-by-side']);
const storySources = new Set(['story']);
const mediaShowcaseSources = new Set(['media-showcase']);
const featureGridSources = new Set([
  'feature-grid',
]);
const agentCapabilitiesSources = new Set(['agent-capabilities']);
const agentSolutionsSources = new Set(['agent-solutions']);
const channelsGridSources = new Set(['channels-grid']);
const featureStackSources = new Set(['feature-stack']);
const coverageGridSources = new Set(['coverage-grid']);
const featureRowsSources = new Set(['feature-rows']);
const capabilityTrioSources = new Set(['capability-trio']);
const capabilityToolsSources = new Set(['capability-tools']);
const useCasesGridSources = new Set(['use-cases-grid']);
const securitySources = new Set(['security']);
const functionalCapabilitiesSources = new Set(['functional-capabilities']);
const metricsSources = new Set<string>();
const resultsStatsSources = new Set(['results-stats']);
const statsCardsSources = new Set(['stats-cards']);
const capabilityStripSources = new Set<string>();
const liveInDaysSources = new Set(['live-in-days']);
const contactUsSources = new Set(['contact-us']);
const conciergeFlowSources = new Set(['concierge-flow']);
const enterpriseUpgradeSources = new Set(['enterprise-upgrade']);
const ctaSources = new Set(['cta']);
const faqSources = new Set(['faq']);
const contentFeedSources = new Set(['news-insights']);
const pricingCardsSources = new Set(['pricing-cards']);
const pricingDetailsSources = new Set(['pricing-details']);
const differenceSources = new Set(['difference']);
const painPointsComparisonSources = new Set(['pain-points-comparison']);
const pricingPolicySources = new Set(['pricing-policy']);
const industryExpertiseSources = new Set(['industry-expertise']);
const logoStripSources = new Set(['logo-marquee']);
const integrationsBannerSources = new Set(['integrations-banner']);
const logoGridSources = new Set(['logos-grid']);
const tabsShowcaseSources = new Set(['tabs-showcase']);
const anchorNavSources = new Set(['anchor-pills']);
const testimonialsSources = new Set(['testimonial']);
const comparisonGridSources = new Set(['alternatives-grid']);
const useCaseFlowSources = new Set(['use-cases-flow']);
const howItWorksSources = new Set(['how-it-works']);

export function setSourceMediaRecords(records: SourceMediaRecord[]): void {
  sourceMediaById = new Map(records.map((record) => [record.id, record]));
  sourceMediaByFile = new Map(records.flatMap((record) => (record.file ? [[record.file, record]] : [])));
}

export function setFallbackTestimonials(items: Extract<PageBlock, { type: 'testimonials' }>['items']): void {
  fallbackTestimonials = dedupeTestimonials(items).slice(0, 12);
}

const defaultPricingCards: Extract<PageBlock, { type: 'pricing-cards' }> = {
  type: 'pricing-cards',
  title: '{{ Pricing }}',
  description: 'Pay only for what you use. Full visibility on every credit spent.',
  background: 'gray',
  cards: [
    {
      accent: 'gradient',
      title: 'Pay-as-you-go',
      description: 'No subscription. No monthly fee.<br>Buy credits from $10',
      features: [
        '5,000 credits loaded on signup',
        'Full canvas + all AI features',
        'Bring your own API keys',
        'Production deployment*',
        'Up to 5 user seats*',
        'Human chat support*',
        'Credit usage dashboard',
        'Credits never expire',
      ],
      button: {
        label: 'Get Started Free',
        href: 'https://app.acme.example/signup',
        target: '_self',
      },
    },
    {
      accent: 'dark',
      title: 'Enterprise',
      description: 'Custom plan. Annual subscription,<br>negotiated rate.',
      features: [
        'Annual credit package',
        'Everything in Pay-as-you-go, plus',
        'Custom user seats + SSO',
        'Extended usage logs',
        'Fully assisted onboarding',
        'Recruiting agent built by the Acme team',
        'HVAC AI agent built by the Acme team',
        'Premium support + SLA',
      ],
      button: {
        label: 'Talk to Sales',
        href: '/contact-us/',
        target: '_self',
      },
    },
  ],
};

const defaultPricingDetailsSections: Extract<PageBlock, { type: 'pricing-details' }>['sections'] = [
  {
    background: 'gray',
    variant: 'default',
    title: 'Buy {{ credits }}',
    info: 'Credits power everything in the app - node executions, conversation turns, knowledge base indexing, voice minutes. Buy what you need, use it when you need it, roll unused credits forward indefinitely.',
    headers: ['Package', 'Credits', 'Best for'],
    rows: [
      { cells: [{ text: '$10', strong: true }, { text: '5000' }, { text: 'Starter - pilot a single agent', muted: true }] },
      { cells: [{ text: '$100', strong: true }, { text: '100000' }, { text: 'Team deployment', muted: true }] },
      { cells: [{ text: 'Custom', strong: true }, { text: '-' }, { text: 'Enterprise - negotiated annual package', muted: true }] },
    ],
    note: 'Minimum purchase $10. Credits never expire.',
  },
  {
    background: 'white',
    variant: 'default',
    title: '{{ Workflow node }} pricing',
    info: 'Credits per execution. Logic and orchestration nodes are free.',
    headers: ['Node', 'Cost in Credits', 'Note'],
    rows: [
      { cells: [{ text: 'Start, Loop, Merge, Sleep, Resolve, Clear Conv., Scheduled', strong: true }, { text: 'Free' }, { text: '' }] },
      { cells: [{ text: 'Search Knowledge Base', strong: true }, { text: 'Free' }, { text: 'KB fees apply', muted: true }] },
      { cells: [{ text: 'Execute Agent', strong: true }, { text: 'Free' }, { text: 'Agent fees apply', muted: true }] },
      { cells: [{ text: 'Condition', strong: true }, { text: 'Free / 2', accent: true }, { text: 'static / AI mode', muted: true }] },
      { cells: [{ text: 'Update Variable', strong: true }, { text: 'Free / 2', accent: true }, { text: 'static / AI fill', muted: true }] },
      { cells: [{ text: 'On Variable Update (trigger)', strong: true }, { text: '1', accent: true }, { text: '' }] },
      { cells: [{ text: 'LLM node', strong: true }, { text: '1', accent: true }, { text: 'plus cost passthrough', muted: true }] },
      { cells: [{ text: 'Send Message', strong: true }, { text: '1', accent: true }, { text: '+ channel fees', muted: true }] },
      { cells: [{ text: 'Parse File', strong: true }, { text: '2', accent: true }, { text: '' }] },
      { cells: [{ text: 'Webhook', strong: true }, { text: '2', accent: true }, { text: '' }] },
      { cells: [{ text: 'App Trigger (Pipedream)', strong: true }, { text: '2', accent: true }, { text: '' }] },
      { cells: [{ text: 'HTTP Request', strong: true }, { text: '2', accent: true }, { text: '' }] },
      { cells: [{ text: 'Integration Action', strong: true }, { text: '2 / 3', accent: true }, { text: 'no AI / with AI fill', muted: true }] },
      { cells: [{ text: 'Multi-Condition (Switch)', strong: true }, { text: '3', accent: true }, { text: '' }] },
      { cells: [{ text: 'AI Trigger', strong: true }, { text: '3', accent: true }, { text: '' }] },
      { cells: [{ text: 'Execute Code', strong: true }, { text: '3', accent: true }, { text: 'Python / JS sandbox', muted: true }] },
    ],
  },
  {
    background: 'gray',
    variant: 'default',
    title: '{{ Conversations }}',
    info: 'Credits per request-response turn.',
    headers: ['Mode', 'Cost in Credits', 'Notes'],
    rows: [
      { cells: [{ text: 'Text only', strong: true }, { text: '45', accent: true }, { text: '' }] },
      { cells: [{ text: 'Text + Voice', strong: true }, { text: '90', accent: true }, { text: 'includes voice airtime', muted: true }] },
      { cells: [{ text: 'Emotion detection', strong: true }, { text: 'TBD' }, { text: 'toggleable add-on', muted: true }] },
    ],
  },
  {
    background: 'white',
    variant: 'default',
    title: '{{ Knowledge }} base',
    headers: ['Action', 'Cost in Credits', 'Notes'],
    rows: [
      { cells: [{ text: 'Indexing', strong: true }, { text: '75 / MB', accent: true }, { text: 'Per indexed megabyte', muted: true }] },
      { cells: [{ text: 'Search', strong: true }, { text: '6 / search', accent: true }, { text: 'Every search, implicit or explicit', muted: true }] },
      { cells: [{ text: 'Rerank', strong: true }, { text: '+15 / search', accent: true }, { text: 'When rerank is enabled', muted: true }] },
    ],
  },
  {
    background: 'gray',
    variant: 'default',
    title: '{{ Channels }}',
    info: 'Provider costs converted to credits at an internal rate and charged on top of node fees.',
    headers: ['Channel', 'Cost in Credits', 'Notes'],
    rows: [
      { cells: [{ text: 'Phone', strong: true }, { text: 'TBD' }, { text: 'Twilio passthrough', muted: true }] },
      { cells: [{ text: 'SMS', strong: true }, { text: 'TBD' }, { text: 'Twilio passthrough', muted: true }] },
      { cells: [{ text: 'WhatsApp', strong: true }, { text: 'TBD' }, { text: 'Twilio passthrough', muted: true }] },
    ],
  },
];

const defaultChannelsGridCards: Extract<PageBlock, { type: 'channels-grid' }>['cards'] = [
  {
    icon: 'sms',
    title: 'SMS',
    description: 'The highest-response channel for hourly cleaners - full screening and interview booking over text alone.',
  },
  {
    icon: 'whatsapp',
    title: 'WhatsApp',
    description: 'Document upload and multilingual screening inside the same candidate thread.',
  },
  {
    icon: 'voice',
    title: 'Conversational Voice AI',
    description: 'Inbound calls and outbound follow-up for high-priority applicants who need a voice conversation.',
  },
  {
    icon: 'chat',
    title: 'Web & In-App Chat',
    description: 'Pre-screening starts directly on the career page before visitors leave.',
  },
  {
    icon: 'mail',
    title: 'Email',
    description: 'Job-board applications and forwarded requests get automated screening outreach and confirmations.',
    fullWidth: true,
  },
];

const defaultSecurityCards: Extract<PageBlock, { type: 'security' }>['cards'] = [
  {
    icon: 'database_zap',
    title: 'Data Protection',
    description: 'Advanced encryption and security protocols that meet or exceed industry standards for protecting customer information.',
  },
  {
    icon: 'file_key',
    title: 'Privacy Assurance',
    description: 'Your business data and customer interactions remain exclusively yours - never used to train public AI models or shared with third parties.',
  },
  {
    icon: 'shield_ellipsis',
    title: 'Secure System Integration',
    description: 'Role-based access controls and encrypted connection protocols ensure your systems remain protected while enabling seamless data flow between Acme and your business tools.',
  },
  {
    icon: 'text_search',
    title: 'Audit & Monitoring',
    description: 'Full activity logging and audit trails across every agent interaction, workflow execution, and system connection.',
  },
];

const defaultFunctionalCapabilityPresets: Record<
  Extract<PageBlock, { type: 'functional-capabilities' }>['preset'],
  Omit<Extract<PageBlock, { type: 'functional-capabilities' }>, 'type' | 'preset'>
> = {
  sales: {
    eyebrow: 'WHAT ACME AUTOMATES',
    title: '{{ The Sales Processes }} Your AI Sales Agent||Handles from Day One',
    description: 'Each function runs on a single agent canvas - connected to your CRM, active across every channel your prospects use.',
    cards: [
      { icon: 'filter', title: 'Lead Qualification', description: 'BANT and custom criteria checks, budget verification, authority confirmation, timeline assessment', width: 'default' },
      { icon: 'calendar-days', title: 'Demo & Meeting Booking', description: 'Calendar sync, pre-qualification before scheduling, confirmation sequences, no-show follow-up', width: 'default' },
      { icon: 'inbox', title: 'Inbound Response', description: 'Instant follow-up on form fills, missed calls, and chat inquiries - before leads go cold', width: 'default' },
      { icon: 'send', title: 'Outbound Follow-Up', description: 'Sequence management, re-engagement cadences, dormant lead reactivation', width: 'default' },
      { icon: 'shield-check', title: 'Objection Handling', description: 'Price objections, competitor comparisons, timing deflection - structured response logic per scenario', width: 'default' },
      { icon: 'file-text', title: 'Proposal & Pricing', description: 'Pricing conversation navigation, proposal follow-up, negotiation hand-off triggers', width: 'default' },
      { icon: 'database', title: 'CRM & Pipeline Updates', description: 'Automatic lead logging, stage progression, activity notes, contact enrichment mid-conversation', width: 'default' },
      { icon: 'clock', title: 'After-Hours Coverage', description: 'Prospect capture outside business hours, next-shift handoff with full conversation context', width: 'default' },
    ],
  },
  service: {
    eyebrow: 'Functional Capabilities',
    title: '{{ The Hiring Workflow }} Your AI Recruiting||Agent Handles From Day One',
    description: 'Every separate process in the lead lifecycle - from first ring to post-service review - automated on a single canvas, with live access to your dispatch software, calendar, and CRM across every channel.',
    cards: [
      { icon: 'phone-incoming', title: 'First Contact and Missed Call Recovery', description: 'Inbound voice answer, missed-call text-back within seconds, after-hours triage, channel switch confirmation, caller-intent capture', width: 'default' },
      { icon: 'clipboard-check', title: 'Service Request Intake', description: 'Problem description capture, system type and age, brand and model, photo or video upload, indoor temperature read, urgency tagging', width: 'default' },
      { icon: 'sliders-horizontal', title: 'Lead Qualification', description: 'Homeowner-versus-renter check, service-area validation, warranty status lookup, financing-interest flag, repeat-customer recognition, residential or commercial routing', width: 'default' },
      { icon: 'receipt', title: 'Quote and Estimate Coordination', description: 'Diagnostic-fee disclosure, flat-rate menu pricing for common repairs, tune-up package selection, replacement-quote handoff, financing options surfaced', width: 'default' },
      { icon: 'calendar-check-2', title: 'Appointment Scheduling and Dispatch', description: 'Live technician availability, skill-and-zone matching, time-window selection, calendar block, customer and dispatcher confirmation, route-density optimization', width: 'default' },
      { icon: 'bell', title: 'Confirmation and Reminders', description: '24-hour and 1-hour reminders, technician-en-route alert with ETA, photo-and-name introduction, real-time reschedule, no-show recovery', width: 'default' },
      { icon: 'triangle-alert', title: 'After-Hours Emergency Triage', description: 'No-heat and no-cool prioritization, gas-leak and CO escalation script, on-call dispatcher alert, customer holding-pattern guidance until tech arrives', width: 'default' },
      { icon: 'repeat-2', title: 'Quote Follow-Up and Re-Engagement', description: 'Open-quote reminders at day 1, 3, and 7, objection capture, financing reminder, seasonal pre-summer and pre-winter outreach, dormant-customer reactivation', width: 'default' },
      { icon: 'award', title: 'Maintenance Plan and Membership Sales', description: 'Tune-up cadence offers, two-visit annual plan upsell, payment-on-file capture, auto-renewal reminders, priority-service member recognition', width: 'wide' },
      { icon: 'star', title: 'Post-Service Follow-Up', description: 'Job completion check-in, technician rating capture, review-platform routing, repair-versus-replace next-step prompt, referral-program invitation', width: 'wide' },
    ],
  },
  recruiting: {
    eyebrow: '',
    title: '{{ The Hiring Workflow }} Your AI Recruiting||Agent Handles From Day One',
    description: 'Candidate screening automation built once and applied across every route, every site, and every applicant - single canvas, live system access, all channels.<br><br>First Contact Application acknowledgment, channel switch confirmation, role context delivery, candidate intent capture',
    cards: [
      { icon: 'message-square', title: 'First Contact', description: 'Application acknowledgment, channel switch confirmation, role context delivery, candidate intent capture', width: 'default' },
      { icon: 'shield-check', title: 'Reliability Pre-Screen', description: 'Work-history capture, scenario-based reliability questions, prior no-show pattern flagging, references-on-file confirmation', width: 'default' },
      { icon: 'clock', title: 'Availability Screening', description: 'Shift preference capture, weekend and evening fit, transport radius, vehicle status, weekly hours target', width: 'default' },
      { icon: 'file-check-2', title: 'Right-to-Work & Background-Check Consent', description: 'Work authorization confirmation, disclosure delivery, consent capture with timestamp, document upload prompts, compliance log update', width: 'default' },
      { icon: 'calendar-range', title: 'Interview Scheduling', description: 'Calendar slot offer, candidate selection, calendar block, candidate and supervisor confirmation, no-show rebook', width: 'default' },
      { icon: 'repeat-2', title: 'Pipeline Re-Engagement', description: 'Pre-screened pool tracking, route-coverage gap watch, new-account outreach, availability refresh, shortlist delivery', width: 'default' },
      { icon: 'handshake', title: 'Onboarding Handoff', description: 'Hire confirmation, payroll detail capture, uniform sizing, product-protocol acknowledgment, site-access briefing, HR and scheduling-system update', width: 'wide' },
    ],
    note: '',
  },
  channels: {
    eyebrow: '',
    title: 'One {{ Conversational AI Agent. }}||Any Channel.',
    description: 'Build once. Your agent carries the same logic, conversation history, and data connections across every channel where interactions happen.',
    cards: [
      { icon: 'audio-lines', title: 'Voice', description: 'Conversational voice AI for inbound call handling, outbound follow-ups, appointment reminders, and lead qualification - with natural-sounding speech and sentiment detection that adjusts tone in real time.', channels: 'phone lines, VoIP systems, outbound dialing', width: 'default' },
      { icon: 'messages-square', title: 'Web & Mobile Chat', description: 'Embedded agents that engage visitors, qualify leads, answer questions, and take action - without routing every interaction to a human.', channels: 'website widget, mobile app, customer portals', width: 'default' },
      { icon: 'smartphone', title: 'Messaging Apps', description: 'Agents running natively inside the platforms your customers already use - with the same conversation and action-execution capability as any other channel.', channels: 'WhatsApp, Telegram, SMS', width: 'default' },
      { icon: 'users', title: 'Team Collaboration', description: 'Conversational voice AI for inbound call handling, outbound follow-ups, appointment reminders, and lead qualification - with natural-sounding speech and sentiment detection that adjusts tone in real time.', channels: 'Slack, Microsoft Teams', width: 'default' },
      { icon: 'mail', title: 'Email', description: 'Two-way email conversations, automated follow-up sequences, approval workflows, and notifications - managed by your agent with the same logic and data access as voice or chat.', channels: 'inbox management, outbound sequences, approval workflows', width: 'wide' },
    ],
    note: 'All channels share the same agent logic, conversation history, and data connections. No duplication of configuration.',
  },
};

const defaultDifferenceBlock: Extract<PageBlock, { type: 'difference' }> = {
  type: 'difference',
  title: 'The {{ Acme }} Difference',
  subtitle: 'Built for People Who Think in Processes',
  leftTitle: 'Other Tools',
  rightTitle: 'Acme',
  leftItems: [
    'Prompt-based agents that hope for the best',
    'Separate tools for chat, automation, and background agents',
    'You figure it out alone from docs and tutorials',
    'Onboarding ends at signup. What you build is your problem.',
    'Chat-only or voice-only. Pick a channel',
  ],
  rightItems: [
    'Structured reasoning with decision frameworks and input validation',
    'Three capabilities native on one platform - combinable in a single workflow',
    'Human expert onboarding included. AI Concierge to generate your first canvas',
    'We stay with you until your first agent is live and working. No charge until it runs.',
    'Chat, voice, email, WhatsApp, SMS - same agent, any channel',
  ],
  action: {
    label: 'See It In Action',
    href: '#popup-open-popupRequestDemo',
    target: '_self',
  },
};

const defaultPainPointsComparisonBlock: Extract<PageBlock, { type: 'pain-points-comparison' }> = {
  type: 'pain-points-comparison',
  background: 'white',
  eyebrow: 'PAIN POINTS',
  title: 'Every {{ Missed Call, Slow Reply, and||Repeated Question }} Has a Cost',
  showColumnHeadings: false,
  leftHeading: 'The Challenge',
  rightHeading: 'Your AI Agent',
  rows: [
    {
      leftTitle: 'Missed inbound calls',
      leftDescription: 'Field teams and solo operators cannot answer the phone while on a job. Prospects do not leave voicemails - they call the next business on the list.',
      rightTitle: 'Your Conversational Voice AI Agent',
      rightDescription: 'Picks up every call, qualifies the caller, books the appointment, and updates your CRM - while your team stays on-site.',
    },
    {
      leftTitle: 'Candidates who go cold',
      leftDescription: 'Speed of first contact is one of the strongest predictors of hiring funnel conversion, and most teams cannot match the pace candidates expect.',
      rightTitle: 'Your Conversational AI Agent',
      rightDescription: 'Responds to every application within seconds, screens availability, and schedules the interview before a competitor responds.',
    },
    {
      leftTitle: 'Repetitive inquiries burn team time',
      leftDescription: 'When your team answers the same questions 30 times a day, that is overhead, not support. The cost compounds across every department with a public-facing inbox.',
      rightTitle: 'Your Customer Support AI Agent',
      rightDescription: 'Handles FAQs, order status, and policy questions at volume - only escalating when real judgment is needed.',
    },
  ],
};

export function transformSourceBlock(source: SourceBlock, pageTitle: string): BlockTransformResult {
  if (heroSources.has(source.name)) {
    return { block: toHeroBlock(source, pageTitle) };
  }

  if (heroExtendedSources.has(source.name)) {
    return { block: toHeroExtendedBlock(source, pageTitle) };
  }

  if (sideBySideSources.has(source.name)) {
    return toSideBySideBlock(source);
  }

  if (storySources.has(source.name)) {
    return toStoryBlock(source);
  }

  if (mediaShowcaseSources.has(source.name)) {
    return toMediaShowcaseBlock(source);
  }

  if (agentCapabilitiesSources.has(source.name)) {
    return toAgentCapabilitiesBlock(source);
  }

  if (agentSolutionsSources.has(source.name)) {
    return toAgentSolutionsBlock(source);
  }

  if (howItWorksSources.has(source.name)) {
    return toHowItWorksBlock(source);
  }

  if (featureRowsSources.has(source.name)) {
    return toFeatureRowsBlock(source);
  }

  if (capabilityTrioSources.has(source.name)) {
    return toCapabilityTrioBlock(source);
  }

  if (capabilityToolsSources.has(source.name)) {
    return toCapabilityToolsBlock(source);
  }

  if (useCasesGridSources.has(source.name)) {
    return toUseCasesGridBlock(source);
  }

  if (securitySources.has(source.name)) {
    return toSecurityBlock(source);
  }

  if (functionalCapabilitiesSources.has(source.name)) {
    return toFunctionalCapabilitiesBlock(source);
  }

  if (channelsGridSources.has(source.name)) {
    return toChannelsGridBlock(source);
  }

  if (featureStackSources.has(source.name)) {
    return toFeatureStackBlock(source);
  }

  if (coverageGridSources.has(source.name)) {
    return toCoverageGridBlock(source);
  }

  if (featureGridSources.has(source.name)) {
    return toFeatureGridBlock(source);
  }

  if (liveInDaysSources.has(source.name)) {
    return toLiveInDaysBlock(source);
  }

  if (contactUsSources.has(source.name)) {
    return { block: toContactUsBlock(source) };
  }

  if (conciergeFlowSources.has(source.name)) {
    return toConciergeFlowBlock(source);
  }

  if (enterpriseUpgradeSources.has(source.name)) {
    return toEnterpriseUpgradeBlock(source);
  }

  if (capabilityStripSources.has(source.name)) {
    return toCapabilityStripBlock(source);
  }

  if (metricsSources.has(source.name)) {
    return toMetricsBlock(source);
  }

  if (resultsStatsSources.has(source.name)) {
    return toResultsStatsBlock(source);
  }

  if (statsCardsSources.has(source.name)) {
    return toStatsCardsBlock(source);
  }

  if (ctaSources.has(source.name)) {
    return { block: toCtaBlock(source) };
  }

  if (faqSources.has(source.name)) {
    return toFaqBlock(source);
  }

  if (contentFeedSources.has(source.name)) {
    return { block: toContentFeedBlock(source) };
  }

  if (pricingCardsSources.has(source.name)) {
    return toPricingCardsBlock(source);
  }

  if (pricingDetailsSources.has(source.name)) {
    return toPricingDetailsBlock(source);
  }

  if (differenceSources.has(source.name)) {
    return { block: toDifferenceBlock(source) };
  }

  if (painPointsComparisonSources.has(source.name)) {
    return { block: toPainPointsComparisonBlock(source) };
  }

  if (pricingPolicySources.has(source.name)) {
    return toPricingPolicyBlock(source);
  }

  if (industryExpertiseSources.has(source.name)) {
    return toIndustryExpertiseBlock(source);
  }

  if (logoStripSources.has(source.name)) {
    return { block: toLogoStripBlock(source) };
  }

  if (integrationsBannerSources.has(source.name)) {
    return { block: toIntegrationsBannerBlock(source) };
  }

  if (logoGridSources.has(source.name)) {
    return toLogoGridBlock(source);
  }

  if (tabsShowcaseSources.has(source.name)) {
    return toTabsShowcaseBlock(source);
  }

  if (anchorNavSources.has(source.name)) {
    return toAnchorNavBlock(source);
  }

  if (testimonialsSources.has(source.name)) {
    return toTestimonialsBlock(source);
  }

  if (comparisonGridSources.has(source.name)) {
    return toComparisonGridBlock(source);
  }

  if (useCaseFlowSources.has(source.name)) {
    return toUseCaseFlowBlock(source);
  }

  return { reason: 'No canonical CMS block exists yet.' };
}

function toHowItWorksBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const steps = Array.from({ length: readCount(data, 'steps') }, (_, index) => ({
    label: readString(data, [`steps_${index}_label`]) || undefined,
    title: readString(data, [`steps_${index}_title`]) || undefined,
    description: readString(data, [`steps_${index}_description`]) || undefined,
  })).filter((step) => step.label || step.title || step.description);
  const title = readString(data, ['title', 'heading', 'headline']);
  const subtitle = readString(data, ['subtitle']);
  const hideSubtitle = readBoolean(data, ['hide_subtitle'], false);
  const infoNote = readString(data, ['info_note']);
  const button = readAction(data, ['button']);

  if (!title && !subtitle && !infoNote && !steps.length && !button) {
    return { reason: 'Empty how-it-works source block.', skipped: true };
  }

  return {
    block: {
      type: 'how-it-works',
      eyebrow: readString(data, ['eyebrow']) || undefined,
      title: title || undefined,
      gradientText: readString(data, ['gradient_text']) || undefined,
      subtitle: hideSubtitle ? '' : subtitle || undefined,
      background: readString(data, ['background']) === 'white' ? 'white' : 'gray',
      openFirst: readBoolean(data, ['open_first'], false),
      showStepNumbers: readBoolean(data, ['show_step_numbers'], true),
      steps,
      button,
      infoNote: infoNote || undefined,
    },
  };
}

export function normalizeSeo(input: Record<string, unknown>): Seo {
  const seo: Seo = {};
  const copyString = (from: string, to: keyof Seo = from as keyof Seo) => {
    const value = readString(input, [from]);

    if (value) {
      (seo as Record<string, unknown>)[to] = value;
    }
  };

  copyString('metaTitle');
  copyString('metaDescription');
  copyString('canonicalUrl');
  copyString('robots');
  copyString('ogTitle');
  copyString('ogDescription');
  copyString('twitterTitle');
  copyString('twitterDescription');

  const ogImage = readSeoImage(input, ['ogImage']);
  const twitterImage = readSeoImage(input, ['twitterImage']);

  if (ogImage) {
    seo.ogImage = ogImage;
  }

  if (twitterImage) {
    seo.twitterImage = twitterImage;
  }

  return seo;
}

function toHeroBlock(source: SourceBlock, pageTitle: string): PageBlock {
  const data = source.data;
  const style = readString(data, ['style']);
  const mediaSize = readString(data, ['media_size']);

  return {
    type: 'hero',
    variant: style === 'home' ? 'home' : 'default',
    eyebrow: readString(data, ['eyebrow', 'label', 'subtitle_top']) || undefined,
    title: normalizeInlineMarkers(readString(data, ['title', 'heading', 'headline']) || pageTitle),
    description: readString(data, ['description', 'subtitle', 'text']) || undefined,
    primaryAction: readAction(data, ['button', 'primary_button', 'primaryAction']),
    secondaryAction: readAction(data, ['secondary_button', 'secondaryAction']),
    primaryNote: readString(data, ['primary_note']) || undefined,
    secondaryNote: readString(data, ['secondary_note']) || undefined,
    backgroundImage: readImage(data, ['background_image']),
    tooltip: readHeroTooltip(data),
    media: readImage(data, ['content_image', 'image', 'media']),
    mediaSize: mediaSize === 'tall' ? 'tall' : 'wide',
    cards: readHeroCards(data),
  };
}

function toHeroExtendedBlock(source: SourceBlock, pageTitle: string): PageBlock {
  const data = source.data;
  const style = readString(data, ['style']);
  const mediaSize = readString(data, ['media_size']);

  return {
    type: 'hero-extended',
    variant: style === 'home' ? 'home' : 'default',
    eyebrow: readString(data, ['eyebrow', 'label', 'subtitle_top']) || undefined,
    title: normalizeInlineMarkers(readString(data, ['title', 'heading', 'headline']) || pageTitle),
    subtitle: normalizeInlineMarkers(readString(data, ['subtitle'])) || undefined,
    description: normalizeInlineMarkers(readString(data, ['description', 'text'])) || undefined,
    backgroundImage: readImage(data, ['background_image']),
    media: readImage(data, ['content_image', 'image', 'media']),
    mediaSize: mediaSize === 'tall' ? 'tall' : 'wide',
    primaryAction: readAction(data, ['primary_button', 'primaryAction', 'button']),
    secondaryAction: readAction(data, ['secondary_button', 'secondaryAction']),
    primaryNote: readString(data, ['primary_note']) || undefined,
    secondaryNote: readString(data, ['secondary_note']) || undefined,
    cards: readHeroCards(data),
  };
}

function readHeroTooltip(data: Record<string, unknown>) {
  const label = readString(data, ['tooltip_label']);
  const title = readString(data, ['tooltip_title']);
  const content = readString(data, ['tooltip_content']);

  if (!label || (!title && !content)) {
    return undefined;
  }

  return {
    label,
    action: readString(data, ['tooltip_action']) || 'See More',
    title: title || undefined,
    content: content || undefined,
  };
}

function readHeroCards(data: Record<string, unknown>) {
  return Array.from({ length: readCount(data, 'cards') }, (_, index) => {
    const title = readString(data, [`cards_${index}_title`]);
    const description = readString(data, [`cards_${index}_description`]);
    const icon = readImage(data, [`cards_${index}_icon`]);

    return {
      title: title || undefined,
      description: description || undefined,
      icon,
    };
  }).filter((card) => card.title || card.description || card.icon);
}

function toSideBySideBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const sectionTitle = normalizeInlineMarkers(readString(data, ['section_title']));
  const cardTitle = normalizeInlineMarkers(readString(data, ['card_title']));
  const title = sectionTitle || cardTitle || normalizeInlineMarkers(readString(data, ['title', 'heading']));

  if (!title) {
    return { reason: 'Missing title for side-by-side section.' };
  }

  const imageSide = readString(data, ['media_side', 'mediaSide', 'image_side']) === 'left' ? 'left' : 'right';
  const bullets = readSideBySideBullets(data);
  const media = readImage(data, ['image', 'media']);

  return {
    block: {
      type: 'side-by-side',
      eyebrow: readString(data, ['eyebrow', 'label', 'section_eyebrow']) || undefined,
      title,
      description: normalizeInlineMarkers(readString(data, ['description', 'text', 'subtitle', 'section_subtitle', 'card_description', 'card_subtitle'])) || undefined,
      media,
      mediaSide: imageSide,
      sectionEyebrow: readString(data, ['section_eyebrow']) || undefined,
      sectionTitle: sectionTitle || undefined,
      sectionSubtitle: normalizeInlineMarkers(readString(data, ['section_subtitle'])) || undefined,
      imageSide,
      image: media,
      background: readSideBySideBackground(data),
      cardTitle: cardTitle || undefined,
      cardSubtitle: normalizeInlineMarkers(readString(data, ['card_subtitle'])) || undefined,
      cardDescription: normalizeInlineMarkers(readString(data, ['card_description'])) || undefined,
      bullets,
      smallIcons: readSideBySideSmallIcons(data),
      primaryAction: readAction(data, ['button', 'primary_button']),
      secondaryAction: readAction(data, ['secondary_button']),
      cardNote: normalizeInlineMarkers(readString(data, ['card_note'])) || undefined,
      bottomCards: readSideBySideBottomCards(data),
    },
  };
}

function toStoryBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const titleGradient = readString(data, ['title_gradient']);
  const title = readString(data, ['title']);
  const intro = readString(data, ['intro']);
  const bodyTop = readString(data, ['body_top']);
  const quote = readString(data, ['quote']);
  const bodyBottom = readString(data, ['body_bottom']);
  const cards = readStoryCards(data);

  if (!titleGradient && !title && !intro && !bodyTop && !quote && !bodyBottom && cards.length === 0) {
    return { reason: 'Skipped empty story source shell.', skipped: true };
  }

  return {
    block: {
      type: 'story',
      eyebrow: readString(data, ['eyebrow']) || undefined,
      titleGradient: titleGradient || undefined,
      title: title || undefined,
      intro: intro || undefined,
      bodyTop: bodyTop || undefined,
      quote: quote || undefined,
      bodyBottom: bodyBottom || undefined,
      image: readImage(data, ['image']),
      cards,
    },
  };
}

function toMediaShowcaseBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const title = normalizeInlineMarkers(readString(data, ['title']));
  const description = readString(data, ['description']);
  const image = readImage(data, ['image']);
  const background = readString(data, ['background']);

  if (!title && !description && !image) {
    return { reason: 'Skipped empty media-showcase source shell.', skipped: true };
  }

  return {
    block: {
      type: 'media-showcase',
      title: title || undefined,
      description: description || undefined,
      image,
      background: background === 'white' ? 'white' : 'gray',
    },
  };
}

function readStoryCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'story' }>['cards'] {
  const count = readCount(data, 'cards');
  const cards: Extract<PageBlock, { type: 'story' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`cards_${index}_title`]);
    const description = readString(data, [`cards_${index}_description`]);

    if (title || description) {
      cards.push({
        icon: readString(data, [`cards_${index}_icon`]) || undefined,
        customIcon: readImage(data, [`cards_${index}_custom_icon`]),
        title: title || undefined,
        description: description || undefined,
      });
    }
  }

  return cards;
}

function readSideBySideBackground(data: Record<string, unknown>): 'white' | 'gray' | 'transparent' {
  const value = readString(data, ['background', 'theme', 'style']);

  if (value === 'gray' || value === 'grey' || value === 'muted') {
    return 'gray';
  }

  if (value === 'transparent') {
    return 'transparent';
  }

  return 'white';
}

function readSideBySideBullets(data: Record<string, unknown>): Extract<PageBlock, { type: 'side-by-side' }>['bullets'] {
  const count = readCount(data, 'bullets');
  const bullets: Extract<PageBlock, { type: 'side-by-side' }>['bullets'] = [];

  for (let index = 0; index < count; index += 1) {
    const text = readString(data, [`bullets_${index}_text`, `bullets_${index}_title`]);

    if (!text) {
      continue;
    }

    bullets.push({
      title: normalizeInlineMarkers(text),
      text: normalizeInlineMarkers(text),
      description: normalizeInlineMarkers(readString(data, [`bullets_${index}_description`])) || undefined,
    });
  }

  if (bullets.length) {
    return bullets;
  }

  return readCards(data, ['items', 'features']).slice(0, 6).map((item) => ({
    title: normalizeInlineMarkers(item.title),
    text: normalizeInlineMarkers(item.title),
    description: normalizeInlineMarkers(item.description || '') || undefined,
  }));
}

function readSideBySideSmallIcons(data: Record<string, unknown>): Extract<PageBlock, { type: 'side-by-side' }>['smallIcons'] {
  const count = readCount(data, 'small_icons');
  const icons: Extract<PageBlock, { type: 'side-by-side' }>['smallIcons'] = [];

  for (let index = 0; index < count; index += 1) {
    const image = readImage(data, [`small_icons_${index}_image`]);

    if (image) {
      icons.push({ image });
    }
  }

  return icons;
}

function readSideBySideBottomCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'side-by-side' }>['bottomCards'] {
  const count = readCount(data, 'bottom_cards');
  const cards: Extract<PageBlock, { type: 'side-by-side' }>['bottomCards'] = [];

  for (let cardIndex = 0; cardIndex < count; cardIndex += 1) {
    const title = readString(data, [`bottom_cards_${cardIndex}_title`]);
    const items = readSideBySideBottomItems(data, `bottom_cards_${cardIndex}_items`);

    if (title || items.length) {
      cards.push({
        title: title || undefined,
        items,
      });
    }
  }

  return cards;
}

function readSideBySideBottomItems(data: Record<string, unknown>, prefix: string): Extract<PageBlock, { type: 'side-by-side' }>['bottomCards'][number]['items'] {
  const count = readCount(data, prefix);
  const items: Extract<PageBlock, { type: 'side-by-side' }>['bottomCards'][number]['items'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`${prefix}_${index}_title`]);
    const description = readString(data, [`${prefix}_${index}_description`]);

    if (title || description) {
      items.push({
        icon: readString(data, [`${prefix}_${index}_icon`]) || undefined,
        title: title || undefined,
        description: description || undefined,
      });
    }
  }

  return items;
}

function toFeatureGridBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;

  if (source.name === 'feature-grid') {
    const cards = readFeatureGridCards(data);
    const eyebrow = readString(data, ['eyebrow']);
    const title = readString(data, ['title']);
    const description = readString(data, ['description']);

    if (!cards.length && !eyebrow && !title && !description) {
      return { reason: 'Empty feature-grid source block.', skipped: true };
    }

    return {
      block: {
        type: 'feature-grid',
        eyebrow: eyebrow || undefined,
        title: title || undefined,
        description: description || undefined,
        background: readFeatureGridBackground(data),
        columns: readFeatureGridColumns(data),
        cards,
      },
    };
  }

  const cards = readCards(data, ['items', 'cards', 'features', 'capabilities', 'channels', 'steps', 'rows']).slice(0, 12);

  if (cards.length < 2) {
    if (source.name === 'agent-solutions') {
      return { reason: 'Skipped empty agent-solutions source shell.', skipped: true };
    }

    return { reason: 'Less than two cards after normalized repeater extraction.' };
  }

  return {
    block: {
      type: 'feature-grid',
      eyebrow: readString(data, ['eyebrow', 'label']) || undefined,
      title: normalizeInlineMarkers(combineTitle(data) || titleFromSource(source.name)),
      description: readString(data, ['description', 'subtitle', 'text', 'section_subtitle']) || undefined,
      background: 'white',
      columns: cards.length >= 4 ? 4 : 3,
      cards: cards.map((card) => ({
        icon: card.icon || undefined,
        title: normalizeInlineMarkers(card.title),
        description: card.description ? normalizeInlineMarkers(card.description) : undefined,
      })),
    },
  };
}

function toAgentCapabilitiesBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const items = readAgentCapabilitiesItems(data);
  const title = normalizeInlineMarkers(readString(data, ['title']));
  const description = normalizeInlineMarkers(readString(data, ['description']));
  const infoNote = normalizeInlineMarkers(readString(data, ['info_note']));

  if (!title && !description && items.length === 0 && !infoNote) {
    return { reason: 'Empty agent-capabilities source block.', skipped: true };
  }

  if (items.length === 0) {
    return { reason: 'Agent capabilities source block has no items.' };
  }

  return {
    block: {
      type: 'agent-capabilities',
      title: title || undefined,
      description: description || undefined,
      contentSide: readString(data, ['content_side']) === 'left' ? 'left' : 'right',
      autoplay: readBoolean(data, ['autoplay'], false),
      autoplayInterval: Math.max(2000, Number(readString(data, ['autoplay_interval'])) || 5000),
      items,
      infoNote: infoNote || undefined,
    },
  };
}

function readAgentCapabilitiesItems(data: Record<string, unknown>): Extract<PageBlock, { type: 'agent-capabilities' }>['items'] {
  const count = Math.min(readCount(data, 'items'), 16);
  const items: Extract<PageBlock, { type: 'agent-capabilities' }>['items'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`items_${index}_title`]);
    const description = normalizeInlineMarkers(readString(data, [`items_${index}_description`]));

    if (!title && !description) {
      continue;
    }

    const link = readAgentCapabilitiesLink(data[`items_${index}_link`]);

    items.push({
      icon: readString(data, [`items_${index}_icon`]) || undefined,
      customIcon: readImage(data, [`items_${index}_custom_icon`]),
      title: title || undefined,
      description: description || undefined,
      image: readImage(data, [`items_${index}_image`]),
      link,
    });
  }

  return items;
}

function readAgentCapabilitiesLink(value: unknown): Extract<PageBlock, { type: 'agent-capabilities' }>['items'][number]['link'] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  const object = value as Record<string, unknown>;
  const url = typeof object.url === 'string' ? object.url : typeof object.href === 'string' ? object.href : '';

  if (!url.trim()) {
    return undefined;
  }

  return {
    url: normalizeHref(url.trim()),
    title: typeof object.title === 'string' ? object.title : typeof object.label === 'string' ? object.label : undefined,
    target: object.target === '_blank' ? '_blank' : '_self',
  };
}

function toAgentSolutionsBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const title = normalizeInlineMarkers(readString(data, ['title']));
  const items = readAgentSolutionsItems(data);

  if (!title && items.length === 0) {
    return { reason: 'Skipped empty agent-solutions source shell.', skipped: true };
  }

  if (items.length === 0) {
    return { reason: 'Agent solutions source block has no items.' };
  }

  return {
    block: {
      type: 'agent-solutions',
      title: title || undefined,
      items,
    },
  };
}

function readAgentSolutionsItems(data: Record<string, unknown>): Extract<PageBlock, { type: 'agent-solutions' }>['items'] {
  const count = Math.min(readCount(data, 'items'), 16);
  const items: Extract<PageBlock, { type: 'agent-solutions' }>['items'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`items_${index}_title`]);
    const description = readString(data, [`items_${index}_description`]);

    if (!title && !description) {
      continue;
    }

    items.push({
      icon: readString(data, [`items_${index}_icon`]) || undefined,
      customIcon: readImage(data, [`items_${index}_custom_icon`]),
      title: title || undefined,
      href: normalizeHref(readString(data, [`items_${index}_href`])) || undefined,
      description: description || undefined,
    });
  }

  return items;
}

function toContactUsBlock(source: SourceBlock): PageBlock {
  const data = source.data;

  return {
    type: 'contact-us',
    titleStart: readString(data, ['title_start']) || "Let's",
    titleAccent: readString(data, ['title_accent']) || 'Connect!',
    description: normalizeInlineMarkers(readString(data, ['description'])) || undefined,
    city: readString(data, ['city']) || undefined,
    address: normalizeInlineMarkers(readString(data, ['address'])) || undefined,
    phone: readString(data, ['phone']) || undefined,
    logo: readImage(data, ['logo']),
  };
}

function toConciergeFlowBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const title = normalizeInlineMarkers(readString(data, ['title']));
  const description = readString(data, ['description']);
  const cards = readConciergeFlowCards(data);
  const image = readImage(data, ['image']);
  const button = readAction(data, ['button']);

  if (!title && !description && !image && !cards.length && !button) {
    return { reason: 'Empty concierge-flow source block.', skipped: true };
  }

  if (!cards.length) {
    return { reason: 'Concierge flow source block has no cards.' };
  }

  return {
    block: {
      type: 'concierge-flow',
      title: title || undefined,
      description: description || undefined,
      image,
      cards,
      button,
    },
  };
}

function readConciergeFlowCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'concierge-flow' }>['cards'] {
  const count = Math.min(readCount(data, 'cards'), 4);
  const cards: Extract<PageBlock, { type: 'concierge-flow' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const eyebrow = readString(data, [`cards_${index}_eyebrow`]);
    const title = readString(data, [`cards_${index}_title`]);
    const description = readString(data, [`cards_${index}_description`]);

    if (eyebrow || title || description) {
      cards.push({
        eyebrow: eyebrow || undefined,
        title: title || undefined,
        description: description || undefined,
      });
    }
  }

  return cards;
}

function toEnterpriseUpgradeBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const benefits = readEnterpriseUpgradeBenefits(data);
  const title = normalizeInlineMarkers(readString(data, ['title']));
  const description = normalizeInlineMarkers(readString(data, ['description']));
  const tableTitle = normalizeInlineMarkers(readString(data, ['table_title']));
  const leftHeading = normalizeInlineMarkers(readString(data, ['left_heading']));
  const rightHeading = normalizeInlineMarkers(readString(data, ['right_heading']));
  const bodyHtml = sanitizeEnterpriseRichHtml(readString(data, ['body']));
  const formTitle = normalizeInlineMarkers(readString(data, ['form_title']));
  const formDescription = normalizeInlineMarkers(readString(data, ['form_description']));
  const formHtml = readEnterpriseUpgradeFormHtml(readString(data, ['form_shortcode']));
  const hasForm = Boolean(formTitle || formDescription || formHtml);

  if (!title && !description && !tableTitle && benefits.length === 0 && !bodyHtml && !hasForm) {
    return { reason: 'Empty enterprise-upgrade source block.', skipped: true };
  }

  return {
    block: {
      type: 'enterprise-upgrade',
      title: title || undefined,
      description: description || undefined,
      tableTitle: tableTitle || undefined,
      leftHeading: leftHeading || undefined,
      rightHeading: rightHeading || undefined,
      benefits,
      bodyHtml: bodyHtml || undefined,
      form: hasForm
        ? {
            title: formTitle || undefined,
            description: formDescription || undefined,
            html: formHtml || undefined,
          }
        : undefined,
    },
  };
}

function readEnterpriseUpgradeBenefits(
  data: Record<string, unknown>,
): Extract<PageBlock, { type: 'enterprise-upgrade' }>['benefits'] {
  const count = Math.min(readCount(data, 'benefits'), 24);
  const benefits: Extract<PageBlock, { type: 'enterprise-upgrade' }>['benefits'] = [];

  for (let index = 0; index < count; index += 1) {
    const capability = normalizeInlineMarkers(readString(data, [`benefits_${index}_capability`]));
    const included = normalizeInlineMarkers(readString(data, [`benefits_${index}_included`]));

    if (capability || included) {
      benefits.push({
        capability: capability || undefined,
        included: included || undefined,
      });
    }
  }

  return benefits;
}

function readEnterpriseUpgradeFormHtml(value: string): string {
  if (!value) {
    return '';
  }

  if (/\[contact-form-7\b/i.test(value)) {
    return '';
  }

  const iframeSource = value.match(/<iframe\b[^>]*\bsrc=(["'])(.*?)\1/i)?.[2];

  if (iframeSource && /^https:\/\/calendar\.google\.com\/calendar\/appointments\/schedules\//i.test(iframeSource)) {
    const escapedSource = escapeHtmlAttribute(iframeSource);

    return `<iframe class="enterprise-upgrade__embed" src="${escapedSource}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  }

  return sanitizeEnterpriseRichHtml(value);
}

function sanitizeEnterpriseRichHtml(value: string): string {
  return value
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/\son[a-z]+=(["'])[\s\S]*?\1/gi, '')
    .replace(/\sstyle=(["'])[\s\S]*?\1/gi, '')
    .trim();
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function toChannelsGridBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const cards = readChannelsGridCards(data);
  const displayCards = cards.length ? cards : defaultChannelsGridCards;

  if (!displayCards.length) {
    return { reason: 'Channels grid source block has no cards.' };
  }

  return {
    block: {
      type: 'channels-grid',
      title: readChannelsGridTitle(data) || 'One AI Recruiting Agent.||Every Channel Your Cleaning Candidates Use.',
      gradientText: readString(data, ['gradient_text']) || 'One AI Recruiting Agent.',
      description: normalizeInlineMarkers(readString(data, ['description']) || 'Cleaning applicants do not all communicate the same way. The agent meets each one where they are.'),
      cards: displayCards,
    },
  };
}

function toFeatureStackBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const cards = readFeatureStackCards(data);
  const title = normalizeInlineMarkers(readString(data, ['title']));
  const description = readString(data, ['description']);
  const infoNote = readString(data, ['info_note']);

  if (!cards.length && !title && !description && !infoNote) {
    return { reason: 'Empty feature-stack source block.', skipped: true };
  }

  return {
    block: {
      type: 'feature-stack',
      title: title || undefined,
      description: description || undefined,
      cards,
      infoNote: infoNote || undefined,
    },
  };
}

function toCoverageGridBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const cards = readCoverageGridCards(data);
  const eyebrow = readString(data, ['eyebrow']);
  const title = normalizeInlineMarkers(readString(data, ['title']));
  const description = readString(data, ['description']);

  if (!cards.length && !eyebrow && !title && !description) {
    return { reason: 'Empty coverage-grid source block.', skipped: true };
  }

  return {
    block: {
      type: 'coverage-grid',
      eyebrow: eyebrow || undefined,
      title: title || undefined,
      description: description || undefined,
      cards,
    },
  };
}

function toFeatureRowsBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const rows = readFeatureRows(data).slice(0, 3);

  if (rows.length < 3) {
    return { reason: 'Feature rows requires exactly three source rows.' };
  }

  if (isHomepageCapabilityTrioRows(source, rows)) {
    return {
      block: {
        type: 'capability-trio',
        title: 'Set Up, Test, and Launch {{ Real Automation }}||Without an Engineering Team',
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
            highlighted: false,
          },
          {
            icon: 'brain-circuit',
            title: 'Cognitive AI Agents',
            description: 'They check live systems and resolve requests mid-conversation',
            highlighted: false,
          },
        ],
      },
    };
  }

  return {
    block: {
      type: 'feature-rows',
      variant: readString(data, ['variant']) === 'builder' ? 'builder' : 'capabilities',
      rows,
    },
  };
}

function toCapabilityTrioBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const cards = readCapabilityTrioCards(data);
  const title = normalizeInlineMarkers(readString(data, ['title']));
  const centerLabel = readString(data, ['center_label']) || 'Deterministic workflow engine';

  if (cards.length < 3) {
    return { reason: 'Capability trio requires exactly three source cards.' };
  }

  return {
    block: {
      type: 'capability-trio',
      title: title || undefined,
      centerLabel,
      cards,
    },
  };
}

function readCapabilityTrioCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'capability-trio' }>['cards'] {
  const count = Math.min(readCount(data, 'cards'), 3);
  const cards: Extract<PageBlock, { type: 'capability-trio' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`cards_${index}_title`]);
    const description = normalizeInlineMarkers(readString(data, [`cards_${index}_description`]));

    if (!title && !description) {
      continue;
    }

    cards.push({
      icon: readCapabilityTrioIcon(readString(data, [`cards_${index}_icon`])),
      customIcon: readImage(data, [`cards_${index}_custom_icon`]),
      title: title || undefined,
      description: description || undefined,
      highlighted: readBoolean(data, [`cards_${index}_highlighted`], false),
    });
  }

  return cards;
}

function readCapabilityTrioIcon(icon: string): 'messages-square' | 'orbit' | 'brain-circuit' {
  return icon === 'orbit' || icon === 'brain-circuit' ? icon : 'messages-square';
}

function isHomepageCapabilityTrioRows(source: SourceBlock, rows: Array<{ title?: string }>): boolean {
  if (
    source.name !== 'feature-rows'
    || source.sourceName !== 'acme/feature-rows'
    || source.root?.anchor
  ) {
    return false;
  }

  const titles = rows.map((row) => row.title?.trim().toLowerCase()).join('|');
  return titles === 'conversational ai|virtual employees|deterministic automation';
}

function toCapabilityToolsBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const cards = readCapabilityToolsCards(data);

  if (!cards.length) {
    return { reason: 'Capability tools source block has no cards.', skipped: true };
  }

  return {
    block: {
      type: 'capability-tools',
      eyebrow: readString(data, ['eyebrow']) || undefined,
      title: normalizeInlineMarkers(readString(data, ['title'])) || undefined,
      description: normalizeInlineMarkers(readString(data, ['description'])) || undefined,
      cards,
    },
  };
}

function readCapabilityToolsCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'capability-tools' }>['cards'] {
  const count = Math.min(readCount(data, 'cards'), 12);
  const cards: Extract<PageBlock, { type: 'capability-tools' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = normalizeInlineMarkers(readString(data, [`cards_${index}_title`]));
    const description = normalizeInlineMarkers(readString(data, [`cards_${index}_description`]));

    if (!title && !description) {
      continue;
    }

    const logoCount = Math.min(readCount(data, `cards_${index}_logos`), 6);
    const logos = Array.from({ length: logoCount }, (_, logoIndex) =>
      readImage(data, [`cards_${index}_logos_${logoIndex}_image`]),
    ).filter((logo): logo is NonNullable<typeof logo> => Boolean(logo));

    cards.push({
      title: title || undefined,
      description: description || undefined,
      href: readUrl(data, [`cards_${index}_url`]) || undefined,
      logos,
      extraTools: readInteger(data, [`cards_${index}_logos_extra`], 0, 0, 999),
    });
  }

  return cards;
}

function toUseCasesGridBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const cards = readUseCasesGridCards(data);
  const title = normalizeInlineMarkers(readString(data, ['title']));
  const description = readString(data, ['description']);
  const eyebrow = readString(data, ['eyebrow']);

  if (!cards.length && !title && !description && !eyebrow) {
    return { reason: 'Empty use-cases-grid source block.', skipped: true };
  }

  return {
    block: {
      type: 'use-cases-grid',
      eyebrow: eyebrow || undefined,
      title: title || undefined,
      description: description || undefined,
      cards,
    },
  };
}

function toSecurityBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const cards = readSecurityCards(data);

  return {
    block: {
      type: 'security',
      background: readString(data, ['background']) === 'gray' ? 'gray' : 'white',
      title: readString(data, ['title']) || 'Enterprise-Grade',
      titleGradient: readString(data, ['title_gradient']) || 'Security & Compliance',
      subtitle: readString(data, ['subtitle']) || undefined,
      cards: cards.length ? cards : defaultSecurityCards,
    },
  };
}

function toFunctionalCapabilitiesBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const preset = readFunctionalCapabilityPreset(readString(data, ['preset']));
  const presetData = defaultFunctionalCapabilityPresets[preset];
  const cards = readFunctionalCapabilityCards(data);
  const displayCards = cards.length ? cards : presetData.cards;

  if (!displayCards.length) {
    return { reason: 'Functional capabilities source block has no cards.' };
  }

  return {
    block: {
      type: 'functional-capabilities',
      preset,
      eyebrow: readString(data, ['eyebrow']) || presetData.eyebrow || undefined,
      title: normalizeInlineMarkers(readString(data, ['title']) || presetData.title || ''),
      description: readString(data, ['description']) || presetData.description || undefined,
      cards: displayCards,
      note: readString(data, ['note']) || presetData.note || undefined,
    },
  };
}

function readFeatureRows(data: Record<string, unknown>) {
  const count = readCount(data, 'rows');
  const rows: Array<{ eyebrow?: string; title?: string; description?: string }> = [];

  for (let index = 0; index < count; index += 1) {
    const row = {
      eyebrow: readString(data, [`rows_${index}_eyebrow`]) || undefined,
      title: readString(data, [`rows_${index}_title`]) || undefined,
      description: normalizeInlineMarkers(readString(data, [`rows_${index}_description`])) || undefined,
    };

    if (row.eyebrow || row.title || row.description) {
      rows.push(row);
    }
  }

  return rows;
}

function readUseCasesGridCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'use-cases-grid' }>['cards'] {
  const count = Math.min(readCount(data, 'cards'), 24);
  const cards: Extract<PageBlock, { type: 'use-cases-grid' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`cards_${index}_title`]);
    const description = readString(data, [`cards_${index}_description`]);

    if (!title && !description) {
      continue;
    }

    const href = readUrl(data, [`cards_${index}_url`]);

    cards.push({
      icon: readString(data, [`cards_${index}_icon`]) || undefined,
      customIcon: readImage(data, [`cards_${index}_custom_icon`]),
      title: title || undefined,
      description: description || undefined,
      href: href || undefined,
    });
  }

  return cards;
}

function readChannelsGridCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'channels-grid' }>['cards'] {
  const count = Math.min(readCount(data, 'cards'), 12);
  const cards: Extract<PageBlock, { type: 'channels-grid' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`cards_${index}_title`]);
    const description = readString(data, [`cards_${index}_description`]);
    const image = readImage(data, [`cards_${index}_image`]);

    if (!title && !description && !image) {
      continue;
    }

    const href = readUrl(data, [`cards_${index}_url`]);

    cards.push({
      icon: readChannelsGridIcon(readString(data, [`cards_${index}_icon`])),
      customIcon: readImage(data, [`cards_${index}_custom_icon`]),
      title: normalizeInlineMarkers(title) || undefined,
      href: href || undefined,
      description: description || undefined,
      image,
      fullWidth: readBoolean(data, [`cards_${index}_full_width`], false),
    });
  }

  return cards;
}

function readChannelsGridTitle(data: Record<string, unknown>): string {
  const title = readString(data, ['title']);
  const gradientText = readString(data, ['gradient_text']);

  if (!title) {
    return '';
  }

  let markedTitle = title.replace(/\r?\n/g, '||');

  if (!markedTitle.includes('{{') && !markedTitle.includes('<') && gradientText) {
    markedTitle = markedTitle.includes(gradientText)
      ? markedTitle.replace(gradientText, `{{ ${gradientText} }}`)
      : `${markedTitle} {{ ${gradientText} }}`;
  }

  return normalizeInlineMarkers(markedTitle);
}

function readChannelsGridIcon(icon: string): string {
  return icon || 'sms';
}

function readFeatureGridCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'feature-grid' }>['cards'] {
  const count = Math.min(readCount(data, 'cards'), 12);
  const cards: Extract<PageBlock, { type: 'feature-grid' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`cards_${index}_title`]);
    const description = readString(data, [`cards_${index}_description`]);

    if (!title && !description) {
      continue;
    }

    cards.push({
      icon: readFeatureGridIcon(readString(data, [`cards_${index}_icon`])),
      customIcon: readImage(data, [`cards_${index}_custom_icon`]),
      title: title || undefined,
      description: description || undefined,
    });
  }

  return cards;
}

function readFeatureGridBackground(data: Record<string, unknown>): 'white' | 'gray' {
  return readString(data, ['background']) === 'gray' ? 'gray' : 'white';
}

function readFeatureGridColumns(data: Record<string, unknown>): 2 | 3 | 4 {
  const columns = readString(data, ['columns']);
  return columns === '2' || columns === '3' ? Number(columns) : 4;
}

function readFeatureGridIcon(icon: string): string {
  const allowed = new Set([
    'wrench',
    'messages-square',
    'bot',
    'file-stack',
    'audio-lines',
    'smartphone',
    'multi-agent',
    'add-business',
    'design-services',
    'message-circle-heart',
    'network',
    'align-end-horizontal',
    'cog',
    'sparkles',
    'shield-check',
    'globe',
    'users',
    'zap',
    'shopping-cart',
    'hand-coins',
    'graduation-cap',
    'hospital',
    'sun',
    'blocks',
    'refresh-cw',
    'message-square-text',
  ]);

  return allowed.has(icon) ? icon : 'wrench';
}

function readFeatureStackCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'feature-stack' }>['cards'] {
  const count = Math.min(readCount(data, 'cards'), 8);
  const cards: Extract<PageBlock, { type: 'feature-stack' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`cards_${index}_title`]);
    const description = readString(data, [`cards_${index}_description`]);

    if (!title && !description) {
      continue;
    }

    const href = readUrl(data, [`cards_${index}_url`]);

    cards.push({
      icon: readFeatureStackIcon(readString(data, [`cards_${index}_icon`])),
      customIcon: readImage(data, [`cards_${index}_custom_icon`]),
      title: title || undefined,
      description: description || undefined,
      href: href || undefined,
    });
  }

  return cards;
}

function readFeatureStackIcon(icon: string): string {
  const allowed = new Set(['network', 'shield-ellipsis', 'database', 'brain', 'shield-check', 'gauge', 'cpu', 'zap']);

  return allowed.has(icon) ? icon : 'network';
}

function readCoverageGridCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'coverage-grid' }>['cards'] {
  const count = Math.min(readCount(data, 'cards'), 12);
  const cards: Extract<PageBlock, { type: 'coverage-grid' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`cards_${index}_title`]);
    const description = readString(data, [`cards_${index}_description`]);

    if (!title && !description) {
      continue;
    }

    const href = readUrl(data, [`cards_${index}_url`]);

    cards.push({
      icon: readCoverageGridIcon(readString(data, [`cards_${index}_icon`])),
      customIcon: readImage(data, [`cards_${index}_custom_icon`]),
      title: title || undefined,
      description: description || undefined,
      href: href || undefined,
    });
  }

  return cards;
}

function readCoverageGridIcon(icon: string): string {
  const allowed = new Set(['flame', 'wind', 'fan', 'refrigerator', 'home', 'store', 'building', 'factory']);

  return allowed.has(icon) ? icon : 'flame';
}

function readSecurityCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'security' }>['cards'] {
  const count = Math.min(readCount(data, 'cards'), 12);
  const cards: Extract<PageBlock, { type: 'security' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const fallback = defaultSecurityCards[index % defaultSecurityCards.length]!;
    const title = readString(data, [`cards_${index}_title`]);
    const description = readString(data, [`cards_${index}_description`]);

    if (!title && !description) {
      continue;
    }

    cards.push({
      icon: readSecurityIcon(readString(data, [`cards_${index}_icon`]) || fallback.icon || 'shield_ellipsis'),
      customIcon: readImage(data, [`cards_${index}_custom_icon`]),
      title: title || undefined,
      description: description || undefined,
    });
  }

  return cards;
}

function readSecurityIcon(icon: string): Extract<PageBlock, { type: 'security' }>['cards'][number]['icon'] {
  if (
    icon === 'database_zap' ||
    icon === 'file_key' ||
    icon === 'shield_ellipsis' ||
    icon === 'text_search' ||
    icon === 'file_search'
  ) {
    return icon;
  }

  return 'shield_ellipsis';
}

function readFunctionalCapabilityCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'functional-capabilities' }>['cards'] {
  const count = Math.min(readCount(data, 'cards'), 16);
  const cards: Extract<PageBlock, { type: 'functional-capabilities' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`cards_${index}_title`]);
    const description = readString(data, [`cards_${index}_description`]);

    if (!title && !description) {
      continue;
    }

    cards.push({
      icon: readFunctionalCapabilityIcon(readString(data, [`cards_${index}_icon`])),
      customIcon: readImage(data, [`cards_${index}_custom_icon`]),
      title: title || undefined,
      description: description || undefined,
      channels: readString(data, [`cards_${index}_channels`]) || undefined,
      width: readString(data, [`cards_${index}_width`]) === 'wide' ? 'wide' : 'default',
    });
  }

  return cards;
}

function readFunctionalCapabilityPreset(value: string): Extract<PageBlock, { type: 'functional-capabilities' }>['preset'] {
  if (value === 'service' || value === 'recruiting' || value === 'channels') {
    return value;
  }

  return 'sales';
}

function readFunctionalCapabilityIcon(icon: string): string {
  const allowed = new Set([
    'award',
    'bell',
    'calendar-check-2',
    'calendar-days',
    'calendar-range',
    'clipboard-check',
    'clock',
    'database',
    'file-check-2',
    'file-text',
    'filter',
    'handshake',
    'inbox',
    'message-square',
    'phone-incoming',
    'receipt',
    'repeat-2',
    'send',
    'shield-check',
    'sliders-horizontal',
    'star',
    'triangle-alert',
    'audio-lines',
    'messages-square',
    'smartphone',
    'users',
    'mail',
    'info',
  ]);

  return allowed.has(icon) ? icon : 'filter';
}

function toLiveInDaysBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const items = readLiveInDaysItems(data).slice(0, 8);

  if (items.length < 1) {
    return { reason: 'No live-in-days items after normalized repeater extraction.' };
  }

  return {
    block: {
      type: 'live-in-days',
      eyebrow: readString(data, ['eyebrow']) || undefined,
      description: readString(data, ['description']) || undefined,
      items,
    },
  };
}

function readLiveInDaysItems(data: Record<string, unknown>) {
  const count = readCount(data, 'items');
  const items = [];

  for (let index = 0; index < count; index += 1) {
    const label = readString(data, [`items_${index}_label`]);

    if (!label) {
      continue;
    }

    items.push({
      icon: normalizeLiveInDaysIcon(readString(data, [`items_${index}_icon`])),
      customIcon: readImage(data, [`items_${index}_custom_icon`]),
      label,
    });
  }

  return items.length ? items : [
    { icon: 'code-xml' as const, label: 'No-Code' },
    { icon: 'layout-grid' as const, label: 'Agent Templates' },
    { icon: 'bot-message-square' as const, label: 'AI Concierge' },
    { icon: 'user-round-check' as const, label: 'Human Onboarding' },
  ];
}

function normalizeLiveInDaysIcon(icon: string): 'code-xml' | 'layout-grid' | 'bot-message-square' | 'user-round-check' {
  if (icon === 'layout-grid' || icon === 'bot-message-square' || icon === 'user-round-check') {
    return icon;
  }

  return 'code-xml';
}

function toCapabilityStripBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const items = readCapabilityStripItems(data, ['items']).slice(0, 8);
  const title = normalizeInlineMarkers(combineTitle(data));
  const background = readString(data, ['background']);

  if (items.length < 2) {
    return { reason: 'Less than two capability labels after normalized repeater extraction.' };
  }

  return {
    block: {
      type: 'capability-strip',
      eyebrow: readString(data, ['eyebrow', 'label']) || undefined,
      title: title || undefined,
      description: normalizeInlineMarkers(readString(data, ['description', 'subtitle', 'text'])) || undefined,
      background: background === 'gray' || background === 'muted' ? 'gray' : 'white',
      items,
    },
  };
}

function toMetricsBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const items = readMetrics(data, ['items', 'stats', 'cards']).slice(0, 12);

  if (items.length < 2) {
    return { reason: 'Less than two metric items after normalized repeater extraction.' };
  }

  return {
    block: {
      type: 'metrics',
      eyebrow: readString(data, ['eyebrow', 'label']) || undefined,
      title: normalizeInlineMarkers(combineTitle(data) || titleFromSource(source.name)),
      description: readString(data, ['description', 'subtitle']) || undefined,
      background: readBackground(data),
      items,
      note: readString(data, ['info_note', 'note', 'info']) || undefined,
    },
  };
}

function toResultsStatsBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const items = readResultsStatsItems(data).slice(0, 8);

  if (items.length < 2) {
    return { reason: 'Less than two results-stats items after source repeater extraction.' };
  }

  return {
    block: {
      type: 'results-stats',
      background: readString(data, ['background']) === 'gray' ? 'gray' : 'white',
      title: normalizeInlineMarkers(readString(data, ['title']) || titleFromSource(source.name)),
      items,
      infoNote: normalizeInlineMarkers(readString(data, ['info_note'])) || undefined,
    },
  };
}

function toStatsCardsBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const items = readStatsCardsItems(data).slice(0, 8);

  if (items.length < 2) {
    return { reason: 'Less than two stats-cards items after source repeater extraction.' };
  }

  return {
    block: {
      type: 'stats-cards',
      background: readString(data, ['background']) === 'gray' ? 'gray' : 'white',
      title: normalizeInlineMarkers(readString(data, ['title']) || titleFromSource(source.name)),
      subtitle: normalizeInlineMarkers(readString(data, ['subtitle'])) || undefined,
      items,
    },
  };
}

function toCtaBlock(source: SourceBlock): PageBlock {
  const data = source.data;

  return {
    type: 'cta',
    eyebrow: readString(data, ['eyebrow', 'label']) || undefined,
    title: stripGradientMarkers(normalizeInlineMarkers(combineTitle(data) || titleFromSource(source.name))),
    description: readString(data, ['description', 'subtitle', 'text']) || undefined,
    primaryAction: readAction(data, ['button', 'primary_button', 'primaryAction']),
    secondaryAction: readAction(data, ['secondary_button', 'secondaryAction']),
  };
}

function toFaqBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const items = readFaqItems(data, ['manual_items', 'items', 'faqs']).slice(0, 16);

  if (items.length < 2) {
    const mode = readString(data, ['source']);

    if (mode === 'cpt') {
      return { reason: 'FAQ collection mode needs FAQ item extraction.' };
    }

    return { reason: 'Skipped empty FAQ source shell.', skipped: true };
  }

  return {
    block: {
      type: 'faq',
      title: readString(data, ['title']) || 'Frequently Asked Questions about',
      titleGradient: readString(data, ['title_gradient']) || undefined,
      description: readString(data, ['description', 'subtitle']) || undefined,
      searchPlaceholder: readString(data, ['search_placeholder']) || undefined,
      items: items.map((item) => ({
        ...item,
        question: normalizeInlineMarkers(item.question),
      })),
    },
  };
}

function toContentFeedBlock(source: SourceBlock): PageBlock {
  const data = source.data;

  return {
    type: 'news-insights',
    title: normalizeContentFeedTitle(normalizeInlineMarkers(combineTitle(data) || titleFromSource(source.name))),
    description: normalizeInlineMarkers(readString(data, ['description', 'subtitle', 'text'])) || undefined,
    mode: 'latest',
    collections: ['posts', 'news'],
    limit: readInteger(data, ['posts_count', 'limit', 'count'], 3, 1, 12),
    cards: [],
  };
}

function toPricingCardsBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const cards = readPricingCards(data);
  const hasManualCards = cards.length > 0;
  const background = readString(data, ['background']);
  const title = normalizeInlineMarkers(readString(data, ['title']));
  const description = normalizeInlineMarkers(readString(data, ['description']));
  const eyebrow = readString(data, ['eyebrow']);
  const info = readString(data, ['info']);

  return {
    block: {
      ...defaultPricingCards,
      eyebrow: eyebrow || undefined,
      title: title || defaultPricingCards.title,
      description: description || defaultPricingCards.description,
      background: background === 'white' ? 'white' : background === 'gray' ? 'gray' : defaultPricingCards.background,
      cards: hasManualCards ? cards : defaultPricingCards.cards,
      info: info || undefined,
    },
  };
}

function toPricingDetailsBlock(source: SourceBlock): BlockTransformResult {
  const section = readPricingDetailsSection(source.data);

  return {
    block: {
      type: 'pricing-details',
      sections: section ? [section] : defaultPricingDetailsSections,
    },
  };
}

function toDifferenceBlock(source: SourceBlock): PageBlock {
  const data = source.data;
  const leftItems = readTextRepeater(data, 'left_items');
  const rightItems = readTextRepeater(data, 'right_items');

  return {
    ...defaultDifferenceBlock,
    title: normalizeDifferenceTitle(readString(data, ['title']) || defaultDifferenceBlock.title),
    subtitle: readString(data, ['subtitle']) || defaultDifferenceBlock.subtitle,
    leftTitle: readString(data, ['left_title']) || defaultDifferenceBlock.leftTitle,
    rightTitle: readString(data, ['right_title']) || defaultDifferenceBlock.rightTitle,
    leftItems: leftItems.length ? leftItems : defaultDifferenceBlock.leftItems,
    rightItems: rightItems.length ? rightItems : defaultDifferenceBlock.rightItems,
    action: readAction(data, ['button']) || defaultDifferenceBlock.action,
  };
}

function toPainPointsComparisonBlock(source: SourceBlock): PageBlock {
  const data = source.data;
  const rows = readPainPointRows(data);
  const background = readString(data, ['background']);
  const title = normalizeInlineMarkers(readString(data, ['title']) || defaultPainPointsComparisonBlock.title);

  return {
    ...defaultPainPointsComparisonBlock,
    background: background === 'gray' ? 'gray' : 'white',
    eyebrow: readString(data, ['eyebrow']) || undefined,
    title,
    showColumnHeadings: readBoolean(data, ['show_column_headings'], defaultPainPointsComparisonBlock.showColumnHeadings),
    leftHeading: readString(data, ['left_heading']) || defaultPainPointsComparisonBlock.leftHeading,
    rightHeading: readString(data, ['right_heading']) || defaultPainPointsComparisonBlock.rightHeading,
    rows: rows.length ? rows : defaultPainPointsComparisonBlock.rows,
    action: readAction(data, ['button']),
  };
}

function toPricingPolicyBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const title = normalizeInlineMarkers(readString(data, ['title']));
  const callouts = readPricingPolicyCallouts(data);
  const info = readString(data, ['info']);

  if (!title && !callouts.length && !info) {
    return { reason: 'Pricing policy block has no title, callouts, or info.' };
  }

  const background = readString(data, ['background']);

  return {
    block: {
      type: 'pricing-policy',
      background: background === 'gray' ? 'gray' : 'white',
      title: title || undefined,
      callouts,
      info: info || undefined,
    },
  };
}

function toIndustryExpertiseBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const title = normalizeInlineMarkers(readString(data, ['title']) || titleFromSource(source.name));
  const items = readIndustryExpertiseItems(data);

  if (!items.length) {
    return { reason: 'Industry expertise block has no tab items.' };
  }

  const visualType = readString(data, ['visual_type']);

  return {
    block: {
      type: 'industry-expertise',
      eyebrow: readString(data, ['eyebrow']) || undefined,
      title,
      subtitle: normalizeInlineMarkers(readString(data, ['subtitle'])) || undefined,
      visualType: visualType === 'platform' || visualType === 'capabilities' ? visualType : 'industry',
      button: readAction(data, ['button']),
      hideBottomControls: readBoolean(data, ['hide_bottom_controls'], false),
      autoplay: readBoolean(data, ['autoplay'], true),
      autoplayInterval: readInteger(data, ['autoplay_interval'], 5, 1, 30),
      items,
      infoCards: readIndustryInfoCards(data),
    },
  };
}

function toLogoStripBlock(source: SourceBlock): PageBlock {
  const data = source.data;
  const logos = readLogoStripLogos(data);

  return {
    type: 'logo-strip',
    eyebrow: readString(data, ['eyebrow']) || undefined,
    title: normalizeInlineMarkers(readString(data, ['title'])) || undefined,
    description: normalizeInlineMarkers(readString(data, ['description'])) || undefined,
    logos: logos.length ? logos : defaultIntegrationLogos(source),
    stats: readLogoStripStats(data),
  };
}

function toIntegrationsBannerBlock(source: SourceBlock): PageBlock {
  const data = source.data;

  return {
    type: 'integrations-banner',
    title: normalizeInlineMarkers(readString(data, ['title'])) || undefined,
    description: normalizeInlineMarkers(readString(data, ['description'])) || undefined,
    items: readIntegrationsBannerItems(data),
  };
}

function toLogoGridBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const columns = readLogoGridColumns(data);

  if (!columns.length) {
    return { reason: 'Logo grid block has no columns after normalized extraction.' };
  }

  return {
    block: {
      type: 'logo-grid',
      eyebrow: readString(data, ['eyebrow']) || undefined,
      title: normalizeInlineMarkers(readString(data, ['title'])) || undefined,
      description: normalizeInlineMarkers(readString(data, ['description'])) || undefined,
      columns,
    },
  };
}

function toTabsShowcaseBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const tabs = readTabsShowcaseTabs(data);

  if (!tabs.length) {
    return { reason: 'Tabs showcase block has no tabs after normalized extraction.' };
  }

  const background = readString(data, ['background']);

  return {
    block: {
      type: 'tabs-showcase',
      background: background === 'white' ? 'white' : 'gray',
      eyebrow: readString(data, ['eyebrow']) || undefined,
      title: normalizeInlineMarkers(readString(data, ['title'])) || undefined,
      subtitle: normalizeInlineMarkers(readString(data, ['subtitle'])) || undefined,
      autoplaySeconds: readInteger(data, ['autoplay_seconds'], 0, 0, 30),
      tabs,
    },
  };
}

function toAnchorNavBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const items = readAnchorNavItems(data);

  if (!items.length) {
    return { reason: 'Anchor nav block has no labeled items after normalized extraction.' };
  }

  const background = readString(data, ['background']);

  return {
    block: {
      type: 'anchor-nav',
      background: background === 'gray' ? 'gray' : 'white',
      items,
    },
  };
}

function toTestimonialsBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  let items = readTestimonialsItems(data);

  if (!items.length) {
    const mode = readString(data, ['source']);

    if (mode !== 'cpt') {
      return { reason: 'Skipped empty testimonials source shell.', skipped: true };
    }

    const limit = readInteger(data, ['posts_per_page'], 6, 1, 12);
    items = fallbackTestimonials.slice(0, limit);

    if (!items.length) {
      return {
        reason: 'Testimonials collection mode needs testimonial CPT extraction.',
      };
    }
  }

  return {
    block: {
      type: 'testimonials',
      title: normalizeInlineMarkers(readString(data, ['title'])) || undefined,
      subtitle: normalizeInlineMarkers(readString(data, ['subtitle'])) || undefined,
      items,
    },
  };
}

function toComparisonGridBlock(source: SourceBlock): BlockTransformResult {
  const cards = readComparisonCards(source.data);

  if (!cards.length) {
    return { reason: 'Comparison grid block has no cards after normalized extraction.' };
  }

  return {
    block: {
      type: 'comparison-grid',
      cards,
    },
  };
}

function toUseCaseFlowBlock(source: SourceBlock): BlockTransformResult {
  const data = source.data;
  const columns = readUseCaseFlowColumns(data);

  if (!columns.length) {
    return { reason: 'Use-case flow block has no columns after normalized extraction.' };
  }

  const background = readString(data, ['background']);

  return {
    block: {
      type: 'use-case-flow',
      eyebrow: normalizeInlineMarkers(readString(data, ['eyebrow'])) || undefined,
      title: normalizeInlineMarkers(readString(data, ['title'])) || undefined,
      description: normalizeInlineMarkers(readString(data, ['description'])) || undefined,
      background: background === 'white' ? 'white' : 'gray',
      columns,
    },
  };
}

function readUseCaseFlowColumns(data: Record<string, unknown>): Extract<PageBlock, { type: 'use-case-flow' }>['columns'] {
  const count = Math.min(readCount(data, 'columns'), 4);
  const columns: Extract<PageBlock, { type: 'use-case-flow' }>['columns'] = [];

  for (let columnIndex = 0; columnIndex < count; columnIndex += 1) {
    const label = normalizeInlineMarkers(readString(data, [`columns_${columnIndex}_label`]));
    const items = readUseCaseFlowItems(data, `columns_${columnIndex}_items`);

    if (items.length) {
      columns.push({
        label: label || undefined,
        items,
      });
    }
  }

  return columns;
}

function readUseCaseFlowItems(data: Record<string, unknown>, prefix: string): Extract<PageBlock, { type: 'use-case-flow' }>['columns'][number]['items'] {
  const count = Math.min(readCount(data, prefix), 8);
  const items: Extract<PageBlock, { type: 'use-case-flow' }>['columns'][number]['items'] = [];

  for (let index = 0; index < count; index += 1) {
    const text = normalizeInlineMarkers(readString(data, [`${prefix}_${index}_text`]));

    if (text) {
      items.push({ text });
    }
  }

  return items;
}

function readComparisonCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'comparison-grid' }>['cards'] {
  const count = Math.min(readCount(data, 'cards'), 24);
  const cards: Extract<PageBlock, { type: 'comparison-grid' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = normalizeInlineMarkers(readString(data, [`cards_${index}_title`]));
    const description = normalizeInlineMarkers(readString(data, [`cards_${index}_description`]));
    const action = readAction(data, [`cards_${index}_button`]);

    if (title || description) {
      cards.push({
        title: title || undefined,
        description: description || undefined,
        action,
      });
    }
  }

  return cards;
}

function readTestimonialsItems(data: Record<string, unknown>): Extract<PageBlock, { type: 'testimonials' }>['items'] {
  const count = Math.min(readCount(data, 'items'), 12);
  const items: Extract<PageBlock, { type: 'testimonials' }>['items'] = [];

  for (let index = 0; index < count; index += 1) {
    const quote = normalizeInlineMarkers(readString(data, [`items_${index}_quote`]));
    const authorName = readString(data, [`items_${index}_author_name`]);
    const authorRole = readString(data, [`items_${index}_author_role`]);
    const authorImage = readImage(data, [`items_${index}_author_image`]);

    if (quote || authorName || authorRole || authorImage) {
      items.push({
        quote: quote || undefined,
        authorName: authorName || undefined,
        authorRole: authorRole || undefined,
        authorImage,
      });
    }
  }

  return items;
}

function dedupeTestimonials(items: Extract<PageBlock, { type: 'testimonials' }>['items']): Extract<PageBlock, { type: 'testimonials' }>['items'] {
  const seen = new Set<string>();
  const unique: Extract<PageBlock, { type: 'testimonials' }>['items'] = [];

  for (const item of items) {
    const key = [
      item.quote ?? '',
      item.authorName ?? '',
      item.authorRole ?? '',
    ].join('\u001f');

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    unique.push(item);
  }

  return unique;
}

function readAnchorNavItems(data: Record<string, unknown>): Extract<PageBlock, { type: 'anchor-nav' }>['items'] {
  const count = Math.min(readCount(data, 'items'), 16);
  const items: Extract<PageBlock, { type: 'anchor-nav' }>['items'] = [];

  for (let index = 0; index < count; index += 1) {
    const label = normalizeInlineMarkers(readString(data, [`items_${index}_label`]));

    if (!label) {
      continue;
    }

    items.push({
      icon: readString(data, [`items_${index}_icon`]) || undefined,
      label,
      anchor: normalizeAnchorId(readString(data, [`items_${index}_anchor`])) || undefined,
    });
  }

  return items;
}

function readTabsShowcaseTabs(data: Record<string, unknown>): Extract<PageBlock, { type: 'tabs-showcase' }>['tabs'] {
  const count = Math.min(readCount(data, 'tabs'), 8);
  const tabs: Extract<PageBlock, { type: 'tabs-showcase' }>['tabs'] = [];

  for (let index = 0; index < count; index += 1) {
    const label = readString(data, [`tabs_${index}_label`]);
    const steps = readTabsShowcaseSteps(data, `tabs_${index}_steps`);

    if (!label || !steps.length) {
      continue;
    }

    tabs.push({
      label,
      icon: readString(data, [`tabs_${index}_icon`]) || undefined,
      customIcon: readImage(data, [`tabs_${index}_custom_icon`]),
      steps,
    });
  }

  return tabs;
}

function readTabsShowcaseSteps(data: Record<string, unknown>, prefix: string): Extract<PageBlock, { type: 'tabs-showcase' }>['tabs'][number]['steps'] {
  const count = Math.min(readCount(data, prefix), 8);
  const steps: Extract<PageBlock, { type: 'tabs-showcase' }>['tabs'][number]['steps'] = [];

  for (let index = 0; index < count; index += 1) {
    const text = normalizeInlineMarkers(readString(data, [`${prefix}_${index}_text`]));

    if (!text) {
      continue;
    }

    steps.push({
      text,
      icon: readString(data, [`${prefix}_${index}_icon`]) || undefined,
      customIcon: readImage(data, [`${prefix}_${index}_custom_icon`]),
    });
  }

  return steps;
}

function readLogoStripLogos(data: Record<string, unknown>): Extract<PageBlock, { type: 'logo-strip' }>['logos'] {
  const count = Math.min(readCount(data, 'logos'), 12);
  const logos: Extract<PageBlock, { type: 'logo-strip' }>['logos'] = [];

  for (let index = 0; index < count; index += 1) {
    const label = readString(data, [`logos_${index}_label`, `logos_${index}_title`]);
    const image = readImage(data, [`logos_${index}_image`, `logos_${index}_logo`]);

    if (label || image) {
      logos.push({
        label: label || undefined,
        image,
      });
    }
  }

  return logos;
}

function readIntegrationsBannerItems(data: Record<string, unknown>): Extract<PageBlock, { type: 'integrations-banner' }>['items'] {
  const count = Math.min(readCount(data, 'items'), 32);
  const items: Extract<PageBlock, { type: 'integrations-banner' }>['items'] = [];

  for (let index = 0; index < count; index += 1) {
    const label = readString(data, [`items_${index}_label`]);
    const icon = readImage(data, [`items_${index}_icon`]);

    if (label || icon) {
      items.push({
        label: label || undefined,
        icon,
      });
    }
  }

  return items;
}

function defaultIntegrationLogos(source: SourceBlock): Extract<PageBlock, { type: 'logo-strip' }>['logos'] {
  if (source.name !== 'integrations-banner') {
    return [];
  }

  const labels = [
    'Airtable',
    'Slack',
    'HubSpot',
    'Salesforce',
    'Notion',
    'Gmail',
    'Google Drive',
    'Shopify',
    'Zapier',
    'Microsoft Teams',
    'Zendesk',
    'Stripe',
  ];

  return labels.map((label, index) => ({
    label,
    image: {
      src: `/media/2025/12/integration-${index + 1}.svg`,
      alt: label,
      width: 48,
      height: 48,
    },
  }));
}

function readLogoStripStats(data: Record<string, unknown>): Extract<PageBlock, { type: 'logo-strip' }>['stats'] {
  const count = Math.min(readCount(data, 'stats'), 4);
  const stats: Extract<PageBlock, { type: 'logo-strip' }>['stats'] = [];

  for (let index = 0; index < count; index += 1) {
    const label = readString(data, [`stats_${index}_label`]);
    const value = readString(data, [`stats_${index}_value`]);

    if (label || value) {
      stats.push({
        label: label || undefined,
        value: value || undefined,
      });
    }
  }

  return stats;
}

function readLogoGridColumns(data: Record<string, unknown>): Extract<PageBlock, { type: 'logo-grid' }>['columns'] {
  const count = Math.min(readCount(data, 'columns'), 6);
  const columns: Extract<PageBlock, { type: 'logo-grid' }>['columns'] = [];

  for (let columnIndex = 0; columnIndex < count; columnIndex += 1) {
    const heading = readString(data, [`columns_${columnIndex}_heading`]);
    const items = readLogoGridItems(data, `columns_${columnIndex}_items`);

    if (heading || items.length) {
      columns.push({
        heading: heading || undefined,
        items,
      });
    }
  }

  return columns;
}

function readLogoGridItems(data: Record<string, unknown>, prefix: string): Extract<PageBlock, { type: 'logo-grid' }>['columns'][number]['items'] {
  const count = Math.min(readCount(data, prefix), 12);
  const items: Extract<PageBlock, { type: 'logo-grid' }>['columns'][number]['items'] = [];

  for (let index = 0; index < count; index += 1) {
    const image = readImage(data, [`${prefix}_${index}_image`]);
    const secondaryImage = readImage(data, [`${prefix}_${index}_image_2`]);
    const label = readString(data, [`${prefix}_${index}_label`]);
    const subLabel = readString(data, [`${prefix}_${index}_sub_label`]);
    const url = readString(data, [`${prefix}_${index}_url`]);

    if (image || secondaryImage || label || subLabel) {
      items.push({
        image,
        secondaryImage,
        label: label || undefined,
        subLabel: subLabel || undefined,
        url: url || undefined,
      });
    }
  }

  return items;
}

function readIndustryExpertiseItems(data: Record<string, unknown>): Extract<PageBlock, { type: 'industry-expertise' }>['items'] {
  const count = Math.min(readCount(data, 'items'), 8);
  const items: Extract<PageBlock, { type: 'industry-expertise' }>['items'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`items_${index}_title`]);

    if (!title) {
      continue;
    }

    const icon = readIndustryIcon(readString(data, [`items_${index}_icon`]));
    const customIcon = readString(data, [`items_${index}_custom_icon`]);

    items.push({
      icon,
      customIcon: customIcon || undefined,
      title: normalizeInlineMarkers(title),
      description: normalizeInlineMarkers(readString(data, [`items_${index}_description`])) || undefined,
      image: readImage(data, [`items_${index}_image`]),
    });
  }

  return items;
}

function readIndustryInfoCards(data: Record<string, unknown>): Extract<PageBlock, { type: 'industry-expertise' }>['infoCards'] {
  const count = readCount(data, 'info_cards');
  const cards: Extract<PageBlock, { type: 'industry-expertise' }>['infoCards'] = [];

  for (let index = 0; index < count; index += 1) {
    const card = {
      title: readString(data, [`info_cards_${index}_title`]) || undefined,
      description: readString(data, [`info_cards_${index}_description`]) || undefined,
      source: readString(data, [`info_cards_${index}_source`]) || undefined,
    };

    if (card.title || card.description || card.source) {
      cards.push(card);
    }
  }

  return cards;
}

function readIndustryIcon(icon: string): Extract<PageBlock, { type: 'industry-expertise' }>['items'][number]['icon'] {
  if (
    icon === 'shopping_cart' ||
    icon === 'headset' ||
    icon === 'cloud_cog' ||
    icon === 'hammer' ||
    icon === 'heart_handshake' ||
    icon === 'hotel' ||
    icon === 'brain' ||
    icon === 'layers' ||
    icon === 'wand' ||
    icon === 'globe' ||
    icon === 'users' ||
    icon === 'workflow'
  ) {
    return icon;
  }

  return undefined;
}

function readPricingPolicyCallouts(data: Record<string, unknown>) {
  const count = readCount(data, 'callouts');
  const callouts: Extract<PageBlock, { type: 'pricing-policy' }>['callouts'] = [];

  for (let index = 0; index < count; index += 1) {
    const text = readString(data, [`callouts_${index}_text`]);

    if (!text) {
      continue;
    }

    const icon = readString(data, [`callouts_${index}_icon`]);

    callouts.push({
      icon: icon === 'infinity' || icon === 'headset' || icon === 'info' ? icon : 'wallet',
      text,
    });
  }

  return callouts;
}

function readPainPointRows(data: Record<string, unknown>) {
  const count = readCount(data, 'rows');
  const rows: Extract<PageBlock, { type: 'pain-points-comparison' }>['rows'] = [];

  for (let index = 0; index < count; index += 1) {
    const row = {
      leftTitle: readString(data, [`rows_${index}_left_title`]) || undefined,
      leftDescription: readString(data, [`rows_${index}_left_description`]) || undefined,
      rightTitle: readString(data, [`rows_${index}_right_title`]) || undefined,
      rightDescription: readString(data, [`rows_${index}_right_description`]) || undefined,
    };

    if (row.leftTitle || row.leftDescription || row.rightTitle || row.rightDescription) {
      rows.push(row);
    }
  }

  return rows;
}

function normalizeDifferenceTitle(title: string): string {
  const normalized = normalizeInlineMarkers(title);

  if (normalized.includes('{{') || normalized.includes('<')) {
    return normalized;
  }

  return normalized.replace(/\bAcme\b/, '{{ Acme }}');
}

function readTextRepeater(data: Record<string, unknown>, prefix: string): string[] {
  const count = readCount(data, prefix);
  const items: string[] = [];

  for (let index = 0; index < count; index += 1) {
    const text = readString(data, [`${prefix}_${index}_text`]);

    if (text) {
      items.push(text);
    }
  }

  return items;
}

function readPricingDetailsSection(data: Record<string, unknown>): Extract<PageBlock, { type: 'pricing-details' }>['sections'][number] | undefined {
  const title = normalizeInlineMarkers(readString(data, ['title']));
  const headers = readPricingHeaders(data);
  const rows = readPricingRows(data);
  const info = readString(data, ['info']);
  const note = readString(data, ['note']);
  const hasData = Boolean(title || headers.length || rows.length || info || note);

  if (!hasData) {
    return undefined;
  }

  const background = readString(data, ['background']);
  const variant = readString(data, ['variant']);

  return {
    background: background === 'white' ? 'white' : 'gray',
    variant: variant === 'comparison' ? 'comparison' : 'default',
    title: title || undefined,
    info: info || undefined,
    headers,
    rows,
    note: note || undefined,
  };
}

function readPricingHeaders(data: Record<string, unknown>): string[] {
  const count = readCount(data, 'headers');
  const headers: string[] = [];

  for (let index = 0; index < count; index += 1) {
    const header = readString(data, [`headers_${index}_text`]);

    if (header) {
      headers.push(header);
    }
  }

  return headers;
}

function readPricingRows(data: Record<string, unknown>): Extract<PageBlock, { type: 'pricing-details' }>['sections'][number]['rows'] {
  const count = readCount(data, 'rows');
  const rows: Extract<PageBlock, { type: 'pricing-details' }>['sections'][number]['rows'] = [];

  for (let rowIndex = 0; rowIndex < count; rowIndex += 1) {
    const cells = readPricingCells(data, `rows_${rowIndex}_cells`);

    if (cells.length) {
      rows.push({ cells });
    }
  }

  return rows;
}

function readPricingCells(data: Record<string, unknown>, prefix: string): Extract<PageBlock, { type: 'pricing-details' }>['sections'][number]['rows'][number]['cells'] {
  const count = readCount(data, prefix);
  const cells: Extract<PageBlock, { type: 'pricing-details' }>['sections'][number]['rows'][number]['cells'] = [];

  for (let index = 0; index < count; index += 1) {
    const text = readString(data, [`${prefix}_${index}_text`]);
    const modifiers = readModifiers(data[`${prefix}_${index}_modifiers`]);

    cells.push({
      text,
      strong: modifiers.has('strong'),
      accent: modifiers.has('accent'),
      muted: modifiers.has('muted'),
      stars: modifiers.has('stars'),
    });
  }

  return cells;
}

function readPricingCards(data: Record<string, unknown>) {
  const count = readCount(data, 'cards');
  const cards: Extract<PageBlock, { type: 'pricing-cards' }>['cards'] = [];

  for (let index = 0; index < count; index += 1) {
    const title = readString(data, [`cards_${index}_title`]);
    const features = readPricingFeatures(data, `cards_${index}_features`);

    if (!title && !features.length) {
      continue;
    }

    const accent = readString(data, [`cards_${index}_accent`]);

    cards.push({
      accent: accent === 'dark' ? 'dark' : 'gradient',
      eyebrow: readString(data, [`cards_${index}_eyebrow`]) || undefined,
      title: title || undefined,
      description: readString(data, [`cards_${index}_description`]) || undefined,
      features,
      note: readString(data, [`cards_${index}_note`]) || undefined,
      button: readAction(data, [`cards_${index}_button`]),
    });
  }

  return cards;
}

function readPricingFeatures(data: Record<string, unknown>, prefix: string): string[] {
  const count = readCount(data, prefix);
  const features: string[] = [];

  for (let index = 0; index < count; index += 1) {
    const feature = readString(data, [`${prefix}_${index}_text`]);

    if (feature) {
      features.push(feature);
    }
  }

  return features;
}

function normalizeContentFeedTitle(title: string): string {
  const plainTitle = title
    .replace(/<[^>]*>/g, ' ')
    .replace(/\{\{\s*([^}]+?)\s*\}\}/g, '$1')
    .replace(/\|\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (plainTitle === 'AI Industry News and Insights') {
    return 'AI Industry {{ News }}||and {{ Insights }}';
  }

  return title;
}

function normalizeAnchorId(value: string): string {
  return value.trim().replace(/^#+/, '');
}

function readCards(data: Record<string, unknown>, prefixes: string[]) {
  for (const prefix of prefixes) {
    const count = readCount(data, prefix);
    const cards = [];

    for (let index = 0; index < count; index += 1) {
      const title = readString(data, [
        `${prefix}_${index}_title`,
        `${prefix}_${index}_heading`,
        `${prefix}_${index}_label`,
        `${prefix}_${index}_name`,
      ]);

      if (!title) {
        continue;
      }

      cards.push({
        icon: readString(data, [`${prefix}_${index}_icon`, `${prefix}_${index}_custom_icon`]) || undefined,
        title,
        description: readString(data, [
          `${prefix}_${index}_description`,
          `${prefix}_${index}_text`,
          `${prefix}_${index}_subtitle`,
        ]) || undefined,
        href: readString(data, [`${prefix}_${index}_link`, `${prefix}_${index}_url`]) || undefined,
      });
    }

    if (cards.length) {
      return cards;
    }
  }

  return [];
}

function readMetrics(data: Record<string, unknown>, prefixes: string[]) {
  for (const prefix of prefixes) {
    const count = readCount(data, prefix);
    const items = [];

    for (let index = 0; index < count; index += 1) {
      const value = readString(data, [
        `${prefix}_${index}_value`,
        `${prefix}_${index}_number`,
        `${prefix}_${index}_title`,
      ]);
      const description = readString(data, [
        `${prefix}_${index}_description`,
        `${prefix}_${index}_text`,
        `${prefix}_${index}_label`,
      ]);

      if (!value || !description) {
        continue;
      }

      items.push({
        value,
        description,
        href: readString(data, [`${prefix}_${index}_link`, `${prefix}_${index}_url`]) || undefined,
      });
    }

    if (items.length) {
      return items;
    }
  }

  return [];
}

function readResultsStatsItems(data: Record<string, unknown>) {
  const count = readCount(data, 'items');
  const items: Extract<PageBlock, { type: 'results-stats' }>['items'] = [];

  for (let index = 0; index < count; index += 1) {
    const value = readString(data, [`items_${index}_value`]);
    const description = readString(data, [`items_${index}_description`]);

    if (!value || !description) {
      continue;
    }

    const link = readAction(data, [`items_${index}_link`]);

    items.push({
      value: normalizeInlineMarkers(value),
      description: normalizeInlineMarkers(description),
      link,
    });
  }

  return items;
}

function readStatsCardsItems(data: Record<string, unknown>) {
  const count = readCount(data, 'items');
  const items: Extract<PageBlock, { type: 'stats-cards' }>['items'] = [];

  for (let index = 0; index < count; index += 1) {
    const heading = readString(data, [`items_${index}_heading`]);
    const value = readString(data, [`items_${index}_value`]);
    const label = readString(data, [`items_${index}_label`]);

    if (!heading || !value || !label) {
      continue;
    }

    items.push({
      icon: readString(data, [`items_${index}_icon`]) || undefined,
      heading: normalizeInlineMarkers(heading),
      value: normalizeInlineMarkers(value),
      label: normalizeInlineMarkers(label),
    });
  }

  return items;
}

function readCapabilityStripItems(data: Record<string, unknown>, prefixes: string[]) {
  for (const prefix of prefixes) {
    const count = readCount(data, prefix);
    const items = [];

    for (let index = 0; index < count; index += 1) {
      const label = readString(data, [
        `${prefix}_${index}_label`,
        `${prefix}_${index}_title`,
        `${prefix}_${index}_name`,
      ]);

      if (!label) {
        continue;
      }

      items.push({
        icon: readString(data, [`${prefix}_${index}_icon`]) || undefined,
        customIcon: readImage(data, [`${prefix}_${index}_custom_icon`]),
        label: normalizeInlineMarkers(label),
      });
    }

    if (items.length) {
      return items;
    }
  }

  return [];
}

function readFaqItems(data: Record<string, unknown>, prefixes: string[]) {
  for (const prefix of prefixes) {
    const count = readCount(data, prefix);
    const items = [];

    for (let index = 0; index < count; index += 1) {
      const question = readString(data, [`${prefix}_${index}_question`, `${prefix}_${index}_title`]);
      const answer = readString(data, [`${prefix}_${index}_answer`, `${prefix}_${index}_description`, `${prefix}_${index}_text`]);

      if (!question || !answer) {
        continue;
      }

      items.push({
        question,
        answer,
        category: readString(data, [`${prefix}_${index}_category`]) || undefined,
      });
    }

    if (items.length) {
      return items;
    }
  }

  return [];
}

function readInteger(data: Record<string, unknown>, keys: string[], fallback: number, min: number, max: number): number {
  for (const key of keys) {
    const value = Number(data[key]);

    if (Number.isInteger(value)) {
      return Math.min(Math.max(value, min), max);
    }
  }

  return fallback;
}

function readBoolean(data: Record<string, unknown>, keys: string[], fallback: boolean): boolean {
  for (const key of keys) {
    const value = data[key];

    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'number') {
      return value !== 0;
    }

    if (typeof value === 'string' && value.trim()) {
      return value === '1' || value.toLowerCase() === 'true';
    }
  }

  return fallback;
}

function readModifiers(value: unknown): Set<string> {
  if (Array.isArray(value)) {
    return new Set(value.filter((item): item is string => typeof item === 'string'));
  }

  if (typeof value === 'string') {
    return new Set(value.split(/[,\s]+/).filter(Boolean));
  }

  return new Set();
}

function readCount(data: Record<string, unknown>, prefix: string): number {
  const value = data[prefix];
  const count = typeof value === 'number' ? value : Number(value);

  if (Number.isFinite(count) && count > 0) {
    return count;
  }

  const indexes = Object.keys(data)
    .map((key) => key.match(new RegExp(`^${escapeRegExp(prefix)}_(\\d+)_`))?.[1])
    .filter((value): value is string => Boolean(value))
    .map((value) => Number(value));

  return indexes.length ? Math.max(...indexes) + 1 : 0;
}

function readString(data: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = data[key];

    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }

    if (typeof value === 'number') {
      return String(value);
    }
  }

  return '';
}

function normalizeInlineMarkers(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, '||')
    .replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, '{{$1}}')
    .replace(/<span[^>]*>([^<]*)$/gi, '{{$1}}')
    .replace(/\{\{\s*([^}]+?)\s*\}\}/g, '{{ $1 }}')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripGradientMarkers(value: string): string {
  return value
    .replace(/\{\{\s*([^}]+?)\s*\}\}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function combineTitle(data: Record<string, unknown>): string {
  return [readString(data, ['title', 'heading']), readString(data, ['title_gradient', 'highlight'])]
    .filter(Boolean)
    .join(' ')
    .trim();
}

function readAction(data: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = data[key];

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const object = value as Record<string, unknown>;
      const label = typeof object.title === 'string' ? object.title : typeof object.label === 'string' ? object.label : '';
      const href = typeof object.url === 'string' ? object.url : typeof object.href === 'string' ? object.href : '';
      const target = object.target === '_blank' ? '_blank' : '_self';

      if (label && href) {
        return { label, href: normalizeHref(href), target };
      }
    }
  }

  return undefined;
}

function readUrl(data: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = data[key];

    if (typeof value === 'string' && value.trim()) {
      return normalizeHref(value.trim());
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const object = value as Record<string, unknown>;
      const href = typeof object.url === 'string' ? object.url : typeof object.href === 'string' ? object.href : '';

      if (href.trim()) {
        return normalizeHref(href.trim());
      }
    }
  }

  return '';
}

function normalizeHref(href: string): string {
  try {
    const url = new URL(href);

    if (url.hostname === 'acme.example' || url.hostname === 'www.acme.example') {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return href;
  }

  return href;
}

function readImage(data: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = data[key];

    if (typeof value === 'number') {
      const record = sourceMediaById.get(value);

      if (record) {
        return { id: String(value), src: record.publicPath, alt: record.alt ?? '' };
      }
    }

    if (typeof value === 'string' && value.trim()) {
      const numeric = Number(value);

      if (Number.isFinite(numeric) && String(numeric) === value.trim()) {
        const record = sourceMediaById.get(numeric);

        if (record) {
          return { id: value.trim(), src: record.publicPath, alt: record.alt ?? '' };
        }

        continue;
      }

      return { src: value.trim(), alt: '' };
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const object = value as Record<string, unknown>;
      const src = typeof object.url === 'string' ? object.url : typeof object.src === 'string' ? object.src : '';
      const alt = typeof object.alt === 'string' ? object.alt : '';

      if (src) {
        return { src, alt };
      }
    }
  }

  return undefined;
}

function readSeoImage(data: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = readString(data, [key]);

    if (!value) {
      continue;
    }

    const localized = localizeSourceMediaUrl(value);

    if (localized) {
      return localized;
    }
  }

  return undefined;
}

function localizeSourceMediaUrl(value: string) {
  try {
    const url = new URL(value);
    const uploadsPrefix = '/wp-content/uploads/';

    if ((url.hostname === 'acme.example' || url.hostname === 'www.acme.example') && url.pathname.includes(uploadsPrefix)) {
      const file = decodeURIComponent(url.pathname.slice(url.pathname.indexOf(uploadsPrefix) + uploadsPrefix.length));
      const record = sourceMediaByFile.get(file)
        ?? sourceMediaByFile.get(stripImageSizeVariant(file))
        ?? sourceMediaByFile.get(toScaledImageVariant(file));

      return {
        id: record ? String(record.id) : undefined,
        src: record?.publicPath ?? `/media/${file}`,
        alt: record?.alt ?? '',
      };
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function stripImageSizeVariant(file: string): string {
  return file.replace(/-\d+x\d+(?=\.[^./]+$)/, '');
}

function toScaledImageVariant(file: string): string {
  return file.replace(/-\d+x\d+(?=\.[^./]+$)/, '-scaled');
}

function readBackground(data: Record<string, unknown>): 'white' | 'muted' | 'dark' {
  const value = readString(data, ['background', 'theme', 'style']);

  if (value === 'dark') {
    return 'dark';
  }

  if (value === 'gray' || value === 'grey' || value === 'muted') {
    return 'muted';
  }

  return 'white';
}

function titleFromSource(sourceName: string): string {
  return sourceName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
