"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import { PERSONAL_INFO } from "@/data/portfolioData";

const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/focus", label: "Focus" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="rounded-md text-base font-semibold tracking-tight text-white outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          aria-label="MarufDev — home"
        >
          MarufDev
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              aria-current={isActive(route.href) ? "page" : undefined}
              className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-300 ${
                isActive(route.href)
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full px-3.5 py-1.5 text-sm text-white/60 outline-none transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-300 sm:inline-flex"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-300 md:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-white/10 bg-black/95 px-6 pb-5 pt-2 md:hidden"
          aria-label="Main navigation"
        >
          {ROUTES.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(route.href) ? "page" : undefined}
              className={`inline-flex w-full items-center px-3.5 py-1.5 rounded-full text-sm outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                isActive(route.href)
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5"
              }`}
            >
              {route.label}
            </Link>
          ))}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm text-white/70"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub ({PERSONAL_INFO.githubHandle})
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>
      )}
    </header>
  );
}
