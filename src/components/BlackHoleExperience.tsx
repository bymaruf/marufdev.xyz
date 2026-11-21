"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import Navbar from "@/components/Navbar";
import {
  EDUCATION,
  FOCUS_PILLARS,
  PERSONAL_INFO,
  PROJECTS,
  TECH_STACK,
} from "@/data/portfolioData";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

const smoothstep = (start: number, end: number, value: number) => {
  const t = clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
};

export default function BlackHoleExperience() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bloomRef = useRef<HTMLDivElement | null>(null);
  const warmFieldRef = useRef<HTMLDivElement | null>(null);
  const coronaRef = useRef<HTMLDivElement | null>(null);
  const finaleRef = useRef<HTMLDivElement | null>(null);
  const reducedRef = useRef(false);

  const [light, setLight] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  const scrollToProgress = useCallback((target: number) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: max * target,
      behavior: reducedRef.current ? "auto" : "smooth",
    });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = reduced;

    const video = videoRef.current;
    if (video && reduced) {
      video.pause();
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;

      // One fixed video zooms into the singularity as the page scrolls over it.
      if (videoRef.current) {
        const zoom = clamp(p / 0.84, 0, 1);
        videoRef.current.style.transform = `scale(${reduced ? 1 : lerp(1, 4.2, zoom)})`;
      }

      // Warm light blooms out of the event horizon into the finale atmosphere.
      if (bloomRef.current) {
        if (reduced) {
          bloomRef.current.style.opacity = "0";
        } else {
          const t = smoothstep(0.72, 0.88, p);
          const inner = lerp(0, 100, t);
          const outer = lerp(0, 132, t);
          bloomRef.current.style.background = `radial-gradient(circle at 50% 50%, #fffdf7 0%, #fffdf7 ${inner}%, rgba(255, 253, 247, 0) ${outer}%)`;
          bloomRef.current.style.opacity = t > 0 ? "1" : "0";
        }
      }
      const atmosphere = reduced
        ? smoothstep(0.82, 0.9, p)
        : smoothstep(0.78, 0.9, p);
      if (warmFieldRef.current) {
        warmFieldRef.current.style.opacity = String(atmosphere);
      }
      if (coronaRef.current) {
        coronaRef.current.style.opacity = reduced ? "0" : String(smoothstep(0.8, 0.94, p));
      }

      // The finale only becomes readable once the warm light has settled.
      if (finaleRef.current) {
        finaleRef.current.style.opacity = String(smoothstep(0.82, 0.9, p));
      }

      const nextLight = p >= 0.86;
      setLight((current) => (current === nextLight ? current : nextLight));

      const chapter = p < 0.33 ? 0 : p < 0.66 ? 1 : p < 0.85 ? 2 : 3;
      setActiveChapter((current) => (current === chapter ? current : chapter));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const railColor = light ? "bg-zinc-300" : "bg-white/25";
  const railActive = light ? "bg-zinc-900" : "bg-amber-300";

  return (
    <main className="relative w-full overflow-x-clip bg-black">
      <Navbar light={light} onNavigate={scrollToProgress} />

      {/* The only background layer: the black hole video, centred in the viewport. */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transformOrigin: "50% 50%",
            willChange: "transform",
            filter: "contrast(1.1) brightness(0.95)",
          }}
          src="/blackhole.mp4"
          poster="/blackhole-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
      </div>

      <div
        ref={bloomRef}
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{ opacity: 0 }}
        aria-hidden
      />
      <div
        ref={warmFieldRef}
        className="pointer-events-none fixed inset-0 z-[6]"
        style={{
          opacity: 0,
          background:
            "radial-gradient(circle at 50% 18%, #fffdf7 0%, #faf6ee 50%, #f1eadc 100%)",
        }}
        aria-hidden
      />
      <div
        ref={coronaRef}
        className="bh-corona pointer-events-none fixed inset-0 z-[7]"
        style={{ opacity: 0 }}
        aria-hidden
      />

      {/* Chapter navigation rail */}
      <div
        className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex"
        aria-hidden
      >
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              activeChapter === index ? railActive : railColor
            }`}
          />
        ))}
      </div>

      {/* Chapters scroll naturally over the fixed video, so nothing can clip. */}
      <div className="relative">
        {/* Chapter 1 — Deep space */}
        <section
          id="home"
          className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-24 sm:px-10 lg:px-16"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-transparent sm:bg-gradient-to-r"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-6xl">
            <p className="bh-legible flex items-center gap-2.5 text-xs font-medium tracking-wide text-white/55">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              marufdev / portfolio
            </p>

            <h1 className="mt-6 text-balance text-5xl font-medium leading-none tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl">
              Maruf Hasan
            </h1>
            <p className="bh-legible mt-5 text-base font-medium tracking-tight text-amber-300/80 sm:text-lg">
              {PERSONAL_INFO.role}
            </p>
            <p className="bh-legible mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
              {PERSONAL_INFO.about}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToProgress(0.34)}
                className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-amber-200/25 bg-black/45 px-5 text-sm font-medium text-white backdrop-blur-md outline-none transition-colors hover:border-amber-200/55 hover:bg-black/65 focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                Enter the Horizon
                <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm text-white/75 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub ({PERSONAL_INFO.githubHandle})
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/55 bh-legible">
              <span>Scroll to cross the event horizon</span>
              <span className="tabular-nums">01 / 04</span>
            </div>
          </div>
        </section>

        {/* Chapter 2 — Approaching the horizon */}
        <section
          id="focus"
          className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-24 sm:px-10 lg:px-16"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-6xl">
            <header className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="bh-legible text-xs font-medium tracking-wide text-amber-200/70">
                  02 / Core focus
                </p>
                <h2 className="bh-legible mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  Three areas of focus
                </h2>
              </div>
              <p className="bh-legible max-w-sm text-sm leading-6 text-white/70">
                AppSec, LLM hardening, and resilient systems — from the code up.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-3">
              {FOCUS_PILLARS.map((pillar) => (
                <article
                  key={pillar.number}
                  className="rounded-2xl border border-white/15 bg-black/75 p-6 backdrop-blur-xl sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs tabular-nums text-amber-200/70">
                      {pillar.number}
                    </span>
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300/60" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium tracking-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="mb-4 text-xs font-medium text-white/55">Tech stack</p>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/15 bg-black/75 px-4 py-2 text-xs text-white/80 backdrop-blur-xl"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 3 — Crossing the horizon */}
        <section
          id="projects"
          className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-24 sm:px-10 lg:px-16"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-6xl">
            <header className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="bh-legible text-xs font-medium tracking-wide text-amber-200/70">
                  03 / Featured projects
                </p>
                <h2 className="bh-legible mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  Open-source work
                </h2>
              </div>
              <p className="bh-legible max-w-sm text-sm leading-6 text-white/70">
                Three public repositories across Android, the web, and systems code.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-3">
              {PROJECTS.map((project) => (
                <article
                  key={project.id}
                  className="flex flex-col rounded-2xl border border-white/15 bg-black/75 p-6 backdrop-blur-xl sm:p-8"
                >
                  <p className="font-mono text-xs leading-5 text-amber-200/70">
                    {project.category}
                  </p>
                  <h3 className="mt-5 text-xl font-medium tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-white/60">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 border-t border-white/10 pt-6 text-sm text-white/85 outline-none transition-colors hover:text-amber-200 focus-visible:ring-2 focus-visible:ring-amber-300"
                  >
                    <GithubIcon className="h-4 w-4" />
                    View repository
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter 4 — Singularity finale */}
        <section
          id="contact"
          className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-24 sm:px-10 lg:px-16"
        >
          <div ref={finaleRef} className="mx-auto w-full max-w-4xl" style={{ opacity: 0 }}>
            <p className="text-xs font-medium tracking-wide text-zinc-500">
              04 / Beyond the horizon
            </p>
            <h2 className="mt-4 text-balance text-4xl font-medium tracking-[-0.035em] text-zinc-950 sm:text-6xl">
              Beyond the horizon
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600">
              {PERSONAL_INFO.role} working across application security, LLM hardening,
              and secure software systems.
            </p>

            <div className="mt-10 divide-y divide-amber-900/10 rounded-2xl border border-amber-900/10 bg-white/90 p-6 shadow-xl backdrop-blur-xl sm:p-8">
              <div className="grid gap-1 py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
                <span className="text-xs font-medium text-zinc-500">Education</span>
                <div>
                  <p className="text-base text-zinc-900">{EDUCATION.degree}</p>
                  <p className="mt-1 text-sm text-zinc-600">{EDUCATION.institution}</p>
                </div>
              </div>
              <div className="grid gap-1 py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
                <span className="text-xs font-medium text-zinc-500">Contact</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex w-fit items-center gap-2 text-base text-zinc-900 underline decoration-zinc-300 underline-offset-4 outline-none transition-colors hover:decoration-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900"
                >
                  <Mail className="h-4 w-4" />
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="grid gap-1 py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
                <span className="text-xs font-medium text-zinc-500">GitHub</span>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-base text-zinc-900 underline decoration-zinc-300 underline-offset-4 outline-none transition-colors hover:decoration-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900"
                >
                  <GithubIcon className="h-4 w-4" />
                  {PERSONAL_INFO.githubHandle}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToProgress(0)}
              className="group mt-10 inline-flex min-h-11 items-center gap-2 rounded-xl border border-zinc-300 px-5 text-sm font-medium text-zinc-900 outline-none transition-colors hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              Return to Orbit
            </button>

            <p className="mt-12 text-xs text-zinc-400">
              © {new Date().getFullYear()} {PERSONAL_INFO.name} · {PERSONAL_INFO.domain}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
