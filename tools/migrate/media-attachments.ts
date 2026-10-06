import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import {
  argString,
  defaultDumpPath,
  forSqlRows,
  parseArgs,
  pathExists,
  sourceBasename,
  toNumberValue,
  toStringValue,
  writeJson,
} from './source-utils';
import { loadMediaUsage } from '../cms/media-usage';

type AttachmentRecord = {
  id: number;
  file: string;
  title: string;
  alt: string;
  description: string;
  publicPath: string;
  storageKey: string;
};

const args = parseArgs();
const dump = argString(args, 'dump', process.env.SOURCE_DB_DUMP || defaultDumpPath);
const uploads = argString(args, 'uploads', 'D:/wamp/www/acme/wp-content/uploads')!;
const fallbackUploads = argString(args, 'fallback-uploads');
const out = argString(args, 'out', 'data/source/attachment-media.json')!;
const copy = args.copy === true || args.copy === 'true';
const publicDir = argString(args, 'public-dir', 'apps/web/public/media')!;
const handoffPath = argString(args, 'handoff', 'data/cms/media-handoff.json')!;
const runtimeContentPath = argString(args, 'runtime-content', 'data/cms/pages.json')!;
const sourceContentPath = argString(args, 'source-content', 'data/source/cms-pages.json')!;
const scope = argString(args, 'scope', 'used')!;

if (scope !== 'used' && scope !== 'all') {
  console.error('Invalid --scope. Expected "used" or "all".');
  process.exit(1);
}

if (!dump) {
  console.error('Usage: npm run migrate:media:attachments -- --dump D:/path/to/source.sql');
  process.exit(1);
}

const attachmentIds = new Set<number>();
const fileById = new Map<number, string>();
const altById = new Map<number, string>();
const titleById = new Map<number, string>();
const descriptionById = new Map<number, string>();

await forSqlRows(dump, new Set(['wp_posts', 'wp_postmeta']), (table, row) => {
  if (table === 'wp_posts') {
    const id = toNumberValue(row[0]);
    const type = toStringValue(row[20]);

    if (Number.isFinite(id) && type === 'attachment') {
      attachmentIds.add(id);
      titleById.set(id, cleanMediaText(toStringValue(row[5])));
      descriptionById.set(
        id,
        cleanMediaText(toStringValue(row[6])) || cleanMediaText(toStringValue(row[4])),
      );
    }

    return;
  }

  const id = toNumberValue(row[1]);
  const key = toStringValue(row[2]);
  const value = toStringValue(row[3]).trim();

  if (!Number.isFinite(id) || !value) {
    return;
  }

  if (key === '_wp_attached_file') {
    fileById.set(id, normalizeMediaFile(value));
  }

  if (key === '_wp_attachment_image_alt') {
    altById.set(id, value);
  }
});

const records = [...attachmentIds]
  .concat(attachmentIds.size ? [] : [...fileById.keys()])
  .map((id): AttachmentRecord | undefined => {
    const file = fileById.get(id);

    if (!file) {
      return undefined;
    }

    return {
      id,
      file,
      title: titleById.get(id) || titleFromFile(file),
      alt: altById.get(id) ?? '',
      description: descriptionById.get(id) ?? '',
      publicPath: `/media/${file}`,
      storageKey: `media/${file}`,
    };
  })
  .filter((record): record is AttachmentRecord => Boolean(record))
  .sort((left, right) => left.id - right.id);

let copySummary: {
  scope: string;
  selected: number;
  copied: number;
  existing: number;
  missing: Array<{ id: number; file: string }>;
} | undefined;

if (copy) {
  const usage = await loadMediaUsage({
    handoffPath,
    manifestPath: out,
    runtimeContentPath,
    sourceContentPath,
    manifestRecords: records,
  });
  const recordsToCopy = scope === 'used' ? usage.selectedRecords : records;
  let copied = 0;
  let existing = 0;
  const missing: Array<{ id: number; file: string }> = [];

  for (const record of recordsToCopy) {
    const to = join(publicDir, record.file);
    const candidates = [join(uploads, record.file)];

    if (fallbackUploads) {
      candidates.push(join(fallbackUploads, record.file));
    }

    const from = await firstExistingPath(candidates);

    if (!from) {
      if (await pathExists(to)) {
        existing += 1;
        continue;
      }

      missing.push({ id: record.id, file: record.file });
      continue;
    }

    await mkdir(dirname(to), { recursive: true });
    await copyFile(from, to);
    copied += 1;
  }

  copySummary = { scope, selected: recordsToCopy.length, copied, existing, missing };
  console.log(JSON.stringify({
    scope,
    selected: recordsToCopy.length,
    copied,
    existing,
    missing: missing.length,
  }, null, 2));
}

await writeJson(out, {
  generatedAt: new Date().toISOString(),
  source: {
    dumpFile: sourceBasename(dump),
  },
  copySummary,
  records,
});

console.log(JSON.stringify({
  ok: true,
  out,
  records: records.length,
}, null, 2));

function normalizeMediaFile(value: string): string {
  return value.replace(/\\/g, '/').replace(/^\/+/, '');
}

function titleFromFile(file: string): string {
  const filename = file.split('/').pop() ?? file;
  return cleanMediaText(filename.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '));
}

function cleanMediaText(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_match, code: string) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, ' ')
    .trim();
}

async function firstExistingPath(paths: string[]): Promise<string | undefined> {
  for (const candidate of paths) {
    if (await pathExists(candidate)) {
      return candidate;
    }
  }

  return undefined;
}
