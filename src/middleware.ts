import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { DEVICE_COOKIE, PROFILE_COOKIE, verifyProfileToken } from "@/lib/profile-token";

/**
 * Fast edge gate: a paired device (or admin session) is needed to see profiles, and an
 * unlocked profile is needed for the app. Device revocation is enforced server-side.
 */
export async function middleware(req: NextRequest) {
  const hasDevice = Boolean(req.cookies.get(DEVICE_COOKIE)) || Boolean(await getToken({ req }));
  const to = (path: string) => {
    const url = new URL(path, req.url);
    if (path === "/pair" || path === "/profiles") url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  };

  if (req.nextUrl.pathname.startsWith("/profiles")) return hasDevice ? NextResponse.next() : to("/pair");
  if (!hasDevice) return to("/pair");
  if (!(await verifyProfileToken(req.cookies.get(PROFILE_COOKIE)?.value))) return to("/profiles");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/wardrobe/:path*", "/outfits/:path*", "/ai/:path*", "/combos/:path*", "/favorites/:path*", "/settings/:path*", "/profiles/:path*"],
};
