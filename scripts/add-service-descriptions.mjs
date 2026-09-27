// Add a one-liner description to each 1:1 service so the homepage/coaching
// cards explain what the session actually covers, not just duration + price.
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

const descriptions = {
  "Quick Chat": "A short, no-agenda call to get quick answers or point you in the right direction.",
  "1:1 Mentorship": "Ongoing guidance on your career path, skill gaps, and what to focus on next.",
  "Resume Review": "Line-by-line feedback on your resume from someone who's actually screened resumes.",
  "Mock Interview — DSA": "A real DSA interview simulation with structured feedback on your approach and communication.",
  "Mock Interview — System Design": "A full system design round — requirements, trade-offs, and the deep dive, just like the real thing.",
  "GenAI Project & Career Guidance": "Direction on building real GenAI/agentic projects and how to position them for interviews.",
  "Job Referral & Guidance": "Guidance on landing referrals at top companies and structuring your application.",
  "Crack Promotion & Move to Next Level": "A strategy session on demonstrating scope and making your case for the next level.",
};

async function main() {
  const { rows } = await pool.query("select data from content where key = 'services'");
  const data = rows[0].data;
  for (const service of data.oneOnOneServices) {
    service.description = descriptions[service.name] ?? "A focused 1:1 session tailored to what you need most right now.";
  }
  await pool.query(
    `update content set data = $1, updated_at = now() where key = 'services'`,
    [JSON.stringify(data)]
  );
  console.log("descriptions added to", data.oneOnOneServices.length, "services");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
