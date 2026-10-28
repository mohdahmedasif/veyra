export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/wardrobe/:path*", "/outfits/:path*", "/ai/:path*", "/favorites/:path*", "/settings/:path*"],
};
