import { PrismaClient, type Prisma } from "@prisma/client";

/**
 * Reuse one Prisma client per runtime isolate. DATABASE_URL must point to the
 * Supabase transaction/session pooler in deployed serverless environments.
 * Direct database URLs are reserved for migration tooling, never app traffic.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const logConfig: Prisma.LogLevel[] =
  process.env.NODE_ENV === "development"
    ? ["query", "warn", "error"]
    : ["warn", "error"];

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: logConfig,
  });

globalForPrisma.prisma = prisma;

export default prisma;
