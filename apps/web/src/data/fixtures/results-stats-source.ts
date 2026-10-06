import { pageBlockSchema, type PageBlock } from '@acme/blocks';

export const resultsStatsSourceFixture: PageBlock = pageBlockSchema.parse({
  background: 'white',
  type: 'results-stats',
  title: 'What Operations Teams Are Seeing in {{ the First 90 Days }}',
  items: [
    { value: '85%', description: 'Reduction in process cycle time on workflows moved from manual handoff to trigger-based execution.' },
    { value: '73%', description: 'Faster approval turnaround after replacing inbox-routed decisions with conditional routing logic.' },
    { value: '60%', description: 'Drop in time spent on exception handling once edge cases were mapped into explicit workflow branches.' },
    { value: '3x', description: 'Faster go-live compared to traditional iPaaS or developer-built automation setups.' },
  ],
  infoNote: 'Indicative outcomes based on customer benchmarks across finance, healthcare, and operations deployments; specific results vary by workflow scope and integration depth.',
});
