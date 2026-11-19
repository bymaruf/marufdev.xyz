"use client";

import React from "react";
import {
  Code2,
  Layers,
  FileCode2,
  Palette,
  Server,
  Smartphone,
  Network,
  Sparkles,
} from "lucide-react";
import { TECH_STACK } from "@/data/portfolioData";

export default function TechStackStrip() {
  const getIcon = (name: string) => {
    switch (name) {
      case "React":
        return <Code2 className="w-4 h-4 text-[#171717]" />;
      case "Next.js":
        return <Layers className="w-4 h-4 text-[#171717]" />;
      case "TypeScript":
        return <FileCode2 className="w-4 h-4 text-[#171717]" />;
      case "Tailwind CSS":
        return <Palette className="w-4 h-4 text-[#171717]" />;
      case "Node.js":
        return <Server className="w-4 h-4 text-[#171717]" />;
      case "Android":
        return <Smartphone className="w-4 h-4 text-[#171717]" />;
      case "REST APIs":
        return <Network className="w-4 h-4 text-[#171717]" />;
      case "Gemini AI":
        return <Sparkles className="w-4 h-4 text-[#171717]" />;
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
              Full-Stack Web &bull; Native Android &bull; Gemini AI API
            </p>
          </div>

          {/* Grid / Horizontal items */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="group flex flex-col items-start justify-between p-3.5 rounded-2xl bg-[#F7F7F7] hover:bg-white border border-[#EBEBEB] hover:border-neutral-400 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-xl bg-white border border-[#E0E0E0] flex items-center justify-center mb-3">
                  {getIcon(tech.name)}
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#171717] block tracking-tight">
                    {tech.name}
                  </span>
                  <span className="text-[10px] text-[#737373] uppercase tracking-wider font-mono">
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
