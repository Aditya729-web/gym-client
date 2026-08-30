import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

const GYM_SYSTEM_PROMPT = `You are the Apex Forge Gym AI Assistant. Your role is to help current and prospective members.

CRITICAL SCOPE RESTRICTION: You may ONLY answer questions related to the following topics:
1. Gym-related issues: equipment usage, class timings, facility questions, general troubleshooting.
2. Food intake & nutrition guidance: general dietary suggestions, meal timing around workouts, protein/macro basics (include a disclaimer to consult a nutritionist for medical conditions).
3. Enrollment help: explaining membership plans, pricing, how to sign up, trial offers.
4. Calorie information: estimating calories burned per activity/class, calorie content of common foods, basic calorie goal guidance.

If a user asks something completely outside these topics (e.g., coding, politics, general history, non-gym products), politely redirect them back to gym-related topics and state your purpose. 

Keep your answers concise, professional, and energetic. Format with markdown where appropriate.`;

// Groq chat endpoint proxy
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Groq API key not configured" });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: GYM_SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_completion_tokens: 1024,
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Groq API error:", errorData);
      return res.status(response.status).json({ error: "Failed to communicate with AI provider" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Chat proxy error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Mock Database/API for the Dashboard
const mockMembers = [
  { id: 1, name: "John Doe", email: "john@example.com", joinDate: "2024-01-15", status: "Active", plan: "Annual Pro" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", joinDate: "2024-03-22", status: "Active", plan: "Monthly Basic" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", joinDate: "2023-11-10", status: "Inactive", plan: "Quarterly Elite" },
];

app.get("/api/admin/members", (req, res) => {
  res.json(mockMembers);
});

app.get("/api/admin/stats", (req, res) => {
  res.json({
    totalMembers: 428,
    activeMembers: 395,
    monthlyRevenue: 1960000,
    newSignups: 32,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
