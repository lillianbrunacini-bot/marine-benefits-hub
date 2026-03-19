const rateLimitStore = {};
const LIMIT = 50;
const DAY_MS = 24 * 60 * 60 * 1000;

module.exports = async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting: 50 requests per IP per day
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "unknown";
  const now = Date.now();
  const record = rateLimitStore[ip];

  if (record && now < record.resetAt) {
    if (record.count >= LIMIT) {
      return res.status(429).json({ error: "You've reached the daily limit for AI questions. Check back tomorrow!" });
    }
    record.count++;
  } else {
    rateLimitStore[ip] = { count: 1, resetAt: now + DAY_MS };
  }

  const { messages, system } = req.body;

  if (!messages || !system) {
    return res.status(400).json({ error: "Missing messages or system prompt" });
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
    return res.status(500).json({ error: "Internal server error" });
  }
}
