import type { Category, ClothingItem, Occasion, Outfit, OutfitItem, Season } from "@prisma/client";

export type { Category, ClothingItem, Occasion, Season };

export const CATEGORIES: Category[] = ["TOP", "BOTTOM", "DRESS", "OUTERWEAR", "SHOES", "ACCESSORY", "BAG"];
export const SEASONS: Season[] = ["ALL", "SPRING", "SUMMER", "AUTUMN", "WINTER"];
export const OCCASIONS: Occasion[] = ["CASUAL", "WORK", "FORMAL", "PARTY", "SPORT", "DATE", "TRAVEL"];

export type OutfitWithItems = Outfit & {
  items: (OutfitItem & { item: ClothingItem })[];
  favorites?: { userId: string }[];
};

/** Shape returned by /api/ai/suggest — stable whether it comes from OpenAI or the built-in engine. */
export interface OutfitSuggestion {
  name: string;
  itemIds: string[];
  score: number; // 0–100 style match
  palette: "neutral" | "complementary" | "analogous" | "monochrome" | "mixed";
  reason: string;
}

export interface SuggestResponse {
  source: "openai" | "veyra-engine";
  occasion: Occasion | null;
  suggestions: OutfitSuggestion[];
}

export const label = (v: string) => v.charAt(0) + v.slice(1).toLowerCase();
