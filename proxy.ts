
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Get the token and role from cookies
  const token = request.cookies.get("auth_token")?.value;
  const userRole = request.cookies.get("user_role")?.value;

  // console.log(token, userRole);

  const isAdminRoute = pathname.startsWith("/admin");
  const isMerchantRoute = pathname.startsWith("/merchant");
  const isUserRoute = pathname.startsWith("/user");
  const isAuthPage = pathname === "/login" || pathname === "/user-login" || pathname === "/register";

  // console.log(isAdminRoute, isMerchantRoute);


  if (!token) {
    if (isAdminRoute || isMerchantRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // if (isUserRoute) {
    //   return NextResponse.redirect(new URL("/user-login", request.url));
    // }
    return NextResponse.next();
  }


  if (token && isAuthPage) {
    // Redirect them to their specific dashboard
    if (userRole === "Admin") return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    if (userRole === "Merchant") return NextResponse.redirect(new URL("/merchant/dashboard", request.url));
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  if (pathname === "/merchant") {
    if (token && userRole === "Merchant") {
      return NextResponse.redirect(new URL("/merchant/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/user") {
    if (token && userRole === "User") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/user-login", request.url));
  }


  if (token && userRole) {
    // Redirect generic "/dashboard" to specific dashboard

    // console.log(token,userRole);
    
    if (pathname === "/dashboard") {
      if (userRole === "Admin") return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      if (userRole === "Merchant") return NextResponse.redirect(new URL("/merchant/dashboard", request.url));
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }

    // console.log(isAdminRoute, userRole !== "Admin");
    // Protect Admin Routes
    if (isAdminRoute && userRole !== "Admin") {
      const target = userRole === "Merchant" ? "/merchant/dashboard" : "/user/dashboard";
      return NextResponse.redirect(new URL(target, request.url));
    }

    // console.log(isMerchantRoute && userRole !== "Merchant");
    // Protect Merchant Routes
    if (isMerchantRoute && userRole !== "Merchant") {
      const target = userRole === "Admin" ? "/admin/dashboard" : "/user/dashboard";
      return NextResponse.redirect(new URL(target, request.url));
    }
    // console.log(isUserRoute && userRole !== "User");
    // Protect User Routes
    if (isUserRoute && userRole !== "User") {
      const target = userRole === "Admin" ? "/admin/dashboard" : "/merchant/dashboard";
      return NextResponse.redirect(new URL(target, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/user-login",
    "/register",
    "/dashboard/:path*",
    "/user",
    "/user/:path*",
    "/merchant",
    "/merchant/:path*",
    "/admin",
    "/admin/:path*",
   
  ],
};