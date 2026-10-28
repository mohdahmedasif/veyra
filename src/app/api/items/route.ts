import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { withProfile } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { itemSchema } from "@/lib/validators";

export const GET = withProfile(async ({ profile }, req: Request) => {
  const q = new URL(req.url).searchParams;
  const where: Prisma.ClothingItemWhereInput = { profileId: profile.id };
  if (q.get("category")) where.category = q.get("category") as Prisma.ClothingItemWhereInput["category"];
  if (q.get("color")) where.color = { equals: q.get("color")!, mode: "insensitive" };
  if (q.get("occasion")) where.occasions = { has: q.get("occasion") as never };
  const items = await prisma.clothingItem.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ items });
});

export const POST = withProfile(async ({ profile }, req: Request) => {
  const data = itemSchema.parse(await req.json());
  const item = await prisma.clothingItem.create({ data: { ...data, color: data.color.toLowerCase(), profileId: profile.id } as Prisma.ClothingItemUncheckedCreateInput });
  return NextResponse.json({ item }, { status: 201 });
});
