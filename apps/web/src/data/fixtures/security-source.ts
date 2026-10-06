import { pageBlockSchema, type PageBlock } from '@acme/blocks';

export const securitySourceFixture: PageBlock = pageBlockSchema.parse({
  type: 'security',
  background: 'white',
  title: 'Enterprise-Grade',
  titleGradient: 'Security & Compliance',
  cards: [
    { icon: 'database_zap', title: 'Data Protection', description: 'Advanced encryption and security protocols that meet or exceed industry standards for protecting customer information.' },
    { icon: 'file_key', title: 'Privacy Assurance', description: 'Your business data and customer interactions remain exclusively yours, only shared with trusted subprocessors as required to operate the platform.' },
    { icon: 'shield_ellipsis', title: 'Secure System Integration', description: 'Role-based access controls and encrypted connection protocols ensure your systems remain protected while enabling seamless data flow between Acme and your business tools.' },
    { icon: 'text_search', title: 'Audit & Monitoring', description: 'Full activity logging and audit trails across every agent interaction, workflow execution, and system connection.' },
  ],
});
