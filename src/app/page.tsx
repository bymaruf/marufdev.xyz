import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import BlackHoleSegment from "@/components/BlackHoleSegment";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      {/* Segment A — edge-on lensing, pushed right so it stays fully open beside the text. */}
      <BlackHoleSegment startTime={0} endTime={8} className="opacity-100 lg:translate-x-[20%]" />

      <div className="relative z-10 flex min-h-screen w-full max-w-2xl flex-col justify-center px-6 py-28 sm:px-10 lg:px-16">
        <p className="text-on-video flex items-center gap-2.5 text-xs font-medium tracking-wide text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
          marufdev / portfolio
        </p>

        <h1 className="mt-6 text-balance text-5xl font-medium leading-none tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl">
          {PERSONAL_INFO.name}
        </h1>
        <p className="text-on-video mt-5 text-base font-medium tracking-tight text-amber-300/85 sm:text-lg">
          {PERSONAL_INFO.role}
        </p>
        <p className="text-on-video mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
          {PERSONAL_INFO.about}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/focus"
            className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-200/25 bg-white/[0.03] px-5 text-sm font-medium text-white backdrop-blur-md outline-none transition-colors hover:border-amber-200/50 hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            Core focus
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/projects"
            className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 text-sm font-medium text-white/85 backdrop-blur-md outline-none transition-colors hover:border-white/25 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            Projects
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-white/70 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub ({PERSONAL_INFO.githubHandle})
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <p className="text-on-video mt-12 font-mono text-xs text-white/45">01 / 04</p>
      </div>
    </main>
  );
}
