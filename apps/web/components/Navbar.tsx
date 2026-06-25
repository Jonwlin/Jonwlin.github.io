"use client";

import { useState } from "react";
import Link from "next/link";
import { HEADING } from "@/lib/home";

// Right-aligned links. Inline at lg+; collapse to a hamburger menu below 992px
// (recreates Bootstrap's `navbar-expand-lg`).
const LINKS = [
  { label: "Github", href: "https://github.com/Jonwlin", external: true },
  { label: "Linkedin", href: "https://www.linkedin.com/in/xjonathan", external: true },
  { label: "Kaggle", href: "https://www.kaggle.com/jwlin17", external: true },
  { label: "Brain Dump", href: "/brain-dump", external: false },
  { label: "Recipes", href: "/recipes", external: false },
];

function BarsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <rect x="1" y="3" width="14" height="2" rx="1" />
      <rect x="1" y="7" width="14" height="2" rx="1" />
      <rect x="1" y="11" width="14" height="2" rx="1" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`w-full bg-transparent py-5 text-[1rem] text-black ${HEADING}`}
    >
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Hamburger — mobile only, right-aligned. */}
        <div className="flex justify-end lg:hidden">
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded bg-home-toggler p-2 text-white"
          >
            <BarsIcon />
          </button>
        </div>

        {/* Links — stacked dropdown below lg (shown when open), inline row at lg+. */}
        <ul
          className={`${
            open ? "flex" : "hidden"
          } mt-3 flex-col items-end gap-y-2 lg:mt-0 lg:flex lg:flex-row lg:justify-end lg:gap-x-6`}
        >
          {LINKS.map((l) => (
            <li key={l.label}>
              {l.external ? (
                <a
                  href={l.href}
                  className="font-bold text-black hover:opacity-70"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  href={l.href}
                  className="font-bold text-black hover:opacity-70"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
