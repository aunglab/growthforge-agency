import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionToken
} from "@/lib/server/admin-auth";

const adminLoginPath = "/admin/login";
const adminApiLoginPath = "/api/admin/login";

function unauthorizedApiResponse() {
  return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const session = sessionToken ? await verifyAdminSessionToken(sessionToken) : null;
  const isAuthenticated = Boolean(session);

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginPage = pathname === adminLoginPath;
  const isLoginApi = pathname === adminApiLoginPath;

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  if (isAuthenticated) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return unauthorizedApiResponse();
  }

  const loginUrl = new URL(adminLoginPath, request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
