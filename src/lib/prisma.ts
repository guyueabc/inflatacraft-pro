import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma client.
 *
 * Prevents multiple instances during Next.js hot-reload in development.
 * In production, a fresh client is created per cold start (typical for serverless).
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
