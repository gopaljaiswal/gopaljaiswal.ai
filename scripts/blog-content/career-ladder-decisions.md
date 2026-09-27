It's tempting to think levelling up is mostly a function of technical depth and hours logged. In practice, the bigger lever is *which problems you choose to own*, and how visibly you own them. Two engineers can write equally good code and get evaluated completely differently, because one of them kept solving problems nobody could see.

## Impact and visibility are two different axes

Most career advice conflates "doing good work" with "doing work that gets you promoted." They overlap, but not as much as people assume. It helps to think of your options on two axes:

```
                    High visibility
                          |
     Risky political      |      The sweet spot:
     project, credit       |      hard problem, you
     hard to prove ---------+------- drove it, everyone
                          |         saw the outcome
                          |
     Low impact, low       |      Real impact, but
     visibility - safe     |      buried in a ticket
     but invisible         |      queue, nobody notices
                          |
                    Low visibility
     <-- Low impact -------------------- High impact -->
```

The failure mode on the left half of the chart is obvious: you're not moving anything, visible or not. The less obvious failure mode is the bottom-right quadrant — genuinely high-impact work that nobody outside your team, or sometimes even your team, actually knows you did. That work counts for far less at review time than it should, not because the system is unfair, but because promotion decisions are made by people who weren't in the room, working from what got written down and repeated.

## Scope you don't have to be assigned

The clearest signal at senior-and-above levels isn't "did they finish the ticket" — it's whether they noticed a problem nobody assigned them and drove it to resolution. This is the top-right quadrant, and it's earned, not requested.

A pattern I see work consistently: pick one recurring pain point your team complains about but has stopped trying to fix (a flaky test suite, a deploy process everyone routes around, an on-call runbook that's three reorgs out of date), fix the root cause, and write a short summary of what it cost before and what changed after. The fix matters less than the *visible before/after*, because that's what a calibration committee three levels removed from your daily work can actually evaluate.

## Say the unpopular thing early

Flagging a risk in week one is cheap. Flagging the same risk in week ten, after it's become an incident, is expensive — for you and for the team. The asymmetry compounds the longer it sits unraised:

```
Cost of raising a concern, by week
week 1  |#
week 2  |##
week 3  |###
week 4  |####
week 5  |######
week 6  |########
week 7  |###########
week 8  |###############
week 9  |#####################
week 10 |###########################  <- incident + postmortem + trust cost
```

The engineers who get reputations for "good judgment" aren't the ones who are always right — they're the ones whose concerns show up early enough to be cheap to act on. Being early and occasionally wrong costs almost nothing. Being right but late costs a lot, and it's the lateness that gets remembered, not the correctness.

## How calibration actually works, and why it changes what you should optimize for

At most companies above a certain size, your manager doesn't unilaterally decide your rating — a calibration committee of managers you've never met compares write-ups across their teams and argues about relative scope. Your manager is your advocate in a room you're not in, working from whatever you and they wrote down. Practically, this means:

- Undocumented impact is invisible impact, no matter how real it was.
- A one-paragraph "here's the before, here's the after, here's why it mattered" beats a long list of tickets closed.
- Scope that required influencing people outside your reporting line reads as more senior than the same amount of effort spent heads-down solo, because it demonstrates the thing calibration is actually trying to measure: can this person operate with less supervision at a wider radius.

## A concrete way to apply this over the next 90 days

1. Pick one problem in your team's blind spot — something real, unowned, and currently costing people time or reliability.
2. Scope a fix that's small enough to ship in weeks, not quarters.
3. Before you start, write one sentence describing the current cost. After you finish, write one sentence describing what changed.
4. Say it out loud in the venue where it'll be remembered — a team update, a doc, a retro — not just in the pull request description.
5. Repeat with a slightly bigger problem next quarter.

None of this requires being the most technically deep person in the room. It requires noticing what nobody else is choosing to fix, and being disciplined about making the outcome visible to people who weren't there to see it happen.

## References

- Will Larson, *Staff Engineer: Leadership Beyond the Management Track* — the best treatment I've read of scope, influence, and how senior+ evaluation actually works.
- Camille Fournier, *The Manager's Path* — useful for understanding what the person calibrating your rating is actually optimizing for.
- [martinfowler.com](https://martinfowler.com/) — not career advice specifically, but a good model for the "write down the before/after" habit this post is arguing for.
