import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma client — serverless-optimized connection pool.
 *
 * In development: reuses client across hot-reloads.
 * In production (Vercel serverless): fresh client per invocation with PgBouncer-ready config.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const logConfig =
  process.env.NODE_ENV === "development"
    ? (["query", "warn", "error"] as const)
    : (["warn", "error"] as const);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: logConfig,
    datasources: {
      db: {
        url: process.env.DIRECT_URL || process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;