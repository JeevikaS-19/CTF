# What's Next

Scaffold is live. Every route exists, every page is a placeholder, the flow is clickable end-to-end.

Now 7 people can work in parallel without stepping on each other.

---

## Backend person — your turn

Everything in `src/shared/api/` currently returns fake hardcoded data.
Each function has a `// TODO(backend)` comment showing exactly what needs to happen.

**Your files:**
- `src/lib/supabase.ts` — already initialized. Wire it into the API functions below.
- `src/shared/api/teams.ts` — implement `joinTeam()`
- `src/shared/api/rounds.ts` — implement `getEventState()`
- `src/shared/api/questions.ts` — implement `getQuestion()` (anon role must NOT see the answer column)
- `src/shared/api/answers.ts` — implement `submitAnswer()` via Supabase RPC (server-side validation only)
- `src/shared/api/leaderboard.ts` — implement `getLeaderboard()`
- `src/shared/api/admin.ts` — implement `getAllTeamProgress()` and `setRoundStatus()`
- `supabase/migrations/` — create your tables here
- `supabase/seed/` — put questions + answers here (server-side only, never shipped to client)

**Suggested tables:** `teams`, `event_state`, `questions` (answer column hidden from anon), `submissions`, `leaderboard` (view).

**Answer checking:** use a Supabase RPC or edge function `submit_answer(roundId, qNum, response)`.
Never compare answers on the client. See `SCAFFOLD_SPEC.md` section 9.

**Leaderboard:** participants poll every 8000ms (`LEADERBOARD_POLL_MS`). Don't open a realtime channel per phone — save realtime for the organizer view. Check your Supabase plan's concurrent-connection limits against a 500-person audience.

**When you're done:** grep `TODO(backend)` to make sure nothing is left: `grep -r "TODO(backend)" src`

---

## Pair A — Round 1

**Your files:**
- `src/pages/rounds/round1/Round1Question.tsx` — real MCQ/text question UI, submit logic
- `src/pages/rounds/round1/Round1Done.tsx` — real round summary
- `src/content/round1.questions.ts` — add question prompts, options, points (NO answers, ever)

**Your API calls (already stubbed):**
```ts
import { getQuestion, submitAnswer } from '../shared/api';
const q = await getQuestion(1, qNum);
const result = await submitAnswer(1, qNum, userResponse);
```

**When you're done:** `grep -r "TODO(frontend)" src/pages/rounds/round1`

---

## Pair B — Round 2

**Your files:**
- `src/pages/rounds/round2/Round2Question.tsx` — real puzzle UI (cipher, rebus, riddle, etc.)
- `src/pages/rounds/round2/Round2Done.tsx` — real round summary
- `src/content/round2.questions.ts` — add puzzle prompts, media URLs, points (NO answers)

**Puzzle types available** (already in `shared/types.ts`):
`cipher`, `symbol-substitution`, `rebus`, `sequence`, `riddle`, `odd-one-out`, `anagram`

Same API calls as Pair A, just with `roundId = 2`.

**When you're done:** `grep -r "TODO(frontend)" src/pages/rounds/round2`

---

## Pair C — Admin / Organizer

**Your files:**
- `src/pages/admin/AdminLogin.tsx` — replace fake login with real auth
- `src/pages/admin/AdminDashboard.tsx` — summary stats
- `src/pages/admin/AdminTeams.tsx` — per-team progress table using `getAllTeamProgress()`
- `src/pages/admin/AdminRoundControl.tsx` — open/close rounds using `setRoundStatus()`

**When you're done:** `grep -r "TODO(frontend)" src/pages/admin`

---

## Frontend UI owner

**Your files:**
- `src/theme/tokens.css` — replace placeholder token values with real design (colors, spacing, radius, font)
- `src/components/ui/` — build your component library here (buttons, inputs, cards, etc.)
- Visual layer of every page — once pairs A/B/C have structure, layer in the real design

Don't touch routes, shared/, layouts/, or guards without a PR to the scaffold owner.

---

## Whoever has capacity — Filler Games

**Your files:**
- `src/pages/games/GameHub.tsx` — real games list UI
- `src/pages/games/GameShell.tsx` — wire up `registry.ts` to dynamically mount the right game
- `src/pages/games/registry.ts` — add your game entries here (lazy imports)

Build each mini-game in its own subfolder under `src/pages/games/`.

---

## Quick reference

```bash
# Find your todos
grep -r "TODO(backend)" src
grep -r "TODO(frontend)" src
grep -r "TODO(content)" src

# Before every push
npm run lint       # must pass with 0 warnings
tsc --noEmit       # must pass with 0 errors
git pull --rebase origin main

# Dev server
npm run dev        # http://localhost:5173
# Dev route map
# http://localhost:5173/__routes  ← every route as a clickable link
```

---

## Rules reminder

- Only touch files in **your own area** (see `README.md` ownership table and `CODEOWNERS`)
- `src/routes.tsx`, `src/shared/`, `src/layouts/`, `src/guards/`, `package.json` — scaffold-owner territory. Need a change? Open a PR or ask
- Never commit `.env`
- No answer data anywhere in `src/` — ever
- Small, frequent commits. `git pull --rebase` before every push
