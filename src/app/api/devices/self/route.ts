import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { handle } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { clearDeviceCookie, clearProfileCookie, getOwnerId, registerDevice, setProfileCookie } from "@/lib/session";
import { cookies } from "next/headers";
import { DEVICE_COOKIE } from "@/lib/profile-token";
import { sha256 } from "@/lib/crypto";

/**
 * Called right after the admin signs in with email + password: trusts this browser
 * as a device and unlocks the admin profile (a password is stronger than a PIN).
 */
export async function POST(req: Request) {
  return handle(async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Sign in first" }, { status: 401 });
    const ownerId = session.user.id;
    if ((await getOwnerId()) !== ownerId || !cookies().get(DEVICE_COOKIE)) {
      const { name } = (await req.json().catch(() => ({}))) as { name?: string };
      await registerDevice(ownerId, name || "Admin browser");
    }
    const admin = await prisma.profile.findFirst({ where: { ownerId, isAdmin: true }, orderBy: { createdAt: "asc" } });
    if (admin) await setProfileCookie(admin);
    return NextResponse.json({ ok: true });
  });
}

/** Unpairs this browser. */
export async function DELETE() {
  return handle(async () => {
    const token = cookies().get(DEVICE_COOKIE)?.value;
    if (token) await prisma.device.updateMany({ where: { tokenHash: sha256(token), revokedAt: null }, data: { revokedAt: new Date() } });
    clearDeviceCookie();
    clearProfileCookie();
    return NextResponse.json({ ok: true });
  });
}
