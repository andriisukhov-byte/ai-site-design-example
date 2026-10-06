import { pageBlockSchema } from '@acme/blocks';

export const featureGridFourColumnsFixture = pageBlockSchema.parse({
  type: 'feature-grid',
  background: 'gray' as const,
  title: 'Why It Matters: {{ Context You Can See }}',
  description: 'Most AI arrives as static blocks of text, informative, but hard to absorb quickly. Magic Window transforms that experience. It turns AI answers into clear, adaptive visual elements, so information isn’t just read, it’s seen, felt, and understood at a glance.',
  columns: 4,
  cards: [
    {
      icon: 'sun',
      title: 'Instant||Clarity',
      description: 'Answers come alive through charts, images, and dynamic visuals that summarize key points on the spot.',
    },
    {
      icon: 'blocks',
      title: 'Effortless Comprehension',
      description: 'Complex topics become simple with automatically generated visuals that highlight what matters most.',
    },
    {
      icon: 'refresh-cw',
      title: 'Adaptive||Flow',
      description: 'As conversations evolve, visuals shift in real time to match the context, no manual searching or tab-switching.',
    },
    {
      icon: 'message-square-text',
      title: 'Engaging||Experience',
      description: 'Users stay focused and curious when every response feels tailored, intuitive, and visually clear.',
    },
  ],
  root: {
    anchor: 'why',
  },
});
