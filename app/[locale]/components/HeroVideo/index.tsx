'use client';

import { useRef, useEffect, useState } from 'react';

interface HeroVideoProps {
  videoSrc: string;
  poster?: string;
  className?: string;
}

/**
 * HeroVideo Component
 *
 * Plays video once on page load/refresh and stops on last frame.
 * Uses <source> tags for webm/mp4 fallback.
 *
 * Loading strategy:
 * - preload="auto" ensures browser fetches video early
 * - Waits for 'canplay' event if video isn't ready yet
 * - Falls back to poster image if autoplay is blocked
 */
export function HeroVideo({
  videoSrc,
  poster,
  className = '',
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasPlayed.current) return;

    const tryPlay = () => {
      if (hasPlayed.current) return;
      hasPlayed.current = true;

      video.play().catch(() => {
        // Autoplay blocked — video stays on poster frame
      });
    };

    // If video data is already available (e.g. cached), play immediately
    if (video.readyState >= 3) {
      tryPlay();
      return;
    }

    // Otherwise wait until enough data is buffered
    video.addEventListener('canplay', tryPlay, { once: true });

    return () => {
      video.removeEventListener('canplay', tryPlay);
    };
  }, []);

  if (hasError) {
    return null;
  }

  return (
    <div className={`relative w-full ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-auto"
        muted
        playsInline
        preload="auto"
        poster={poster}
        onError={() => setHasError(true)}
      >
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
      </video>
    </div>
  );
}

export default HeroVideo;
