# Veyra

**Your AI wardrobe assistant.** Veyra turns the clothes you already own into endless, beautifully composed outfits. Photograph your pieces, mix and match them on a clean canvas, and let the AI Stylist curate looks for every occasion, styled with color theory and your personal taste.

## Features

- **Household profiles**: one admin account and up to 8 Netflix-style profiles. Each profile has its own closet, outfits and style preferences, and unlocks with a 4–6 digit PIN. Five wrong PINs lock the profile for 5 minutes, and the admin can reset a PIN to clear the lock.
- **Device pairing**: the admin generates a **one-time pairing key** in Settings → Devices. It's single use and expires after 10 minutes. Another phone or tablet enters it at `/pair` and is then trusted. Devices can be revoked at any time.
- **Gemini / OpenAI in Settings**: the admin chooses Google Gemini, OpenAI or the built-in engine, and pastes in a key. Keys are encrypted with AES-256-GCM and never shown again. A Test key button checks that a key works.
- **Light and dark mode** with the porcelain, espresso and rose-clay palette. Phones get a bottom tab bar and the app can be added to the home screen.
- **Digital wardrobe**: upload or snap photos, then tag each piece with category, color, season and occasion. Filter by category, color or occasion.
- **Mix & Match studio**: build outfits by hand and get a live style-match score and palette read.
- **AI Stylist**: returns the top 3–5 outfits from your wardrobe for a chosen occasion and season. It uses OpenAI when `OPENAI_API_KEY` is set and otherwise falls back to Veyra's built-in color-theory engine, so it always works.
- **Saved looks and favorites**: save outfits, mark the ones you love, delete the rest.
- **Style profile**: your style preferences are fed into AI suggestions.
- Email/password auth (NextAuth), a responsive mobile-first UI, and a premium neutral design system.

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma · PostgreSQL · NextAuth · OpenAI (optional) · Cloudinary (optional) · Zod

## Getting started

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env        # set DATABASE_URL and NEXTAUTH_SECRET (openssl rand -base64 32)

# 3. Database (needs a running PostgreSQL)
#    Quick option: docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=veyra postgres:16
npm run db:push
npm run db:seed             # admin demo@veyra.app / veyra123 · profiles Ava (PIN 1234), Sam (PIN 0000)

# 4. Run
npm run dev                 # http://localhost:3000
```

### Run with Docker (any server)

```bash
cp .env.example .env        # set NEXTAUTH_SECRET, NEXTAUTH_URL (your domain) and optional keys
docker compose up -d --build
```

This starts PostgreSQL, creates the tables, seeds the demo user and serves Veyra on port 3000 (set `PORT` to change it). Put a reverse proxy such as Nginx or Caddy in front of it for HTTPS. In production, set `CLOUDINARY_*` for photo uploads: images saved locally after the build may not be served by Next.js.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `NEXTAUTH_URL` | ✅ | App URL, e.g. `http://localhost:3000` |
| `NEXTAUTH_SECRET` | ✅ | Session encryption secret |
| `ENCRYPTION_KEY` | – | Encrypts the AI keys saved in Settings (defaults to `NEXTAUTH_SECRET`) |
| `GEMINI_API_KEY` / `OPENAI_API_KEY` | – | Fallback when no key is saved in Settings |
| `CLOUDINARY_CLOUD_NAME` / `_API_KEY` / `_API_SECRET` | – | Image hosting. Without these, uploads go to `public/uploads` (local dev only) |

## Project structure

```
prisma/
  schema.prisma          User, ClothingItem, Outfit, OutfitItem, FavoriteOutfit, Tag (+ NextAuth models)
  seed.ts                Demo user, 10 wardrobe pieces, 1 favorite outfit
src/
  middleware.ts          Protects app routes
  app/
    page.tsx             Landing page
    (auth)/login, signup Auth screens
    (app)/dashboard      Stats, categories, recent looks
    (app)/wardrobe       Filterable closet grid; /new adds a piece with photo upload
    (app)/outfits        Mix & Match builder
    (app)/ai             AI Stylist
    (app)/favorites      Saved looks and favorites
    (app)/settings       Profile and style preferences
    api/                 REST endpoints (see below)
  components/            Reusable UI (ItemCard, OutfitCard, MixMatch, AiStylist, …)
  lib/
    auth.ts              NextAuth config and session helpers
    ai.ts                OpenAI suggestions with validated JSON and engine fallback
    style-engine.ts      Deterministic outfit generator and scorer
    colors.ts            Color theory (neutral/analogous/complementary/monochrome)
    upload.ts            Cloudinary or local image storage
    validators.ts        Zod schemas
  types/                 Shared TypeScript types
```

## API

| Method | Route | Description |
| --- | --- | --- |
| POST | `/api/register` | Create an account |
| GET / POST | `/api/items` | List items (`?category=&color=&occasion=`) or create one |
| PATCH / DELETE | `/api/items/:id` | Update or remove an item |
| POST | `/api/upload` | Multipart image upload, returns `{ url }` |
| GET / POST | `/api/outfits` | List outfits (`?favorites=1`) or save one |
| DELETE | `/api/outfits/:id` | Delete an outfit |
| POST | `/api/outfits/:id/favorite` | Toggle favorite |
| POST | `/api/ai/suggest` | `{ occasion?, season?, count? }`, returns AI outfit suggestions |
| POST | `/api/ai/score` | `{ itemIds, occasion? }`, returns the style score for a combination |
| PATCH | `/api/profile` | Update name and style preferences |

### AI response shape

```json
{
  "source": "openai",
  "occasion": "WORK",
  "suggestions": [
    {
      "name": "Effortless Office",
      "itemIds": ["…", "…", "…"],
      "score": 92,
      "palette": "neutral",
      "reason": "Ivory and camel create a soft tonal palette; black heels ground the look."
    }
  ]
}
```

An outfit is (top + bottom) or a dress, plus shoes when available. The engine then adds outerwear, an accessory and a bag only when they keep the palette harmonious. The score combines color harmony (55%), occasion fit (30%) and completeness (15%).

## How access works

1. The admin signs in with email and password. That browser is trusted automatically and the admin profile is unlocked.
2. Other devices are paired with a one-time key and show **Who's dressing today?** Each person taps their avatar and enters their PIN.
3. An unlocked profile stays unlocked for 12 hours, or until someone taps **Lock** in the profile menu.

Upgrading from v1: the data model changed from users to profiles, so reset the database with `npx prisma db push --force-reset && npm run db:seed`.

## Scripts

`dev` · `build` · `start` · `lint` · `typecheck` · `db:push` · `db:migrate` · `db:seed`
