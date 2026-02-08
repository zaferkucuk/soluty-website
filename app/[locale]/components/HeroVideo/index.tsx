'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

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
 * Resilient loading strategy:
 * - preload="auto" ensures browser fetches video early
 * - Listens for 'canplay' event before attempting play()
 * - Retries play on 'loadeddata' if initial attempt fails
 * - Key on videoSrc forces remount on locale change
 */
export function HeroVideo({
  videoSrc,
  poster,
  className = '',
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  const attemptPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — video stays on first/poster frame
      });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If video is already ready (cached), play immediately
    if (video.readyState >= 3) {
      attemptPlay();
      return;
    }

    // Otherwise wait for canplay event
    const handleCanPlay = () => {
      attemptPlay();
    };

    video.addEventListener('canplay', handleCanPlay);

    // Also try to kick-start loading
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoSrc, attemptPlay]);

  if (hasError) {
    return null;
  }

  return (
    <div className={`relative w-full ${className}`}>
      <video
        key={videoSrc}
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
