import { readFile } from "fs/promises";
import path from "path";
import { UPLOAD_DIR } from "@/lib/upload";

const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp", heic: "image/heic" };

/** Serves locally stored uploads (used when Cloudinary isn't configured). Names are random UUIDs. */
export async function GET(_req: Request, { params }: { params: { file: string } }) {
  const match = /^[0-9a-f-]{36}\.(jpg|png|webp|heic)$/.exec(params.file);
  if (!match) return new Response("Not found", { status: 404 });
  try {
    const data = await readFile(path.join(UPLOAD_DIR, params.file));
    return new Response(data, { headers: { "Content-Type": TYPES[match[1]], "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
