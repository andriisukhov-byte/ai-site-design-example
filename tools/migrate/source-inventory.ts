import {
  addCount,
  argString,
  collectCreateTables,
  defaultDumpPath,
  defaultThemeBlocksDir,
  extractSourceBlocks,
  forSqlRows,
  inspectThemeBlocks,
  parseArgs,
  sha256File,
  sourceBasename,
  toStringValue,
  writeJson,
} from './source-utils';

type BlockStats = {
  count: number;
  documents: number;
  fieldCounts: Record<string, number>;
  sampleTitles: string[];
  hasThemeBlock: boolean;
  themeFieldCount: number;
};

const args = parseArgs();
const dump = argString(args, 'dump', process.env.SOURCE_DB_DUMP || defaultDumpPath);
const themeBlocksDir = argString(args, 'theme-blocks', process.env.SOURCE_THEME_BLOCKS || defaultThemeBlocksDir);
const out = argString(args, 'out', 'data/source/inventory.json')!;

if (!dump) {
  console.error('Usage: npm run migrate:source:inventory -- --dump D:/path/to/source.sql');
  process.exit(1);
}

const themeBlocks = await inspectThemeBlocks(themeBlocksDir);
const themeBlockNames = new Set(themeBlocks.map((block) => block.name));
const themeFieldCounts = Object.fromEntries(themeBlocks.map((block) => [block.name, block.fields.length]));
const tables = await collectCreateTables(dump);
const sourceDocumentKinds = new Set(['page', 'post', 'guide', 'tip', 'news']);
const sourceDocumentStatuses = new Set(['publish', 'draft', 'future', 'pending', 'private']);
const sensitiveTablePattern = /(?:users|usermeta|options|comments|commentmeta|actionscheduler|wpmailsmtp|wpwhpro|backup|debug|tasks|authentication)/i;
const detailedTables = new Set(['wp_posts', 'wp_postmeta', 'wp_yoast_indexable', 'wp_terms', 'wp_term_taxonomy', 'wp_term_relationships']);
const rowCounts: Record<string, number> = {};
const postTypes: Record<string, number> = {};
const postStatuses: Record<string, number> = {};
const documentTypeStatuses: Record<string, Record<string, number>> = {};
const blockDocuments = new Map<string, Set<string>>();
const blockStats: Record<string, BlockStats> = {};

await forSqlRows(dump, undefined, (table, row) => {
  if (detailedTables.has(table)) {
    addCount(rowCounts, table);
  }

  if (table !== 'wp_posts') {
    return;
  }

  const id = toStringValue(row[0]);
  const content = toStringValue(row[4]);
  const title = toStringValue(row[5]);
  const status = toStringValue(row[7]) || 'unknown';
  const type = toStringValue(row[20]) || 'unknown';

  addCount(postTypes, type);
  addCount(postStatuses, status);
  documentTypeStatuses[type] ??= {};
  addCount(documentTypeStatuses[type], status);

  if (!sourceDocumentKinds.has(type) || !sourceDocumentStatuses.has(status)) {
    return;
  }

  const blocks = extractSourceBlocks(content);

  for (const block of blocks) {
    blockStats[block.name] ??= {
      count: 0,
      documents: 0,
      fieldCounts: {},
      sampleTitles: [],
      hasThemeBlock: themeBlockNames.has(block.name),
      themeFieldCount: themeFieldCounts[block.name] ?? 0,
    };

    const stats = blockStats[block.name];
    stats.count += 1;

    if (!blockDocuments.has(block.name)) {
      blockDocuments.set(block.name, new Set());
    }

    blockDocuments.get(block.name)!.add(id);

    if (stats.sampleTitles.length < 5 && title) {
      stats.sampleTitles.push(title);
    }

    for (const key of Object.keys(block.data)) {
      addCount(stats.fieldCounts, key);
    }
  }
});

for (const [name, documents] of blockDocuments) {
  blockStats[name].documents = documents.size;
}

const sortedBlockStats = Object.fromEntries(
  Object.entries(blockStats).sort((left, right) => right[1].count - left[1].count || left[0].localeCompare(right[0])),
);

const themeOnlyBlocks = themeBlocks
  .filter((block) => !blockStats[block.name])
  .map((block) => ({
    name: block.name,
    title: block.title,
    fields: block.fields.length,
    hasTemplate: block.hasTemplate,
    hasStyles: block.hasStyles,
    hasScript: block.hasScript,
  }));

const inventory = {
  generatedAt: new Date().toISOString(),
  source: {
    dumpFile: sourceBasename(dump),
    dumpSha256: await sha256File(dump),
    themeBlocksDir,
  },
  totals: {
    tables: tables.length,
    themeBlocks: themeBlocks.length,
    sourceBlocksUsed: Object.keys(blockStats).length,
  },
  inventoryScope: {
    sourceDocumentKinds: [...sourceDocumentKinds],
    sourceDocumentStatuses: [...sourceDocumentStatuses],
    excludes: ['revision', 'attachment', 'form definitions', 'navigation', 'field definitions'],
  },
  tables: tables.filter((table) => !sensitiveTablePattern.test(table)),
  excludedTableDetails: {
    count: tables.filter((table) => sensitiveTablePattern.test(table)).length,
    reason: 'Sensitive or operational tables are intentionally omitted from committed inventory details.',
  },
  rowCounts,
  postTypes,
  postStatuses,
  documentTypeStatuses,
  sourceBlocks: sortedBlockStats,
  themeBlocks,
  themeOnlyBlocks,
  notes: [
    'Inventory is read-only analysis evidence. It is not a runtime mapping contract.',
    'Only sanitized derived data may be committed. Raw SQL dumps stay outside git.',
  ],
};

await writeJson(out, inventory);

console.log(JSON.stringify({
  ok: true,
  out,
  tables: tables.length,
  themeBlocks: themeBlocks.length,
  sourceBlocksUsed: Object.keys(blockStats).length,
}, null, 2));
