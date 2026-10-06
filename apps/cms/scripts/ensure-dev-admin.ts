import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'

const email = 'admin@aa.aa'
const password = 'admin'

if (process.env.NODE_ENV === 'production') {
  throw new Error('The local development admin bootstrap must not run in production.')
}

dotenv.config({
  path: fileURLToPath(new URL('../.env', import.meta.url)),
})

const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })
const existing = await payload.find({
  collection: 'users',
  limit: 1,
  pagination: false,
  where: {
    email: {
      equals: email,
    },
  },
})

if (existing.docs[0]) {
  await payload.update({
    collection: 'users',
    id: existing.docs[0].id,
    data: {
      email,
      password,
    },
  })
  payload.logger.info(`Refreshed local development admin ${email}`)
} else {
  await payload.create({
    collection: 'users',
    data: {
      email,
      password,
    },
  })
  payload.logger.info(`Created local development admin ${email}`)
}

await payload.destroy()
process.exit(0)
