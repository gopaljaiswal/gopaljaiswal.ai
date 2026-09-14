export type Domain =
  | "Core Distributed Systems & Scalability"
  | "Data Modeling, Storage & Indexing"
  | "Caching & Performance"
  | "Consistency, Availability & Transactions"
  | "Reliability, Failures & Recovery"
  | "APIs, Boundaries & Contracts";

export type Difficulty = "Fundamental" | "Intermediate" | "Advanced";

export type VaultQuestion = {
  id: string;
  domain: Domain;
  difficulty: Difficulty;
  question: string;
  teaser: string;
  answer?: string;
  locked: boolean;
};

// TODO: replace with your real vault content. 15 seeded here, ~3 free.
export const vaultQuestions: VaultQuestion[] = [
  {
    id: "P10",
    domain: "Core Distributed Systems & Scalability",
    difficulty: "Advanced",
    question: "How do I handle idempotency for write APIs?",
    teaser:
      "Idempotency keys, dedupe windows, and where the check belongs in the request path.",
    answer:
      "TODO: write your full answer here. Cover idempotency keys, dedupe storage (and its TTL), where the check sits relative to the write, and how retries interact with partial failures.",
    locked: false,
  },
  {
    id: "P19",
    domain: "Data Modeling, Storage & Indexing",
    difficulty: "Advanced",
    question: "How do I design a migration strategy for a huge table?",
    teaser:
      "Online schema change patterns, backfill batching, and how to avoid locking the table.",
    answer:
      "TODO: write your full answer here. Cover shadow tables, dual writes, batched backfills, and cutover strategy for a table too large to alter directly.",
    locked: false,
  },
  {
    id: "P21",
    domain: "Caching & Performance",
    difficulty: "Fundamental",
    question: "Where should I cache: client, edge, service, or DB layer?",
    teaser:
      "A framework for picking the right cache tier based on staleness tolerance and blast radius.",
    answer:
      "TODO: write your full answer here.",
    locked: true,
  },
  {
    id: "P22",
    domain: "Caching & Performance",
    difficulty: "Intermediate",
    question: "How do I avoid cache stampedes on a hot key?",
    teaser: "Request coalescing, jittered TTLs, and early recomputation.",
    locked: true,
  },
  {
    id: "P31",
    domain: "Consistency, Availability & Transactions",
    difficulty: "Advanced",
    question: "How do I implement distributed transactions without 2PC pain?",
    teaser: "Sagas, compensating actions, and where eventual consistency is fine.",
    locked: true,
  },
  {
    id: "P33",
    domain: "Consistency, Availability & Transactions",
    difficulty: "Intermediate",
    question: "When is strong consistency actually required?",
    teaser: "Separating what feels important from what breaks correctness.",
    locked: true,
  },
  {
    id: "P42",
    domain: "Reliability, Failures & Recovery",
    difficulty: "Advanced",
    question: "How do I run in multiple regions and fail over cleanly?",
    teaser: "Active-active vs active-passive, and the data-replication trade-offs each implies.",
    locked: true,
  },
  {
    id: "P44",
    domain: "Reliability, Failures & Recovery",
    difficulty: "Fundamental",
    question: "What actually belongs in a health check?",
    teaser: "Shallow vs deep checks, and why a bad deep check can cascade an outage.",
    locked: true,
  },
  {
    id: "P50",
    domain: "Core Distributed Systems & Scalability",
    difficulty: "Advanced",
    question: "How do I handle exactly-once vs at-least-once semantics in practice?",
    teaser: "Why exactly-once is mostly a UX promise built on idempotent at-least-once delivery.",
    locked: true,
  },
  {
    id: "P52",
    domain: "Core Distributed Systems & Scalability",
    difficulty: "Fundamental",
    question: "How do I choose a sharding key?",
    teaser: "Balancing write distribution against the queries you'll actually run.",
    answer:
      "TODO: write your full answer here.",
    locked: false,
  },
  {
    id: "P58",
    domain: "APIs, Boundaries & Contracts",
    difficulty: "Intermediate",
    question: "How do I version an API without breaking existing clients?",
    teaser: "Additive changes, deprecation windows, and when a new major version is unavoidable.",
    locked: true,
  },
  {
    id: "P61",
    domain: "APIs, Boundaries & Contracts",
    difficulty: "Fundamental",
    question: "Where should a service boundary actually sit?",
    teaser: "Drawing boundaries around data ownership, not team org charts.",
    locked: true,
  },
  {
    id: "P66",
    domain: "Data Modeling, Storage & Indexing",
    difficulty: "Intermediate",
    question: "How do I pick between SQL and NoSQL for a new service?",
    teaser: "A checklist based on access patterns, not on which one is trendier.",
    locked: true,
  },
  {
    id: "P70",
    domain: "Reliability, Failures & Recovery",
    difficulty: "Intermediate",
    question: "How do I design a retry policy that doesn't make outages worse?",
    teaser: "Backoff, jitter, and circuit breakers as a system, not independent knobs.",
    locked: true,
  },
  {
    id: "P75",
    domain: "Consistency, Availability & Transactions",
    difficulty: "Fundamental",
    question: "What's the real difference between availability and durability?",
    teaser: "Two guarantees people conflate, with different failure costs.",
    locked: true,
  },
];
