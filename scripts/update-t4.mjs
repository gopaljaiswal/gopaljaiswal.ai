// Replace t4's truncated quote with the fuller version from the pinned Topmate review.
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

const fullerQuote =
  "He helped me refine my resume in a very clear and structured way, pointing out even the smallest improvements that make a big difference. He also explained how to effectively apply to companies, build visibility, and increase the chances of getting shortlisted. Our discussion on AI and its role in shaping future opportunities was truly eye-opening and motivating. I really appreciate his patience, expertise, and genuine willingness to help. It was an extremely valuable mentorship experience, and I would highly recommend him to anyone looking for career guidance!";

async function main() {
  const { rows } = await pool.query("select data from content where key = 'testimonials'");
  const data = rows[0].data;
  const t4 = data.testimonials.find((t) => t.id === "t4");
  if (!t4) throw new Error("t4 not found");
  t4.quote = fullerQuote;
  await pool.query(
    `update content set data = $1, updated_at = now() where key = 'testimonials'`,
    [JSON.stringify(data)]
  );
  console.log("t4 updated");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
