import type { CollectionConfig } from 'payload';

export const Forms: CollectionConfig = {
  slug: 'forms',
  labels: {
    singular: 'Form Definition',
    plural: 'Form Definitions',
  },
  admin: {
    group: 'Forms',
    useAsTitle: 'title',
    defaultColumns: ['title', 'intent', 'updatedAt'],
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'intent',
      type: 'select',
      required: true,
      options: [
        { label: 'Request demo', value: 'request-demo' },
        { label: 'Contact', value: 'contact' },
        { label: 'Enterprise', value: 'enterprise' },
        { label: 'Blog subscribe', value: 'blog-subscribe' },
      ],
    },
    { name: 'description', type: 'textarea' },
    {
      name: 'fields',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'URL', value: 'url' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Select', value: 'select' },
            { label: 'Checkbox', value: 'checkbox' },
            { label: 'Hidden', value: 'hidden' },
          ],
        },
        { name: 'required', type: 'checkbox', defaultValue: false },
        { name: 'options', type: 'array', fields: [{ name: 'label', type: 'text' }, { name: 'value', type: 'text' }] },
      ],
    },
    {
      name: 'successBehavior',
      type: 'group',
      fields: [
        { name: 'message', type: 'textarea' },
        { name: 'redirectPath', type: 'text' },
      ],
    },
    {
      name: 'notificationConfigKey',
      type: 'text',
      admin: {
        description: 'Code-owned integration key. Never store secrets here.',
      },
    },
    {
      name: 'crmConfigKey',
      type: 'text',
      admin: {
        description: 'Code-owned integration key. Never store secrets here.',
      },
    },
  ],
};
