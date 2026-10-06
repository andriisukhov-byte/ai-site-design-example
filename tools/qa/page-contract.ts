import { readFile } from "node:fs/promises";

import { pageDocumentSchema, type PageDocument } from "@acme/blocks";

type CmsPagesExport = {
  generatedAt?: string;
  pages?: unknown[];
};

type Finding = {
  code: string;
  path?: string;
  message: string;
  sample?: string;
};

type WalkVisitor = (key: string, value: unknown, path: string) => void;

const args = process.argv.slice(2);
const cmsPagesPath = readArg("--file") ?? "data/cms/pages.json";
const showcaseRouteAllowlist = new Set(["/blocks/"]);
const approvedExternalHosts = new Set(["app.acme.example"]);
const findings: Finding[] = [];
const warnings: Finding[] = [];
const legacyAuthoringSamples: string[] = [];

const forbiddenRuntimePatterns: Array<{
  code: string;
  pattern: RegExp;
  message: string;
}> = [
  {
    code: "source-upload-url",
    pattern: /https?:\/\/(?:www\.)?acme\.ai\/wp-content\/uploads\//i,
    message: "First-party uploads must be localized before page publication.",
  },
  {
    code: "dev-origin-url",
    pattern: /https?:\/\/dev\.acme\.(?:ai|com)\b/i,
    message: "Development origin URLs must not be part of the page contract.",
  },
  {
    code: "wp-upload-path",
    pattern: /(^|["'(])\/wp-content\/uploads\//i,
    message: "WordPress upload paths must be rewritten to product asset paths.",
  },
  {
    code: "third-party-runtime-cdn",
    pattern: /https?:\/\/(?:code\.jquery\.com|cdn\.jsdelivr\.net)\b/i,
    message: "Legacy runtime CDN links must not be emitted by page data.",
  },
  {
    code: "local-absolute-path",
    pattern: /\b[A-Z]:[\\/][^"'<>]+/i,
    message: "Local machine paths must never appear in CMS page data.",
  },
];

const sourceText = await readFile(cmsPagesPath, "utf8");
const cmsPages = JSON.parse(sourceText) as CmsPagesExport;

if (!Array.isArray(cmsPages.pages)) {
  findings.push({
    code: "missing-pages",
    message: `${cmsPagesPath} must contain a pages array.`,
  });
}

const validPages: PageDocument[] = [];

for (const rawPage of cmsPages.pages ?? []) {
  const page =
    rawPage && typeof rawPage === "object"
      ? (rawPage as { path?: unknown })
      : {};
  const path = typeof page.path === "string" ? page.path : undefined;
  const parsed = pageDocumentSchema.safeParse(rawPage);

  if (!parsed.success) {
    findings.push({
      code: "schema-invalid",
      path,
      message: parsed.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; "),
    });
    continue;
  }

  validPages.push(parsed.data);
}

for (const page of validPages) {
  validatePage(page);
}

if (legacyAuthoringSamples.length > 0) {
  findings.push({
    code: "legacy-authoring-key",
    message: `${legacyAuthoringSamples.length} sourceName field(s) remain in runtime JSON.`,
    sample: legacyAuthoringSamples.slice(0, 12).join("; "),
  });
}

for (const { code, pattern, message } of forbiddenRuntimePatterns) {
  const match = pattern.exec(sourceText);

  if (match) {
    findings.push({
      code,
      message,
      sample: match[0],
    });
  }
}

const result = {
  ok: findings.length === 0,
  file: cmsPagesPath,
  generatedAt: cmsPages.generatedAt,
  totalPages: cmsPages.pages?.length ?? 0,
  validPages: validPages.length,
  warnings,
  findings,
};

console.log(JSON.stringify(result, null, 2));

if (findings.length > 0) {
  process.exit(1);
}

function validatePage(page: PageDocument) {
  const isShowcaseRoute = showcaseRouteAllowlist.has(page.path);
  const heroIndexes = page.blocks
    .map((block, index) => (block.type === "hero" ? index : -1))
    .filter((index) => index >= 0);

  if (heroIndexes.length > 1 && !isShowcaseRoute) {
    findings.push({
      code: "multiple-heroes",
      path: page.path,
      message: "Published pages should have at most one hero block.",
      sample: heroIndexes.join(", "),
    });
  }

  if (heroIndexes.length === 1 && heroIndexes[0] !== 0 && !isShowcaseRoute) {
    findings.push({
      code: "late-hero",
      path: page.path,
      message: "Hero block must be the first content block on routed pages.",
      sample: String(heroIndexes[0]),
    });
  }

  for (let index = 1; index < page.blocks.length; index += 1) {
    const previousType = page.blocks[index - 1]?.type ?? "";
    const currentType = page.blocks[index]?.type ?? "";

    if (
      previousType.includes("cta") &&
      currentType.includes("cta") &&
      !isShowcaseRoute
    ) {
      findings.push({
        code: "adjacent-cta",
        path: page.path,
        message: "CTA blocks should not be adjacent in generated pages.",
        sample: `${index - 1}-${index}`,
      });
    }
  }

  if (page.status === "published" && !page.seo.metaDescription) {
    findings.push({
      code: "missing-meta-description",
      path: page.path,
      message: "Published pages must provide SEO metaDescription.",
    });
  }

  validateAnchors(page);
  validateStrings(page);
}

function validateAnchors(page: PageDocument) {
  const anchors = new Set<string>();

  for (const block of page.blocks) {
    const anchor = block.root?.anchor;

    if (!anchor) {
      continue;
    }

    if (anchors.has(anchor)) {
      findings.push({
        code: "duplicate-anchor",
        path: page.path,
        message: "Block root anchors must be unique within a page.",
        sample: anchor,
      });
    }

    anchors.add(anchor);
  }

  for (const block of page.blocks) {
    if (block.type !== "anchor-nav") {
      continue;
    }

    const items = Array.isArray(block.items) ? block.items : [];

    for (const item of items) {
      const href =
        item && typeof item === "object" && "href" in item
          ? String(item.href)
          : "";
      const target = href.startsWith("#") ? href.slice(1) : "";

      if (target && !anchors.has(target)) {
        warnings.push({
          code: "unresolved-anchor-nav-target",
          path: page.path,
          message:
            "Anchor navigation item has no matching block root.anchor yet.",
          sample: href,
        });
      }
    }
  }
}

function validateStrings(page: PageDocument) {
  walk(page, (key, value, valuePath) => {
    if (typeof value !== "string") {
      return;
    }

    if (key === "sourceName") {
      legacyAuthoringSamples.push(`${page.path} ${valuePath}`);
    }

    if (key === "src") {
      validateImageSource(page.path, value, valuePath);
    }

    if (key === "href" || key === "url") {
      validateLink(page.path, value, valuePath);
    }
  });
}

function validateImageSource(pagePath: string, src: string, valuePath: string) {
  if (
    src.startsWith("/assets/") ||
    src.startsWith("/media/") ||
    src.startsWith("data:image/") ||
    src === ""
  ) {
    return;
  }

  findings.push({
    code: "invalid-image-source",
    path: pagePath,
    message: "Image sources must use localized /assets/ or canonical /media/ paths.",
    sample: `${valuePath}: ${src}`,
  });
}

function validateLink(pagePath: string, href: string, valuePath: string) {
  if (
    href === "" ||
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return;
  }

  try {
    const url = new URL(href);

    if (approvedExternalHosts.has(url.host)) {
      return;
    }

    warnings.push({
      code: "unapproved-external-link",
      path: pagePath,
      message: "External links should be product-approved before publication.",
      sample: `${valuePath}: ${href}`,
    });
  } catch {
    findings.push({
      code: "invalid-link",
      path: pagePath,
      message: "Links must be relative, anchors, contact links, or valid URLs.",
      sample: `${valuePath}: ${href}`,
    });
  }
}

function walk(value: unknown, visitor: WalkVisitor, path = "") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, visitor, `${path}[${index}]`));
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    const childPath = path ? `${path}.${key}` : key;
    visitor(key, child, childPath);
    walk(child, visitor, childPath);
  }
}

function readArg(name: string) {
  const index = args.indexOf(name);

  if (index === -1) {
    return undefined;
  }

  return args[index + 1];
}
