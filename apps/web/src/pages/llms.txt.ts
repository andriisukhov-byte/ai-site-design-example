import { siteChrome } from '@acme/config';

import { getSiteIndexEntries } from '../data/site-index';

export async function GET() {
  const entries = await getSiteIndexEntries();
  const byCollection = new Map<string, typeof entries>();
  const corePaths = ['/', '/blog/', '/guides/', '/news/', '/tips-and-tricks/'];
  const coreEntries = corePaths
    .map((path) => entries.find((entry) => entry.path === path))
    .filter((entry): entry is (typeof entries)[number] => Boolean(entry));
  const corePathSet = new Set(coreEntries.map((entry) => entry.path));

  for (const entry of entries) {
    const collectionEntries = byCollection.get(entry.collection) ?? [];
    collectionEntries.push(entry);
    byCollection.set(entry.collection, collectionEntries);
  }

  const lines = [
    `# ${siteChrome.siteName}`,
    '',
    'Acme helps teams build cognitive AI agents for business automation, customer support, sales, operations, and content workflows.',
    '',
    '## Primary Routes',
    ...coreEntries.map(formatEntry),
    ...entries
      .filter((entry) => entry.collection === 'pages')
      .filter((entry) => !corePathSet.has(entry.path))
      .slice(0, 80)
      .map(formatEntry),
  ];

  for (const [collection, collectionEntries] of [...byCollection.entries()].filter(([collection]) => collection !== 'pages')) {
    lines.push('', `## ${formatCollection(collection)}`);
    lines.push(...collectionEntries.slice(0, 120).map(formatEntry));
  }

  lines.push('', `Generated from ${entries.length} published, indexable CMS routes.`);

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

function formatEntry(entry: Awaited<ReturnType<typeof getSiteIndexEntries>>[number]): string {
  const description = entry.description.replace(/\s+/g, ' ').trim();
  return `- [${entry.title}](${entry.url})${description ? `: ${description}` : ''}`;
}

function formatCollection(collection: string): string {
  return collection
    .split('-')
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}
