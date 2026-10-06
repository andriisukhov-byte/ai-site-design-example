import type { PageBlock } from './schemas';

export type BlockCategory =
  | 'Heroes'
  | 'Grids'
  | 'Proof'
  | 'Content'
  | 'Conversion'
  | 'Navigation';

export type BlockCategoryEntry = {
  category: BlockCategory;
  description: string;
  types: PageBlock['type'][];
};

export const blockCategories: BlockCategoryEntry[] = [
  {
    category: 'Heroes',
    description: 'Top-of-page opening sections and their source variants.',
    types: ['hero', 'hero-extended'],
  },
  {
    category: 'Grids',
    description: 'Card, logo, channel, capability, use-case, and comparison grids.',
    types: [
      'feature-grid',
      'channels-grid',
      'coverage-grid',
      'functional-capabilities',
      'logo-grid',
      'comparison-grid',
      'use-cases-grid',
    ],
  },
  {
    category: 'Proof',
    description: 'Trust, capability, contrast, security, results, and testimonial sections.',
    types: [
      'agent-capabilities',
      'conversation-replay',
      'recovery-calculator',
      'agent-solutions',
      'capability-tools',
      'capability-trio',
      'feature-rows',
      'feature-stack',
      'security',
      'metrics',
      'results-stats',
      'stats-cards',
      'difference',
      'pain-points-comparison',
      'industry-expertise',
      'logo-strip',
      'testimonials',
    ],
  },
  {
    category: 'Content',
    description: 'Narrative, media, article, process, tabs, and use-case flow sections.',
    types: [
      'rich-text',
      'side-by-side',
      'story',
      'media-showcase',
      'how-it-works',
      'tabs-showcase',
      'use-case-flow',
    ],
  },
  {
    category: 'Conversion',
    description: 'CTA, contact, pricing, enterprise, concierge, and launch reassurance sections.',
    types: [
      'cta',
      'contact-us',
      'concierge-flow',
      'enterprise-upgrade',
      'pricing-cards',
      'pricing-details',
      'pricing-policy',
      'live-in-days',
    ],
  },
  {
    category: 'Navigation',
    description: 'FAQ, related content, in-page navigation, and compact capability navigation.',
    types: ['faq', 'news-insights', 'content-feed', 'anchor-nav', 'capability-strip'],
  },
];

export function getBlockCategory(type: PageBlock['type']) {
  return blockCategories.find((entry) => entry.types.includes(type))?.category;
}
