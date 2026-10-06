import { createHash } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";

import {
  pageDocumentSchema,
  type PageBlock,
  type PageDocument,
} from "@acme/blocks";
import { JSDOM } from "jsdom";

import {
  setSourceMediaRecords,
  transformSourceBlock,
} from "./block-transform";
import {
  argString,
  parseArgs,
  writeJson,
} from "./source-utils";
import {
  isUseCaseAcf,
  useCaseAcfToSourceBlocks,
} from "./use-case-acf";

type ProductionUseCase = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  template: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: Record<string, unknown>;
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_title?: string;
    og_description?: string;
    twitter_title?: string;
    twitter_description?: string;
  };
};

type SourceMediaRecord = {
  id: number;
  file?: string;
  publicPath: string;
  alt?: string;
};

type ProductionMedia = {
  id: number;
  source_url?: string;
  alt_text?: string;
  media_details?: {
    file?: string;
  };
};

const defaultListPaths = [
  "/ai-use-cases-in-customer-support/",
  "/ai-use-cases-in-finance-accounting/",
];

const args = parseArgs();
const sourceBase = (
  argString(args, "source-base", "https://acme.example") ?? ""
).replace(/\/+$/, "");
const pathsArgument = argString(args, "paths");
const paths = pathsArgument
  ? pathsArgument.split(",").map(normalizePath).filter(Boolean)
  : await discoverProductionUseCasePaths();
const out = argString(
  args,
  "out",
  "data/source/production-use-case-pages.json",
)!;
const mediaInput = argString(
  args,
  "media",
  "data/source/attachment-media.json",
)!;
const mediaRoot = resolve(
  argString(args, "media-dir", "apps/web/public/media")!,
);
const concurrency = Math.max(
  1,
  Number(argString(args, "concurrency", "6")) || 6,
);

if (!paths.length) {
  throw new Error("Provide at least one comma-separated --paths value.");
}

const sourceMediaRecords = new Map(
  (await readMediaRecords(mediaInput)).map((record) => [record.id, record]),
);
const mediaRequests = new Map<number, Promise<SourceMediaRecord | undefined>>();
setSourceMediaRecords([...sourceMediaRecords.values()]);

const pages = new Array<PageDocument>(paths.length);
let cursor = 0;

await Promise.all(
  Array.from({ length: Math.min(concurrency, paths.length) }, async () => {
    while (cursor < paths.length) {
      const index = cursor;
      cursor += 1;
      pages[index] = await readProductionUseCase(paths[index]);
    }
  }),
);

await writeJson(out, {
  generatedAt: new Date().toISOString(),
  source: `${sourceBase}/wp-json/wp/v2/pages`,
  pages,
});

console.log(JSON.stringify({
  ok: true,
  action: "prepared-production-use-cases",
  out,
  pages: pages.map((page) => ({
    path: page.path,
    blocks: page.blocks.map((block) => block.type),
  })),
}, null, 2));

async function discoverProductionUseCasePaths(): Promise<string[]> {
  const records: Array<{ template?: string; link?: string }> = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await fetch(
      `${sourceBase}/wp-json/wp/v2/pages?per_page=100&page=${page}&_fields=template,link`,
      {
        headers: {
          accept: "application/json",
          "user-agent": "Acme source migration",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Production use-case discovery failed (${response.status}) on page ${page}`,
      );
    }

    totalPages = Number(response.headers.get("x-wp-totalpages")) || 1;
    records.push(...await response.json() as Array<{ template?: string; link?: string }>);
    page += 1;
  } while (page <= totalPages);

  return [...new Set([
    ...defaultListPaths,
    ...records
      .filter((record) => record.template === "template-use-case.php" && record.link)
      .map((record) => normalizePath(record.link!))
      .filter(Boolean),
  ])].sort();
}

async function readProductionUseCase(path: string): Promise<PageDocument> {
  const slug = path.slice(1, -1);
  const response = await fetchWithRetry(
    `${sourceBase}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`,
  );

  if (!response.ok) {
    throw new Error(
      `Production use-case request failed (${response.status}) for ${path}`,
    );
  }

  const [source] = await response.json() as ProductionUseCase[];

  if (!source) {
    throw new Error(`Production use-case page was not found for ${path}`);
  }

  const title = decodeHtml(stripTags(source.title.rendered));

  if (source.template !== "template-use-case.php") {
    return readProductionUseCaseList(source, path, title);
  }

  if (!source.acf || !isUseCaseAcf(source.acf)) {
    throw new Error(`Production use-case ACF contract is missing for ${path}`);
  }

  await hydrateUseCaseMedia(source.acf);

  const blocks: PageBlock[] = [];

  for (const sourceBlock of useCaseAcfToSourceBlocks(source.acf)) {
    const transformed = transformSourceBlock(sourceBlock, title);

    if (!transformed.block) {
      throw new Error(
        `Could not transform ${sourceBlock.sourceName} for ${path}: ${transformed.reason ?? "unknown reason"}`,
      );
    }

    blocks.push({
      ...transformed.block,
      root: sourceBlock.root,
    } as PageBlock);
  }

  return pageDocumentSchema.parse({
    contentKey: stableDocumentKey(source.id),
    collection: "pages",
    path,
    title,
    publishedAt: source.date,
    status: source.status === "publish" ? "published" : "draft",
    template: "standard",
    seo: compactSeo(source.yoast_head_json),
    blocks,
  });
}

async function fetchWithRetry(url: string): Promise<Response> {
  let response: Response | undefined;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    response = await fetch(url, {
      headers: {
        accept: "application/json",
        "user-agent": "Acme source migration",
      },
      signal: AbortSignal.timeout(30_000),
    });

    if (response.ok || response.status < 500 && response.status !== 429) {
      return response;
    }

    await new Promise((resolveDelay) => setTimeout(resolveDelay, attempt * 300));
  }

  return response!;
}

async function readProductionUseCaseList(
  source: ProductionUseCase,
  path: string,
  title: string,
): Promise<PageDocument> {
  const page = new JSDOM(source.content.rendered).window.document;
  const sections = [...page.querySelectorAll("section")];
  const sectionTypes = sections.map((section) =>
    [...section.classList].find((className) => [
      "hero",
      "anchor-pills",
      "side-by-side",
      "cta",
      "news-insights",
      "faq",
    ].includes(className))
  ).filter(Boolean);

  if (
    sectionTypes[0] !== "hero"
    || sectionTypes[1] !== "anchor-pills"
    || !sectionTypes.includes("side-by-side")
    || !sectionTypes.includes("cta")
    || !sectionTypes.includes("news-insights")
    || sectionTypes.at(-1) !== "faq"
  ) {
    throw new Error(
      `Default-template page ${path} does not match the source use-case-list composition.`,
    );
  }

  const blocks: PageBlock[] = [];

  for (const section of sections) {
    if (section.classList.contains("hero")) {
      blocks.push(readListHero(section));
    } else if (section.classList.contains("anchor-pills")) {
      blocks.push(readAnchorNav(section));
    } else if (section.classList.contains("side-by-side")) {
      blocks.push(await readSideBySide(section));
    } else if (section.classList.contains("cta")) {
      blocks.push(readCta(section));
    } else if (section.classList.contains("news-insights")) {
      blocks.push({
        type: "news-insights",
        title: gradientText(section.querySelector(".news-insights__title"))
          || "AI Industry {{ News }} and {{ Insights }}",
        mode: "latest",
        collections: ["posts", "news"],
        limit: 3,
        cards: [],
      });
    } else if (section.classList.contains("faq")) {
      blocks.push(readListFaq(section));
    }
  }

  return pageDocumentSchema.parse({
    contentKey: stableDocumentKey(source.id),
    collection: "pages",
    path,
    title,
    publishedAt: source.date,
    status: source.status === "publish" ? "published" : "draft",
    template: "standard",
    seo: compactSeo(source.yoast_head_json),
    blocks,
  });
}

function readListHero(section: Element): Extract<PageBlock, { type: "hero" }> {
  return {
    type: "hero",
    variant: "default",
    eyebrow: text(section.querySelector(".hero__eyebrow")) || undefined,
    title: gradientText(section.querySelector(".hero__title")),
    description: text(section.querySelector(".hero__description")) || undefined,
    primaryAction: action(section.querySelector(".hero__button--primary")),
    secondaryAction: action(section.querySelector(".hero__button--secondary")),
    mediaSize: "wide",
    cards: [],
  };
}

function readAnchorNav(
  section: Element,
): Extract<PageBlock, { type: "anchor-nav" }> {
  return {
    type: "anchor-nav",
    background: section.classList.contains("anchor-pills--gray")
      ? "gray"
      : "white",
    items: [...section.querySelectorAll(".anchor-pills__pill")].map((pill) => ({
      icon: readAnchorIcon(pill),
      label: text(pill.querySelector(".anchor-pills__label")),
      anchor: pill.getAttribute("href")?.replace(/^#/, "") || undefined,
    })),
  };
}

async function readSideBySide(
  section: Element,
): Promise<Extract<PageBlock, { type: "side-by-side" }>> {
  const sectionTitle = gradientText(
    section.querySelector(".side-by-side__header .side-by-side__title"),
  );
  const sectionSubtitle = text(
    section.querySelector(".side-by-side__header .side-by-side__subtitle"),
  );
  const cardTitle = gradientText(
    section.querySelector(".side-by-side__card-title"),
  );
  const cardDescription = innerHtml(
    section.querySelector(".side-by-side__card-description"),
  );
  const imageElement = section.querySelector<HTMLImageElement>(
    ".side-by-side__image",
  );
  const image = imageElement?.src
    ? {
      src: await localizeUpload(imageElement.src),
      alt: imageElement.alt || "",
    }
    : undefined;
  const imageSide = section.classList.contains("side-by-side--image-left")
    ? "left"
    : "right";

  return {
    type: "side-by-side",
    background: section.classList.contains("side-by-side--bg-gray")
      ? "gray"
      : "white",
    title: sectionTitle || cardTitle,
    description: sectionSubtitle || stripTags(cardDescription) || undefined,
    media: image,
    mediaSide: imageSide,
    sectionTitle: sectionTitle || undefined,
    sectionSubtitle: sectionSubtitle || undefined,
    imageSide,
    image,
    cardTitle: cardTitle || undefined,
    cardDescription: cardDescription || undefined,
    bullets: [...section.querySelectorAll(".side-by-side__bullet")].map(
      (item) => {
        const bulletText = text(
          item.querySelector(".side-by-side__bullet-text"),
        );
        const description = text(
          item.querySelector(".side-by-side__bullet-description"),
        );

        return {
          title: bulletText,
          text: bulletText,
          description: description || undefined,
        };
      },
    ),
    smallIcons: await Promise.all(
      [...section.querySelectorAll<HTMLImageElement>(
        ".side-by-side__icons-row img",
      )].map(async (icon) => ({
        image: {
          src: await localizeUpload(icon.src),
          alt: icon.alt || "",
        },
      })),
    ),
    primaryAction: action(
      section.querySelector(".side-by-side__button--primary")
        ?? section.querySelector(".side-by-side__button"),
    ),
    secondaryAction: action(
      section.querySelector(".side-by-side__button--secondary"),
    ),
    bottomCards: [],
    root: section.id ? { anchor: section.id } : undefined,
  };
}

function readCta(section: Element): Extract<PageBlock, { type: "cta" }> {
  return {
    type: "cta",
    eyebrow: text(section.querySelector(".cta__eyebrow")) || undefined,
    title: gradientText(section.querySelector(".cta__title")),
    description: text(section.querySelector(".cta__description")) || undefined,
    primaryAction: action(
      section.querySelector(".cta__button--primary")
        ?? section.querySelector(".cta__button"),
    ),
    secondaryAction: action(section.querySelector(".cta__button--secondary")),
  };
}

function readListFaq(section: Element): Extract<PageBlock, { type: "faq" }> {
  return {
    type: "faq",
    title: text(section.querySelector(".faq__title")),
    titleGradient: text(section.querySelector(".faq__title-gradient"))
      || undefined,
    searchPlaceholder:
      section.querySelector<HTMLInputElement>(".faq__search-input")
        ?.placeholder || undefined,
    items: [...section.querySelectorAll(".faq__category")].flatMap(
      (category) => {
        const categoryId = slugify(
          text(category.querySelector(".faq__category-title")),
        );

        return [...category.querySelectorAll(".faq__item")].map((item) => ({
          question: text(item.querySelector(".faq__item-title")),
          answer: innerHtml(item.querySelector(".faq__answer")),
          category: categoryId,
        }));
      },
    ),
  };
}

function readAnchorIcon(element: Element): string {
  const signature = [...element.querySelectorAll(
    ".anchor-pills__icon path,.anchor-pills__icon rect,.anchor-pills__icon circle,.anchor-pills__icon ellipse,.anchor-pills__icon polyline",
  )].map((part) =>
    [
      part.tagName.toLowerCase(),
      part.getAttribute("d"),
      part.getAttribute("points"),
      part.getAttribute("cx"),
      part.getAttribute("cy"),
      part.getAttribute("rx"),
      part.getAttribute("ry"),
    ].filter(Boolean).join(":")
  ).join("|");
  const icons: Array<[string, string]> = [
    ["message-square", "M21 15a2 2 0 0 1-2 2H7l-4 4V5"],
    ["users", "M16 21v-2a4 4 0 0 0-4-4H6"],
    ["shopping-bag", "M6 2 3 6v14"],
    ["square-arrow-left", "m12 8-4 4 4 4"],
    ["audio-lines", "M2 10v3"],
    ["package-search", "M16 16v6"],
    ["tag", "M12.586 2.586"],
    ["receipt", "M4 2v20"],
    ["bell-dot", "M19.4 14.9"],
    ["file-box", "M14.5 22H18"],
    ["boxes", "M2.97 12.92"],
    ["triangle-alert", "m21.73 18-8-14"],
    ["calendar-check", "M16 2v4"],
    ["house", "m3 9 9-7"],
    ["list-checks", "m3 17 2 2 4-4"],
    ["clock", "M12 6v6l4 2"],
    ["gift", "M12 8v13"],
    ["database", "ellipse:12:5:9:3"],
    ["coins", "circle:8:8"],
  ];

  return icons.find(([, marker]) => signature.includes(marker))?.[0] ?? "tag";
}

function action(
  element: Element | undefined | null,
): NonNullable<Extract<PageBlock, { type: "cta" }>["primaryAction"]> | undefined {
  const link = element?.tagName === "A"
    ? element as HTMLAnchorElement
    : element?.querySelector<HTMLAnchorElement>("a");

  if (!link?.href || !text(link)) {
    return undefined;
  }

  return {
    label: text(link),
    href: localHref(link.href),
    target: link.target === "_blank" ? "_blank" : "_self",
  };
}

function gradientText(element: Element | null): string {
  if (!element) {
    return "";
  }

  return [...element.childNodes].map((node) => {
    if (node.nodeType === node.TEXT_NODE) {
      return textNode(node);
    }

    if (node.nodeType !== node.ELEMENT_NODE) {
      return "";
    }

    const child = node as Element;

    if (
      child.classList.contains("ez-toc-section")
      || child.classList.contains("ez-toc-section-end")
    ) {
      return "";
    }

    return child.tagName === "SPAN"
      ? `{{ ${text(child)} }}`
      : text(child);
  }).filter(Boolean).join(" ").replace(/\s+([,.!?;:])/g, "$1").trim();
}

function text(element: Element | null): string {
  return decodeHtml(element?.textContent ?? "");
}

function textNode(node: Node): string {
  return decodeHtml(node.textContent ?? "");
}

function innerHtml(element: Element | null): string {
  return (element?.innerHTML ?? "")
    .replace(/<span[^>]*class=["'][^"']*ez-toc-section[^"']*["'][^>]*><\/span>/gi, "")
    .replace(/\s*\n\s*/g, " ")
    .trim();
}

function slugify(value: string): string {
  return value.toLocaleLowerCase("en-US")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function localHref(value: string): string {
  const url = new URL(value, sourceBase);
  const isSiteOrigin = url.hostname === "acme.example"
    || url.hostname === "www.acme.example";

  return isSiteOrigin
    ? `${url.pathname}${url.search}${url.hash}`
    : value;
}

async function localizeUpload(value: string): Promise<string> {
  const url = new URL(value, sourceBase);
  const marker = "/wp-content/uploads/";
  const index = url.pathname.indexOf(marker);

  if (index < 0) {
    return localHref(value);
  }

  const storagePath = decodeURIComponent(
    url.pathname.slice(index + marker.length),
  );
  const destination = resolve(mediaRoot, storagePath);

  if (relative(mediaRoot, destination).startsWith("..")) {
    throw new Error(`Unsafe media path: ${value}`);
  }

  try {
    await readFile(destination);
  } catch {
    const response = await fetch(url, {
      headers: { "user-agent": "Acme source migration" },
    });

    if (!response.ok) {
      throw new Error(
        `Could not localize production media (${response.status}) ${value}`,
      );
    }

    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  }

  return `/media/${storagePath}`;
}

async function readMediaRecords(file: string): Promise<SourceMediaRecord[]> {
  const input = JSON.parse(await readFile(file, "utf8")) as {
    records?: SourceMediaRecord[];
  };

  return input.records ?? [];
}

async function hydrateUseCaseMedia(acf: Record<string, unknown>): Promise<void> {
  const mediaIds = collectUseCaseMediaIds(acf);

  await Promise.all(mediaIds.map(async (id) => {
    const existingRecord = sourceMediaRecords.get(id);

    if (existingRecord && await isLocalMediaAvailable(existingRecord)) {
      return;
    }

    let request = mediaRequests.get(id);

    if (!request) {
      request = readProductionMedia(id);
      mediaRequests.set(id, request);
    }

    const record = await request;

    if (record) {
      sourceMediaRecords.set(id, record);
    }
  }));

  setSourceMediaRecords([...sourceMediaRecords.values()]);
}

async function isLocalMediaAvailable(
  record: SourceMediaRecord,
): Promise<boolean> {
  if (!record.publicPath.startsWith("/media/")) {
    return false;
  }

  const storagePath = record.publicPath.slice("/media/".length);
  const destination = resolve(mediaRoot, storagePath);

  if (relative(mediaRoot, destination).startsWith("..")) {
    return false;
  }

  try {
    await access(destination);
    return true;
  } catch {
    return false;
  }
}

function collectUseCaseMediaIds(
  value: unknown,
  fieldName = "",
  ids = new Set<number>(),
): number[] {
  if (Array.isArray(value)) {
    value.forEach((item) => collectUseCaseMediaIds(item, fieldName, ids));
    return [...ids];
  }

  if (value && typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(([key, item]) => {
      collectUseCaseMediaIds(item, key, ids);
    });
    return [...ids];
  }

  if (
    /(?:icon|image|video)$/i.test(fieldName)
    && (typeof value === "number" || typeof value === "string")
  ) {
    const id = Number(value);

    if (Number.isInteger(id) && id > 0) {
      ids.add(id);
    }
  }

  return [...ids];
}

async function readProductionMedia(
  id: number,
): Promise<SourceMediaRecord | undefined> {
  const response = await fetchWithRetry(
    `${sourceBase}/wp-json/wp/v2/media/${id}`,
  );

  if (!response.ok) {
    const fallback = await localizeKnownProductionMedia(id);

    if (!fallback) {
      console.warn(`Production media ${id} could not be read (${response.status}).`);
    }

    return fallback;
  }

  const media = await response.json() as ProductionMedia;

  if (!media.source_url) {
    return undefined;
  }

  return {
    id,
    file: media.media_details?.file?.replace(/^\/+/, "")
      ?? uploadStoragePath(media.source_url),
    publicPath: await localizeUpload(media.source_url),
    alt: decodeHtml(media.alt_text ?? ""),
  };
}

async function localizeKnownProductionMedia(
  id: number,
): Promise<SourceMediaRecord | undefined> {
  const known = sourceMediaRecords.get(id);

  if (!known?.file) {
    return undefined;
  }

  const sourceUrl = `${sourceBase}/wp-content/uploads/${
    known.file.split("/").map(encodeURIComponent).join("/")
  }`;

  return {
    ...known,
    publicPath: await localizeUpload(sourceUrl),
  };
}

function uploadStoragePath(value: string): string | undefined {
  const url = new URL(value, sourceBase);
  const marker = "/wp-content/uploads/";
  const index = url.pathname.indexOf(marker);

  return index >= 0
    ? decodeURIComponent(url.pathname.slice(index + marker.length))
    : undefined;
}

function compactSeo(
  value: ProductionUseCase["yoast_head_json"],
): PageDocument["seo"] {
  if (!value) {
    return {};
  }

  return Object.fromEntries(
    Object.entries({
      metaTitle: decodeHtml(value.title ?? ""),
      metaDescription: decodeHtml(value.description ?? ""),
      canonicalUrl: value.canonical,
      ogTitle: decodeHtml(value.og_title ?? ""),
      ogDescription: decodeHtml(value.og_description ?? ""),
      twitterTitle: decodeHtml(value.twitter_title ?? ""),
      twitterDescription: decodeHtml(value.twitter_description ?? ""),
    }).filter(([, item]) => typeof item === "string" && item.length > 0),
  );
}

function normalizePath(value: string): string {
  const path = value
    .trim()
    .replace(/^https?:\/\/(?:www\.)?acme\.ai/i, "")
    .split(/[?#]/)[0];

  return path && path.startsWith("/")
    ? (path.endsWith("/") ? path : `${path}/`)
    : "";
}

function stableDocumentKey(sourceId: number): string {
  return createHash("sha1")
    .update(`document:${sourceId}`)
    .digest("hex")
    .slice(0, 16);
}

function decodeHtml(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, " ");
}
