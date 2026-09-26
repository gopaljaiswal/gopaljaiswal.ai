import { Pool } from "pg";

declare global {
  var _pgPool: Pool | undefined;
}

export function getPool() {
  if (!global._pgPool) {
    global._pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "")
        ? { rejectUnauthorized: false }
        : undefined,
      max: 5,
    });
  }
  return global._pgPool;
}
