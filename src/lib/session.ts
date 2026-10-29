import type { Device, Profile } from "@prisma/client";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS, COOKIES } from "./access-config";
import { HttpError } from "./api";
import { hmac, randomToken, sameSecret, sha256 } from "./crypto";
import { prisma } from "./prisma";

/**
 * Household access, no accounts:
 *   1. A browser is paired once with ADMIN_KEY (or a one-time pairing key) → device cookie.
 *   2. Each person unlocks their profile with a PIN → session cookie bound to that device.
 * Only SHA-256 hashes of tokens are stored, so a leaked database yields no working cookies.
 */

export interface Ctx {
  device: Device;
  profile: Profile;
  sessionId: string;
}

const DAY = 86_400_000;

export function adminKey() {
  const key = process.env.ADMIN_KEY;
  if (!key) throw new HttpError(503, "ADMIN_KEY isn't set on the server");
  return key;
}

export function checkAdminKey(candidate: string) {
  if (!sameSecret(candidate, adminKey())) throw new HttpError(403, "Wrong admin key");
}

/** Secure only over HTTPS (directly or via a proxy), so plain-http local dev still works. */
function isHttps() {
  const h = headers();
  return h.get("x-forwarded-proto") === "https" || process.env.NEXT_PUBLIC_APP_URL?.startsWith("https") === true;
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  cookies().set(name, value, { httpOnly: true, sameSite: "strict", secure: isHttps(), path: "/", maxAge: maxAgeSeconds });
}

export async function getDevice(): Promise<Device | null> {
  const token = cookies().get(COOKIES.device)?.value;
  if (!token) return null;
  const device = await prisma.device.findUnique({ where: { tokenHash: sha256(token) } });
  if (device && Date.now() - device.lastSeenAt.getTime() > 3_600_000)
    await prisma.device.update({ where: { id: device.id }, data: { lastSeenAt: new Date() } });
  return device;
}

export async function getContext(now = new Date()): Promise<Ctx | null> {
  const device = await getDevice();
  const token = cookies().get(COOKIES.session)?.value;
  if (!device || !token) return null;
  const session = await prisma.profileSession.findUnique({ where: { tokenHash: sha256(token) }, include: { profile: true } });
  // The session must belong to *this* device — a copied cookie fails elsewhere.
  if (!session || session.deviceId !== device.id || session.expiresAt <= now) return null;
  return { device, profile: session.profile, sessionId: session.id };
}

/** For server components: sends the browser to pairing or profile selection when needed. */
export async function requireProfile(): Promise<Ctx> {
  const ctx = await getContext();
  if (ctx) return ctx;
  redirect((await getDevice()) ? "/profiles" : "/pair");
}

export async function pairDevice(label: string) {
  const token = randomToken();
  const device = await prisma.device.create({ data: { label: label.slice(0, 60) || "Device", tokenHash: sha256(token) } });
  setCookie(COOKIES.device, token, ACCESS.deviceDays * 86_400);
  return device;
}

export async function startSession(profileId: string, deviceId: string, now = new Date()) {
  const token = randomToken();
  await prisma.profileSession.create({
    data: { profileId, deviceId, tokenHash: sha256(token), expiresAt: new Date(now.getTime() + ACCESS.sessionDays * DAY) },
  });
  setCookie(COOKIES.session, token, ACCESS.sessionDays * 86_400);
}

export async function endSession() {
  const token = cookies().get(COOKIES.session)?.value;
  if (token) await prisma.profileSession.deleteMany({ where: { tokenHash: sha256(token) } });
  cookies().delete(COOKIES.session);
  cookies().delete(COOKIES.admin);
}

export function clearDeviceCookies() {
  for (const c of Object.values(COOKIES)) cookies().delete(c);
}

// ---- Admin unlock (Settings → household admin). Stateless: HMAC over device id + expiry, keyed by ADMIN_KEY.

export function grantAdmin(deviceId: string, now = Date.now()) {
  const exp = now + ACCESS.adminMinutes * 60_000;
  setCookie(COOKIES.admin, `${exp}.${hmac(adminKey(), `${deviceId}.${exp}`)}`, ACCESS.adminMinutes * 60);
  return new Date(exp);
}

export function hasAdmin(deviceId: string, now = Date.now()) {
  const raw = cookies().get(COOKIES.admin)?.value;
  const key = process.env.ADMIN_KEY;
  if (!raw || !key) return false;
  const [exp, sig] = raw.split(".");
  return Number(exp) > now && Boolean(sig) && sameSecret(sig, hmac(key, `${deviceId}.${exp}`));
}

/** Minutes a profile is locked after `failedAttempts` misses (0 = not locked). */
export function lockoutMinutes(failedAttempts: number) {
  const over = failedAttempts - ACCESS.freeAttempts;
  if (over < 0) return 0;
  return ACCESS.lockoutMinutes[Math.min(over, ACCESS.lockoutMinutes.length - 1)];
}
