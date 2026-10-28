import { NextResponse } from "next/server";
import type { Occasion, Season } from "@prisma/client";
import { suggestOutfits } from "@/lib/ai";
import { resolveAi } from "@/lib/ai/config";
import { withProfile } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { suggestSchema } from "@/lib/validators";

export const POST = withProfile(async ({ ownerId, profile }, req: Request) => {
  const opts = suggestSchema.parse(await req.json().catch(() => ({})));
  const [wardrobe, ai] = await Promise.all([prisma.clothingItem.findMany({ where: { profileId: profile.id } }), resolveAi(ownerId)]);
  const result = await suggestOutfits(ai, wardrobe, {
    occasion: opts.occasion as Occasion | null | undefined,
    season: opts.season as Season | null | undefined,
    count: opts.count,
    preferences: profile.stylePreferences,
  });
  return NextResponse.json(result);
});
