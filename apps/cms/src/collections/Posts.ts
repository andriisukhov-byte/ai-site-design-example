import { createRoutableCollection } from './RoutableContent';

export const Posts = createRoutableCollection({
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  defaultTemplate: 'article',
  articleEditing: true,
  templateOptions: [
    { label: 'Article', value: 'article' },
    { label: 'Guide', value: 'guide' },
  ],
});
