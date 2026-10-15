#!/usr/bin/env bash
set -euo pipefail

: "${DEPLOY_HOST:?Set DEPLOY_HOST}" "${DEPLOY_USER:?Set DEPLOY_USER}" "${DEPLOY_PATH:?Set DEPLOY_PATH}"

# This repository may publish only to the site's actual Nginx document root.
# The guard also limits the effect of rsync --delete.
expected_path="/var/www/tradgardsdrommar.se/public"
if [[ "$DEPLOY_PATH" != "$expected_path" ]]; then
  echo "Refusing unexpected DEPLOY_PATH: $DEPLOY_PATH" >&2
  exit 1
fi

[[ "$DEPLOY_HOST" =~ ^[a-zA-Z0-9.-]+$ ]] || { echo "Invalid DEPLOY_HOST" >&2; exit 1; }
[[ "$DEPLOY_USER" =~ ^[a-z_][a-z0-9_-]*$ ]] || { echo "Invalid DEPLOY_USER" >&2; exit 1; }

if [[ ! -f dist/index.html ]]; then
  echo "Missing dist/index.html: build the static website before deploying." >&2
  exit 1
fi

# The remote user should be a dedicated, unprivileged deploy account.
# Never create or modify the destination implicitly.
ssh -o BatchMode=yes -o StrictHostKeyChecking=yes "$DEPLOY_USER@$DEPLOY_HOST" \
  "test -d '$DEPLOY_PATH' && test -w '$DEPLOY_PATH' && command -v rsync >/dev/null"

# Send *only* compiled static output. --delay-updates avoids replacing
# files before their complete contents have arrived (not fully atomic).
# Preserve /.well-known/ on the server for possible ACME / verification files.
rsync -rtz --delete --delay-updates --exclude='/.well-known/' \
  -e "ssh -o BatchMode=yes -o StrictHostKeyChecking=yes" \
  dist/ "$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/"

echo "Deployed compiled site to $DEPLOY_HOST:$DEPLOY_PATH"
