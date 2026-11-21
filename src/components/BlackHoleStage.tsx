"use client";

import { useEffect, useRef } from "react";

export default function BlackHoleStage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 flex h-[62vh] select-none items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src="/blackhole-horizon-loop.mp4"
        className="absolute inset-0 h-full w-full translate-x-0 object-contain [--bh-arch-scale:3.4] md:[--bh-arch-scale:4.6]"
        style={{
          transform: "translate(0px, 25%) scale(var(--bh-arch-scale))",
          transformOrigin: "50% 50%",
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black via-black/40 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
        aria-hidden
      />
    </div>
  );
}
