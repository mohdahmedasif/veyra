import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { HttpError, withDevice } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { startSession } from "@/lib/session";
import { profileCreateSchema } from "@/lib/validators";

const MAX_PROFILES = 12;

export const GET = withDevice(async () => {
  const profiles = await prisma.profile.findMany({ orderBy: { createdAt: "asc" }, select: { id: true, name: true, avatarColor: true } });
  return NextResponse.json({ profiles });
});

/** Any paired device can add a profile; it's unlocked straight away. */
export const POST = withDevice(async (device, req: Request) => {
  const { pin, ...data } = profileCreateSchema.parse(await req.json());
  if ((await prisma.profile.count()) >= MAX_PROFILES) throw new HttpError(400, `A household can have up to ${MAX_PROFILES} profiles`);
  if (await prisma.profile.findUnique({ where: { name: data.name } })) throw new HttpError(409, "That name is taken");
  const profile = await prisma.profile.create({ data: { ...data, pinHash: await bcrypt.hash(pin, 10) } });
  await startSession(profile.id, device.id);
  return NextResponse.json({ profile: { id: profile.id, name: profile.name } }, { status: 201 });
});
