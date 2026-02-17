import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// We perform a safe check for process.env to avoid crashes in environments where 'process' is not defined.
const API_KEY = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';
const ai = new GoogleGenAI({ apiKey: API_KEY || '' });

export const getRouteInsight = async (
  currentLocation: string,
  destination: string,
  trafficLevel: string
): Promise<string> => {
  if (!API_KEY) {
    return "AI Insights Unavailable: Configure API Key to enable smart traffic analysis.";
  }

  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      You are the AI routing engine for "PickNGo", a corporate transport app.
      Current Status: Cab is moving from ${currentLocation} to ${destination}.
      Traffic Condition: ${trafficLevel}.
      
      Generate a concise, single-sentence notification for the user about the route efficiency or arrival prediction. 
      Keep it professional but futuristic. Max 15 words.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text?.trim() || "Route optimized for current traffic conditions.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Route calculation confirmed. Proceeding to destination.";
  }
};