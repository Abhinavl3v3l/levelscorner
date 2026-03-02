# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**levelscorner** is Abhinav's personal brand website — portfolio, blog, courses, and private goal tracking. Hosted at `levelscorner.com` on a Hostinger VPS (Ubuntu 22.04).

This is also a **learning project** — Abhinav intentionally wants full control over frontend and backend. Decisions should favor understanding over shortcuts.

## Monorepo Structure

```
levelscorner/
├── frontend/           # Next.js (React) — public website
│   └── Dockerfile
├── backend/            # Go API — data layer
│   └── Dockerfile
├── nginx/
│   └── nginx.conf      # reverse proxy
├── docker-compose.yml  # local + production orchestration
└── CLAUDE.md
```

Future: migrate to Kubernetes when scale demands it.

## Architecture

```
levelscorner.com (HTTPS)
└── Nginx (80/443)
    ├── /        → Next.js frontend (Port 3000)
    └── /api/*   → Go backend     (Port 8080)
                      └── PostgreSQL (Port 5432)
```

All services run as Docker containers. Nginx handles TLS termination and reverse proxying.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (React), TypeScript |
| Backend | Go 1.21+, Gin or Echo |
| Database | PostgreSQL 14+ |
| ORM/Query | sqlc or GORM |
| Auth | JWT (private endpoints only) |
| Proxy | Nginx + Let's Encrypt |
| Containers | Docker + Docker Compose (→ Kubernetes later) |

## Commands

### Development (local)
```bash
docker compose up --build        # start all services
docker compose up frontend       # frontend only
docker compose up backend        # backend only
docker compose logs -f           # tail logs
```

### Go backend
```bash
cd backend
go build -o app .
go test ./...
go test ./... -run TestName      # single test
```

### Next.js frontend
```bash
cd frontend
npm install
npm run dev                      # dev server
npm run build && npm start       # production
```

### VPS deployment
```bash
ssh appuser@YOUR_VPS_IP
docker compose pull && docker compose up -d
docker logs levelscorner-backend
journalctl -u nginx -n 50
```

## API Endpoints

**Public (no auth):**
- `GET /api/projects` — portfolio projects
- `GET /api/blog` — blog posts
- `GET /api/skills` — tech skills

**Private (JWT required):**
- `GET  /api/private/dashboard` — personal dashboard
- `POST /api/private/income` — log income
- `GET  /api/private/project44/status` — wealth goal progress
- `POST /api/private/tasks` — create task

## Public vs Private Content

**Public** (`levelscorner.com`): portfolio, blog, skills, about, contact, YouTube links.

**Private** (auth-only): income logs, Project 44 wealth tracking (₹44 Crore goal by 2034), personal dashboard. **Never expose these publicly — no public dashboard, no social sharing.**

## Security (baked in from day one)

- **Nginx:** HTTPS only (Let's Encrypt), `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `CSP` headers, rate limiting on `/api/*`
- **Go API:** JWT middleware on private routes, input validation on all handlers, CORS locked to `levelscorner.com`
- **Next.js:** CSP headers, no API keys in browser bundle
- **Docker:** non-root users inside containers, secrets via env vars (never baked into images), `.env` files not committed

## Database Schema

Tables: `users`, `projects`, `blog_posts`, `skills`, `income_logs` (private), `project44_transactions` (private), `tasks`. Full DDL in `levelcorner_context.md`.

## Site Structure

```
/               Landing page — hook + nav to sections (brand: levelscorner)
/about          Full story, experience timeline, skills (identity: Abhinav Rana)
/projects       All projects (empty for now, SeeCV added later)
/blog           Blog posts (empty for now, ready for content)
/contact        Links + contact form

— later —
/courses
/dashboard      Private, auth-protected
```

Landing page is intentionally lean: hero, brief pitch, preview cards linking to each section.

## Content: Abhinav Rana

**Tagline:** "Backend engineer. Built from C++ and systems thinking. Now building microservices in Go."

**Career arc:** Systems programming (C++, signal processing) → Robotics/hardware (humanoid robots, built from scratch) → Go microservices (servers, gRPC, gateways, Envoy, distributed systems)

**Positioning:** Skills over domains — C++ grounding → robotics depth → Go microservices focus. Not domain-specific.

**Experience:**
- Lead SDE @ Persistent (Oct 2024–now) — Go, OTT/subscription microservices (Vuclip), CI/CD security (NewRelic)
- Senior SDE @ CSG (Dec 2023–Oct 2024) — Go, payment/reservations microservice
- Software Developer @ MachaniRobotics (Jan 2021–Dec 2023) — Genesis engine, Gaia (Go gRPC gateway), ApexDrive (C++ limb driver), humanoid robots
- Software Developer @ Oracle (Jul 2018–Dec 2020) — vSTP, C++, systems programming

**Core skills:** Go · C++ · gRPC · REST · GraphQL · PostgreSQL · Docker · AWS · Nginx · Envoy · CI/CD

**Personal projects:** SeeCV (Go + OpenAI + PostgreSQL resume parser) — skip for phase 1, add later

**Education:** M.Sc Computer Science, Amrita University (CGPA 8)

## Phase 1 Goal

Scaffold and deploy:
- Multi-page Next.js frontend (landing, about, projects, blog, contact)
- Go API seeded with portfolio data
- Everything running in Docker on VPS via Nginx
- HTTPS configured

Blog posts, courses, private dashboard — later iterations.

## OpenClaw (Telegram AI Agent)

Separate Node.js service on VPS (`~/.openclaw/`). Not part of this repo. Connects to Go backend to log income, query Project 44 status, manage tasks via Telegram.
