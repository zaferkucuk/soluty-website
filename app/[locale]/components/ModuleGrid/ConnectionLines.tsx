'use client';

import { motion } from 'framer-motion';
import {
  moduleGroups,
  getModuleById,
  gridToPixel,
  mobileGridPositions,
  DESIGN_TOKENS,
  GROUP_GRADIENTS,
  type GridPosition,
} from './modules-data';

// ==========================================================================
// Types
// ==========================================================================

interface ConnectionLinesProps {
  activeGroupId: number;
  gridWidth: number;
  gridHeight: number;
  cardSize: number;
  gap: number;
  isMobile: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  path: string;
  pathLength: number;
  groupId: number;
  isActive: boolean;
}

// ==========================================================================
// Line Gradients
// ==========================================================================

const LINE_GRADIENTS = {
  primary: { id: 'line-gradient-primary', colors: ['#4DB6A0', '#8B5CF6', '#6C91F7'] },
  secondary: { id: 'line-gradient-secondary', colors: ['#AD6AEB', '#6C91F7'] },
  tertiary: { id: 'line-gradient-tertiary', colors: ['#FFB86C', '#F7C94C'] },
};

const GROUP_LINE_GRADIENTS: Record<number, keyof typeof LINE_GRADIENTS> = {
  1: 'primary',
  2: 'secondary',
  3: 'primary',
  4: 'tertiary',
  5: 'primary',
  6: 'secondary',
};

// ==========================================================================
// Path Generation - Smooth Bezier Curves
// ==========================================================================

function getModuleCenter(position: GridPosition, cardSize: number, gap: number): Point {
  const pixel = gridToPixel(position, cardSize, gap);
  return {
    x: pixel.x + cardSize / 2,
    y: pixel.y + cardSize / 2,
  };
}

function createSmoothPath(from: Point, to: Point): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const tension = 0.4;
  
  if (Math.abs(dx) > Math.abs(dy) * 1.2) {
    const cpOffset = Math.abs(dx) * tension;
    return `M ${from.x} ${from.y} C ${from.x + cpOffset} ${from.y}, ${to.x - cpOffset} ${to.y}, ${to.x} ${to.y}`;
  }
  
  if (Math.abs(dy) > Math.abs(dx) * 1.2) {
    const cpOffset = Math.abs(dy) * tension;
    return `M ${from.x} ${from.y} C ${from.x} ${from.y + cpOffset}, ${to.x} ${to.y - cpOffset}, ${to.x} ${to.y}`;
  }
  
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  return `M ${from.x} ${from.y} Q ${midX} ${from.y}, ${midX} ${midY} T ${to.x} ${to.y}`;
}

function getPathLength(from: Point, to: Point): number {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  return Math.sqrt(dx * dx + dy * dy) * 1.15;
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
// Single Connection Line Component (4 Layers)
// ==========================================================================

interface ConnectionLineProps {
  connection: Connection;
  gradientId: string;
  glowColor: string;
}

function ConnectionLine({ connection, gradientId, glowColor }: ConnectionLineProps) {
  const { path, pathLength, isActive } = connection;
  const flowDuration = Math.max(1.8, pathLength / 150);
  
  return (
    <g>
      {/* Layer 1: Background trace */}
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
        stroke={`url(#${gradientId})`}
        strokeWidth={isActive ? DESIGN_TOKENS.lines.widthActive : DESIGN_TOKENS.lines.widthInactive}
        strokeLinecap="round"
        initial={{ opacity: 0.15 }}
        animate={{ opacity: isActive ? 0.85 : 0.15 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
      
      {/* Layer 3: Glow halo (only active) */}
      {isActive && (
        <motion.path
          d={path}
          fill="none"
          stroke={glowColor}
          strokeWidth={12}
          strokeLinecap="round"
          style={{ filter: `blur(${DESIGN_TOKENS.lines.glowBlur}px)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: DESIGN_TOKENS.lines.glowOpacity }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Layer 4: Flow particles (only active) */}
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
  activeGroupId,
  gridWidth,
  gridHeight,
  cardSize,
  gap,
  isMobile,
}: ConnectionLinesProps) {
  const connections: Connection[] = [];
  
  moduleGroups.forEach((group) => {
    const sourceModule = getModuleById(group.sourceModuleId);
    if (!sourceModule) return;
    
    const sourcePosition = isMobile
      ? mobileGridPositions[sourceModule.id]
      : sourceModule.gridPosition;
    
    const sourceCenter = getModuleCenter(sourcePosition, cardSize, gap);
    
    group.targetModuleIds.forEach((targetId) => {
      const targetModule = getModuleById(targetId);
      if (!targetModule) return;
      
      const targetPosition = isMobile
        ? mobileGridPositions[targetModule.id]
        : targetModule.gridPosition;
      
      const targetCenter = getModuleCenter(targetPosition, cardSize, gap);
      const path = createSmoothPath(sourceCenter, targetCenter);
      
      connections.push({
        id: `${group.sourceModuleId}-${targetId}`,
        sourceId: group.sourceModuleId,
        targetId,
        path,
        pathLength: getPathLength(sourceCenter, targetCenter),
        groupId: group.id,
        isActive: group.id === activeGroupId,
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
        {Object.entries(LINE_GRADIENTS).map(([key, gradient]) => (
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
        
        <filter id="particleGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {connections.map((conn) => {
        const gradientVariant = GROUP_LINE_GRADIENTS[conn.groupId] || 'primary';
        const gradientId = LINE_GRADIENTS[gradientVariant].id;
        const glowColor = GROUP_GRADIENTS[conn.groupId]?.glow || 'rgba(77, 182, 160, 0.4)';
        
        return (
          <ConnectionLine
            key={conn.id}
            connection={conn}
            gradientId={gradientId}
            glowColor={glowColor}
          />
        );
      })}
    </svg>
  );
}
