import { NextResponse } from "next/server";
import type { Occasion } from "@prisma/client";
import { withUser } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { outfitSchema } from "@/lib/validators";

export const GET = withUser(async (userId, req: Request) => {
  const favoritesOnly = new URL(req.url).searchParams.get("favorites") === "1";
  const outfits = await prisma.outfit.findMany({
    where: { userId, ...(favoritesOnly ? { favorites: { some: { userId } } } : {}) },
    include: { items: { include: { item: true }, orderBy: { position: "asc" } }, favorites: { where: { userId } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ outfits });
});

export const POST = withUser(async (userId, req: Request) => {
  const { itemIds, occasion, ...data } = outfitSchema.parse(await req.json());
  const owned = await prisma.clothingItem.count({ where: { id: { in: itemIds }, userId } });
  if (owned !== itemIds.length) return NextResponse.json({ error: "Unknown items" }, { status: 400 });
  const outfit = await prisma.outfit.create({
    data: {
      ...data,
      occasion: (occasion as Occasion) ?? null,
      userId,
      items: { create: itemIds.map((itemId, position) => ({ itemId, position })) },
    },
  });
  return NextResponse.json({ outfit }, { status: 201 });
});
