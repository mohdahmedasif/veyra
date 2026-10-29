import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { withAdmin } from "@/lib/api";
import { DEFAULT_MODELS, getHousehold } from "@/lib/ai/config";
import { decrypt, encrypt, mask } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";
import { aiSettingsSchema } from "@/lib/validators";

async function view() {
  const u = await getHousehold();
  return {
    provider: u.aiProvider,
    gemini: { key: mask(decrypt(u.geminiKeyEnc)), model: u.geminiModel || DEFAULT_MODELS.GEMINI, envFallback: Boolean(process.env.GEMINI_API_KEY) },
    openai: { key: mask(decrypt(u.openaiKeyEnc)), model: u.openaiModel || DEFAULT_MODELS.OPENAI, envFallback: Boolean(process.env.OPENAI_API_KEY) },
  };
}

export const GET = withAdmin(async () => NextResponse.json(await view()));

/** Keys are encrypted at rest and never returned — only a masked hint. */
export const PATCH = withAdmin(async (_ctx, req: Request) => {
  const body = aiSettingsSchema.parse(await req.json());
  const data: Prisma.HouseholdUpdateInput = {};
  if (body.provider) data.aiProvider = body.provider;
  if (body.geminiKey !== undefined) data.geminiKeyEnc = body.geminiKey ? encrypt(body.geminiKey) : null;
  if (body.openaiKey !== undefined) data.openaiKeyEnc = body.openaiKey ? encrypt(body.openaiKey) : null;
  if (body.geminiModel !== undefined) data.geminiModel = body.geminiModel || null;
  if (body.openaiModel !== undefined) data.openaiModel = body.openaiModel || null;
  await prisma.household.update({ where: { id: "household" }, data });
  return NextResponse.json(await view());
});
