import { createClient } from '@libsql/client';

import { argString, parseArgs } from '../migrate/source-utils';

const args = parseArgs();
const databasePath = argString(args, 'database', 'apps/cms/apps-cms.db')!;
const databaseUrl = databasePath.startsWith('file:') ? databasePath : `file:${databasePath.replace(/\\/g, '/')}`;
const articleTables = ['posts', 'news', 'guides'];
const columns = [
  ['source_featured_image_source_id', 'text'],
  ['source_featured_image_src', 'text'],
  ['source_featured_image_alt', 'text'],
  ['source_featured_image_width', 'numeric'],
  ['source_featured_image_height', 'numeric'],
] as const;
const client = createClient({ url: databaseUrl });
const changes: Array<{ table: string; column: string; action: 'exists' | 'added' | 'missing-table' }> = [];

try {
  for (const table of articleTables) {
    if (!(await hasTable(table))) {
      changes.push({ table, column: '*', action: 'missing-table' });
      continue;
    }

    for (const [column, type] of columns) {
      if (await hasColumn(table, column)) {
        changes.push({ table, column, action: 'exists' });
        continue;
      }

      await client.execute(`alter table "${table}" add column "${column}" ${type}`);
      changes.push({ table, column, action: 'added' });
    }
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

async function hasColumn(table: string, column: string): Promise<boolean> {
  const result = await client.execute(`pragma table_info("${table}")`);
  return result.rows.some((row) => row.name === column);
}
