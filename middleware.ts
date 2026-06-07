import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/products/:path*",
    "/admin/orders/:path*",
    "/admin/messages/:path*",
    "/admin/blog/:path*",
    "/admin/gallery/:path*",
    "/admin/settings/:path*",
  ],
};
