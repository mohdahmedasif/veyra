import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

export interface ImageInput {
  mime: string;
  base64: string;
}

/** A provider takes a system prompt + user text (and optionally a photo) and returns the model's raw JSON text. */
export type CompleteJson = (system: string, user: string, image?: ImageInput) => Promise<string>;

export function openaiProvider(apiKey: string, model: string): CompleteJson {
  const client = new OpenAI({ apiKey });
  return async (system, user, image) => {
    const res = await client.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      temperature: image ? 0.2 : 0.7,
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: image
            ? [
                { type: "text", text: user },
                { type: "image_url", image_url: { url: `data:${image.mime};base64,${image.base64}`, detail: "low" } },
              ]
            : user,
        },
      ],
    });
    return res.choices[0]?.message.content ?? "{}";
  };
}

export function geminiProvider(apiKey: string, model: string): CompleteJson {
  const ai = new GoogleGenAI({ apiKey });
  return async (system, user, image) => {
    const res = await ai.models.generateContent({
      model,
      contents: image ? [{ role: "user", parts: [{ inlineData: { mimeType: image.mime, data: image.base64 } }, { text: user }] }] : user,
      config: { systemInstruction: system, responseMimeType: "application/json", temperature: image ? 0.2 : 0.7 },
    });
    return res.text ?? "{}";
  };
}
