"use client";

import { useEffect, useRef } from "react";
import { useActiveSection } from "@/components/ActiveSectionContext";

type Stop = { x: number; y: number; scale: number };

// Home → Focus → Projects → Contact. Focus is deliberately oversized so the
// 360° accretion ring reads behind all three Focus cards.
const DESKTOP_STOPS: Stop[] = [
  { x: 22, y: 0, scale: 1.48 },
  { x: 0, y: 0, scale: 1.65 },
  { x: 0, y: 0, scale: 1.15 },
  { x: 0, y: 33, scale: 3.65 },
];

const MOBILE_STOPS: Stop[] = [
  { x: 0, y: 18, scale: 1.15 },
  { x: 0, y: 0, scale: 1.35 },
  { x: 0, y: 0, scale: 1.15 },
  { x: 0, y: 30, scale: 2.8 },
];

const CROSSFADE_SEC = 0.85;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const smoothstep = (start: number, end: number, value: number) => {
  const t = clamp01((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

// Overlapping bell curve centred on a section stop. The three layer weights
// are normalized below, so their sum is always 1 — no dark flash mid-fade.
const bell = (value: number, center: number) =>
  Math.exp(-9 * (value - center) ** 2);

export default function BlackHoleStage() {
  const { stageUpdateRef } = useActiveSection();
  const transformRef = useRef<HTMLDivElement | null>(null);
  const edgeRef = useRef<HTMLVideoElement | null>(null);
  const layer2ARef = useRef<HTMLVideoElement | null>(null);
  const layer2BRef = useRef<HTMLVideoElement | null>(null);
  const vortexRef = useRef<HTMLVideoElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);
  const topFadeRef = useRef<HTMLDivElement | null>(null);
  const hasStartedFocusRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      edgeRef.current?.pause();
      layer2ARef.current?.pause();
      layer2BRef.current?.pause();
      vortexRef.current?.pause();
    }

    let targetProgress = 0;
    let smoothProgress = 0;
    let raf = 0;
    let activeLayer: "A" | "B" = "A";
    let focusBlendA = 1;
    let focusBlendB = 0;

    const apply = (value: number) => {
      const p = Math.min(3, Math.max(0, value));
      const stops = window.innerWidth < 768 ? MOBILE_STOPS : DESKTOP_STOPS;
      const index = Math.min(2, Math.floor(p));
      const t = smoothstep(0, 1, p - index);
      const from = stops[index];
      const to = stops[index + 1];

      if (transformRef.current) {
        transformRef.current.style.transform =
          `translate(${lerp(from.x, to.x, t)}%, ${lerp(from.y, to.y, t)}%) ` +
          `scale(${lerp(from.scale, to.scale, t)})`;
      }

      // Edge-on for Home/Contact, dual-buffered 360° orbit for Focus,
      // face-on vortex for Projects. Normalized bells keep brightness steady.
      const wHome = bell(p, 0);
      const wFocus = bell(p, 1);
      const wProjects = bell(p, 2);
      const wContact = bell(p, 3);
      const total = wHome + wFocus + wProjects + wContact;
      const focusWeight = wFocus / total;

      if (edgeRef.current) {
        edgeRef.current.style.opacity = String((wHome + wContact) / total);
      }
      if (vortexRef.current) {
        vortexRef.current.style.opacity = String(wProjects / total);
      }

      const a = layer2ARef.current;
      const b = layer2BRef.current;

      if (p < 0.35) {
        // On Home: both buffers parked on frame 0, A armed for the next entry.
        for (const video of [a, b]) {
          if (video) {
            video.pause();
            if (video.currentTime > 0) video.currentTime = 0;
          }
        }
        activeLayer = "A";
        focusBlendA = 1;
        focusBlendB = 0;
        hasStartedFocusRef.current = false;
      } else {
        // Entry cue: A starts from 0.0s exactly as before, once.
        if (!hasStartedFocusRef.current && !reducedMotion) {
          hasStartedFocusRef.current = true;
          if (a) void a.play().catch(() => {});
        }

        // Loop handoff — evaluated on every rAF frame (apply is called by tick).
        const activeEl = activeLayer === "A" ? a : b;
        const standbyEl = activeLayer === "A" ? b : a;
        if (activeEl && standbyEl) {
          const dur = activeEl.duration;
          if (
            Number.isFinite(dur) &&
            dur > 2 &&
            activeEl.currentTime >= dur - CROSSFADE_SEC
          ) {
            if (standbyEl.paused) {
              standbyEl.currentTime = 0;
              void standbyEl.play().catch(() => {});
            }

            const blend = clamp01(
              (activeEl.currentTime - (dur - CROSSFADE_SEC)) / CROSSFADE_SEC
            );
            const ease = smoothstep(0, 1, blend);
            if (activeLayer === "A") {
              focusBlendA = 1 - ease;
              focusBlendB = ease;
            } else {
              focusBlendB = 1 - ease;
              focusBlendA = ease;
            }

            if (blend >= 1 || activeEl.ended) {
              activeEl.pause();
              activeEl.currentTime = 0;
              if (activeLayer === "A") {
                focusBlendA = 0;
                focusBlendB = 1;
                activeLayer = "B";
              } else {
                focusBlendB = 0;
                focusBlendA = 1;
                activeLayer = "A";
              }
            }
          }
        }
      }

      // Blend within Focus is multiplied by the section weight so total
      // brightness stays constant through both the section and loop fades.
      if (a) a.style.opacity = String(focusWeight * focusBlendA);
      if (b) b.style.opacity = String(focusWeight * focusBlendB);

      if (fadeRef.current) {
        fadeRef.current.style.opacity = String(smoothstep(2.2, 2.8, p));
      }
      if (topFadeRef.current) {
        topFadeRef.current.style.opacity = String(smoothstep(2.3, 3, p));
      }
    };

    // Continuous damped loop: fast wheel/navbar jumps glide over ~600ms.
    const tick = () => {
      smoothProgress += (targetProgress - smoothProgress) * 0.085;
      if (Math.abs(targetProgress - smoothProgress) < 0.0005) {
        smoothProgress = targetProgress;
      }
      apply(smoothProgress);
      raf = window.requestAnimationFrame(tick);
    };

    stageUpdateRef.current = (progress: number) => {
      targetProgress = progress;
    };

    apply(smoothProgress);
    raf = window.requestAnimationFrame(tick);

    return () => {
      stageUpdateRef.current = null;
      window.cancelAnimationFrame(raf);
    };
  }, [stageUpdateRef]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
      aria-hidden
    >
      <div
        ref={transformRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "translate(22%, 0%) scale(1.48)" }}
      >
        <video
          ref={edgeRef}
          src="/blackhole-horizon-loop.mp4"
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out"
          style={{ opacity: 1 }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={layer2ARef}
          src="/blackhole-focus-360-v2.mp4"
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out"
          style={{ opacity: 0 }}
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={layer2BRef}
          src="/blackhole-focus-360-v2.mp4"
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out"
          style={{ opacity: 0 }}
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={vortexRef}
          src="/blackhole-vortex-loop.mp4"
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out"
          style={{ opacity: 0 }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>

      <div
        ref={topFadeRef}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[58vh] bg-gradient-to-b from-black via-black/80 to-transparent"
        style={{ opacity: 0 }}
      />

      <div ref={fadeRef} className="absolute inset-0 z-10" style={{ opacity: 0 }}>
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      </div>
    </div>
  );
}
