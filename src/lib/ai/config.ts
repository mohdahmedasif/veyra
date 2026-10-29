import type { AiProvider } from "@prisma/client";
import { decrypt } from "../crypto";
import { prisma } from "../prisma";
import { geminiProvider, openaiProvider, type CompleteJson } from "./providers";

export const DEFAULT_MODELS = { OPENAI: "gpt-4o-mini", GEMINI: "gemini-2.5-flash" } as const;

export interface ResolvedAi {
  provider: AiProvider;
  complete: CompleteJson | null; // null → built-in engine
}

/** Builds the household's configured provider. Saved keys win; env vars are the fallback. */
export const getHousehold = () => prisma.household.upsert({ where: { id: "household" }, create: {}, update: {} });

export async function resolveAi(override?: AiProvider): Promise<ResolvedAi> {
  const u = await getHousehold();
  const provider = override ?? u.aiProvider;
  if (provider === "OPENAI") {
    const key = decrypt(u.openaiKeyEnc) ?? process.env.OPENAI_API_KEY;
    const model = u.openaiModel || process.env.OPENAI_MODEL || DEFAULT_MODELS.OPENAI;
    return { provider, complete: key ? openaiProvider(key, model) : null };
  }
  if (provider === "GEMINI") {
    const key = decrypt(u.geminiKeyEnc) ?? process.env.GEMINI_API_KEY;
    const model = u.geminiModel || process.env.GEMINI_MODEL || DEFAULT_MODELS.GEMINI;
    return { provider, complete: key ? geminiProvider(key, model) : null };
  }
  return { provider: "ENGINE", complete: null };
}
