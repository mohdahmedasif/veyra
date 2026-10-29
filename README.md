# Veyra

**Your AI wardrobe assistant.** Veyra turns the clothes you already own into endless, beautifully composed outfits. Photograph your pieces, mix and match them on a clean canvas, and let the AI Stylist curate looks for every occasion, styled with color theory and your personal taste.

## Features

- **Snap your clothes**: take photos of shirts, pants, dresses, shoes and more, several at once. With a Gemini or OpenAI key, Veyra recognizes each piece's type, color, season and occasions automatically. Without one, it guesses the color on the device and you tap the type. Photos are shrunk on the phone before uploading.
- **Photo cleanup**: each photo has its background removed on the phone and is auto-cropped to the garment, giving a clean cutout. No key or cost is needed; the model (~40MB) downloads once and is then cached. There's a manual **Crop** tool and an **Original / Clean** toggle. Uses [`@imgly/background-removal`](https://github.com/imgly/background-removal-js) (AGPL-3.0).
- **Automatic combos**: as soon as your closet has a top and a bottom (or a dress), the Combos page and dashboard build outfit combinations for you. You can filter them by occasion or season, ask the AI for fresh ideas, and tap ♥ to save.
- **No accounts or emails**: a device is paired once with the household `ADMIN_KEY`, then each person picks their profile and unlocks it with a PIN. See [How access works](#how-access-works).
- **Household profiles**: up to 12 Netflix-style profiles, each with its own closet, outfits and style preferences.
- **Gemini / OpenAI in Settings**: the admin chooses Google Gemini, OpenAI or the built-in engine, and pastes in a key. Keys are encrypted with AES-256-GCM and never shown again. A Test key button checks that a key works.
- **Light and dark mode** with the porcelain, espresso and rose-clay palette. Phones get a bottom tab bar and the app can be added to the home screen.
- **Digital wardrobe**: upload or snap photos, then tag each piece with category, color, season and occasion. Filter by category, color or occasion.
- **Mix & Match studio**: build outfits by hand and get a live style-match score and palette read.
- **AI Stylist**: returns the top 3–5 outfits from your wardrobe for a chosen occasion and season. It uses OpenAI when `OPENAI_API_KEY` is set and otherwise falls back to Veyra's built-in color-theory engine, so it always works.
- **Saved looks and favorites**: save outfits, mark the ones you love, delete the rest.
- **Style profile**: your style preferences are fed into AI suggestions.
- A responsive mobile-first UI and a premium neutral design system.

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma · PostgreSQL · OpenAI (optional) · Cloudinary (optional) · Zod

## Getting started

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env        # set DATABASE_URL and ADMIN_KEY (openssl rand -base64 24)

# 3. Database (needs a running PostgreSQL)
#    Quick option: docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=veyra postgres:16
npm run db:push
npm run db:seed             # optional demo household

# 4. Run
npm run dev                 # http://localhost:3000
```

### Run with Docker (any server)

```bash
cp .env.example .env        # set ADMIN_KEY, TRUST_PROXY=1 behind a proxy, and optional keys
docker compose up -d --build
```

This starts PostgreSQL, creates the tables, seeds the demo user and serves Veyra on port 3000 (set `PORT` to change it). Put a reverse proxy such as Nginx or Caddy in front of it for HTTPS. Photos are kept in the `uploads` volume. Set `CLOUDINARY_*` instead if you prefer cloud image hosting.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `ADMIN_KEY` | ✅ | Household key: pairs devices, resets PINs, unlocks household settings. Without it, pairing returns 503 |
| `TRUST_PROXY` | – | `1` behind a reverse proxy, so rate limits see the real client IP |
| `NEXT_PUBLIC_BG_REMOVAL_PATH` | – | Self-host the background-removal model (defaults to IMG.LY's CDN). Set at build time |
| `ENCRYPTION_KEY` | – | Encrypts the AI keys saved in Settings (defaults to `ADMIN_KEY`; set it so you can rotate `ADMIN_KEY` later) |
| `GEMINI_API_KEY` / `OPENAI_API_KEY` | – | Fallback when no key is saved in Settings |
| `CLOUDINARY_CLOUD_NAME` / `_API_KEY` / `_API_SECRET` | – | Image hosting. Without these, photos are saved to `./uploads` (or `UPLOAD_DIR`) and served from `/media` |

## Project structure

```
prisma/
  schema.prisma          Household, Profile, Device, ProfileSession, PairingCode, ClothingItem, Outfit, OutfitItem, FavoriteOutfit, Tag
  seed.ts                Demo user, 10 wardrobe pieces, 1 favorite outfit
src/
  middleware.ts          Protects app routes
  app/
    page.tsx             Landing page
    (auth)/pair          Pair a device with the admin key or a one-time key
    profiles/            "Who's dressing today?" picker: unlock, create profile, reset PIN
    (app)/dashboard      Stats, categories, recent looks
    (app)/wardrobe       Filterable closet grid; /new adds a piece with photo upload
    (app)/outfits        Mix & Match builder
    (app)/ai             AI Stylist
    (app)/favorites      Saved looks and favorites
    (app)/settings       Profile and style preferences
    api/                 REST endpoints (see below)
  components/            Reusable UI (ItemCard, OutfitCard, MixMatch, AiStylist, …)
  lib/
    session.ts           Devices, PIN sessions, admin unlock (no accounts)
    access-config.ts     All access numbers: PIN length, lockouts, lifetimes, rate limits
    rate-limit.ts        In-memory per-IP sliding window
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
| GET | `/api/auth/status` | `{ paired, profile, admin }`, which screen the client should show |
| POST | `/api/pair` | `{ key, label }`, pair with `ADMIN_KEY` or a one-time key |
| GET / POST | `/api/profiles` | List profiles, or create one `{ name, pin }` (paired device) |
| POST | `/api/profiles/:id/unlock` | `{ pin }` |
| POST | `/api/profiles/:id/reset-pin` | `{ adminKey, newPin }`, forgotten PIN |
| POST | `/api/lock` · DELETE `/api/devices/self` | Lock profile · unpair this device |
| POST | `/api/admin/unlock` | `{ adminKey }`, unlocks household settings for 15 min |
| GET / POST | `/api/items` | List items (`?category=&color=&occasion=`) or create one |
| PATCH / DELETE | `/api/items/:id` | Update or remove an item |
| POST | `/api/upload` | Multipart image upload, returns `{ url }` |
| POST | `/api/items/analyze` | Uploads a photo and returns `{ url, detected }`, the AI-detected tags (`null` without an AI key) |
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

There are no usernames, emails or passwords. Access has two layers:

1. **Pair the device** (once per browser). Enter the household `ADMIN_KEY` (compared in constant time) or a one-time pairing key made in Settings → Devices. The server stores only the SHA-256 hash of a random 32-byte token and gives the raw token to the browser as a cookie that lasts a year.
2. **Unlock a profile with a PIN.** On a paired device, **Who's dressing today?** lists the profiles, and anyone can add a new one. A correct PIN (bcrypt, salted) creates a 30-day session. Only its hash is stored, and it's **bound to the device**, so a copied session cookie doesn't work in another browser.

Protections:
- **Cookies** are `HttpOnly` and `SameSite=Strict`, plus `Secure` over HTTPS.
- **PIN lockout:** the first 5 wrong PINs are free. Each further miss locks the profile for 1, 5, 30, then 120 minutes.
- **Rate limits per IP:** pairing 20, unlocking 30, and admin-key checks 20 per 5 minutes. They're held in memory, so they reset on restart.
- **Forgot your PIN?** "Forgot PIN?" on the unlock screen takes the admin key and a new PIN, clears the lockout and signs that profile out everywhere.
- **Changing your own PIN** signs you out on your other devices.
- **Household settings** (profiles, devices and AI keys) need the admin key. They stay unlocked on that device for 15 minutes.
- All the numbers live in `src/lib/access-config.ts`.

This model suits a household or a small trusted group, where the short PIN is protected by the lockout, the rate limit and device pairing. For a public app, use real accounts.

Upgrading from an older version: the access tables changed, so reset the database with `npx prisma db push --force-reset && npm run db:seed`.

## Scripts

`dev` · `build` · `start` · `lint` · `typecheck` · `db:push` · `db:migrate` · `db:seed`
