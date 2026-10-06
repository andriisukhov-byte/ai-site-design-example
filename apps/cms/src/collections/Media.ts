import type { CollectionConfig } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const collectionDir = path.dirname(fileURLToPath(import.meta.url))
const mediaStorageDir = process.env.MEDIA_STORAGE_DIR
  ? path.resolve(process.env.MEDIA_STORAGE_DIR)
  : path.resolve(collectionDir, '../../../web/public/media')
const mediaPublicBaseUrl = (process.env.MEDIA_PUBLIC_BASE_URL || '').replace(/\/+$/, '')

function normalizePublicPath(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) {
    return undefined
  }

  return value.trim()
}

function publicMediaUrl(doc: Record<string, unknown>): string | null {
  const publicPath =
    normalizePublicPath(doc.publicPath) ??
    (typeof doc.filename === 'string' ? `/media/${encodeURIComponent(doc.filename)}` : undefined)

  return publicPath ? `${mediaPublicBaseUrl}${publicPath}` : null
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['filename', 'title', 'alt', 'mimeType', 'filesize', 'updatedAt'],
    listSearchableFields: ['title', 'alt', 'description', 'filename', 'sourceId', 'storageKey'],
    description: 'Search, upload, and maintain the metadata used by site media.',
  },
  access: {
    read: () => true,
  },
  versions: true,
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        const filename =
          typeof data.filename === 'string'
            ? data.filename
            : typeof originalDoc?.filename === 'string'
              ? originalDoc.filename
              : undefined
        const publicPath =
          normalizePublicPath(data.publicPath) ??
          normalizePublicPath(originalDoc?.publicPath) ??
          (filename ? `/media/${filename}` : undefined)

        if (!publicPath) {
          return data
        }

        return {
          ...data,
          publicPath,
          storageKey: publicPath.replace(/^\/+/, ''),
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Name',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Editor-facing media name. The stored filename remains available separately.',
      },
    },
    {
      name: 'alt',
      label: 'Alt text',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Describe the media for people using assistive technology.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional caption, context, credit, or internal editorial notes.',
      },
    },
    {
      name: 'sourceId',
      label: 'Migration identity',
      type: 'number',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Stable identity used by repeatable imports.',
      },
    },
    {
      name: 'publicPath',
      label: 'Public path',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Canonical public path in the shared media directory.',
      },
    },
    {
      name: 'storageKey',
      label: 'Storage key',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Stable key inside the shared media directory.',
      },
    },
  ],
  upload: {
    staticDir: mediaStorageDir,
    adminThumbnail: ({ doc }) => publicMediaUrl(doc),
    bulkUpload: true,
    constructorOptions:
      process.env.PAYLOAD_MIGRATING === 'true' ? { limitInputPixels: false } : undefined,
    displayPreview: true,
    filesRequiredOnCreate: process.env.PAYLOAD_MIGRATING !== 'true',
    handlers: [
      async (req, { doc, params }) => {
        const mediaDoc =
          doc ??
          (
            await req.payload.find({
              collection: 'media',
              depth: 0,
              limit: 1,
              overrideAccess: true,
              where: {
                filename: {
                  equals: params.filename,
                },
              },
            })
          ).docs[0]
        const publicUrl = mediaDoc ? publicMediaUrl(mediaDoc) : null

        if (!publicUrl) {
          return Response.json({ errors: [{ message: 'Media file not found.' }] }, { status: 404 })
        }

        return Response.redirect(new URL(publicUrl, req.url), 302)
      },
    ],
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
}
