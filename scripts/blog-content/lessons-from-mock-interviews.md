After running a large number of mock interviews — mostly system design, with a mix of coding and behavioral rounds — the same feedback keeps recurring, independent of seniority level. None of it is about knowledge gaps. It's almost entirely about *how* that knowledge gets communicated under time pressure.

## 1. You are narrating too late

Interviewers can't grade thinking they can't see. Say what you're about to try, and why, before you try it — not after it's already on the whiteboard.

Here's the difference in practice:

```
Weak pattern:
  [silence ~90s] -> [draws 3 boxes] -> [silence ~40s] -> "so I'd probably cache this"
                                                              ^
                                            interviewer has no idea why, or
                                            what else you considered and rejected

Strong pattern:
  "I'll start with the read path since it's 100:1 read-heavy" ->
  [draws client -> LB -> app] ->
  "the naive version hits the DB on every read, which won't survive that ratio, so I
   want a cache here — cache-aside over write-through, since writes are rare" ->
  [draws cache] -> keeps narrating each addition as it happens
```

The content of the two designs can end up nearly identical. The evaluation isn't. The first candidate gets graded on the artifact; the second gets graded on the reasoning — and reasoning is what the interview is actually trying to measure.

## 2. You are optimizing for "correct" over "clear"

A design that is 90% right and clearly explained usually scores higher than one that's 100% right but delivered as a wall of jargon. Roughly how the two answers land with an interviewer, on the parts that actually get scored:

| Answer style                     | Correctness | Communication | Overall read |
|-----------------------------------|:-----------:|:--------------:|--------------|
| Clear, slightly imperfect          | 7/10        | 9/10           | "I'd trust this person on my team" |
| Technically dense, hard to follow  | 9/10        | 3/10           | "I have no idea what they actually decided, or why" |

This isn't an argument for being imprecise. It's that precision nobody can follow doesn't get credited as precision — it gets read as a communication risk, which is exactly the thing a mock interview (and a real one) exists to screen for.

## 3. You are not asking about constraints you'll need later

Requirements-gathering isn't a formality — the constraints you skip early tend to resurface as surprises halfway through the design, at the worst possible time to be renegotiating scope. A short checklist worth running through in the first two minutes, every time:

- What's the read:write ratio, roughly?
- What does "scale" mean here — thousands, millions, billions of users or requests?
- Is strong consistency required anywhere, or is eventual consistency acceptable everywhere?
- Is there a latency budget I should be designing against?
- Are there compliance or data-residency constraints that affect where data can live?

Asking these costs 90 seconds. Discovering the answers the hard way, 25 minutes into a design that now needs to be partially redrawn, costs a lot more — both in time and in how composed you look under pressure.

## A composite example (illustrative, not a transcript of any one session)

To make this concrete — the exchange below is a composite built from feedback themes I've given repeatedly, not a real transcript of any specific candidate:

> **Interviewer:** "Design a rate limiter."
>
> **Weak response:** long silence, then a full solution — token bucket, distributed counters, Redis — delivered as one uninterrupted block with no pauses for the interviewer to react.
>
> **Strong response:** "A couple of quick questions first — is this per-user or per-IP, and does it need to stay consistent across multiple app servers, or is per-instance okay for now?" Then, out loud: "I'll start with the simplest thing that works for a single instance — a fixed window counter — and say why I'd upgrade it once we add more than one server."

The strong response isn't smarter. It's structured to let the interviewer see the decision tree, not just the destination.

## The underlying pattern

All three pieces of feedback point at the same root cause: candidates practice *solutions* far more than they practice *narrating a process under time pressure*. The fix isn't more problem-solving practice or more system design templates — it's running timed mock sessions specifically to practice thinking out loud, asking questions before diving in, and explaining trade-offs as you make them, not after.

## References

- Gayle Laakmann McDowell, *Cracking the Coding Interview* — still the best treatment of "how interviewers actually think," even for non-coding rounds.
- [System Design Primer](https://github.com/donnemartin/system-design-primer) — good for practicing the requirements-gathering habit against real-shaped problems.
- Julia Evans' blog, [jvns.ca](https://jvns.ca/) — not interview-specific, but the best public example I know of "narrate your reasoning as you go" applied to real debugging.
