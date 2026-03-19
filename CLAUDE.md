# Semper Sorted — Project Brief for Claude Code

## What this is
A public-facing web app for USMC personnel and military families that surfaces personalized pay, housing, healthcare, education, and benefits info based on a user's profile.

**Live site:** sempersorted.com  
**GitHub:** github.com/lillianbrunacini-bot/marine-benefits-hub  
**Stack:** Single HTML file (`public/index.html`) + Vercel serverless API (`api/chat.js`, `api/analytics.js`, `api/dashboard.js`)  
**Deployment:** Push to GitHub main → Vercel auto-deploys

---

## Rules for making changes
- Always show a plan before making changes unless explicitly told to just do it
- Always commit and push after changes are approved
- Never expose the ANTHROPIC_API_KEY in frontend code — it lives only in Vercel environment variables
- Never break existing tab functionality when editing one tab
- Always test that JS functions don't have duplicates before adding new ones (this has caused bugs before)

---

## File structure
```
marine-benefits-hub/
├── public/
│   └── index.html        ← entire frontend (HTML + CSS + JS in one file)
├── api/
│   ├── chat.js           ← Anthropic API proxy with rate limiting (Redis)
│   ├── analytics.js      ← event tracking endpoint
│   └── dashboard.js      ← analytics dashboard (password protected)
└── package.json
```

---

## Design system
- **Primary color:** `#5a7a3a` (green, called `--coral` in CSS)
- **Light background:** `#f2f5ee` (`--coral-light`)
- **Mid tone:** `#c2d4a8` (`--coral-mid`)
- **Fonts:** Plus Jakarta Sans (body), Courier New (brand/headlines)
- **Icons:** Custom SVG line icons, `15x15` viewBox, stroke-based, `currentColor`
- **Cards:** White background, rounded corners, `--coral-light` panels

---

## Global state
```js
P = { grade, yos, housing, station, depcount }
```
Set on profile save, read everywhere.

---

## Key JS functions
| Function | What it does |
|---|---|
| `buildUI()` | Populates all pay/BAH rows from profile |
| `updateSidebarProfile()` | Updates sidebar name, station, pay amount |
| `saveProfile()` | Reads modal, updates P, calls buildUI + updateSidebarProfile + initFacilities + renderNews |
| `switchBase(val)` | Renders facilities dynamically from FACILITIES data object |
| `initFacilities()` | Resolves user's station to nearest base via resolveStation() |
| `resolveStation(s)` | Maps station string to BAH/facilities key |
| `renderNews()` | Renders base-specific news links from BASE_NEWS object |
| `buildSidebar()` | Renders nav items once, then calls updateSidebarProfile |
| `tab(id, el)` | Switches active tab, fires analytics track |
| `track(event, data)` | Fire-and-forget analytics POST to /api/analytics |
| `sendMsg()` | Sends AI chat message, enforces 500 char limit |
| `filterAcro(letter, btn)` | Filters acronym pills by first letter |

---

## 14 tabs
Home, Ask AI, Pay, Healthcare, Housing, Education, Spouse, Field Manual, Family, VA Benefits, Deals & Discounts, Base Facilities, Who To Call, Base News

---

## Data (all verified 2026)
- **Pay table:** E-1–E-9, W-1–W-5, O-1–O-8 (DFAS 2026)
- **BAH:** 7 bases × 2 tiers — Camp Pendleton, 29 Palms, Quantico, Camp Lejeune, MCAS Miramar, MCB Hawaii, Okinawa
- **BAS:** Enlisted $476.95 / Officer $328.48
- **VA disability:** All 6 levels, 3.2% COLA applied

### Station mapping
| Input | Maps to |
|---|---|
| Cherry Point, New River | Lejeune |
| Yuma | Pendleton |
| 8th and I | Quantico |
| Iwakuni, Camp Blaz | Okinawa |
| Other | Pendleton (default) |

---

## Backend / API
- `ANTHROPIC_API_KEY` — stored in Vercel environment variables only
- `REDIS_URL` — Vercel KV (redis-canary-yacht), free 30MB tier
- Rate limit: 50 AI messages per IP per day (persistent via Redis)
- Input limit: 500 characters max per AI message
- Analytics: logged to Redis `analytics:events` list, 30-day retention
- Analytics dashboard: `/api/dashboard?pw=semper` (password should be changed)

---

## Known issues / next priorities
1. Mobile responsiveness — sidebar needs to collapse on small screens
2. Rate limit analytics endpoint (currently unprotected)
3. Change analytics dashboard password from 'semper'
4. Add disclaimer on pay/benefits data
5. Privacy policy and terms of use pages
6. Expand BAH coverage beyond 7 bases
7. Interactive PCS checklist with saveable state
