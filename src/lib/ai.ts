import OpenAI from "openai";
import type { ClothingItem, Occasion, Season } from "@prisma/client";
import type { OutfitSuggestion, SuggestResponse } from "@/types";
import { generateOutfits } from "./style-engine";

const SYSTEM = `You are Veyra, a premium AI stylist. Given a user's wardrobe as JSON, compose outfits using
ONLY the provided item ids. Each outfit needs (TOP + BOTTOM) or a DRESS, ideally SHOES, and optionally
OUTERWEAR, ACCESSORY and BAG. Apply color theory (neutral, complementary, analogous, monochrome),
occasion and season fit, and the user's style preferences.
Respond with JSON: {"suggestions":[{"name":string,"itemIds":string[],"score":0-100,
"palette":"neutral"|"complementary"|"analogous"|"monochrome"|"mixed","reason":string}]}`;

export async function suggestOutfits(
  wardrobe: ClothingItem[],
  opts: { occasion?: Occasion | null; season?: Season | null; count: number; preferences: string[] },
): Promise<SuggestResponse> {
  const occasion = opts.occasion ?? null;
  const fallback = (): SuggestResponse => ({ source: "veyra-engine", occasion, suggestions: generateOutfits(wardrobe, opts) });

  if (!process.env.OPENAI_API_KEY || wardrobe.length < 2) return fallback();

  try {
    const client = new OpenAI();
    const res = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.7,
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: JSON.stringify({
            count: opts.count,
            occasion,
            season: opts.season ?? null,
            preferences: opts.preferences,
            wardrobe: wardrobe.map(({ id, title, category, color, season, occasions }) => ({ id, title, category, color, season, occasions })),
          }),
        },
      ],
    });
    const parsed = JSON.parse(res.choices[0]?.message.content ?? "{}") as { suggestions?: OutfitSuggestion[] };
    const ids = new Set(wardrobe.map((i) => i.id));
    const suggestions = (parsed.suggestions ?? [])
      .map((s) => ({ ...s, itemIds: s.itemIds.filter((id) => ids.has(id)), score: Math.max(0, Math.min(100, Math.round(s.score))) }))
      .filter((s) => s.itemIds.length >= 1)
      .slice(0, opts.count);
    return suggestions.length ? { source: "openai", occasion, suggestions } : fallback();
  } catch (err) {
    console.error("[veyra] OpenAI suggestion failed, using built-in engine", err);
    return fallback();
  }
}
