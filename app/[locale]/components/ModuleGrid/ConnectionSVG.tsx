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
  filterId: string;
}

function FlowParticle({ path, duration, delay, filterId }: FlowParticleProps) {
  return (
    <motion.circle
      r={LINE_STYLES.particleRadius}
      fill={LINE_STYLES.particleColor}
      filter={`url(#${filterId})`}
      style={{
        offsetPath: `path('${path}')`,
        offsetRotate: '0deg',
      }}
      initial={{ offsetDistance: '0%', opacity: 0 }}
      animate={{
        offsetDistance: ['0%', '100%'],
        opacity: [0, 1, 1, 1, 0],
      }}
      exit={{ opacity: 0 }}
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
 * Stripe-style connection line with draw/erase animation.
 * 
 * Draw animation: Line draws from source to target
 * Erase animation: Line erases from source (retracts back)
 * 
 * This creates the "flowing connection" effect seen on Stripe.com
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
  
  // Unique IDs for this connection (avoid cross-SVG ID collisions)
  const gradientId = `gradient-${id}`;
  const filterId = `particleGlow-${id}`;

  // Don't render anything if not active
  if (!isActive) {
    return null;
  }

  return (
    <motion.svg
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        overflow: 'hidden',
      }}
      width={width}
      height={height}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
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

        {/* Particle glow filter — unique per connection */}
        <filter id={filterId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Layer 1: Background trace (subtle) */}
      <motion.path
        d={path}
        fill="none"
        stroke={LINE_STYLES.traceColor}
        strokeWidth={LINE_STYLES.traceStrokeWidth}
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: LINE_STYLES.traceOpacity }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Layer 2: Main gradient line with draw/erase animation */}
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={LINE_STYLES.strokeWidthActive}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        initial={{ strokeDashoffset: pathLength }}
        animate={{ strokeDashoffset: 0 }}
        exit={{ 
          strokeDashoffset: -pathLength,
        }}
        transition={{ 
          duration: ANIMATION_CONSTANTS.lineDrawDuration,
          ease: 'easeInOut',
        }}
        style={{ opacity: 0.85 }}
      />
      
      {/* Layer 3: Glow halo with draw/erase animation */}
      <motion.path
        d={path}
        fill="none"
        stroke={colors.glow}
        strokeWidth={LINE_STYLES.glowStrokeWidth}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        style={{ filter: `blur(${LINE_STYLES.glowBlur}px)` }}
        initial={{ strokeDashoffset: pathLength, opacity: 0 }}
        animate={{ strokeDashoffset: 0, opacity: LINE_STYLES.glowOpacity }}
        exit={{ 
          strokeDashoffset: -pathLength,
          opacity: 0,
        }}
        transition={{ 
          duration: ANIMATION_CONSTANTS.lineDrawDuration,
          ease: 'easeInOut',
        }}
      />
      
      {/* Layer 4: Flow particles */}
      <FlowParticle path={path} duration={particleDuration} delay={0} filterId={filterId} />
      <FlowParticle path={path} duration={particleDuration} delay={particleDuration * 0.5} filterId={filterId} />
    </motion.svg>
  );
}
