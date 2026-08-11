import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import Replicate from "replicate";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));

  // Initialize Gemini Client
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. Chat will operate with fallback responses if unavailable.");
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "LA VIE Academy 3D Digital Showroom" });
  });

  // AI Chatbot API Endpoint for LA VIE Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, userContext } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      const ai = getGeminiClient();

      if (!ai) {
        // High quality fallback qualification flow if key missing in preview
        const lastMsg = messages[messages.length - 1]?.content || "";
        let reply = "Willkommen bei LA VIE Academy! Ich bin dein KI-Assistent für Feng Shui & Virtual Staging von Cornelia Schmid. Suchst du nach einer harmonischen Feng Shui Beratung für dein Zuhause oder photorealistischem Virtuellen Staging für eine Immobilie?";
        
        if (lastMsg.toLowerCase().includes("feng shui") || lastMsg.toLowerCase().includes("zuhause") || lastMsg.toLowerCase().includes("home")) {
          reply = "Wunderbar! Cornelia bringt durch gezieltes Feng Shui (Farbdramaturgie, 5-Elemente-Balance, Sheng Qi Energiefluss) deine Räume in vollkommene Harmonie. Möchtest du eine 1-stündige Express-Analyse 'Call a Designer' buchen oder eine komplette Raumtransformation anfragen?";
        } else if (lastMsg.toLowerCase().includes("staging") || lastMsg.toLowerCase().includes("immobilie") || lastMsg.toLowerCase().includes("makler")) {
          reply = "Perfekt! Unser 3D Virtual Staging verwandelt leere oder veraltete Immobilien in begehrte Wohnträume – nachweislich 85% schnellerer Verkauf. Möchtest du ein unverbindliches Staging-Angebot oder direkt den 1-Stunden 'Call a Designer' buchen?";
        } else if (lastMsg.toLowerCase().includes("preis") || lastMsg.toLowerCase().includes("kosten") || lastMsg.toLowerCase().includes("price")) {
          reply = "Unsere Leistungen:\n• 1-Stunden 'Call a Designer' Video-Call: €199 (perfekt für schnelle Tipps & Farbkonzepte)\n• Virtual Staging: Ab €149 pro Raum\n• Ganzheitliche Feng Shui Raumkonzeption: Auf Anfrage nach Grundriss.\n\nMöchtest du jetzt deinen Wunschtermin buchen?";
        }

        return res.json({
          reply,
          action: lastMsg.toLowerCase().includes("buchen") || lastMsg.toLowerCase().includes("call") ? "SHOW_BOOKING" : null
        });
      }

      const systemInstruction = `You are "LA VIE Assistant", the high-end AI Spatial Concierge for Cornelia Schmid | LA VIE Academy GmbH.
Your role:
1. Qualify leads warmly in German or English (respond in the language the user speaks, default to German with a Swiss luxury touch if ambiguous).
2. Ask helpful qualifying questions:
   - Are they a Private Homeowner (Feng Shui & Harmony), Real Estate Agent / Architect (3D Virtual Staging & Fast Sales), or DIY Decorator?
   - What specific rooms or properties are they transforming?
3. Explain Cornelia's signature methodology:
   - 60-30-10 Color Balance Rule (Dominant neutral, secondary texture, accent pop).
   - Feng Shui Energy Flow (Sheng Qi, 5 Elements: Wood, Fire, Earth, Metal, Water).
   - Photorealistic 3D Virtual Staging that emotionalizes space.
4. Promote the flagship "Call a Designer" service: 1-hour 1:1 video consultation with Cornelia Schmid for €199 / CHF 199.
5. If the user expresses interest in booking, pricing details, or wants to talk directly with Cornelia, include the magic tag [ACTION:SHOW_BOOKING] at the end of your response so the UI pops open the Calendly booking drawer.
6. Keep responses concise, elegant, structured with bullet points where appropriate, and friendly. Never use generic corporate speak. Be inspiring and spatial-focused.`;

      // Format conversation history for Gemini API
      const contents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "Ich stehe dir sehr gerne zur Verfügung für deine Raumgestaltung und Feng Shui Fragen.";
      const shouldTriggerBooking = responseText.includes("[ACTION:SHOW_BOOKING]");
      const cleanReply = responseText.replace(/\[ACTION:SHOW_BOOKING\]/g, "").trim();

      return res.json({
        reply: cleanReply,
        action: shouldTriggerBooking ? "SHOW_BOOKING" : null
      });

    } catch (error: any) {
      console.error("Error in /api/chat Gemini request:", error);
      res.status(500).json({ 
        error: "Fehler beim Verarbeiten der Anfrage.", 
        details: error?.message || "Unknown error" 
      });
    }
  });

  // AI Virtual Staging API Endpoint
  app.post("/api/transform-room", async (req, res) => {
    try {
      const { image, roomType, designStyle } = req.body;
      
      if (!image) {
        return res.status(400).json({ error: "Image is required." });
      }

      if (!process.env.REPLICATE_API_TOKEN) {
        return res.status(500).json({ error: "REPLICATE_API_TOKEN is missing in server configuration." });
      }

      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });

      const prompt = `This is a room. Please transform it into a stunning ${designStyle} style ${roomType}. Add highly realistic, high-quality furniture, decor, and photorealistic lighting. Important: Keep the fundamental structural elements (walls, windows, doors) intact. Make it look like professional luxury real estate photography.`;

      const output = await replicate.run(
        "jagilley/controlnet-hough:854e8727697a057c525cd9f95b2306111a681c3c783c6628c615a6bfa9e92b11",
        {
          input: {
            image: image,
            prompt: prompt,
            num_samples: 1,
            image_resolution: "512",
            a_prompt: "best quality, extremely detailed, photo from Pinterest, interior design, 4k, high resolution",
            n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality"
          }
        }
      ) as string[];

      if (output && output.length > 0) {
        // controlnet-hough returns an array [control_image, final_image]. We want the final one.
        const generatedImageUrl = output[output.length - 1];
        return res.json({ generatedImage: generatedImageUrl });
      } else {
        return res.status(500).json({ error: "Replicate did not return an image." });
      }
    } catch (error: any) {
      console.error("Error in /api/transform-room Gemini request:", error);
      res.status(500).json({ 
        error: "Failed to transform room.", 
        details: error?.message || "Unknown error" 
      });
    }
  });



  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LA VIE Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
