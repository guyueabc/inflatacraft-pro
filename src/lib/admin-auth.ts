import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getSecretKey(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET;
  return secret
    ? new TextEncoder().encode(`${secret}::admin-cookie-secret`)
    : null;
}

/**
 * Enforce admin authentication inside sensitive Route Handlers.
 *
 * Proxy remains a fast outer gate, but Route Handlers must not rely on Proxy as
 * their only authorization boundary. Return the response immediately when this
 * function returns a value; `null` means the signed admin session is valid.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const secretKey = getSecretKey();
  if (!secretKey) {
    return NextResponse.json(
      { error: "Admin authentication is not configured." },
      { status: 503 },
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return null;
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
