import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import BlackHoleSegment from "@/components/BlackHoleSegment";
import { PERSONAL_INFO } from "@/data/portfolioData";

const ctaPill =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/25 text-sm font-medium text-white transition-all";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      {/* Edge-on double halo, held on the seamless loop so it never rotates into the vortex. */}
      <BlackHoleSegment
        src="/blackhole-horizon-loop.mp4"
        startTime={0}
        endTime={8}
        className="opacity-100 [--bh-hero-x:0%] [--bh-hero-y:18%] [--bh-hero-scale:1.15] md:[--bh-hero-x:22%] md:[--bh-hero-y:0%] md:[--bh-hero-scale:1.48]"
        style={{
          transform:
            "translate(var(--bh-hero-x), var(--bh-hero-y)) scale(var(--bh-hero-scale))",
          transformOrigin: "50% 50%",
        }}
      />

      <div className="relative z-10 flex min-h-screen w-full max-w-2xl flex-col justify-center px-6 py-28 sm:px-10 lg:px-16">
        <p className="text-on-video flex items-center gap-2.5 text-xs font-medium tracking-wide text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
          01 / Overview
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

        <div className="text-on-video mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/focus"
            className={`group ${ctaPill} outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
          >
            Core focus
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/projects"
            className={`group ${ctaPill} outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
          >
            Projects
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ctaPill} outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
          >
            <GithubIcon className="h-4 w-4" />
            GitHub ({PERSONAL_INFO.githubHandle})
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>
    </main>
  );
}
