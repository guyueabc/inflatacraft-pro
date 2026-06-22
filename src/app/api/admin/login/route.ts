import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "inflatacraft2025!";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET || ADMIN_PASSWORD;
  return new TextEncoder().encode(secret + "::admin-cookie-secret");
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      await new Promise((r) => setTimeout(r, 800));
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(getSecretKey());

    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}