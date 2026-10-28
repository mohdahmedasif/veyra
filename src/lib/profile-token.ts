import { jwtVerify, SignJWT } from "jose";

/** Edge-safe helpers for the signed "unlocked profile" cookie (used by middleware too). */
export const DEVICE_COOKIE = "veyra_device";
export const PROFILE_COOKIE = "veyra_profile";
export const PROFILE_TTL_SECONDS = 12 * 60 * 60;

const key = () => new TextEncoder().encode(process.env.NEXTAUTH_SECRET ?? "");

export interface ProfileClaims {
  pid: string;
  oid: string;
}

export async function signProfileToken(claims: ProfileClaims) {
  return new SignJWT({ ...claims })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${PROFILE_TTL_SECONDS}s`)
    .sign(key());
}

export async function verifyProfileToken(token: string | undefined): Promise<ProfileClaims | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key());
    return typeof payload.pid === "string" && typeof payload.oid === "string" ? { pid: payload.pid, oid: payload.oid } : null;
  } catch {
    return null;
  }
}
