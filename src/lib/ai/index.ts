import type { ClothingItem, Occasion, Season } from "@prisma/client";
import type { OutfitSuggestion, SuggestResponse } from "@/types";
import { generateOutfits } from "../style-engine";
import type { ResolvedAi } from "./config";

const SYSTEM = `You are Veyra, a premium AI stylist. Given a user's wardrobe as JSON, compose outfits using
ONLY the provided item ids. Each outfit needs (TOP + BOTTOM) or a DRESS, ideally SHOES, and optionally
OUTERWEAR, ACCESSORY and BAG. Apply color theory (neutral, complementary, analogous, monochrome),
occasion and season fit, and the user's style preferences.
Respond with JSON: {"suggestions":[{"name":string,"itemIds":string[],"score":0-100,
"palette":"neutral"|"complementary"|"analogous"|"monochrome"|"mixed","reason":string}]}`;

export async function suggestOutfits(
  ai: ResolvedAi,
  wardrobe: ClothingItem[],
  opts: { occasion?: Occasion | null; season?: Season | null; count: number; preferences: string[] },
): Promise<SuggestResponse> {
  const occasion = opts.occasion ?? null;
  const fallback = (notice?: string): SuggestResponse => ({
    source: "ENGINE",
    occasion,
    suggestions: generateOutfits(wardrobe, opts),
    ...(notice ? { notice } : {}),
  });

  if (!ai.complete) return fallback(ai.provider !== "ENGINE" ? `No ${ai.provider === "GEMINI" ? "Gemini" : "OpenAI"} key saved — used the built-in engine.` : undefined);
  if (wardrobe.length < 2) return fallback();

  try {
    const raw = await ai.complete(
      SYSTEM,
      JSON.stringify({
        count: opts.count,
        occasion,
        season: opts.season ?? null,
        preferences: opts.preferences,
        wardrobe: wardrobe.map(({ id, title, category, color, season, occasions }) => ({ id, title, category, color, season, occasions })),
      }),
    );
    const parsed = JSON.parse(raw) as { suggestions?: OutfitSuggestion[] };
    const ids = new Set(wardrobe.map((i) => i.id));
    const suggestions = (parsed.suggestions ?? [])
      .map((s) => ({ ...s, itemIds: (s.itemIds ?? []).filter((id) => ids.has(id)), score: Math.max(0, Math.min(100, Math.round(Number(s.score) || 0))) }))
      .filter((s) => s.itemIds.length >= 1)
      .slice(0, opts.count);
    return suggestions.length ? { source: ai.provider, occasion, suggestions } : fallback("The AI returned no usable looks — used the built-in engine.");
  } catch (err) {
    console.error(`[veyra] ${ai.provider} suggestion failed, using built-in engine`, err);
    return fallback(`${ai.provider === "GEMINI" ? "Gemini" : "OpenAI"} request failed — used the built-in engine.`);
  }
}
