import { createRoutableCollection } from './RoutableContent';

export const Guides = createRoutableCollection({
  slug: 'guides',
  labels: {
    singular: 'Guide',
    plural: 'Guides',
  },
  defaultTemplate: 'guide',
  articleEditing: true,
  templateOptions: [
    { label: 'Guide', value: 'guide' },
    { label: 'Article', value: 'article' },
  ],
});
