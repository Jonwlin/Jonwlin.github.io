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
        bg: "#0a0a0a",
        card: "#1a1a1a",
        "purple-grad-from": "#667eea",
        "purple-grad-to": "#764ba2",
        accent: "#667eea",
      },
      boxShadow: {
        glow: "0 8px 30px rgba(102, 126, 234, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
