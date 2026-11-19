# Deploying Veyra

Like the Opdesk flow, the server never builds:

1. **Push to `main`.** `.github/workflows/build-deploy.yml` runs typecheck, lint and `npm run build` on GitHub, assembles the output with `scripts/assemble-deploy.sh`, and publishes it to the `deploy` branch (never force-pushed).
2. **On the server**, run `scripts/deploy-server.sh` inside the `deploy` checkout. It pulls the prebuilt output, runs `prisma db push`, and restarts the app (`systemctl restart veyra` by default; edit that line for Docker).

One-time server setup:

```bash
git clone --branch deploy --depth 1 https://github.com/<owner>/veyra /srv/veyra
cd /srv/veyra && cp .env.example .env     # DATABASE_URL, ADMIN_KEY, TRUST_PROXY=1, UPLOAD_DIR=/srv/veyra-uploads
node --env-file=.env server.js            # or use a systemd unit that runs this
```

Keep `UPLOAD_DIR` outside the checkout, so a deploy never deletes photos. Put Nginx or Caddy in front for HTTPS.

