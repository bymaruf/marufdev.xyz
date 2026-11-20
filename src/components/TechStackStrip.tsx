"use client";

import React from "react";
import {
  Code2,
  Layers,
  FileCode2,
  Server,
  Smartphone,
  Sparkles,
  Shield,
} from "lucide-react";
import { TECH_STACK } from "@/data/portfolioData";

export default function TechStackStrip() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Linux":
        return <Server className="w-4 h-4 text-[#171717]" />;
      case "Python":
        return <FileCode2 className="w-4 h-4 text-[#171717]" />;
      case "Cybersecurity":
        return <Shield className="w-4 h-4 text-[#171717]" />;
      case "AI & LLMs":
        return <Sparkles className="w-4 h-4 text-[#171717]" />;
      case "Kotlin":
        return <Smartphone className="w-4 h-4 text-[#171717]" />;
      case "C++":
        return <FileCode2 className="w-4 h-4 text-[#171717]" />;
      case "Next.js":
        return <Layers className="w-4 h-4 text-[#171717]" />;
      case "Git & GitHub":
        return <Code2 className="w-4 h-4 text-[#171717]" />;
      default:
        return <Code2 className="w-4 h-4 text-[#171717]" />;
    }
  };

  return (
    <section id="tech-stack" className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-[#E5E5E5] rounded-3xl p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#EBEBEB]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#171717]" />
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#525252]">
                Core Technologies & Tools
              </h2>
            </div>
            <p className="text-xs text-[#525252] font-mono">
              Cybersecurity &bull; AI & LLMs &bull; Kotlin &bull; C++
            </p>
          </div>

          {/* Grid / Horizontal items */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="group flex flex-col items-start justify-between p-3.5 rounded-2xl bg-[#F7F7F7] hover:bg-white border border-[#EBEBEB] hover:border-neutral-400 transition-colors duration-200 min-w-0"
              >
                <div className="w-8 h-8 rounded-xl bg-white border border-[#E0E0E0] flex items-center justify-center mb-3">
                  {getIcon(tech.name)}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-[#171717] block tracking-tight break-words">
                    {tech.name}
                  </span>
                  <span className="text-[10px] text-[#737373] uppercase tracking-wider font-mono break-words">
                    {tech.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
