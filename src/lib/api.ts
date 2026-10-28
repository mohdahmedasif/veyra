import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getContext, type Ctx } from "./session";

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Wraps an API handler with profile auth + consistent error responses. */
export function withProfile<A extends unknown[]>(handler: (ctx: Ctx, ...args: A) => Promise<Response>, opts: { admin?: boolean } = {}) {
  return async (...args: A) => {
    const ctx = await getContext();
    if (!ctx) return NextResponse.json({ error: "Profile locked" }, { status: 401 });
    if (opts.admin && !ctx.profile.isAdmin) return NextResponse.json({ error: "Admin only" }, { status: 403 });
    return handle(() => handler(ctx, ...args));
  };
}

export const withAdmin = <A extends unknown[]>(handler: (ctx: Ctx, ...args: A) => Promise<Response>) => withProfile(handler, { admin: true });

export async function handle(fn: () => Promise<Response>) {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof ZodError) return NextResponse.json({ error: err.issues[0]?.message ?? "Invalid input" }, { status: 400 });
    if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
