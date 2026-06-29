import { GoogleGenAI } from "@google/genai";
import { buildAutomationPrompt } from "../utils/automationPrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sanitizeGeneratedCode = (code = "") => {
  return code
    .replace(/^```javascript/i, "")
    .replace(/^```js/i, "")
    .replace(/```$/i, "")
    .replace(/^```/i, "")
    .trim();
};

export const isValidAutomationScript = (code = "") => {
  const normalized = sanitizeGeneratedCode(code);
  if (!normalized) return false;

  const forbiddenPatterns = [
    /hasClass\s*\(/,
    /page\.waitForTimeout\s*\(/,
    /setTimeout\s*\(/,
    /chromium\.launch\s*\(/,
    /browser\.newContext\s*\(/,
    /import\s+playwright/i,
    /@playwright\/test/i,
    /export\s+default\s+async\s*\(\)\s*=>/,
    /async\s+function\s+run\s*\(/,
  ];

  return !forbiddenPatterns.some((pattern) => pattern.test(normalized));
};

export const buildFallbackAutomationScript = ({
  testCase,
  baseUrl,
}) => {
  const targetRoute = testCase?.targetRoute || "/";
  const title = testCase?.title || "Verify page";
  const expectedResult = testCase?.expectedResult || "Page loads correctly";

  return `import assert from "node:assert";

export default async function ({ page }) {
  console.log("Starting fallback automation for: ${title}");
  const fullUrl = new URL("${targetRoute}", "${baseUrl}").toString();
  console.log("Navigating to", fullUrl);
  await page.goto(fullUrl, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  const heading = page.locator("h1, h2").first();
  await heading.waitFor({ state: "visible" });
  const text = (await heading.textContent()) || "";
  assert.ok(text.trim().length > 0, "Expected visible heading");
  console.log("Verified visible content:", text.trim());
  console.log("Expected result:", "${expectedResult}");
}
`;
};

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

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let generatedCode = response.text || "";
    generatedCode = sanitizeGeneratedCode(generatedCode);

    if (!generatedCode || !isValidAutomationScript(generatedCode)) {
      throw new Error("Generated script failed validation.");
    }

    return generatedCode;
  } catch (error) {
    console.warn("Falling back to built-in automation script:", error.message);
    return buildFallbackAutomationScript({
      testCase,
      baseUrl,
    });
  }
};