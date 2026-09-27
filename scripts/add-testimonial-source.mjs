// Backfill the new `source` field (topmate | propeers) on every existing
// testimonial, so cards can be color-coded by platform.
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

async function main() {
  const { rows } = await pool.query("select data from content where key = 'testimonials'");
  const data = rows[0].data;

  for (const t of data.testimonials) {
    t.source = t.id === "t50" ? "propeers" : "topmate";
  }
  const t50 = data.testimonials.find((t) => t.id === "t50");
  if (t50) t50.sessionTopic = "mentorship call";

  await pool.query(
    `update content set data = $1, updated_at = now() where key = 'testimonials'`,
    [JSON.stringify(data)]
  );
  console.log(`backfilled source on ${data.testimonials.length} testimonials`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
