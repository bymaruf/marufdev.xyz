"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUp, ArrowUpRight, GraduationCap, Mail } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import BlackHoleStage from "@/components/BlackHoleStage";
import {
  useActiveSection,
  type SectionId,
} from "@/components/ActiveSectionContext";
import {
  EDUCATION,
  FOCUS_PILLARS,
  PERSONAL_INFO,
  PROJECTS,
  TECH_STACK,
} from "@/data/portfolioData";

const ctaPill =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/25 text-sm font-medium text-white transition-all";

const legible = "drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]";
const SECTIONS: SectionId[] = ["home", "focus", "projects", "contact"];

export default function Home() {
  const { setActiveSection, scrollToSection, stageUpdateRef } = useActiveSection();
  const containerRef = useRef<HTMLElement | null>(null);
  const isKeyScrollingRef = useRef(false);
  const hashRef = useRef<SectionId | null>(null);
  const initialHashRef = useRef<string>(
    typeof window === "undefined" ? "" : window.location.hash
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(
        3,
        Math.max(0, container.scrollTop / window.innerHeight)
      );
      stageUpdateRef.current?.(progress);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [stageUpdateRef]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // 0.55 is the primary trigger; the live ratio check keeps tall mobile
    // sections (which can never reach 0.55) in sync too.
    const computeActive = () => {
      const rootRect = root.getBoundingClientRect();
      let bestId: SectionId | null = null;
      let bestRatio = -1;

      SECTIONS.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const visible =
          Math.min(rect.bottom, rootRect.bottom) -
          Math.max(rect.top, rootRect.top);
        const ratio = visible / Math.min(rect.height, rootRect.height);
        if (visible > 0 && ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      if (bestId) {
        setActiveSection(bestId);
        if (hashRef.current !== bestId) {
          hashRef.current = bestId;
          window.history.replaceState(null, "", `#${bestId}`);
        }
      }
    };

    const observer = new IntersectionObserver(computeActive, {
      root,
      threshold: [0, 0.55],
    });

    SECTIONS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    root.addEventListener("scroll", computeActive, { passive: true });
    computeActive();

    return () => {
      observer.disconnect();
      root.removeEventListener("scroll", computeActive);
    };
  }, [setActiveSection]);

  useEffect(() => {
    const id = initialHashRef.current.slice(1) as SectionId;
    if (!SECTIONS.includes(id)) return;
    const frame = window.requestAnimationFrame(() => scrollToSection(id));
    return () => window.cancelAnimationFrame(frame);
  }, [scrollToSection]);

  // Native CSS snap handles wheel/trackpad; keyboard stepping is layered on
  // with a short lock so held keys advance one section at a time.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let keyTimer = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (isKeyScrollingRef.current) return;

      const currentIndex = Math.round(
        container.scrollTop / container.clientHeight
      );
      let nextIndex: number;

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          nextIndex = Math.min(currentIndex + 1, SECTIONS.length - 1);
          break;
        case "ArrowUp":
        case "PageUp":
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = SECTIONS.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      isKeyScrollingRef.current = true;
      container.scrollTo({
        top: nextIndex * container.clientHeight,
        behavior: "smooth",
      });
      window.clearTimeout(keyTimer);
      keyTimer = window.setTimeout(() => {
        isKeyScrollingRef.current = false;
      }, 450);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(keyTimer);
    };
  }, []);

  return (
    <>
      <BlackHoleStage />

      <main
        ref={containerRef}
        className="relative z-10 h-screen snap-y snap-mandatory overflow-x-clip overflow-y-auto scroll-smooth overscroll-contain"
      >
        {/* 01 — Overview */}
        <section
          id="home"
          className="flex min-h-screen snap-start snap-always items-center px-6 py-24 sm:px-10 lg:px-16"
        >
          <div className="w-full max-w-2xl">
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
              <button
                type="button"
                onClick={() => scrollToSection("focus")}
                className={`group ${ctaPill} outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
              >
                Core focus
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className={`group ${ctaPill} outline-none focus-visible:ring-2 focus-visible:ring-amber-300`}
              >
                Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
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
        </section>

        {/* 02 — Core focus */}
        <section
          id="focus"
          className="flex min-h-screen snap-start snap-always items-center px-6 py-24 sm:px-10 lg:px-16"
        >
          <div className="mx-auto w-full max-w-6xl">
            <header className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <h2 className={`${legible} mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl`}>
                  Three areas of focus
                </h2>
              </div>
              <p className={`${legible} max-w-sm text-sm leading-6 text-white/70`}>
                Core areas across AI security, application defense, and software engineering.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-3">
              {FOCUS_PILLARS.map((pillar) => (
                <article
                  key={pillar.number}
                  className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className={`${legible} font-mono text-xs tabular-nums text-amber-200/70`}>
                      {pillar.number}
                    </span>
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300/60" />
                  </div>
                  <h3 className={`${legible} mt-6 text-lg font-medium tracking-tight text-white`}>
                    {pillar.title}
                  </h3>
                  <p className={`${legible} mt-3 text-sm leading-6 text-white/65`}>
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>

            <section className="mt-10 border-t border-white/10 pt-8">
              <h3 className={`${legible} mb-4 text-xs font-medium text-white/55`}>
                Tech stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech}
                    className={`${legible} rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs text-white/80 backdrop-blur-md`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* 03 — Featured projects */}
        <section
          id="projects"
          className="flex min-h-screen snap-start snap-always items-center px-6 py-24 sm:px-10 lg:px-16"
        >
          <div className="mx-auto w-full max-w-6xl">
            <header className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <h2 className={`${legible} mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl`}>
                  Open-source work
                </h2>
              </div>
              <p className={`${legible} max-w-sm text-sm leading-6 text-white/70`}>
                Three public repositories across Android, the web, and systems code.
              </p>
            </header>

            <div className="grid gap-4 md:grid-cols-3">
              {PROJECTS.map((project) => (
                <article
                  key={project.id}
                  className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8"
                >
                  <p className={`${legible} font-mono text-xs leading-5 text-amber-200/70`}>
                    {project.category}
                  </p>
                  <h3 className={`${legible} mt-5 text-xl font-medium tracking-tight text-white`}>
                    {project.title}
                  </h3>
                  <p className={`${legible} mt-3 flex-1 text-sm leading-6 text-white/65`}>
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`${legible} rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${legible} mt-8 inline-flex items-center gap-2 border-t border-white/10 pt-6 text-sm text-white/85 outline-none transition-colors hover:text-amber-200 focus-visible:ring-2 focus-visible:ring-amber-300`}
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

        {/* 04 — Beyond the horizon */}
        <section
          id="contact"
          className="flex min-h-screen snap-start snap-always items-center px-6 py-24 sm:px-10 lg:px-16"
        >
          <div className="mx-auto w-full max-w-3xl">
            <h2 className="text-on-video mt-4 text-balance text-4xl font-medium tracking-[-0.035em] text-white sm:text-6xl">
              Beyond the horizon
            </h2>
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

            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="group mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/75 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md outline-none transition-colors hover:bg-black/90 focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              Back to Top
            </button>

            <p className="text-on-video mt-12 font-mono text-xs text-white/60">
              © {new Date().getFullYear()} {PERSONAL_INFO.name} · {PERSONAL_INFO.domain}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
