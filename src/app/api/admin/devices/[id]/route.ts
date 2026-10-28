import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export const DELETE = withAdmin(async ({ ownerId }, _req: Request, { params }: { params: { id: string } }) => {
  const { count } = await prisma.device.updateMany({ where: { id: params.id, ownerId, revokedAt: null }, data: { revokedAt: new Date() } });
  return count ? new NextResponse(null, { status: 204 }) : NextResponse.json({ error: "Not found" }, { status: 404 });
});
