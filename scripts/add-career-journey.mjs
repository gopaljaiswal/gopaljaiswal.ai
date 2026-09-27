// Add the real career journey (NIT Nagaland -> Reach -> Myntra -> Microsoft),
// verified against the user's LinkedIn PDF export (Profile (3).pdf, Sep 2026).
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

const careerJourney = [
  { org: "NIT Nagaland", role: "B.Tech, CSE", period: "2012 – 2016", initials: "NIT", color: "#4F46E5" },
  { org: "Reach", role: "Software Development Engineer", period: "2016 – 2018", initials: "R", color: "#F97316" },
  { org: "Reach", role: "Senior Engineer", period: "2018 – 2019", initials: "R", color: "#F97316" },
  { org: "Myntra Jabong", role: "Senior Software Engineer", period: "2019 – 2021", initials: "M", color: "#FF3F6C" },
  { org: "Microsoft", role: "SDE 2 (L61)", period: "2021 – 2023", initials: "MS", color: "#00A4EF" },
  { org: "Microsoft", role: "SDE 2 (L62)", period: "2023 – 2026", initials: "MS", color: "#00A4EF" },
  { org: "Microsoft", role: "Senior Software Engineer", period: "2026 – Present", initials: "MS", color: "#00A4EF" },
];

async function main() {
  const { rows } = await pool.query("select data from content where key = 'profile'");
  const data = rows[0].data;
  data.careerJourney = careerJourney;
  await pool.query(
    `update content set data = $1, updated_at = now() where key = 'profile'`,
    [JSON.stringify(data)]
  );
  console.log("career journey added");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
