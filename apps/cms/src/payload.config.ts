import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { News } from './collections/News'
import { Guides } from './collections/Guides'
import { Tips } from './collections/Tips'
import { UseCases } from './collections/UseCases'
import { Forms } from './collections/Forms'
import { FormSubmissions } from './collections/FormSubmissions'
import { FaqItems } from './collections/FaqItems'
import { Testimonials } from './collections/Testimonials'
import { SiteSettings } from './globals/SiteSettings'
import { payloadMcpPlugin } from './mcp'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const s3Enabled = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_ENDPOINT,
)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  routes: {
    api: process.env.PAYLOAD_API_ROUTE || '/api',
  },
  admin: {
    suppressHydrationWarning: true,
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Posts, News, Guides, Tips, UseCases, Forms, FormSubmissions, FaqItems, Testimonials],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    push: process.env.PAYLOAD_DB_PUSH === 'true',
    prodMigrations: migrations,
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadMcpPlugin,
    ...(s3Enabled
      ? [
          s3Storage({
            collections: {
              media: {
                disablePayloadAccessControl: true,
                prefix: 'media',
              },
            },
            bucket: process.env.S3_BUCKET!,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || 'build-only',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'build-only',
              },
              endpoint: process.env.S3_ENDPOINT,
              forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
              region: process.env.S3_REGION || 'us-east-1',
            },
          }),
        ]
      : []),
  ],
})
