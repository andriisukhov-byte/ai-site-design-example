import { createRoutableCollection } from './RoutableContent';

export const Pages = createRoutableCollection({
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  defaultTemplate: 'standard',
  templateOptions: [
    { label: 'Standard', value: 'standard' },
    { label: 'Landing', value: 'landing' },
    { label: 'Document', value: 'document' },
  ],
});
