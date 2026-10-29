import { NextResponse } from "next/server";
import { HttpError, withAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { profileCreateSchema } from "@/lib/validators";

type P = { params: { id: string } };

/** Rename or recolor a profile. PIN resets go through /api/profiles/:id/reset-pin. */
export const PATCH = withAdmin(async (_ctx, req: Request, { params }: P) => {
  const data = profileCreateSchema.omit({ pin: true }).partial().parse(await req.json());
  const { count } = await prisma.profile.updateMany({ where: { id: params.id }, data });
  if (!count) throw new HttpError(404, "Profile not found");
  return NextResponse.json({ ok: true });
});

export const DELETE = withAdmin(async ({ profile: me }, _req: Request, { params }: P) => {
  if (params.id === me.id) throw new HttpError(400, "You can't delete the profile you're using");
  const { count } = await prisma.profile.deleteMany({ where: { id: params.id } });
  return count ? new NextResponse(null, { status: 204 }) : NextResponse.json({ error: "Not found" }, { status: 404 });
});
