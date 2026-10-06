import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';

import { createClient } from '@libsql/client';
import { config as loadEnv } from 'dotenv';

const cmsDir = resolve('apps/cms');

loadEnv({ path: resolve(cmsDir, '.env') });
normalizeCmsDatabaseUrl(cmsDir);

type FormsExport = {
  forms: Array<{
    title: string;
    intent: string;
    description?: string;
    fields?: Array<{
      name: string;
      label: string;
      type: string;
      required?: boolean;
      options?: Array<{ label: string; value: string }>;
    }>;
    successBehavior?: {
      message?: string;
      redirectPath?: string;
    };
    notificationConfigKey?: string;
    crmConfigKey?: string;
  }>;
};

const file = argString('file', 'data/source/forms.json')!;
const write = argString('write', 'false') === 'true';
const prune = argString('prune', 'false') === 'true';
const input = JSON.parse(await readFile(file, 'utf8')) as FormsExport;

if (!write) {
  console.log(JSON.stringify({
    ok: true,
    action: 'dry-run',
    file,
    forms: input.forms.map((form) => ({ title: form.title, intent: form.intent, fields: form.fields?.length ?? 0 })),
    note: 'Re-run with --write true to upsert into the CMS SQLite database.',
  }, null, 2));
  process.exit(0);
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required to upsert form definitions.');
}

const db = createClient({ url: databaseUrl });

await execute(db, 'pragma busy_timeout = 10000');

let created = 0;
let updated = 0;
let deleted = 0;

for (const form of input.forms) {
  const existing = await execute(db, {
    sql: 'select id from forms where title = ? limit 1',
    args: [form.title],
  });
  const now = new Date().toISOString();
  let formId = existing.rows[0]?.id;

  if (formId) {
    await deleteFormFields(db, formId);
    await execute(db, {
      sql: `
        update forms
        set intent = ?, description = ?, success_behavior_message = ?, success_behavior_redirect_path = ?,
            notification_config_key = ?, crm_config_key = ?, updated_at = ?
        where id = ?
      `,
      args: [
        form.intent,
        form.description ?? null,
        form.successBehavior?.message ?? null,
        form.successBehavior?.redirectPath ?? null,
        form.notificationConfigKey ?? null,
        form.crmConfigKey ?? null,
        now,
        formId,
      ],
    });
    updated += 1;
  } else {
    await execute(db, {
      sql: `
        insert into forms (
          title, intent, description, success_behavior_message, success_behavior_redirect_path,
          notification_config_key, crm_config_key, updated_at, created_at
        )
        values (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        form.title,
        form.intent,
        form.description ?? null,
        form.successBehavior?.message ?? null,
        form.successBehavior?.redirectPath ?? null,
        form.notificationConfigKey ?? null,
        form.crmConfigKey ?? null,
        now,
        now,
      ],
    });
    const createdForm = await execute(db, {
      sql: 'select id from forms where title = ? order by id desc limit 1',
      args: [form.title],
    });
    formId = createdForm.rows[0]?.id;
    created += 1;
  }

  if (!formId) {
    throw new Error(`Failed to resolve saved form id for "${form.title}".`);
  }

  await insertFormFields(db, formId, form.fields ?? []);
}

if (prune) {
  const keepTitles = new Set(input.forms.map((form) => form.title));
  const existingForms = await execute(db, 'select id, title from forms');

  for (const existing of existingForms.rows) {
    const title = String(existing.title ?? '');

    if (keepTitles.has(title)) {
      continue;
    }

    await deleteFormFields(db, existing.id);
    await execute(db, { sql: 'delete from forms where id = ?', args: [existing.id] });
    deleted += 1;
  }
}

console.log(JSON.stringify({
  ok: true,
  action: 'upserted',
  databaseUrl,
  file,
  created,
  updated,
  deleted,
  total: input.forms.length,
}, null, 2));

function argString(name: string, fallback?: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);

  if (index === -1) {
    return fallback;
  }

  return process.argv[index + 1] ?? fallback;
}

async function deleteFormFields(db: ReturnType<typeof createClient>, formId: unknown): Promise<void> {
  await execute(db, {
    sql: 'delete from forms_fields_options where _parent_id in (select id from forms_fields where _parent_id = ?)',
    args: [formId],
  });
  await execute(db, {
    sql: 'delete from forms_fields where _parent_id = ?',
    args: [formId],
  });
}

async function insertFormFields(db: ReturnType<typeof createClient>, formId: unknown, fields: NonNullable<FormsExport['forms'][number]['fields']>): Promise<void> {
  for (const [fieldIndex, field] of fields.entries()) {
    const fieldId = randomUUID();

    await execute(db, {
      sql: 'insert into forms_fields (_order, _parent_id, id, name, label, type, required) values (?, ?, ?, ?, ?, ?, ?)',
      args: [fieldIndex, formId, fieldId, field.name, field.label, field.type, field.required ? 1 : 0],
    });

    for (const [optionIndex, option] of (field.options ?? []).entries()) {
      await execute(db, {
        sql: 'insert into forms_fields_options (_order, _parent_id, id, label, value) values (?, ?, ?, ?, ?)',
        args: [optionIndex, fieldId, randomUUID(), option.label, option.value],
      });
    }
  }
}

async function execute(db: ReturnType<typeof createClient>, statement: Parameters<ReturnType<typeof createClient>['execute']>[0]) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      return await db.execute(statement);
    } catch (error) {
      const code = typeof error === 'object' && error && 'code' in error ? (error as { code?: string }).code : undefined;

      if (code !== 'SQLITE_BUSY' || attempt === 7) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
    }
  }

  throw new Error('SQLite execute retry loop exhausted.');
}

function normalizeCmsDatabaseUrl(baseDir: string): void {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl?.startsWith('file:./')) {
    return;
  }

  const relativePath = databaseUrl.slice('file:./'.length);
  const absolutePath = resolve(baseDir, relativePath).replace(/\\/g, '/');
  process.env.DATABASE_URL = `file:${absolutePath}`;
}
