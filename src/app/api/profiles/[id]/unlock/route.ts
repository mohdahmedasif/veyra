import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { handle } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { getOwnerId, setProfileCookie } from "@/lib/session";

const MAX_ATTEMPTS = 5;
const LOCK_MS = 5 * 60 * 1000;

export async function POST(req: Request, { params }: { params: { id: string } }) {
  return handle(async () => {
    const ownerId = await getOwnerId();
    if (!ownerId) return NextResponse.json({ error: "This device isn't paired" }, { status: 401 });
    const { pin } = z.object({ pin: z.string().max(6) }).parse(await req.json());
    const profile = await prisma.profile.findFirst({ where: { id: params.id, ownerId } });
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    if (profile.lockedUntil && profile.lockedUntil > new Date()) {
      const seconds = Math.ceil((profile.lockedUntil.getTime() - Date.now()) / 1000);
      return NextResponse.json({ error: `Too many attempts. Try again in ${Math.ceil(seconds / 60)} min.`, lockedFor: seconds }, { status: 423 });
    }

    if (!(await bcrypt.compare(pin, profile.pinHash))) {
      const attempts = profile.failedAttempts + 1;
      const locked = attempts >= MAX_ATTEMPTS;
      await prisma.profile.update({
        where: { id: profile.id },
        data: locked ? { failedAttempts: 0, lockedUntil: new Date(Date.now() + LOCK_MS) } : { failedAttempts: attempts },
      });
      return NextResponse.json(
        { error: locked ? "Too many attempts. Locked for 5 minutes." : `Wrong PIN · ${MAX_ATTEMPTS - attempts} tries left` },
        { status: locked ? 423 : 401 },
      );
    }

    await prisma.profile.update({ where: { id: profile.id }, data: { failedAttempts: 0, lockedUntil: null } });
    await setProfileCookie(profile);
    return NextResponse.json({ ok: true });
  });
}
