// Reposition copy: stop implying mentees literally moved from service-based
// companies to product-based ones (not an accurate blanket claim); instead
// speak directly to who the coaching is for (MAANG/Nvidia/Microsoft/product
// companies). Also adds skill tags (Agentic AI, Azure, A/B Testing) and fixes
// a stray double-encoded em-dash/star in the bio/tagline from an earlier run.
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
  const profileContent = await getRow("profile");
  profileContent.profile.headline =
    "Preparing for MAANG, Nvidia, Microsoft, or product-based companies? You're at the right place.";
  profileContent.profile.tags = ["Agentic AI", "AI/LLMs", "Azure", "A/B Testing"];
  profileContent.profile.bio =
    "I'm a Senior Software Engineer at Microsoft with 10 years of experience building scalable backend systems — most recently leading an AI-powered agent platform (MCP, LangChain, Azure AI Foundry) that cut partner onboarding time by 92%. Outside of work, I mentor engineers on DSA, system design, AI/LLMs, and interview prep, helping them become industry-ready with real production-level engineering practices. I also share tech and career content to 25K+ followers on LinkedIn and 7K+ on Instagram (@msgopal.codes).";
  profileContent.profile.tagline =
    "1:1 coaching and mock interviews from a Senior SWE at Microsoft — 5.0★ across 107 sessions.";
  await setRow("profile", profileContent);

  const logos = await getRow("logos");
  delete logos.mentorFromCompanies;
  await setRow("logos", logos);

  await pool.end();
  console.log("done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
