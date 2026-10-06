import { readFile, stat } from "node:fs/promises";
import { basename, extname, resolve } from "node:path";

import { config as loadEnv } from "dotenv";
import { getPayload } from "payload";
import sharp from "sharp";

import {
  argString,
  parseArgs,
  pathExists,
  writeJson,
} from "../migrate/source-utils";
import { loadMediaUsage, type MediaManifestRecord } from "./media-usage";

type MediaManifest = {
  records?: MediaRecord[];
};

type MediaRecord = MediaManifestRecord;

type ImportFailure = {
  sourceId: number;
  file: string;
  error: string;
};

const args = parseArgs();
const manifestPath = argString(
  args,
  "manifest",
  "data/source/attachment-media.json",
)!;
const sourceDir = argString(args, "source-dir", "apps/web/public/media")!;
const reportPath = argString(args, "out", "data/cms/media-index-report.json")!;
const handoffPath = argString(args, "handoff", "data/cms/media-handoff.json")!;
const runtimeContentPath = argString(
  args,
  "runtime-content",
  "data/cms/pages.json",
)!;
const sourceContentPath = argString(
  args,
  "source-content",
  "data/source/cms-pages.json",
)!;
const scope = argString(args, "scope", "used")!;
const progressEvery = numberArg(args.progress, 50);
const limit = numberArg(args.limit);
const sourceId = numberArg(args["source-id"]);
const shouldWrite = args.write === true || args.write === "true";

const manifest = JSON.parse(
  await readFile(manifestPath, "utf8"),
) as MediaManifest;
const usage = await loadMediaUsage({
  handoffPath,
  manifestPath,
  runtimeContentPath,
  sourceContentPath,
});

if (scope !== "used" && scope !== "all") {
  console.error('Invalid --scope. Expected "used" or "all".');
  process.exit(1);
}

const scopedRecords =
  scope === "used" ? usage.selectedRecords : (manifest.records ?? []);
const records = scopedRecords
  .filter((record) => sourceId === undefined || record.id === sourceId)
  .slice(0, limit);
const missingFiles: Array<{ sourceId: number; file: string }> = [];

for (const record of records) {
  if (!(await pathExists(resolve(sourceDir, record.file)))) {
    missingFiles.push({ sourceId: record.id, file: record.file });
  }
}

if (!shouldWrite) {
  const report = {
    ok: missingFiles.length === 0,
    action: "validated",
    scope,
    manifestPath,
    manifestRecords: manifest.records?.length ?? 0,
    selectedRecords: scopedRecords.length,
    sourceDir,
    records: records.length,
    presentFiles: records.length - missingFiles.length,
    missingFiles,
    note: "Dry-run only. Re-run with --write true to upsert media into Payload.",
  };

  await writeJson(reportPath, report);
  console.log(
    JSON.stringify(
      { ...report, missingFiles: missingFiles.length, out: reportPath },
      null,
      2,
    ),
  );
  process.exit(report.ok ? 0 : 1);
}

loadCmsEnv();
const { default: payloadConfig } =
  await import("../../apps/cms/src/payload.config");
const payload = await getPayload({ config: payloadConfig });
const existing = await payload.find({
  collection: "media",
  limit: Math.max(records.length, 1),
  pagination: false,
  depth: 0,
  overrideAccess: true,
});
const existingBySourceId = new Map(
  existing.docs
    .filter((doc) => typeof doc.sourceId === "number")
    .map((doc) => [doc.sourceId as number, doc]),
);
let created = 0;
let updated = 0;
const failures: ImportFailure[] = [];
const missingIds = new Set(missingFiles.map((item) => item.sourceId));

for (const [index, record] of records.entries()) {
  if (missingIds.has(record.id)) {
    continue;
  }

  if (progressEvery > 0 && (index === 0 || (index + 1) % progressEvery === 0)) {
    console.error(`[${index + 1}/${records.length}] ${record.file}`);
  }

  const title = record.title?.trim() || titleFromFile(record.file);
  const data = {
    title,
    alt: record.alt?.trim() || title,
    description: record.description?.trim() || null,
    sourceId: record.id,
    publicPath: record.publicPath,
    storageKey: record.storageKey,
  };

  try {
    const current = existingBySourceId.get(record.id);

    if (current) {
      await payload.update({
        collection: "media",
        id: current.id,
        data,
        overrideAccess: true,
      });
      updated += 1;
    } else {
      const sourcePath = resolve(sourceDir, record.file);
      const createdDoc = await createMediaRecord(
        payload,
        record,
        data,
        sourcePath,
      );
      existingBySourceId.set(record.id, createdDoc);
      created += 1;
    }
  } catch (error) {
    failures.push({
      sourceId: record.id,
      file: record.file,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

await destroyPayload(payload);

const report = {
  ok: missingFiles.length === 0 && failures.length === 0,
  action: "upserted",
  scope,
  manifestPath,
  manifestRecords: manifest.records?.length ?? 0,
  selectedRecords: scopedRecords.length,
  sourceDir,
  records: records.length,
  created,
  updated,
  skippedMissing: missingFiles.length,
  failed: failures.length,
  missingFiles,
  failures,
};

await writeJson(reportPath, report);
console.log(
  JSON.stringify(
    {
      ...report,
      missingFiles: missingFiles.length,
      failures: failures.length,
      out: reportPath,
    },
    null,
    2,
  ),
);
process.exit(report.ok ? 0 : 1);

function loadCmsEnv(): void {
  loadEnv({ path: resolve("apps/cms/.env") });

  if (process.env.DATABASE_URL === "file:./apps-cms.db") {
    process.env.DATABASE_URL = `file:${resolve("apps/cms/apps-cms.db").replace(/\\/g, "/")}`;
  }

  process.env.PAYLOAD_MCP_DISABLED ??= "true";
  process.env.PAYLOAD_MIGRATING ??= "true";
}

function titleFromFile(file: string): string {
  return basename(file)
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function numberArg(
  value: string | boolean | undefined,
  fallback?: number,
): number | undefined {
  if (typeof value !== "string") {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

async function createMediaRecord(
  payloadInstance: Awaited<ReturnType<typeof getPayload>>,
  record: MediaRecord,
  data: {
    title: string;
    alt: string;
    description: string | null;
    sourceId: number;
    publicPath: string;
    storageKey: string;
  },
  sourcePath: string,
) {
  const filename = `${record.id}-${basename(record.file)}`;
  const fileStats = await stat(sourcePath);
  let width: number | null = null;
  let height: number | null = null;
  let format: string | undefined;

  try {
    const metadata = await sharp(sourcePath, {
      animated: false,
      limitInputPixels: false,
    }).metadata();
    width = metadata.width ?? null;
    height = metadata.height ?? null;
    format = metadata.format;
  } catch {
    // Video and PDF records do not require image dimensions.
  }

  return payloadInstance.db.create({
    collection: "media",
    data: {
      ...data,
      filename,
      mimeType: mimeTypeFor(record.file, format),
      filesize: fileStats.size,
      width,
      height,
      url: record.publicPath,
    },
  });
}

function mimeTypeFor(file: string, sharpFormat?: string): string {
  const extension = extname(file).toLowerCase();
  const byExtension: Record<string, string> = {
    ".avif": "image/avif",
    ".gif": "image/gif",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webm": "video/webm",
    ".webp": "image/webp",
  };

  return (
    byExtension[extension] ??
    (sharpFormat
      ? `image/${sharpFormat === "jpg" ? "jpeg" : sharpFormat}`
      : "application/octet-stream")
  );
}

async function destroyPayload(payloadInstance: unknown): Promise<void> {
  const maybeDestroy =
    payloadInstance && typeof payloadInstance === "object"
      ? (payloadInstance as { destroy?: () => Promise<void> }).destroy
      : undefined;

  if (maybeDestroy) {
    await maybeDestroy();
  }
}
