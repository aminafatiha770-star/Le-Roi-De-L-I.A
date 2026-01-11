
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = (typeof process !== 'undefined' && process.env.API_KEY) ? process.env.API_KEY : '';
  return new GoogleGenAI({ apiKey });
};

export const generateImage = async (prompt: string): Promise<string> => {
  try {
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
    throw new Error("Aucune image n'a été renvoyée.");
  } catch (err) {
    console.error("Erreur génération:", err);
    throw err;
  }
};

export const editImage = async (imageB64: string, instruction: string): Promise<string> => {
  try {
    const ai = getAI();
    const base64Data = imageB64.includes(',') ? imageB64.split(',')[1] : imageB64;
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
    throw new Error("Transformation échouée.");
  } catch (err) {
    console.error("Erreur édition:", err);
    throw err;
  }
};

export const processDocument = async (base64Data: string, mimeType: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: mimeType } },
        { text: "Extrayez tout le texte de ce document proprement." }
      ]
    }
  });
  return response.text || "Texte introuvable.";
};

export const imageToPrompt = async (imageB64: string): Promise<string> => {
  const ai = getAI();
  const base64Data = imageB64.includes(',') ? imageB64.split(',')[1] : imageB64;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: 'image/png' } },
        { text: "Analyse cette image et donne un prompt détaillé pour la recréer." }
      ]
    }
  });
  return response.text || "Analyse impossible.";
};
