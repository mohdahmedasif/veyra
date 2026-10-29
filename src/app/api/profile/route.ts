import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { HttpError, withProfile } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { pinSchema } from "@/lib/validators";

const schema = z.object({
  name: z.string().trim().min(1).max(40).optional(),
  avatarColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  stylePreferences: z.array(z.string().min(1).max(30)).max(10).optional(),
  currentPin: z.string().optional(),
  newPin: pinSchema.optional(),
});

/** The unlocked profile edits itself. Changing the PIN requires the current PIN and signs out its other devices. */
export const PATCH = withProfile(async ({ profile, sessionId }, req: Request) => {
  const { currentPin, newPin, ...data } = schema.parse(await req.json());
  let pinHash: string | undefined;
  if (newPin) {
    if (!currentPin || !(await bcrypt.compare(currentPin, profile.pinHash))) throw new HttpError(400, "Current PIN is incorrect");
    pinHash = await bcrypt.hash(newPin, 10);
  }
  if (data.name && data.name !== profile.name && (await prisma.profile.findUnique({ where: { name: data.name } }))) throw new HttpError(409, "That name is taken");
  if (pinHash) await prisma.profileSession.deleteMany({ where: { profileId: profile.id, id: { not: sessionId } } });
  const updated = await prisma.profile.update({
    where: { id: profile.id },
    data: { ...data, ...(pinHash ? { pinHash } : {}) },
    select: { name: true, avatarColor: true, stylePreferences: true },
  });
  return NextResponse.json({ profile: updated });
});
