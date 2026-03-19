const { createClient } = require("redis");
const THIRTY_DAYS_S = 30 * 24 * 60 * 60;
const MAX_EVENTS = 50000;

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

  const entry = JSON.stringify({ event, data: data || {}, ts: Date.now() });

  try {
    const redis = await getRedis();
    await redis.lPush("analytics:events", entry);
    await redis.lTrim("analytics:events", 0, MAX_EVENTS - 1);
    await redis.expire("analytics:events", THIRTY_DAYS_S);
  } catch (err) {
    console.error("Analytics write error:", err);
    // Fail silently — never block the user experience
  }

  return res.status(200).json({ ok: true });
};
