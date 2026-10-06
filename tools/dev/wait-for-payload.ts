import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { config as loadEnv } from 'dotenv';

const initialPayloadApiUrl = process.env.PAYLOAD_API_URL;
const root = process.cwd();

for (const file of ['.env', '.env.development', '.env.development.local']) {
  const path = resolve(root, file);
  if (existsSync(path)) {
    loadEnv({ path, override: true });
  }
}

const apiUrl = (initialPayloadApiUrl ?? process.env.PAYLOAD_API_URL ?? 'http://localhost:3000/api').replace(/\/+$/, '');
const healthUrl = `${apiUrl}/globals/site-settings`;
const timeoutMs = Number(process.env.PAYLOAD_STARTUP_TIMEOUT_MS ?? 90_000);
const retryMs = 500;
const deadline = Date.now() + timeoutMs;
let lastError = 'no response received';

console.log(`[dev] Waiting for Payload at ${healthUrl}`);

while (Date.now() < deadline) {
  try {
    const response = await fetch(healthUrl, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(2_000),
    });

    if (response.ok) {
      console.log('[dev] Payload is ready; starting Astro.');
      process.exit(0);
    }

    lastError = `HTTP ${response.status} ${response.statusText}`;
  } catch (error) {
    lastError = error instanceof Error ? error.message : String(error);
  }

  await new Promise((resolveDelay) => setTimeout(resolveDelay, retryMs));
}

console.error(
  `[dev] Payload did not become ready within ${Math.round(timeoutMs / 1_000)}s at ${healthUrl}: ${lastError}`,
);
process.exit(1);
