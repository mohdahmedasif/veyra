import { NextResponse } from "next/server";
import { handle } from "@/lib/api";
import { getContext, getDevice, hasAdmin } from "@/lib/session";

/** Tells the client which screen to show: pairing, profile picker, or the app. */
export const GET = () =>
  handle(async () => {
    const device = await getDevice();
    const ctx = device ? await getContext() : null;
    return NextResponse.json({
      paired: Boolean(device),
      profile: ctx ? { id: ctx.profile.id, name: ctx.profile.name, avatarColor: ctx.profile.avatarColor } : null,
      admin: device ? hasAdmin(device.id) : false,
      adminKeyConfigured: Boolean(process.env.ADMIN_KEY),
    });
  });
