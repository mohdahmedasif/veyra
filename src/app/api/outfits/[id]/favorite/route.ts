import { NextResponse } from "next/server";
import { withUser } from "@/lib/api";
import { prisma } from "@/lib/prisma";

/** Toggles the outfit in the user's favorites. */
export const POST = withUser(async (userId, _req: Request, { params }: { params: { id: string } }) => {
  const outfit = await prisma.outfit.findFirst({ where: { id: params.id, userId } });
  if (!outfit) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const key = { userId_outfitId: { userId, outfitId: outfit.id } };
  const existing = await prisma.favoriteOutfit.findUnique({ where: key });
  if (existing) await prisma.favoriteOutfit.delete({ where: key });
  else await prisma.favoriteOutfit.create({ data: { userId, outfitId: outfit.id } });
  return NextResponse.json({ favorite: !existing });
});
