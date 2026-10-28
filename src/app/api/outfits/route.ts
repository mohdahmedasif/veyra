import { NextResponse } from "next/server";
import type { Occasion } from "@prisma/client";
import { withProfile } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { outfitSchema } from "@/lib/validators";

export const GET = withProfile(async ({ profile }, req: Request) => {
  const favoritesOnly = new URL(req.url).searchParams.get("favorites") === "1";
  const outfits = await prisma.outfit.findMany({
    where: { profileId: profile.id, ...(favoritesOnly ? { favorites: { some: { profileId: profile.id } } } : {}) },
    include: { items: { include: { item: true }, orderBy: { position: "asc" } }, favorites: { where: { profileId: profile.id } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ outfits });
});

export const POST = withProfile(async ({ profile }, req: Request) => {
  const { itemIds, occasion, ...data } = outfitSchema.parse(await req.json());
  const owned = await prisma.clothingItem.count({ where: { id: { in: itemIds }, profileId: profile.id } });
  if (owned !== itemIds.length) return NextResponse.json({ error: "Unknown items" }, { status: 400 });
  const outfit = await prisma.outfit.create({
    data: {
      ...data,
      occasion: (occasion as Occasion) ?? null,
      profileId: profile.id,
      items: { create: itemIds.map((itemId, position) => ({ itemId, position })) },
    },
  });
  return NextResponse.json({ outfit }, { status: 201 });
});
