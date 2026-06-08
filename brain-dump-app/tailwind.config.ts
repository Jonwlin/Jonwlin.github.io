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
        // Warm, minimal "personal notes" palette (Tailwind stone scale).
        bg: "#fafaf9", // stone-50  — page background
        ink: "#1c1917", // stone-900 — primary text / headings
        body: "#44403c", // stone-700 — body copy
        muted: "#78716c", // stone-500 — meta / labels
        faint: "#a8a29e", // stone-400 — dates / category labels
        line: "#e7e5e4", // stone-200 — borders
        "line-soft": "#f5f5f4", // stone-100 — list separators / hover
        surface: "#f5f5f4", // stone-100 — aside / surface
        focus: "#e9d5ff", // purple-200 — selection + input focus only
      },
      fontFamily: {
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
