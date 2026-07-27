// src/lib/prisma.ts
//
// The single, shared Prisma Client instance for the whole app.
// Import { prisma } from "@/lib/prisma" anywhere you need to query the database —
// never instantiate `new PrismaClient()` anywhere else. Next.js hot-reloads
// modules in dev, which would otherwise spin up a new client (and a new DB
// connection pool) on every file save — the globalThis cache below prevents that.
//
// Prisma 7 requires an explicit driver adapter — this uses the pooled
// DATABASE_URL (port 6543 on Supabase), which is correct for a serverless/
// edge-friendly runtime like Next.js on Vercel.
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}