import { z } from "zod";
import { CATEGORIES, OCCASIONS, SEASONS } from "@/types";

export const registerSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
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
