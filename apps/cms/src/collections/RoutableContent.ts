import type { Block, CollectionConfig, Field } from 'payload';
import {
  triggerFrontendDeployAfterChange,
  triggerFrontendDeployAfterDelete,
} from '../hooks/triggerFrontendDeploy';

type RoutableContentOptions = {
  slug: CollectionConfig['slug'];
  labels: NonNullable<CollectionConfig['labels']>;
  defaultTemplate: string;
  templateOptions: Array<{ label: string; value: string }>;
  articleEditing?: boolean;
  tipCardEditing?: boolean;
};

const backgroundOptions = {
  whiteGray: [
    { label: 'White', value: 'white' },
    { label: 'Gray', value: 'gray' },
  ],
  section: [
    { label: 'White', value: 'white' },
    { label: 'Gray', value: 'gray' },
    { label: 'Transparent', value: 'transparent' },
    { label: 'Muted', value: 'muted' },
    { label: 'Dark', value: 'dark' },
  ],
  tone: [
    { label: 'White', value: 'white' },
    { label: 'Muted', value: 'muted' },
    { label: 'Dark', value: 'dark' },
  ],
};

const targetOptions = [
  { label: 'Same tab', value: '_self' },
  { label: 'New tab', value: '_blank' },
];

const useCasesGridIconOptions = [
  { label: 'Shopping cart', value: 'shopping-cart' },
  { label: 'Building', value: 'building' },
  { label: 'Cloud cog', value: 'cloud-cog' },
  { label: 'Megaphone', value: 'megaphone' },
  { label: 'Heart handshake', value: 'heart-handshake' },
  { label: 'Hammer', value: 'hammer' },
  { label: 'Shield check', value: 'shield-check' },
  { label: 'Scroll text', value: 'scroll-text' },
  { label: 'Briefcase', value: 'briefcase' },
  { label: 'Headset', value: 'headset' },
  { label: 'Graduation cap', value: 'graduation-cap' },
  { label: 'Truck', value: 'truck' },
  { label: 'Calendar check', value: 'calendar-check' },
  { label: 'Clock', value: 'clock' },
  { label: 'Filter', value: 'filter' },
  { label: 'Refresh', value: 'refresh-ccw' },
  { label: 'List checks', value: 'list-checks' },
  { label: 'File plus', value: 'file-plus' },
  { label: 'Messages square', value: 'messages-square' },
];

const securityIconOptions = [
  { label: 'Database zap', value: 'database_zap' },
  { label: 'File key', value: 'file_key' },
  { label: 'Shield ellipsis', value: 'shield_ellipsis' },
  { label: 'Text search', value: 'text_search' },
  { label: 'File search', value: 'file_search' },
];

const functionalCapabilitiesPresetOptions = [
  { label: 'Sales processes', value: 'sales' },
  { label: 'Service workflow', value: 'service' },
  { label: 'Recruiting workflow', value: 'recruiting' },
  { label: 'Conversational channels', value: 'channels' },
];

const functionalCapabilitiesIconOptions = [
  { label: 'Award', value: 'award' },
  { label: 'Bell', value: 'bell' },
  { label: 'Calendar check', value: 'calendar-check-2' },
  { label: 'Calendar days', value: 'calendar-days' },
  { label: 'Calendar range', value: 'calendar-range' },
  { label: 'Clipboard check', value: 'clipboard-check' },
  { label: 'Clock', value: 'clock' },
  { label: 'Database', value: 'database' },
  { label: 'File check', value: 'file-check-2' },
  { label: 'File text', value: 'file-text' },
  { label: 'Filter', value: 'filter' },
  { label: 'Handshake', value: 'handshake' },
  { label: 'Inbox', value: 'inbox' },
  { label: 'Message square', value: 'message-square' },
  { label: 'Phone incoming', value: 'phone-incoming' },
  { label: 'Receipt', value: 'receipt' },
  { label: 'Repeat', value: 'repeat-2' },
  { label: 'Send', value: 'send' },
  { label: 'Shield check', value: 'shield-check' },
  { label: 'Sliders horizontal', value: 'sliders-horizontal' },
  { label: 'Star', value: 'star' },
  { label: 'Triangle alert', value: 'triangle-alert' },
  { label: 'Audio lines', value: 'audio-lines' },
  { label: 'Messages square', value: 'messages-square' },
  { label: 'Smartphone', value: 'smartphone' },
  { label: 'Users', value: 'users' },
  { label: 'Mail', value: 'mail' },
  { label: 'Info', value: 'info' },
];

const channelsGridIconOptions = [
  { label: 'SMS', value: 'sms' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Voice', value: 'voice' },
  { label: 'Chat', value: 'chat' },
  { label: 'Mail', value: 'mail' },
  { label: 'Monitor', value: 'monitor' },
  { label: 'Network', value: 'network' },
  { label: 'Clock', value: 'clock' },
  { label: 'Webhook', value: 'webhook' },
];

const featureStackIconOptions = [
  { label: 'Network', value: 'network' },
  { label: 'Shield ellipsis', value: 'shield-ellipsis' },
  { label: 'Database', value: 'database' },
  { label: 'Brain', value: 'brain' },
  { label: 'Shield check', value: 'shield-check' },
  { label: 'Gauge', value: 'gauge' },
  { label: 'CPU', value: 'cpu' },
  { label: 'Zap', value: 'zap' },
];

const coverageGridIconOptions = [
  { label: 'Flame', value: 'flame' },
  { label: 'Wind', value: 'wind' },
  { label: 'Fan', value: 'fan' },
  { label: 'Refrigerator', value: 'refrigerator' },
  { label: 'Home', value: 'home' },
  { label: 'Store', value: 'store' },
  { label: 'Building', value: 'building' },
  { label: 'Factory', value: 'factory' },
];

const linkFields: Field[] = [
  { name: 'label', type: 'text' },
  { name: 'href', type: 'text' },
  {
    name: 'target',
    type: 'select',
    defaultValue: '_self',
    options: targetOptions,
  },
];

const imageField = (name = 'media', label?: string): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      name: 'sourceId',
      label: 'Source media ID',
      type: 'text',
      admin: {
        description: 'Stable imported media identifier. Exported to the frontend as image.id.',
      },
    },
    { name: 'src', type: 'text' },
    { name: 'alt', type: 'text', defaultValue: '' },
    { name: 'width', type: 'number' },
    { name: 'height', type: 'number' },
  ],
});

const optionalActionField = (name: string, label: string): Field => ({
  name,
  label,
  type: 'group',
  fields: linkFields,
});

const textItemField = (name: string, label?: string): Field => ({
  name,
  label,
  type: 'array',
  fields: [
    { name: 'text', type: 'text', required: true },
  ],
});

const seoFields: Field[] = [
  { name: 'metaTitle', type: 'text' },
  { name: 'metaDescription', type: 'textarea' },
  { name: 'canonicalUrl', type: 'text' },
  { name: 'robots', type: 'text' },
  { name: 'ogTitle', type: 'text' },
  { name: 'ogDescription', type: 'textarea' },
  imageField('ogImage', 'Open Graph image'),
  { name: 'twitterTitle', type: 'text' },
  { name: 'twitterDescription', type: 'textarea' },
  imageField('twitterImage', 'Twitter image'),
  { name: 'schemaJson', type: 'json' },
];

const articleMetaField: Field = {
  name: 'articleMeta',
  label: 'Article presentation',
  type: 'group',
  admin: {
    description: 'Metadata used by article headers, archive cards, ratings, reading time, and the floating table of contents.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'text',
          admin: {
            description: 'Primary archive/filter label.',
            width: '50%',
          },
        },
        {
          name: 'authorName',
          label: 'Author',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        description: 'Additional archive and article labels.',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'updatedAt',
          label: 'Content updated at',
          type: 'date',
          admin: {
            description: 'Editorial update date shown to readers; separate from Payload record history.',
            width: '50%',
          },
        },
        {
          name: 'readTimeMinutes',
          label: 'Reading time override (minutes)',
          type: 'number',
          min: 1,
          admin: {
            description: 'Optional. Leave empty so the frontend derives reading time from article content.',
            step: 1,
            width: '50%',
          },
        },
      ],
    },
    {
      label: 'Audience metrics',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'ratingAverage',
              label: 'Rating average',
              type: 'number',
              min: 0,
              max: 5,
              admin: {
                description: 'Optional average from 0 to 5.',
                step: 0.1,
                width: '33%',
              },
            },
            {
              name: 'ratingCount',
              label: 'Rating count',
              type: 'number',
              min: 0,
              admin: {
                step: 1,
                width: '33%',
              },
            },
            {
              name: 'views',
              type: 'number',
              min: 0,
              admin: {
                step: 1,
                width: '33%',
              },
            },
          ],
        },
      ],
    },
    {
      label: 'Table of contents',
      type: 'collapsible',
      fields: [
        {
          name: 'showTableOfContents',
          label: 'Show floating table of contents',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'The frontend generates entries and anchors automatically from article headings.',
          },
        },
        {
          name: 'showTableOfContentsTitle',
          label: 'Show table of contents title',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            condition: (_, siblingData) => siblingData?.showTableOfContents !== false,
          },
        },
        {
          name: 'tableOfContentsTitle',
          label: 'Table of contents title',
          type: 'text',
          defaultValue: 'Contents',
          admin: {
            condition: (_, siblingData) => (
              siblingData?.showTableOfContents !== false &&
              siblingData?.showTableOfContentsTitle !== false
            ),
          },
        },
      ],
    },
  ],
};

const featuredImageField: Field = {
  name: 'featuredImage',
  label: 'Featured image',
  type: 'upload',
  relationTo: 'media',
  admin: {
    description: 'Used by the article hero, archive cards, and social previews when a dedicated SEO image is not set.',
  },
};

const importedFeaturedImageField: Field = {
  name: 'sourceFeaturedImage',
  label: 'Imported featured image fallback',
  type: 'group',
  admin: {
    hidden: true,
    readOnly: true,
  },
  fields: [
    { name: 'sourceId', type: 'text' },
    { name: 'src', type: 'text' },
    { name: 'alt', type: 'text' },
    { name: 'width', type: 'number' },
    { name: 'height', type: 'number' },
  ],
};

const tipCardField: Field = {
  name: 'tipCard',
  label: 'Archive card presentation',
  type: 'group',
  admin: {
    description: 'Optional presentation settings for this tip on archive and listing cards.',
  },
  fields: [
    {
      name: 'category',
      label: 'Card category',
      type: 'text',
      admin: {
        description: 'Optional archive filter and card label.',
      },
    },
    {
      name: 'archiveWidth',
      label: 'Archive card width',
      type: 'number',
      min: 1,
      max: 3,
      defaultValue: 1,
      admin: {
        description: 'Source-compatible width: 1, 2, or 3 columns.',
        step: 1,
      },
      validate: (value: unknown) => (
        value == null ||
        value === 1 ||
        value === 2 ||
        value === 3 ||
        'Archive card width must be 1, 2, or 3.'
      ),
    },
    {
      name: 'icons',
      label: 'Card icons',
      type: 'array',
      maxRows: 2,
      defaultValue: [],
      admin: {
        description: 'Select up to two localized icons from the Media library.',
      },
      fields: [
        {
          name: 'image',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'sourceIcons',
      label: 'Imported card icon fallbacks',
      type: 'json',
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
};

const blockRootField: Field = {
  name: 'root',
  label: 'Section root',
  type: 'group',
  admin: {
    description: 'Optional migrated section anchor and custom classes. Use only when preserving existing route anchors or source-authored section variants.',
  },
  fields: [
    { name: 'anchor', label: 'Anchor ID', type: 'text' },
    { name: 'className', label: 'Custom classes', type: 'text' },
  ],
};

const sectionBackgroundField: Field = {
  name: 'background',
  label: 'Section background',
  type: 'select',
  options: backgroundOptions.whiteGray,
};

const withRootField = (block: Block): Block => ({
  ...block,
  fields: [
    blockRootField,
    ...(block.fields.some((field) => 'name' in field && field.name === 'background') ? [] : [sectionBackgroundField]),
    ...block.fields,
  ],
});

const heroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Home', value: 'home' },
      ],
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea', required: true },
    { name: 'description', type: 'textarea' },
    optionalActionField('primaryAction', 'Primary action'),
    optionalActionField('secondaryAction', 'Secondary action'),
    { name: 'primaryNote', type: 'text' },
    { name: 'secondaryNote', type: 'text' },
    imageField('backgroundImage', 'Background image'),
    {
      name: 'tooltip',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'action', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'content', type: 'textarea' },
      ],
    },
    imageField(),
    {
      name: 'mediaSize',
      type: 'select',
      defaultValue: 'wide',
      options: [
        { label: 'Wide', value: 'wide' },
        { label: 'Tall', value: 'tall' },
      ],
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        imageField('icon', 'Icon'),
      ],
    },
  ],
};

const heroExtendedBlock: Block = {
  slug: 'hero-extended',
  interfaceName: 'HeroExtendedBlock',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Home', value: 'home' },
      ],
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea', required: true },
    { name: 'subtitle', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    imageField('backgroundImage', 'Background image'),
    imageField('media', 'Content image'),
    {
      name: 'mediaSize',
      type: 'select',
      defaultValue: 'wide',
      options: [
        { label: 'Wide', value: 'wide' },
        { label: 'Tall', value: 'tall' },
      ],
    },
    optionalActionField('primaryAction', 'Primary action'),
    optionalActionField('secondaryAction', 'Secondary action'),
    { name: 'primaryNote', type: 'text' },
    { name: 'secondaryNote', type: 'text' },
    {
      name: 'cards',
      type: 'array',
      maxRows: 3,
      fields: [
        imageField('icon', 'Icon'),
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};

const richTextBlock: Block = {
  slug: 'rich-text',
  interfaceName: 'RichTextBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'html', type: 'textarea', required: true, maxLength: 500000 },
  ],
};

const sideBySideBlock: Block = {
  slug: 'side-by-side',
  interfaceName: 'SideBySideBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea', required: true },
    { name: 'description', type: 'textarea' },
    imageField(),
    {
      name: 'mediaSide',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    { name: 'sectionEyebrow', type: 'text' },
    { name: 'sectionTitle', type: 'textarea' },
    { name: 'sectionSubtitle', type: 'textarea' },
    {
      name: 'imageSide',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    imageField('image'),
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: backgroundOptions.section,
    },
    { name: 'cardTitle', type: 'textarea' },
    { name: 'cardSubtitle', type: 'textarea' },
    { name: 'cardDescription', type: 'textarea' },
    {
      name: 'bullets',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'smallIcons',
      type: 'array',
      fields: [
        imageField('image'),
      ],
    },
    optionalActionField('primaryAction', 'Primary action'),
    optionalActionField('secondaryAction', 'Secondary action'),
    { name: 'cardNote', type: 'textarea' },
    {
      name: 'bottomCards',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'icon', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },
  ],
};

const storyBlock: Block = {
  slug: 'story',
  interfaceName: 'StoryBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'titleGradient', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'intro', type: 'textarea' },
    { name: 'bodyTop', type: 'textarea' },
    { name: 'quote', type: 'textarea' },
    { name: 'bodyBottom', type: 'textarea' },
    imageField('image'),
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'icon', type: 'text' },
        imageField('customIcon'),
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};

const mediaShowcaseBlock: Block = {
  slug: 'media-showcase',
  interfaceName: 'MediaShowcaseBlock',
  fields: [
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    imageField('image'),
    {
      name: 'background',
      type: 'select',
      defaultValue: 'gray',
      options: backgroundOptions.whiteGray,
    },
  ],
};

const featureGridBlock: Block = {
  slug: 'feature-grid',
  interfaceName: 'FeatureGridBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: backgroundOptions.whiteGray,
    },
    {
      name: 'columns',
      type: 'number',
      min: 2,
      max: 4,
      defaultValue: 4,
    },
    {
      name: 'cards',
      type: 'array',
      maxRows: 12,
      fields: [
        {
          name: 'icon',
          type: 'text',
          defaultValue: 'wrench',
        },
        imageField('customIcon', 'Custom icon'),
        { name: 'title', type: 'textarea' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};

const agentCapabilitiesBlock: Block = {
  slug: 'agent-capabilities',
  interfaceName: 'AgentCapabilitiesBlock',
  fields: [
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'contentSide',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    { name: 'autoplay', type: 'checkbox', defaultValue: false },
    { name: 'autoplayInterval', type: 'number', min: 2000, defaultValue: 5000 },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 16,
      fields: [
        { name: 'icon', type: 'text' },
        imageField('customIcon', 'Custom icon'),
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        imageField('image', 'Card image'),
        {
          name: 'link',
          type: 'group',
          fields: [
            { name: 'url', type: 'text' },
            { name: 'title', type: 'text' },
            {
              name: 'target',
              type: 'select',
              defaultValue: '_self',
              options: targetOptions,
            },
          ],
        },
      ],
    },
    { name: 'infoNote', type: 'textarea' },
    { name: 'preview', type: 'checkbox', defaultValue: false },
  ],
};

const agentSolutionsBlock: Block = {
  slug: 'agent-solutions',
  interfaceName: 'AgentSolutionsBlock',
  fields: [
    { name: 'title', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 16,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'headset',
          options: [
            { label: 'Headset', value: 'headset' },
            { label: 'Connections', value: 'connections' },
            { label: 'Goal', value: 'goal' },
            { label: 'Cog', value: 'cog' },
            { label: 'Tag', value: 'tag' },
            { label: 'Phone Call', value: 'phone-call' },
            { label: 'Messages Square', value: 'messages-square' },
            { label: 'Shopping Cart', value: 'shopping-cart' },
          ],
        },
        imageField('customIcon', 'Custom icon'),
        { name: 'title', type: 'text' },
        { name: 'href', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};

const contactUsBlock: Block = {
  slug: 'contact-us',
  interfaceName: 'ContactUsBlock',
  fields: [
    { name: 'titleStart', type: 'text', defaultValue: "Let's" },
    { name: 'titleAccent', type: 'text', defaultValue: 'Connect!' },
    { name: 'description', type: 'textarea' },
    { name: 'city', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'phone', type: 'text' },
    imageField('logo', 'Center logo'),
    {
      name: 'formHtml',
      type: 'textarea',
      maxLength: 100000,
      admin: {
        description: 'Optional sanitized product-native form HTML. Leave empty to render the default contact form shell.',
      },
    },
  ],
};

const conciergeFlowBlock: Block = {
  slug: 'concierge-flow',
  interfaceName: 'ConciergeFlowBlock',
  fields: [
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    imageField('image', 'Diagram image'),
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    optionalActionField('button', 'Button'),
  ],
};

const enterpriseUpgradeBlock: Block = {
  slug: 'enterprise-upgrade',
  interfaceName: 'EnterpriseUpgradeBlock',
  fields: [
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    { name: 'tableTitle', type: 'textarea' },
    { name: 'leftHeading', type: 'text' },
    { name: 'rightHeading', type: 'text' },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        { name: 'capability', type: 'textarea' },
        { name: 'included', type: 'textarea' },
      ],
    },
    {
      name: 'bodyHtml',
      type: 'textarea',
      maxLength: 500000,
      admin: {
        description: 'Sanitized product-native rich HTML used by enterprise upgrade and thank-you flows.',
      },
    },
    {
      name: 'form',
      type: 'group',
      fields: [
        { name: 'title', type: 'textarea' },
        { name: 'description', type: 'textarea' },
        {
          name: 'html',
          type: 'textarea',
          maxLength: 100000,
          admin: {
            description: 'Optional sanitized embed HTML. Leave empty to render the default enterprise form shell.',
          },
        },
      ],
    },
  ],
};

const featureRowsBlock: Block = {
  slug: 'feature-rows',
  interfaceName: 'FeatureRowsBlock',
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'capabilities',
      options: [
        { label: 'Capabilities flow', value: 'capabilities' },
        { label: 'AI builder flow', value: 'builder' },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};

const capabilityTrioBlock: Block = {
  slug: 'capability-trio',
  interfaceName: 'CapabilityTrioBlock',
  fields: [
    { name: 'title', type: 'textarea' },
    { name: 'centerLabel', type: 'text', defaultValue: 'Deterministic workflow engine' },
    {
      name: 'cards',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'messages-square',
          options: [
            { label: 'Messages Square', value: 'messages-square' },
            { label: 'Orbit', value: 'orbit' },
            { label: 'Brain Circuit', value: 'brain-circuit' },
          ],
        },
        imageField('customIcon', 'Custom icon'),
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'highlighted', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
};

const capabilityToolsBlock: Block = {
  slug: 'capability-tools',
  interfaceName: 'CapabilityToolsBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        { name: 'title', type: 'textarea' },
        { name: 'description', type: 'textarea' },
        { name: 'href', type: 'text' },
        {
          name: 'logos',
          type: 'array',
          maxRows: 6,
          fields: [imageField('image', 'Logo')],
        },
        { name: 'extraTools', type: 'number', min: 0, defaultValue: 0 },
      ],
    },
  ],
};

const channelsGridBlock: Block = {
  slug: 'channels-grid',
  interfaceName: 'ChannelsGridBlock',
  fields: [
    { name: 'title', type: 'textarea' },
    { name: 'gradientText', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'sms',
          options: channelsGridIconOptions,
        },
        imageField('customIcon', 'Custom icon'),
        { name: 'title', type: 'text' },
        { name: 'href', type: 'text' },
        { name: 'description', type: 'textarea' },
        imageField('image', 'Preview image'),
        {
          name: 'fullWidth',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
};

const featureStackBlock: Block = {
  slug: 'feature-stack',
  interfaceName: 'FeatureStackBlock',
  fields: [
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'network',
          options: featureStackIconOptions,
        },
        imageField('customIcon', 'Custom icon'),
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'href', type: 'text' },
      ],
    },
    { name: 'infoNote', type: 'textarea' },
  ],
};

const coverageGridBlock: Block = {
  slug: 'coverage-grid',
  interfaceName: 'CoverageGridBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'flame',
          options: coverageGridIconOptions,
        },
        imageField('customIcon', 'Custom icon'),
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'href', type: 'text' },
      ],
    },
  ],
};

const useCasesGridBlock: Block = {
  slug: 'use-cases-grid',
  interfaceName: 'UseCasesGridBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      maxRows: 24,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'shopping-cart',
          options: useCasesGridIconOptions,
        },
        imageField('customIcon', 'Custom icon'),
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'href', type: 'text' },
      ],
    },
  ],
};

const conversationReplayBlock: Block = {
  slug: 'conversation-replay',
  interfaceName: 'ConversationReplayBlock',
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: backgroundOptions.whiteGray,
    },
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    { name: 'replayLabel', type: 'text' },
    {
      name: 'turns',
      type: 'array',
      minRows: 2,
      maxRows: 12,
      admin: { description: 'One continuous conversation, in order. Alternate customer and agent.' },
      fields: [
        {
          name: 'channel',
          type: 'select',
          defaultValue: 'sms',
          options: [
            { label: 'Phone call', value: 'voice' },
            { label: 'SMS', value: 'sms' },
            { label: 'Web chat', value: 'chat' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Email', value: 'mail' },
          ],
        },
        { name: 'time', type: 'text' },
        {
          name: 'from',
          type: 'select',
          defaultValue: 'customer',
          options: [
            { label: 'Customer', value: 'customer' },
            { label: 'Agent', value: 'agent' },
          ],
        },
        { name: 'text', type: 'textarea', required: true },
        {
          name: 'action',
          type: 'textarea',
          admin: { description: 'What the agent did in a connected system on this turn.' },
        },
      ],
    },
    { name: 'outcomeTitle', type: 'text' },
    {
      name: 'outcomeRows',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'label', type: 'text' },
        { name: 'value', type: 'text' },
      ],
    },
    { name: 'outcomeNote', type: 'textarea' },
  ],
};

const recoveryCalculatorBlock: Block = {
  slug: 'recovery-calculator',
  interfaceName: 'RecoveryCalculatorBlock',
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Gray', value: 'gray' },
        { label: 'Dark', value: 'dark' },
      ],
    },
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'controls',
      type: 'array',
      maxRows: 3,
      admin: { description: 'Exactly three controls. Leave empty to use the built-in defaults.' },
      fields: [
        {
          name: 'key',
          type: 'select',
          required: true,
          options: [
            { label: 'Missed volume', value: 'missed' },
            { label: 'Average job value', value: 'jobValue' },
            { label: 'Conversion share', value: 'share' },
          ],
        },
        { name: 'label', type: 'text' },
        { name: 'hint', type: 'text' },
        { name: 'min', type: 'number' },
        { name: 'max', type: 'number' },
        { name: 'step', type: 'number' },
        { name: 'value', type: 'number' },
        { name: 'prefix', type: 'text' },
        { name: 'suffix', type: 'text' },
      ],
    },
    { name: 'frequencyLabel', type: 'text' },
    {
      name: 'frequencyDefault',
      type: 'select',
      defaultValue: 'biweekly',
      options: [
        { label: 'Weekly', value: 'weekly' },
        { label: 'Every 2 weeks', value: 'biweekly' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'One-time only', value: 'onetime' },
      ],
    },
    { name: 'clientsLabel', type: 'text' },
    { name: 'resultLabel', type: 'text' },
    { name: 'resultSuffix', type: 'text' },
    { name: 'annualLabel', type: 'text' },
    {
      name: 'breakEvenNote',
      type: 'textarea',
      admin: { description: 'The sentence that survives a skeptical read - what one recovered client is worth against the cost.' },
    },
    {
      name: 'assumptionNote',
      type: 'textarea',
      admin: { description: 'State what the estimate deliberately leaves out. Required for credibility.' },
    },
    { name: 'action', type: 'group', fields: linkFields },
  ],
};

const securityBlock: Block = {
  slug: 'security',
  interfaceName: 'SecurityBlock',
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: backgroundOptions.whiteGray,
    },
    { name: 'title', type: 'text' },
    { name: 'titleGradient', type: 'text' },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      maxRows: 12,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'database_zap',
          options: securityIconOptions,
        },
        imageField('customIcon', 'Custom icon'),
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
};

const functionalCapabilitiesBlock: Block = {
  slug: 'functional-capabilities',
  interfaceName: 'FunctionalCapabilitiesBlock',
  fields: [
    {
      name: 'preset',
      type: 'select',
      defaultValue: 'sales',
      options: functionalCapabilitiesPresetOptions,
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 16,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'filter',
          options: functionalCapabilitiesIconOptions,
        },
        imageField('customIcon', 'Custom icon'),
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'channels', type: 'textarea' },
        {
          name: 'width',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Wide', value: 'wide' },
          ],
        },
      ],
    },
    { name: 'note', type: 'textarea' },
  ],
};

const howItWorksBlock: Block = {
  slug: 'how-it-works',
  interfaceName: 'HowItWorksBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', defaultValue: 'How it Works' },
    { name: 'gradientText', type: 'text', defaultValue: 'Works' },
    { name: 'subtitle', type: 'text', defaultValue: 'From First Call to Live Agent in Days' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'gray',
      options: backgroundOptions.whiteGray,
    },
    { name: 'openFirst', type: 'checkbox', defaultValue: false },
    { name: 'showStepNumbers', type: 'checkbox', defaultValue: true },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    optionalActionField('button', 'Button'),
    { name: 'infoNote', type: 'textarea' },
  ],
};

const ctaBlock: Block = {
  slug: 'cta',
  interfaceName: 'CtaBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea', required: true },
    { name: 'description', type: 'textarea' },
    optionalActionField('primaryAction', 'Primary action'),
    optionalActionField('secondaryAction', 'Secondary action'),
  ],
};

const metricsBlock: Block = {
  slug: 'metrics',
  interfaceName: 'MetricsBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: backgroundOptions.tone,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 12,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'href', type: 'text' },
      ],
    },
    { name: 'note', type: 'textarea' },
  ],
};

const resultsStatsBlock: Block = {
  slug: 'results-stats',
  interfaceName: 'ResultsStatsBlock',
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: backgroundOptions.whiteGray,
    },
    { name: 'title', type: 'textarea', required: true },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 8,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        optionalActionField('link', 'Link'),
      ],
    },
    { name: 'infoNote', type: 'textarea' },
  ],
};

const statsCardsBlock: Block = {
  slug: 'stats-cards',
  interfaceName: 'StatsCardsBlock',
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: backgroundOptions.whiteGray,
    },
    { name: 'title', type: 'textarea', required: true },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 8,
      fields: [
        { name: 'icon', type: 'text' },
        { name: 'heading', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'textarea', required: true },
      ],
    },
  ],
};

const capabilityStripBlock: Block = {
  slug: 'capability-strip',
  interfaceName: 'CapabilityStripBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: backgroundOptions.whiteGray,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 8,
      fields: [
        { name: 'icon', type: 'text' },
        imageField('customIcon'),
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};

const liveInDaysBlock: Block = {
  slug: 'live-in-days',
  interfaceName: 'LiveInDaysBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'code-xml',
          options: [
            { label: 'Code XML', value: 'code-xml' },
            { label: 'Layout Grid', value: 'layout-grid' },
            { label: 'Bot Message Square', value: 'bot-message-square' },
            { label: 'User Round Check', value: 'user-round-check' },
          ],
        },
        imageField('customIcon'),
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
};

const faqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'titleGradient', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'searchPlaceholder', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 32,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
        { name: 'category', type: 'text' },
      ],
    },
  ],
};

const contentFeedBlock: Block = {
  slug: 'content-feed',
  interfaceName: 'ContentFeedBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'latest',
      options: [
        { label: 'Latest content', value: 'latest' },
        { label: 'Manual cards', value: 'manual' },
      ],
    },
    {
      name: 'collections',
      type: 'select',
      hasMany: true,
      defaultValue: ['posts', 'news'],
      options: [
        { label: 'Pages', value: 'pages' },
        { label: 'Posts', value: 'posts' },
        { label: 'News', value: 'news' },
        { label: 'Guides', value: 'guides' },
        { label: 'Tips', value: 'tips' },
        { label: 'Use cases', value: 'use-cases' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      min: 1,
      max: 12,
      defaultValue: 3,
    },
    {
      name: 'cards',
      type: 'array',
      maxRows: 12,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'href', type: 'text', required: true },
        imageField('image'),
        { name: 'meta', type: 'text' },
        {
          name: 'tags',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
          ],
        },
        { name: 'readTime', type: 'text' },
      ],
    },
  ],
};

const newsInsightsBlock: Block = {
  ...contentFeedBlock,
  slug: 'news-insights',
  interfaceName: 'NewsInsightsBlock',
};

const pricingCardsBlock: Block = {
  slug: 'pricing-cards',
  interfaceName: 'PricingCardsBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'gray',
      options: backgroundOptions.whiteGray,
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'accent',
          type: 'select',
          defaultValue: 'gradient',
          options: [
            { label: 'Gradient', value: 'gradient' },
            { label: 'Dark', value: 'dark' },
          ],
        },
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        textItemField('features'),
        { name: 'note', type: 'textarea' },
        optionalActionField('button', 'Button'),
      ],
    },
    { name: 'info', type: 'textarea' },
  ],
};

const pricingDetailsBlock: Block = {
  slug: 'pricing-details',
  interfaceName: 'PricingDetailsBlock',
  fields: [
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'background',
          type: 'select',
          defaultValue: 'gray',
          options: backgroundOptions.whiteGray,
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Comparison', value: 'comparison' },
          ],
        },
        { name: 'title', type: 'textarea' },
        { name: 'info', type: 'textarea' },
        {
          name: 'headers',
          type: 'array',
          fields: [
            { name: 'text', type: 'text', required: true },
          ],
        },
        {
          name: 'rows',
          type: 'array',
          fields: [
            {
              name: 'cells',
              type: 'array',
              fields: [
                { name: 'text', type: 'text' },
                { name: 'strong', type: 'checkbox', defaultValue: false },
                { name: 'accent', type: 'checkbox', defaultValue: false },
                { name: 'muted', type: 'checkbox', defaultValue: false },
                { name: 'stars', type: 'checkbox', defaultValue: false },
              ],
            },
          ],
        },
        { name: 'note', type: 'text' },
      ],
    },
  ],
};

const differenceBlock: Block = {
  slug: 'difference',
  interfaceName: 'DifferenceBlock',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    { name: 'leftTitle', type: 'text' },
    {
      name: 'leftItems',
      label: 'Left items',
      type: 'array',
      fields: [
        { name: 'text', type: 'text' },
      ],
    },
    { name: 'rightTitle', type: 'text' },
    {
      name: 'rightItems',
      label: 'Right items',
      type: 'array',
      fields: [
        { name: 'text', type: 'text' },
      ],
    },
    optionalActionField('action', 'Action'),
  ],
};

const painPointsComparisonBlock: Block = {
  slug: 'pain-points-comparison',
  interfaceName: 'PainPointsComparisonBlock',
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: backgroundOptions.whiteGray,
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea', required: true },
    { name: 'showColumnHeadings', type: 'checkbox', defaultValue: false },
    { name: 'leftHeading', type: 'text', defaultValue: 'The Challenge' },
    { name: 'rightHeading', type: 'text', defaultValue: 'Your AI Agent' },
    {
      name: 'rows',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'leftTitle', type: 'text' },
        { name: 'leftDescription', type: 'textarea' },
        { name: 'rightTitle', type: 'text' },
        { name: 'rightDescription', type: 'textarea' },
      ],
    },
    optionalActionField('action', 'Action'),
  ],
};

const pricingPolicyBlock: Block = {
  slug: 'pricing-policy',
  interfaceName: 'PricingPolicyBlock',
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: backgroundOptions.whiteGray,
    },
    { name: 'title', type: 'textarea' },
    {
      name: 'callouts',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'wallet',
          options: [
            { label: 'Wallet', value: 'wallet' },
            { label: 'Infinity', value: 'infinity' },
            { label: 'Headset', value: 'headset' },
            { label: 'Info', value: 'info' },
          ],
        },
        { name: 'text', type: 'textarea', required: true },
      ],
    },
    { name: 'info', type: 'textarea' },
  ],
};

const industryExpertiseBlock: Block = {
  slug: 'industry-expertise',
  interfaceName: 'IndustryExpertiseBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea', required: true },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'visualType',
      type: 'select',
      defaultValue: 'industry',
      options: [
        { label: 'Industry', value: 'industry' },
        { label: 'Platform', value: 'platform' },
        { label: 'Capabilities', value: 'capabilities' },
      ],
    },
    optionalActionField('button', 'Button'),
    { name: 'hideBottomControls', type: 'checkbox', defaultValue: false },
    { name: 'autoplay', type: 'checkbox', defaultValue: true },
    {
      name: 'autoplayInterval',
      type: 'number',
      min: 1,
      max: 30,
      defaultValue: 5,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Shopping cart', value: 'shopping_cart' },
            { label: 'Headset', value: 'headset' },
            { label: 'Cloud cog', value: 'cloud_cog' },
            { label: 'Hammer', value: 'hammer' },
            { label: 'Heart handshake', value: 'heart_handshake' },
            { label: 'Hotel', value: 'hotel' },
            { label: 'Brain', value: 'brain' },
            { label: 'Layers', value: 'layers' },
            { label: 'Wand', value: 'wand' },
            { label: 'Globe', value: 'globe' },
            { label: 'Users', value: 'users' },
            { label: 'Workflow', value: 'workflow' },
          ],
        },
        { name: 'customIcon', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        imageField('image'),
      ],
    },
    {
      name: 'infoCards',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'source', type: 'text' },
      ],
    },
  ],
};

const logoStripBlock: Block = {
  slug: 'logo-strip',
  interfaceName: 'LogoStripBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'logos',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        imageField('image'),
      ],
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'label', type: 'text' },
        { name: 'value', type: 'text' },
      ],
    },
  ],
};

const integrationsBannerBlock: Block = {
  slug: 'integrations-banner',
  interfaceName: 'IntegrationsBannerBlock',
  fields: [
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        imageField('icon', 'Icon'),
      ],
    },
  ],
};

const logoGridBlock: Block = {
  slug: 'logo-grid',
  interfaceName: 'LogoGridBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            imageField('image'),
            imageField('secondaryImage'),
            { name: 'label', type: 'text' },
            { name: 'subLabel', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
  ],
};

const tabsShowcaseBlock: Block = {
  slug: 'tabs-showcase',
  interfaceName: 'TabsShowcaseBlock',
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'gray',
      options: backgroundOptions.whiteGray,
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'autoplaySeconds',
      type: 'number',
      min: 0,
      max: 30,
      defaultValue: 0,
    },
    {
      name: 'tabs',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'icon', type: 'text' },
        imageField('customIcon'),
        {
          name: 'steps',
          type: 'array',
          minRows: 1,
          maxRows: 8,
          fields: [
            { name: 'text', type: 'textarea', required: true },
            { name: 'icon', type: 'text' },
            imageField('customIcon'),
          ],
        },
      ],
    },
  ],
};

const anchorNavBlock: Block = {
  slug: 'anchor-nav',
  interfaceName: 'AnchorNavBlock',
  fields: [
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: backgroundOptions.whiteGray,
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 16,
      fields: [
        { name: 'icon', type: 'text' },
        { name: 'label', type: 'text', required: true },
        {
          name: 'anchor',
          type: 'text',
          admin: {
            description: 'Same-page section id without #.',
          },
        },
      ],
    },
  ],
};

const testimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    { name: 'title', type: 'textarea' },
    { name: 'subtitle', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        { name: 'quote', type: 'textarea' },
        { name: 'authorName', type: 'text' },
        { name: 'authorRole', type: 'text' },
        imageField('authorImage'),
      ],
    },
  ],
};

const comparisonGridBlock: Block = {
  slug: 'comparison-grid',
  interfaceName: 'ComparisonGridBlock',
  fields: [
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 24,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        optionalActionField('action', 'Action'),
      ],
    },
  ],
};

const useCaseFlowBlock: Block = {
  slug: 'use-case-flow',
  interfaceName: 'UseCaseFlowBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'textarea' },
    { name: 'description', type: 'textarea' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'gray',
      options: backgroundOptions.whiteGray,
    },
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'label', type: 'text' },
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          maxRows: 8,
          fields: [
            { name: 'text', type: 'textarea', required: true },
          ],
        },
      ],
    },
  ],
};

export const routableBlocks = [
  heroBlock,
  heroExtendedBlock,
  richTextBlock,
  sideBySideBlock,
  storyBlock,
  mediaShowcaseBlock,
  featureGridBlock,
  agentCapabilitiesBlock,
  agentSolutionsBlock,
  contactUsBlock,
  conciergeFlowBlock,
  enterpriseUpgradeBlock,
  channelsGridBlock,
  featureStackBlock,
  coverageGridBlock,
  featureRowsBlock,
  capabilityTrioBlock,
  capabilityToolsBlock,
  useCasesGridBlock,
  securityBlock,
  conversationReplayBlock,
  recoveryCalculatorBlock,
  functionalCapabilitiesBlock,
  howItWorksBlock,
  ctaBlock,
  metricsBlock,
  resultsStatsBlock,
  statsCardsBlock,
  capabilityStripBlock,
  liveInDaysBlock,
  faqBlock,
  newsInsightsBlock,
  contentFeedBlock,
  pricingCardsBlock,
  pricingDetailsBlock,
  differenceBlock,
  painPointsComparisonBlock,
  pricingPolicyBlock,
  industryExpertiseBlock,
  logoStripBlock,
  integrationsBannerBlock,
  logoGridBlock,
  tabsShowcaseBlock,
  anchorNavBlock,
  testimonialsBlock,
  comparisonGridBlock,
  useCaseFlowBlock,
].map(withRootField);

export function createRoutableCollection(options: RoutableContentOptions): CollectionConfig {
  const articleIdentityAndPublishingFields: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'slug',
          type: 'text',
          required: true,
          index: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'publishedAt',
          label: 'Published at',
          type: 'date',
          admin: {
            description: 'Public publication date. Leave empty while the article is an unpublished draft.',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'path',
      label: 'Canonical URL path',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Route path is migration-critical and must stay stable unless redirects are created.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
          admin: {
            hidden: true,
            readOnly: true,
            width: '50%',
          },
        },
        {
          name: 'template',
          type: 'select',
          defaultValue: options.defaultTemplate,
          options: options.templateOptions,
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ];

  const standardFields: Field[] = [
    { name: 'title', type: 'text', required: true },
    {
      name: 'contentKey',
      label: 'Content key',
      type: 'text',
      index: true,
      admin: {
        description: 'Opaque stable content identity from the sanitized migration source. It is not rendered publicly.',
        readOnly: true,
      },
    },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'excerpt', type: 'textarea' },
    ...(options.tipCardEditing ? [tipCardField] : []),
    { name: 'publishedAt', label: 'Published at', type: 'text' },
    {
      name: 'path',
      label: 'Canonical URL path',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Route path is migration-critical and must stay stable unless redirects are created.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      admin: {
        hidden: true,
        readOnly: true,
      },
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'template',
      type: 'select',
      defaultValue: options.defaultTemplate,
      options: options.templateOptions,
    },
    { name: 'seo', type: 'group', fields: seoFields },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: routableBlocks,
    },
    {
      name: 'importTrace',
      type: 'json',
      admin: {
        description: 'Sanitized import metadata only. Not used by the public frontend.',
        readOnly: true,
      },
    },
  ];

  const articleFields: Field[] = [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'excerpt', type: 'textarea' },
            featuredImageField,
            importedFeaturedImageField,
            {
              name: 'blocks',
              label: 'Article content',
              type: 'blocks',
              blocks: routableBlocks,
              admin: {
                description: 'Add, edit, and reorder the existing product content blocks.',
              },
            },
          ],
        },
        {
          label: 'Publishing & presentation',
          fields: [
            ...articleIdentityAndPublishingFields,
            articleMetaField,
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'seo', type: 'group', fields: seoFields },
          ],
        },
        {
          label: 'Migration',
          fields: [
            {
              name: 'contentKey',
              label: 'Content key',
              type: 'text',
              index: true,
              admin: {
                description: 'Opaque stable content identity from the sanitized migration source. It is not rendered publicly.',
                readOnly: true,
              },
            },
            {
              name: 'importTrace',
              type: 'json',
              admin: {
                description: 'Sanitized import metadata only. Not used by the public frontend.',
                readOnly: true,
              },
            },
          ],
        },
      ],
    },
  ];

  return {
    slug: options.slug,
    labels: options.labels,
    admin: {
      useAsTitle: 'title',
      defaultColumns: ['title', 'path', 'status', 'updatedAt'],
    },
    access: {
      read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
    },
    versions: {
      drafts: true,
    },
    hooks: {
      beforeChange: [
        ({ data }) => {
          if (data._status === 'draft' || data._status === 'published') {
            data.status = data._status;
          }

          return data;
        },
      ],
      afterChange: [triggerFrontendDeployAfterChange],
      afterDelete: [triggerFrontendDeployAfterDelete],
    },
    fields: options.articleEditing ? articleFields : standardFields,
  };
}
