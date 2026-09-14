# CTF
club opening event 
# CTF Event Website — Spec

> Draft for team review. Anything marked **[OPEN]** is an assumption/placeholder — edit directly in the repo.

## Team
- **M**
- **N**
- **P**
- **J**
**[OPEN]** — suggested split: M owns backend/data model + real-time leaderboard logic (hardest part), N + J split frontend pages, P takes the more contained/isolated pieces (e.g. static challenge pages, styling) with support from the others.

---

## Stack — [OPEN, suggestion only]

Given the team mix (1 strong coder + 3 vibe coders), leaning toward something with minimal boilerplate and a managed real-time DB rather than hand-rolling a backend:

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

**Challenge categories locked per tier:**
- **Easy:** Base64 decode, hidden white-text trick (select-all reveal)
- **Medium:** `view-source:` trick, URL parameter tweak, zoom-to-read image, Morse code (delivered live over speakers, not on-page)
- **Hard:** stacked ciphers, MD5 hash cracking, fake-login SQL injection (`' OR '1'='1` style), hidden endpoint discovery
- **Bonus/Insane (Round 3 only):** GitHub leaked-gist hunt (flag buried in commit history)

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
- View live per-team and per-checkpoint stats (who's stuck where) — useful for deciding who needs a hint pushed
- **[OPEN]** — auth for this view: simplest is a single shared admin password/PIN, doesn't need to be fancy for a one-night event

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
