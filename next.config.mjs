/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  webpack: (config) => {
    // onnxruntime-web (used for on-device background removal) references its own .mjs/.wasm
    // files via `new URL(..., import.meta.url)`. The background-removal library supplies those
    // paths at runtime, so stop webpack from emitting them (Next's minifier can't parse them).
    config.module.rules.push({ test: /[\\/]node_modules[\\/]onnxruntime-web[\\/]/, parser: { url: false } });
    return config;
  },
};

export default nextConfig;
