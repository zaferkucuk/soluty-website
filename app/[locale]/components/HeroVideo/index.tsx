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
 */
export function HeroVideo({ 
  videoSrc, 
  poster,
  className = '' 
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {
      // Autoplay blocked — video stays on first frame
    });
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
