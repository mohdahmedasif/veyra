/** Browser-only helpers: shrink phone photos and guess the garment's main color. */

import { hexToHsl } from "./colors";

export const SWATCHES: [string, string][] = [
  ["black", "#111111"], ["white", "#FFFFFF"], ["ivory", "#F5EFE6"], ["beige", "#D8CBB5"], ["camel", "#C19A6B"], ["brown", "#6B4423"],
  ["grey", "#8C8C8C"], ["charcoal", "#3A3A3C"], ["navy", "#1F2A44"], ["blue", "#4A78C2"], ["denim", "#5B7DB1"], ["green", "#3E8E5E"], ["olive", "#708238"],
  ["sage", "#A3B18A"], ["red", "#C0392B"], ["burgundy", "#7B1E2B"], ["pink", "#E8A0B4"], ["purple", "#7D5BA6"], ["yellow", "#F4D03F"],
  ["orange", "#E67E22"], ["gold", "#D4AF37"], ["tan", "#B08355"],
];

const hex = (n: number) => n.toString(16).padStart(2, "0");

/** Resizes to max 1280px JPEG (also turns HEIC into JPEG where the browser can decode it). */
export async function prepareImage(file: File): Promise<{ file: File; color: [string, string] | null }> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const color = dominantColor(ctx, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85));
    return { file: blob ? new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" }) : file, color };
  } catch {
    return { file, color: null };
  }
}

/** Average of the central area (where the garment usually is), ignoring near-white background pixels, snapped to a named swatch. */
function dominantColor(ctx: CanvasRenderingContext2D, w: number, h: number): [string, string] | null {
  const { data } = ctx.getImageData(Math.round(w * 0.3), Math.round(h * 0.3), Math.max(1, Math.round(w * 0.4)), Math.max(1, Math.round(h * 0.4)));
  let r = 0, g = 0, b = 0, n = 0, all = [0, 0, 0, 0];
  for (let i = 0; i < data.length; i += 16) {
    all = [all[0] + data[i], all[1] + data[i + 1], all[2] + data[i + 2], all[3] + 1];
    if (data[i] > 235 && data[i + 1] > 235 && data[i + 2] > 235) continue;
    r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
  }
  if (!all[3]) return null;
  if (n < all[3] * 0.15) [r, g, b, n] = all; // mostly white → it's probably a white garment
  const avg = [r / n, g / n, b / n];
  const hexAvg = `#${avg.map((c) => hex(Math.round(c))).join("")}`.toUpperCase();
  return [nameColor(hexAvg), hexAvg];
}


/**
 * Names a measured color the way a person would. Plain RGB distance mislabels muted
 * fabrics (a blue-grey chambray lands nearer "green" than "grey"), so muted colors are
 * named by lightness + tint, and vivid ones by nearest hue.
 */
export function nameColor(hexValue: string): string {
  const { h, s, l } = hexToHsl(hexValue);
  if (l > 0.9) return "white";
  if (l < 0.13) return "black";
  if (s < 0.2) {
    const blueish = h >= 190 && h <= 260 && s >= 0.05;
    const warm = h >= 20 && h <= 60 && s >= 0.08;
    if (blueish) return l < 0.28 ? "navy" : "denim";
    if (warm) return l > 0.78 ? "ivory" : l > 0.55 ? "beige" : l > 0.32 ? "tan" : "brown";
    return l > 0.78 ? "white" : l > 0.42 ? "grey" : l > 0.22 ? "charcoal" : "black";
  }
  // Vivid: closest chromatic swatch by hue, then lightness.
  let best = "red", dist = Infinity;
  for (const [name, hv] of SWATCHES) {
    const o = hexToHsl(hv);
    if (o.s < 0.2) continue;
    const dh = Math.min(Math.abs(o.h - h), 360 - Math.abs(o.h - h)) / 180;
    const d = dh * dh * 4 + (o.l - l) ** 2 + (o.s - s) ** 2 * 0.3;
    if (d < dist) [best, dist] = [name, d];
  }
  return best;
}
