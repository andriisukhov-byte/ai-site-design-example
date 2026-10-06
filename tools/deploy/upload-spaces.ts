import {
  CreateBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { createReadStream } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import { extname, relative, resolve } from 'node:path'

import { argString, parseArgs } from '../migrate/source-utils'

const args = parseArgs()
const bucket = argString(args, 'bucket')
const endpoint = argString(args, 'endpoint')
const region = argString(args, 'region', 'nyc3')!
const sourceDir = resolve(argString(args, 'source-dir', 'apps/web/public/media')!)
const prefix = argString(args, 'prefix', 'media')!.replace(/^\/+|\/+$/g, '')
const accessKeyId = process.env.S3_ACCESS_KEY_ID
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY

if (!bucket || !endpoint || !accessKeyId || !secretAccessKey) {
  throw new Error(
    'Provide --bucket, --endpoint, S3_ACCESS_KEY_ID, and S3_SECRET_ACCESS_KEY.',
  )
}

const client = new S3Client({
  endpoint,
  forcePathStyle: false,
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

try {
  await client.send(
    new CreateBucketCommand({
      Bucket: bucket,
      ACL: 'public-read',
    }),
  )
  console.log(`Created Space ${bucket} in ${region}.`)
} catch (error) {
  const status = (error as { $metadata?: { httpStatusCode?: number } }).$metadata
    ?.httpStatusCode

  if (status !== 409) {
    throw error
  }

  console.log(`Space ${bucket} already exists; syncing files.`)
}

const files = await listFiles(sourceDir)
let uploaded = 0
let bytes = 0
const concurrency = 8

for (let offset = 0; offset < files.length; offset += concurrency) {
  await Promise.all(
    files.slice(offset, offset + concurrency).map(async (file) => {
      const fileStat = await stat(file)
      const relativePath = relative(sourceDir, file).replace(/\\/g, '/')
      const key = `${prefix}/${relativePath}`

      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: createReadStream(file),
          ACL: 'public-read',
          CacheControl: 'public, max-age=31536000, immutable',
          ContentLength: fileStat.size,
          ContentType: contentType(file),
        }),
      )

      uploaded += 1
      bytes += fileStat.size
    }),
  )

  if (uploaded % 100 < concurrency || uploaded === files.length) {
    console.log(`[${uploaded}/${files.length}] uploaded`)
  }
}

console.log(
  JSON.stringify(
    {
      ok: true,
      bucket,
      endpoint,
      region,
      prefix,
      uploaded,
      bytes,
      publicBaseUrl: `https://${bucket}.${new URL(endpoint).hostname}`,
    },
    null,
    2,
  ),
)

async function listFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve(directory, entry.name)
      return entry.isDirectory() ? listFiles(entryPath) : [entryPath]
    }),
  )

  return nested.flat().sort()
}

function contentType(file: string): string {
  const extension = extname(file).toLowerCase()
  const types: Record<string, string> = {
    '.avif': 'image/avif',
    '.css': 'text/css; charset=utf-8',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.json': 'application/json',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webm': 'video/webm',
    '.webp': 'image/webp',
  }

  return types[extension] ?? 'application/octet-stream'
}
