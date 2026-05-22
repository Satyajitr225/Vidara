import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy-initialize Gemini client to prevent crash if GEMINI_API_KEY is not set.
let genAI: GoogleGenAI | null = null;
const getGenAI = (): GoogleGenAI => {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the workspace environment variables.");
    }
    genAI = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAI;
};

// Log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- API ENDPOINTS ---

// Check API Health
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    aiEngineReady: !!process.env.GEMINI_API_KEY,
  });
});

// AI Mentor / Chat
app.post("/api/ai/mentor", async (req: express.Request, res: express.Response) => {
  try {
    const ai = getGenAI();
    const { messages, currentGoal } = req.body;

    const chatHistory = messages ? messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    })) : [];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          role: "user",
          parts: [{
            text: `You are an elite silicon-valley startup founder, product designer, and execution master. 
            You are mentoring an ambitious builder who is on the Vidara platform. 
            Their current active goal is: "${currentGoal || "Become an exceptional developer & builder in public"}".
            
            Guidelines:
            - Give brutally honest but high-energy, actionable, concise startup advice.
            - Focus 100% on EXECUTION. Recommend building, shipping quickly, launching on Product Hunt/Twitter, running user interviews, or writing code.
            - Avoid generic "focus on your mental wellbeing" and instead encourage practical shipping mechanics.
            - Structure the response using clean, brief markdown. No long intros or outros.`
          }]
        },
        ...chatHistory
      ]
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("AI Mentor error:", error);
    res.status(500).json({ error: error.message || "Something went wrong in the AI mentor system." });
  }
});

// AI Startup & Business Idea Validator
app.post("/api/ai/validate-idea", async (req: express.Request, res: express.Response) => {
  try {
    const ai = getGenAI();
    const { idea, targetAudience } = req.body;

    if (!idea) {
      res.status(400).json({ error: "Please describe your idea first." });
      return;
    }

    const prompt = `Validate the following business idea. Give a direct startup-style teardown.
Idea description: "${idea}"
Target Audience: "${targetAudience || "General early adopters / tech founders"}"

Please provide responses in a structured JSON schema:
- marketScore: number (0-100)
- feasibilityScore: number (0-100)
- demandScore: number (0-100)
- criticalFlaw: string (The #1 reason this business idea might fail)
- customerAcquisitionIdea: string (A concrete hacking idea to get the first 10 customers/users)
- miniRoadmap: string[] (3 immediate execution steps to build a 24-hour MVP)
- competitors: string[] (similar products or indirect competitors and how to build high-contrast unique value)
- mockQuote: string (A highly motivational quotation from an elite advisor)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            marketScore: { type: Type.INTEGER },
            feasibilityScore: { type: Type.INTEGER },
            demandScore: { type: Type.INTEGER },
            criticalFlaw: { type: Type.STRING },
            customerAcquisitionIdea: { type: Type.STRING },
            miniRoadmap: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            competitors: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            mockQuote: { type: Type.STRING }
          },
          required: [
            "marketScore", "feasibilityScore", "demandScore", "criticalFlaw",
            "customerAcquisitionIdea", "miniRoadmap", "competitors", "mockQuote"
          ]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("AI Validate Idea error:", error);
    res.status(500).json({ error: error.message || "Failed validating startup idea." });
  }
});

// AI Resume & Public Build Reviewer
app.post("/api/ai/review-work", async (req: express.Request, res: express.Response) => {
  try {
    const ai = getGenAI();
    const { title, description, link } = req.body;

    const prompt = `Review this "Build in Public" project or resume milestone on Vidara. 
    Project Title: "${title}"
    Project Description: "${description}"
    Link/Ref: "${link || "No link provided, pure proof-of-work check-in"}"

    Rules:
    - Analyze current product viability, user interface, or career positioning.
    - Provide positive reinforcement, but specify 2 distinct critical improvements.
    - Rate the level of "Execution Hardcore-ness" from 1 to 10.
    - Assign an appropriate Badge suggestion based on this level of execution.
    - Return a JSON structured response with fields:
      - score: number (1-10)
      - feedback: string (actionable advice, constructive criticism)
      - improvements: string[] (exactly 2 bulleted immediate code/product fixes)
      - badgeSuggested: string (e.g. "Solopreneur Alpha", "Pipeliner", "Midnight Warrior")
      - xpGained: number (estimated multiplier reward between 50 and 200)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            feedback: { type: Type.STRING },
            improvements: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            badgeSuggested: { type: Type.STRING },
            xpGained: { type: Type.INTEGER }
          },
          required: ["score", "feedback", "improvements", "badgeSuggested", "xpGained"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("AI work reviewer error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI feedback on execution." });
  }
});

// AI Roadmap Generator
app.post("/api/ai/generate-roadmap", async (req: express.Request, res: express.Response) => {
  try {
    const ai = getGenAI();
    const { mainGoal, timeframeInWeeks } = req.body;

    const prompt = `Create a custom highly-actionable execution roadmap to achieve this goal: "${mainGoal}" over the course of ${timeframeInWeeks || 4} weeks.
Every week MUST include:
1. Specific build milestone.
2. 2 practical execution resources or learning targets.
3. 1 "Proof of Work" item they must submit to the Vidara community.

Format required (JSON):
- title: string (An active high-energy title for the roadmap)
- difficulty: string (e.g. Beginner, Moderate, Hardcore)
- weeks: array of objects:
  - week: number (1, 2, 3...)
  - focusName: string
  - milestoneDesc: string
  - resourcesNeeded: string[]
  - proofOfWorkRequirement: string`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            weeks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  week: { type: Type.INTEGER },
                  focusName: { type: Type.STRING },
                  milestoneDesc: { type: Type.STRING },
                  resourcesNeeded: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  proofOfWorkRequirement: { type: Type.STRING }
                },
                required: ["week", "focusName", "milestoneDesc", "resourcesNeeded", "proofOfWorkRequirement"]
              }
            }
          },
          required: ["title", "difficulty", "weeks"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("AI Roadmap error:", error);
    res.status(500).json({ error: error.message || "Could not generate AI execution roadmap." });
  }
});

// AI Generated Quizzes & Notion Summarizer
app.post("/api/ai/quiz-summary", async (req: express.Request, res: express.Response) => {
  try {
    const ai = getGenAI();
    const { title, bodyText } = req.body;

    const prompt = `You are summarizing an execution guide/notion note titled "${title}" on the Vidara builder platform.
First, summarize the core practical lessons into 3 extremely punchy bullet points.
Second, generate a 3-question quiz with multiple choice answers to test the reader's execution capability.

Return list as JSON:
- summaryBullets: string[]
- quiz: array of objects:
  - id: number (1-3)
  - question: string
  - options: string[] (exactly 4 options)
  - commentExplanation: string (Why this option is correct from a product/startup perspective)
  - correctIndex: number (0-3 correct index)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `${prompt}\n\nCONTENT TO ANALYZE:\n${bodyText || "A playbook about building minimal viable products, launching quickly, and testing demand instead of writing code for 6 months."}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summaryBullets: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            quiz: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  commentExplanation: { type: Type.STRING },
                  correctIndex: { type: Type.INTEGER }
                },
                required: ["id", "question", "options", "commentExplanation", "correctIndex"]
              }
            }
          },
          required: ["summaryBullets", "quiz"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("AI Quiz Summary error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI quiz summary." });
  }
});

// --- VITE MIDDLEWARE CONFIGURATION ---

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
    console.log(`[Vidara Server] Full-Stack Service listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
