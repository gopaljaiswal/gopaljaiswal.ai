// Revert digital products to their real Topmate prices. They were marked
// "Free" on our site earlier, but the actual Topmate checkout still charges
// the real price — showing "Free" here was misleading. The vault Q&A content
// (served directly on our own site, not a Topmate purchase) stays open/free,
// since that one is genuinely hosted by us.
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

const realPrices = {
  "200 OS Interview Questions (MAANG-asked)": 29,
  "200 SQL Interview Questions (MAANG-asked)": 69,
  "200 Computer Networks Interview Questions": 44,
  "LLD Resources": 99,
  "System Design Resources (HLD)": 149,
  "Roadmap: Python for AI": 79,
};

async function main() {
  const { rows } = await pool.query("select data from content where key = 'services'");
  const data = rows[0].data;
  for (const product of data.digitalProducts) {
    if (realPrices[product.name] !== undefined) {
      product.price = realPrices[product.name];
    }
    delete product.originalPrice;
  }
  await pool.query(
    `update content set data = $1, updated_at = now() where key = 'services'`,
    [JSON.stringify(data)]
  );
  console.log("reverted", data.digitalProducts.length, "digital products to real prices");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
