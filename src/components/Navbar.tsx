"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface NavbarProps {
  light: boolean;
  onNavigate(progress: number): void;
}

const NAV_ITEMS = [
  { label: "Focus", progress: 0.34 },
  { label: "Projects", progress: 0.6 },
  { label: "Contact", progress: 0.94 },
];

export default function Navbar({ light, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (progress: number) => {
    setMenuOpen(false);
    onNavigate(progress);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        light
          ? "border-amber-900/10 bg-[#faf6ee]/85 text-zinc-950 backdrop-blur-xl"
          : "border-white/10 bg-black/40 text-white backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
        <button
          type="button"
          onClick={() => go(0)}
          className={`rounded-md text-base font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
            light ? "text-zinc-950" : "text-white"
          }`}
          aria-label="marufdev — return to the start"
        >
          marufdev
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Chapters">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => go(item.progress)}
              className={`min-h-11 rounded-lg px-4 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                light
                  ? "text-zinc-600 hover:bg-amber-900/5 hover:text-zinc-950"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden min-h-11 items-center gap-2 rounded-lg px-3 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:inline-flex ${
              light
                ? "text-zinc-600 hover:bg-amber-900/5 hover:text-zinc-950"
                : "text-white/65 hover:bg-white/10 hover:text-white"
            }`}
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-300 md:hidden ${
              light
                ? "text-zinc-800 hover:bg-amber-900/5"
                : "text-white hover:bg-white/10"
            }`}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className={`border-t px-6 pb-5 pt-2 md:hidden ${
            light
              ? "border-amber-900/10 bg-[#faf6ee]/95"
              : "border-white/10 bg-black/95"
          }`}
          aria-label="Chapters"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => go(item.progress)}
              className={`flex min-h-11 w-full items-center rounded-lg px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                light
                  ? "text-zinc-700 hover:bg-amber-900/5"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm ${
              light ? "text-zinc-700" : "text-white/80"
            }`}
          >
            <GithubIcon className="h-4 w-4" />
            GitHub (@bymaruf)
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>
      )}
    </header>
  );
}
