import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

export async function getPrismaClient(): Promise<PrismaClient> {
  if (prisma) return prisma;

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined.");
  }

  prisma = new PrismaClient({
    datasources: {
      db: { url: databaseUrl },
    },
  });

  return prisma;
}
