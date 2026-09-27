// Drop the rating clause from the tagline sentence — it now gets its own
// dedicated, more attractive rating badge in the hero instead of being buried
// in prose.
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

async function main() {
  const { rows } = await pool.query("select data from content where key = 'profile'");
  const data = rows[0].data;
  data.profile.tagline = "1:1 coaching and mock interviews from a Senior SWE at Microsoft.";
  await pool.query(
    `update content set data = $1, updated_at = now() where key = 'profile'`,
    [JSON.stringify(data)]
  );
  console.log("tagline trimmed");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
