/** Color-theory helpers used by the style engine. */

const NAMED: Record<string, string> = {
  black: "#111111", white: "#FFFFFF", ivory: "#F5EFE6", cream: "#F3E9D2", beige: "#D8CBB5",
  camel: "#C19A6B", tan: "#B08355", brown: "#6B4423", grey: "#8C8C8C", gray: "#8C8C8C", charcoal: "#3A3A3C",
  navy: "#1F2A44", blue: "#4A78C2", denim: "#5B7DB1", red: "#C0392B", burgundy: "#7B1E2B",
  pink: "#E8A0B4", blush: "#EDCFC6", orange: "#E67E22", yellow: "#F4D03F", mustard: "#D4A017",
  green: "#3E8E5E", olive: "#708238", sage: "#A3B18A", purple: "#7D5BA6", lavender: "#C8B6E2",
  gold: "#D4AF37", silver: "#C0C0C0",
};

const NEUTRALS = new Set(["black", "white", "ivory", "cream", "beige", "camel", "tan", "brown", "grey", "gray", "charcoal", "navy", "denim", "gold", "silver"]);

export function isNeutral(color: string, hex?: string | null) {
  if (NEUTRALS.has(color.toLowerCase())) return true;
  const { s } = hexToHsl(resolveHex(color, hex));
  return s < 0.15;
}

export function resolveHex(color: string, hex?: string | null) {
  return hex ?? NAMED[color.toLowerCase()] ?? "#999999";
}

export function hexToHsl(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h *= 60;
  return { h, s, l };
}

const hueDistance = (a: number, b: number) => {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
};

export type Palette = "neutral" | "complementary" | "analogous" | "monochrome" | "mixed";

/** Classifies a set of colors and returns a 0–1 harmony score. */
export function paletteHarmony(colors: { color: string; colorHex?: string | null }[]): { palette: Palette; harmony: number } {
  const accents = colors.filter((c) => !isNeutral(c.color, c.colorHex)).map((c) => hexToHsl(resolveHex(c.color, c.colorHex)).h);
  if (accents.length === 0) return { palette: "neutral", harmony: 0.9 };
  if (accents.length === 1) return { palette: "neutral", harmony: 0.95 }; // one accent on neutrals is a classic

  const pairs: number[] = [];
  for (let i = 0; i < accents.length; i++)
    for (let j = i + 1; j < accents.length; j++) pairs.push(hueDistance(accents[i], accents[j]));
  const worst = Math.max(...pairs);

  if (worst <= 15) return { palette: "monochrome", harmony: 0.9 };
  if (worst <= 45) return { palette: "analogous", harmony: 0.85 };
  if (pairs.every((d) => d >= 150)) return { palette: "complementary", harmony: 0.8 };
  return { palette: "mixed", harmony: Math.max(0.3, 0.7 - accents.length * 0.1) };
}
