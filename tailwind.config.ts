import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FBF8F4",
        sand: { 50: "#F7F1EA", 100: "#EFE4D6", 200: "#E2D0BA", 300: "#CFB394" },
        blush: { 100: "#F6E6E1", 200: "#EDCFC6", 400: "#D79A8A", 600: "#B06A5A" },
        taupe: { 400: "#9B8B7E", 600: "#6E6058", 800: "#3E3530" },
        ink: "#221C19",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(62, 53, 48, 0.18)",
      },
      backgroundImage: {
        "veyra-glow":
          "radial-gradient(60% 60% at 20% 10%, #F6E6E1 0%, transparent 60%), radial-gradient(50% 50% at 90% 30%, #EFE4D6 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
