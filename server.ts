import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for translation (Slab 1 Requirement: Translator using RapidAPI / AI fallback)
  app.post("/api/translate", async (req, res) => {
    try {
      const { text, targetLanguage, rapidApiKey } = req.body;

      if (!text || !targetLanguage) {
        return res.status(400).json({ error: "Text and target language are required" });
      }

      const apiKeyToUse = rapidApiKey || process.env.RAPIDAPI_KEY;

      // Try RapidAPI translation if RapidAPI key is available
      if (apiKeyToUse) {
        try {
          const response = await fetch("https://deep-translate1.p.rapidapi.com/language/translate/v2", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "X-RapidAPI-Key": apiKeyToUse,
              "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com"
            },
            body: JSON.stringify({
              q: text,
              source: "en",
              target: targetLanguage
            })
          });

          if (response.ok) {
            const data = await response.json();
            const translatedText = data?.data?.translations?.[0]?.translatedText;
            if (translatedText) {
              return res.json({ translatedText, provider: "RapidAPI (Deep Translate)" });
            }
          }
        } catch (rapidErr) {
          console.warn("RapidAPI translation failed, falling back to AI:", rapidErr);
        }
      }

      // Fallback to Gemini AI if RapidAPI key not provided or request failed
      if (process.env.GEMINI_API_KEY) {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `Translate the following English text to ${targetLanguage}. Provide ONLY the direct translation without any explanations or introductory text:\n\n"${text}"`;
        
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt
        });

        const translatedText = response.text?.trim() || "Translation unavailable";
        return res.json({ translatedText, provider: "Google Gemini AI (RapidAPI Fallback)" });
      }

      return res.status(500).json({ error: "Please provide a RapidAPI Key or configure GEMINI_API_KEY." });
    } catch (error: any) {
      console.error("Translation error:", error);
      res.status(500).json({ error: error.message || "Failed to translate text" });
    }
  });

  // Vite middleware for development or static serving in production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
