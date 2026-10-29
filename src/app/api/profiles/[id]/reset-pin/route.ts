import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { ACCESS } from "@/lib/access-config";
import { HttpError, withDevice } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { checkAdminKey, getContext, hasAdmin, startSession } from "@/lib/session";
import { pinSchema } from "@/lib/validators";

/**
 * Forgotten PIN: the admin key (or an admin-unlocked Settings) sets a new one, clears the
 * lockout and signs the profile out everywhere.
 */
export const POST = withDevice(async (device, req: Request, { params }: { params: { id: string } }) => {
  rateLimit("admin", ACCESS.rateLimits.admin);
  const { adminKey, newPin } = z.object({ adminKey: z.string().max(200).optional(), newPin: pinSchema }).parse(await req.json());
  if (!hasAdmin(device.id)) checkAdminKey(adminKey ?? "");
  const profile = await prisma.profile.findUnique({ where: { id: params.id } });
  if (!profile) throw new HttpError(404, "Profile not found");
  await prisma.$transaction([
    prisma.profile.update({ where: { id: profile.id }, data: { pinHash: await bcrypt.hash(newPin, 10), failedAttempts: 0, lockedUntil: null } }),
    prisma.profileSession.deleteMany({ where: { profileId: profile.id } }),
  ]);
  // From the picker (no one signed in here), unlock the profile on this device straight away.
  if (!(await getContext())) await startSession(profile.id, device.id);
  return NextResponse.json({ ok: true });
});
