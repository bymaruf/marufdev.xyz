"use client";

import { useEffect, useRef } from "react";
import { useActiveSection } from "@/components/ActiveSectionContext";
import {
  useLowPerformanceMode,
  useReducedMotion,
} from "@/components/usePerformanceMode";

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
  // Hero: sits in the lower half but lifted ~5vh from the very bottom so the
  // outer ring clears the screen edge while the text stack gains headroom.
  { x: 0, y: 23, scale: 1.22 },
  { x: 0, y: 2, scale: 1.45 },
  { x: 0, y: 2, scale: 1.25 },
  { x: 0, y: 36, scale: 4.6 },
];

const CROSSFADE_SEC = 0.85;

// Optimized, fast-seeking derivatives of the original 3840x3840 source.
// <source media> lets the browser pick the right one natively on first load.
const FOCUS_DESKTOP_SRC = "/blackhole-focus-360-desktop.mp4";
const FOCUS_MOBILE_SRC = "/blackhole-focus-360-mobile.mp4";
const FOCUS_POSTER = "/blackhole-focus-poster.webp";

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
  const reducedMotion = useReducedMotion();
  const lowPerformance = useLowPerformanceMode();
  const transformRef = useRef<HTMLDivElement | null>(null);
  const edgeRef = useRef<HTMLVideoElement | null>(null);
  const layer2ARef = useRef<HTMLVideoElement | null>(null);
  const layer2BRef = useRef<HTMLVideoElement | null>(null);
  const vortexRef = useRef<HTMLVideoElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);
  const topFadeRef = useRef<HTMLDivElement | null>(null);
  const hasStartedFocusRef = useRef(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767.98px)");
    let isMobile = mobileQuery.matches;
    // Reduced motion and a slow first two seconds both collapse the stage to
    // a single-decoder, no-crossfade presentation. Capable desktops are
    // unaffected: simpleMode stays false there.
    const simpleMode = () => isMobile || reducedMotion || lowPerformance;
    if (reducedMotion) {
      edgeRef.current?.pause();
      layer2ARef.current?.pause();
      layer2BRef.current?.pause();
      vortexRef.current?.pause();
    }

    // Never fetch the second focus buffer when only one decoder is allowed.
    const bufferB = layer2BRef.current;
    const syncBufferPreload = () => {
      if (bufferB) bufferB.preload = simpleMode() ? "none" : "auto";
    };
    syncBufferPreload();

    let targetProgress = 0;
    let smoothProgress = 0;
    let raf = 0;
    let activeLayer: "A" | "B" = "A";
    let focusBlendA = 1;
    let focusBlendB = 0;
    let lastActiveTime = 0;

    const resetFocusLoop = () => {
      activeLayer = "A";
      focusBlendA = 1;
      focusBlendB = 0;
      lastActiveTime = 0;
      hasStartedFocusRef.current = false;
    };

    // Low Power Mode on iOS can silently refuse muted autoplay. A rejected
    // play() is retried on the first real gesture by re-running apply().
    let resumeOnGesture = false;
    const tryPlay = (video: HTMLVideoElement | null) => {
      if (!video || reducedMotion) return;
      const attempt = video.play();
      if (attempt && typeof attempt.then === "function") {
        attempt.then(
          () => {
            resumeOnGesture = false;
          },
          () => {
            resumeOnGesture = true;
          }
        );
      }
    };
    const setPlayback = (video: HTMLVideoElement | null, shouldPlay: boolean) => {
      if (!video || reducedMotion) return;
      if (shouldPlay) {
        if (video.paused) tryPlay(video);
      } else if (!video.paused) {
        video.pause();
      }
    };
    // The rAF loop also drives the desktop crossfade while scroll is settled,
    // so cache written values to keep it from dirtying the DOM every frame.
    const setOpacity = (element: HTMLElement | null, value: number) => {
      if (!element) return;
      const next = value.toFixed(3);
      if (element.style.opacity !== next) element.style.opacity = next;
    };

    const onUserGesture = () => {
      if (resumeOnGesture) apply(smoothProgress);
    };
    const onBreakpointChange = () => {
      isMobile = mobileQuery.matches;
      syncBufferPreload();
      if (simpleMode()) {
        resetFocusLoop();
        bufferB?.pause();
      }
      if (!raf) raf = window.requestAnimationFrame(tick);
      apply(smoothProgress);
    };
    mobileQuery.addEventListener("change", onBreakpointChange);
    window.addEventListener("pointerdown", onUserGesture, { passive: true });
    window.addEventListener("touchstart", onUserGesture, { passive: true });

    const apply = (value: number) => {
      const p = Math.min(3, Math.max(0, value));
      const stops = isMobile ? MOBILE_STOPS : DESKTOP_STOPS;
      const index = Math.min(2, Math.floor(p));
      const t = smoothstep(0, 1, p - index);
      const from = stops[index];
      const to = stops[index + 1];

      if (transformRef.current) {
        // translate3d promotes the video stack to its own compositor layer;
        // only transform/opacity ever change, never layout properties.
        const nextTransform =
          `translate3d(${lerp(from.x, to.x, t)}%, ${lerp(from.y, to.y, t)}%, 0) ` +
          `scale(${lerp(from.scale, to.scale, t)})`;
        if (transformRef.current.style.transform !== nextTransform) {
          transformRef.current.style.transform = nextTransform;
        }
      }

      // Edge-on for Home/Contact, 360° orbit for Focus, vortex for Projects.
      // Normalized bells keep brightness steady across the crossfades.
      const wHome = bell(p, 0);
      const wFocus = bell(p, 1);
      const wProjects = bell(p, 2);
      const wContact = bell(p, 3);
      const total = wHome + wFocus + wProjects + wContact;
      const edgeWeight = (wHome + wContact) / total;
      const focusWeight = wFocus / total;
      const projectsWeight = wProjects / total;

      const edge = edgeRef.current;
      const a = layer2ARef.current;
      const b = bufferB;
      const vortex = vortexRef.current;

      if (simpleMode()) {
        // Exactly one decoder runs. The outgoing clip keeps its last frame
        // while its opacity fades out via the same bell curves, so the visual
        // crossfade stays smooth with only the incoming clip playing. A uses
        // its native loop. With reduced motion, setPlayback is a no-op, so
        // the stage stays on a single static frame and never autoplays.
        setOpacity(edge, edgeWeight);
        setOpacity(a, focusWeight);
        setOpacity(b, 0);
        setOpacity(vortex, projectsWeight);

        let dominant: HTMLVideoElement | null = edge;
        let dominantWeight = edgeWeight;
        if (a && focusWeight > dominantWeight) {
          dominant = a;
          dominantWeight = focusWeight;
        }
        if (vortex && projectsWeight > dominantWeight) {
          dominant = vortex;
        }
        setPlayback(edge, dominant === edge);
        setPlayback(a, dominant === a);
        setPlayback(vortex, dominant === vortex);
        if (b && !b.paused) b.pause();
      } else {
        // Desktop keeps the dual-buffer handoff for a seamless 12s loop.
        setPlayback(edge, edgeWeight > 0.01);
        setPlayback(vortex, projectsWeight > 0.01);
        setOpacity(edge, edgeWeight);
        setOpacity(vortex, projectsWeight);

        if (p < 0.35) {
          // On Home: both buffers parked on frame 0, A armed for the next entry.
          for (const video of [a, b]) {
            if (video) {
              video.pause();
              if (video.currentTime > 0) video.currentTime = 0;
            }
          }
          resetFocusLoop();
        } else {
          // Entry cue: A starts from 0.0s exactly as before, once.
          if (!hasStartedFocusRef.current && !reducedMotion) {
            hasStartedFocusRef.current = true;
            lastActiveTime = 0;
            tryPlay(a);
          }

          // Loop handoff — evaluated on every rAF frame (apply is called by tick).
          const activeEl = activeLayer === "A" ? a : b;
          const standbyEl = activeLayer === "A" ? b : a;
          if (activeEl && standbyEl) {
            const dur = activeEl.duration;
            const currentTime = activeEl.currentTime;
            // Native `loop` wraps currentTime to 0 instead of firing `ended`,
            // so finish the crossfade on the wrap as well as on the tail.
            const wrapped = currentTime < lastActiveTime - 0.5;
            lastActiveTime = currentTime;
            const inTail =
              Number.isFinite(dur) &&
              dur > 2 &&
              currentTime >= dur - CROSSFADE_SEC;

            if (inTail || wrapped) {
              if (standbyEl.paused) {
                standbyEl.currentTime = 0;
                tryPlay(standbyEl);
              }

              const blend = wrapped
                ? 1
                : clamp01((currentTime - (dur - CROSSFADE_SEC)) / CROSSFADE_SEC);
              const ease = smoothstep(0, 1, blend);
              if (activeLayer === "A") {
                focusBlendA = 1 - ease;
                focusBlendB = ease;
              } else {
                focusBlendB = 1 - ease;
                focusBlendA = ease;
              }

              if (blend >= 1 || activeEl.ended || wrapped) {
                activeEl.pause();
                activeEl.currentTime = 0;
                lastActiveTime = 0;
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
        setOpacity(a, focusWeight * focusBlendA);
        setOpacity(b, focusWeight * focusBlendB);
      }

      setOpacity(fadeRef.current, smoothstep(2.2, 2.8, p));
      setOpacity(topFadeRef.current, smoothstep(2.3, 3, p));
    };

    // Damped loop: fast scroll/navbar jumps glide over ~600ms. On mobile
    // there is no crossfade to drive, so it idles once progress has settled.
    const tick = () => {
      raf = 0;
      smoothProgress += (targetProgress - smoothProgress) * 0.085;
      if (Math.abs(targetProgress - smoothProgress) < 0.0005) {
        smoothProgress = targetProgress;
      }
      apply(smoothProgress);
      if (!isMobile || smoothProgress !== targetProgress) {
        raf = window.requestAnimationFrame(tick);
      }
    };

    stageUpdateRef.current = (progress: number) => {
      targetProgress = progress;
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    apply(smoothProgress);
    raf = window.requestAnimationFrame(tick);

    return () => {
      stageUpdateRef.current = null;
      window.cancelAnimationFrame(raf);
      mobileQuery.removeEventListener("change", onBreakpointChange);
      window.removeEventListener("pointerdown", onUserGesture);
      window.removeEventListener("touchstart", onUserGesture);
    };
  }, [stageUpdateRef, reducedMotion, lowPerformance]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
      aria-hidden
    >
      <div
        ref={transformRef}
        className="absolute inset-0"
        style={{
          transform: "translate3d(22%, 0%, 0) scale(1.48)",
          willChange: "transform, opacity",
        }}
      >
        <video
          ref={edgeRef}
          src="/blackhole-horizon-loop.mp4"
          className="absolute inset-0 h-full w-full object-contain"
          style={{ opacity: 1, willChange: "opacity" }}
          loop
          muted
          playsInline
          preload="auto"
        />
        <video
          ref={layer2ARef}
          poster={FOCUS_POSTER}
          className="absolute inset-0 h-full w-full object-contain"
          style={{ opacity: 0, willChange: "opacity" }}
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            media="(max-width: 767.98px)"
            src={FOCUS_MOBILE_SRC}
            type="video/mp4"
          />
          <source
            media="(min-width: 768px)"
            src={FOCUS_DESKTOP_SRC}
            type="video/mp4"
          />
        </video>
        {/* Mobile decodes only the first focus clip; this second buffer is
            display:none and never preloaded there. Desktop keeps the handoff. */}
        <video
          ref={layer2BRef}
          poster={FOCUS_POSTER}
          className="absolute inset-0 hidden h-full w-full object-contain md:block"
          style={{ opacity: 0, willChange: "opacity" }}
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            media="(max-width: 767.98px)"
            src={FOCUS_MOBILE_SRC}
            type="video/mp4"
          />
          <source
            media="(min-width: 768px)"
            src={FOCUS_DESKTOP_SRC}
            type="video/mp4"
          />
        </video>
        <video
          ref={vortexRef}
          src="/blackhole-vortex-loop.mp4"
          className="absolute inset-0 h-full w-full object-contain"
          style={{ opacity: 0, willChange: "opacity" }}
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
