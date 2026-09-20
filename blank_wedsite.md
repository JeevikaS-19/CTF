# Blank Website Guide (games-site)

For the 2 people building the base. Read this once, then go.

---

## What is a "blank website"?

A skeleton. Every page and every API route **exists and opens**, but does **nothing yet**.

Click around and you see pages saying `TODO: Join page`. Hit an API route and you get `{ "todo": "teams" }`. The frontend can talk to the backend, and the backend can talk to the database. That's the whole thing.

**Why we need it:** tomorrow 7 people start coding at once. If the structure doesn't exist, everyone invents their own and merging turns into a fistfight. The blank site is the floor plan. Nobody builds furniture until the walls are up.

---

## Who and when

- **2 people:** 1 frontend, 1 backend
- **Deadline:** end of Day 1. Earlier is better, everyone else is waiting on you
- **Everyone else:** hands off the repo until you post "pull dev"

---

## Your checklist

### Both of you (first)
- [ ] Create the repo `games-site`, branches `main` and `dev`, protect `main`
- [ ] Add `.gitignore` (node_modules, .env, build folders)
- [ ] Copy the folder structure from `SPEC.md` section 2. Don't improvise it

### Backend person
- [ ] Init `backend/`, install Express, CORS, dotenv, pg (or your DB client)
- [ ] `server.js` boots the app. `app.js` sets up middleware and mounts routes. `routes/index.js` mounts every route file
- [ ] Create **every** route file as a stub: `teams`, `state`, `rounds`, `answers`, `leaderboard`, `admin`
- [ ] Add `GET /api/health` that checks the DB connection
- [ ] Connect the DB and run the tables from `SPEC.md` section 6
- [ ] Add a basic error handler and a `.env.example`

### Frontend person
- [ ] Init `frontend/` with Vite + React + Tailwind
- [ ] `App.jsx` registers **every** route (list below). Each page is a stub showing its own name
- [ ] `api/client.js`: a fetch wrapper with the base URL from `.env` and the auth token header
- [ ] A basic `Layout`: dark background, phone-width container. Nothing fancy
- [ ] Home page calls `/api/health` and shows "Backend connected ✅"

### Together (last)
- [ ] Root `README.md`: how to run both apps in 3 commands, how to set up `.env`, the git rules
- [ ] `.github/CODEOWNERS` and `pull_request_template.md`
- [ ] Push to `dev`, post in the group: **"Scaffold is live, pull dev"**

---

## Routes to register

**Frontend pages**
`/` Join · `/lobby` · `/round/:n` · `/results/:n` · `/leaderboard` · `/admin/login` · `/admin/control` · `/admin/overview` · `/admin/teams/:id`

**Backend route files**
`teams` · `state` · `rounds` · `answers` · `leaderboard` · `admin`

---

## What a stub looks like

Backend:
```js
// routes/teams.js
import { Router } from "express";
const router = Router();
router.get("/", (req, res) => res.json({ todo: "teams" }));
export default router;
```

Frontend:
```jsx
// pages/Join.jsx
export default function Join() {
  return <div>TODO: Join page</div>;
}
```

That's the level of effort per file. Boring on purpose.

---

## Do NOT

- Build real features. Not even "just one small thing". That small thing is tomorrow's merge conflict
- Style anything beyond the basic layout. The design comes later
- Add libraries outside the stack in the spec
- Put logic in `App.jsx`, `app.js` or `routes/index.js`. They're wiring only, and after today nobody touches them
- Rename or move folders after you push

---

## You're done when

- [ ] A fresh clone runs by following the README in under 5 minutes
- [ ] Every page and route above opens
- [ ] The Home page shows "Backend connected ✅" (frontend → backend → DB works)
- [ ] Someone who did **not** build it can run it without asking you questions

If all four are true, push and announce it. Then go help someone, you're the ones who know the structure best.
