import express from "express";
import Groq from "groq-sdk";

const GYM_SYSTEM_PROMPT = `You are the Apex Forge Gym AI Assistant. Your role is to help current and prospective members.

CRITICAL SCOPE RESTRICTION: You may ONLY answer questions related to the following topics:
1. Gym-related issues: equipment usage, class timings, facility questions, general troubleshooting.
2. Food intake & nutrition guidance: general dietary suggestions, meal timing around workouts, protein/macro basics (include a disclaimer to consult a nutritionist for medical conditions).
3. Enrollment help: explaining membership plans, pricing, how to sign up, trial offers.
4. Calorie information: estimating calories burned per activity/class, calorie content of common foods, basic calorie goal guidance.

If a user asks something completely outside these topics (e.g., coding, politics, general history, non-gym products), politely redirect them back to gym-related topics and state your purpose. 

Keep your answers concise, professional, and energetic. Format with markdown where appropriate.`;

export const apiRouter = express.Router();

apiRouter.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Groq API key not configured" });
    }

    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: GYM_SYSTEM_PROMPT },
        ...messages
      ],
    });

    res.json(completion);
  } catch (error: any) {
    console.error("Chat proxy error:", error);
    const message = error?.error?.message || error?.message || "Internal server error";
    const status = error?.status || 500;
    res.status(status).json({ error: message });
  }
});

const mockMembers = [
  { id: 1, name: "John Doe", email: "john@example.com", joinDate: "2024-01-15", status: "Active", plan: "Annual Pro" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", joinDate: "2024-03-22", status: "Active", plan: "Monthly Basic" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", joinDate: "2023-11-10", status: "Inactive", plan: "Quarterly Elite" },
];

apiRouter.get("/admin/members", (req, res) => {
  res.json(mockMembers);
});

apiRouter.get("/admin/stats", (req, res) => {
  res.json({
    totalMembers: 428,
    activeMembers: 395,
    monthlyRevenue: 1960000,
    newSignups: 32,
  });
});
