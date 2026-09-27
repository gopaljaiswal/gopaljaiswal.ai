// One-time content update: real LinkedIn/Topmate data, headline split,
// real vault answers, honest (non-fabricated) vault pricing.
// Run against a specific DB with: DATABASE_URL="..." node scripts/update-real-content.mjs
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

const profile = {
  profile: {
    name: "Gopal Jaiswal",
    headline: "From service-company grind to product-company offers.",
    title: "Senior Software Engineer · Microsoft",
    location: "Hyderabad, India",
    tagline:
      "1:1 coaching and mock interviews from a Senior SWE at Microsoft — 5.0★ across 107 sessions.",
    bio: "I'm a Senior Software Engineer at Microsoft with 10 years of experience building scalable backend systems — most recently leading an AI-powered agent platform (MCP, LangChain, Azure AI Foundry) that cut partner onboarding time by 92%. Outside of work, I mentor engineers on DSA, system design, AI/LLMs, and interview prep, helping them become industry-ready with real production-level engineering practices.",
    initials: "GJ",
  },
  education: {
    school: "National Institute of Technology, Nagaland",
    years: "2012 – 2016",
    detail: "Technical Secretary, Computer Science & Engineering",
  },
  certifications: [
    "Apache Kafka Series - Learn Apache Kafka for Beginners v2",
    "Taming Big Data with Spark Streaming Hands-On!",
    "Java Object Oriented Programming: OOPS OOAD & Design Patterns",
    "Data Science Orientation",
    "Probability for Statistics and Data Science",
  ],
};

const stats = [
  { icon: "Star", label: "1:1 mentoring rating", value: "5.0 / 5 · 52 ratings" },
  { icon: "Quote", label: "Testimonials on Topmate", value: "49" },
  { icon: "CalendarCheck", label: "1:1 mentoring bookings", value: "107" },
  { icon: "Building2", label: "Prior engineering", value: "Myntra" },
  { icon: "GraduationCap", label: "Mentees mentored", value: "300+" },
  { icon: "Trophy", label: "Mentees placed at", value: "Amazon · Adobe · +2" },
];

const links = {
  topmate: "https://topmate.io/gopal_jaiswal12/",
  linkedin: "https://www.linkedin.com/in/gopal-jaiswal-568ab9a8/",
  instagram: "https://www.instagram.com/msgopal.codes",
  propeers: "https://www.propeers.in/profile/gopaljaiswal",
  email: "mailto:msgopal.codes@gmail.com",
  primaryCtaLabel: "Book a mock interview",
  primaryCtaHref: "https://topmate.io/gopal_jaiswal12/1855880",
};

const vaultAnswers = {
  P10: "Attach a client-generated idempotency key to each write and store it (with the resulting response, or at least a completion marker) in a dedupe table keyed on that ID, with a TTL long enough to cover realistic retry windows. Check for that key before executing the write, inside the same transaction or as close to it as possible, so a duplicate request short-circuits to the stored result instead of re-applying the operation. The subtle part is partial failures: if the write succeeds but the response is lost before the client sees it, the retry needs to safely return the original result rather than error or re-execute — which is why the dedupe record should be written atomically with the state change, not as an afterthought.",
  P19: "Don't run a blocking ALTER TABLE on anything past a few million rows. Create a shadow table with the target schema, backfill it in small batches during low-traffic windows while monitoring replication lag and lock contention, and dual-write to both tables for all new writes during the transition. Once the backfill catches up and a verification pass confirms the two tables agree, cut reads over behind a feature flag, keep dual-writing for a safety window, then drop the old table. The batching and dual-write discipline is what keeps this online — the mistake people make is trying to do it in one giant migration instead of a sequence of small, reversible steps.",
  P21: "Start from staleness tolerance, not from where caching is easiest. If data can be stale for minutes and is read far more than written, push it to the edge or CDN. If it needs to be fresh within seconds but is expensive to compute, a service-layer cache (Redis/Memcached) in front of the DB is the right layer. Client-side caching is for data the user already fetched and doesn't need re-validated every render. The real question for each piece of data: what's the blast radius if this is wrong for 30 seconds, and who's allowed to see stale data first.",
  P22: "The failure mode is: a hot key expires, and every concurrent request that missed the cache goes to the DB at once. Request coalescing (a single in-flight request per key, with everyone else waiting on that result) is the most direct fix. Jittered TTLs (randomizing expiry by ±10-20%) spread out expirations so they don't all land at the same moment. For very hot keys, recompute the value slightly before expiry so it never actually goes cold from the client's perspective.",
  P31: "Two-phase commit works but couples services tightly and holds locks across the network for as long as the slowest participant takes. The saga pattern avoids this: break the transaction into a sequence of local transactions, each service commits its own step immediately, and if a later step fails, you run compensating actions to undo the earlier steps. The trade-off is you give up atomicity for availability — every step needs to be idempotent and every compensation needs to be safe to run even if the original step partially succeeded.",
  P33: "Almost never as often as people assume. Strong consistency is worth its cost when a stale read causes an irreversible or costly action — double-spending a balance, double-booking a seat. For most read-heavy, display-oriented data, eventual consistency is not just acceptable but preferable. The practical test: if a user would take the same action whether they saw data from 2 seconds ago or right now, you don't need strong consistency there.",
  P42: "Active-passive is simpler to reason about — one region serves traffic, the other stays warm and takes over on failure — but you pay for idle capacity and failover isn't instant. Active-active serves traffic from multiple regions simultaneously, at the cost of needing to solve cross-region data replication and conflict resolution. Most systems that claim active-active are actually active-active for reads and active-passive for writes, because solving multi-writer conflict resolution correctly is genuinely hard.",
  P44: "A shallow check (is the process running, can it accept a connection) tells you the service is alive but not whether it can do its job. A deep check (can it reach its critical dependencies) tells you more, but wiring deep checks into a load balancer's routing decision means one shared dependency going down can make every instance report unhealthy at once — turning a partial outage into a total one. Use shallow checks for routing/restart decisions, and surface deep dependency health as separate alerts a human acts on.",
  P50: "True exactly-once delivery across a network isn't achievable in the general case — a message can always be sent, then the ack lost, forcing a retry. What's actually achievable, and what \"exactly-once\" almost always means in practice, is at-least-once delivery combined with idempotent processing on the receiving end, so a duplicate delivery has no additional effect. Design consumers around natural idempotency keys rather than trying to prevent duplicates at the transport layer.",
  P52: "Balance write distribution against the queries you'll actually run — a key that spreads writes evenly but forces every read to fan out across all shards is often worse than a slightly hotter key that keeps your most common query on one shard. Composite keys (tenant + entity) usually beat a single high-cardinality column, since they let you reason about both distribution and locality at once. Whatever you pick, model your top 3 access patterns against it before committing — re-sharding later is far more expensive than getting this right up front.",
  P58: "Prefer additive, backward-compatible changes as the default: new optional fields, new endpoints, new enum values consumers are expected to ignore if unrecognized. Reserve an actual version bump for breaking changes only, and run both versions in parallel with a clear, communicated deprecation window rather than a hard cutover. The version number is a last resort, not a routine tool.",
  P61: "Draw boundaries around data ownership and the rate of change, not around your org chart. A boundary is healthy when the service on one side can change its internal implementation without the other side noticing. A good test: if implementing a single business requirement means editing three \"different\" services in lockstep, that's usually a sign the boundary is in the wrong place, not that the requirement is unusually complex.",
  P66: "Start from your access patterns, not from a general reputation. If your data has natural relationships you'll query across, a relational DB with real constraints and transactions saves you from re-implementing consistency logic in application code. If you have a single, well-known access pattern at a scale a single Postgres instance can't handle, a NoSQL store optimized for that pattern will outperform it. Avoid picking NoSQL because it sounds more scalable when your actual bottleneck was never write throughput.",
  P70: "A retry policy is really three decisions bundled together: how many times to retry, how long to wait between attempts, and when to stop entirely. Exponential backoff with jitter prevents synchronized retry storms from many clients hitting a struggling service at once. A circuit breaker sits on top: after enough consecutive failures, stop sending requests for a cool-down period so a struggling downstream service gets room to recover. Treat these as one system — a large retry count with no circuit breaker is often worse than no retries at all during a real outage.",
  P75: "Durability is a guarantee about data already acknowledged as written — once confirmed, it will not be lost, even across crashes. Availability is a guarantee about the system responding to requests at all, regardless of whether the response reflects the latest state. A system can be highly available but not durable (an in-memory cache that loses everything on restart), or highly durable but not always available (a single-writer DB that rejects writes during failover but never loses a confirmed one). \"The system is up\" and \"we didn't lose your data\" are different claims.",
};

async function main() {
  await setRow("profile", profile);
  await setRow("stats", stats);
  await setRow("links", links);

  const offerings = await getRow("offerings");
  for (const o of offerings) {
    o.emphasis = o.title === "Essays" ? "secondary" : "primary";
  }
  await setRow("offerings", offerings);

  const vault = await getRow("vault");
  for (const q of vault.vaultQuestions) {
    if (vaultAnswers[q.id]) q.answer = vaultAnswers[q.id];
  }
  delete vault.vaultPricing.rating;
  delete vault.vaultPricing.ratingCount;
  await setRow("vault", vault);

  await pool.end();
  console.log("done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
