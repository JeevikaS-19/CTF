# CTF Event Website — Spec

> Draft for team review. Anything marked **[OPEN]** is an assumption/placeholder — edit directly in the repo.

## Team
- **Omar**
- **Navdeep**
- **Pavan**
- **Jeevika**
- **Shaziya**

All five can build across the stack — so the split below is by *feature ownership*, not by skill tier.

## Build Timeline — Tuesday to Friday (4 days)

| Day | Focus |
|---|---|
| **Tue** | Lock stack + data model, scaffold repo, SRN signup flow working end-to-end |
| **Wed** | Dashboard + live leaderboard (realtime), round/checkpoint lock-unlock logic, admin panel skeleton |
| **Thu** | Challenge pages built out (all tiers), flag submission + scoring wired in, Master Key meter live |
| **Fri** | Organizer tracking view, integration pass, run a full mock round end-to-end, bug bash + polish |

## Work Split (by feature, 5 people)

- **Owner 1 (e.g. Omar):** Data model + backend/DB setup, SRN signup + team identity
- **Owner 2 (e.g. Navdeep):** Live leaderboard + realtime sync, Master Key meter
- **Owner 3 (e.g. Pavan):** Round/checkpoint lock-unlock logic + admin panel
- **Owner 4 (e.g. Jeevika):** Challenge pages — build out Easy/Medium tiers
- **Owner 5 (e.g. Shaziya):** Challenge pages — build out Hard/Bonus tiers + organizer tracking view

**[OPEN]** — swap names to actual preference; the split is deliberately by module so anyone can pick up any block given everyone's capable across the stack.

---

## Stack — [OPEN, suggestion only]

Leaning toward something with minimal boilerplate and a managed real-time DB rather than hand-rolling a backend — still the fastest path for a 4-day build:

- **Frontend:** Next.js (or plain React + Vite if simpler)
- **Backend/DB:** Supabase or Firebase — gives you auth-less SRN signup, a live-updating DB for the leaderboard, and realtime subscriptions for free instead of building websockets by hand
- **Hosting:** Vercel (pairs well with Next.js, free tier is enough for a one-night event)

Swap freely — this is just the "fastest path for a mixed-skill team" pick, not a requirement.

---

## User Flow

1. **Landing page** — event name, "Sign In" CTA
2. **Sign up** — SRN only, no password. SRN acts as the unique team/user identifier.
   - **[OPEN]** — is this per-person or per-row-team? Given the row-based team format, consider one SRN per team (e.g. whoever signs up first per row) rather than every individual signing in separately, to avoid split scores within a team.
3. **Dashboard** (main screen after sign-in):
   - **Live leaderboard** — ranked by total points, updates in real time
   - **Rounds list** — shows Round 1 / 2 / 3, each locked until the organizers unlock it live
   - **Master Key meter** — shared hall-wide progress bar (see below)
4. **Within an unlocked round** — the 3 checkpoints (Easy/Medium/Hard) appear, also individually locked/unlocked in sequence by the organizers

---

## Question Flow (per round)

Each round = 3 checkpoints, unlocked in order, each independently gated by the organizers (not on a fixed timer, since live show pacing may drift):

```
Round N
 ├─ Checkpoint: Easy (10 pts)
 │    → series of riddles/questions on a challenge page
 │    → solving them yields a FLAG string
 │    → team submits flag on dashboard → 10 pts awarded, checkpoint marked solved
 │
 ├─ Checkpoint: Medium (20 pts)
 │    → same pattern, appears once organizer unlocks it
 │    → skippable — a team can move on without solving Easy or Medium
 │
 └─ Checkpoint: Hard (30 pts)
      → same pattern
      → Round 3 only: an additional Bonus/Insane checkpoint (50 pts) appears
        once a team clears Hard, as the fast-finisher chase target
```

**Flag submission model:** each checkpoint has ONE flag to submit (not per-question) — the series of riddles within a checkpoint collectively leads to a single flag string, entered once on the dashboard. Keeps the submission UI simple: one input box per checkpoint, correct flag = instant point award + visual confirmation.

**Challenge categories per tier:**
- **Easy:** Base64 decode, hidden white-text trick (select-all reveal)
- **Medium:** `view-source:` trick, URL parameter tweak, zoom-to-read image, Morse code (delivered live over speakers, not on-page)
- **Hard:** stacked ciphers, MD5 hash cracking, fake-login SQL injection (`' OR '1'='1` style), hidden endpoint discovery
- **Bonus/Insane (Round 3 only):** GitHub leaked-commit hunt — flag buried a few commits deep in a fake "leaked" repo, visible in the diff/history rather than the current file

**New additions — now that laptops may be in play:**
- **Inspect Element / DevTools** — flag sits in an HTML comment or a hidden `<div>`, only visible via right-click → Inspect. The classic that needed laptops to work properly — bring it back if laptops are confirmed.
- **CAPTCHA twist** — a fake CAPTCHA that's actually solvable by reading the page source (the "correct" answer is hardcoded in the HTML/JS instead of an image), or one where the trick is realizing you don't need to solve it at all (a hidden "skip" button in the DOM). Plays on the same "look past what's rendered" muscle as Inspect Element.
- **Git repo commit hunt (formalized)** — a real repo with a commit history; the current file shows a decoy/old flag, the real one is in an earlier commit's diff (`git log`, `git diff`, or just browsing commit history on GitHub). Works on laptop or phone via the GitHub web UI, but is much smoother on laptop.
- **SQL injection (confirmed for Hard tier)** — fake login/search form, `' OR '1'='1` or `' OR 1=1 --` style input reveals the flag. No real backend security needed, just a scripted check that "looks" vulnerable.

**[OPEN]** — if laptops get confirmed for real, Inspect Element and CAPTCHA can likely move down from Hard to Medium tier, since they stop being finger-gymnastics and become straightforward once someone has a mouse and devtools. Decide once laptop availability is locked.

---

## Master Key Mechanic

- A single shared progress meter, visible on every user's dashboard and on the big screen.
- Every checkpoint flag captured **by anyone, anywhere** ticks the meter up by a fixed amount (e.g. total checkpoints across all teams = 100%).
- At set thresholds (25/50/75/100%), something is revealed — **[OPEN — decide the actual payload]**: club tagline, next-event teaser, or the prize location.
- Needs to be a simple aggregate counter in the DB (`total_flags_captured / total_flags_possible`), pushed to all clients via realtime subscription.

---

## Admin / Organizer Controls

Needed as a separate protected view (not public):

- Manually unlock/lock each round and each checkpoint within it (live show pacing, not a fixed clock)
- Trigger the on-screen "stage hint" reveal per checkpoint
- **[OPEN]** — auth for this view: simplest is a single shared admin password/PIN, doesn't need to be fancy for a one-night event

### Organizer Tracking / Analytics (internal only, never shown to the audience)

- **Per-team live status** — which checkpoint each team is currently on, solved vs. skipped vs. stuck, at a glance
- **Time-per-checkpoint** — how long each team took from unlock to submission (or to giving up) — useful both live (spot who needs a hint) and after, for judging difficulty balance for next time
- **Funnel view** — % of teams that reached each checkpoint tier (Easy → Medium → Hard → Bonus), to see where the room is dropping off in real time
- **Submission log** — every flag attempt (correct or wrong) per team, timestamped — good for spotting a checkpoint that's getting too many wrong guesses (sign it needs a hint pushed sooner)
- This is purely a read view on top of the same `submissions` table below — no separate data model needed, just an internal dashboard querying it differently from the public leaderboard

---

## Data Model (rough)

```
teams
 - srn (unique id)
 - team_name / row_number [OPEN — how teams are labeled]
 - total_points

checkpoints
 - id
 - round (1-3)
 - tier (easy/medium/hard/bonus)
 - points
 - flag_answer (correct string)
 - is_unlocked (bool, admin-controlled)

submissions
 - team_srn
 - checkpoint_id
 - submitted_at
 - correct (bool)

master_key_progress
 - total_captured (int)
 - total_possible (int)  # derived, or hardcoded to total checkpoint count
```

---

## Still Open / To Decide as a Team

- [ ] Final stack choice
- [ ] Per-person vs per-team (per-row) SRN signup
- [ ] Master Key reveal payload at each threshold
- [ ] Admin auth method
- [ ] Exact riddle content per checkpoint (separate doc/repo folder)
- [ ] Which 1–2 web games stay as filler, and whether they live on this same site or separately
- [ ] Confirm laptop availability — decides whether Inspect Element / CAPTCHA sit at Medium or Hard tier
- [ ] Finalize actual name-to-module assignment for the 5-person build split
