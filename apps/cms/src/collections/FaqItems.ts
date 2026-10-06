import type { CollectionConfig } from 'payload';

export const FaqItems: CollectionConfig = {
  slug: 'faq-items',
  labels: {
    singular: 'FAQ item',
    plural: 'FAQ items',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'status', 'sortOrder'],
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
  },
  fields: [
    {
      name: 'sourceKey',
      type: 'text',
      unique: true,
      admin: {
        description: 'Stable sanitized import key. Not used by the public frontend.',
      },
    },
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    { name: 'category', type: 'text' },
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
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first when a block resolves collection-backed FAQs.',
      },
    },
    {
      name: 'importTrace',
      type: 'json',
      admin: {
        description: 'Sanitized import metadata only.',
        readOnly: true,
      },
    },
  ],
};
