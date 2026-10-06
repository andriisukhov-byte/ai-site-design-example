import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

import {
  argString,
  currentBuildRevision,
  currentSourceEraId,
  parseArgs,
  pathExists,
  writeJson,
} from "../migrate/source-utils";

type AttachmentRecord = {
  id: number;
  file: string;
  alt?: string;
  publicPath: string;
  storageKey: string;
};

type AttachmentManifest = {
  generatedAt?: string;
  copySummary?: {
    copied?: number;
    missing?: Array<{ id: number; file: string }>;
  };
  records?: AttachmentRecord[];
};

type CmsPagesExport = {
  generatedAt?: string;
  pages?: unknown[];
};

type MediaHandoffAsset = {
  publicPath: string;
  storageKey: string;
  diskPath: string;
  sizeBytes: number;
  attachmentId?: number;
  sourceFile?: string;
  alt?: string;
  manifestStatus: "recorded" | "missing-original" | "not-in-manifest";
};

type MissingHandoffAsset = {
  publicPath: string;
  storageKey?: string;
  diskPath: string;
  attachmentId?: number;
  sourceFile?: string;
  manifestStatus: "recorded" | "missing-original" | "not-in-manifest";
};

const args = parseArgs();
const pagesPath = argString(args, "pages", "data/cms/pages.json")!;
const manifestPath = argString(
  args,
  "manifest",
  "data/source/attachment-media.json",
)!;
const publicDir = argString(args, "public-dir", "apps/web/public")!;
const outPath = argString(args, "out", "data/cms/media-handoff.json")!;
const verbose = args.verbose === true;

const cmsPages = JSON.parse(
  await readFile(pagesPath, "utf8"),
) as CmsPagesExport;
const manifest = JSON.parse(
  await readFile(manifestPath, "utf8"),
) as AttachmentManifest;
const recordByPublicPath = new Map(
  (manifest.records ?? []).map((record) => [record.publicPath, record]),
);
const missingSourceFiles = new Set(
  (manifest.copySummary?.missing ?? []).map((item) => item.file),
);
const referencedPublicPaths = collectImportedPublicPaths(cmsPages.pages ?? []);
const presentAssets: MediaHandoffAsset[] = [];
const missingAssets: MissingHandoffAsset[] = [];

for (const publicPath of referencedPublicPaths) {
  const record = recordByPublicPath.get(publicPath);
  const manifestStatus = manifestStatusFor(record);
  const diskPath = join(publicDir, publicPath.replace(/^\/+/, ""));
  const storageKey = record?.storageKey ?? publicPath.replace(/^\/+/, "");

  if (await pathExists(diskPath)) {
    const fileStat = await stat(diskPath);
    presentAssets.push({
      publicPath,
      storageKey,
      diskPath: normalizePath(diskPath),
      sizeBytes: fileStat.size,
      attachmentId: record?.id,
      sourceFile: record?.file,
      alt: record?.alt,
      manifestStatus,
    });
    continue;
  }

  missingAssets.push({
    publicPath,
    storageKey: record?.storageKey,
    diskPath: normalizePath(diskPath),
    attachmentId: record?.id,
    sourceFile: record?.file,
    manifestStatus,
  });
}

const notInManifest =
  presentAssets.filter((asset) => asset.manifestStatus === "not-in-manifest")
    .length +
  missingAssets.filter((asset) => asset.manifestStatus === "not-in-manifest")
    .length;
const missingOriginalRecords =
  presentAssets.filter((asset) => asset.manifestStatus === "missing-original")
    .length +
  missingAssets.filter((asset) => asset.manifestStatus === "missing-original")
    .length;
const totalBytes = presentAssets.reduce(
  (sum, asset) => sum + asset.sizeBytes,
  0,
);
const report = {
  ok: missingAssets.length === 0,
  provenance: {
    sourceEraId: currentSourceEraId,
    buildRevision: currentBuildRevision(),
  },
  generatedAt: new Date().toISOString(),
  pagesPath,
  pagesGeneratedAt: cmsPages.generatedAt,
  manifestPath,
  manifestGeneratedAt: manifest.generatedAt,
  publicDir,
  requiredImportedAssets: referencedPublicPaths.length,
  presentLocalAssets: presentAssets.length,
  missingLocalAssets: missingAssets.length,
  manifestCoverageOk: notInManifest === 0,
  notInManifest,
  missingOriginalRecords,
  totalBytes,
  totalMegabytes: Number((totalBytes / 1024 / 1024).toFixed(2)),
  storageKeyPrefix: "media/",
  handoffRoot: "apps/web/public/media",
  handoffPolicy:
    "Do not commit imported binaries. Sync these publicPath/storageKey pairs to S3 or self-hosted storage, or copy the ignored local handoffRoot before build/deploy. Assets that are present locally but not in the SQL attachment manifest remain handoff warnings, not missing-file blockers.",
  assets: verbose
    ? presentAssets
    : presentAssets.map(
        ({
          publicPath,
          storageKey,
          sizeBytes,
          attachmentId,
          manifestStatus,
        }) => ({
          publicPath,
          storageKey,
          sizeBytes,
          attachmentId,
          manifestStatus,
        }),
      ),
  missingAssets,
};

await writeJson(outPath, report);
console.log(
  JSON.stringify(
    {
      ok: report.ok,
      out: outPath,
      requiredImportedAssets: report.requiredImportedAssets,
      presentLocalAssets: report.presentLocalAssets,
      missingLocalAssets: report.missingLocalAssets,
      notInManifest: report.notInManifest,
      manifestCoverageOk: report.manifestCoverageOk,
      totalMegabytes: report.totalMegabytes,
    },
    null,
    2,
  ),
);

if (!report.ok) {
  process.exit(1);
}

function collectImportedPublicPaths(value: unknown): string[] {
  const paths = new Set<string>();
  walk(value, (candidate) => {
    if (typeof candidate !== "string") {
      return;
    }

    for (const match of candidate.matchAll(/\/media\/[^\s"'<>),]+/g)) {
      paths.add(normalizePublicPath(match[0]));
    }
  });

  return [...paths].sort();
}

function walk(value: unknown, visitor: (value: unknown) => void): void {
  visitor(value);

  if (Array.isArray(value)) {
    value.forEach((item) => walk(item, visitor));
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  Object.values(value).forEach((item) => walk(item, visitor));
}

function normalizePublicPath(path: string): string {
  return decodeURI(path).replace(/[.;:]+$/, "");
}

function manifestStatusFor(
  record: AttachmentRecord | undefined,
): MediaHandoffAsset["manifestStatus"] {
  if (!record) {
    return "not-in-manifest";
  }

  return missingSourceFiles.has(record.file) ? "missing-original" : "recorded";
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}
