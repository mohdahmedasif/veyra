<p align="center">
  <img src="public/logo.svg" width="120" alt="Veyra logo">
</p>

<h1 align="center">Veyra</h1>

<p align="center">
  <em>Your closet, styled by AI.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-B4645A" alt="MIT License">
  <img src="https://img.shields.io/badge/node-%3E%3D22-339933" alt="Node 22 or later">
  <img src="https://img.shields.io/badge/next.js-14-231A16" alt="Next.js 14">
  <img src="https://img.shields.io/badge/postgres-16-336791" alt="PostgreSQL">
</p>

Snap your clothes, and Veyra recognizes each piece, cuts out the background and builds outfit combinations from what you own. No accounts, no emails: pair a device once, then everyone unlocks their own closet with a PIN.

## Features

- **Snap, don't type.** Shirts, pants, dresses, shoes: photograph them in batches.
- **Clean cutouts.** Backgrounds are removed on the phone, and each photo is cropped to the garment.
- **Automatic combos.** Outfits appear as soon as you have a top and a bottom, filtered by occasion and season.
- **Gemini or OpenAI, optional.** Add a key in Settings to recognize pieces and get fresh ideas. Works offline without one.
- **Household profiles.** Everyone gets their own closet, unlocked with a PIN.
- **Phone-first.** Installable, with light and dark themes.

## Quick start

```bash
git clone https://github.com/<owner>/veyra.git && cd veyra
cp .env.example .env          # set DATABASE_URL and ADMIN_KEY
npm install
npm run db:push && npm run db:seed    # optional demo profiles
npm run dev                   # http://localhost:3000
```

Open the app, then pair the browser with your `ADMIN_KEY`.

## Run with Docker

```bash
cp .env.example .env          # set ADMIN_KEY
docker compose up -d --build
```

Photos are kept in the `uploads` volume. Use a reverse proxy such as Nginx or Caddy for HTTPS.

## Documentation

- [Architecture and configuration](docs/ARCHITECTURE.md)
- [How access works](docs/ACCESS.md)
- [API reference](docs/API.md)
- [Deploying](docs/DEPLOY.md)

## Contributing

Contributions are welcome. Read the [Code of Conduct](CODE_OF_CONDUCT.md) and [CONTRIBUTING.md](CONTRIBUTING.md), and report security problems privately via [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE)
