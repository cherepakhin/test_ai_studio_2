
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateJobDescription(title: string, company: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional, compelling 2-paragraph job description for a "${title}" position at "${company}". Focus on innovation and growth.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("AI Generation failed:", error);
    return "Error generating description. Please enter manually.";
  }
}

export async function extractRequirements(description: string): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extract a list of 5 key requirements from the following job description: "${description}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Requirement extraction failed:", error);
    return [];
  }
}
