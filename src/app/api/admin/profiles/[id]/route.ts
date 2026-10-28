import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { HttpError, withAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { profileCreateSchema } from "@/lib/validators";

type P = { params: { id: string } };

async function find(ownerId: string, id: string) {
  const p = await prisma.profile.findFirst({ where: { id, ownerId } });
  if (!p) throw new HttpError(404, "Profile not found");
  return p;
}

/** Rename, recolor, reset PIN (also clears a lockout), or change admin rights. */
export const PATCH = withAdmin(async ({ ownerId, profile: me }, req: Request, { params }: P) => {
  const target = await find(ownerId, params.id);
  const { pin, ...data } = profileCreateSchema.partial().parse(await req.json());
  if (data.isAdmin === false && target.id === me.id) throw new HttpError(400, "You can't remove your own admin rights");
  const profile = await prisma.profile.update({
    where: { id: target.id },
    data: { ...data, ...(pin ? { pinHash: await bcrypt.hash(pin, 10), failedAttempts: 0, lockedUntil: null } : {}) },
    select: { id: true, name: true, avatarColor: true, isAdmin: true },
  });
  return NextResponse.json({ profile });
});

export const DELETE = withAdmin(async ({ ownerId, profile: me }, _req: Request, { params }: P) => {
  const target = await find(ownerId, params.id);
  if (target.id === me.id) throw new HttpError(400, "You can't delete the profile you're using");
  await prisma.profile.delete({ where: { id: target.id } });
  return new NextResponse(null, { status: 204 });
});
