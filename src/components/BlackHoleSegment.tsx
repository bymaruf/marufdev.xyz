"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type BlackHoleSegmentProps = {
  startTime: number;
  /** Kept in the page API; native loop now carries playback past this point. */
  endTime: number;
  /** Applied to the video itself (opacity, placement). */
  className?: string;
  /** Optional inline transform override for per-route framing. */
  style?: CSSProperties;
  /** Defaults to the full clip; the hero uses the edge-on seamless loop. */
  src?: string;
};

export default function BlackHoleSegment({
  startTime,
  className = "",
  style,
  src = "/blackhole.mp4",
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
        src={src}
        poster="/blackhole-poster.jpg"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        className={`absolute inset-0 h-full w-full object-contain ${className}`}
        style={style}
      />
    </div>
  );
}
