import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/pricing",
    "/solutions",
    "/security",
    "/contact",
    "/about",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-email",
    "/docs",
  ];

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  ) || pathname.startsWith("/docs");

  // Admin routes
  const isAdminRoute = pathname.startsWith("/admin");

  // Merchant routes (protected)
  const isMerchantRoute =
    pathname.startsWith("/transactions") ||
    pathname.startsWith("/payments") ||
    pathname.startsWith("/customers") ||
    pathname.startsWith("/settlements") ||
    pathname.startsWith("/api-keys") ||
    pathname.startsWith("/webhooks") ||
    pathname.startsWith("/analytics") ||
    pathname.startsWith("/settings");

  // Get auth token from cookies or headers
  const token = request.cookies.get("accessToken")?.value;

  // If accessing a protected route without a token, redirect to login
  if (!isPublicRoute && !token) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If accessing login/register while authenticated, redirect to dashboard
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
