Most system design prep optimizes for the wrong thing: memorizing a handful of "standard" architectures (a URL shortener, a chat app, a news feed) and hoping the interview question is close enough to one of them. That approach falls apart the moment the interviewer changes one constraint.

What's actually being evaluated is whether you have a **repeatable process** for reasoning about *any* system — how you gather requirements, how you estimate scale, how you reason about trade-offs, and how you communicate a design as it evolves under new constraints.

## The four phases interviewers are listening for

1. **Clarify requirements and scale** before drawing a single box.
2. **Estimate the numbers** — traffic, storage, bandwidth — so every later decision is grounded in reality instead of vibes.
3. **Draw the simplest design that could plausibly work**, then narrate it end-to-end.
4. **Go deep on 1–2 components** the interviewer cares about, and defend the trade-offs out loud.

Skipping straight to step 3 — the part everyone practices — is the single most common failure mode I see in mock interviews. It reads as pattern-matching, not engineering judgment.

## A design evolves in layers, not all at once

Here's roughly how a design should grow across a 45-minute session — start minimal, add exactly one thing per named constraint:

```
Step 1 — the naive version
  [Client] --> [App Server] --> [Database]

Step 2 — constraint: "traffic will spike unpredictably"
  [Client] --> [Load Balancer] --> [App Server x N] --> [Database]

Step 3 — constraint: "reads outnumber writes 100:1"
  [Client] --> [LB] --> [App Server x N] --> [Cache] --> [Database]
                                         (cache-aside)

Step 4 — constraint: "writes need to survive a region outage"
  [Client] --> [LB] --> [App Server x N] --> [Cache]
                              |
                              v
                     [Primary DB] --(async replication)--> [Replica DB (standby)]

Step 5 — constraint: "some work is slow and shouldn't block the request"
  [Client] --> [LB] --> [App Server x N] --> [Queue] --> [Worker Pool] --> [DB / Cache]
```

Notice each step exists because of a constraint the interviewer (or you) named out loud — never because "that's what the standard architecture looks like." That's the difference between reciting a template and demonstrating judgment.

## Worked example: back-of-the-envelope math for a URL shortener

Interviewers care less about the exact numbers and more about whether you can *derive* them.

- Assume 100M new short URLs created per month → ~40 writes/sec average, budget 5–10x for peak → ~300–400 writes/sec.
- Read:write ratio for a URL shortener is heavily read-skewed, often 100:1 → ~30–40K reads/sec at peak.
- Each record (short code, long URL, metadata) is roughly 500 bytes. At 100M/month, that's ~50GB/month, ~3TB over 5 years — comfortably within a single well-indexed relational table, no need to justify a NoSQL store on data volume alone.
- Short code space: base62, 7 characters gives 62^7 ≈ 3.5 trillion combinations — enough headroom that collision handling is a minor detail (retry-on-conflict), not a core design decision.

Walking through this out loud — even roughly — signals you're grounding the design in reality instead of guessing.

## The deep dives that actually get probed

Once the high-level design is up, interviewers usually pick one or two threads and pull:

- **Consistency vs. availability at the data layer.** Most read-heavy, display-oriented data doesn't need strong consistency — eventual consistency is not just acceptable but preferable, since it buys you availability and lower latency. The test that actually matters: would the user take a different action if they saw data from 2 seconds ago instead of right now? If not, don't pay for strong consistency there.
- **Cache invalidation and the thundering herd problem.** When a hot key expires, every concurrent request that misses cache can hit the database at once. Request coalescing (a single in-flight request per key) and jittered TTLs (randomizing expiry by ±10–20%) are the two fixes interviewers want to hear, not just "add a cache."
- **Sharding key selection.** A key that spreads writes evenly but forces every common read to fan out across all shards is often a worse choice than a slightly hotter key that keeps your top query patterns on one shard. Say this trade-off out loud — it shows you're not just sharding because "that's what you do at scale."
- **Idempotency on retries.** Any client-facing write path needs a story for "what happens if the client retries after a timeout." A client-generated idempotency key, checked against a dedupe record written atomically with the state change, is the standard answer — and naming the partial-failure case (write succeeded, response lost) is what separates a strong answer from a shallow one.

## Common mistakes that cost the most points

- **Silence.** An interviewer can't evaluate reasoning they can't hear. Narrate the trade-off, not just the choice.
- **Optimizing for "correct" over "clear."** A 90%-right design explained clearly usually scores higher than a 100%-right design delivered as an unstructured wall of boxes.
- **Adding complexity nobody asked for.** Every additional component (queue, cache layer, separate service) should trace back to a constraint you or the interviewer named. Unjustified complexity reads as cargo-culting, not depth.
- **Not asking about constraints you'll need in 20 minutes.** Skipped requirements-gathering tends to resurface as surprises halfway through the design, when they're expensive to retrofit.

## References

- Martin Kleppmann, *Designing Data-Intensive Applications* — the single best book for the "why" behind almost every trade-off above.
- Alex Xu, *System Design Interview* (Vol. 1 & 2) — good for interview-shaped practice problems.
- [System Design Primer](https://github.com/donnemartin/system-design-primer) — free, thorough, and a good reference for filling specific gaps.
- [The AWS Builders' Library](https://aws.amazon.com/builders-library/) — real production write-ups from engineers who operate these systems at scale, useful for grounding trade-off answers in reality instead of theory.
