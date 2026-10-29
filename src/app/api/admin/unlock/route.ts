import { NextResponse } from "next/server";
import { z } from "zod";
import { ACCESS } from "@/lib/access-config";
import { withProfile } from "@/lib/api";
import { rateLimit } from "@/lib/rate-limit";
import { checkAdminKey, grantAdmin } from "@/lib/session";

/** Unlocks household settings on this device for a few minutes. */
export const POST = withProfile(async ({ device }, req: Request) => {
  rateLimit("admin", ACCESS.rateLimits.admin);
  const { adminKey } = z.object({ adminKey: z.string().max(200) }).parse(await req.json());
  checkAdminKey(adminKey);
  return NextResponse.json({ expiresAt: grantAdmin(device.id) });
});
