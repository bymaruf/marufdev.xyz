"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { PERSONAL_INFO, NAVIGATION_LINKS } from "@/data/portfolioData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full pt-4 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border border-[#E5E5E5] py-3 px-5 sm:px-7"
            : "bg-white/60 backdrop-blur-sm border border-transparent py-4 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left: Logo mark */}
          <Link
            href="#home"
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="MarufDev Homepage"
          >
            <div className="w-9 h-9 rounded-full bg-[#171717] text-white flex items-center justify-center font-bold text-sm tracking-tight transition-transform duration-300 group-hover:scale-105">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-[#171717]">
                MarufDev
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Anchor Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#EBEBEB]/80 px-2 py-1.5 rounded-full border border-[#E5E5E5]/60">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-xs font-medium text-[#525252] hover:text-[#171717] rounded-full hover:bg-white/80 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: CTA button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-1.5 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-medium px-5 py-2.5 rounded-full shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#171717] hover:bg-[#EBEBEB] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto bg-white/95 backdrop-blur-xl border border-[#E5E5E5] rounded-3xl p-5 shadow-xl transition-all animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-2">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium text-[#171717] hover:bg-[#F7F7F7] rounded-2xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-1 border-t border-[#E5E5E5]">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#171717] text-white text-sm font-medium py-3 rounded-2xl hover:bg-neutral-800 transition-colors"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
