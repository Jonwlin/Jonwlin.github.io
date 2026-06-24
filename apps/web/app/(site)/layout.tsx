import Navbar from "@/components/Navbar";

// The homepage identity: white background + Lora serif. Reusable shell for any
// future marketing-style pages (about, contact) added to this route group.
// (Route groups don't affect the URL — the homepage stays at "/".)
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-home-bg font-serif text-black">
      <Navbar />
      {children}
    </div>
  );
}
