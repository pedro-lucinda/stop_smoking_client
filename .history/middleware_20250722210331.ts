import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request)
  if (request.nextUrl.pathname.startsWith('/auth') || request.nextUrl.pathname === "/") {
    return authRes
  }

  const session = await auth0.getSession(request)
  if (!session) {
    console.log('User not authenticated, redirecting to login page')
    // user is not authenticated, redirect to login page
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl.origin))
  }

  return authRes
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
