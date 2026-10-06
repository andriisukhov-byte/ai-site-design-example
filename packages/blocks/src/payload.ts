import {
  pageDocumentSchema,
  type ContentCollection,
  type PageDocument,
} from './schemas'

export function payloadDocumentToPage(
  collection: ContentCollection,
  doc: Record<string, unknown>,
): PageDocument {
  return pageDocumentSchema.parse(
    cleanPayloadValue({
      contentKey: doc.contentKey,
      collection,
      path: doc.path,
      title: doc.title,
      excerpt: doc.excerpt,
      featuredImage:
        toCanonicalFeaturedImage(doc.featuredImage) ??
        doc.sourceFeaturedImage,
      publishedAt: doc.publishedAt,
      articleMeta: toCanonicalArticleMeta(doc.articleMeta),
      tipCard: toCanonicalTipCard(doc.tipCard),
      status: doc.status,
      template: doc.template,
      seo: doc.seo,
      blocks: Array.isArray(doc.blocks)
        ? doc.blocks.map(toCanonicalBlock)
        : [],
    }),
  )
}

function toCanonicalArticleMeta(value: unknown): unknown {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined
  }

  const record = value as Record<string, unknown>

  return {
    ...record,
    tags: Array.isArray(record.tags)
      ? record.tags
          .map((tag) =>
            tag && typeof tag === 'object' && !Array.isArray(tag)
              ? (tag as Record<string, unknown>).label
              : tag,
          )
          .filter(
            (tag): tag is string =>
              typeof tag === 'string' && tag.trim().length > 0,
          )
      : [],
  }
}

function toCanonicalFeaturedImage(value: unknown): unknown {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined
  }

  const media = value as Record<string, unknown>
  const src =
    typeof media.publicPath === 'string' && media.publicPath.trim()
      ? media.publicPath
      : typeof media.url === 'string'
        ? media.url
        : undefined

  if (!src) {
    return undefined
  }

  return cleanPayloadValue({
    id: media.id === undefined ? undefined : String(media.id),
    src,
    alt: typeof media.alt === 'string' ? media.alt : '',
    width: typeof media.width === 'number' ? media.width : undefined,
    height: typeof media.height === 'number' ? media.height : undefined,
  })
}

function toCanonicalTipCard(value: unknown): unknown {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined
  }

  const record = value as Record<string, unknown>
  const icons = Array.isArray(record.icons)
    ? record.icons
        .map((item) => {
          if (!item || typeof item !== 'object' || Array.isArray(item)) {
            return undefined
          }

          return toCanonicalFeaturedImage(
            (item as Record<string, unknown>).image,
          )
        })
        .filter(Boolean)
    : []
  const sourceIcons = Array.isArray(record.sourceIcons)
    ? record.sourceIcons
    : []

  return cleanPayloadValue({
    category: record.category,
    archiveWidth: record.archiveWidth,
    icons: icons.length ? icons : sourceIcons,
  })
}

function toCanonicalBlock(block: unknown): unknown {
  if (!block || typeof block !== 'object' || Array.isArray(block)) {
    return block
  }

  const record = block as Record<string, unknown>
  const {
    blockType,
    blockName: _blockName,
    id: _id,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    importTrace: _importTrace,
    ...rest
  } = record

  return cleanPayloadValue({
    type: blockType,
    ...rest,
  })
}

function cleanPayloadValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    const items = value
      .map(cleanPayloadValue)
      .filter((item) => item !== undefined)
    return items.length ? items : undefined
  }

  if (!value || typeof value !== 'object') {
    return value ?? undefined
  }

  if (isImageDescriptorShape(value)) {
    return cleanImageDescriptor(value as Record<string, unknown>)
  }

  const entries = Object.entries(value)
    .filter(([key]) => key !== 'id')
    .map(([key, item]) => [key, cleanPayloadValue(item)] as const)
    .filter(([, item]) => item !== undefined)

  if (entries.length === 0) {
    return undefined
  }

  const object = Object.fromEntries(entries)

  if (isEmptyImageDescriptor(object) || isEmptyLinkDescriptor(object)) {
    return undefined
  }

  return object
}

function cleanImageDescriptor(value: Record<string, unknown>): unknown {
  if (typeof value.src !== 'string' || value.src.trim() === '') {
    return undefined
  }

  const image = {
    id: value.sourceId ?? value.id,
    src: value.src,
    alt: value.alt,
    width: value.width,
    height: value.height,
  }

  return Object.fromEntries(
    Object.entries(image).filter(
      ([, item]) => item !== undefined && item !== null,
    ),
  )
}

function isEmptyImageDescriptor(value: Record<string, unknown>): boolean {
  const keys = Object.keys(value)

  if (
    !keys.every((key) =>
      ['id', 'sourceId', 'src', 'alt', 'width', 'height'].includes(key),
    )
  ) {
    return false
  }

  return typeof value.src !== 'string' || value.src.trim() === ''
}

function isImageDescriptorShape(value: object): boolean {
  const record = value as Record<string, unknown>

  if (!('src' in record)) {
    return false
  }

  const keys = Object.keys(record)
  return keys.every((key) =>
    ['id', 'sourceId', 'src', 'alt', 'width', 'height'].includes(key),
  )
}

function isEmptyLinkDescriptor(value: Record<string, unknown>): boolean {
  const keys = Object.keys(value)

  if (!keys.every((key) => ['label', 'href', 'target'].includes(key))) {
    return false
  }

  return (
    typeof value.label !== 'string' ||
    value.label.trim() === '' ||
    typeof value.href !== 'string' ||
    value.href.trim() === ''
  )
}
