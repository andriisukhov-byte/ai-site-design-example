import type { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'authorRole', 'status', 'sortOrder'],
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
    { name: 'quote', type: 'textarea', required: true },
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorRole', type: 'text' },
    {
      name: 'authorImage',
      type: 'relationship',
      relationTo: 'media',
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
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first when a block resolves collection-backed testimonials.',
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
