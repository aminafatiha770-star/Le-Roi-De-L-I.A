
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY manquante dans l'environnement.");
  return new GoogleGenAI({ apiKey });
};

export const generateImage = async (prompt: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: "1:1" } }
  });
  const parts = response.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  throw new Error("Aucune image générée.");
};

export const editImage = async (imageB64: string, instruction: string): Promise<string> => {
  const ai = getAI();
  const base64Data = imageB64.split(',')[1] || imageB64;
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: 'image/png' } },
        { text: instruction }
      ]
    }
  });
  const parts = response.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  throw new Error("Échec de la transformation.");
};

export const processDocument = async (base64Data: string, mimeType: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: mimeType } },
        { text: "Extrayez tout le texte de ce document de manière lisible." }
      ]
    }
  });
  return response.text || "Texte non trouvé.";
};

export const imageToPrompt = async (imageB64: string): Promise<string> => {
  const ai = getAI();
  const base64Data = imageB64.split(',')[1] || imageB64;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: 'image/png' } },
        { text: "Décris cette image précisément pour un générateur d'images IA." }
      ]
    }
  });
  return response.text || "Analyse impossible.";
};
