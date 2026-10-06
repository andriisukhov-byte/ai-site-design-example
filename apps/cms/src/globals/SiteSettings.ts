import type { GlobalConfig } from 'payload';
import { siteChrome } from '@acme/config';
import { triggerFrontendDeployAfterGlobalChange } from '../hooks/triggerFrontendDeploy';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  hooks: {
    afterChange: [triggerFrontendDeployAfterGlobalChange],
  },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Acme', required: true },
    { name: 'siteUrl', type: 'text', defaultValue: 'https://acme.example', required: true },
    {
      name: 'defaultSeo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'socialImage', type: 'relationship', relationTo: 'media' },
      ],
    },
    {
      name: 'primaryNavigation',
      label: 'Primary navigation',
      type: 'array',
      defaultValue: siteChrome.primaryNavigation,
      admin: {
        description: 'Edit standard links and mega-menu items here. Use internal paths with a trailing slash.',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'link',
          options: [
            { label: 'Standard link', value: 'link' },
            { label: 'Mega menu', value: 'mega' },
          ],
        },
        {
          name: 'items',
          label: 'Mega-menu items',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData?.variant === 'mega',
          },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
            { name: 'icon', type: 'text', admin: { description: 'Optional existing mega-menu icon name.' } },
            {
              name: 'role',
              type: 'select',
              defaultValue: 'link',
              options: [
                { label: 'Link', value: 'link' },
                { label: 'Column heading', value: 'heading' },
                { label: 'Full-width heading', value: 'span-heading' },
                { label: 'Bottom “all” link', value: 'all' },
              ],
            },
            { name: 'startColumn', type: 'checkbox', label: 'Start a new column' },
            { name: 'startRow', type: 'checkbox', label: 'Start a new row' },
          ],
        },
      ],
    },
    {
      name: 'footerNavigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
};
