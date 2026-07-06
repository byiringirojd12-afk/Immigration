import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/immigration';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = databaseUrl;
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
