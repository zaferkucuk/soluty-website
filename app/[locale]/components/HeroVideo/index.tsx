'use client';

import { useRef, useEffect, useState } from 'react';

interface HeroVideoProps {
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
}

/**
 * HeroVideo Component
 * 
 * Wealthsimple-style hero video with floating mockup fallback.
 * If no video is provided, shows animated placeholder.
 * 
 * Usage:
 * <HeroVideo videoSrc="/videos/hero.webm" />
 * or without video (shows animated placeholder):
 * <HeroVideo />
 */
export function HeroVideo({ videoSrc, posterSrc, className = '' }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked
        setHasError(true);
      });
    }
  }, [videoSrc]);

  const showPlaceholder = !videoSrc || hasError || !isVideoLoaded;

  return (
    <div className={`relative w-full aspect-[16/10] overflow-hidden ${className}`}>
      {/* Video Layer */}
      {videoSrc && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
            isVideoLoaded && !hasError ? 'opacity-100' : 'opacity-0'
          }`}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {/* Animated Placeholder (Wealthsimple-style floating mockups) */}
      {showPlaceholder && (
        <div className="absolute inset-0 flex items-center justify-center">
          <FloatingMockups />
        </div>
      )}
    </div>
  );
}

/**
 * Floating Mockups - CSS-only animated placeholder
 * Simulates Wealthsimple's 3D floating device mockups
 */
function FloatingMockups() {
  return (
    <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
      {/* Main Phone Mockup */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-48 h-80 bg-white rounded-3xl shadow-2xl
                   animate-float-slow"
        style={{
          transform: 'translateX(-50%) translateY(-50%) rotateY(-15deg) rotateX(5deg)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Phone Screen */}
        <div className="absolute inset-3 bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl overflow-hidden">
          {/* Status Bar */}
          <div className="h-6 bg-slate-200 flex items-center justify-center">
            <div className="w-16 h-1 bg-slate-300 rounded-full" />
          </div>
          {/* App Content Placeholder */}
          <div className="p-3 space-y-3">
            <div className="h-8 bg-teal-500/20 rounded-lg" />
            <div className="h-24 bg-slate-200 rounded-lg" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Card - Left */}
      <div
        className="absolute top-1/3 left-1/4 w-32 h-20 bg-gradient-to-br from-teal-400 to-teal-600
                   rounded-xl shadow-lg animate-float-medium"
        style={{
          transform: 'rotateY(10deg) rotateX(-5deg)',
          boxShadow: '0 20px 40px -12px rgba(77, 182, 160, 0.3)',
        }}
      >
        <div className="p-3">
          <div className="w-8 h-8 bg-white/30 rounded-lg" />
          <div className="mt-2 h-2 bg-white/40 rounded w-2/3" />
        </div>
      </div>

      {/* Tertiary Card - Right Bottom */}
      <div
        className="absolute bottom-1/4 right-1/4 w-40 h-28 bg-white rounded-xl shadow-lg
                   animate-float-fast"
        style={{
          transform: 'rotateY(-10deg) rotateX(8deg)',
          boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-200 rounded-full" />
            <div className="h-3 bg-slate-200 rounded flex-1" />
          </div>
          <div className="h-12 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg" />
        </div>
      </div>

      {/* Floating Coin Element */}
      <div
        className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-gradient-to-br from-amber-300 to-amber-500
                   rounded-full shadow-lg animate-float-coin"
        style={{
          boxShadow: '0 10px 25px -5px rgba(217, 119, 6, 0.4)',
        }}
      >
        <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
          €
        </div>
      </div>
    </div>
  );
}

export default HeroVideo;
