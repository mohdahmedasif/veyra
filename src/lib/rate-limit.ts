import { headers } from "next/headers";
import { HttpError } from "./api";

/**
 * In-memory sliding window per IP. Resets on restart and isn't shared across instances —
 * fine for a single household server. Behind a reverse proxy, set TRUST_PROXY=1 so the
 * client IP comes from X-Forwarded-For (otherwise everyone shares the proxy's bucket).
 */
const hits = new Map<string, number[]>();

export function clientIp() {
  const h = headers();
  if (process.env.TRUST_PROXY === "1") {
    const fwd = h.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (fwd) return fwd;
  }
  return h.get("x-real-ip") ?? "local";
}

export function rateLimit(bucket: string, limit: { max: number; windowMs: number }, now = Date.now()) {
  const key = `${bucket}:${clientIp()}`;
  const recent = (hits.get(key) ?? []).filter((t) => now - t < limit.windowMs);
  if (recent.length >= limit.max) {
    const retry = Math.ceil((limit.windowMs - (now - recent[0])) / 1000);
    throw new HttpError(429, `Too many attempts. Try again in ${Math.ceil(retry / 60)} min.`);
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // crude memory cap
}
