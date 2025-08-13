// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass API and framework assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/.well-known") ||
    pathname === "/favicon.ico" ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  // Let SDK handle /auth and the home page
  if (pathname.startsWith("/auth") || pathname === "/") {
    return auth0.middleware(request);
  }

  // Protect pages
  const session = await auth0.getSession(request);
  if (!session) {
    const loginUrl = new URL("/auth/login", request.nextUrl.origin);
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return auth0.middleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
