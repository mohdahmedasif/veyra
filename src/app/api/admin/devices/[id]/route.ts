import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";

/** Revokes a device; its sessions are deleted with it. */
export const DELETE = withAdmin(async (_ctx, _req: Request, { params }: { params: { id: string } }) => {
  const { count } = await prisma.device.deleteMany({ where: { id: params.id } });
  return count ? new NextResponse(null, { status: 204 }) : NextResponse.json({ error: "Not found" }, { status: 404 });
});
