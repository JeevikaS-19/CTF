# Games Site — Scaffold

> **Scaffold status:** blank base. Every route exists and renders a placeholder. No real features yet.

---

## Quick Start (3 commands)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Open .env and fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
# (get these from the Supabase project dashboard)

# 3. Start the dev server
npm run dev
```

Open http://localhost:5173 — you should see the Landing placeholder.

Visit http://localhost:5173/__routes to see **every route** as a clickable link.

---

## Other Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + Vite production build |
| `npm run lint` | ESLint check (must pass with 0 warnings) |
| `npm run format` | Prettier format all `src/**` files |

> **Before pushing:** run `npm run lint` and `tsc --noEmit`. Both must pass clean.

---

## Folder Ownership

Each area is owned by a pair. Only touch files inside your own area.

| Area | Folders / Files | Owner |
|---|---|---|
| Scaffold / template | `src/routes.tsx`, `src/layouts/`, `src/guards/`, `src/components/Placeholder.tsx`, config files | Web template (TBD) |
| UI design | `src/components/ui/`, `src/theme/` | Frontend UI (TBD) |
| Backend + Supabase | `supabase/`, `src/lib/supabase.ts`, `src/shared/api/*` | Backend (TBD) |
| Round 1 | `src/pages/rounds/round1/`, `src/content/round1.questions.ts` | Pair A (TBD) |
| Round 2 | `src/pages/rounds/round2/`, `src/content/round2.questions.ts` | Pair B (TBD) |
| Admin/organizer | `src/pages/admin/` | Pair C (TBD) |
| Filler games | `src/pages/games/` | Whoever has capacity (TBD) |

> **`@TBD`** — fill in names/GitHub handles in `CODEOWNERS` when assigned.

---

## Working Agreement

### Branches
- `main` — scaffold only. Protected. Do **not** push directly.
- Branch per area: `feat/round1`, `feat/round2`, `feat/admin`, `feat/backend`, `feat/ui`

### Rules
- Only touch files inside **your own area's folders** (see table above).
- `src/routes.tsx`, `src/shared/`, `src/layouts/`, `src/guards/`, and `package.json` are **scaffold-owner territory**. Need a new route, type, or dependency? Open a tiny PR or ask — don't edit in place.
- Run `git pull --rebase origin main` before starting work and before every push.
- Small, frequent commits. No giant end-of-day dumps.
- No reformat-only commits. Prettier config is committed; use format-on-save in your editor.
- **Never commit `.env`.**

---

## Architecture Notes (for new joiners)

### How routing works
All routes are declared in `src/routes.tsx` only. Pages never declare their own routes.
Use `ROUTES.*` path-builders from `src/shared/constants.ts` — never hardcode path strings.

### How API calls work (now vs. later)
All `src/shared/api/*` functions currently return **hardcoded fake data** with a `// TODO(backend)` marker. When the backend is ready, the backend owner replaces the function body with a real Supabase call. No page code needs to change — the contract (function signature + return type) stays the same.

### Session
`src/shared/session.ts` — reads/writes `localStorage`. Every access is `try/catch`-wrapped.
- `getSession()` returns `Session | null`
- `setSession(s)` saves a session
- `clearSession()` logs out

### Guards
- `RequireTeam` — redirects to `/join` if no session
- `RequireAdmin` — redirects to `/admin/login` if `session.isAdmin` is falsy

### Answers are server-side only
The `Question` type has **no `answer` field**. Correct answers are validated by a Supabase RPC/edge function (`submit_answer`). Never compare answers client-side. See `SCAFFOLD_SPEC.md` section 4.

---

## Backend Notes (do NOT implement in scaffold — wired in later)

Suggested Supabase tables:
- `teams` — team records
- `event_state` — single-row table: current round, round statuses
- `questions` — includes `answer` column, **not readable by anon role**
- `submissions` — per-team answers
- `leaderboard` — aggregated view

Answer checking: Supabase RPC `submit_answer(roundId, qNum, response)` — never client-side.

Leaderboard: participants **poll** `getLeaderboard()` every `LEADERBOARD_POLL_MS` (8000ms). Reserve realtime for the organizer view. Check concurrent-connection limits on your Supabase plan for 500 audience members.

---

## Finding your TODO items

```bash
# Frontend work
grep -r "TODO(frontend)" src

# Backend work  
grep -r "TODO(backend)" src

# Content work (questions to add)
grep -r "TODO(content)" src
```

---

## Decisions made during scaffold

- `// DECISION: createClient is called once as a module singleton` (see `src/lib/supabase.ts`) — avoids multiple connections if the module is imported multiple times.
- `// DECISION: gameRegistry uses lazy ComponentType` (see `src/pages/games/registry.ts`) — enables code splitting so each mini-game is a separate bundle chunk.
- `// DECISION: RouteIndex resolves param-based routes to example values` (`:roundId` → `1`, `:qNum` → `1`, `:gameId` → `demo`) — makes the dev page actually clickable without real data.
