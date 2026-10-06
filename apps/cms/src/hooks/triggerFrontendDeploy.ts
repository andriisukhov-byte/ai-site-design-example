import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

type DeployEvent = {
  collection: string
  documentId: string | number
  operation: 'create' | 'delete' | 'update'
}

let queuedEvent: DeployEvent | undefined
let deployTimer: ReturnType<typeof setTimeout> | undefined

export const triggerFrontendDeployAfterChange: CollectionAfterChangeHook = ({
  collection,
  doc,
  operation,
  req,
}) => {
  scheduleFrontendDeploy(
    {
      collection: collection.slug,
      documentId: doc.id,
      operation,
    },
    req.context,
  )

  return doc
}

export const triggerFrontendDeployAfterDelete: CollectionAfterDeleteHook = ({
  collection,
  doc,
  id,
  req,
}) => {
  scheduleFrontendDeploy(
    {
      collection: collection.slug,
      documentId: doc?.id ?? id,
      operation: 'delete',
    },
    req.context,
  )

  return doc
}

export const triggerFrontendDeployAfterGlobalChange: GlobalAfterChangeHook = ({
  global,
  doc,
  req,
}) => {
  scheduleFrontendDeploy(
    {
      collection: `global:${global.slug}`,
      documentId: global.slug,
      operation: 'update',
    },
    req.context,
  )

  return doc
}

function scheduleFrontendDeploy(
  event: DeployEvent,
  context: Record<string, unknown>,
): void {
  if (
    process.env.PAYLOAD_MIGRATING === 'true' ||
    context.skipFrontendDeploy === true ||
    !process.env.FRONTEND_DEPLOY_HOOK_URL
  ) {
    return
  }

  queuedEvent = event

  if (deployTimer) {
    clearTimeout(deployTimer)
  }

  deployTimer = setTimeout(() => {
    const pendingEvent = queuedEvent
    queuedEvent = undefined
    deployTimer = undefined

    if (pendingEvent) {
      void sendDeployHook(pendingEvent)
    }
  }, 1_500)
}

async function sendDeployHook(event: DeployEvent): Promise<void> {
  const url = process.env.FRONTEND_DEPLOY_HOOK_URL
  if (!url) return

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(process.env.FRONTEND_DEPLOY_HOOK_TOKEN
          ? {
              authorization: `Bearer ${process.env.FRONTEND_DEPLOY_HOOK_TOKEN}`,
            }
          : {}),
      },
      body: JSON.stringify({
        source: 'payload',
        ...event,
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      console.error(
        `Frontend deploy hook returned HTTP ${response.status} ${response.statusText}`,
      )
    }
  } catch (error) {
    console.error('Frontend deploy hook failed', error)
  }
}
