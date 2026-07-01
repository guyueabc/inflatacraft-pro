import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// ── Configuration ──────────────────────────────────────────────────────────

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "inflatacraft2025!";

// ── In-memory rate limiter (IP-based) ──────────────────────────────────────

const MAX_ATTEMPTS = 5; // Max failed attempts per window
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minute block

interface RateLimitEntry {
  attempts: number;
  firstAttempt: number;
  blockedUntil: number | null;
}

// Simple in-memory store (resets on cold start; per-serverless-invocation in prod)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupStore() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of rateLimitStore) {
    if (entry.blockedUntil && entry.blockedUntil < now) {
      rateLimitStore.delete(key);
    } else if (!entry.blockedUntil && now - entry.firstAttempt > WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
}

function getClientIP(request: NextRequest): string {
  // Try common headers for proxied deployments (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

function checkRateLimit(ip: string): { allowed: boolean; error?: string } {
  cleanupStore();
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (entry?.blockedUntil && entry.blockedUntil > now) {
    const remainingSec = Math.ceil((entry.blockedUntil - now) / 1000);
    const remainingMin = Math.ceil(remainingSec / 60);
    return {
      allowed: false,
      error: `Too many failed attempts. Please try again in ${remainingMin} minute${remainingMin !== 1 ? "s" : ""}.`,
    };
  }

  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    // Reset window
    rateLimitStore.set(ip, { attempts: 1, firstAttempt: now, blockedUntil: null });
    return { allowed: true };
  }

  entry.attempts++;
  if (entry.attempts > MAX_ATTEMPTS) {
    entry.blockedUntil = now + BLOCK_DURATION_MS;
    return {
      allowed: false,
      error: `Too many failed attempts. Please try again in ${BLOCK_DURATION_MS / 60000} minutes.`,
    };
  }

  return { allowed: true };
}

// ── JWT helpers ────────────────────────────────────────────────────────────

function getSecretKey() {
  const secret = process.env.AUTH_SECRET || ADMIN_PASSWORD;
  return new TextEncoder().encode(secret + "::admin-cookie-secret");
}

// ── POST handler ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Rate limit check
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: rateCheck.error },
        { status: 429 }
      );
    }

    // Parse request body
    let body: { username?: string; password?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { username, password } = body;

    if (!username || !username.trim()) {
      return NextResponse.json(
        { error: "Username is required." },
        { status: 400 }
      );
    }

    if (!password || !password.trim()) {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      // Intentional delay to slow brute-force
      await new Promise((r) => setTimeout(r, 800));
      return NextResponse.json(
        { error: "Invalid username or password. Please try again." },
        { status: 401 }
      );
    }

    // Success — reset rate limit for this IP
    rateLimitStore.delete(ip);

    // Generate JWT
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
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
