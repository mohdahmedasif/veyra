import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { ACCESS } from "@/lib/access-config";
import { HttpError, withDevice } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { lockoutMinutes, startSession } from "@/lib/session";

/**
 * PIN unlock. The first 5 misses are free; after that each miss locks the profile for
 * 1, 5, 30, then 120 minutes. A correct PIN resets the counter.
 */
export const POST = withDevice(async (device, req: Request, { params }: { params: { id: string } }) => {
  rateLimit("unlock", ACCESS.rateLimits.unlock);
  const { pin } = z.object({ pin: z.string().max(ACCESS.pinMax) }).parse(await req.json());
  const profile = await prisma.profile.findUnique({ where: { id: params.id } });
  if (!profile) throw new HttpError(404, "Profile not found");

  const now = new Date();
  if (profile.lockedUntil && profile.lockedUntil > now) {
    const mins = Math.ceil((profile.lockedUntil.getTime() - now.getTime()) / 60_000);
    return NextResponse.json({ error: `Locked. Try again in ${mins} min — or reset the PIN with the admin key.`, code: "pin_locked" }, { status: 423 });
  }

  if (!(await bcrypt.compare(pin, profile.pinHash))) {
    const failedAttempts = profile.failedAttempts + 1;
    const mins = lockoutMinutes(failedAttempts);
    await prisma.profile.update({ where: { id: profile.id }, data: { failedAttempts, lockedUntil: mins ? new Date(now.getTime() + mins * 60_000) : null } });
    const left = ACCESS.freeAttempts - failedAttempts;
    return NextResponse.json(
      { error: mins ? `Wrong PIN. Locked for ${mins} min.` : `Wrong PIN · ${left} ${left === 1 ? "try" : "tries"} left`, code: mins ? "pin_locked" : "wrong_pin" },
      { status: mins ? 423 : 401 },
    );
  }

  await prisma.profile.update({ where: { id: profile.id }, data: { failedAttempts: 0, lockedUntil: null } });
  await startSession(profile.id, device.id);
  return NextResponse.json({ ok: true });
});
