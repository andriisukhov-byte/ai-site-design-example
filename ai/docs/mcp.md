# MCP Setup

This project uses two separate MCP lanes.

## Payload CMS MCP

Payload MCP is the content lane. Use it when AI needs to read or edit CMS documents, site settings, SEO metadata, forms, or block-based page content.

- Endpoint: `http://localhost:3000/api/mcp`
- Auth: Bearer token from the Payload admin MCP API Keys collection
- Runtime package: `@payloadcms/plugin-mcp`
- Current policy: content collections allow find, create, and update; media allows find only; globals allow find and update; delete is intentionally disabled.

To enable a local client, start the CMS, create an MCP API key in Payload admin, then allow only the capabilities needed for that key.

## Astro Docs MCP

Astro MCP is the framework documentation lane. Use it when AI needs current Astro API, routing, island, integration, or build guidance.

- Server: `https://mcp.docs.astro.build/mcp`
- Native HTTP project config: `.mcp.json`
- Codex/stdout proxy config: `.codex/config.toml`
- Proxy command: `npx -y mcp-remote https://mcp.docs.astro.build/mcp`

Astro MCP should not read or edit CMS content. Payload MCP should not be used as a substitute for current Astro framework documentation.
