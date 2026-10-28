import { NextResponse } from "next/server";
import type { Occasion, Season } from "@prisma/client";
import { suggestOutfits } from "@/lib/ai";
import { withUser } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { suggestSchema } from "@/lib/validators";

export const POST = withUser(async (userId, req: Request) => {
  const opts = suggestSchema.parse(await req.json().catch(() => ({})));
  const [wardrobe, user] = await Promise.all([
    prisma.clothingItem.findMany({ where: { userId } }),
    prisma.user.findUnique({ where: { id: userId }, select: { stylePreferences: true } }),
  ]);
  const result = await suggestOutfits(wardrobe, {
    occasion: opts.occasion as Occasion | null | undefined,
    season: opts.season as Season | null | undefined,
    count: opts.count,
    preferences: user?.stylePreferences ?? [],
  });
  return NextResponse.json(result);
});
