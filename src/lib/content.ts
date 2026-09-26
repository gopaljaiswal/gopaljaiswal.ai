import { getPool } from "@/lib/db";

// Reads go straight to Postgres on every request — no cache layer. Traffic
// on this site is low enough that this is free performance-wise, and it
// guarantees admin edits show up immediately with zero cache-invalidation
// edge cases.

export async function getContent<T>(key: string): Promise<T | null> {
  const pool = getPool();
  const { rows } = await pool.query<{ data: T }>("select data from content where key = $1", [key]);
  return rows[0]?.data ?? null;
}

export async function setContent<T>(key: string, data: T): Promise<void> {
  const pool = getPool();
  await pool.query(
    `insert into content (key, data, updated_at) values ($1, $2, now())
     on conflict (key) do update set data = excluded.data, updated_at = now()`,
    [key, JSON.stringify(data)]
  );
}
