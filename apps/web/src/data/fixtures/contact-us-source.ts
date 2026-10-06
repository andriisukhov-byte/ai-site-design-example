import { pageBlockSchema, type PageBlock } from '@acme/blocks';

export const contactUsSourceFixture: PageBlock = pageBlockSchema.parse({
  type: 'contact-us',
  titleStart: "Let's",
  titleAccent: 'Connect!',
  description: "Whether you have questions, need support, or want to share your ideas, we're glad to hear from you.",
  city: 'Paphos, Cyprus',
  address: 'Neofytou Nikolaidi and Theodorou Kolokotroni ONISIFOROU CENTER, 2nd floor',
  phone: '+35-796-95-16-60',
  logo: { id: '8475', src: '/media/2026/05/logo-icon.svg', alt: 'logo icon' },
});
