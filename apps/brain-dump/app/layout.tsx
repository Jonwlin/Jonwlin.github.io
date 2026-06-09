import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Monospace, the whole point of the look. Self-hosted at build by next/font.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "brain dump — Jonathan W. Lin",
  description: "things i spent too long researching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plexMono.variable}>
      <body className="min-h-screen bg-bg font-mono text-body antialiased">
        {children}
      </body>
    </html>
  );
}
