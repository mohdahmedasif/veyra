import type { ClothingItem, Occasion, Season } from "@prisma/client";
import type { OutfitSuggestion } from "@/types";
import { isNeutral, paletteHarmony } from "./colors";

/**
 * Veyra's deterministic outfit engine. Builds valid outfit skeletons
 * (top+bottom or dress, plus shoes, optional outerwear/accessory/bag)
 * and ranks them by color harmony, occasion fit and season fit.
 */
export function generateOutfits(
  wardrobe: ClothingItem[],
  opts: { occasion?: Occasion | null; season?: Season | null; count?: number; preferences?: string[] } = {},
): OutfitSuggestion[] {
  const { occasion, season, count = 4 } = opts;
  const fits = (i: ClothingItem) =>
    (!occasion || i.occasions.length === 0 || i.occasions.includes(occasion)) &&
    (!season || season === "ALL" || i.season === "ALL" || i.season === season);

  const pool = wardrobe.filter(fits);
  const by = (c: ClothingItem["category"]) => pool.filter((i) => i.category === c);
  const tops = by("TOP"), bottoms = by("BOTTOM"), dresses = by("DRESS"), shoes = by("SHOES");
  const outer = by("OUTERWEAR"), accessories = by("ACCESSORY"), bags = by("BAG");

  const bases: ClothingItem[][] = [
    ...tops.flatMap((t) => bottoms.map((b) => [t, b])),
    ...dresses.map((d) => [d]),
  ];
  const withShoes = shoes.length ? bases.flatMap((b) => shoes.map((s) => [...b, s])) : bases;

  const candidates = withShoes.map((base) => {
    const extras = [outer, accessories, bags]
      .map((group) => bestAddition(base, group))
      .filter((x): x is ClothingItem => Boolean(x));
    return score([...base, ...extras], occasion ?? null);
  });

  candidates.sort((a, b) => b.score - a.score);

  // Encourage variety: avoid repeating the same base piece too often.
  const used = new Map<string, number>();
  const picked: OutfitSuggestion[] = [];
  for (const c of candidates) {
    if (c.itemIds.slice(0, 2).some((id) => (used.get(id) ?? 0) >= 2)) continue;
    c.itemIds.slice(0, 2).forEach((id) => used.set(id, (used.get(id) ?? 0) + 1));
    picked.push(c);
    if (picked.length >= count) break;
  }
  return picked;
}

function bestAddition(base: ClothingItem[], group: ClothingItem[]) {
  let best: ClothingItem | undefined;
  let bestHarmony = 0.75; // only add if it keeps the palette strong
  for (const g of group) {
    const { harmony } = paletteHarmony([...base, g]);
    if (harmony > bestHarmony) [best, bestHarmony] = [g, harmony];
  }
  return best;
}

function score(items: ClothingItem[], occasion: Occasion | null): OutfitSuggestion {
  const { palette, harmony } = paletteHarmony(items);
  const occasionFit = occasion ? items.filter((i) => i.occasions.includes(occasion)).length / items.length : 0.8;
  const completeness = Math.min(1, items.length / 4);
  const total = Math.round((harmony * 0.55 + occasionFit * 0.3 + completeness * 0.15) * 100);

  const colors = Array.from(new Set(items.map((i) => i.color.toLowerCase())));
  const accent = items.find((i) => !isNeutral(i.color, i.colorHex))?.color.toLowerCase();
  const reason =
    {
      neutral: accent
        ? `A single ${accent} accent pops against grounding neutrals — confident yet balanced.`
        : `A refined neutral story in ${colors.join(", ")} — easy, polished and endlessly wearable.`,
      monochrome: `Tonal dressing in ${colors.join(" and ")} creates a long, elegant line.`,
      analogous: `Neighbouring hues (${colors.join(", ")}) blend softly for a cohesive look.`,
      complementary: `Complementary ${colors.join(" and ")} bring confident contrast.`,
      mixed: `An expressive mix of ${colors.join(", ")} — best for bold days.`,
    }[palette] + (occasion ? ` Tailored for ${occasion.toLowerCase()}.` : "");

  const hero = items[0];
  return {
    name: `${hero.color.charAt(0).toUpperCase() + hero.color.slice(1)} ${hero.category === "DRESS" ? "Dress" : "Edit"}${occasion ? ` · ${occasion.charAt(0) + occasion.slice(1).toLowerCase()}` : ""}`,
    itemIds: items.map((i) => i.id),
    score: total,
    palette,
    reason,
  };
}

/** Score an arbitrary user-built combination (used by Mix & Match). */
export function scoreCombination(items: ClothingItem[], occasion: Occasion | null = null) {
  return items.length ? score(items, occasion) : null;
}
