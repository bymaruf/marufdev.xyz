"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Eye,
  EyeOff,
  GraduationCap,
  Mail,
  Phone,
  X,
} from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import BlackHoleStage from "@/components/BlackHoleStage";
import {
  useActiveSection,
  type SectionId,
} from "@/components/ActiveSectionContext";
import {
  useLowPerformanceMode,
  useReducedMotion,
} from "@/components/usePerformanceMode";
import {
  EDUCATION,
  FOCUS_PILLARS,
  PERSONAL_INFO,
  PROJECTS,
  TECH_STACK,
} from "@/data/portfolioData";

type CaseStudy = {
  id: string;
  title: string;
  category: string;
  tagline: string;
  summary: string;
  stack: string[];
  githubUrl: string;
  problem: string;
  architecture: string[];
  security: string[];
  highlights: string[];
};

type CaseStudyDetail = Omit<
  CaseStudy,
  "id" | "title" | "category" | "summary" | "stack" | "githubUrl"
>;

const PROJECT_DETAILS: Record<string, CaseStudyDetail> = {
  vibereader: {
    tagline: "An offline-first AI reading studio for Android",
    problem:
      "Readers need a private way to parse EPUB and PDF books and ask contextual questions without uploading their library to a cloud service.",
    architecture: [
      "Android API 24+ native EPUB/PDF parsing engine for on-device document text extraction and chapter structure.",
      "Multi-provider AI Book Assistant supporting OpenCode Zen, Gemini, OpenAI, OpenRouter, Claude, Groq, and DeepSeek through one interface.",
      "Offline Android and Edge Neural text-to-speech plus a 1080×2400 Quote Wallpaper Studio generated from book passages.",
    ],
    security: [
      "Local-first document storage keeps books and reading notes on the device; no server-side content copy.",
      "API keys are isolated from document context, and file inputs are sanitized before parsing or any model call.",
    ],
    highlights: ["Android API 24+", "Offline-First", "Multi-LLM"],
  },
  "banglish-ai": {
    tagline: "Conversational AI for Banglish workflows",
    problem:
      "Bengali-English speakers lack natural conversational interfaces because most AI tools assume English-only prompts and phrasing.",
    architecture: [
      "Lightweight HTML/CSS and JavaScript single-page interface with no backend dependency.",
      "Client-side Banglish tokenization and prompt shaping for conversational AI workflows.",
      "Responsive message layout and progressive interaction states for rapid concept iteration.",
    ],
    security: [
      "Local-first client processing with no server-side conversation storage.",
      "User text is sanitized and explicit before being handed to any external AI provider.",
    ],
    highlights: ["Web Prototype", "Banglish UX", "No Backend"],
  },
  lifestream: {
    tagline: "A deterministic systems core in modern C++",
    problem:
      "Data processing on constrained systems needs predictable, low-overhead execution without garbage-collection pauses.",
    architecture: [
      "Manual memory management with strict ownership for deterministic runtime behavior.",
      "Template-based structured data containers for handling streaming records.",
      "Modular processing pipeline with explicit error handling at every stage.",
    ],
    security: [
      "No network surface — the application runs entirely locally.",
      "Strict input validation and bounds checks on all parsed records.",
    ],
    highlights: ["C++", "Deterministic", "Local-Only"],
  },
};

const CASE_STUDIES: CaseStudy[] = PROJECTS.map((project) => ({
  id: project.id,
  title: project.title,
  category: project.category,
  summary: project.description,
  stack: project.tags,
  githubUrl: project.githubUrl,
  ...PROJECT_DETAILS[project.id],
}));

const ctaPill =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/25 text-sm font-medium text-white transition-all max-md:gap-1.5 max-md:px-4 max-md:py-2 max-md:text-xs";

const legible = "drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]";
const SECTIONS: SectionId[] = ["home", "focus", "projects", "contact"];

const socialPill =
  "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/85 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-300";

// Shared label/value row. Dividers live on the card itself via divide-y so
// there is exactly one consistent rule between rows in either state.
const contactRow = (compact: boolean) =>
  `grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-6 ${compact
    ? "py-2.5 md:py-3.5 [@media(max-width:767px)_and_(max-height:700px)]:py-1.5"
    : "py-2.5 md:py-3.5 [@media(max-width:767px)_and_(max-height:700px)]:py-2"
  }`;

const LINKEDIN_URL = "https://www.linkedin.com/in/maruf-hasan-a530b1424";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61577838673467";
const PHONE_DISPLAY = "+880 1580-506767";
const PHONE_HREF = "tel:+8801580506767";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.75v20.5c0 .97.79 1.75 1.77 1.75h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

export default function Home() {
  const { setActiveSection, scrollToSection, stageUpdateRef } = useActiveSection();
  const reducedMotion = useReducedMotion();
  const lowPerformance = useLowPerformanceMode();
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeFocusCard, setActiveFocusCard] = useState(0);
  const [activeProjectCard, setActiveProjectCard] = useState(0);
  const copyTimerRef = useRef(0);
  const focusTrackRef = useRef<HTMLDivElement | null>(null);
  const projectsTrackRef = useRef<HTMLDivElement | null>(null);
  const modalBodyRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const isKeyScrollingRef = useRef(false);
  const hashRef = useRef<SectionId | null>(null);
  const initialHashRef = useRef<string>(
    typeof window === "undefined" ? "" : window.location.hash
  );

  // Reduced motion and a slow first two seconds drop every surface that sits
  // over the video to a clean translucent panel — no real-time backdrop blur.
  // Capable desktops keep the exact glass treatment they had before.
  const simpleSurfaces = reducedMotion || lowPerformance;
  const cardSurface = simpleSurfaces
    ? "border-white/10 bg-neutral-950/85"
    : "border-white/10 bg-neutral-950/80 md:border-white/12 md:bg-white/[0.03] md:backdrop-blur-md";
  const pillSurface = simpleSurfaces
    ? "border-white/10 bg-neutral-950/85"
    : "border-white/10 bg-neutral-950/70 md:border-white/12 md:bg-white/[0.03] md:backdrop-blur-md";
  const panelSurface = simpleSurfaces
    ? "border-white/15 bg-neutral-950/85"
    : "border-white/15 bg-neutral-950/85 md:bg-black/55 md:backdrop-blur-xl";
  const softPillSurface = simpleSurfaces
    ? "border-white/15 bg-neutral-950/85"
    : "border-white/15 bg-neutral-950/80 md:bg-white/[0.05] md:backdrop-blur-md";
  const ctaSurface = simpleSurfaces
    ? "border-white/20 bg-neutral-950/85"
    : "border-white/20 bg-neutral-950/85 md:bg-black/75 md:backdrop-blur-md";

  useEffect(() => () => window.clearTimeout(copyTimerRef.current), []);

  useEffect(() => {
    if (selectedProject) modalBodyRef.current?.focus();
  }, [selectedProject]);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_DISPLAY);
      setCopiedPhone(true);
      window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopiedPhone(false), 1600);
    } catch {
      // Clipboard can be unavailable in insecure contexts — leave the label intact.
    }
  };

  const goToCarouselCard = (track: HTMLDivElement | null, index: number) => {
    const card = track?.children[index] as HTMLElement | undefined;
    if (!card) return;
    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  // The browser reports which card is centred. No scroll math or setState on
  // every touchmove frame, so dots stay in sync without adding input latency.
  const useActiveCarouselCard = (
    trackRef: RefObject<HTMLDivElement | null>,
    count: number,
    setActive: (index: number) => void
  ) => {
    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;
      const cards = Array.from(track.children) as HTMLElement[];
      if (!cards.length) return;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const index = cards.indexOf(entry.target as HTMLElement);
            if (index >= 0) setActive(index);
          }
        },
        { root: track, threshold: 0.6 }
      );
      cards.forEach((card) => observer.observe(card));
      return () => observer.disconnect();
    }, [trackRef, count, setActive]);
  };

  useActiveCarouselCard(focusTrackRef, FOCUS_PILLARS.length, setActiveFocusCard);
  useActiveCarouselCard(
    projectsTrackRef,
    CASE_STUDIES.length,
    setActiveProjectCard
  );

  const carouselIndicator = (
    count: number,
    active: number,
    onSelect: (index: number) => void
  ) => (
    <div className="mt-3 flex select-none items-center justify-center gap-3 md:hidden [@media(max-width:767px)_and_(max-height:700px)]:mt-1 [@media(max-width:767px)_and_(max-height:700px)]:gap-2">
      <button
        type="button"
        aria-label="Previous card"
        onClick={() => onSelect(Math.max(0, active - 1))}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-300 [@media(max-width:767px)_and_(max-height:700px)]:h-6 [@media(max-width:767px)_and_(max-height:700px)]:w-6"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>
      <div className="flex items-center gap-2" aria-hidden>
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to card ${index + 1}`}
            aria-current={active === index}
            onClick={() => onSelect(index)}
            className={`h-1.5 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
              active === index ? "w-6 bg-amber-300/85" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
      <button
        type="button"
        aria-label="Next card"
        onClick={() => onSelect(Math.min(count - 1, active + 1))}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-300 [@media(max-width:767px)_and_(max-height:700px)]:h-6 [@media(max-width:767px)_and_(max-height:700px)]:w-6"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
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

  // Native CSS snap owns wheel/trackpad/touch scrolling. Keyboard stepping
  // simply targets the adjacent section with scrollIntoView; a short lock
  // keeps held keys from queueing several jumps and skipping sections.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let keyTimer = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      // While the case study dialog is open, Escape closes it and every other
      // key (including arrows) is left alone so the modal body can scroll.
      if (selectedProject || isPhotoExpanded) {
        if (event.key === "Escape") {
          event.preventDefault();
          setSelectedProject(null);
          setIsPhotoExpanded(false);
        }
        return;
      }
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

      // Find the section closest to the viewport top rather than assuming
      // every section is exactly one container tall (mobile dvh / min-h-screen).
      const containerTop = container.getBoundingClientRect().top;
      let currentIndex = 0;
      let closestDistance = Infinity;
      SECTIONS.forEach((id, index) => {
        const section = document.getElementById(id);
        if (!section) return;
        const distance = Math.abs(
          section.getBoundingClientRect().top - containerTop
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          currentIndex = index;
        }
      });

      let nextIndex: number;

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          nextIndex = currentIndex + 1;
          break;
        case "ArrowUp":
        case "PageUp":
          nextIndex = currentIndex - 1;
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

      const nextSection = document.getElementById(
        SECTIONS[Math.min(Math.max(nextIndex, 0), SECTIONS.length - 1)]
      );
      if (!nextSection) return;

      event.preventDefault();
      isKeyScrollingRef.current = true;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      nextSection.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
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
  }, [selectedProject, isPhotoExpanded]);

  return (
    <>
      <BlackHoleStage />

      <main
        ref={containerRef}
        className="page-snap-container snap-y snap-mandatory relative z-10 h-[100dvh] overflow-x-clip overflow-y-auto"
      >
        {/* 01 — Overview */}
        <section
          id="home"
          className="flex h-[100dvh] md:min-h-screen page-snap-section snap-start snap-always items-start justify-start overflow-hidden md:overflow-visible px-6 pt-28 sm:pt-32 pb-6 md:items-center md:py-24 sm:px-10 lg:px-16 [@media(max-width:767px)_and_(max-height:700px)]:pt-16 [@media(max-width:767px)_and_(max-height:700px)]:pb-4"
        >
          <div className="w-full max-w-2xl">
            <h1 className="mt-6 text-balance text-5xl font-medium leading-none tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl max-md:mt-3 max-md:text-4xl">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-on-video mt-5 text-base font-medium tracking-tight text-amber-300/85 sm:text-lg max-md:mt-3 max-md:text-sm">
              {PERSONAL_INFO.role}
            </p>
            <p className="text-on-video mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base max-md:mt-3 max-md:text-xs max-md:leading-6">
              {PERSONAL_INFO.about}
            </p>

            <div className="text-on-video mt-9 flex flex-wrap items-center gap-3 max-md:mt-6">
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
          className="flex h-[100dvh] md:min-h-screen page-snap-section snap-start snap-always items-center justify-start overflow-hidden md:overflow-visible px-6 pt-20 pb-6 md:py-24 sm:px-10 lg:px-16 [@media(max-width:767px)_and_(max-height:700px)]:pt-16 [@media(max-width:767px)_and_(max-height:700px)]:pb-4"
        >
          <div className="mx-auto w-full max-w-6xl">
            <header className="mb-10 flex flex-wrap items-end justify-between gap-5 max-md:mb-4 max-md:gap-3 [@media(max-width:767px)_and_(max-height:700px)]:mb-2">
              <div>
                <h2 className={`${legible} mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl`}>
                  Three areas of focus
                </h2>
              </div>
              <p className={`${legible} max-w-sm text-sm leading-6 text-white/70`}>
                Core areas across AI security, application defense, and software engineering.
              </p>
            </header>

            <div
              ref={focusTrackRef}
              className="no-scrollbar flex snap-x snap-mandatory scroll-smooth touch-pan-x touch-pan-y gap-3.5 overflow-x-auto -mx-6 px-[9vw] pb-2 max-md:select-none sm:-mx-10 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 [@media(max-width:767px)_and_(max-height:700px)]:pb-0"
            >
              {FOCUS_PILLARS.map((pillar) => (
                <article
                  key={pillar.number}
                  className={`w-[82vw] max-w-[340px] shrink-0 snap-center snap-always rounded-2xl ${cardSurface} p-6 sm:p-8 md:w-auto md:max-w-none md:min-w-0 [@media(max-width:767px)_and_(max-height:700px)]:p-4`}
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

            {carouselIndicator(
              FOCUS_PILLARS.length,
              activeFocusCard,
              (index) => goToCarouselCard(focusTrackRef.current, index)
            )}

            <section className="mt-10 border-t border-white/10 pt-8 max-md:mt-5 max-md:pt-4 [@media(max-width:767px)_and_(max-height:700px)]:mt-3 [@media(max-width:767px)_and_(max-height:700px)]:pt-3">
              <h3 className={`${legible} mb-4 text-xs font-medium text-white/55`}>
                Tech stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech}
                    className={`${legible} rounded-full ${pillSurface} px-4 py-2 text-xs text-white/80 max-md:px-3 max-md:py-1.5`}
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
          className="flex h-[100dvh] md:min-h-screen page-snap-section snap-start snap-always items-center justify-start overflow-hidden md:overflow-visible px-6 pt-20 pb-6 md:py-24 sm:px-10 lg:px-16 [@media(max-width:767px)_and_(max-height:700px)]:pt-16 [@media(max-width:767px)_and_(max-height:700px)]:pb-2"
        >
          <div className="mx-auto w-full max-w-6xl">
            <header className="mb-10 flex flex-wrap items-end justify-between gap-5 max-md:mb-4 max-md:gap-3 [@media(max-width:767px)_and_(max-height:700px)]:mb-2">
              <div>
                <h2 className={`${legible} mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl`}>
                  Open-source work
                </h2>
              </div>
              <p className={`${legible} max-w-sm text-sm leading-6 text-white/70`}>
                Three public repositories across Android, the web, and systems code.
              </p>
            </header>

            <div
              ref={projectsTrackRef}
              className="no-scrollbar flex snap-x snap-mandatory scroll-smooth touch-pan-x touch-pan-y gap-3.5 overflow-x-auto -mx-6 px-[9vw] pb-2 max-md:select-none sm:-mx-10 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0 [@media(max-width:767px)_and_(max-height:700px)]:pb-0"
            >
              {CASE_STUDIES.map((project) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`flex h-full w-[82vw] max-w-[340px] shrink-0 cursor-pointer snap-center snap-always flex-col rounded-2xl ${cardSurface} p-6 sm:p-8 md:w-auto md:max-w-none md:min-w-0`}
                >
                  <p className={`${legible} font-mono text-xs leading-5 text-amber-200/70`}>
                    {project.category}
                  </p>
                  <h3 className={`${legible} mt-5 text-xl font-medium tracking-tight text-white`}>
                    {project.title}
                  </h3>
                  <p className={`${legible} mt-3 flex-1 text-sm leading-6 text-white/65`}>
                    {project.summary}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className={`${legible} rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className={`${legible} mt-4 inline-flex w-fit items-center gap-1.5 text-xs font-medium text-amber-200/80 outline-none transition-colors hover:text-amber-200 focus-visible:ring-2 focus-visible:ring-amber-300`}
                  >
                    View Case Study
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className={`${legible} mt-4 inline-flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-white/85 outline-none transition-colors hover:text-amber-200 focus-visible:ring-2 focus-visible:ring-amber-300`}
                  >
                    <GithubIcon className="h-4 w-4" />
                    View repository
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </article>
              ))}
            </div>

            {carouselIndicator(
              CASE_STUDIES.length,
              activeProjectCard,
              (index) => goToCarouselCard(projectsTrackRef.current, index)
            )}
          </div>
        </section>

        {/* 04 — Beyond the horizon */}
        <section
          id="contact"
          className="flex h-[100dvh] md:min-h-screen page-snap-section snap-start snap-always items-center justify-start overflow-hidden md:overflow-visible px-6 pt-20 pb-6 md:pt-24 md:pb-8 sm:px-10 lg:px-16 [@media(max-width:767px)_and_(max-height:700px)]:pt-16 [@media(max-width:767px)_and_(max-height:700px)]:pb-3"
        >
          <div className="mx-auto w-full max-w-3xl">
            <h2 className="text-on-video mt-4 text-balance text-4xl font-medium tracking-[-0.035em] text-white sm:text-6xl max-md:mt-0 max-md:text-3xl">
              Beyond the horizon
            </h2>
            <p className="text-on-video mt-5 max-w-xl text-base leading-7 text-white/70 max-md:mt-2 max-md:text-sm max-md:leading-6">
              {PERSONAL_INFO.role} working across application security, LLM hardening,
              and secure software systems.
            </p>

            <div className={`rounded-2xl divide-y divide-white/10 ${panelSurface} ${isMoreInfoOpen
              ? "mt-1 md:mt-4 max-md:p-4 md:p-6 [@media(max-width:767px)_and_(max-height:700px)]:p-3"
              : "mt-5 md:mt-10 max-md:p-4 md:p-8 [@media(max-width:767px)_and_(max-height:700px)]:p-3"
              }`}>
              <div className="flex items-center justify-between gap-3 pb-1 md:pb-2">
                {isMoreInfoOpen ? (
                  <div className="flex min-w-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPhotoExpanded(true)}
                      title="Expand photo"
                      aria-label="Expand photo"
                      className="group h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/[0.03] outline-none ring-amber-300/40 transition hover:ring-2 focus-visible:ring-2 md:h-20 md:w-20 [@media(max-width:767px)_and_(max-height:700px)]:h-12 [@media(max-width:767px)_and_(max-height:700px)]:w-12"
                    >
                      <Image
                        src="/maruf-profile.png"
                        alt="Md. Maruf Hasan"
                        width={80}
                        height={80}
                        className="h-full w-full bg-transparent object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </button>
                    <div className="min-w-0">
                      <p className="text-lg font-semibold text-white md:text-xl">
                        Md. Maruf Hasan
                      </p>
                      <p className="text-xs text-white/60 md:text-sm">
                        AI Engineer &amp; Cybersecurity Builder
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                    Details
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setIsMoreInfoOpen((open) => !open)}
                  aria-expanded={isMoreInfoOpen}
                  className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full ${softPillSurface} px-3 py-1.5 text-xs font-medium text-white/75 outline-none transition-colors hover:bg-white/[0.1] hover:text-white focus-visible:ring-2 focus-visible:ring-amber-300`}
                >
                  {isMoreInfoOpen ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                  {isMoreInfoOpen ? "Hide Info" : "More Info"}
                </button>
              </div>

              <div className={contactRow(isMoreInfoOpen)}>
                <span className="flex items-center gap-2 text-xs font-medium text-white/50">
                  <GraduationCap className="h-4 w-4" />
                  Education
                </span>
                <div>
                  <p className="text-base text-white">{EDUCATION.degree}</p>
                  <p className="mt-1 text-sm text-white/65">{EDUCATION.institution}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 py-2.5 md:py-3.5">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialPill}
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  GitHub
                  <ArrowUpRight className="h-3 w-3 text-white/50" />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialPill}
                >
                  <LinkedInIcon className="h-3.5 w-3.5" />
                  LinkedIn
                  <ArrowUpRight className="h-3 w-3 text-white/50" />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialPill}
                >
                  <FacebookIcon className="h-3.5 w-3.5" />
                  Facebook
                  <ArrowUpRight className="h-3 w-3 text-white/50" />
                </a>
              </div>

              <div className={contactRow(isMoreInfoOpen)}>
                <span className="flex items-center gap-2 text-xs font-medium text-white/50">
                  <Mail className="h-4 w-4" />
                  Email
                </span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex w-fit items-center gap-2 text-base text-white no-underline outline-none transition-colors hover:text-amber-100 focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isMoreInfoOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                  }`}
                aria-hidden={!isMoreInfoOpen}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className={contactRow(isMoreInfoOpen)}>
                    <span className="flex items-center gap-2 text-xs font-medium text-white/50">
                      <Phone className="h-4 w-4" />
                      Phone
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={PHONE_HREF}
                        className="text-base text-white no-underline outline-none transition-colors hover:text-amber-100 focus-visible:ring-2 focus-visible:ring-amber-300"
                      >
                        {PHONE_DISPLAY}
                      </a>
                      <button
                        type="button"
                        onClick={copyPhone}
                        aria-label="Copy phone number"
                        title="Copy phone number"
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/60 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-300"
                      >
                        {copiedPhone ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className={`group inline-flex w-fit items-center gap-2 rounded-full ${ctaSurface} px-5 py-2.5 text-sm font-medium text-white outline-none transition-colors hover:bg-black/90 focus-visible:ring-2 focus-visible:ring-amber-300 ${isMoreInfoOpen
                ? "mt-4"
                : "mt-10 max-md:mt-4 [@media(max-width:767px)_and_(max-height:700px)]:mt-4"
                }`}
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              Back to Top
            </button>

            <p className={`text-on-video font-mono text-xs text-white/60 ${isMoreInfoOpen
              ? "mt-3 max-md:mt-0 [@media(max-width:767px)_and_(max-height:700px)]:mt-0"
              : "mt-12 max-md:mt-4 [@media(max-width:767px)_and_(max-height:700px)]:mt-3"
              }`}>
              © {new Date().getFullYear()} {PERSONAL_INFO.name} · {PERSONAL_INFO.domain}
            </p>
          </div>
        </section>
      </main>

      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/55 p-4 backdrop-blur-md"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-[88dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#0a0a0b]/75 shadow-[0_0_50px_-15px_rgba(234,88,12,0.18)] backdrop-blur-md"
          >
            <header className="relative z-10 flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-5 md:p-6">
              <div className="min-w-0">
                <p className="text-xs text-neutral-500">Case study</p>
                <h2
                  id="case-study-title"
                  className="mt-2 text-2xl font-medium tracking-tight text-white"
                >
                  {selectedProject.title}
                </h2>
                <p className="mt-1.5 text-sm text-neutral-400">
                  {selectedProject.tagline}
                </p>
                <p className="mt-3 font-mono text-[11px] leading-5 text-neutral-500">
                  {selectedProject.highlights.join(" · ")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close case study"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-neutral-400 outline-none transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div
              ref={modalBodyRef}
              tabIndex={-1}
              className="relative z-10 flex-1 space-y-6 overflow-y-auto p-5 md:p-6 outline-none"
            >
              <section>
                <h3 className="text-xs font-medium text-neutral-400">Overview</h3>
                <div className="mt-3 space-y-3 text-sm leading-6 text-neutral-300">
                  <p>{selectedProject.summary}</p>
                  <p>{selectedProject.problem}</p>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-medium text-neutral-400">
                  System architecture
                </h3>
                <ul className="mt-3 space-y-3 text-sm leading-6 text-neutral-300">
                  {selectedProject.architecture.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xs font-medium text-neutral-400">
                  Security &amp; hardening
                </h3>
                <ul className="mt-3 space-y-3 text-sm leading-6 text-neutral-300">
                  {selectedProject.security.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xs font-medium text-neutral-400">Tech stack</h3>
                <p className="mt-3 font-mono text-xs leading-6 text-neutral-400">
                  {selectedProject.stack.join(" · ")}
                </p>
              </section>
            </div>

            <footer className="relative z-10 flex shrink-0 items-center justify-end gap-2 border-t border-white/10 p-4 md:p-5">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center rounded-lg px-3 py-2 text-sm text-neutral-400 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Close
              </button>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-950 outline-none transition-colors hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-white/40"
              >
                View on GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </footer>
          </div>
        </div>
      )}

      {isPhotoExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Profile photo"
          onClick={() => setIsPhotoExpanded(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4 backdrop-blur-md"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative flex aspect-square w-full max-w-md items-end justify-center overflow-hidden rounded-3xl border border-amber-400/25 bg-black shadow-2xl"
          >
            <video
              src="/yellow-black-hole.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.88)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <Image
              src="/maruf-profile.png"
              alt="Md. Maruf Hasan"
              width={400}
              height={400}
              className="relative z-10 h-[85%] w-auto object-contain drop-shadow-[0_10px_28px_rgba(0,0,0,0.9)] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
            />
            <button
              type="button"
              onClick={() => setIsPhotoExpanded(false)}
              aria-label="Close photo"
              className="absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/85 outline-none transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="absolute inset-x-0 bottom-4 z-20 text-center text-xs font-medium text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              Md. Maruf Hasan · AI Engineer &amp; Cybersecurity Builder
            </p>
          </div>
        </div>
      )}
    </>
  );
}
