// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

import { GoogleGenAI } from "@google/genai";

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface PromptGenerationInput {
  useCase: string;
  targetAudience: string;
  tone: string;
  contextInfo?: string;
  constraints?: string;
}

export async function generateOptimizedPrompt(
  input: PromptGenerationInput
): Promise<string> {
  const systemPrompt = `You are an expert AI prompt engineer specializing in creating highly detailed, structured prompts for various use cases. Your task is to generate professional, comprehensive prompts that are optimized for AI models.

Generate a detailed, well-structured prompt based on the user's requirements. The prompt should be professional, comprehensive, and ready to use with AI models.

Structure the prompt with clear sections like:
- SYSTEM ROLE: Define the AI's expertise and persona
- CONTEXT: Provide relevant background information
- OBJECTIVE: Clearly state the main goal
- STEP-BY-STEP INSTRUCTIONS: Break down the task into actionable steps
- OUTPUT FORMAT: Specify how the response should be structured
- CONSTRAINTS: List any rules, limitations, or requirements
- EXAMPLES (if applicable): Provide sample inputs/outputs

Make the prompt detailed, specific, and actionable. Avoid vague language.`;

  const userPrompt = `Create an optimized AI prompt for the following requirements:

Use Case: ${input.useCase}
Target Audience: ${input.targetAudience}
Tone: ${input.tone}
${input.contextInfo ? `Additional Context: ${input.contextInfo}` : ""}
${input.constraints ? `Constraints: ${input.constraints}` : ""}

Generate a comprehensive, well-structured prompt that addresses all these requirements. Make it detailed and professional.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: userPrompt,
    });

    return response.text || "Failed to generate prompt";
  } catch (error) {
    console.error("Error generating prompt:", error);
    throw new Error(`Failed to generate prompt: ${error}`);
  }
}
