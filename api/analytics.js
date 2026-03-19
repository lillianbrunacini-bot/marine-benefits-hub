const { createClient } = require("redis");
const THIRTY_DAYS_S = 30 * 24 * 60 * 60;
const MAX_EVENTS = 50000;
const RATE_LIMIT = 100;
const DAY_S = 24 * 60 * 60;

let redisClient;
async function getRedis() {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on("error", (err) => console.error("Redis error:", err));
    await redisClient.connect();
  }
  return redisClient;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { event, data } = req.body || {};
  if (!event) {
    return res.status(400).json({ error: "Missing event" });
  }

  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "unknown";
  const key = `analytics-rate:${ip}`;

  const entry = JSON.stringify({ event, data: data || {}, ts: Date.now() });

  try {
    const redis = await getRedis();

    // Rate limit: 100 events per IP per day
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, DAY_S);
    if (count > RATE_LIMIT) {
      return res.status(429).json({ ok: true }); // Silent 429 — fire-and-forget won't surface this
    }
    await redis.lPush("analytics:events", entry);
    await redis.lTrim("analytics:events", 0, MAX_EVENTS - 1);
    await redis.expire("analytics:events", THIRTY_DAYS_S);
  } catch (err) {
    console.error("Analytics write error:", err);
    // Fail silently — never block the user experience
  }

  return res.status(200).json({ ok: true });
};
