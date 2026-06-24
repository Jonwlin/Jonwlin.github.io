import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "brain dump — Jonathan W. Lin",
  description: "things i spent too long researching",
};

// The Brain Dump identity: monospace + warm stone. Painted over the full
// viewport height so the neutral document body never shows through.
export default function BrainDumpLayout({
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
