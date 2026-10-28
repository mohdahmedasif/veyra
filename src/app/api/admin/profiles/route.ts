import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { profileCreateSchema } from "@/lib/validators";

export const POST = withAdmin(async ({ ownerId }, req: Request) => {
  const { pin, ...data } = profileCreateSchema.parse(await req.json());
  if ((await prisma.profile.count({ where: { ownerId } })) >= 8)
    return NextResponse.json({ error: "A household can have up to 8 profiles" }, { status: 400 });
  const profile = await prisma.profile.create({
    data: { ...data, ownerId, pinHash: await bcrypt.hash(pin, 10) },
    select: { id: true, name: true, avatarColor: true, isAdmin: true },
  });
  return NextResponse.json({ profile }, { status: 201 });
});
