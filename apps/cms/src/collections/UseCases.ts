import { createRoutableCollection } from './RoutableContent';

export const UseCases = createRoutableCollection({
  slug: 'use-cases',
  labels: {
    singular: 'Use case',
    plural: 'Use cases',
  },
  defaultTemplate: 'use-case',
  templateOptions: [
    { label: 'Use case', value: 'use-case' },
    { label: 'Industry use case', value: 'industry-use-case' },
  ],
});
