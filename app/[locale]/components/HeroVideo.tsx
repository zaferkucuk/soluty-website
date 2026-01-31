'use client';

import { useRef, useState } from 'react';

interface HeroVideoProps {
  /** Path to the video file (e.g., "/videos/hero.webm") */
  videoSrc: string;
  /** Optional poster image for video */
  poster?: string;
  /** Optional className for container */
  className?: string;
}

/**
 * HeroVideo Component
 * 
 * Displays an autoplaying, looping, muted video for the hero section.
 */
export function HeroVideo({ 
  videoSrc, 
  poster,
  className = '' 
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    console.error('Video failed to load:', videoSrc);
  };

  if (hasError) {
    return (
      <div className={`w-full aspect-video flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center text-gray-400">
          <p className="text-sm">Video unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-auto"
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        onError={handleError}
      >
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
      </video>
    </div>
  );
}
