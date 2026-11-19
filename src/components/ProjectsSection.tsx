"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import { PROJECTS_DATA } from "@/data/portfolioData";

export default function ProjectsSection() {
  const isValidUrl = (url?: string): boolean => {
    if (!url) return false;
    const trimmed = url.trim();
    return trimmed !== "" && trimmed !== "#" && !trimmed.startsWith("#");
  };

  return (
    <section id="projects" className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
                Selected Works
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#171717]">
              Engineered projects & implementations.
            </h2>
          </div>
          <p className="text-sm text-[#525252] max-w-md">
            Real software implementations across full-stack Next.js web applications, native Android
            codebases, and Gemini API integration tools.
          </p>
        </div>

        {/* 2-Column Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS_DATA.map((project) => {
            const hasLive = isValidUrl(project.liveUrl);
            const hasGithub = isValidUrl(project.githubUrl);

            return (
              <div
                key={project.id}
                className="group bg-[#EBEBEB] border border-[#E5E5E5] hover:border-neutral-400 rounded-[2rem] p-7 sm:p-9 flex flex-col justify-between transition-colors duration-200 shadow-xs"
              >
                <div>
                  {/* Header: Category Badge & Year */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#DCDCDC] text-[11px] font-mono tracking-wide text-[#171717]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">
                      {project.year}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#171717] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-neutral-600 mb-4 font-mono">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[#525252] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-white border border-[#D9D9D9] text-[#171717] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: Action Links (Conditionally rendered only when real URLs exist) */}
                <div className="pt-6 border-t border-[#D9D9D9] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {hasLive && project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-medium px-4 py-2.5 rounded-full transition-colors duration-200"
                      >
                        <span>Live Preview</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {hasGithub && project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-white hover:bg-neutral-100 text-[#171717] border border-[#D4D4D4] hover:border-neutral-500 text-xs font-medium px-4 py-2.5 rounded-full transition-colors duration-200"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-neutral-500 font-mono">
                    <span>Built &amp; Tested</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
