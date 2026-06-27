import { GoogleGenAI, Type } from "@google/genai";
import { TESTCASE_PROMPT } from "../utils/prompt.js";
import dotenv from "dotenv"
dotenv.config();
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const DEFAULT_HEADER = "__AI_TESTCASE_RESPONSE_V1__";

export const generateTestCases = async ({owner,repo,branch,repoContext,}) => {
    // console.log(owner);
    const prompt = TESTCASE_PROMPT({
        owner,
        repo,
        branch,
        repoContext,
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",

            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    testCases: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: {
                                    type: Type.STRING,
                                },
                                description: {
                                    type: Type.STRING,
                                },
                                type: {
                                    type: Type.STRING,
                                    enum: ["ui","auth","api","form","integration","edge-case",],
                                },
                                priority: {
                                    type: Type.STRING,
                                    enum: ["Low","Medium","High","Critical"],
                                },
                                targetRoute: {
                                    type: Type.STRING,
                                },
                                targetFiles: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.STRING,
                                    },
                                },
                                expectedResult: {
                                    type: Type.STRING,
                                },
                            },

                            required: ["title","description","type","priority","targetRoute","targetFiles","expectedResult",],
                        },

                    },

                },

                required: ["testCases"],

            },

        },

    });
    const result = JSON.parse(response.text);

    if (
        !result.testCases ||
        !Array.isArray(result.testCases)
    ) {
        throw new Error("Invalid AI response.");
    }

    return result.testCases;
    
};