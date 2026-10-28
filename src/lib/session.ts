import type { Profile } from "@prisma/client";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "./auth";
import { randomToken, sha256 } from "./crypto";
import { prisma } from "./prisma";
import { DEVICE_COOKIE, PROFILE_COOKIE, PROFILE_TTL_SECONDS, signProfileToken, verifyProfileToken } from "./profile-token";

const secure = process.env.NODE_ENV === "production";
const DEVICE_TTL_SECONDS = 365 * 24 * 60 * 60;

export interface Ctx {
  ownerId: string;
  profile: Profile;
}

/** Household owner for this browser: a paired device, else the admin's NextAuth session. */
export async function getOwnerId(): Promise<string | null> {
  const token = cookies().get(DEVICE_COOKIE)?.value;
  if (token) {
    const device = await prisma.device.findUnique({ where: { tokenHash: sha256(token) } });
    if (device && !device.revokedAt) {
      if (Date.now() - device.lastSeenAt.getTime() > 60 * 60 * 1000)
        await prisma.device.update({ where: { id: device.id }, data: { lastSeenAt: new Date() } });
      return device.ownerId;
    }
  }
  const session = await getServerSession(authOptions);
  return session?.user?.id ?? null;
}

export async function getContext(): Promise<Ctx | null> {
  const ownerId = await getOwnerId();
  if (!ownerId) return null;
  const claims = await verifyProfileToken(cookies().get(PROFILE_COOKIE)?.value);
  if (!claims || claims.oid !== ownerId) return null;
  const profile = await prisma.profile.findFirst({ where: { id: claims.pid, ownerId } });
  return profile ? { ownerId, profile } : null;
}

/** For server components: sends the browser to pairing or profile selection when needed. */
export async function requireProfile(): Promise<Ctx> {
  const ctx = await getContext();
  if (ctx) return ctx;
  redirect((await getOwnerId()) ? "/profiles" : "/pair");
}

export async function requireAdmin(): Promise<Ctx> {
  const ctx = await requireProfile();
  if (!ctx.profile.isAdmin) redirect("/settings");
  return ctx;
}

export async function registerDevice(ownerId: string, name: string) {
  const token = randomToken();
  const device = await prisma.device.create({ data: { ownerId, name: name.slice(0, 60) || "Device", tokenHash: sha256(token) } });
  cookies().set(DEVICE_COOKIE, token, { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: DEVICE_TTL_SECONDS });
  return device;
}

export async function setProfileCookie(profile: Pick<Profile, "id" | "ownerId">) {
  const token = await signProfileToken({ pid: profile.id, oid: profile.ownerId });
  cookies().set(PROFILE_COOKIE, token, { httpOnly: true, sameSite: "lax", secure, path: "/", maxAge: PROFILE_TTL_SECONDS });
}

export function clearProfileCookie() {
  cookies().delete(PROFILE_COOKIE);
}

export function clearDeviceCookie() {
  cookies().delete(DEVICE_COOKIE);
}
