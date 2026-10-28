import { NextResponse } from "next/server";
import { z } from "zod";
import { withUser } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1).max(80).optional(),
  stylePreferences: z.array(z.string().min(1).max(30)).max(10).optional(),
});

export const PATCH = withUser(async (userId, req: Request) => {
  const data = schema.parse(await req.json());
  const user = await prisma.user.update({ where: { id: userId }, data, select: { name: true, stylePreferences: true } });
  return NextResponse.json({ user });
});
