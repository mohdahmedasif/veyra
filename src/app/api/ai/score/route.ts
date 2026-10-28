import { NextResponse } from "next/server";
import { z } from "zod";
import type { Occasion } from "@prisma/client";
import { withProfile } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { scoreCombination } from "@/lib/style-engine";

const schema = z.object({ itemIds: z.array(z.string()).max(8), occasion: z.string().nullable().optional() });

export const POST = withProfile(async ({ profile }, req: Request) => {
  const { itemIds, occasion } = schema.parse(await req.json());
  const items = await prisma.clothingItem.findMany({ where: { profileId: profile.id, id: { in: itemIds } } });
  return NextResponse.json({ result: scoreCombination(items, (occasion as Occasion) ?? null) });
});
