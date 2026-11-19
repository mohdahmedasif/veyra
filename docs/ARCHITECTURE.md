# Architecture

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


## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `ADMIN_KEY` | ✅ | Household key: pairs devices, resets PINs, unlocks household settings. Without it, pairing returns 503 |
| `TRUST_PROXY` | – | `1` behind a reverse proxy, so rate limits see the real client IP |
| `NEXT_PUBLIC_BG_REMOVAL_PATH` | – | Self-host the background-removal model (defaults to IMG.LY's CDN). Set at build time |
| `ENCRYPTION_KEY` | – | Encrypts the AI keys saved in Settings (defaults to `ADMIN_KEY`; set it so you can rotate `ADMIN_KEY` later) |
| `GEMINI_API_KEY` / `OPENAI_API_KEY` | – | Fallback when no key is saved in Settings |
| `CLOUDINARY_CLOUD_NAME` / `_API_KEY` / `_API_SECRET` | – | Image hosting. Without these, photos are saved to `./uploads` (or `UPLOAD_DIR`) and served from `/media` |

