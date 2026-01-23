'use client';

import { motion } from 'framer-motion';
import { useRotatingGradient } from './hooks';
import { LINE_STYLES, ANIMATION_CONSTANTS, type ColorPair } from './constants';

// ==========================================================================
// Types
// ==========================================================================

export interface ConnectionSVGProps {
  /** Unique identifier for this connection */
  id: string;
  /** SVG left position */
  x: number;
  /** SVG top position */
  y: number;
  /** SVG width */
  width: number;
  /** SVG height */
  height: number;
  /** Path in local coordinates */
  path: string;
  /** Path length for animations */
  pathLength: number;
  /** Color pair for gradient */
  colors: ColorPair;
  /** Whether this connection is active */
  isActive: boolean;
  /** Initial rotation angle for gradient */
  startRotation?: number;
}

// ==========================================================================
// Flow Particle Component
// ==========================================================================

interface FlowParticleProps {
  path: string;
  duration: number;
  delay: number;
}

function FlowParticle({ path, duration, delay }: FlowParticleProps) {
  return (
    <motion.circle
      r={LINE_STYLES.particleRadius}
      fill={LINE_STYLES.particleColor}
      filter="url(#particleGlow)"
      style={{
        offsetPath: `path('${path}')`,
        offsetRotate: '0deg',
      }}
      initial={{ offsetDistance: '0%', opacity: 0 }}
      animate={{
        offsetDistance: ['0%', '100%'],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
        times: [0, 0.1, 0.5, 0.9, 1],
      }}
    />
  );
}

// ==========================================================================
// ConnectionSVG Component
// ==========================================================================

/**
 * Stripe-style connection line with rotating gradient.
 * 
 * Each connection is rendered as its own SVG element, positioned absolutely.
 * This matches Stripe's implementation and enables:
 * - Per-connection gradient rotation
 * - Independent stroke-dashoffset animations
 * - Cleaner DOM structure
 */
export function ConnectionSVG({
  id,
  x,
  y,
  width,
  height,
  path,
  pathLength,
  colors,
  isActive,
  startRotation = 0,
}: ConnectionSVGProps) {
  // Rotating gradient coordinates
  const gradient = useRotatingGradient({
    startRotation,
    speed: ANIMATION_CONSTANTS.rotationSpeed,
    isActive,
  });
  
  // Calculate particle duration based on path length
  const particleDuration = Math.max(
    ANIMATION_CONSTANTS.minParticleDuration,
    pathLength / ANIMATION_CONSTANTS.particleSpeedFactor
  );
  
  // Unique gradient ID for this connection
  const gradientId = `gradient-${id}`;
  
  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        overflow: 'visible',
      }}
      width={width}
      height={height}
    >
      <defs>
        {/* Rotating gradient */}
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={`${gradient.x1}%`}
          y1={`${gradient.y1}%`}
          x2={`${gradient.x2}%`}
          y2={`${gradient.y2}%`}
        >
          <stop offset="0" stopColor={colors.start} />
          <stop offset="1" stopColor={colors.end} />
        </linearGradient>
        
        {/* Particle glow filter */}
        <filter id="particleGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Layer 1: Background trace (always visible, subtle) */}
      <path
        d={path}
        fill="none"
        stroke={LINE_STYLES.traceColor}
        strokeWidth={LINE_STYLES.traceStrokeWidth}
        strokeLinecap="round"
        opacity={LINE_STYLES.traceOpacity}
      />
      
      {/* Layer 2: Main gradient line with draw animation */}
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={LINE_STYLES.strokeWidthActive}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        initial={{ 
          strokeDashoffset: pathLength,
          opacity: 0.15 
        }}
        animate={{ 
          strokeDashoffset: isActive ? 0 : pathLength,
          opacity: isActive ? 0.85 : 0.15,
        }}
        transition={{ 
          strokeDashoffset: {
            duration: ANIMATION_CONSTANTS.lineDrawDuration,
            ease: 'easeOut',
          },
          opacity: {
            duration: ANIMATION_CONSTANTS.fadeTransitionDuration,
            ease: 'easeOut',
          },
        }}
      />
      
      {/* Layer 3: Glow halo (only when active) */}
      {isActive && (
        <motion.path
          d={path}
          fill="none"
          stroke={colors.glow}
          strokeWidth={LINE_STYLES.glowStrokeWidth}
          strokeLinecap="round"
          style={{ filter: `blur(${LINE_STYLES.glowBlur}px)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: LINE_STYLES.glowOpacity }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Layer 4: Flow particles (only when active) */}
      {isActive && (
        <>
          <FlowParticle path={path} duration={particleDuration} delay={0} />
          <FlowParticle path={path} duration={particleDuration} delay={particleDuration * 0.5} />
        </>
      )}
    </svg>
  );
}
