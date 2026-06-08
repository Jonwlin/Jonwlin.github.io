import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🧠 Brain Dump — Jonathan W. Lin",
  description: "Guides, reviews, and rabbit holes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-[#e7e7ea]">{children}</body>
    </html>
  );
}
