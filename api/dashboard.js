const { createClient } = require("redis");

let redisClient;
async function getRedis() {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on("error", (err) => console.error("Redis error:", err));
    await redisClient.connect();
  }
  return redisClient;
}

const GREEN = "#5a7a3a";
const NOW = () => Date.now();
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;

module.exports = async function handler(req, res) {
  if (req.query.pw !== "oorah") {
    return res.status(401).send(`<!DOCTYPE html><html><body style="font-family:sans-serif;padding:40px;color:#333">
      <h2 style="color:${GREEN}">Semper Sorted Analytics</h2>
      <p>Enter the dashboard password to continue.</p>
      <form method="GET">
        <input name="pw" type="password" placeholder="Password" style="padding:8px 12px;border:1px solid #ccc;border-radius:6px;font-size:14px;" autofocus/>
        <button type="submit" style="margin-left:8px;padding:8px 16px;background:${GREEN};color:white;border:none;border-radius:6px;cursor:pointer;font-size:14px;">Enter</button>
      </form>
    </body></html>`);
  }

  let events = [];
  try {
    const redis = await getRedis();
    const raw = await redis.lRange("analytics:events", 0, -1);
    events = raw.map(e => { try { return JSON.parse(e); } catch { return null; } }).filter(Boolean);
  } catch (err) {
    console.error("Dashboard Redis error:", err);
  }

  const now = NOW();
  const todayStart = now - DAY_MS;
  const weekStart = now - WEEK_MS;

  const questions = events.filter(e => e.event === "ai_question");
  const errors = events.filter(e => e.event === "ai_error");
  const tabClicks = events.filter(e => e.event === "tab_click");

  const questionsToday = questions.filter(e => e.ts >= todayStart).length;
  const questionsWeek = questions.filter(e => e.ts >= weekStart).length;
  const questionsAll = questions.length;
  const errorCount = errors.length;

  // Tab frequency
  const tabCounts = {};
  tabClicks.forEach(e => {
    const t = e.data?.tab || "unknown";
    tabCounts[t] = (tabCounts[t] || 0) + 1;
  });
  const topTabs = Object.entries(tabCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  // Recent questions (last 20, stored as ts only — no content)
  const recentQ = questions.slice(0, 20).map(e => {
    const d = new Date(e.ts);
    return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Semper Sorted Analytics</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Segoe UI',sans-serif;background:#f5f5f3;color:#1a1714;padding:32px 24px;}
  h1{color:${GREEN};font-size:22px;margin-bottom:4px;}
  .sub{color:#6b6560;font-size:13px;margin-bottom:28px;}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin-bottom:28px;}
  .stat{background:white;border:1px solid #e8e4df;border-radius:12px;padding:20px;text-align:center;}
  .stat-n{font-size:32px;font-weight:700;color:${GREEN};}
  .stat-l{font-size:12px;color:#6b6560;margin-top:4px;}
  .card{background:white;border:1px solid #e8e4df;border-radius:12px;padding:20px;margin-bottom:20px;}
  .card h2{font-size:14px;font-weight:600;color:#6b6560;text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px;}
  .bar-row{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
  .bar-label{font-size:13px;width:130px;flex-shrink:0;text-transform:capitalize;}
  .bar-track{flex:1;background:#f0ede8;border-radius:4px;height:10px;}
  .bar-fill{background:${GREEN};border-radius:4px;height:10px;}
  .bar-count{font-size:12px;color:#6b6560;width:32px;text-align:right;}
  .q-row{font-size:13px;color:#6b6560;padding:6px 0;border-bottom:1px solid #f0ede8;}
  .q-row:last-child{border-bottom:none;}
  .empty{color:#a8a29e;font-size:13px;font-style:italic;}
</style>
</head>
<body>
<h1>Semper Sorted Analytics</h1>
<div class="sub">Last 30 days of event data &mdash; refreshes on page load</div>

<div class="grid">
  <div class="stat"><div class="stat-n">${questionsToday}</div><div class="stat-l">AI Questions Today</div></div>
  <div class="stat"><div class="stat-n">${questionsWeek}</div><div class="stat-l">AI Questions This Week</div></div>
  <div class="stat"><div class="stat-n">${questionsAll}</div><div class="stat-l">AI Questions All Time</div></div>
  <div class="stat"><div class="stat-n">${errorCount}</div><div class="stat-l">AI Errors</div></div>
</div>

<div class="card">
  <h2>Most Used Tabs</h2>
  ${topTabs.length === 0 ? '<div class="empty">No tab data yet.</div>' : (() => {
    const max = topTabs[0][1];
    return topTabs.map(([tab, count]) =>
      `<div class="bar-row">
        <div class="bar-label">${tab}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${Math.round(count/max*100)}%"></div></div>
        <div class="bar-count">${count}</div>
      </div>`
    ).join("");
  })()}
</div>

<div class="card">
  <h2>Recent AI Questions (timestamps only)</h2>
  ${recentQ.length === 0 ? '<div class="empty">No questions yet.</div>' : recentQ.map(t => `<div class="q-row">${t}</div>`).join("")}
</div>

</body>
</html>`;

  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(html);
};
