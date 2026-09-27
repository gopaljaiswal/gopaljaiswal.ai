// Make digital resources + the vault temporarily free: show "Free" with the
// original price struck through, instead of the paid price.
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

async function getRow(key) {
  const { rows } = await pool.query("select data from content where key = $1", [key]);
  return rows[0]?.data;
}

async function setRow(key, data) {
  await pool.query(
    `insert into content (key, data, updated_at) values ($1, $2, now())
     on conflict (key) do update set data = excluded.data, updated_at = now()`,
    [key, JSON.stringify(data)]
  );
  console.log("updated:", key);
}

async function main() {
  const services = await getRow("services");
  for (const product of services.digitalProducts) {
    product.originalPrice = product.price;
    product.price = 0;
  }
  await setRow("services", services);

  const vault = await getRow("vault");
  vault.vaultPricing.listPrice = vault.vaultPricing.price;
  vault.vaultPricing.price = "Free";
  vault.vaultPricing.discountLabel = "Free for now — full price returns later";
  await setRow("vault", vault);

  await pool.end();
  console.log("done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
