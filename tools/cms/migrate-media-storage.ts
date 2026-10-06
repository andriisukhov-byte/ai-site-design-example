import { createClient } from "@libsql/client";
import { access } from "node:fs/promises";
import { resolve } from "node:path";

import { argString, parseArgs } from "../migrate/source-utils";

const legacyPublicPrefix = "/assets/imported/";
const publicPrefix = "/media/";
const legacyStoragePrefix = "imported/";
const storagePrefix = "media/";
const args = parseArgs();
const databasePath = argString(args, "database", "apps/cms/apps-cms.db")!;
const publicDir = resolve(argString(args, "public-dir", "apps/web/public")!);
const databaseUrl = databasePath.startsWith("file:")
  ? databasePath
  : `file:${databasePath.replace(/\\/g, "/")}`;
const write = args.write === true || args.write === "true";
const client = createClient({ url: databaseUrl });

type Match = {
  table: string;
  column: string;
  rows: number;
};

const before = await findMatches(legacyPublicPrefix);

if (write && before.length > 0) {
  await client.batch(
    before.map(({ table, column }) => ({
      sql: `update ${quoteIdentifier(table)}
        set ${quoteIdentifier(column)} = replace(${quoteIdentifier(column)}, ?, ?)
        where instr(${quoteIdentifier(column)}, ?) > 0`,
      args: [legacyPublicPrefix, publicPrefix, legacyPublicPrefix],
    })),
    "write",
  );
}

const mediaTableExists = await hasTable("media");
let legacyStorageKeys = 0;

if (mediaTableExists) {
  legacyStorageKeys = Number(
    (
      await client.execute({
        sql: "select count(*) as count from media where storage_key like ?",
        args: [`${legacyStoragePrefix}%`],
      })
    ).rows[0]?.count ?? 0,
  );

  if (write && legacyStorageKeys > 0) {
    await client.execute({
      sql: `update media
        set storage_key = ? || substr(storage_key, ?)
        where storage_key like ?`,
      args: [
        storagePrefix,
        legacyStoragePrefix.length + 1,
        `${legacyStoragePrefix}%`,
      ],
    });
  }
}

const after = await findMatches(legacyPublicPrefix);
const remainingStorageKeys = mediaTableExists
  ? Number(
      (
        await client.execute({
          sql: "select count(*) as count from media where storage_key like ?",
          args: [`${legacyStoragePrefix}%`],
        })
      ).rows[0]?.count ?? 0,
    )
  : 0;
const missingMediaFiles: Array<{ id: string; publicPath: string }> = [];

if (mediaTableExists) {
  const media = await client.execute(
    "select id, public_path from media where public_path like '/media/%'",
  );

  for (const row of media.rows) {
    const publicPath = String(row.public_path);

    try {
      await access(resolve(publicDir, publicPath.replace(/^\/+/, "")));
    } catch {
      missingMediaFiles.push({ id: String(row.id), publicPath });
    }
  }
}

client.close();

const result = {
  ok:
    (!write || (after.length === 0 && remainingStorageKeys === 0)) &&
    missingMediaFiles.length === 0,
  mode: write ? "write" : "dry-run",
  databaseUrl,
  publicDir,
  legacyPublicPathRows: before.reduce((sum, item) => sum + item.rows, 0),
  legacyStorageKeys,
  affectedColumns: before,
  remainingLegacyPublicPathRows: after.reduce(
    (sum, item) => sum + item.rows,
    0,
  ),
  remainingLegacyStorageKeys: remainingStorageKeys,
  missingMediaFiles,
};

console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);

async function findMatches(value: string): Promise<Match[]> {
  const tables = (
    await client.execute(
      "select name from sqlite_master where type = 'table' and name not like 'sqlite_%'",
    )
  ).rows.map((row) => String(row.name));
  const matches: Match[] = [];

  for (const table of tables) {
    const columns = (
      await client.execute(`pragma table_info(${quoteIdentifier(table)})`)
    ).rows
      .filter((row) => String(row.type).toUpperCase().includes("TEXT"))
      .map((row) => String(row.name));

    for (const column of columns) {
      const result = await client.execute({
        sql: `select count(*) as count from ${quoteIdentifier(table)}
          where instr(${quoteIdentifier(column)}, ?) > 0`,
        args: [value],
      });
      const rows = Number(result.rows[0]?.count ?? 0);

      if (rows > 0) {
        matches.push({ table, column, rows });
      }
    }
  }

  return matches;
}

async function hasTable(table: string): Promise<boolean> {
  const result = await client.execute({
    sql: "select name from sqlite_master where type = 'table' and name = ?",
    args: [table],
  });

  return result.rows.length > 0;
}

function quoteIdentifier(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}
