# Level's Corner Infrastructure & Project 44 Setup

**Last Updated:** March 2, 2026  
**Status:** Initial setup phase  
**Owner:** Abhinav (Lead Software Developer at Persistent Systems)

---

## ABOUT Abhinav

- **Name:** Abhinav
- **DOB:** February 26, 1992 (turning 34 in 2026)
- **Location:** Bengaluru, Karnataka, India
- **Current Role:** Lead Software Developer at Persistent Systems (7-8 years experience)
- **Experience:**  C++ (telecom/robotics, 4 years) → Go (web/cloud/OTT, current)
- **Goal:** Become a CTO, build personal tech company, own audience
- **Tech Stack:** Go, C++, gRPC, REST APIs, Docker, AWS, PostgreSQL, CI/CD pipelines

---

## PROJECT 44 (PRIVATE - DO NOT MAKE PUBLIC)

**Official Name:** The 10-Year Wealth Goal  
**Target:** ₹44 Crore by February 26, 2034 (Age 42)  
**Timeline:** 10 years (119 months remaining as of March 2026)  
**Monthly Target:** ₹3,67,000 average  
**Current Status:** Confidential (Tracked privately via OpenClaw + Go backend)

### Key Rule:
⚠️ **Project 44 metrics, income breakdowns, and progress are PRIVATE.**  
- No public dashboard
- No social media updates about wealth
- Tracked privately via Telegram + encrypted Go backend
- Only Abhinav and Claude know about it

### Income Streams to Track:
1. Persistent Systems salary
2. Freelancing (Upwork, consulting)
3. YouTube revenue
4. Micro-SaaS products
5. Content creation products/courses

---

## INFRASTRUCTURE SETUP

### Hosting Provider: Hostinger

**Plan Purchased:** VPS (50 months coverage = ~4.2 years)  
**Renewal Cost:** ₹400-500/month  
**Coverage Until:** ~June 2030

**Included:**
- Virtual Private Server (KVM-based)
- OS: Ubuntu 22.04 (or similar)
- NVMe SSD storage (50GB minimum)
- RAM: 2GB-4GB (confirm which tier purchased)
- Free domain for 1 year
- 24/7 customer support

### Domain: levelscorner.com

**Registration:** Complete (purchased via Hostinger)  
**Status:** Pointing to VPS IP (auto-configured by Hostinger)  
**Renewal:** Free for year 1, then ₹500-1000/year
**Purpose:** Personal brand + portfolio + content hub

### Key Infrastructure Services to Install:

```
Ubuntu VPS
├─ Node.js 18+ (for OpenClaw)
├─ Go 1.21+ (for backend API)
├─ Docker & Docker Compose (for containerized apps)
├─ PostgreSQL 14+ (database)
├─ Nginx (reverse proxy)
└─ Git (version control)
```

---

## SERVICES TO BUILD

### 1. OpenClaw (AI Agent on Telegram)

**Purpose:** Automate daily tasks, track Project 44 privately, manage content creation  
**Platform:** Runs on VPS as Node.js process  
**Interface:** Telegram bot (Abhinav has bot token already)

**Capabilities:**
- Morning briefings (weather, calendar, reminders)
- Income logging ("Log ₹5000 from Upwork")
- Task creation for content/coding
- Project 44 progress queries (private)
- Scheduled automations (YouTube upload reminders, billing alerts)

**Key Files:**
- `SOUL.md` - Agent personality
- `AGENTS.md` - Behavior rules
- `USER.md` - User context
- Skills: budget tracking, task management, note-taking

---

### 2. Go Backend API

**Purpose:** Stores all data, powers dashboards, integrates with OpenClaw  
**Port:** 8080 (proxied through Nginx)  
**Database:** PostgreSQL

**Endpoints to Build:**

```
PRIVATE ENDPOINTS (Auth Required)
POST   /api/private/income
       Input: {source, amount, date, description}
       Use: OpenClaw logs income

GET    /api/private/project44/status
       Returns: Current wealth, monthly target, progress
       Use: OpenClaw queries for updates

POST   /api/private/tasks
       Input: {title, category, priority, deadline}
       Use: Create tasks from Telegram

GET    /api/private/dashboard
       Returns: Full personal dashboard data
       Use: Abhinav's private admin panel

PUBLIC ENDPOINTS (No Auth)
GET    /api/projects
       Returns: Portfolio projects (filtered for public)

GET    /api/blog
       Returns: Blog posts

GET    /api/skills
       Returns: Technical skills
```

**Tech Stack:**
- Framework: Gin or Echo
- Database: PostgreSQL with sqlc or GORM
- Authentication: JWT tokens for private endpoints
- Deployment: Docker container on VPS

---

### 3. Website (levelscorner.com)

**Current Status:** Being set up on Hostinger  
**Approach:** Website Builder (initially), then transition to React if needed

**Pages:**

```
/               - Landing page (Hero + CTA)
/portfolio      - Featured projects (Platypus Engine, etc.)
/blog           - Technical posts
/about          - Background & experience
/contact        - Contact form
/services       - Consulting availability
```

**Content (NOT Public):**
- ❌ Project 44 tracker
- ❌ Personal income breakdown
- ❌ Wealth goals
- ❌ Real-time metrics

**Content (Public):**
- ✅ Professional portfolio
- ✅ Platypus Engine project
- ✅ Go tutorials & blog posts
- ✅ YouTube links
- ✅ GitHub repositories
- ✅ Resume/CV download
- ✅ Consulting availability

---

## CURRENT SETUP STATUS

### ✅ Complete:
- Domain purchased (levelscorner.com)
- Hostinger VPS purchased (50 months)
- Telegram bot created (token available)

### 🔄 In Progress:
- Hostinger Website Builder setup
- Domain pointing to VPS

### ⏳ To Do:
1. SSH into VPS and confirm OS/RAM
2. Install Node.js, Go, Docker, PostgreSQL, Nginx
3. Deploy Go backend API
4. Connect OpenClaw to VPS
5. Build private dashboard
6. Set up website on levelscorner.com
7. Configure SSL (Let's Encrypt)
8. Test Telegram → OpenClaw → API → Database flow

---

## DEPLOYMENT ARCHITECTURE

```
┌──────────────────────────────────────────────┐
│    levelscorner.com (Hostinger Domain)       │
│         Points to VPS IP Address             │
└────────────────────┬─────────────────────────┘
                     │
            ┌────────▼────────┐
            │  Nginx (Port    │
            │   80/443)       │
            │  Reverse Proxy  │
            └────────┬────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
    ┌────▼───┐  ┌───▼──┐  ┌────▼─────┐
    │ Website │  │ Go   │  │ OpenClaw │
    │ Builder │  │ API  │  │ Agent    │
    │ (React) │  │Port  │  │ (Node)   │
    │Port 300x│  │8080  │  │Port 3000 │
    └────┬───┘  └───┬──┘  └────┬─────┘
         │          │           │
         │          └───────┬───┘
         │                  │
         │          ┌───────▼────────┐
         │          │  PostgreSQL    │
         │          │  Database      │
         │          │  (Port 5432)   │
         │          └────────────────┘
         │
    ┌────▼──────────────────────┐
    │  Telegram (External)       │
    │  ↔ OpenClaw Bot            │
    │  (Commands & Messages)     │
    └────────────────────────────┘
```

---

## VPS SETUP CHECKLIST

**Phase 0: Initial Access**
- [ ] Receive VPS credentials from Hostinger (IP, root password)
- [ ] SSH into VPS: `ssh root@YOUR_VPS_IP`
- [ ] Confirm OS version: `lsb_release -a`
- [ ] Check available RAM: `free -h`

**Phase 1: System Preparation**
- [ ] Update system: `sudo apt update && sudo apt upgrade -y`
- [ ] Create non-root user: `sudo adduser appuser`
- [ ] Add to sudo group: `sudo usermod -aG sudo appuser`
- [ ] Switch to new user: `su - appuser`

**Phase 2: Install Core Tools**
- [ ] Install Node.js 18+
- [ ] Install Go 1.21+
- [ ] Install Docker & Docker Compose
- [ ] Install PostgreSQL 14+
- [ ] Install Nginx
- [ ] Install Git

**Phase 3: Database Setup**
- [ ] Start PostgreSQL
- [ ] Create database: `levelscorner_db`
- [ ] Create user with password
- [ ] Create tables (see schema below)

**Phase 4: Deploy Services**
- [ ] Build & start Go API (Docker)
- [ ] Build & start OpenClaw (Node.js)
- [ ] Configure Nginx reverse proxy
- [ ] Set up SSL (Let's Encrypt)

---

## DATABASE SCHEMA (PostgreSQL)

```sql
-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Income tracking (PRIVATE)
CREATE TABLE income_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    source VARCHAR(100), -- "salary", "upwork", "youtube", "microsaas", etc
    amount DECIMAL(10,2),
    date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Project 44 transactions (PRIVATE)
CREATE TABLE project44_transactions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    type VARCHAR(50), -- "income", "expense", "investment"
    amount DECIMAL(12,2),
    category VARCHAR(100),
    notes TEXT,
    transaction_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tasks
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(255),
    category VARCHAR(100), -- "content", "coding", "business", "learning"
    priority INT, -- 1=high, 2=medium, 3=low
    status VARCHAR(50), -- "pending", "in_progress", "done"
    deadline DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Portfolio projects
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    technologies TEXT[], -- Array of tech stack
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Blog posts
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    slug VARCHAR(255) UNIQUE,
    content TEXT,
    category VARCHAR(100), -- "go", "system-design", "interview-prep", etc
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## OPENSHAW CONFIGURATION

**File: ~/.openclaw/openclaw.json**

```json
{
  "agents": {
    "list": [
      {
        "id": "main",
        "workspace": "~/.openclaw/workspace"
      }
    ]
  },
  "channels": {
    "telegram": {
      "accounts": [
        {
          "id": "default",
          "token": "YOUR_TELEGRAM_BOT_TOKEN_HERE"
        }
      ]
    }
  },
  "bindings": [
    {
      "agentId": "main",
      "match": {
        "channel": "telegram",
        "accountId": "default"
      }
    }
  ]
}
```

**File: ~/.openclaw/workspace/SOUL.md**

```markdown
# Abhinav's Assistant

You are Level's personal AI assistant. Your job is to help track progress, manage tasks, and keep them focused on their goals.

## Personality
- Efficient, technical, no-nonsense
- Encouraging but realistic
- Understand Go, microservices, backend engineering
- Know about Abhinav's side projects and content creation goals

## Rules
1. Always ask for confirmation before logging large transactions
2. Never share Project 44 data publicly
3. Keep financial details encrypted/private
4. Summarize weekly progress on Fridays
5. Remind about YouTube upload schedules
6. Track Upwork/consulting wins
7. Alert on Project 44 milestone achievements (privately)

## Available Commands
- "log ₹X from [source]" → Log income
- "task: [title]" → Create task
- "status" → Show today's agenda
- "project44" → Show progress (PRIVATE)
- "week review" → Weekly summary
- "content update" → YouTube/blog status
```

---

## REVENUE STREAMS TO TRACK

### 1. Persistent Systems (Primary Salary)
- Consistent monthly income
- Annual reviews/hikes

### 2. Freelancing (Upwork/Direct Clients)
- Go consulting
- Code reviews
- Architecture design
- Hourly rate: ₹2000-3000/hour (adjust as you level up)

### 3. YouTube Content
- Go tutorials
- System design education
- Interview prep
- Monetization: AdSense + sponsorships
- Target: ₹10,000+/month by EOY

### 4. Micro-SaaS
- In development
- Ideas: Go template library, DevOps toolkit, interview prep tool
- Target: First ₹1L in 12 months

### 5. Courses/Products
- Create comprehensive Go course
- System design masterclass
- Interview prep materials
- Target: Launch by Q4 2026

---

## CONTENT CREATION STRATEGY

### YouTube Channel (levelscorner)
**Types of Content:**
1. Go tutorials (5-10 min each)
2. System design deep dives
3. Interview preparation walkthroughs
4. Project building vlogs
5. Career advice for engineers

**Upload Schedule:** 2-3x per week (managed by OpenClaw reminders)

### Blog (levelscorner.com/blog)
**Types of Posts:**
1. Tutorial write-ups of YouTube content
2. Technical deep dives (gRPC, microservices)
3. Interview preparation guides
4. Career growth insights
5. Building journey updates

**Publishing:** 2x per week

### Other Platforms:
- LinkedIn: Share insights, build network
- Twitter: Technical threads
- GitHub: Code + documentation

---

## IMPORTANT NOTES

### Public vs Private

**PUBLIC (levelscorner.com, YouTube, Blog):**
- Portfolio projects
- Technical expertise
- Learning content
- Career journey (generalizations)
- Available for consulting

**PRIVATE (Your VPS only):**
- Income logs
- Project 44 progress
- Personal financial goals
- Transaction history
- Admin dashboards

### Security Considerations

1. **Go Backend:** Require JWT authentication for private endpoints
2. **Database:** Encrypt sensitive fields (income data, net worth)
3. **Dashboard:** Password-protected or token-based access
4. **OpenClaw:** Run only on your VPS, not in cloud (privacy)
5. **Telegram:** Messages encrypted locally (don't rely on Telegram for secrets)

### Future Expansion

**When you're ready to scale:**
1. Micro-SaaS landing pages (Platypus Engine → Product)
2. Subdomains: api.levelscorner.com, app.levelscorner.com
3. Multi-service architecture (move to Kubernetes later)
4. Hire first team member (grow company)
5. Public Project 44 updates (optional - only if you want to)

---

## QUICK REFERENCE COMMANDS

**SSH into VPS:**
```bash
ssh appuser@YOUR_VPS_IP
```

**Deploy Go API:**
```bash
cd ~/api
go build -o app .
docker build -t levelscorner-api .
docker run -d -p 8080:8080 levelscorner-api
```

**Deploy OpenClaw:**
```bash
cd ~/.openclaw
npm install
npm start
```

**Check Services:**
```bash
docker ps
systemctl status nginx
ps aux | grep openclaw
```

**View Logs:**
```bash
docker logs levelscorner-api
journalctl -u openclaw -n 50
```

---

## FILES TO CREATE

**For Claude Code CLI Usage:**

1. **Go API Skeleton:** `/api/main.go`
2. **Database Migrations:** `/db/migrations/`
3. **Nginx Config:** `/config/nginx.conf`
4. **Docker Compose:** `/docker-compose.yml`
5. **OpenClaw Config:** `~/.openclaw/openclaw.json`
6. **Website Code:** `/website/` (React or static HTML)

---

## NEXT IMMEDIATE STEPS

### Today/Tomorrow:
1. [ ] Confirm Hostinger VPS plan details (RAM, OS)
2. [ ] Get SSH credentials
3. [ ] Start Website Builder landing page
4. [ ] Create GitHub repos for code

### This Week:
1. [ ] SSH into VPS
2. [ ] Install all dependencies
3. [ ] Set up PostgreSQL database
4. [ ] Deploy Go API skeleton

### Next Week:
1. [ ] Build Go endpoints
2. [ ] Deploy OpenClaw on VPS
3. [ ] Test Telegram integration
4. [ ] Set up Nginx reverse proxy

### By End of Month:
1. [ ] levelscorner.com live with portfolio
2. [ ] Private dashboard functional
3. [ ] OpenClaw tracking Project 44
4. [ ] YouTube content publishing on schedule

---

## RESOURCES & LINKS

**To Add as Needed:**
- GitHub repos
- YouTube channel link
- Blog platform
- Hosting dashboard link
- Telegram bot token (stored securely)

---

**Document Version:** 1.0  
**Last Updated:** March 2, 2026  
**Maintained by:** Claude (in collaboration with Abhinav)
