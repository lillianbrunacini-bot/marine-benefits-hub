# Marine Benefits Hub

USMC benefits reference app — pay, BAH, TRICARE, education, and VA benefits in plain English. Powered by Claude AI.

---

## Deploy to Vercel (10 minutes)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/marine-benefits-hub.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Leave all build settings as default (Vercel auto-detects the `public/` folder)
4. Click **Deploy**

### 3. Add your API key (the important step)

1. In Vercel dashboard → your project → **Settings → Environment Variables**
2. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key from [console.anthropic.com](https://console.anthropic.com)
   - **Environment:** Production (and Preview if you want)
3. Click **Save**
4. Go to **Deployments** → click the three dots on your latest deploy → **Redeploy**

Your app is now live. The API key lives only on Vercel's servers — never in the browser.

---

## Local development

```bash
npm install
# Add your key to .env.local (already gitignored):
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env.local
npx vercel dev
```

Then open http://localhost:3000

---

## Project structure

```
marine-benefits-hub/
├── api/
│   └── chat.js          # Vercel serverless function — proxies Anthropic API calls
├── public/
│   └── index.html       # The full app (HTML/CSS/JS, no build step needed)
├── .env.local           # Local API key (gitignored)
├── .gitignore
├── package.json
├── vercel.json          # Route config
└── README.md
```

## How the API route works

The browser calls `/api/chat` (your own server) instead of Anthropic directly.
Vercel runs `api/chat.js` as a serverless function, injects `ANTHROPIC_API_KEY` from
environment variables, calls Anthropic, and returns the response. The key never
leaves the server.

---

## Content updates

- **Pay table:** edit the `PAY` object in `public/index.html`
- **BAH rates:** edit the `BAH` object — add more bases using the same pattern
- **New bases:** add to `STATION_MAP` so the app recognizes typed names
- **New tabs/content:** duplicate a `<div class="panel">` block and add a tab entry
