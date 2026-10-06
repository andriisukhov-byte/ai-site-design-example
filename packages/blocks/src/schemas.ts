import { z } from 'zod';

const buttonTargetSchema = z.enum(['_self', '_blank']).default('_self');

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  target: buttonTargetSchema.optional(),
});

export const imageSchema = z.object({
  id: z.string().optional(),
  src: z.string().min(1),
  alt: z.string().default(''),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

const tagSchema = z.union([
  z.string().min(1),
  z.object({
    label: z.string().min(1),
  }),
]);

const featureTextSchema = z.union([
  z.string().min(1),
  z.object({
    text: z.string().min(1),
  }),
]);

const tableHeaderSchema = z.union([
  z.string().min(1),
  z.object({
    text: z.string().min(1),
  }),
]);

export const seoSchema = z.object({
  metaTitle: z.string().min(1).optional(),
  metaDescription: z.string().min(1).optional(),
  canonicalUrl: z.string().min(1).optional(),
  robots: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: imageSchema.optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: imageSchema.optional(),
  schemaJson: z.unknown().optional(),
});

export const articleMetaSchema = z.object({
  category: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).default([]),
  authorName: z.string().min(1).optional(),
  updatedAt: z.string().min(1).optional(),
  readTimeMinutes: z.number().int().min(1).optional(),
  ratingAverage: z.number().min(0).max(5).optional(),
  ratingCount: z.number().int().min(0).optional(),
  views: z.number().int().min(0).optional(),
  showTableOfContents: z.boolean().default(true),
  showTableOfContentsTitle: z.boolean().default(true),
  tableOfContentsTitle: z.string().min(1).default('Contents'),
});

export const tipCardSchema = z.object({
  category: z.string().min(1).optional(),
  archiveWidth: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(1),
  icons: z.array(imageSchema).max(2).default([]),
});

export const contentCollectionSchema = z.enum(['pages', 'posts', 'news', 'guides', 'tips', 'use-cases']);

export const contentTemplateSchema = z.enum([
  'standard',
  'landing',
  'document',
  'article',
  'news',
  'guide',
  'tip',
  'use-case',
  'industry-use-case',
]);

export const blockRootSchema = z.object({
  anchor: z.string().min(1).optional(),
  className: z.string().min(1).optional(),
});

// The default `background` is a convenience for blocks that do not declare one.
// A block's own `background` must win, including wider enums such as the dark
// variant, so the fallback is typed to the union of every background in use.
const withBlockRoot = <Shape extends z.core.$ZodShape>(schema: z.ZodObject<Shape>) => z.object({
  background: z.enum(['white', 'gray', 'dark', 'muted', 'transparent']).optional(),
  ...schema.shape,
  root: blockRootSchema.optional(),
});

export const heroBlockSchema = z.object({
  type: z.literal('hero'),
  variant: z.enum(['default', 'home']).default('default').optional(),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  primaryAction: linkSchema.optional(),
  secondaryAction: linkSchema.optional(),
  primaryNote: z.string().optional(),
  secondaryNote: z.string().optional(),
  backgroundImage: imageSchema.optional(),
  tooltip: z.object({
    label: z.string().min(1),
    action: z.string().optional(),
    title: z.string().optional(),
    content: z.string().optional(),
  }).optional(),
  media: imageSchema.optional(),
  mediaSize: z.enum(['wide', 'tall']).default('wide').optional(),
  cards: z.array(z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    icon: imageSchema.optional(),
  })).default([]).optional(),
});

export const heroExtendedBlockSchema = z.object({
  type: z.literal('hero-extended'),
  variant: z.enum(['default', 'home']).default('default').optional(),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  backgroundImage: imageSchema.optional(),
  media: imageSchema.optional(),
  mediaSize: z.enum(['wide', 'tall']).default('wide').optional(),
  primaryAction: linkSchema.optional(),
  secondaryAction: linkSchema.optional(),
  primaryNote: z.string().optional(),
  secondaryNote: z.string().optional(),
  cards: z.array(z.object({
    icon: imageSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })).default([]).optional(),
});

export const richTextBlockSchema = z.object({
  type: z.literal('rich-text'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  html: z.string().min(1),
});

export const sideBySideBlockSchema = z.object({
  type: z.literal('side-by-side'),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  media: imageSchema.optional(),
  mediaSide: z.enum(['left', 'right']).default('right'),
  sectionEyebrow: z.string().optional(),
  sectionTitle: z.string().optional(),
  sectionSubtitle: z.string().optional(),
  imageSide: z.enum(['left', 'right']).optional(),
  image: imageSchema.optional(),
  background: z.enum(['white', 'gray', 'transparent', 'muted', 'dark']).default('white'),
  cardTitle: z.string().optional(),
  cardSubtitle: z.string().optional(),
  cardDescription: z.string().optional(),
  bullets: z.array(z.object({
    title: z.string().min(1),
    text: z.string().optional(),
    description: z.string().optional(),
  })).default([]),
  smallIcons: z.array(z.object({
    image: imageSchema,
  })).default([]),
  primaryAction: linkSchema.optional(),
  secondaryAction: linkSchema.optional(),
  cardNote: z.string().optional(),
  bottomCards: z.array(z.object({
    title: z.string().optional(),
    items: z.array(z.object({
      icon: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
    })).default([]),
  })).default([]),
});

export const storyBlockSchema = z.object({
  type: z.literal('story'),
  eyebrow: z.string().optional(),
  titleGradient: z.string().optional(),
  title: z.string().optional(),
  intro: z.string().optional(),
  bodyTop: z.string().optional(),
  quote: z.string().optional(),
  bodyBottom: z.string().optional(),
  image: imageSchema.optional(),
  cards: z.array(z.object({
    icon: z.string().optional(),
    customIcon: imageSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })).default([]),
});

export const mediaShowcaseBlockSchema = z.object({
  type: z.literal('media-showcase'),
  title: z.string().optional(),
  description: z.string().optional(),
  image: imageSchema.optional(),
  background: z.enum(['gray', 'white']).default('gray'),
});

export const featureGridBlockSchema = z.object({
  type: z.literal('feature-grid'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  background: z.enum(['white', 'gray']).default('white'),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(4),
  cards: z.array(z.object({
    icon: z.string().optional(),
    customIcon: imageSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })).default([]),
});

export const agentCapabilitiesBlockSchema = z.object({
  type: z.literal('agent-capabilities'),
  title: z.string().optional(),
  description: z.string().optional(),
  contentSide: z.enum(['left', 'right']).default('left'),
  autoplay: z.boolean().default(false),
  autoplayInterval: z.number().int().min(2000).default(5000),
  items: z.array(z.object({
    icon: z.string().optional(),
    customIcon: imageSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    link: z.object({
      url: z.string().min(1),
      title: z.string().optional(),
      target: buttonTargetSchema.optional(),
    }).optional(),
  })).min(1).max(16),
  infoNote: z.string().optional(),
  preview: z.boolean().default(false).optional(),
});

export const agentSolutionsBlockSchema = z.object({
  type: z.literal('agent-solutions'),
  title: z.string().optional(),
  items: z.array(z.object({
    icon: z.string().optional(),
    customIcon: imageSchema.optional(),
    title: z.string().optional(),
    href: z.string().optional(),
    description: z.string().optional(),
  })).min(1).max(16),
});

export const contactUsBlockSchema = z.object({
  type: z.literal('contact-us'),
  titleStart: z.string().optional(),
  titleAccent: z.string().optional(),
  description: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  logo: imageSchema.optional(),
  formHtml: z.string().optional(),
});

export const conciergeFlowBlockSchema = z.object({
  type: z.literal('concierge-flow'),
  title: z.string().optional(),
  description: z.string().optional(),
  image: imageSchema.optional(),
  cards: z.array(z.object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })).min(1).max(4),
  button: linkSchema.optional(),
});

export const enterpriseUpgradeBlockSchema = z.object({
  type: z.literal('enterprise-upgrade'),
  title: z.string().optional(),
  description: z.string().optional(),
  tableTitle: z.string().optional(),
  leftHeading: z.string().optional(),
  rightHeading: z.string().optional(),
  benefits: z.array(z.object({
    capability: z.string().optional(),
    included: z.string().optional(),
  })).default([]),
  bodyHtml: z.string().optional(),
  form: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    html: z.string().optional(),
  }).optional(),
});

export const channelsGridBlockSchema = z.object({
  type: z.literal('channels-grid'),
  title: z.string().optional(),
  gradientText: z.string().optional(),
  description: z.string().optional(),
  cards: z.array(z.object({
    icon: z.string().optional(),
    customIcon: imageSchema.optional(),
    title: z.string().optional(),
    href: z.string().optional(),
    description: z.string().optional(),
    image: imageSchema.optional(),
    fullWidth: z.boolean().default(false),
  })).min(1).max(12),
});

export const featureStackBlockSchema = z.object({
  type: z.literal('feature-stack'),
  title: z.string().optional(),
  description: z.string().optional(),
  cards: z.array(z.object({
    icon: z.string().optional(),
    customIcon: imageSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    href: z.string().optional(),
  })).min(1).max(8),
  infoNote: z.string().optional(),
});

export const coverageGridBlockSchema = z.object({
  type: z.literal('coverage-grid'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  cards: z.array(z.object({
    icon: z.string().optional(),
    customIcon: imageSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    href: z.string().optional(),
  })).min(1).max(12),
});

export const featureRowsBlockSchema = z.object({
  type: z.literal('feature-rows'),
  variant: z.enum(['capabilities', 'builder']).default('capabilities'),
  rows: z.array(z.object({
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })).min(3).max(3),
});

export const capabilityTrioBlockSchema = z.object({
  type: z.literal('capability-trio'),
  title: z.string().optional(),
  centerLabel: z.string().optional(),
  cards: z.array(z.object({
    icon: z.enum(['messages-square', 'orbit', 'brain-circuit']).default('messages-square').optional(),
    customIcon: imageSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    highlighted: z.boolean().default(false).optional(),
  })).min(3).max(3),
});

export const capabilityToolsBlockSchema = z.object({
  type: z.literal('capability-tools'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  cards: z.array(z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    href: z.string().optional(),
    logos: z.array(imageSchema).max(6).default([]),
    extraTools: z.number().int().nonnegative().default(0),
  })).min(1).max(12),
});

export const useCasesGridBlockSchema = z.object({
  type: z.literal('use-cases-grid'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  cards: z.array(z.object({
    icon: z.string().optional(),
    customIcon: imageSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    href: z.string().optional(),
  })).max(24).default([]),
});

export const securityBlockSchema = z.object({
  type: z.literal('security'),
  background: z.enum(['white', 'gray']).default('white'),
  title: z.string().optional(),
  titleGradient: z.string().optional(),
  subtitle: z.string().optional(),
  cards: z.array(z.object({
    icon: z.enum(['database_zap', 'file_key', 'shield_ellipsis', 'text_search', 'file_search']).optional(),
    customIcon: imageSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })).max(12).default([]),
});

export const conversationReplayBlockSchema = z.object({
  type: z.literal('conversation-replay'),
  background: z.enum(['white', 'gray']).default('white'),
  title: z.string().optional(),
  description: z.string().optional(),
  replayLabel: z.string().optional(),
  turns: z.array(z.object({
    channel: z.enum(['voice', 'sms', 'chat', 'whatsapp', 'mail']).default('sms'),
    time: z.string().optional(),
    from: z.enum(['customer', 'agent']).default('customer'),
    text: z.string().min(1),
    action: z.string().optional(),
  })).min(2).max(12),
  outcomeTitle: z.string().optional(),
  outcomeRows: z.array(z.object({
    label: z.string().optional(),
    value: z.string().optional(),
  })).max(6).default([]),
  outcomeNote: z.string().optional(),
});

export const recoveryCalculatorBlockSchema = z.object({
  type: z.literal('recovery-calculator'),
  background: z.enum(['white', 'gray', 'dark']).default('dark'),
  title: z.string().optional(),
  description: z.string().optional(),
  controls: z.array(z.object({
    key: z.enum(['missed', 'jobValue', 'share']),
    label: z.string().optional(),
    hint: z.string().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    step: z.number().optional(),
    value: z.number().optional(),
    prefix: z.string().optional(),
    suffix: z.string().optional(),
  })).max(3).default([]),
  frequencyLabel: z.string().optional(),
  frequencyDefault: z.enum(['weekly', 'biweekly', 'monthly', 'onetime']).default('biweekly'),
  clientsLabel: z.string().optional(),
  resultLabel: z.string().optional(),
  resultSuffix: z.string().optional(),
  annualLabel: z.string().optional(),
  breakEvenNote: z.string().optional(),
  assumptionNote: z.string().optional(),
  action: linkSchema.optional(),
});

export const functionalCapabilitiesBlockSchema = z.object({
  type: z.literal('functional-capabilities'),
  preset: z.enum(['sales', 'service', 'recruiting', 'channels']).default('sales'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  cards: z.array(z.object({
    icon: z.string().optional(),
    customIcon: imageSchema.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    channels: z.string().optional(),
    width: z.enum(['default', 'wide']).default('default'),
  })).min(1).max(16),
  note: z.string().optional(),
});

export const ctaBlockSchema = z.object({
  type: z.literal('cta'),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  primaryAction: linkSchema.optional(),
  secondaryAction: linkSchema.optional(),
});

export const metricsBlockSchema = z.object({
  type: z.literal('metrics'),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  background: z.enum(['white', 'muted', 'dark']).default('white'),
  items: z.array(z.object({
    value: z.string().min(1),
    description: z.string().min(1),
    href: z.string().optional(),
  })).min(2).max(12),
  note: z.string().optional(),
});

export const resultsStatsBlockSchema = z.object({
  type: z.literal('results-stats'),
  background: z.enum(['white', 'gray']).default('white'),
  title: z.string().min(1),
  items: z.array(z.object({
    value: z.string().min(1),
    description: z.string().min(1),
    link: linkSchema.optional(),
  })).min(2).max(8),
  infoNote: z.string().optional(),
});

export const statsCardsBlockSchema = z.object({
  type: z.literal('stats-cards'),
  background: z.enum(['white', 'gray']).default('white'),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  items: z.array(z.object({
    icon: z.string().optional(),
    heading: z.string().min(1),
    value: z.string().min(1),
    label: z.string().min(1),
  })).min(2).max(8),
});

export const howItWorksBlockSchema = z.object({
  type: z.literal('how-it-works'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  gradientText: z.string().optional(),
  subtitle: z.string().optional(),
  background: z.enum(['gray', 'white']).default('gray'),
  openFirst: z.boolean().default(false),
  showStepNumbers: z.boolean().default(true).optional(),
  steps: z.array(z.object({
    label: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })).default([]),
  button: linkSchema.optional(),
  infoNote: z.string().optional(),
});

export const capabilityStripBlockSchema = z.object({
  type: z.literal('capability-strip'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  background: z.enum(['white', 'gray']).default('white'),
  items: z.array(z.object({
    icon: z.string().optional(),
    customIcon: imageSchema.optional(),
    label: z.string().min(1),
  })).min(2).max(8),
});

export const liveInDaysBlockSchema = z.object({
  type: z.literal('live-in-days'),
  eyebrow: z.string().optional(),
  description: z.string().optional(),
  items: z.array(z.object({
    icon: z.enum(['code-xml', 'layout-grid', 'bot-message-square', 'user-round-check']).default('code-xml'),
    customIcon: imageSchema.optional(),
    label: z.string().min(1),
  })).min(1).max(8),
});

export const faqBlockSchema = z.object({
  type: z.literal('faq'),
  title: z.string().min(1),
  titleGradient: z.string().optional(),
  description: z.string().optional(),
  searchPlaceholder: z.string().optional(),
  items: z.array(z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
    category: z.string().optional(),
  })).min(2).max(32),
});

export const contentFeedBlockSchema = z.object({
  type: z.literal('content-feed'),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  mode: z.enum(['latest', 'manual']).default('latest'),
  collections: z.array(contentCollectionSchema).min(1).default(['posts', 'news']),
  limit: z.number().int().min(1).max(12).default(3),
  cards: z.array(z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    href: z.string().min(1),
    image: imageSchema.optional(),
    meta: z.string().optional(),
    tags: z.array(tagSchema).default([]),
    readTime: z.string().optional(),
  })).default([]),
});

export const newsInsightsBlockSchema = contentFeedBlockSchema.extend({
  type: z.literal('news-insights'),
});

export const pricingCardsBlockSchema = z.object({
  type: z.literal('pricing-cards'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  background: z.enum(['white', 'gray']).default('gray'),
  cards: z.array(z.object({
    accent: z.enum(['gradient', 'dark']).default('gradient'),
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    features: z.array(featureTextSchema).default([]),
    note: z.string().optional(),
    button: linkSchema.optional(),
  })).min(1),
  info: z.string().optional(),
});

export const pricingDetailsBlockSchema = z.object({
  type: z.literal('pricing-details'),
  sections: z.array(z.object({
    background: z.enum(['white', 'gray']).default('gray'),
    variant: z.enum(['default', 'comparison']).default('default'),
    title: z.string().optional(),
    info: z.string().optional(),
    headers: z.array(tableHeaderSchema).default([]),
    rows: z.array(z.object({
      cells: z.array(z.object({
        text: z.string().default(''),
        strong: z.boolean().default(false),
        accent: z.boolean().default(false),
        muted: z.boolean().default(false),
        stars: z.boolean().default(false),
      })).default([]),
    })).default([]),
    note: z.string().optional(),
  })).min(1),
});

export const differenceBlockSchema = z.object({
  type: z.literal('difference'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  leftTitle: z.string().optional(),
  rightTitle: z.string().optional(),
  leftItems: z.array(featureTextSchema).default([]),
  rightItems: z.array(featureTextSchema).default([]),
  action: linkSchema.optional(),
});

export const painPointsComparisonBlockSchema = z.object({
  type: z.literal('pain-points-comparison'),
  background: z.enum(['white', 'gray']).default('white'),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  showColumnHeadings: z.boolean().default(false),
  leftHeading: z.string().default('The Challenge'),
  rightHeading: z.string().default('Your AI Agent'),
  rows: z.array(z.object({
    leftTitle: z.string().optional(),
    leftDescription: z.string().optional(),
    rightTitle: z.string().optional(),
    rightDescription: z.string().optional(),
  })).min(1),
  action: linkSchema.optional(),
});

export const pricingPolicyBlockSchema = z.object({
  type: z.literal('pricing-policy'),
  background: z.enum(['white', 'gray']).default('white'),
  title: z.string().optional(),
  callouts: z.array(z.object({
    icon: z.enum(['wallet', 'infinity', 'headset', 'info']).default('wallet'),
    text: z.string().min(1),
  })).default([]),
  info: z.string().optional(),
});

export const industryExpertiseBlockSchema = z.object({
  type: z.literal('industry-expertise'),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  visualType: z.enum(['industry', 'platform', 'capabilities']).default('industry'),
  button: linkSchema.optional(),
  hideBottomControls: z.boolean().default(false),
  autoplay: z.boolean().default(true),
  autoplayInterval: z.number().int().min(1).max(30).default(5),
  items: z.array(z.object({
    icon: z.enum([
      'shopping_cart',
      'headset',
      'cloud_cog',
      'hammer',
      'heart_handshake',
      'hotel',
      'brain',
      'layers',
      'wand',
      'globe',
      'users',
      'workflow',
    ]).optional(),
    customIcon: z.string().optional(),
    title: z.string().min(1),
    description: z.string().optional(),
    image: imageSchema.optional(),
  })).min(1).max(8),
  infoCards: z.array(z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    source: z.string().optional(),
  })).default([]),
});

export const logoStripBlockSchema = z.object({
  type: z.literal('logo-strip'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  logos: z.array(z.object({
    label: z.string().optional(),
    image: imageSchema.optional(),
  })).default([]),
  stats: z.array(z.object({
    label: z.string().optional(),
    value: z.string().optional(),
  })).default([]),
});

export const integrationsBannerBlockSchema = z.object({
  type: z.literal('integrations-banner'),
  title: z.string().optional(),
  description: z.string().optional(),
  items: z.array(z.object({
    label: z.string().optional(),
    icon: imageSchema.optional(),
  })).default([]),
});

export const logoGridBlockSchema = z.object({
  type: z.literal('logo-grid'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  columns: z.array(z.object({
    heading: z.string().optional(),
    items: z.array(z.object({
      image: imageSchema.optional(),
      secondaryImage: imageSchema.optional(),
      label: z.string().optional(),
      subLabel: z.string().optional(),
      url: z.string().optional(),
    })).default([]),
  })).min(1).max(6),
});

export const tabsShowcaseBlockSchema = z.object({
  type: z.literal('tabs-showcase'),
  background: z.enum(['white', 'gray']).default('gray'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  autoplaySeconds: z.number().int().min(0).max(30).default(0),
  tabs: z.array(z.object({
    label: z.string().min(1),
    icon: z.string().optional(),
    customIcon: imageSchema.optional(),
    steps: z.array(z.object({
      text: z.string().min(1),
      icon: z.string().optional(),
      customIcon: imageSchema.optional(),
    })).min(1).max(8),
  })).min(1).max(8),
});

export const anchorNavBlockSchema = z.object({
  type: z.literal('anchor-nav'),
  background: z.enum(['white', 'gray']).default('white'),
  items: z.array(z.object({
    icon: z.string().optional(),
    label: z.string().min(1),
    anchor: z.string().optional(),
  })).min(1).max(16),
});

export const testimonialsBlockSchema = z.object({
  type: z.literal('testimonials'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(z.object({
    quote: z.string().optional(),
    authorName: z.string().optional(),
    authorRole: z.string().optional(),
    authorImage: imageSchema.optional(),
  })).min(1).max(12),
});

export const comparisonGridBlockSchema = z.object({
  type: z.literal('comparison-grid'),
  cards: z.array(z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    action: linkSchema.optional(),
  })).min(1).max(24),
});

export const useCaseFlowBlockSchema = z.object({
  type: z.literal('use-case-flow'),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  background: z.enum(['white', 'gray']).default('gray'),
  columns: z.array(z.object({
    label: z.string().optional(),
    items: z.array(z.object({
      text: z.string().min(1),
    })).min(1).max(8),
  })).min(1).max(4),
});

export const pageBlockSchema = z.discriminatedUnion('type', [
  withBlockRoot(heroBlockSchema),
  withBlockRoot(heroExtendedBlockSchema),
  withBlockRoot(richTextBlockSchema),
  withBlockRoot(sideBySideBlockSchema),
  withBlockRoot(storyBlockSchema),
  withBlockRoot(mediaShowcaseBlockSchema),
  withBlockRoot(featureGridBlockSchema),
  withBlockRoot(agentCapabilitiesBlockSchema),
  withBlockRoot(agentSolutionsBlockSchema),
  withBlockRoot(contactUsBlockSchema),
  withBlockRoot(conciergeFlowBlockSchema),
  withBlockRoot(enterpriseUpgradeBlockSchema),
  withBlockRoot(channelsGridBlockSchema),
  withBlockRoot(featureStackBlockSchema),
  withBlockRoot(coverageGridBlockSchema),
  withBlockRoot(featureRowsBlockSchema),
  withBlockRoot(capabilityTrioBlockSchema),
  withBlockRoot(capabilityToolsBlockSchema),
  withBlockRoot(useCasesGridBlockSchema),
  withBlockRoot(securityBlockSchema),
  withBlockRoot(conversationReplayBlockSchema),
  withBlockRoot(recoveryCalculatorBlockSchema),
  withBlockRoot(functionalCapabilitiesBlockSchema),
  withBlockRoot(howItWorksBlockSchema),
  withBlockRoot(ctaBlockSchema),
  withBlockRoot(metricsBlockSchema),
  withBlockRoot(resultsStatsBlockSchema),
  withBlockRoot(statsCardsBlockSchema),
  withBlockRoot(capabilityStripBlockSchema),
  withBlockRoot(liveInDaysBlockSchema),
  withBlockRoot(faqBlockSchema),
  withBlockRoot(contentFeedBlockSchema),
  withBlockRoot(newsInsightsBlockSchema),
  withBlockRoot(pricingCardsBlockSchema),
  withBlockRoot(pricingDetailsBlockSchema),
  withBlockRoot(differenceBlockSchema),
  withBlockRoot(painPointsComparisonBlockSchema),
  withBlockRoot(pricingPolicyBlockSchema),
  withBlockRoot(industryExpertiseBlockSchema),
  withBlockRoot(logoStripBlockSchema),
  withBlockRoot(integrationsBannerBlockSchema),
  withBlockRoot(logoGridBlockSchema),
  withBlockRoot(tabsShowcaseBlockSchema),
  withBlockRoot(anchorNavBlockSchema),
  withBlockRoot(testimonialsBlockSchema),
  withBlockRoot(comparisonGridBlockSchema),
  withBlockRoot(useCaseFlowBlockSchema),
]);

export const pageDocumentSchema = z.object({
  contentKey: z.string().min(1).optional(),
  collection: contentCollectionSchema.default('pages'),
  path: z.string().regex(/^\/(?:[^?#]*)$/),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  featuredImage: imageSchema.optional(),
  publishedAt: z.string().optional(),
  articleMeta: articleMetaSchema.optional(),
  tipCard: tipCardSchema.optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  template: contentTemplateSchema.default('standard'),
  seo: seoSchema.default({}),
  blocks: z.array(pageBlockSchema).default([]),
});

export type Link = z.infer<typeof linkSchema>;
export type Image = z.infer<typeof imageSchema>;
export type Seo = z.infer<typeof seoSchema>;
export type ArticleMeta = z.infer<typeof articleMetaSchema>;
export type TipCard = z.infer<typeof tipCardSchema>;
export type ContentCollection = z.infer<typeof contentCollectionSchema>;
export type ContentTemplate = z.infer<typeof contentTemplateSchema>;
export type BlockRoot = z.infer<typeof blockRootSchema>;
export type PageBlock = z.infer<typeof pageBlockSchema>;
export type PageDocument = z.infer<typeof pageDocumentSchema>;
