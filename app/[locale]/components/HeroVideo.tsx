'use client';

import { useRef, useEffect, useState } from 'react';

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
 * Falls back to a placeholder if video fails to load.
 */
export function HeroVideo({ 
  videoSrc, 
  poster,
  className = '' 
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to play video
    const playVideo = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn('Video autoplay failed:', err);
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    }
  }, []);

  const handleLoadedData = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    console.error('Video failed to load:', videoSrc);
  };

  // Fallback placeholder if video fails
  if (hasError) {
    return (
      <div 
        className={`relative w-full max-w-lg aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center ${className}`}
      >
        <div className="text-center text-gray-400">
          <svg 
            className="w-16 h-16 mx-auto mb-2 opacity-50" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
            />
          </svg>
          <p className="text-sm">Video unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-lg ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl animate-pulse" />
      )}
      
      {/* Video */}
      <video
        ref={videoRef}
        className={`w-full h-auto rounded-2xl shadow-xl transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        onLoadedData={handleLoadedData}
        onError={handleError}
      >
        <source src={videoSrc} type="video/webm" />
        {/* Fallback for browsers that don't support webm */}
        <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
