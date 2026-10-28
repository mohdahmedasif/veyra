import { v2 as cloudinary } from "cloudinary";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/heic"]);

/** Stores an uploaded image in Cloudinary, or in /public/uploads when Cloudinary isn't configured. */
export async function storeImage(file: File): Promise<string> {
  if (!ALLOWED.has(file.type)) throw new Error("Unsupported image type");
  if (file.size > MAX_BYTES) throw new Error("Image must be under 8MB");
  const buffer = Buffer.from(await file.arrayBuffer());

  if (process.env.CLOUDINARY_CLOUD_NAME) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const result = await new Promise<{ secure_url: string }>((resolve, reject) =>
      cloudinary.uploader
        .upload_stream({ folder: "veyra/wardrobe" }, (err, res) => (err || !res ? reject(err) : resolve(res)))
        .end(buffer),
    );
    return result.secure_url;
  }

  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const name = `${randomUUID()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buffer);
  return `/uploads/${name}`;
}
