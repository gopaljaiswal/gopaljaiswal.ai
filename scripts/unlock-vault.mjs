// Drop the `locked` field entirely from every vault question — all interview
// Q&A content is now openly readable, no paywall/gating language anywhere.
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

async function main() {
  const { rows } = await pool.query("select data from content where key = 'vault'");
  const data = rows[0].data;
  for (const q of data.vaultQuestions) {
    delete q.locked;
  }
  await pool.query(
    `update content set data = $1, updated_at = now() where key = 'vault'`,
    [JSON.stringify(data)]
  );
  console.log(`unlocked ${data.vaultQuestions.length} questions`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
