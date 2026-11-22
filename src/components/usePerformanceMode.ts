"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type Listener = () => void;

const FPS_FLOOR = 28;
const SAMPLE_MS = 2000;
const WARMUP_MS = 250; // hydration/first paint shouldn't count as a slow GPU

const listeners = new Set<Listener>();
let lightweight = false;
let monitorStarted = false;

function subscribe(listener: Listener) {
  listeners.add(listener);
  if (!monitorStarted && typeof window !== "undefined") {
    monitorStarted = true;
    startFpsProbe();
  }
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return lightweight;
}

function getServerSnapshot() {
  return false;
}

function setLightweight(next: boolean) {
  if (lightweight === next) return;
  lightweight = next;
  listeners.forEach((listener) => listener());
}

// One probe per session, shared by the stage and the page so both switch to
// the lightweight path together (and only on genuinely weak desktops).
function startFpsProbe() {
  const desktop = window.matchMedia("(min-width: 768px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!desktop.matches || reduced.matches) {
    // A device rotated/resized into desktop later gets its own one-shot probe.
    const retry = () => {
      if (!desktop.matches || reduced.matches) return;
      desktop.removeEventListener("change", retry);
      reduced.removeEventListener("change", retry);
      startFpsProbe();
    };
    desktop.addEventListener("change", retry);
    reduced.addEventListener("change", retry);
    return;
  }

  let frames = 0;
  let start = 0;

  const onVisibility = () => {
    // A backgrounded tab throttles rAF; don't mistake that for a weak GPU.
    if (document.hidden) {
      frames = 0;
      start = 0;
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  const tick = (now: number) => {
    if (!start) start = now;
    const elapsed = now - start;
    if (elapsed >= WARMUP_MS) frames += 1;
    if (elapsed < SAMPLE_MS) {
      requestAnimationFrame(tick);
      return;
    }
    document.removeEventListener("visibilitychange", onVisibility);
    const fps = (frames * 1000) / (elapsed - WARMUP_MS);
    if (fps < FPS_FLOOR) setLightweight(true);
  };
  requestAnimationFrame(tick);
}

/**
 * True once the first two seconds of desktop frames average below 28 FPS.
 * Mobile viewports and reduced-motion sessions are already lightweight, so
 * they are never probed. Stays true for the session once tripped.
 */
export function useLowPerformanceMode() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Reactive OS-level reduced-motion preference (false during SSR/hydration). */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}
