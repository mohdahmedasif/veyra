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

  // Rank each base by its best possible core (base + best shoes), so every
  // top/bottom pairing or dress shows up at most once.
  const ranked = bases
    .map((base) => ({ base, best: Math.max(...(shoes.length ? shoes : [null]).map((sh) => score(sh ? [...base, sh] : base, occasion ?? null).score)) }))
    .sort((a, b) => b.best - a.best);

  // Greedy pick with usage counts so shoes, jackets and accessories rotate instead of
  // the single "safest" piece appearing in every outfit.
  const used = new Map<string, number>();
  const uses = (i: ClothingItem) => used.get(i.id) ?? 0;
  const picked: OutfitSuggestion[] = [];
  for (const { base } of ranked) {
    if (base.some((i) => uses(i) >= 2)) continue; // a top/bottom/dress leads at most two looks
    const outfit = [...base];
    const shoe = pickRotating(shoes, (sh) => score([...base, sh], occasion ?? null).score, uses, 4);
    if (shoe) outfit.push(shoe);
    for (const group of [outer, accessories, bags]) {
      const extra = pickRotating(
        group.filter((g) => paletteHarmony([...outfit, g]).harmony > 0.75), // only if the palette stays strong
        (g) => paletteHarmony([...outfit, g]).harmony * 100,
        uses,
        10,
      );
      if (extra) outfit.push(extra);
    }
    outfit.forEach((i) => used.set(i.id, uses(i) + 1));
    picked.push(score(outfit, occasion ?? null));
    if (picked.length >= count) break;
  }
  return picked.sort((a, b) => b.score - a.score);
}

/** Best-scoring option, but prefers less-used pieces when they're within `slack` points of the best. */
function pickRotating(options: ClothingItem[], rate: (i: ClothingItem) => number, uses: (i: ClothingItem) => number, slack: number) {
  if (!options.length) return undefined;
  const rated = options.map((o) => ({ o, r: rate(o) }));
  const top = Math.max(...rated.map((x) => x.r));
  return rated
    .filter((x) => x.r >= top - slack)
    .sort((a, b) => uses(a.o) - uses(b.o) || b.r - a.r)[0].o;
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
