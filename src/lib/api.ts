import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { getContext, getDevice, hasAdmin, type Ctx } from "./session";

export class HttpError extends Error {
  constructor(public status: number, message: string, public code?: string) {
    super(message);
  }
}

/**
 * Route guards. The client handles `unpaired` (403) by showing the pairing screen and
 * `locked` (401) by showing the profile picker.
 */
export function withProfile<A extends unknown[]>(handler: (ctx: Ctx, ...args: A) => Promise<Response>, opts: { admin?: boolean } = {}) {
  return (...args: A) =>
    handle(async () => {
      const ctx = await getContext();
      if (!ctx) {
        const paired = Boolean(await getDevice());
        return NextResponse.json(paired ? { error: "Profile locked", code: "locked" } : { error: "Device not paired", code: "unpaired" }, { status: paired ? 401 : 403 });
      }
      if (opts.admin && !hasAdmin(ctx.device.id))
        return NextResponse.json({ error: "Enter the admin key to change household settings", code: "admin" }, { status: 403 });
      return handler(ctx, ...args);
    });
}

export const withAdmin = <A extends unknown[]>(handler: (ctx: Ctx, ...args: A) => Promise<Response>) => withProfile(handler, { admin: true });

/** Device-only guard (pairing done, no profile needed): profile list, create, unlock. */
export function withDevice<A extends unknown[]>(handler: (device: NonNullable<Awaited<ReturnType<typeof getDevice>>>, ...args: A) => Promise<Response>) {
  return (...args: A) =>
    handle(async () => {
      const device = await getDevice();
      if (!device) return NextResponse.json({ error: "Device not paired", code: "unpaired" }, { status: 403 });
      return handler(device, ...args);
    });
}

export async function handle(fn: () => Promise<Response>) {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof ZodError) return NextResponse.json({ error: err.issues[0]?.message ?? "Invalid input" }, { status: 400 });
    if (err instanceof HttpError) return NextResponse.json({ error: err.message, ...(err.code ? { code: err.code } : {}) }, { status: err.status });
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
