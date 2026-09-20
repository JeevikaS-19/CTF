# Event Game Site: Spec v1

Live trivia + puzzle site for the club opening event. Audience plays on their own phones, seated, in teams. Organizers run the show from an admin panel.

---

## 0. Defaults I picked (change any of these, then freeze)

| Decision | Default |
|---|---|
| Who plays | Teams of 2-4. Everyone uses their own phone. Team score is shared |
| Joining | Captain creates team, gets a 5-char join code. Others join with the code. No passwords, no email |
| Rounds | **Round 1:** 10 college trivia questions. **Round 2:** 12 logic/cipher puzzles in 3 checkpoints |
| Scoring | Fixed points per question. No negative marking. No speed bonus in v1 |
| Tiebreaker | Team whose last correct answer came earlier wins |
| Round control | Organizers open/close rounds from admin. Timer is server-side |
| Leaderboard | Organizer picks: live / frozen / hidden. Public shows top 10 plus your own team |
| Realtime | Polling (no websockets). Simpler and enough for 500 people |
| Filler games | Stretch goal: 1 Wordle-style game, only after everything else works |

---

## 1. Stack

- **Frontend:** React + Vite + Tailwind. Mobile-first (phone only)
- **Backend:** Node + Express
- **DB:** PostgreSQL (Supabase or Neon, hosted). Questions do **not** live in the DB
- **Hosting:** Frontend on Vercel/Netlify. Backend on Render/Railway. **Use a plan that doesn't sleep**, or wake it up 10 min before the event
- If the whole team is stronger in something else (FastAPI, Mongo), swap it now. Just don't mix

---

## 2. Repo structure

One repo: `games-site`.

```
games-site/
├── README.md                    setup + git rules (short)
├── .gitignore
├── .github/
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── docs/
│   ├── SPEC.md                  this file
│   └── API.md                   endpoint contract (source of truth)
│
├── content/                     OWNER: content lead. JSON only, no code
│   ├── schema.json              question schema
│   ├── theme.json               round names, flavor text, checkpoint names
│   ├── round1.json
│   ├── round2.json
│   └── filler/                  word lists etc. for filler games
│
├── backend/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── server.js            boots the server, nothing else
│       ├── app.js               middleware + mounts routes (PRE-WIRED)
│       ├── config/              env.js, db.js
│       ├── middleware/          auth.js, adminAuth.js, rateLimit.js, errorHandler.js
│       ├── routes/
│       │   ├── index.js         mounts every route file (PRE-WIRED)
│       │   ├── teams.js         create / join team
│       │   ├── state.js         event phase + timer
│       │   ├── rounds.js        questions for the current round/checkpoint
│       │   ├── answers.js       submit answer, skip checkpoint
│       │   ├── leaderboard.js
│       │   └── admin.js         organizer controls
│       ├── services/
│       │   ├── content.js       loads + strips answers from content JSON
│       │   ├── answerCheck.js   normalize + compare answers
│       │   ├── scoring.js       points, tiebreak
│       │   ├── eventState.js    phase machine, timers
│       │   └── leaderboardCache.js
│       ├── db/                  schema.sql, migrations/, queries/
│       ├── scripts/             validateContent.js, seed.js, loadtest.js
│       └── tests/
│
└── frontend/
    ├── package.json
    ├── .env.example
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx              all routes registered here (PRE-WIRED)
        ├── api/                 client.js + one file per backend route file
        ├── hooks/               useEventState, useLeaderboard, useTeam
        ├── context/             TeamContext.jsx
        ├── styles/              tokens (colors, fonts), tailwind config
        ├── components/          shared UI only: Button, Card, Timer, Toast, Layout
        ├── pages/
        │   ├── Join.jsx
        │   ├── Lobby.jsx
        │   ├── Round.jsx        renders the checkpoint list + question cards
        │   ├── Results.jsx
        │   ├── Leaderboard.jsx
        │   └── admin/           Login.jsx, Control.jsx, Overview.jsx, TeamDetail.jsx
        ├── features/
        │   ├── questions/       QuestionCard, McqQuestion, TextQuestion, CheckpointList
        │   ├── leaderboard/     LeaderboardTable, MyTeamRow
        │   └── admin/           components used only by admin pages
        └── games/               filler games. Each folder is fully self-contained
            └── wordle/
```

### Pre-wiring rule (this is what stops merge conflicts)

In the Day 1 scaffold, register **every** route, page and route file, each returning a "TODO" stub. After that, nobody touches `App.jsx`, `app.js` or `routes/index.js`. You only fill in your own stub files.

### Ownership

| Area | Owner |
|---|---|
| `backend/src/routes/teams.js`, `middleware/auth.js`, `services/scoring.js`, `leaderboard.js`, `leaderboardCache.js` | **BE1** |
| `routes/rounds.js`, `answers.js`, `services/content.js`, `answerCheck.js`, `eventState.js` | **BE2** |
| `frontend/src/pages/Join, Lobby, Leaderboard`, `components/`, `styles/`, `context/` | **FE1** |
| `frontend/src/pages/Round, Results`, `features/questions/` | **FE2** |
| `routes/admin.js`, `frontend/src/pages/admin/`, `features/admin/` | **Floater A (organizer dashboard)** |
| `content/` and `scripts/validateContent.js` | **Floater B (content lead)** |
| `frontend/src/games/`, `tests/`, `scripts/loadtest.js` | **Floater C (filler game + QA)** |
| `docs/API.md`, scaffold, README, reviews on PRs into `dev` | **PM / tech lead** |

Add these to `.github/CODEOWNERS` so GitHub auto-requests the right reviewer.

---

## 3. Event flow (state machine)

Server keeps one `phase`:

```
lobby → round1_live → round1_closed → round2_live → round2_closed → finale
```

- **lobby:** teams create/join. Questions are locked (API returns 403)
- **roundN_live:** organizer presses Start. Server sets `endsAt = now + durationSec`. Timer on phones counts down from `endsAt - serverTime`. Answers are rejected after `endsAt`
- **roundN_closed:** answers locked. Team sees its round results
- **finale:** leaderboard reveal
- Teams can still **join during round1_live** (they just get less time). Not after round 1 closes
- Organizer can manually move phases, extend the timer (+1 min), or pause
- Defaults: Round 1 = 10 min. Round 2 = 20 min. Both editable in `content/roundN.json`

---

## 4. Game rules

### Checkpoints

A round is a list of **checkpoints**. A checkpoint is a group of questions shown as a list, answerable in any order.

- Round 1 = 1 checkpoint (10 questions)
- Round 2 = 3 checkpoints, unlocked **in order**: Easy, Medium, Hard
- A team moves to the next checkpoint when it has answered everything in the current one **or skips it**
- Skipped questions score 0 and can't be revisited
- Skip is per team, not per person. Any teammate can press it (show a confirm dialog)

### Answering

- **MCQ:** 1 attempt, then locked
- **Text:** 3 attempts, 3 second cooldown between attempts, then locked
- Any teammate can answer. The **first correct answer locks the question for the whole team**
- Points are fixed per question. Wrong answers cost nothing

### Points

| Round | Questions | Points each | Max |
|---|---|---|---|
| Round 1 | 10 | 10 | 100 |
| Round 2, Easy | 4 | 10 | 40 |
| Round 2, Medium | 4 | 20 | 80 |
| Round 2, Hard | 4 | 30 | 120 |
| **Total** | 22 | | **340** |

### Answer matching (text)

Normalize both sides before comparing: lowercase, trim, collapse spaces, strip punctuation, drop a leading "the/a/an". Compare against every entry in `answers[]`.

### Stretch (v1.1, only if ahead of schedule)

Hints: optional `hint` field per question, costs 25% of the points for that team. Needs one extra endpoint.

---

## 5. Content spec

### Theme

Default theme so the whole thing feels like one product and not a quiz sheet:

- **Event codename:** *Mission Control* (rename freely)
- **Round 1: Campus Recon.** "Get to know the territory"
- **Round 2: Crack the Vault.** Checkpoints are **The Gate** (easy), **The Door** (medium), **The Vault** (hard)
- Tone: short, punchy, a bit of humor. No walls of text

All names/flavor text live in `content/theme.json` so the design team can change them without touching code.

### Rules for writing questions

1. Audience is **1st and 2nd years from every branch**. Zero domain knowledge: no CS, no formulas
2. Every question must be answerable from things a student has seen, or by pure logic
3. Prompt: max ~140 characters. MCQ options: max ~40 characters, exactly 4, no "all of the above"
4. Phone-friendly. No huge images. Small images/emoji are fine, inline in the prompt
5. Unambiguous. If two answers could be defended, rewrite it
6. **Every question is checked by a second person** before it goes in
7. Run `npm run validate:content` before every content PR

### Round 1 blueprint (10 questions, all 10 pts)

| # | Category | Level | Notes |
|---|---|---|---|
| 1-3 | **Campus 101** | Easy | Landmarks, canteen, blocks, basic facts every fresher knows |
| 4-6 | **Know the College** | Medium | Fests, traditions, rules, notable places and people |
| 7-8 | **Student Life** | Medium | Attendance, exams, canteen/hostel/commute humor. Universal |
| 9-10 | **About the Club** | Easy | Wings, what the club does. Doubles as marketing. Show the right answers in the recap |

Mostly MCQ. Two or three text answers are fine (one-word answers only).

### Round 2 blueprint (12 puzzles)

| Checkpoint | Points | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|---|
| **The Gate** (easy) | 10 | Rebus (emoji) | Anagram | Caesar cipher (shift given) | Number sequence (simple) |
| **The Door** (medium) | 20 | Symbol substitution (key given) | Odd one out | Riddle | Sequence (trickier pattern) |
| **The Vault** (hard) | 30 | Caesar cipher, shift *not* given, clue in prompt | Two-step: decode a cipher, answer the riddle it reveals | Riddle with a twist | Sequence with two interleaved patterns |

Hard rule: a puzzle should feel *solvable*. If nobody in a room of 5 smart people can crack it in 3 minutes, it's too hard for the Vault.

### Content JSON structure

`content/round2.json`:

```json
{
  "round": 2,
  "title": "Crack the Vault",
  "durationSec": 1200,
  "checkpoints": [
    {
      "id": "r2-cp1",
      "title": "The Gate",
      "difficulty": "easy",
      "skippable": true,
      "questions": [ /* question objects */ ]
    }
  ]
}
```

`content/round1.json` has the same shape with one checkpoint (`"skippable": false`).

### Question object

```json
// MCQ
{
  "id": "r1-q01",
  "type": "mcq",
  "kind": "campus",
  "prompt": "FILL ME: question text",
  "options": ["A", "B", "C", "D"],
  "answer": 2,
  "points": 10
}

// Text
{
  "id": "r2-q03",
  "type": "text",
  "kind": "caesar",
  "prompt": "Shift every letter back by 3:\nKHOOR",
  "answers": ["hello"],
  "points": 10
}
```

- `answer` (MCQ) = index into `options`. `answers` (text) = list of accepted strings
- `id` format: `r<round>-q<nn>`. IDs never change once the site is live
- `kind` is for analytics only (e.g. campus, caesar, rebus, riddle)
- Optional: `image` (data URI or asset path), `hint`, `explanation` (shown in the recap)

### Ready-to-use sample puzzles (all verified)

| Type | Prompt | Answer |
|---|---|---|
| Rebus (easy) | 🌧️ + 🏹 | rainbow |
| Anagram (easy) | Unscramble: R E H C A E T. Found in every classroom | teacher |
| Caesar (easy) | Shift back by 3: KHOOR | hello |
| Sequence (easy) | 2, 6, 12, 20, 30, ? | 42 |
| Symbol sub (medium) | Key: ▲=E ■=A ●=T ◆=S. Decode: ◆ ▲ ■ ● | seat |
| Odd one out (medium) | Mercury, Venus, Mars, Sirius | sirius |
| Riddle (medium) | I have keys but no locks, space but no room. You can enter, but you can't go outside. What am I? | keyboard |
| Caesar (hard) | FRQTXHU. Shift is 3. Find the word | conquer |

Content lead: write the rest in the same style.

### Validation script (`backend/src/scripts/validateContent.js`)

Must fail the build on:
- Duplicate IDs
- MCQ with `answer` outside `options`, or not exactly 4 options
- Text question with empty `answers`
- `points` missing or ≤ 0
- Prompt over 200 chars
- Round 2 checkpoints not in order

Should print: question count and total points per round (should say 100 and 240).

### Answer security

Content is loaded once at server start into memory. The API sends questions **without** `answer`/`answers`/`explanation`. Answers are never in the frontend bundle. Keep the repo private.

---

## 6. Data model (Postgres)

Questions stay in JSON. The DB only stores people and results.

```sql
teams        (id, name UNIQUE, join_code UNIQUE, created_at)
players      (id, team_id → teams, name, token UNIQUE, created_at)
submissions  (id, team_id, player_id, question_id, answer_text,
              is_correct, points_awarded, attempt_no, created_at)
             -- UNIQUE(team_id, question_id) WHERE is_correct = true
team_progress(team_id, checkpoint_id, status,   -- 'active' | 'completed' | 'skipped'
              updated_at, PRIMARY KEY (team_id, checkpoint_id))
event_state  (id = 1, phase, round_ends_at, leaderboard_mode, paused)
score_adjustments (id, team_id, delta, reason, created_at)
```

Team total = sum of correct `points_awarded` + sum of adjustments. Tiebreak = latest correct `created_at` (earlier wins).

---

## 7. API contract (v1)

All routes under `/api`. JSON in/out. Player routes use `Authorization: Bearer <token>`. Admin routes use `x-admin-key: <ADMIN_KEY from env>`.

Errors: `{ "error": { "code": "ROUND_LOCKED", "message": "Round hasn't started" } }`

| Method | Route | Body | Returns |
|---|---|---|---|
| POST | `/teams` | `{ teamName, playerName }` | `{ team, player, token, joinCode }` |
| POST | `/teams/join` | `{ joinCode, playerName }` | `{ team, player, token }` |
| GET | `/teams/me` | | team, members, total points |
| GET | `/state` | | `{ phase, round, endsAt, serverTime, leaderboardMode, paused }` |
| GET | `/rounds/:n` | | current checkpoint questions **without answers**, plus this team's status per question. 403 unless round is live |
| POST | `/questions/:id/answer` | `{ answer }` | `{ correct, pointsAwarded, attemptsLeft, locked }` |
| POST | `/checkpoints/:id/skip` | | `{ nextCheckpointId \| null }` |
| GET | `/rounds/:n/results` | | this team's per-question results plus explanations. Only when round is closed |
| GET | `/leaderboard` | | `{ top: [...10], me: { rank, points } }`. Respects `leaderboardMode` |

**Admin**

| Method | Route | Body | Does |
|---|---|---|---|
| GET | `/admin/overview` | | all teams: members, current checkpoint, points, last activity, question grid |
| GET | `/admin/teams/:id` | | full submission history |
| POST | `/admin/phase` | `{ phase }` | move phase |
| POST | `/admin/round/:n/start` | `{ durationSec? }` | start round |
| POST | `/admin/round/:n/extend` | `{ seconds }` | add time |
| POST | `/admin/pause` | `{ paused }` | pause/resume |
| POST | `/admin/leaderboard` | `{ mode }` | `live` \| `frozen` \| `hidden` |
| POST | `/admin/teams/:id/adjust` | `{ delta, reason }` | manual points |
| DELETE | `/admin/teams/:id` | | remove a troll team |
| GET | `/admin/export.csv` | | final standings |

FE and BE **both** read `docs/API.md` and don't change it without a PR that the PM approves. Frontend mocks these responses until the backend lands.

---

## 8. Frontend screens (participant)

1. **Join:** "Create team" or "Join with code"
2. **Lobby:** team name, big join code, member list, "waiting for the host..."
3. **Round:** header with timer and team points, checkpoint title, list of question cards (open, correct, locked, skipped states), Skip button with confirm
4. **Question card:** one tap to expand, answer input (text) or 4 big buttons (MCQ), instant feedback (correct/wrong/attempts left)
5. **Results:** points this round, per-question review with explanation, waiting for the next round
6. **Leaderboard:** top 10 with your team pinned at the bottom

UI rules: dark theme, min 16px text (stops iOS zoom on inputs), tap targets ≥ 44px, no hover-only interactions, no page over ~200KB gzipped, works after a refresh (state comes from the server, token from localStorage).

Polling: `/state` every 4s, `/leaderboard` every 5s (only on that screen). Question screens don't poll.

---

## 9. Organizer dashboard (`/admin`)

Login = paste the admin key. Three tabs:

1. **Control:** phase buttons (Start Round 1, Close, Start Round 2...), timer +1 min, pause, leaderboard mode switch, big "current phase" banner
2. **Overview (live tracking):** table of all teams with current checkpoint, points, last activity, and a mini question grid (green/red/grey per question). Sort and search. Highlights teams inactive for 2+ min. Refresh every 5s
3. **Team detail:** submission log, manual point adjust, remove team. Export CSV button

---

## 10. Load + reliability (200-500 phones)

- 500 phones polling `/state` every 4s is about 125 requests/sec. So **`/state` and `/leaderboard` must be served from an in-memory cache** (refresh the leaderboard every 3s), never straight from the DB
- Rate limit `/answer`: max 1 per 2s per team per question
- DB pool of at least 10, indexes on `submissions(team_id)` and `submissions(question_id)`
- Backend must persist state (phase, timers) so a restart mid-event doesn't lose it
- Load test with `autocannon` or `k6` at 500 virtual users on Day 4
- Have a plan B: keep an exported copy of the standings and a printed answer key

---

## 11. Git workflow

- `main` = protected, only gets merges from `dev`. `dev` = integration branch
- Branch off `dev`: `feat/<name>-<thing>`, `fix/<name>-<thing>`
- Commit style: `feat: ...`, `fix: ...`, `content: ...`, `docs: ...`
- Small PRs, at least one review, merged same day. **Pull `dev` every morning** and before opening a PR
- One owner per folder (see Ownership). Need to touch someone else's file? Ask first, or make a tiny PR they approve
- **Only the PM adds dependencies** (lockfile conflicts). Everyone else posts the package name in the group
- Never commit `.env`. Commit `.env.example`
- Content changes: PR must pass `validate:content`

---

## 12. Build order

**Day 1 (scaffold + contract). Nobody codes features until this is pushed**
- 2 people scaffold both apps, pre-wire all routes/pages with stubs, get a hello-world flowing frontend → backend → DB, push to `dev`
- Everyone else: PM finalizes `API.md`, content lead starts questions, someone sets up DB, hosting and env vars, and the theme/design tokens are decided (colors, font)

**Day 2 (core loop)**
- BE1: teams, auth, scoring, leaderboard. BE2: content loader, state machine, answer + skip
- FE1: Join, Lobby, Leaderboard, layout. FE2: Round page, question cards
- Admin floater: Control tab. Content lead: Round 1 done and validated

**Day 3 (finish + admin)**
- Round 2 content done. Overview dashboard, results screen, leaderboard modes, manual adjust
- Filler game if there's time. Start end-to-end testing with real phones

**Day 4 (break it)**
- Integration, bug bash, 500-user load test, dry run of a full event with 10+ people, fix, deploy, freeze `main`

---

## 13. Pre-event checklist

- [ ] Backend and frontend deployed, backend not sleeping
- [ ] `ADMIN_KEY` set and known by exactly 2-3 organizers
- [ ] Content validated. Totals read 100 and 240
- [ ] Tested on Android + iPhone, on mobile data and on venue wifi
- [ ] Phase controls rehearsed end to end by an organizer who didn't build it
- [ ] Load tested at 500 users
- [ ] Backup: exported standings + printed answer key + a manual tally sheet
- [ ] A QR code and a short URL on the big screen
