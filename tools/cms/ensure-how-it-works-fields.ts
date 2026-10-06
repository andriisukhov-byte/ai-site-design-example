import { createClient } from '@libsql/client';

import { argString, parseArgs } from '../migrate/source-utils';

const args = parseArgs();
const databasePath = argString(args, 'database', 'apps/cms/payload.db')!;
const databaseUrl = databasePath.startsWith('file:') ? databasePath : `file:${databasePath.replace(/\\/g, '/')}`;
const blockTables = [
  'pages_blocks_how_it_works',
  'posts_blocks_how_it_works',
  'news_blocks_how_it_works',
  'guides_blocks_how_it_works',
  'tips_blocks_how_it_works',
  'use_cases_blocks_how_it_works',
];
const column = 'show_step_numbers';
const client = createClient({ url: databaseUrl });
const changes: Array<{ table: string; action: 'exists' | 'added' | 'missing-table' }> = [];

try {
  for (const table of blockTables) {
    if (!(await hasTable(table))) {
      changes.push({ table, action: 'missing-table' });
      continue;
    }

    if (await hasColumn(table, column)) {
      changes.push({ table, action: 'exists' });
      continue;
    }

    await client.execute(`alter table "${table}" add column "${column}" numeric default 1`);
    changes.push({ table, action: 'added' });
  }
} finally {
  client.close();
}

console.log(JSON.stringify({
  ok: true,
  databaseUrl,
  added: changes.filter((change) => change.action === 'added').length,
  existing: changes.filter((change) => change.action === 'exists').length,
  changes,
}, null, 2));

async function hasTable(table: string): Promise<boolean> {
  const result = await client.execute({
    sql: 'select name from sqlite_master where type = ? and name = ?',
    args: ['table', table],
  });

  return result.rows.length > 0;
}

async function hasColumn(table: string, columnName: string): Promise<boolean> {
  const result = await client.execute(`pragma table_info("${table}")`);
  return result.rows.some((row) => row.name === columnName);
}
