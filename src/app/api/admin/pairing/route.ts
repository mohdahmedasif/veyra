import { NextResponse } from "next/server";
import { withAdmin } from "@/lib/api";
import { normalizePairingCode, pairingCode, sha256 } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";

const TTL_MS = 10 * 60 * 1000;

/** Issues a one-time key for pairing a new device. Only the hash is stored. */
export const POST = withAdmin(async ({ ownerId }) => {
  const code = pairingCode();
  const expiresAt = new Date(Date.now() + TTL_MS);
  await prisma.pairingCode.deleteMany({ where: { ownerId, OR: [{ usedAt: { not: null } }, { expiresAt: { lt: new Date() } }] } });
  await prisma.pairingCode.create({ data: { ownerId, codeHash: sha256(normalizePairingCode(code)), expiresAt } });
  return NextResponse.json({ code, expiresAt });
});
