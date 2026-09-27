// Replace the placeholder ("TODO: replace this with your real essay") blog
// posts with real, technically detailed essays — ASCII diagrams, worked
// examples, and a references section. Content lives in scripts/blog-content/
// so the long markdown bodies don't need JS string escaping.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "blog-content");

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: /neon\.tech|sslmode=require/.test(process.env.DATABASE_URL ?? "") ? { rejectUnauthorized: false } : undefined,
});

const updates = {
  "how-to-crack-system-design": {
    title: "How to actually prepare for system design interviews",
    excerpt:
      "A repeatable framework for system design interviews — requirements, estimation, a design that evolves in layers, and the deep dives interviewers actually probe — with a worked example.",
    tags: ["system design", "interviews"],
  },
  "career-ladder-decisions": {
    title: "The career decisions that actually move the needle",
    excerpt:
      "Levelling up is less about technical depth and more about which problems you choose to own, and how visibly you own them — plus how calibration actually works behind the scenes.",
    tags: ["career"],
  },
  "lessons-from-mock-interviews": {
    title: "What I keep telling people after mock interviews",
    excerpt:
      "The same three pieces of feedback keep coming up in mock interviews, independent of seniority — narrate earlier, optimize for clarity over cleverness, and ask about constraints you'll need later.",
    tags: ["mock interviews", "career"],
  },
};

async function main() {
  const { rows } = await pool.query("select data from content where key = 'blogPosts'");
  const posts = rows[0].data;

  for (const post of posts) {
    const update = updates[post.slug];
    if (!update) continue;
    const filePath = path.join(contentDir, `${post.slug}.md`);
    post.title = update.title;
    post.excerpt = update.excerpt;
    post.tags = update.tags;
    post.content = fs.readFileSync(filePath, "utf-8").trimEnd();
  }

  await pool.query(
    `update content set data = $1, updated_at = now() where key = 'blogPosts'`,
    [JSON.stringify(posts)]
  );
  console.log(`updated ${Object.keys(updates).length} blog posts`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
