import type { AiProvider, Category, ClothingItem, Occasion, Outfit, OutfitItem, Season } from "@prisma/client";

export type { AiProvider, Category, ClothingItem, Occasion, Season };

export const CATEGORIES: Category[] = ["TOP", "BOTTOM", "DRESS", "OUTERWEAR", "SHOES", "ACCESSORY", "BAG"];
export const SEASONS: Season[] = ["ALL", "SPRING", "SUMMER", "AUTUMN", "WINTER"];
export const OCCASIONS: Occasion[] = ["CASUAL", "WORK", "FORMAL", "PARTY", "SPORT", "DATE", "TRAVEL"];

export type OutfitWithItems = Outfit & {
  items: (OutfitItem & { item: ClothingItem })[];
  favorites?: { profileId: string }[];
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
  source: AiProvider;
  notice?: string;
  occasion: Occasion | null;
  suggestions: OutfitSuggestion[];
}

export const label = (v: string) => v.charAt(0) + v.slice(1).toLowerCase();

export const PROVIDER_LABEL: Record<AiProvider, string> = { ENGINE: "Veyra style engine", OPENAI: "OpenAI", GEMINI: "Google Gemini" };

export const AVATAR_COLORS = ["#B4645A", "#C8A96A", "#7E9A7A", "#6F86A6", "#9C7BA8", "#3A2E29"];
