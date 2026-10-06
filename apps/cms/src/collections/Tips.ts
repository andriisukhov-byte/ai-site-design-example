import { createRoutableCollection } from './RoutableContent';

export const Tips = createRoutableCollection({
  slug: 'tips',
  labels: {
    singular: 'Tip',
    plural: 'Tips',
  },
  defaultTemplate: 'tip',
  tipCardEditing: true,
  templateOptions: [
    { label: 'Tip', value: 'tip' },
    { label: 'Article', value: 'article' },
  ],
});
