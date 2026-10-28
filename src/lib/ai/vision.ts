import { z } from "zod";
import { CATEGORIES, OCCASIONS, SEASONS } from "@/types";
import type { ResolvedAi } from "./config";

const SYSTEM = `You are Veyra's wardrobe tagger. Look at the photo of ONE clothing item and describe it.
Respond with JSON: {"title": short name like "Navy linen shirt", "category": one of ${CATEGORIES.join("|")},
"color": main color as one simple lowercase word (e.g. black, white, navy, beige, camel, olive, red), "colorHex": "#RRGGBB" of that color,
"season": one of ${SEASONS.join("|")}, "occasions": array from ${OCCASIONS.join("|")}}.
Shirts, t-shirts, blouses, sweaters → TOP. Pants, jeans, skirts, shorts → BOTTOM. Jackets, coats, blazers → OUTERWEAR.`;

const upper = (v: unknown) => (typeof v === "string" ? v.trim().toUpperCase() : v);

const schema = z.object({
  title: z.string().min(1).max(120),
  category: z.preprocess(upper, z.enum(CATEGORIES as [string, ...string[]])),
  color: z.string().min(1).max(40),
  colorHex: z.string().regex(/^#[0-9a-fA-F]{6}$/).nullable().optional(),
  season: z.preprocess(upper, z.enum(SEASONS as [string, ...string[]])).catch("ALL"),
  occasions: z.array(z.string()).catch([]),
});

export type DetectedItem = z.infer<typeof schema>;

/** Returns detected tags, or null when no AI provider is configured or the call fails. */
export async function detectItem(ai: ResolvedAi, image: { mime: string; base64: string }): Promise<DetectedItem | null> {
  if (!ai.complete) return null;
  try {
    const parsed = schema.parse(JSON.parse(await ai.complete(SYSTEM, "Tag this item.", image)));
    return {
      ...parsed,
      color: parsed.color.toLowerCase(),
      occasions: parsed.occasions.map((o) => o.toUpperCase()).filter((o) => (OCCASIONS as string[]).includes(o)),
    };
  } catch (err) {
    console.error(`[veyra] ${ai.provider} photo tagging failed`, err);
    return null;
  }
}
