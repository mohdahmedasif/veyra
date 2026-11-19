import { defineConfig } from "prisma/config";

// Prisma 7 keeps connection URLs out of the schema: the CLI reads them here,
// and the app passes them to the PostgreSQL driver adapter (src/lib/prisma.ts).
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: { url: process.env.DATABASE_URL ?? "" },
  migrations: { seed: "tsx prisma/seed.ts" },
});
