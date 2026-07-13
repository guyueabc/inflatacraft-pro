import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET is required");
  }
  return new TextEncoder().encode(secret + "::admin-cookie-secret");
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login endpoint and page must remain public.
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/logout")
  ) {
    return NextResponse.next();
  }

  // Quote creation and analytics collection remain public, but their read
  // endpoints expose lead or aggregate traffic data and require admin auth.
  const isProtectedApi =
    pathname.startsWith("/api/ads") ||
    pathname.startsWith("/api/orders") ||
    pathname.startsWith("/api/quotes") ||
    pathname.startsWith("/api/upload") ||
    (pathname.startsWith("/api/products") && request.method !== "GET") ||
    (request.method === "GET" &&
      (pathname.startsWith("/api/analytics/partial-lead") ||
        pathname.startsWith("/api/analytics/traffic") ||
        pathname === "/api/quote" ||
        pathname.startsWith("/api/submit-quote") ||
        (pathname.startsWith("/api/analytics/track") &&
          request.nextUrl.searchParams.has("stats"))));

  if (!pathname.startsWith("/admin") && !isProtectedApi) {
    return NextResponse.next();
  }

  if (!process.env.AUTH_SECRET) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Admin authentication is not configured." },
        { status: 503 },
      );
    }
    return new NextResponse("Service Unavailable", { status: 503 });
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
  matcher: [
    "/admin/:path*",
    "/api/analytics/partial-lead/:path*",
    "/api/analytics/track/:path*",
    "/api/analytics/traffic/:path*",
    "/api/ads/:path*",
    "/api/products/:path*",
    "/api/orders/:path*",
    "/api/quote",
    "/api/quotes/:path*",
    "/api/submit-quote/:path*",
    "/api/upload/:path*",
  ],
};