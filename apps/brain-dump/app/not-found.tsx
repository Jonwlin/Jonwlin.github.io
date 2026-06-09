import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[640px] px-5 pt-12">
      <Link href="/" className="text-[0.75rem] font-medium text-secondary hover:text-ink">
        ← back
      </Link>
      <p className="mt-8 text-[0.8rem] text-muted">
        nothing here. that entry doesn&apos;t exist (yet).
      </p>
    </main>
  );
}
