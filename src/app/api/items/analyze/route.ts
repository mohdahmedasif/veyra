import { NextResponse } from "next/server";
import { withProfile } from "@/lib/api";
import { resolveAi } from "@/lib/ai/config";
import { detectItem } from "@/lib/ai/vision";
import { storeImage } from "@/lib/upload";

/** Uploads a clothing photo and, when an AI provider is set up, auto-detects its tags. */
export const POST = withProfile(async (_ctx, req: Request) => {
  const file = (await req.formData()).get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No photo provided" }, { status: 400 });
  const [url, ai] = await Promise.all([storeImage(file), resolveAi()]);
  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  const detected = await detectItem(ai, { mime: file.type, base64 });
  return NextResponse.json({ url, detected, provider: detected ? ai.provider : null }, { status: 201 });
});
