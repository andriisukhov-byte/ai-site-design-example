import { createServer } from 'node:http';
import { resolve } from 'node:path';

import { config as loadEnv } from 'dotenv';

import { handleFormSubmission } from './form-api';

loadEnv({ path: resolve('.env') });

const port = Number(process.env.FORM_API_PORT ?? process.env.PORT ?? 8787);
const endpointPath = process.env.FORM_API_PATH ?? '/api/forms/submit';
const allowedOrigin = process.env.FORM_API_ALLOWED_ORIGIN;

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);

  if (allowedOrigin && req.headers.origin === allowedOrigin) {
    res.setHeader('access-control-allow-origin', allowedOrigin);
    res.setHeader('vary', 'Origin');
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'Content-Type, Accept',
    });
    res.end();
    return;
  }

  if (url.pathname !== endpointPath) {
    res.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, message: 'Not found.' }));
    return;
  }

  const request = new Request(url, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req,
    duplex: 'half',
  } as RequestInit);
  const response = await handleFormSubmission(request);

  res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
  res.end(await response.text());
});

server.listen(port, () => {
  console.log(`Acme form API listening on http://127.0.0.1:${port}${endpointPath}`);
});
