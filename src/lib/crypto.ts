import { createCipheriv, createDecipheriv, createHash, createHmac, hkdfSync, randomBytes, timingSafeEqual } from "crypto";

function secret() {
  const s = process.env.ENCRYPTION_KEY || process.env.ADMIN_KEY;
  if (!s) throw new Error("ENCRYPTION_KEY or ADMIN_KEY must be set");
  return s;
}

/** Constant-time string comparison (compares digests so lengths don't leak). */
export function sameSecret(a: string, b: string) {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

export const hmac = (key: string, data: string) => createHmac("sha256", key).update(data).digest("base64url");

const key = () => Buffer.from(hkdfSync("sha256", secret(), "veyra", "ai-keys", 32));

/** AES-256-GCM. Output: base64(iv | tag | ciphertext). */
export function encrypt(plain: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const ct = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), ct]).toString("base64");
}

export function decrypt(payload: string | null | undefined) {
  if (!payload) return null;
  try {
    const buf = Buffer.from(payload, "base64");
    const decipher = createDecipheriv("aes-256-gcm", key(), buf.subarray(0, 12));
    decipher.setAuthTag(buf.subarray(12, 28));
    return Buffer.concat([decipher.update(buf.subarray(28)), decipher.final()]).toString("utf8");
  } catch {
    return null; // secret rotated or data corrupted
  }
}

export const mask = (plain: string | null) => (plain ? `••••${plain.slice(-4)}` : null);

export const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

export const randomToken = () => randomBytes(32).toString("base64url");

const PAIR_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** 8-char human-friendly code, formatted XXXX-XXXX. */
export function pairingCode() {
  const bytes = randomBytes(8);
  const chars = Array.from(bytes, (b) => PAIR_ALPHABET[b % PAIR_ALPHABET.length]).join("");
  return `${chars.slice(0, 4)}-${chars.slice(4)}`;
}

export const normalizePairingCode = (code: string) => code.toUpperCase().replace(/[^A-Z0-9]/g, "");
