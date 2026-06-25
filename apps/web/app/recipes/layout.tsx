import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "recipes — Jonathan W. Lin",
  description: "things i actually cook, with timers and a serving-size knob",
};

// Recipes share the Brain Dump identity: monospace + warm stone, painted over
// the full viewport so the neutral document body never shows through.
export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg font-mono text-body text-[14px] leading-[1.6]">
      {children}
    </div>
  );
}
