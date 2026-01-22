'use client';

import { motion } from 'framer-motion';
import { modules, animationOrder, getModuleById, CARD_WIDTH, CARD_HEIGHT } from './modules-data';

interface ConnectionLinesProps {
  activeModuleId: string;
  gridWidth: number;
  gridHeight: number;
}

interface Point {
  x: number;
  y: number;
}

// Gradient color definitions inspired by Stripe
const gradientPalette = {
  teal: { start: '#11EFE3', end: '#4DB6A0' },
  purple: { start: '#635BFF', end: '#9B66FF' },
  pink: { start: '#FF5091', end: '#E03071' },
  blue: { start: '#0048E5', end: '#00D4FF' },
};

// Map modules to gradient colors for variety
const moduleGradientMap: Record<string, keyof typeof gradientPalette> = {
  order: 'teal',
  workPlan: 'teal',
  routeOptimization: 'purple',
  deliveryNote: 'purple',
  warehouse: 'blue',
  productManagement: 'blue',
  crm: 'pink',
  sales: 'pink',
  invoice: 'teal',
  payments: 'teal',
};

// Get center point of a module based on its organic position
function getModuleCenter(position: { x: number; y: number }): Point {
  return {
    x: position.x + CARD_WIDTH / 2,
    y: position.y + CARD_HEIGHT / 2,
  };
}

// Generate smooth curved path between two points
function generateCurvedPath(from: Point, to: Point): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  // For mostly horizontal connections
  if (Math.abs(dx) > Math.abs(dy) * 1.5) {
    const midX = from.x + dx / 2;
    return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
  }
  
  // For mostly vertical connections
  if (Math.abs(dy) > Math.abs(dx) * 1.5) {
    const midY = from.y + dy / 2;
    return `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`;
  }
  
  // For diagonal connections - use S-curve
  const ctrl1X = from.x + dx * 0.4;
  const ctrl1Y = from.y;
  const ctrl2X = to.x - dx * 0.4;
  const ctrl2Y = to.y;
  
  return `M ${from.x} ${from.y} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${to.x} ${to.y}`;
}

// Calculate approximate curved path length
function getApproxPathLength(from: Point, to: Point): number {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  // Bezier curve is roughly 1.2x the straight line distance
  return Math.sqrt(dx * dx + dy * dy) * 1.2;
}

export function ConnectionLines({
  activeModuleId,
  gridWidth,
  gridHeight,
}: ConnectionLinesProps) {
  const activeIndex = animationOrder.indexOf(activeModuleId);

  const connections: {
    id: string;
    fromId: string;
    path: string;
    pathLength: number;
    isActive: boolean;
    isCompleted: boolean;
    isRecent: boolean;
  }[] = [];

  modules.forEach((module) => {
    module.connectsTo.forEach((targetId) => {
      const targetModule = getModuleById(targetId);
      if (!targetModule) return;

      const fromCenter = getModuleCenter(module.position);
      const toCenter = getModuleCenter(targetModule.position);

      const moduleIndex = animationOrder.indexOf(module.id);
      const isActive = module.id === activeModuleId;
      const isCompleted = moduleIndex < activeIndex;
      const isRecent = isCompleted && (activeIndex - moduleIndex) <= 2;

      connections.push({
        id: `${module.id}-${targetId}`,
        fromId: module.id,
        path: generateCurvedPath(fromCenter, toCenter),
        pathLength: getApproxPathLength(fromCenter, toCenter),
        isActive,
        isCompleted,
        isRecent,
      });
    });
  });

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={gridWidth}
      height={gridHeight}
      style={{ overflow: 'visible', zIndex: 1 }}
    >
      {/* Gradient Definitions */}
      <defs>
        {Object.entries(gradientPalette).map(([name, colors]) => (
          <linearGradient
            key={name}
            id={`gradient-${name}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
        ))}
        
        {/* Faded versions for trail effect */}
        {Object.entries(gradientPalette).map(([name, colors]) => (
          <linearGradient
            key={`${name}-faded`}
            id={`gradient-${name}-faded`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors.start} stopOpacity={0.3} />
            <stop offset="100%" stopColor={colors.end} stopOpacity={0.3} />
          </linearGradient>
        ))}
      </defs>

      {/* Background trace lines (very faint) */}
      {connections.map((conn) => {
        const gradientName = moduleGradientMap[conn.fromId] || 'teal';
        
        return (
          <path
            key={`bg-${conn.id}`}
            d={conn.path}
            fill="none"
            stroke={`url(#gradient-${gradientName}-faded)`}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.2}
          />
        );
      })}

      {/* Animated connection paths with trail effect */}
      {connections.map((conn) => {
        const gradientName = moduleGradientMap[conn.fromId] || 'teal';
        const isVisible = conn.isActive || conn.isRecent;
        
        const dashLength = 25;
        const gapLength = Math.max(conn.pathLength - dashLength, 15);
        
        return (
          <motion.path
            key={conn.id}
            d={conn.path}
            fill="none"
            stroke={`url(#gradient-${gradientName})`}
            strokeWidth={conn.isActive ? 2.5 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={conn.isActive ? `${dashLength} ${gapLength}` : 'none'}
            initial={{ 
              opacity: 0,
              strokeDashoffset: 0 
            }}
            animate={{
              opacity: conn.isActive ? 1 : conn.isRecent ? 0.5 : 0,
              strokeDashoffset: conn.isActive ? [0, -(dashLength + gapLength)] : 0,
            }}
            transition={{ 
              opacity: { duration: 0.3, ease: 'easeInOut' },
              strokeDashoffset: {
                duration: 1.2,
                ease: 'linear',
                repeat: conn.isActive ? Infinity : 0,
              }
            }}
          />
        );
      })}

      {/* Glow effect for active paths */}
      {connections.filter(c => c.isActive).map((conn) => {
        const gradientName = moduleGradientMap[conn.fromId] || 'teal';
        const color = gradientPalette[gradientName].start;
        
        return (
          <motion.path
            key={`glow-${conn.id}`}
            d={conn.path}
            fill="none"
            stroke={color}
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'blur(3px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </svg>
  );
}
