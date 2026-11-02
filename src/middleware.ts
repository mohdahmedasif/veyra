import { NextResponse, type NextRequest } from "next/server";
import { COOKIES } from "@/lib/access-config";

/**
 * Fast edge gate on cookie presence only: no device → pairing, no session → profile picker.
 * The real checks (token hashes, device binding, expiry) run server-side in getContext().
 */
/**
 * Behind a reverse proxy the request URL is the internal address (localhost:3000), so build
 * redirects from the public host and protocol the proxy forwards.
 */
function publicBase(req: NextRequest) {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? req.nextUrl.host;
  const proto = req.headers.get("x-forwarded-proto") ?? req.nextUrl.protocol.replace(":", "");
  return `${proto}://${host}`;
}

export function middleware(req: NextRequest) {
  const to = (path: string) => {
    const url = new URL(path, publicBase(req));
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  };
  if (!req.cookies.get(COOKIES.device)) return to("/pair");
  if (req.nextUrl.pathname.startsWith("/profiles")) return NextResponse.next();
  if (!req.cookies.get(COOKIES.session)) return to("/profiles");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/wardrobe/:path*", "/outfits/:path*", "/ai/:path*", "/combos/:path*", "/favorites/:path*", "/settings/:path*", "/profiles/:path*"],
};
