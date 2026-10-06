import { mcpPlugin, type MCPPluginConfig } from '@payloadcms/plugin-mcp';

const editableContent = {
  enabled: {
    find: true,
    create: true,
    update: true,
  },
};

export const mcpConfig: MCPPluginConfig = {
  collections: {
    pages: {
      ...editableContent,
      description: 'Marketing pages assembled from typed content blocks. Keep canonical path values stable.',
    },
    posts: {
      ...editableContent,
      description: 'Blog posts with SEO fields and block-based content.',
    },
    news: {
      ...editableContent,
      description: 'News entries with stable URLs and SEO metadata.',
    },
    guides: {
      ...editableContent,
      description: 'How-to guides for long-form educational content.',
    },
    tips: {
      ...editableContent,
      description: 'Tips and tricks articles for short-form educational content.',
    },
    'use-cases': {
      ...editableContent,
      description: 'Use-case pages. These are template-driven but still composed from blocks.',
    },
    forms: {
      enabled: {
        find: true,
        create: true,
        update: true,
      },
      description: 'Contact and lead-generation forms used by site calls to action.',
    },
    media: {
      enabled: {
        find: true,
      },
      description: 'Media library records. Prefer existing assets; uploads are handled by the media pipeline.',
    },
  },
  globals: {
    'site-settings': {
      enabled: {
        find: true,
        update: true,
      },
      description: 'Site-wide settings, SEO defaults, and navigation data.',
    },
  },
  mcp: {
    serverOptions: {
      serverInfo: {
        name: 'Acme Payload CMS',
        version: '0.1.0',
      },
      instructions: [
        'Use this MCP server to read and edit Acme CMS content.',
        'Preserve canonical URL paths unless a redirect plan exists.',
        'Use select to limit responses when listing documents.',
        'Prefer block-based content over raw HTML for new pages.',
        'Do not delete documents through AI workflows.',
      ].join('\n'),
    },
    resources: [
      {
        name: 'contentBlockGuide',
        title: 'Acme Content Block Guide',
        description: 'Guidance for selecting CMS blocks when creating or improving pages.',
        uri: 'acme://guides/content-blocks',
        mimeType: 'text/markdown',
        handler: (uri: URL) => ({
          contents: [
            {
              uri: uri.href,
              text: [
                '# Acme Content Block Guide',
                '',
                '- Use `hero` as the first block on full marketing pages.',
                '- Use `side-by-side` when a section compares a product capability with supporting media or bullets.',
                '- Use `feature-grid` only for source-style feature card grids with optional centered header, 3/4-column layout, and gradient preset icons.',
                '- Use `channels-grid` for source-style "every channel" sections with five explicit cards, channel previews, and optional wide cards.',
                '- Use `feature-stack` for source-style two-column proof stacks with three icon cards and an optional info note.',
                '- Use `coverage-grid` for source-style service coverage sections with two-column icon cards.',
                '- Use `use-cases-grid` for source-style large card rosters with preset icons and 3/4-column behavior.',
                '- Use `feature-rows` only for the source three-row visual flow section.',
                '- Use `security` for source-style security/compliance proof with four cards.',
                '- Use `functional-capabilities` for source-style workflow capability grids and cross-channel cards.',
                '- Use `metrics` only when the source gives real measurable claims.',
                '- Use `faq` near the end of pages that target search intent or sales objections.',
                '- Use `cta` as a closing conversion block and between long page sections when the next action is clear.',
                '- Keep `seo.metaTitle`, `seo.metaDescription`, and canonical `path` filled before publishing.',
              ].join('\n'),
            },
          ],
        }),
      },
    ],
    handlerOptions: {
      maxDuration: 60,
      verboseLogs: process.env.PAYLOAD_MCP_VERBOSE === 'true',
    },
  },
  disabled: process.env.PAYLOAD_MCP_DISABLED === 'true',
};

export const payloadMcpPlugin = mcpPlugin(mcpConfig);
