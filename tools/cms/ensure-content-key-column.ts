import { createClient } from '@libsql/client';

import { argString, parseArgs } from '../migrate/source-utils';

const args = parseArgs();
const databasePath = argString(args, 'database', 'apps/cms/payload.db')!;
const databaseUrl = databasePath.startsWith('file:') ? databasePath : `file:${databasePath.replace(/\\/g, '/')}`;
const routableTables = ['pages', 'posts', 'news', 'guides', 'tips', 'use_cases'];
const client = createClient({ url: databaseUrl });
const changes: Array<{ table: string; action: 'exists' | 'added' | 'missing-table' }> = [];

try {
  for (const table of routableTables) {
    const tableExists = await hasTable(table);

    if (!tableExists) {
      changes.push({ table, action: 'missing-table' });
      continue;
    }

    const columnExists = await hasColumn(table, 'content_key');

    if (columnExists) {
      changes.push({ table, action: 'exists' });
      continue;
    }

    await client.execute(`alter table "${table}" add column "content_key" text`);
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
  missingTables: changes.filter((change) => change.action === 'missing-table').map((change) => change.table),
  changes,
}, null, 2));

async function hasTable(table: string): Promise<boolean> {
  const result = await client.execute({
    sql: 'select name from sqlite_master where type = ? and name = ?',
    args: ['table', table],
  });

  return result.rows.length > 0;
}

async function hasColumn(table: string, column: string): Promise<boolean> {
  const result = await client.execute(`pragma table_info("${table}")`);

  return result.rows.some((row) => row.name === column);
}
