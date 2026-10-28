# Veyra

**Your AI wardrobe assistant.** Veyra turns the clothes you already own into endless, beautifully composed outfits. Photograph your pieces, mix and match them on a clean canvas, and let the AI Stylist curate looks for every occasion, styled with color theory and your personal taste.

## Features

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
npm run db:seed             # demo user: demo@veyra.app / veyra123

# 4. Run
npm run dev                 # http://localhost:3000
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `NEXTAUTH_URL` | ✅ | App URL, e.g. `http://localhost:3000` |
| `NEXTAUTH_SECRET` | ✅ | Session encryption secret |
| `OPENAI_API_KEY` / `OPENAI_MODEL` | – | Turns on LLM styling (default model `gpt-4o-mini`) |
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

## Scripts

`dev` · `build` · `start` · `lint` · `typecheck` · `db:push` · `db:migrate` · `db:seed`
