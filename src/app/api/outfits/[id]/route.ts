import { NextResponse } from "next/server";
import { withUser } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export const DELETE = withUser(async (userId, _req: Request, { params }: { params: { id: string } }) => {
  const { count } = await prisma.outfit.deleteMany({ where: { id: params.id, userId } });
  return count ? new NextResponse(null, { status: 204 }) : NextResponse.json({ error: "Not found" }, { status: 404 });
});
