import { GoogleGenAI } from "@google/genai";
import { buildAutomationPrompt } from "../utils/automationPrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateAutomationScript = async ({
  testCase,
  project,
  repoContext,
  baseUrl,
  customPrompt,
}) => {

  const prompt = buildAutomationPrompt({
    testCase,
    project,
    repoContext,
    baseUrl,
    customPrompt,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let generatedCode = response.text || "";

  generatedCode = generatedCode
    .replace(/^```javascript/i, "")
    .replace(/^```js/i, "")
    .replace(/```$/, "")
    .trim();
  
  if (!generatedCode) {
    throw new Error("Gemini failed to generate automation script.");
  }

  return generatedCode;
};