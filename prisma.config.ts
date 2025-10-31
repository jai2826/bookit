import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: `ts-node --require dotenv/config prisma/promo-seed.ts`,
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
