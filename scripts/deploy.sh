#!/usr/bin/env bash
set -euo pipefail
: "${DEPLOY_HOST:?}" "${DEPLOY_USER:?}" "${DEPLOY_PATH:?}" "${RELEASE_ID:?}"
[[ "$DEPLOY_HOST" =~ ^[a-zA-Z0-9.-]+$ ]] || exit 1
[[ "$DEPLOY_USER" =~ ^[a-z_][a-z0-9_-]*$ ]] || exit 1
[[ "$DEPLOY_PATH" =~ ^/var/www/[a-zA-Z0-9/_-]+$ ]] || exit 1
[[ "$RELEASE_ID" =~ ^[a-zA-Z0-9_-]+$ ]] || exit 1
release="$DEPLOY_PATH/releases/$RELEASE_ID"
ssh "$DEPLOY_USER@$DEPLOY_HOST" "mkdir -p '$release'"
rsync -az --delete dist/ "$DEPLOY_USER@$DEPLOY_HOST:$release/"
ssh "$DEPLOY_USER@$DEPLOY_HOST" "test -f '$release/index.html' && ln -s '$release' '$DEPLOY_PATH/current-next-$RELEASE_ID' && mv -Tf '$DEPLOY_PATH/current-next-$RELEASE_ID' '$DEPLOY_PATH/current'"
