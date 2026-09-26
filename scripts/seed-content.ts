// One-time migration, already run against the local dev DB: copied the
// static src/data/*.ts values (as they were before this script existed)
// into the DB. Kept for history/reference — the data/*.ts files no longer
// export static values, so this script cannot be re-run as-is. To seed a
// new database (e.g. production Neon), export rows from the working DB and
// insert them into the new one instead.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Pool } from "pg";

process.loadEnvFile?.(path.join(process.cwd(), ".env.local"));

import { profile, education, certifications } from "../src/data/profile";
import { stats } from "../src/data/stats";
import { offerings } from "../src/data/offerings";
import { links } from "../src/data/links";
import { logos, mentorFromCompanies } from "../src/data/logos";
import { testimonials, ratingSummary } from "../src/data/testimonials";
import {
  oneOnOneServices,
  coachingPackage,
  priorityDM,
  digitalProducts,
} from "../src/data/services";
import { vaultQuestions } from "../src/data/vault";
import { vaultPricing } from "../src/data/pricing";
import { linkedinPosts } from "../src/data/linkedin-posts";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function readBlogPosts() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        tags: data.tags ?? [],
        content,
      };
    });
}

const rows: { key: string; data: unknown }[] = [
  { key: "profile", data: { profile, education, certifications } },
  { key: "stats", data: stats },
  { key: "offerings", data: offerings },
  { key: "links", data: links },
  { key: "logos", data: { logos, mentorFromCompanies } },
  { key: "testimonials", data: { testimonials, ratingSummary } },
  { key: "services", data: { oneOnOneServices, coachingPackage, priorityDM, digitalProducts } },
  { key: "vault", data: { vaultQuestions, vaultPricing } },
  { key: "linkedinPosts", data: linkedinPosts },
  { key: "blogPosts", data: readBlogPosts() },
];

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  for (const row of rows) {
    await pool.query(
      `insert into content (key, data, updated_at) values ($1, $2, now())
       on conflict (key) do update set data = excluded.data, updated_at = now()`,
      [row.key, JSON.stringify(row.data)]
    );
    console.log(`seeded: ${row.key}`);
  }

  await pool.end();
  console.log("done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
