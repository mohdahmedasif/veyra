import { NextResponse } from "next/server";
import { z } from "zod";
import { ACCESS } from "@/lib/access-config";
import { handle, HttpError } from "@/lib/api";
import { normalizePairingCode, sameSecret, sha256 } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { adminKey, pairDevice } from "@/lib/session";

const schema = z.object({ key: z.string().trim().min(4).max(200), label: z.string().trim().min(1).max(60) });

/** Pairs this browser using the household ADMIN_KEY or a single-use pairing key. */
export async function POST(req: Request) {
  return handle(async () => {
    rateLimit("pair", ACCESS.rateLimits.pair);
    const { key, label } = schema.parse(await req.json());
    const admin = adminKey(); // 503 when not configured

    if (!sameSecret(key, admin)) {
      const pairing = await prisma.pairingCode.findUnique({ where: { codeHash: sha256(normalizePairingCode(key)) } });
      // updateMany with usedAt: null makes redemption atomic — a code works once.
      const claimed = pairing
        ? await prisma.pairingCode.updateMany({ where: { id: pairing.id, usedAt: null, expiresAt: { gt: new Date() } }, data: { usedAt: new Date() } })
        : { count: 0 };
      if (!claimed.count) throw new HttpError(403, "That key didn't work");
    }
    await pairDevice(label);
    return NextResponse.json({ ok: true });
  });
}
