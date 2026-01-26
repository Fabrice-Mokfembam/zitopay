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
    "/verify-email-code",
    "/email-verified",
    "/onboarding",
    "/docs",
  ];

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  ) || pathname.startsWith("/docs");

  // Admin routes
  const isAdminRoute = pathname.startsWith("/admin");

  // Dashboard routes (client-side protected)
  const isDashboardRoute = pathname.startsWith("/dashboard");

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

  // For dashboard and admin routes, allow them to load even without cookie
  // This prevents race conditions on page refresh where cookie might not be set yet
  // but localStorage still has valid tokens. Client-side layouts will handle auth validation.
  // For other protected routes, we still check for token
  const isClientProtectedRoute = isDashboardRoute || isAdminRoute;
  
  if (!isPublicRoute && !token && !isClientProtectedRoute) {
    // For non-dashboard/admin protected routes, redirect if no token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If accessing login/register while authenticated (cookie exists), redirect to dashboard
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If accessing marketing pages while authenticated (cookie exists), redirect to dashboard
  if (token && (
    pathname === "/" ||
    pathname.startsWith("/solutions") ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/security")
  )) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
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
