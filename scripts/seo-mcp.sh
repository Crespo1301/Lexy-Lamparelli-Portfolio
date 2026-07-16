#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKSPACE_ENV="/home/cresp3/.env.ai.local"
PROJECT_ENV="$ROOT_DIR/.env.ai.local"
SERVER_DIR="$ROOT_DIR/scripts/seo-mcp"

# Load workspace defaults first, then allow project-local overrides.
if [ -f "$WORKSPACE_ENV" ]; then
  set -a
  # shellcheck disable=SC1090
  source "$WORKSPACE_ENV"
  set +a
fi

if [ -f "$PROJECT_ENV" ]; then
  set -a
  # shellcheck disable=SC1090
  source "$PROJECT_ENV"
  set +a
fi

if [ -z "${GSC_GA_SA_KEYFILE:-}" ]; then
  echo "GSC_GA_SA_KEYFILE is not set."
  echo "Create $PROJECT_ENV from .env.ai.example, then point it at the service-account JSON key."
  echo "See docs/seo-monitoring.md for the one-time Google-console setup."
  exit 1
fi

if [ ! -f "$GSC_GA_SA_KEYFILE" ]; then
  echo "GSC_GA_SA_KEYFILE points to a missing file: $GSC_GA_SA_KEYFILE"
  exit 1
fi

if [ -z "${GA4_PROPERTY_ID:-}" ]; then
  echo "GA4_PROPERTY_ID is not set (numeric property id from GA4 Admin, not the G- measurement id)."
  echo "See docs/seo-monitoring.md."
  exit 1
fi

# Install isolated deps once (kept out of the client app's package.json).
if [ ! -d "$SERVER_DIR/node_modules" ]; then
  echo "Installing seo-mcp dependencies (first run)..." >&2
  npm install --prefix "$SERVER_DIR" --silent
fi

exec node "$SERVER_DIR/server.js"
