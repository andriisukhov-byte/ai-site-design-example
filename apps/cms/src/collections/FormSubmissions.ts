import type { Access, CollectionConfig } from 'payload';

const isAuthenticated: Access = ({ req }) => Boolean(req.user);

const canCreateFromSite: Access = ({ req }) => {
  if (req.user) {
    return true;
  }

  const configuredSecret = process.env.FORM_SUBMISSION_SECRET;

  if (!configuredSecret) {
    return false;
  }

  return req.headers.get('x-acme-form-secret') === configuredSecret;
};

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: {
    singular: 'Form Submission',
    plural: 'Form Submissions',
  },
  admin: {
    group: 'Forms',
    useAsTitle: 'email',
    defaultColumns: ['email', 'intent', 'status', 'createdAt'],
  },
  access: {
    create: canCreateFromSite,
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
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
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Delivery failed', value: 'delivery-failed' },
        { label: 'Spam rejected', value: 'spam-rejected' },
      ],
    },
    { name: 'name', type: 'text' },
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'companyWebsite', type: 'text' },
    { name: 'industry', type: 'text' },
    { name: 'department', type: 'text' },
    { name: 'teamSize', type: 'text' },
    { name: 'functions', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] },
    { name: 'message', type: 'textarea' },
    { name: 'consent', type: 'checkbox', defaultValue: false },
    {
      name: 'tracking',
      type: 'group',
      fields: [
        { name: 'referrer', type: 'text' },
        { name: 'utmSource', type: 'text' },
        { name: 'utmMedium', type: 'text' },
        { name: 'utmCampaign', type: 'text' },
        { name: 'source', type: 'text' },
        { name: 'allPagesVisited', type: 'textarea' },
        { name: 'firstPageVisited', type: 'text' },
        { name: 'visitorCountry', type: 'text' },
        { name: 'visitorCity', type: 'text' },
        { name: 'visitorContinent', type: 'text' },
        { name: 'visitorCallingCode', type: 'text' },
        { name: 'visitorChannel', type: 'text' },
        { name: 'currentTime', type: 'text' },
      ],
    },
    {
      name: 'delivery',
      type: 'group',
      fields: [
        { name: 'payloadStored', type: 'checkbox', defaultValue: false },
        { name: 'formspreeSent', type: 'checkbox', defaultValue: false },
        { name: 'emailSent', type: 'checkbox', defaultValue: false },
        { name: 'webhookSent', type: 'checkbox', defaultValue: false },
        { name: 'error', type: 'textarea' },
      ],
    },
    {
      name: 'metadata',
      type: 'group',
      fields: [
        { name: 'receivedAt', type: 'date', required: true },
        { name: 'ip', type: 'text' },
        { name: 'userAgent', type: 'textarea' },
      ],
    },
    {
      name: 'raw',
      type: 'json',
      admin: {
        description: 'Sanitized submitted payload for debugging and downstream integrations.',
      },
    },
  ],
};
