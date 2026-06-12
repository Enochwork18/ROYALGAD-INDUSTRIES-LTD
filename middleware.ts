import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "fallback-secret");

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value
    || req.cookies.get("__Secure-next-auth.session-token")?.value
    || req.cookies.get("authjs.session-token")?.value
    || req.cookies.get("__Secure-authjs.session-token")?.value;

  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { jwtVerify } = await import("jose");
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "ADMIN") {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/admin",
    "/admin/products/:path*",
    "/admin/orders/:path*",
    "/admin/messages/:path*",
    "/admin/blog/:path*",
    "/admin/gallery/:path*",
    "/admin/settings/:path*",
  ],
};
