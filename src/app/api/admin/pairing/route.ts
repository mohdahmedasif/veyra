import { NextResponse } from "next/server";
import { ACCESS } from "@/lib/access-config";
import { withAdmin } from "@/lib/api";
import { normalizePairingCode, pairingCode, sha256 } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";

const TTL_MS = ACCESS.pairingCodeMinutes * 60_000;

/** Issues a one-time key for pairing a new device. Only the hash is stored. */
export const POST = withAdmin(async () => {
  const code = pairingCode();
  const expiresAt = new Date(Date.now() + TTL_MS);
  await prisma.pairingCode.deleteMany({ where: { OR: [{ usedAt: { not: null } }, { expiresAt: { lt: new Date() } }] } });
  await prisma.pairingCode.create({ data: { codeHash: sha256(normalizePairingCode(code)), expiresAt } });
  return NextResponse.json({ code, expiresAt });
});
