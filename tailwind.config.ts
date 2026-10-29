import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        "surface-2": token("surface-2"),
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        accent: token("accent"),
        "accent-ink": token("accent-ink"),
        "accent-soft": token("accent-soft"),
        gold: token("gold"),
        photo: token("photo"),
        success: token("success"),
        danger: token("danger"),
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgb(var(--shadow) / 0.04), 0 12px 32px -12px rgb(var(--shadow) / 0.18)",
        lift: "0 20px 48px -16px rgb(var(--shadow) / 0.28)",
      },
      borderRadius: { "4xl": "2rem" },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "none" } },
        shake: { "10%,90%": { transform: "translateX(-2px)" }, "20%,80%": { transform: "translateX(4px)" }, "30%,50%,70%": { transform: "translateX(-8px)" }, "40%,60%": { transform: "translateX(8px)" } },
      },
      animation: { "fade-up": "fade-up .35s ease-out both", shake: "shake .45s ease-in-out" },
    },
  },
  plugins: [],
};

export default config;
