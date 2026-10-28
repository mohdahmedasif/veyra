import { NextResponse } from "next/server";
import { clearProfileCookie } from "@/lib/session";

export async function POST() {
  clearProfileCookie();
  return NextResponse.json({ ok: true });
}
