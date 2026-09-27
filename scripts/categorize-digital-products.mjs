// Add a `category` field to each digital product so the new Tech Interview
// Guide page (/guide) can group them instead of showing one flat list.
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

const categories = {
  "200 OS Interview Questions (MAANG-asked)": "Interview Question Banks",
  "200 SQL Interview Questions (MAANG-asked)": "Interview Question Banks",
  "200 Computer Networks Interview Questions": "Interview Question Banks",
  "LLD Resources": "System Design Resources",
  "System Design Resources (HLD)": "System Design Resources",
  "Roadmap: Python for AI": "Career Roadmaps",
};

async function main() {
  const { rows } = await pool.query("select data from content where key = 'services'");
  const data = rows[0].data;
  for (const product of data.digitalProducts) {
    product.category = categories[product.name] ?? "Resources";
  }
  await pool.query(
    `update content set data = $1, updated_at = now() where key = 'services'`,
    [JSON.stringify(data)]
  );
  console.log("categorized", data.digitalProducts.length, "digital products");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
