import { NextResponse } from "next/server";
import { z } from "zod";
import { withAdmin } from "@/lib/api";
import { resolveAi } from "@/lib/ai/config";

/** Makes a tiny request with the saved key so the admin knows it works. */
export const POST = withAdmin(async (_ctx, req: Request) => {
  const { provider } = z.object({ provider: z.enum(["OPENAI", "GEMINI"]) }).parse(await req.json());
  const ai = await resolveAi(provider);
  if (!ai.complete) return NextResponse.json({ ok: false, error: "No key saved for this provider" });
  try {
    const raw = await ai.complete('Reply with JSON {"ok":true}.', "ping");
    return NextResponse.json({ ok: JSON.parse(raw).ok === true || raw.length > 0 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Request failed";
    return NextResponse.json({ ok: false, error: message.slice(0, 200) });
  }
});
