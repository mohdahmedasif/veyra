import { NextResponse } from "next/server";
import { withUser } from "@/lib/api";
import { storeImage } from "@/lib/upload";

export const POST = withUser(async (_userId, req: Request) => {
  const file = (await req.formData()).get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  return NextResponse.json({ url: await storeImage(file) }, { status: 201 });
});
