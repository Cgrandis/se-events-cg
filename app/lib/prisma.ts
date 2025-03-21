import { PrismaClient } from "@prisma/client";
import { get } from "@vercel/edge-config";

let prisma: PrismaClient | null = null;

export async function getPrismaClient(): Promise<PrismaClient> {
  if (prisma) return prisma;

  const databaseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.DATABASE_URL
      : await get<string>("DATABASE_URL");

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
