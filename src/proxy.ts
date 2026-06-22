import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "inflatacraft2025!";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET || ADMIN_PASSWORD;
  return new TextEncoder().encode(secret + "::admin-cookie-secret");
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecretKey());
    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Allow login/logout API endpoints
  if (pathname.startsWith("/api/admin/login") || pathname.startsWith("/api/admin/logout")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  if (!token || !(await verifyToken(token))) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};