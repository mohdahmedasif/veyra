#!/usr/bin/env bash
# Assembles a self-contained, ready-to-run Veyra folder from a finished `npm run build`.
# Usage: bash scripts/assemble-deploy.sh OUT_DIR
# The server runs this folder as-is: `node --env-file=.env server.js`. It never builds.
set -euo pipefail

OUT="${1:?usage: assemble-deploy.sh OUT_DIR}"
rm -rf "$OUT"
mkdir -p "$OUT"

# Next.js standalone server: server.js plus only the node_modules it traces.
cp -a .next/standalone/. "$OUT/"
# Static assets are not copied into standalone automatically.
mkdir -p "$OUT/.next"
cp -a .next/static "$OUT/.next/static"
cp -a public "$OUT/public"

# Schema and the Prisma CLI, so the server can run `db push` / seed without the source tree.
mkdir -p "$OUT/prisma"
cp -a prisma/. "$OUT/prisma/"
# Merge into node_modules (the standalone output may already have some of these directories).
for pkg in prisma @prisma .prisma; do
  mkdir -p "$OUT/node_modules/$pkg"
  cp -a "node_modules/$pkg/." "$OUT/node_modules/$pkg/"
done

# Uploaded photos are never part of the build: the server keeps them in UPLOAD_DIR, outside this folder.
rm -rf "$OUT/uploads"

# The server's runtime secrets (DATABASE_URL, ADMIN_KEY…) live in .env on the server, never here.
echo "Assembled $(find "$OUT" -type f | wc -l) files into $OUT"
