// Move the company-name laundry list out of the H1 (now shown as a visual
// "Aiming for" badge strip under the headline instead) and tighten the copy.
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

async function main() {
  const { rows } = await pool.query("select data from content where key = 'profile'");
  const data = rows[0].data;
  data.profile.headline = "Preparing for a product-based company? You're at the right place.";
  await pool.query(
    `update content set data = $1, updated_at = now() where key = 'profile'`,
    [JSON.stringify(data)]
  );
  console.log("headline updated");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
