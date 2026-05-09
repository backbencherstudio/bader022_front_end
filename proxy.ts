import { NextRequest, NextResponse } from "next/server";

const getDashboardPath = (role?: string) => {
  if (role === "Admin") return "/admin/dashboard";
  if (role === "Merchant") return "/merchant/dashboard";
  if (role === "User") return "/user/dashboard";
  return null;
};

const getRoleBasePath = (role?: string) => {
  if (role === "Admin") return "/admin";
  if (role === "Merchant") return "/merchant";
  if (role === "User") return "/user";
  return null;
};

const startsWithRoute = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get the token and role from cookies
  const token = request.cookies.get("auth_token")?.value;
  const userRole = request.cookies.get("user_role")?.value;

  const isAdminRoute = startsWithRoute(pathname, "/admin");
  const isMerchantRoute = startsWithRoute(pathname, "/merchant");
  const isUserRoute = startsWithRoute(pathname, "/user");
  const isDashboardRoute = startsWithRoute(pathname, "/dashboard");
  const isProtectedRoute =
    isAdminRoute || isMerchantRoute || isUserRoute || isDashboardRoute;
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/user-login" ||
    pathname === "/register";

  if (!token && isProtectedRoute) {
    const loginPath = isUserRoute ? "/user-login" : "/login";
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  if (token) {
    const dashboardPath = getDashboardPath(userRole);
    const roleBasePath = getRoleBasePath(userRole);
    const isOwnRoute = roleBasePath
      ? startsWithRoute(pathname, roleBasePath)
      : false;

    if (dashboardPath && (isAuthPage || isProtectedRoute)) {
      if (isAuthPage || isDashboardRoute || pathname === roleBasePath) {
        return NextResponse.redirect(new URL(dashboardPath, request.url));
      }

      if (isOwnRoute) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/user-login",
    "/register",
    "/dashboard",
    "/dashboard/:path*",
    "/user",
    "/user/:path*",
    "/merchant",
    "/merchant/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
