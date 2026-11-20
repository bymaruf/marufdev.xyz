"use client";

import React from "react";
import { Globe, Smartphone, Cpu, Check, ShieldCheck, Lock } from "lucide-react";
import { SERVICES_DATA } from "@/data/portfolioData";

export default function ServicesSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-5 h-5 text-[#171717]" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-[#171717]" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-[#171717]" />;
      case "Shield":
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-[#171717]" />;
      case "Lock":
        return <Lock className="w-5 h-5 text-[#171717]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#171717]" />;
    }
  };

  return (
    <section id="services" className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
                Security & Engineering Focus
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#171717]">
              Cybersecurity & application security focus.
            </h2>
          </div>
          <p className="text-sm text-[#525252] max-w-md">
            Applying practical software engineering knowledge to evaluate web vulnerabilities, secure
            AI API integrations, and build defensible software foundations.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="group bg-[#EBEBEB] border border-[#E5E5E5] hover:border-neutral-400 rounded-[2rem] p-7 sm:p-8 flex flex-col justify-between transition-colors duration-200 shadow-xs min-w-0"
            >
              <div>
                {/* Top: Number & Icon */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono tracking-widest text-neutral-500 font-semibold">
                    {service.number}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-white border border-[#DCDCDC] flex items-center justify-center">
                    {getIcon(service.icon)}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-semibold text-[#171717] tracking-tight mb-2 break-words">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-neutral-600 mb-4 font-mono break-words">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-[#525252] leading-relaxed mb-6 break-words">
                  {service.description}
                </p>
              </div>

              {/* Capabilities checklist */}
              <div className="pt-6 border-t border-[#D9D9D9]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-3">
                  Key Security & Engineering Focus:
                </span>
                <ul className="space-y-2">
                  {service.capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#171717]">
                      <Check className="w-3.5 h-3.5 text-[#171717] mt-0.5 shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
