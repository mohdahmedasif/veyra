import { NextResponse } from "next/server";
import { handle } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { clearDeviceCookies, getDevice } from "@/lib/session";

/** Unpairs this browser (its sessions go with it via ON DELETE CASCADE). */
export const DELETE = () =>
  handle(async () => {
    const device = await getDevice();
    if (device) await prisma.device.delete({ where: { id: device.id } });
    clearDeviceCookies();
    return NextResponse.json({ ok: true });
  });
