const { createClient } = require("redis");
const LIMIT = 50;
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
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting: 50 requests per IP per day (persistent via Redis)
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "unknown";
  const key = `rate:${ip}`;
  try {
    const redis = await getRedis();
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, DAY_S);
    if (count > LIMIT) {
      return res.status(429).json({ error: "You've reached the daily limit for AI questions. Check back tomorrow!" });
    }
  } catch (redisErr) {
    console.error("Redis rate limit error:", redisErr);
    // Fail open — allow the request if Redis is unavailable
  }

  const { messages, system } = req.body;

  if (!messages || !system) {
    return res.status(400).json({ error: "Missing messages or system prompt" });
  }

  const lastUserMsg = [...messages].reverse().find(m => m.role === "user");
  if (lastUserMsg && lastUserMsg.content.length > 500) {
    return res.status(400).json({ error: "Message exceeds 500 character limit." });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,   // ← lives only on the server
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 400,
        system,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("API route error:", error);
    return res.status(500).json({ error: "The AI service is temporarily unavailable. Please try again in a moment." });
  }
}
