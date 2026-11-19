# API

All routes live under `/api`. Errors return `{ "error": "…" }`, with a `code` of `unpaired`, `locked`, `pin_locked`, `wrong_pin` or `admin` where relevant.

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

## AI response shape

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

