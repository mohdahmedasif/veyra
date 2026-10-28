import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getCurrentUserId } from "./auth";

/** Wraps an API handler with auth + consistent error responses. */
export function withUser<A extends unknown[]>(handler: (userId: string, ...args: A) => Promise<Response>) {
  return async (...args: A) => {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    try {
      return await handler(userId, ...args);
    } catch (err) {
      if (err instanceof ZodError) return NextResponse.json({ error: err.flatten() }, { status: 400 });
      console.error(err);
      return NextResponse.json({ error: err instanceof Error ? err.message : "Server error" }, { status: 500 });
    }
  };
}
