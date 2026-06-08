import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 text-center">
      <div className="text-5xl">🧠💨</div>
      <h1 className="mt-4 text-2xl font-bold text-[#f5f5f7]">Nothing here</h1>
      <p className="mt-2 text-[#9a9aa5]">
        That brain dump doesn’t exist (yet).
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-[#667eea] px-4 py-2 text-sm font-semibold text-white"
      >
        ← Back to Brain Dump
      </Link>
    </main>
  );
}
