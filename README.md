# Crypton Club — cryptonclub

Official website for **Crypton Club**, a student cybersecurity community at Mangalore Institute of Technology & Engineering (MITE).

Cyber-themed React + Vite frontend with an Express + MongoDB backend for events, members, achievements, blogs, and CTF writeups. Deploys to Vercel with serverless API routes.

> Security note: this repo is intentionally secret-free. Copy `.env.example` to `.env` locally and never commit real connection strings. See `MONGODB_SETUP.md` / `VERCEL_DEPLOYMENT.md` for setup.

## Features

- Home with upcoming events, achievements, and members highlights
- Events listing and management
- Members directory
- Achievements showcase
- Blog + blog post pages (Markdown with GFM + syntax highlighting)
- CTF writeups + writeup detail pages
- Simple admin login flow (`context/AuthContext.tsx`) with CRUD via API
- Data layer with local JSON fallback (`data/`, `src/data/`) and MongoDB persistence (`server/`)

## Tech stack

- Frontend: React 18, React Router 6, Vite 6, Tailwind CSS, lucide-react, react-markdown
- Backend: Express 4, MongoDB Node driver 6, dotenv, CORS
- Deployment: Vercel (SPA rewrites + `/api` serverless function in `api/index.js`), `vercel.json` included
- Local dev API: `server.js` (JSON-file backend on :3001) and `server/server.js` (MongoDB backend on :3001)

## Project structure

```
.
├── App.tsx                 # Router + layout + footer
├── index.tsx / index.html / index.css / tailwind.config.js / vite.config.ts
├── components/             # Navbar, Modal, TerminalCard, ...
├── pages/                  # Home, Events, Members, Achievements, Blog, BlogPost, Writeups, WriteupDetail, Login, NotFound
├── context/ / src/context/ # AuthContext, DataContext
├── data/ / src/data/ / server/data/  # JSON seed / fallback data (events, members, achievements, blog)
├── types.ts
├── server.js               # Simple JSON-file API server (local dev)
├── server/
│   ├── server.js           # MongoDB API server (CRUD for events/members/achievements/blog/writeups)
│   ├── seed-data.js / migrate-data.js
│   └── package.json
├── api/
│   ├── index.js            # Vercel serverless entry
│   └── [...path].js
├── public/                 # crypton-logo.png, mite-logo.png
├── MONGODB_SETUP.md / BACKEND_SETUP.md / VERCEL_DEPLOYMENT.md
└── test-api.bat / test-api.sh
```

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas cluster (or local `mongodb://localhost:27017`) for the Mongo backend

## Quick start

```bash
# 1. Clone
git clone https://github.com/sujalmh/cryptonclub.git
cd cryptonclub

# 2. Frontend deps
npm install

# 3. Backend deps (Mongo API)
cd server && npm install && cd ..

# 4. Env (never commit .env)
cp .env.example .env
cp server/.env.example server/.env
# Edit .env / server/.env:
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
# PORT=3001
```

### Run locally

Option A — Vite + Mongo backend:

```bash
# terminal 1: Mongo API
cd server && npm run dev
# or: npm run server from repo root (runs cd server && npm start)

# terminal 2: frontend (proxies /api -> http://localhost:3001)
npm run dev
```

Then open `http://localhost:5173`.

Option B — all-in-one (concurrently):

```bash
npm run dev:all
```

Option C — simple JSON-file backend (no Mongo needed):

```bash
node server.js
# serves API on :3001, serves dist/ if built
```

### Build / preview

```bash
npm run build
npm run preview
```

## API overview

Mongo backend (`server/server.js`, also exposed via `api/` on Vercel):

- `GET/POST /api/events`, `PUT/DELETE /api/events/:id`
- `GET/POST /api/members`, `PUT/DELETE /api/members/:id`
- `GET/POST /api/achievements`, `PUT/DELETE /api/achievements/:id`
- `GET/POST /api/blog`, `PUT/DELETE /api/blog/:id`
- `GET/POST /api/writeups`, `GET /api/writeups/:id`, `PUT/DELETE /api/writeups/:id`

Collections auto-created if missing: `events`, `members`, `achievements`, `blog`, `writeups` in DB `crypton_club`.

CORS allows `http://localhost:5173`, `http://localhost:3000`, `https://crypton-club.xyz`, `https://www.crypton-club.xyz`, and `*.vercel.app`.

Test helpers: `test-api.sh` / `test-api.bat`.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import into Vercel as a Vite project (build: `npm run build`, output: `dist`).
3. Set env var `MONGODB_URI` in Vercel → Project → Settings → Environment Variables (Production + Preview + Development).
4. Deploy. SPA routing and `/api/*` rewrites are already in `vercel.json`.

Full steps in `VERCEL_DEPLOYMENT.md`. Mongo Atlas setup in `MONGODB_SETUP.md`.

## Env vars

| Var | Where | Required | Default |
|-----|-------|----------|---------|
| `MONGODB_URI` | root `.env`, `server/.env`, Vercel | Yes for Mongo backend | `mongodb://localhost:27017` fallback in code |
| `PORT` | `server/.env` | No | `3001` |

See `.env.example` and `server/.env.example`.

## Contributing

1. Create a branch, make changes without committing `.env`.
2. Ensure `npm run build` passes.
3. Open a PR.

## Origin

Clean public export of `sujalmh/crypton-club` with secrets removed and history reset. Original `.env` files and AI-Studio boilerplate README were stripped.
