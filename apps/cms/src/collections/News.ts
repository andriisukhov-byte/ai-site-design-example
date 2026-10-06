import { createRoutableCollection } from './RoutableContent';

export const News = createRoutableCollection({
  slug: 'news',
  labels: {
    singular: 'News item',
    plural: 'News',
  },
  defaultTemplate: 'news',
  articleEditing: true,
  templateOptions: [
    { label: 'News', value: 'news' },
    { label: 'Article', value: 'article' },
  ],
});
