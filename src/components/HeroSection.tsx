"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { HERO_DATA } from "@/data/portfolioData";

export default function HeroSection() {
  return (
    <section id="home" className="w-full pt-4 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Light-Gray Hero Container (#EBEBEB, rounded-[2rem]) - Strictly Minimalist, Zero Glow Blobs */}
        <div className="relative bg-[#EBEBEB] border border-[#E5E5E5] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-12 overflow-hidden shadow-xs">
          <div className="relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
            
            {/* Left Content Column */}
            <div className="flex-1 flex flex-col justify-between z-10">
              <div>
                {/* Two Capability Highlights at the top (Concrete Technical Skills) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 sm:mb-12">
                  {HERO_DATA.highlights.map((item, index) => (
                    <div
                      key={index}
                      className="group bg-white/80 hover:bg-white border border-[#DCDCDC] rounded-2xl p-3.5 sm:p-4 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                        <span className="text-xs font-semibold tracking-tight text-[#171717]">
                          {item.primary}
                        </span>
                      </div>
                      <p className="text-xs text-[#525252] pl-3.5 font-normal">
                        {item.secondary}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Oversized Greeting and Intro */}
                <div className="space-y-4 mb-8">
                  <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-semibold tracking-tight text-[#171717] leading-none select-none">
                    {HERO_DATA.greeting}
                  </h1>

                  <div className="flex items-center gap-2">
                    <p className="text-lg sm:text-xl lg:text-2xl font-medium tracking-tight text-[#171717] break-words">
                      {HERO_DATA.subGreeting}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#525252] max-w-xl leading-relaxed break-words">
                    {HERO_DATA.bio}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
                  {/* View Projects (dark solid fill) */}
                  <Link
                    href={HERO_DATA.primaryCta.href}
                    className="group inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-neutral-800 text-white text-sm font-medium px-6 py-3.5 rounded-full transition-colors duration-200"
                  >
                    <span>{HERO_DATA.primaryCta.label}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  {/* Get in touch (light outline wired to mailto) */}
                  <a
                    href={HERO_DATA.secondaryCta.href}
                    className="inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-white text-[#171717] border border-[#D4D4D4] hover:border-neutral-500 text-sm font-medium px-6 py-3.5 rounded-full transition-colors duration-200"
                  >
                    <span>{HERO_DATA.secondaryCta.label}</span>
                  </a>
                </div>
              </div>

              {/* Bottom: Subtle Scroll Down Link & Location Info */}
              <div className="pt-4 border-t border-[#D9D9D9] flex items-center justify-between">
                <Link
                  href={HERO_DATA.scrollDown.href}
                  className="group inline-flex items-center gap-2 text-xs font-medium text-[#737373] hover:text-[#171717] transition-colors"
                >
                  <span className="tracking-wide">{HERO_DATA.scrollDown.label}</span>
                  <div className="w-5 h-5 rounded-full border border-neutral-400 flex items-center justify-center group-hover:border-neutral-700 transition-colors">
                    <ArrowDown className="w-3 h-3 transition-transform duration-300 group-hover:translate-y-0.5" />
                  </div>
                </Link>

                              </div>
            </div>

            {/* Right Side: Portrait Image + Mobile-Safe Glassmorphism Card */}
            <div className="lg:w-[45%] flex flex-col justify-end items-center relative pt-8 sm:pt-12 lg:pt-16">
              {/* Image Container with generous whitespace above head & bottom anchoring */}
              <div className="relative w-full flex flex-col items-center justify-end">
                <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[440px] flex items-end justify-center">
                  <Image
                    src={HERO_DATA.portrait.src}
                    alt={HERO_DATA.portrait.alt}
                    width={480}
                    height={580}
                    priority
                    className="w-full h-auto object-bottom object-contain rounded-2xl grayscale contrast-115 brightness-105 mix-blend-multiply"
                  />
                </div>

                {/* Status Card:
                    On Mobile (<sm): Placed relative below the portrait with mt-4 so it NEVER overlaps face or head.
                    On Tablet/Desktop (sm+): Overlaps bottom-right cleanly without covering portrait.
                */}
                <div className="w-full sm:w-auto mt-4 sm:mt-0 sm:absolute sm:bottom-2 sm:right-2 z-20 flex justify-center sm:justify-end">
                  <Link
                    href={HERO_DATA.statusCard.href}
                    className="group inline-flex items-center justify-between gap-3.5 bg-[#171717]/95 hover:bg-[#171717] backdrop-blur-md border border-white/20 text-white px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-lg transition-colors duration-200 min-h-11"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                      <div className="flex flex-col text-left min-w-0">
                        <span className="text-xs sm:text-sm font-semibold tracking-tight text-white break-words">
                          {HERO_DATA.statusCard.badge}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono break-words">
                          {HERO_DATA.statusCard.note}
                        </span>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
