import type { Metadata } from "next";
import { IBM_Plex_Mono, Lora, Cabin } from "next/font/google";
import "./globals.css";

// Brain Dump look — monospace. Self-hosted at build by next/font.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

// Homepage body copy — serif.
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

// Homepage headings / nav — Cabin (bold only).
const cabin = Cabin({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-cabin",
  display: "swap",
});

// Site-wide default metadata (the homepage). Sections override their own.
export const metadata: Metadata = {
  title: "Jonathan W. Lin",
  description:
    "Jonathan W. Lin — data-focused software engineer. Experience and projects spanning data science, full-stack web, and machine learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plexMono.variable} ${lora.variable} ${cabin.variable}`}
    >
      {/* Neutral document body — each section paints its own background. */}
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  );
}
