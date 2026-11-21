"use client";

import { useEffect, useRef } from "react";

type BlackHoleSegmentProps = {
  startTime: number;
  /** Kept in the page API; native loop now carries playback past this point. */
  endTime: number;
  /** Applied to the video itself (opacity, desktop placement). */
  className?: string;
};

export default function BlackHoleSegment({
  startTime,
  className = "",
}: BlackHoleSegmentProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasSeeked = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }

    // Metadata can arrive before React attaches onLoadedMetadata (cached loads).
    const video = videoRef.current;
    if (video && !hasSeeked.current && video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      hasSeeked.current = true;
      video.currentTime = startTime;
    }
  }, [startTime]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video || hasSeeked.current) return;
    hasSeeked.current = true;
    video.currentTime = startTime;
  };

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-black"
      aria-hidden
    >
      <video
        ref={videoRef}
        src="/blackhole.mp4"
        poster="/blackhole-poster.jpg"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        className={`absolute inset-0 h-full w-full object-contain ${className}`}
      />
    </div>
  );
}
