import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

async function test() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image",
      contents: [
        "A beautiful room"
      ],
      config: {
        responseModalities: ["IMAGE"]
      }
    });
    console.log("Success:", !!response);
  } catch (err: any) {
    console.error("Error:", err.message);
  }
}
test();
