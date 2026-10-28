import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { withUser } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { itemSchema } from "@/lib/validators";

type Ctx = { params: { id: string } };

export const PATCH = withUser(async (userId, req: Request, { params }: Ctx) => {
  const data = itemSchema.partial().parse(await req.json());
  const { count } = await prisma.clothingItem.updateMany({ where: { id: params.id, userId }, data: data as Prisma.ClothingItemUpdateManyMutationInput });
  if (!count) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: await prisma.clothingItem.findUnique({ where: { id: params.id } }) });
});

export const DELETE = withUser(async (userId, _req: Request, { params }: Ctx) => {
  const { count } = await prisma.clothingItem.deleteMany({ where: { id: params.id, userId } });
  return count ? new NextResponse(null, { status: 204 }) : NextResponse.json({ error: "Not found" }, { status: 404 });
});
