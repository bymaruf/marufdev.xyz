"use client";

import React from "react";
import { GraduationCap, ShieldCheck, Terminal, Cpu } from "lucide-react";
import { PERSONAL_INFO, EDUCATION } from "@/data/portfolioData";

export default function AboutSection() {
  const principles = [
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#171717]" />,
      title: "Web Application Security",
      desc: "Analyzing web architectures against the OWASP Top 10. Evaluating authentication, session management, input validation, and API endpoint defenses.",
    },
    {
      icon: <Cpu className="w-4 h-4 text-[#171717]" />,
      title: "AI & API Security",
      desc: "Hardening applications using the Google Gemini API. Isolating API credentials, validating structured schema outputs, and mitigating prompt injection risks.",
    },
    {
      icon: <Terminal className="w-4 h-4 text-[#171717]" />,
      title: "Secure Systems & Code",
      desc: "Understanding software from low-level memory and file I/O in C to native Android apps and Next.js web platforms to identify security flaws at the code level.",
    },
  ];

  return (
    <section id="about" className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-[#E5E5E5] rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Column: Title & Academic Background */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
                    Background & Education
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#171717] leading-tight">
                  Security-minded engineering grounded in CS fundamentals.
                </h2>
              </div>

              {/* BUBT Education Card */}
              <div className="p-5 rounded-2xl bg-[#F7F7F7] border border-[#E5E5E5] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#DCDCDC] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4 text-[#171717]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#171717] tracking-tight">
                      {EDUCATION.degree}
                    </h3>
                    <p className="text-[11px] text-[#525252]">
                      {EDUCATION.institution} ({EDUCATION.shortName})
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#737373]">
                  <span>{EDUCATION.location}</span>
                  <span className="text-[#171717] font-medium">{EDUCATION.status}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-mono text-[#525252]">
                <span className="px-3 py-1 rounded-full bg-[#F7F7F7] border border-[#E5E5E5]">
                  Web App Security
                </span>
                <span className="px-3 py-1 rounded-full bg-[#F7F7F7] border border-[#E5E5E5]">
                  Systems & C
                </span>
                <span className="px-3 py-1 rounded-full bg-[#F7F7F7] border border-[#E5E5E5]">
                  AI Security
                </span>
              </div>
            </div>

            {/* Right Column: Authentic Engineering Overview & Core Focus */}
            <div className="lg:col-span-7 space-y-6 text-[#525252] text-sm sm:text-base leading-relaxed">
              <p>
                I am <span className="text-[#171717] font-semibold">{PERSONAL_INFO.name}</span>, a
                computer science student and software developer based in Dhaka, Bangladesh. {PERSONAL_INFO.bio}
              </p>
              <p>
                My background building full-stack web applications with Next.js, native Android apps, and
                systems programming in C gives me an attacker-aware perspective on software design.
                Rather than treating security as an afterthought, I approach software from the codebase
                up—evaluating input sanitization, authentication boundaries, and API integrations to prevent
                vulnerabilities before deployment.
              </p>

              {/* 3 Core Technical Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#E5E5E5]">
                {principles.map((p, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#F7F7F7] border border-[#EBEBEB]">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E0E0E0] flex items-center justify-center mb-3">
                      {p.icon}
                    </div>
                    <h3 className="text-xs font-semibold text-[#171717] tracking-tight mb-1">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-[#737373] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
