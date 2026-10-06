import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join, parse } from 'node:path';
import { createInterface } from 'node:readline';

export type SqlValue = string | number | null;

export type CliArgs = Record<string, string | boolean>;

export const defaultDumpPath =
  '<path-to-production-dump>.sql';

export const defaultThemeBlocksDir =
  'D:/wamp/www/acme/wp-content/themes/acme/template-parts/blocks';

export const currentSourceEraId = 'prod-sql-2026-07-23-23-14-51';

export function parseArgs(argv = process.argv.slice(2)): CliArgs {
  const args: CliArgs = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (!arg.startsWith('--')) {
      continue;
    }

    const key = arg.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith('--')) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

export function argString(args: CliArgs, key: string, fallback?: string): string | undefined {
  const value = args[key];
  return typeof value === 'string' ? value : fallback;
}

export async function ensureParentDir(file: string): Promise<void> {
  await mkdir(dirname(file), { recursive: true });
}

export async function writeJson(file: string, value: unknown): Promise<void> {
  await ensureParentDir(file);
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export function currentBuildRevision(): string {
  try {
    const revision = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
    const status = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim();

    return status ? `${revision}-dirty` : revision;
  } catch {
    return 'unknown';
  }
}

export async function pathExists(file: string): Promise<boolean> {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

export async function sha256File(file: string): Promise<string> {
  const hash = createHash('sha256');

  await new Promise<void>((resolve, reject) => {
    const stream = createReadStream(file);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('error', reject);
    stream.on('end', resolve);
  });

  return hash.digest('hex');
}

export async function forSqlRows(
  dump: string,
  tables: Set<string> | undefined,
  onRow: (table: string, row: SqlValue[]) => void | Promise<void>,
): Promise<void> {
  const stream = createReadStream(dump, { encoding: 'utf8' });
  const lines = createInterface({ input: stream, crlfDelay: Infinity });
  let currentTable: string | undefined;
  let tupleBuffer = '';

  for await (const line of lines) {
    const insertMatch = line.match(/^INSERT INTO `([^`]+)` VALUES/);

    if (insertMatch) {
      const table = insertMatch[1];
      currentTable = !tables || tables.has(table) ? table : undefined;
      tupleBuffer = '';
      continue;
    }

    if (!currentTable) {
      continue;
    }

    const trimmed = line.trim();

    if (!tupleBuffer && trimmed.startsWith('(')) {
      tupleBuffer = line.trimStart();
    } else if (tupleBuffer) {
      tupleBuffer += `\n${line}`;
    }

    if (tupleBuffer && isCompleteSqlTuple(tupleBuffer)) {
      const completedTuple = tupleBuffer.trim();
      tupleBuffer = '';
      await onRow(currentTable, parseSqlTupleLine(completedTuple));

      if (completedTuple.endsWith(';')) {
        currentTable = undefined;
      }
    } else if (!tupleBuffer && trimmed.endsWith(';')) {
      currentTable = undefined;
    }
  }
}

function isCompleteSqlTuple(value: string): boolean {
  let inString = false;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];

    if (inString && char === '\\') {
      index += 1;
      continue;
    }

    if (char !== "'") {
      continue;
    }

    if (inString && value[index + 1] === "'") {
      index += 1;
      continue;
    }

    inString = !inString;
  }

  return !inString && /\)\s*[,;]\s*$/.test(value);
}

export async function collectCreateTables(dump: string): Promise<string[]> {
  const stream = createReadStream(dump, { encoding: 'utf8' });
  const lines = createInterface({ input: stream, crlfDelay: Infinity });
  const tables: string[] = [];

  for await (const line of lines) {
    const match = line.match(/^CREATE TABLE `([^`]+)`/);

    if (match) {
      tables.push(match[1]);
    }
  }

  return tables;
}

export function parseSqlTupleLine(line: string): SqlValue[] {
  let tuple = line.trim();

  if (tuple.endsWith(',') || tuple.endsWith(';')) {
    tuple = tuple.slice(0, -1);
  }

  if (!tuple.startsWith('(') || !tuple.endsWith(')')) {
    throw new Error(`Expected SQL tuple line, received: ${tuple.slice(0, 120)}`);
  }

  const body = tuple.slice(1, -1);
  const values: SqlValue[] = [];
  let token = '';
  let inString = false;
  let readingQuotedValue = false;

  const pushValue = () => {
    if (readingQuotedValue) {
      values.push(token);
    } else {
      const raw = token.trim();

      if (raw.toUpperCase() === 'NULL') {
        values.push(null);
      } else if (/^-?\d+(?:\.\d+)?$/.test(raw)) {
        values.push(Number(raw));
      } else {
        values.push(raw);
      }
    }

    token = '';
    readingQuotedValue = false;
  };

  for (let index = 0; index < body.length; index += 1) {
    const char = body[index];

    if (inString) {
      if (char === '\\') {
        index += 1;
        token += decodeSqlEscape(body[index] ?? '');
        continue;
      }

      if (char === "'") {
        if (body[index + 1] === "'") {
          token += "'";
          index += 1;
          continue;
        }

        inString = false;
        continue;
      }

      token += char;
      continue;
    }

    if (char === "'") {
      inString = true;
      readingQuotedValue = true;
      continue;
    }

    if (char === ',') {
      pushValue();
      continue;
    }

    token += char;
  }

  pushValue();

  return values;
}

export function decodeSqlEscape(char: string): string {
  switch (char) {
    case '0':
      return '\0';
    case 'b':
      return '\b';
    case 'n':
      return '\n';
    case 'r':
      return '\r';
    case 't':
      return '\t';
    case 'Z':
      return '\x1a';
    default:
      return char;
  }
}

export type SourceBlock = {
  name: string;
  sourceName: string;
  root?: {
    anchor?: string;
    className?: string;
  };
  data: Record<string, unknown>;
};

export function extractSourceBlocks(content: string): SourceBlock[] {
  const blocks: SourceBlock[] = [];
  const blockPattern = /<!--\s+wp:([a-z0-9-_/-]+)(?:\s+({[\s\S]*?}))?\s*\/?-->/gi;

  for (const match of content.matchAll(blockPattern)) {
    const sourceName = match[1];

    if (!sourceName.startsWith('acme/')) {
      continue;
    }

    const attributes = safeJsonParse(match[2] ?? '{}');
    const rawData = attributes && typeof attributes === 'object' && 'data' in attributes
      ? (attributes as { data?: unknown }).data
      : undefined;

    blocks.push({
      name: sourceName.replace(/^acme\//, ''),
      sourceName,
      root: extractBlockRoot(attributes),
      data: sanitizeRecord(rawData),
    });
  }

  return blocks;
}

function extractBlockRoot(attributes: unknown): SourceBlock['root'] | undefined {
  if (!attributes || typeof attributes !== 'object' || Array.isArray(attributes)) {
    return undefined;
  }

  const record = attributes as Record<string, unknown>;
  const anchor = sanitizeAnchor(record.anchor);
  const className = sanitizeClassName(record.className);
  const root = {
    ...(anchor ? { anchor } : {}),
    ...(className ? { className } : {}),
  };

  return Object.keys(root).length ? root : undefined;
}

function sanitizeAnchor(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const anchor = value.trim().replace(/^#/, '');

  if (!anchor || !/^[A-Za-z][A-Za-z0-9_-]{0,127}$/.test(anchor)) {
    return undefined;
  }

  return anchor;
}

function sanitizeClassName(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const className = value
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => /^[A-Za-z_-][A-Za-z0-9_-]{0,127}$/.test(token))
    .filter((token) => !token.startsWith('wp-') && token !== 'wp-block')
    .join(' ');

  return className || undefined;
}

export function safeJsonParse(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

export function sanitizeRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  const sanitized: Record<string, unknown> = {};

  for (const [key, item] of Object.entries(value)) {
    if (key.startsWith('_')) {
      continue;
    }

    sanitized[key] = sanitizeValue(item);
  }

  return sanitized;
}

export function sanitizeValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.replace(/\0/g, '').trim();
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (value && typeof value === 'object') {
    const clean: Record<string, unknown> = {};

    for (const [key, item] of Object.entries(value)) {
      if (key.startsWith('_')) {
        continue;
      }

      clean[key] = sanitizeValue(item);
    }

    return clean;
  }

  return value;
}

export function stableRecordKey(kind: string, id: number | string): string {
  return createHash('sha1').update(`${kind}:${id}`).digest('hex').slice(0, 16);
}

export function toStringValue(value: SqlValue): string {
  return value === null ? '' : String(value);
}

export function toNumberValue(value: SqlValue): number {
  return typeof value === 'number' ? value : Number(value);
}

export function addCount(map: Record<string, number>, key: string, increment = 1): void {
  map[key] = (map[key] ?? 0) + increment;
}

export type ThemeBlockSummary = {
  name: string;
  title: string;
  category?: string;
  fields: Array<{ name: string; type?: string }>;
  hasTemplate: boolean;
  hasStyles: boolean;
  hasScript: boolean;
};

export async function inspectThemeBlocks(blocksDir: string): Promise<ThemeBlockSummary[]> {
  if (!(await pathExists(blocksDir))) {
    return [];
  }

  const entries = await readdir(blocksDir, { withFileTypes: true });
  const blocks: ThemeBlockSummary[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const dir = join(blocksDir, entry.name);
    const blockJson = await readJsonIfExists(join(dir, 'block.json'));
    const acfJson = await readJsonIfExists(join(dir, 'acf.json'));

    blocks.push({
      name: entry.name,
      title: stringFromObject(blockJson, 'title') || entry.name,
      category: stringFromObject(blockJson, 'category') || undefined,
      fields: extractAcfFields(acfJson),
      hasTemplate: await pathExists(join(dir, 'template.php')),
      hasStyles: await pathExists(join(dir, 'block.scss')),
      hasScript: await pathExists(join(dir, 'block.js')),
    });
  }

  return blocks.sort((left, right) => left.name.localeCompare(right.name));
}

async function readJsonIfExists(file: string): Promise<unknown> {
  if (!(await pathExists(file))) {
    return undefined;
  }

  return JSON.parse(await readFile(file, 'utf8'));
}

function stringFromObject(value: unknown, key: string): string {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return '';
  }

  const item = (value as Record<string, unknown>)[key];
  return typeof item === 'string' ? item : '';
}

function extractAcfFields(value: unknown): Array<{ name: string; type?: string }> {
  const fields: Array<{ name: string; type?: string }> = [];

  const visit = (item: unknown) => {
    if (!item || typeof item !== 'object') {
      return;
    }

    if (Array.isArray(item)) {
      for (const child of item) {
        visit(child);
      }
      return;
    }

    const object = item as Record<string, unknown>;
    const name = typeof object.name === 'string' ? object.name : '';
    const type = typeof object.type === 'string' ? object.type : undefined;

    if (name) {
      fields.push({ name, type });
    }

    visit(object.fields);
    visit(object.sub_fields);
    visit(object.layouts);
  };

  visit(value);

  return fields;
}

export function sourceBasename(file: string): string {
  return parse(file).base;
}
