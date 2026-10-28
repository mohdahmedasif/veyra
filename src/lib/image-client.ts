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
    if (data[i + 3] < 128) continue; // transparent (background already removed)
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

export interface CleanResult {
  file: File;
  color: [string, string] | null;
}

const toFile = (blob: Blob, name: string) => new File([blob], name, { type: blob.type });
const canvasBlob = (c: HTMLCanvasElement, type: string) => new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("encode failed"))), type, 0.9));

/**
 * Removes the background on-device (model downloads once, ~40MB, then cached), crops tight
 * around the garment with a little padding, and returns a transparent PNG. Null if unsupported.
 */
export async function cleanupPhoto(file: File, onProgress?: (pct: number) => void): Promise<CleanResult | null> {
  try {
    const { removeBackground } = await import("@imgly/background-removal");
    const small = (await prepareImage(file)).file; // shrink first: faster inference
    const cut = await removeBackground(small, {
      model: "isnet_quint8",
      publicPath: process.env.NEXT_PUBLIC_BG_REMOVAL_PATH || undefined,
      output: { format: "image/png" },
      progress: (key, current, total) => {
        if (key.startsWith("fetch") && total) onProgress?.(Math.round((current / total) * 100));
      },
    });
    const bitmap = await createImageBitmap(cut);
    const src = document.createElement("canvas");
    src.width = bitmap.width;
    src.height = bitmap.height;
    const sctx = src.getContext("2d")!;
    sctx.drawImage(bitmap, 0, 0);
    const { data } = sctx.getImageData(0, 0, src.width, src.height);

    // Bounding box of the opaque pixels.
    let x0 = src.width, y0 = src.height, x1 = -1, y1 = -1;
    for (let y = 0; y < src.height; y += 2)
      for (let x = 0; x < src.width; x += 2)
        if (data[(y * src.width + x) * 4 + 3] > 40) {
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
    if (x1 < 0 || (x1 - x0) * (y1 - y0) < src.width * src.height * 0.02) return null; // nothing found

    const pad = Math.round(Math.max(x1 - x0, y1 - y0) * 0.06);
    const box = { x: Math.max(0, x0 - pad), y: Math.max(0, y0 - pad), w: 0, h: 0 };
    box.w = Math.min(src.width, x1 + pad) - box.x;
    box.h = Math.min(src.height, y1 + pad) - box.y;

    const out = document.createElement("canvas");
    const scale = Math.min(1, 1024 / Math.max(box.w, box.h));
    out.width = Math.round(box.w * scale);
    out.height = Math.round(box.h * scale);
    const octx = out.getContext("2d")!;
    octx.drawImage(src, box.x, box.y, box.w, box.h, 0, 0, out.width, out.height);
    const color = dominantColor(octx, out.width, out.height);
    return { file: toFile(await canvasBlob(out, "image/png"), "cleaned.png"), color };
  } catch (err) {
    console.warn("[veyra] background removal unavailable", err);
    return null;
  }
}

export interface CropRect { x: number; y: number; w: number; h: number } // all 0–1

/** Crops an image to a normalized rectangle, keeping transparency for PNGs. */
export async function cropImage(file: File, rect: CropRect): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const sx = Math.round(rect.x * bitmap.width), sy = Math.round(rect.y * bitmap.height);
  const sw = Math.max(1, Math.round(rect.w * bitmap.width)), sh = Math.max(1, Math.round(rect.h * bitmap.height));
  const c = document.createElement("canvas");
  c.width = sw;
  c.height = sh;
  c.getContext("2d")!.drawImage(bitmap, sx, sy, sw, sh, 0, 0, sw, sh);
  const png = file.type === "image/png";
  return toFile(await canvasBlob(c, png ? "image/png" : "image/jpeg"), png ? "cropped.png" : "cropped.jpg");
}
