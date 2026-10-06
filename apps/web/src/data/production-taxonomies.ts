import type { PageDocument } from '@acme/blocks';
import taxonomyReferenceJson from '../../../../data/source/production-taxonomy-reference.json';

type SourceSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
};

export type ProductionFaqCategory = {
  sourceId: number;
  path: string;
  slug: string;
  name: string;
  description: string;
  count: number;
  seo?: SourceSeo;
};

export type ProductionFaqItem = {
  sourceId: number;
  path: string;
  slug: string;
  question: string;
  answer: string;
  publishedAt: string;
  updatedAt: string;
  ratingLabel?: string;
  views?: number;
  authorName?: string;
  categories: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    ogTitle?: string;
    ogDescription?: string;
  };
};

export type ProductionPostTerm = {
  sourceId: number;
  path: string;
  slug: string;
  name: string;
  description: string;
  count: number;
  seo?: SourceSeo;
};

export type ProductionAuthor = {
  sourceId: number;
  path: string;
  slug: string;
  name: string;
  description: string;
  avatar?: string;
  seo?: SourceSeo;
};

export type ProductionPostRecord = {
  sourceId: number;
  path: string;
  publishedAt: string;
  updatedAt: string;
  excerpt: string;
  author?: string;
  categories: string[];
  tags: string[];
  readTimeMinutes?: number;
  ratingAverage?: number;
  ratingCount?: number;
  views?: number;
  showTableOfContents?: boolean;
  showTableOfContentsTitle?: boolean;
  relatedPaths?: string[];
};

type ProductionTaxonomyReference = {
  generatedAt: string;
  source: string;
  faqCategories: ProductionFaqCategory[];
  faqItems: ProductionFaqItem[];
  postCategories: ProductionPostTerm[];
  postTags: ProductionPostTerm[];
  authors: ProductionAuthor[];
  posts: ProductionPostRecord[];
};

export const productionTaxonomies = taxonomyReferenceJson as ProductionTaxonomyReference;

export function productionPostPresentation(path: string): ProductionPostRecord | undefined {
  return productionTaxonomies.posts.find((post) => post.path === path);
}

const categoryNameBySlug = new Map(
  productionTaxonomies.postCategories.map((term) => [term.slug, term.name]),
);
const tagNameBySlug = new Map(
  productionTaxonomies.postTags.map((term) => [term.slug, term.name]),
);
const authorNameBySlug = new Map(
  productionTaxonomies.authors.map((author) => [author.slug, author.name]),
);

export function productionPostPages(pages: PageDocument[]): PageDocument[] {
  const pageByPath = new Map(pages.map((page) => [page.path, page]));

  return productionTaxonomies.posts.flatMap((record) => {
    const page = pageByPath.get(record.path);
    if (!page || page.status !== 'published') return [];
    const currentMeta = page.articleMeta ?? {
      tags: [],
      showTableOfContents: true,
      showTableOfContentsTitle: true,
      tableOfContentsTitle: 'Contents',
    };

    return [{
      ...page,
      publishedAt: record.publishedAt,
      excerpt: record.excerpt,
      articleMeta: {
        ...currentMeta,
        category: categoryNameBySlug.get(record.categories[0] ?? '') ?? currentMeta.category,
        tags: record.tags.map((slug) => tagNameBySlug.get(slug) ?? slug),
        authorName: authorNameBySlug.get(record.author ?? '') ?? currentMeta.authorName,
        updatedAt: record.updatedAt,
        readTimeMinutes: record.readTimeMinutes ?? currentMeta.readTimeMinutes,
        ratingAverage: record.ratingAverage ?? currentMeta.ratingAverage,
        ratingCount: record.ratingCount ?? currentMeta.ratingCount,
      },
    }];
  });
}

export function postsForCategory(pages: PageDocument[], slug: string): PageDocument[] {
  const paths = new Set(
    productionTaxonomies.posts
      .filter((post) => post.categories.includes(slug))
      .map((post) => post.path),
  );

  return productionPostPages(pages).filter((page) => paths.has(page.path));
}

export function postsForTag(pages: PageDocument[], slug: string): PageDocument[] {
  const paths = new Set(
    productionTaxonomies.posts
      .filter((post) => post.tags.includes(slug))
      .map((post) => post.path),
  );

  return productionPostPages(pages).filter((page) => paths.has(page.path));
}

export function postsForAuthor(pages: PageDocument[], slug: string): PageDocument[] {
  const paths = new Set(
    productionTaxonomies.posts
      .filter((post) => post.author === slug)
      .map((post) => post.path),
  );

  return productionPostPages(pages).filter((page) => paths.has(page.path));
}

export function createArchivePage(
  basePage: PageDocument,
  archive: { path: string; name: string; seo?: SourceSeo },
): PageDocument {
  return {
    ...basePage,
    contentKey: `production:archive:${archive.path}`,
    collection: 'pages',
    path: archive.path,
    title: `${archive.name} Archives`,
    status: 'published',
    seo: {
      ...basePage.seo,
      metaTitle: archive.seo?.title || `${archive.name} Archives | Acme`,
      metaDescription: archive.seo?.description,
      canonicalUrl: archive.seo?.canonical || `https://acme.example${archive.path}`,
      ogTitle: archive.seo?.og_title,
      ogDescription: archive.seo?.og_description,
    },
    blocks: [],
  };
}

export function createFaqPage(basePage: PageDocument, item: ProductionFaqItem): PageDocument {
  return {
    ...basePage,
    contentKey: `production:faq:${item.slug}`,
    collection: 'posts',
    path: item.path,
    title: item.question,
    status: 'published',
    template: 'article',
    publishedAt: item.publishedAt,
    articleMeta: {
      tags: [],
      authorName: item.authorName,
      updatedAt: item.updatedAt,
      views: item.views,
      showTableOfContents: false,
      showTableOfContentsTitle: false,
      tableOfContentsTitle: 'Contents',
    },
    seo: {
      ...basePage.seo,
      ...item.seo,
      canonicalUrl: item.seo?.canonicalUrl || `https://acme.example${item.path}`,
    },
    blocks: [{
      type: 'rich-text',
      title: item.question,
      html: item.answer,
    }],
  };
}
