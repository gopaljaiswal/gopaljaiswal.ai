// Update the sessions/bookings count shown in the rating badge and testimonials page.
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

async function main() {
  const { rows } = await pool.query("select data from content where key = 'testimonials'");
  const data = rows[0].data;
  data.ratingSummary.bookings = "300+ sessions";
  await pool.query(
    `update content set data = $1, updated_at = now() where key = 'testimonials'`,
    [JSON.stringify(data)]
  );
  console.log("bookings updated to 300+ sessions");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
