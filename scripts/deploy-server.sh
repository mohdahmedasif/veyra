#!/usr/bin/env bash
# Run on the production server, inside the checkout of the `deploy` branch.
# Pulls the prebuilt output, applies the database schema and restarts the app.
# Never builds: the build happens on GitHub Actions (.github/workflows/build-deploy.yml).
#
# One-time server setup:
#   git clone --branch deploy --depth 1 https://github.com/<owner>/veyra /srv/veyra
#   cd /srv/veyra && cp .env.example .env   # set DATABASE_URL, ADMIN_KEY, TRUST_PROXY=1 …
#   Keep UPLOAD_DIR outside this folder (e.g. /srv/veyra-uploads) so deploys never delete photos.
set -euo pipefail
cd "$(dirname "$0")/.."

git fetch --depth 1 origin deploy
git reset --hard FETCH_HEAD

set -a; . ./.env; set +a
node node_modules/prisma/build/index.js db push --skip-generate

# Restart however the app runs here (systemd shown; use `docker compose up -d` for Docker).
sudo systemctl restart veyra
echo "Deployed $(git rev-parse --short HEAD)"
