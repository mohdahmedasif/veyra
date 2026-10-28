import { z } from "zod";
import { CATEGORIES, OCCASIONS, SEASONS } from "@/types";

export const pinSchema = z.string().regex(/^\d{4,6}$/, "PIN must be 4–6 digits");

export const registerSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  pin: pinSchema,
});

export const profileCreateSchema = z.object({
  name: z.string().trim().min(1).max(40),
  pin: pinSchema,
  avatarColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  isAdmin: z.boolean().optional(),
});

export const aiSettingsSchema = z.object({
  provider: z.enum(["ENGINE", "OPENAI", "GEMINI"]).optional(),
  geminiKey: z.string().trim().max(200).nullable().optional(), // null clears, undefined keeps
  openaiKey: z.string().trim().max(200).nullable().optional(),
  geminiModel: z.string().trim().max(60).optional(),
  openaiModel: z.string().trim().max(60).optional(),
});

export const itemSchema = z.object({
  title: z.string().min(1).max(120),
  category: z.enum(CATEGORIES as [string, ...string[]]),
  color: z.string().min(1).max(40),
  colorHex: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional().nullable(),
  season: z.enum(SEASONS as [string, ...string[]]).default("ALL"),
  occasions: z.array(z.enum(OCCASIONS as [string, ...string[]])).default([]),
  imageUrl: z.string().min(1),
  brand: z.string().max(80).optional().nullable(),
});

export const outfitSchema = z.object({
  name: z.string().min(1).max(120),
  occasion: z.enum(OCCASIONS as [string, ...string[]]).optional().nullable(),
  itemIds: z.array(z.string()).min(1).max(8),
  score: z.number().int().min(0).max(100).optional().nullable(),
  aiReason: z.string().max(1000).optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
});

export const suggestSchema = z.object({
  occasion: z.enum(OCCASIONS as [string, ...string[]]).optional().nullable(),
  season: z.enum(SEASONS as [string, ...string[]]).optional().nullable(),
  count: z.number().int().min(1).max(5).default(4),
});
