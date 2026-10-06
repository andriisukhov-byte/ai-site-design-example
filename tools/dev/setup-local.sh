#!/usr/bin/env bash
# One-time local setup for the example repo: Postgres inside the project folder,
# env files with fresh random secrets, CMS schema + admin, content seeded from
# the snapshot plus every generated page batch. Safe to re-run.
set -euo pipefail

cd "$(dirname "$0")/../.."
ROOT="$(pwd)"
PGDATA="$ROOT/.pgdata"
PGPORT="${PGPORT:-5432}"
DB_NAME=acme
DB_USER=acme
DB_PASS=acme_local

say() { printf '\n\033[1m▸ %s\033[0m\n' "$*"; }

# --- 1. Tools -----------------------------------------------------------------
node_major="$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)"
if [ "$node_major" -lt 22 ]; then
  echo "Node 22+ is required (found: $(node -v 2>/dev/null || echo none))."; exit 1
fi

PG_BIN="${PG_BIN:-}"
if [ -z "$PG_BIN" ]; then
  for dir in /opt/homebrew/opt/postgresql@15/bin /opt/homebrew/opt/postgresql@16/bin \
             /usr/local/opt/postgresql@15/bin /usr/local/opt/postgresql@16/bin; do
    [ -x "$dir/pg_ctl" ] && PG_BIN="$dir" && break
  done
fi
if [ -z "$PG_BIN" ] && command -v pg_ctl >/dev/null; then PG_BIN="$(dirname "$(command -v pg_ctl)")"; fi
if [ -z "$PG_BIN" ]; then
  echo "PostgreSQL not found. Install it with:  brew install postgresql@15"; exit 1
fi
export LC_ALL="${LC_ALL:-en_US.UTF-8}"

# --- 2. Dependencies ----------------------------------------------------------
if [ ! -d node_modules ]; then
  say "Installing npm dependencies"
  npm ci --no-audit --no-fund
fi

# --- 3. Postgres --------------------------------------------------------------
if [ ! -f "$PGDATA/PG_VERSION" ]; then
  say "Creating a local Postgres cluster in .pgdata"
  "$PG_BIN/initdb" -D "$PGDATA" -U postgres --auth=trust >/dev/null
  # Persist the port so a plain `pg_ctl -D .pgdata start` reuses it later.
  echo "port = $PGPORT" >> "$PGDATA/postgresql.conf"
fi
if ! "$PG_BIN/pg_ctl" -D "$PGDATA" status >/dev/null 2>&1; then
  say "Starting Postgres on port $PGPORT"
  "$PG_BIN/pg_ctl" -D "$PGDATA" -l "$PGDATA/server.log" -w start >/dev/null
fi
psql() { "$PG_BIN/psql" -h localhost -p "$PGPORT" -U postgres -v ON_ERROR_STOP=1 -qtA "$@"; }
if [ -z "$(psql -c "select 1 from pg_roles where rolname='$DB_USER'")" ]; then
  psql -c "create role $DB_USER login password '$DB_PASS'"
fi
if [ -z "$(psql -c "select 1 from pg_database where datname='$DB_NAME'")" ]; then
  psql -c "create database $DB_NAME owner $DB_USER"
fi

# --- 4. Env files (never committed) -------------------------------------------
secret() { node -e 'console.log(require("crypto").randomBytes(24).toString("hex"))'; }
if [ ! -f apps/cms/.env ]; then
  say "Writing apps/cms/.env"
  cat > apps/cms/.env <<EOF
DATABASE_URL=postgresql://$DB_USER:$DB_PASS@localhost:$PGPORT/$DB_NAME
PAYLOAD_SECRET=$(secret)
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_API_ROUTE=/api
NEXT_ASSET_PREFIX=
FRONTEND_DEPLOY_HOOK_URL=
FRONTEND_DEPLOY_HOOK_TOKEN=
# S3 disabled locally - media is stored on disk under apps/web/public/media
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
MEDIA_STORAGE_DIR=../web/public/media
MEDIA_PUBLIC_BASE_URL=http://localhost:4321
PAYLOAD_MCP_DISABLED=false
PAYLOAD_MCP_API_KEY=
FORM_SUBMISSION_SECRET=$(secret)
NODE_OPTIONS="--no-deprecation --no-experimental-strip-types"
EOF
fi
if [ ! -f .env.development.local ]; then
  say "Writing .env.development.local"
  cat > .env.development.local <<'EOF'
# Local overrides for `npm run dev` (gitignored).
PAYLOAD_API_URL=http://localhost:3000/api
PAYLOAD_API_REQUIRED=true
PUBLIC_MEDIA_BASE_URL=
PUBLIC_SITE_NOINDEX=true
PUBLIC_FORM_ENDPOINT=/api/forms/submit
EOF
fi

# --- 5. CMS schema + local admin ----------------------------------------------
say "Creating the CMS schema and the local admin (admin@aa.aa / admin)"
PAYLOAD_DB_PUSH=true npm run predev --workspace @acme/cms

# --- 6. Content ---------------------------------------------------------------
say "Seeding the site content (data/source/cms-pages.json)"
set -a; . apps/cms/.env; set +a
npm run migrate:source:upsert -- --write true --progress 100

for batch in data/ai-page-generation/*/pages.json; do
  say "Importing generated batch: $batch"
  npm run cms:upsert -- --file "$batch" --write true --target local --publish true || echo "  (skipped: $batch did not import)"
done

say "Done. Start everything with:  npm run dev   then open http://localhost:4321"
