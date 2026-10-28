import { NextResponse } from "next/server";
import { withProfile } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export const DELETE = withProfile(async ({ profile }, _req: Request, { params }: { params: { id: string } }) => {
  const { count } = await prisma.outfit.deleteMany({ where: { id: params.id, profileId: profile.id } });
  return count ? new NextResponse(null, { status: 204 }) : NextResponse.json({ error: "Not found" }, { status: 404 });
});
