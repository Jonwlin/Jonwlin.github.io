import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm "personal notes" palette (Tailwind stone scale).
        bg: "#f5f5f4", // stone-100 — page background
        surface: "#ffffff", // white     — card / surface
        ink: "#1c1917", // stone-900 — titles
        body: "#44403c", // stone-700 — body copy
        secondary: "#57534e", // stone-600 — descriptions
        muted: "#78716c", // stone-500 — dates / meta
        line: "#e7e5e4", // stone-200 — borders
        divider: "#d6d3d1", // stone-300 — subtle dividers
        edge: "#a8a29e", // stone-400 — card hover border
        focus: "#7c3aed", // violet-600 — input focus border
      },
      fontFamily: {
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
