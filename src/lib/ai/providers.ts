import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

/** A provider takes a system prompt + user JSON and returns the model's raw JSON text. */
export type CompleteJson = (system: string, user: string) => Promise<string>;

export function openaiProvider(apiKey: string, model: string): CompleteJson {
  const client = new OpenAI({ apiKey });
  return async (system, user) => {
    const res = await client.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      temperature: 0.7,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });
    return res.choices[0]?.message.content ?? "{}";
  };
}

export function geminiProvider(apiKey: string, model: string): CompleteJson {
  const ai = new GoogleGenAI({ apiKey });
  return async (system, user) => {
    const res = await ai.models.generateContent({
      model,
      contents: user,
      config: { systemInstruction: system, responseMimeType: "application/json", temperature: 0.7 },
    });
    return res.text ?? "{}";
  };
}
