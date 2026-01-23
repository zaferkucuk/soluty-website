'use client';

import { motion } from 'framer-motion';
import { modules, getModuleById, GRID_CONFIG } from './modules-data';

interface ConnectionLinesProps {
  activeModuleIds: string[];
  activeGroupIndex: number;
  gridWidth: number;
  gridHeight: number;
}

interface Point {
  x: number;
  y: number;
}

// ==========================================================================
// Color System - Gradient definitions for connection lines
// ==========================================================================

const lineGradients = {
  primary: {
    id: 'gradient-primary',
    colors: ['#4DB6A0', '#8B5CF6', '#6C91F7'],
    glow: 'rgba(77, 182, 160, 0.4)',
  },
  secondary: {
    id: 'gradient-secondary', 
    colors: ['#AD6AEB', '#6C91F7'],
    glow: 'rgba(173, 106, 235, 0.35)',
  },
  tertiary: {
    id: 'gradient-tertiary',
    colors: ['#FFB86C', '#F7C94C'],
    glow: 'rgba(255, 184, 108, 0.3)',
  },
  teal: {
    id: 'gradient-teal',
    colors: ['#11EFE3', '#4DB6A0'],
    glow: 'rgba(77, 182, 160, 0.4)',
  },
};

// Map connections to gradient variants
const connectionGradientMap: Record<string, keyof typeof lineGradients> = {
  'order-workPlan': 'primary',
  'workPlan-routeOptimization': 'primary',
  'routeOptimization-deliveryNote': 'secondary',
  'deliveryNote-warehouse': 'secondary',
  'warehouse-productManagement': 'tertiary',
  'productManagement-crm': 'tertiary',
  'crm-sales': 'teal',
  'sales-invoice': 'teal',
  'invoice-payments': 'primary',
};

// ==========================================================================
// Path Generation - Smooth bezier curves
// ==========================================================================

function getModuleCenter(position: Point): Point {
  return {
    x: position.x + GRID_CONFIG.cardWidth / 2,
    y: position.y + GRID_CONFIG.cardHeight / 2,
  };
}

function createSmoothPath(from: Point, to: Point): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  // Tension controls curve smoothness (0.3-0.5 works well)
  const tension = 0.4;
  
  // Horizontal dominant - smooth S-curve
  if (Math.abs(dx) > Math.abs(dy) * 1.2) {
    const cpOffset = Math.abs(dx) * tension;
    return `M ${from.x} ${from.y} C ${from.x + cpOffset} ${from.y}, ${to.x - cpOffset} ${to.y}, ${to.x} ${to.y}`;
  }
  
  // Vertical dominant - smooth S-curve
  if (Math.abs(dy) > Math.abs(dx) * 1.2) {
    const cpOffset = Math.abs(dy) * tension;
    return `M ${from.x} ${from.y} C ${from.x} ${from.y + cpOffset}, ${to.x} ${to.y - cpOffset}, ${to.x} ${to.y}`;
  }
  
  // Diagonal - combined curve
  const cpX = from.x + dx * 0.5;
  const cpY = from.y + dy * 0.5;
  return `M ${from.x} ${from.y} Q ${cpX} ${from.y}, ${cpX} ${cpY} T ${to.x} ${to.y}`;
}

function getPathLength(from: Point, to: Point): number {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  // Approximate curved path length (slightly longer than straight line)
  return Math.sqrt(dx * dx + dy * dy) * 1.15;
}

// ==========================================================================
// Flow Particle Component - Animated dot traveling along path
// ==========================================================================

interface FlowParticleProps {
  path: string;
  duration: number;
  delay: number;
}

function FlowParticle({ path, duration, delay }: FlowParticleProps) {
  return (
    <motion.circle
      r={4}
      fill="white"
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
// Single Connection Line Component - 4-layer structure
// ==========================================================================

interface ConnectionLineProps {
  id: string;
  path: string;
  pathLength: number;
  isActive: boolean;
  isRecent: boolean;
  gradientVariant: keyof typeof lineGradients;
}

function ConnectionLine({
  id,
  path,
  pathLength,
  isActive,
  isRecent,
  gradientVariant,
}: ConnectionLineProps) {
  const gradient = lineGradients[gradientVariant];
  const flowDuration = Math.max(1.8, pathLength / 150); // Longer paths = slower particles
  
  return (
    <g>
      {/* Layer 1: Background trace (always visible, very subtle) */}
      <path
        d={path}
        fill="none"
        stroke="#94a3b8"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.12}
      />
      
      {/* Layer 2: Main gradient line */}
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${gradient.id})`}
        strokeWidth={isActive ? 3.5 : 2.5}
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isActive ? 0.85 : isRecent ? 0.35 : 0.15,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
      
      {/* Layer 3: Glow halo (only for active connections) */}
      {isActive && (
        <motion.path
          d={path}
          fill="none"
          stroke={gradient.glow}
          strokeWidth={12}
          strokeLinecap="round"
          style={{ filter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Layer 4: Flow particles (only for active connections) */}
      {isActive && (
        <>
          <FlowParticle path={path} duration={flowDuration} delay={0} />
          <FlowParticle path={path} duration={flowDuration} delay={flowDuration * 0.5} />
        </>
      )}
    </g>
  );
}

// ==========================================================================
// Main ConnectionLines Component
// ==========================================================================

export function ConnectionLines({
  activeModuleIds,
  activeGroupIndex,
  gridWidth,
  gridHeight,
}: ConnectionLinesProps) {
  // Build connections list
  const connections: {
    id: string;
    fromId: string;
    toId: string;
    path: string;
    pathLength: number;
    isActive: boolean;
    isRecent: boolean;
    gradientVariant: keyof typeof lineGradients;
  }[] = [];

  modules.forEach((module) => {
    module.connectsTo.forEach((targetId) => {
      const targetModule = getModuleById(targetId);
      if (!targetModule) return;

      const fromCenter = getModuleCenter(module.position);
      const toCenter = getModuleCenter(targetModule.position);
      const connectionKey = `${module.id}-${targetId}`;

      // Connection is active if BOTH modules are in active group
      const isActive = activeModuleIds.includes(module.id) && activeModuleIds.includes(targetId);
      
      // Recent if either module was recently active (trail effect)
      const isRecent = !isActive && (
        activeModuleIds.includes(module.id) || 
        activeModuleIds.includes(targetId) ||
        activeGroupIndex > 0
      );

      connections.push({
        id: connectionKey,
        fromId: module.id,
        toId: targetId,
        path: createSmoothPath(fromCenter, toCenter),
        pathLength: getPathLength(fromCenter, toCenter),
        isActive,
        isRecent,
        gradientVariant: connectionGradientMap[connectionKey] || 'primary',
      });
    });
  });

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={gridWidth}
      height={gridHeight}
      style={{ overflow: 'visible', zIndex: 0 }}
    >
      <defs>
        {/* Gradient definitions */}
        {Object.entries(lineGradients).map(([key, gradient]) => (
          <linearGradient
            key={gradient.id}
            id={gradient.id}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            {gradient.colors.map((color, i) => (
              <stop
                key={i}
                offset={`${(i / (gradient.colors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        ))}
        
        {/* Particle glow filter */}
        <filter id="particleGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Render all connection lines */}
      {connections.map((conn) => (
        <ConnectionLine
          key={conn.id}
          id={conn.id}
          path={conn.path}
          pathLength={conn.pathLength}
          isActive={conn.isActive}
          isRecent={conn.isRecent}
          gradientVariant={conn.gradientVariant}
        />
      ))}
    </svg>
  );
}
