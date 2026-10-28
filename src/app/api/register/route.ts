import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";

/** Creates the household admin account and its admin profile. */
export async function POST(req: Request) {
  const parsed = registerSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const { name, password, pin } = parsed.data;
  const email = parsed.data.email.toLowerCase();
  if (await prisma.user.findUnique({ where: { email } }))
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      profiles: { create: { name, isAdmin: true, pinHash: await bcrypt.hash(pin, 10) } },
    },
  });
  return NextResponse.json({ ok: true }, { status: 201 });
}
