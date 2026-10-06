import { readFile } from 'node:fs/promises';

export type MediaManifestRecord = {
  id: number;
  file: string;
  title?: string;
  alt?: string;
  description?: string;
  publicPath: string;
  storageKey: string;
};

type MediaManifest = {
  records?: MediaManifestRecord[];
};

type MediaHandoff = {
  assets?: Array<{ publicPath?: string }>;
};

type CmsContent = {
  pages?: unknown[];
};

export type MediaUsageReference = {
  source: 'source-cms' | 'runtime-cms' | 'runtime-handoff';
  collection?: string;
  documentPath?: string;
  documentTitle?: string;
  fieldPath: string;
};

export type MediaUsage = {
  manifestRecords: MediaManifestRecord[];
  selectedRecords: MediaManifestRecord[];
  usedPublicPaths: Set<string>;
  usedSourceIds: Set<string>;
  handoffPaths: Set<string>;
  handoffPathsOutsideManifest: string[];
  usageByPublicPath: Map<string, MediaUsageReference[]>;
};

export async function loadMediaUsage({
  handoffPath = 'data/cms/media-handoff.json',
  manifestPath = 'data/source/attachment-media.json',
  runtimeContentPath = 'data/cms/pages.json',
  sourceContentPath = 'data/source/cms-pages.json',
  manifestRecords: providedManifestRecords,
}: {
  handoffPath?: string;
  manifestPath?: string;
  runtimeContentPath?: string;
  sourceContentPath?: string;
  manifestRecords?: MediaManifestRecord[];
} = {}): Promise<MediaUsage> {
  const [manifest, handoff, runtimeContent, sourceContent] = await Promise.all([
    providedManifestRecords ? Promise.resolve(undefined) : readJson<MediaManifest>(manifestPath),
    readJson<MediaHandoff>(handoffPath),
    readJson<CmsContent>(runtimeContentPath),
    readJson<CmsContent>(sourceContentPath),
  ]);
  const manifestRecords = providedManifestRecords ?? manifest?.records ?? [];
  const recordBySourceId = new Map(manifestRecords.map((record) => [String(record.id), record]));
  const manifestPaths = new Set(manifestRecords.map((record) => record.publicPath));
  const handoffPaths = new Set(
    (handoff.assets ?? [])
      .map((asset) => asset.publicPath)
      .filter((publicPath): publicPath is string => isImportedPublicPath(publicPath)),
  );
  const usedPublicPaths = new Set(handoffPaths);
  const usedSourceIds = new Set<string>();
  const usageByPublicPath = new Map<string, MediaUsageReference[]>();
  const usageBySourceId = new Map<string, MediaUsageReference[]>();

  collectContentUsage(
    runtimeContent.pages ?? [],
    'runtime-cms',
    usedPublicPaths,
    usedSourceIds,
    usageByPublicPath,
    usageBySourceId,
  );
  collectContentUsage(
    sourceContent.pages ?? [],
    'source-cms',
    usedPublicPaths,
    usedSourceIds,
    usageByPublicPath,
    usageBySourceId,
  );

  for (const publicPath of handoffPaths) {
    addUsageReference(usageByPublicPath, publicPath, {
      source: 'runtime-handoff',
      fieldPath: 'assets',
    });
  }

  for (const sourceId of usedSourceIds) {
    const record = recordBySourceId.get(sourceId);

    if (record) {
      usedPublicPaths.add(record.publicPath);

      for (const reference of usageBySourceId.get(sourceId) ?? []) {
        addUsageReference(usageByPublicPath, record.publicPath, reference);
      }
    }
  }

  return {
    manifestRecords,
    selectedRecords: manifestRecords.filter(
      (record) => usedSourceIds.has(String(record.id)) || usedPublicPaths.has(record.publicPath),
    ),
    usedPublicPaths,
    usedSourceIds,
    handoffPaths,
    handoffPathsOutsideManifest: [...handoffPaths].filter((publicPath) => !manifestPaths.has(publicPath)),
    usageByPublicPath,
  };
}

function collectContentUsage(
  pages: unknown[],
  source: MediaUsageReference['source'],
  paths: Set<string>,
  sourceIds: Set<string>,
  usageByPublicPath: Map<string, MediaUsageReference[]>,
  usageBySourceId: Map<string, MediaUsageReference[]>,
): void {
  for (const [index, page] of pages.entries()) {
    const pageRecord = asRecord(page);
    const context = {
      source,
      collection: stringValue(pageRecord?.collection),
      documentPath: stringValue(pageRecord?.path),
      documentTitle: stringValue(pageRecord?.title),
    };

    collectMediaUsage(
      page,
      `pages[${index}]`,
      context,
      paths,
      sourceIds,
      usageByPublicPath,
      usageBySourceId,
    );
  }
}

function collectMediaUsage(
  value: unknown,
  fieldPath: string,
  context: Omit<MediaUsageReference, 'fieldPath'>,
  paths: Set<string>,
  sourceIds: Set<string>,
  usageByPublicPath: Map<string, MediaUsageReference[]>,
  usageBySourceId: Map<string, MediaUsageReference[]>,
): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectMediaUsage(
      item,
      `${fieldPath}[${index}]`,
      context,
      paths,
      sourceIds,
      usageByPublicPath,
      usageBySourceId,
    ));
    return;
  }

  const record = asRecord(value);

  if (!record) {
    return;
  }

  const reference = {
    ...context,
    fieldPath,
  };

  if (isImportedPublicPath(record.src)) {
    paths.add(record.src);
    addUsageReference(usageByPublicPath, record.src, reference);

    if (record.id !== undefined && record.id !== null) {
      const sourceId = String(record.id);
      sourceIds.add(sourceId);
      addUsageReference(usageBySourceId, sourceId, reference);
    }

    if (record.sourceId !== undefined && record.sourceId !== null) {
      const sourceId = String(record.sourceId);
      sourceIds.add(sourceId);
      addUsageReference(usageBySourceId, sourceId, reference);
    }
  }

  for (const [key, item] of Object.entries(record)) {
    collectMediaUsage(
      item,
      `${fieldPath}.${key}`,
      context,
      paths,
      sourceIds,
      usageByPublicPath,
      usageBySourceId,
    );
  }
}

function isImportedPublicPath(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('/media/');
}

function addUsageReference(
  usage: Map<string, MediaUsageReference[]>,
  key: string,
  reference: MediaUsageReference,
): void {
  const references = usage.get(key) ?? [];
  const fingerprint = JSON.stringify(reference);

  if (!references.some((item) => JSON.stringify(item) === fingerprint)) {
    references.push(reference);
    usage.set(key, references);
  }
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined;
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value ? value : undefined;
}

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, 'utf8')) as T;
}
