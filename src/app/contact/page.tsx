import Link from "next/link";
import { ArrowUp, ArrowUpRight, GraduationCap, Mail } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import BlackHoleStage from "@/components/BlackHoleStage";
import { EDUCATION, PERSONAL_INFO } from "@/data/portfolioData";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      {/* Full lensing arch rising across the bottom, faded into black at its top edge. */}
      <BlackHoleStage />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-3xl flex-col justify-start px-6 pb-8 pt-16">
        <p className="text-on-video text-xs font-medium tracking-wide text-amber-200/70">
          04 / Beyond the horizon
        </p>
        <h1 className="text-on-video mt-4 text-balance text-4xl font-medium tracking-[-0.035em] text-white sm:text-6xl">
          Beyond the horizon
        </h1>
        <p className="text-on-video mt-5 max-w-xl text-base leading-7 text-white/70">
          {PERSONAL_INFO.role} working across application security, LLM hardening,
          and secure software systems.
        </p>

        <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/15 bg-black/55 p-6 backdrop-blur-xl sm:p-8">
          <div className="grid gap-1 py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
            <span className="flex items-center gap-2 text-xs font-medium text-white/50">
              <GraduationCap className="h-4 w-4" />
              Education
            </span>
            <div>
              <p className="text-base text-white">{EDUCATION.degree}</p>
              <p className="mt-1 text-sm text-white/65">{EDUCATION.institution}</p>
            </div>
          </div>
          <div className="grid gap-1 py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
            <span className="flex items-center gap-2 text-xs font-medium text-white/50">
              <Mail className="h-4 w-4" />
              Contact
            </span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex w-fit items-center gap-2 text-base text-white underline decoration-white/30 underline-offset-4 outline-none transition-colors hover:decoration-white focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
          <div className="grid gap-1 py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
            <span className="flex items-center gap-2 text-xs font-medium text-white/50">
              <GithubIcon className="h-4 w-4" />
              GitHub
            </span>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-base text-white underline decoration-white/30 underline-offset-4 outline-none transition-colors hover:decoration-white focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              {PERSONAL_INFO.githubHandle}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <Link
          href="/"
          className="group mt-10 inline-flex min-h-11 w-fit items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 text-sm font-medium text-white/85 backdrop-blur-md outline-none transition-colors hover:border-white/25 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          Return to Orbit
        </Link>

        <p className="text-on-video mt-auto pt-12 font-mono text-xs text-white/60">
          © {new Date().getFullYear()} {PERSONAL_INFO.name} · {PERSONAL_INFO.domain}
        </p>
      </div>
    </main>
  );
}
