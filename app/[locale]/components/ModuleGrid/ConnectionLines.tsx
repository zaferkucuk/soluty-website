'use client';

import { motion } from 'framer-motion';
import { modules, animationOrder, getModuleById } from './modules-data';

interface ConnectionLinesProps {
  activeModuleId: string;
  cellSize: number;
  cellHeight?: number;
  gap: number;
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

function getModuleCenter(
  row: number,
  col: number,
  cellWidth: number,
  cellHeight: number,
  gap: number
): Point {
  const x = (col - 1) * (cellWidth + gap) + cellWidth / 2;
  const y = (row - 1) * (cellHeight + gap) + cellHeight / 2;
  return { x, y };
}

function generateOrthogonalPath(from: Point, to: Point): string {
  const midX = to.x;
  const midY = from.y;

  if (from.y === to.y) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }

  if (from.x === to.x) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }

  return `M ${from.x} ${from.y} L ${midX} ${midY} L ${to.x} ${to.y}`;
}

// Calculate approximate path length for dash animation
function getApproxPathLength(from: Point, to: Point): number {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  return dx + dy; // L-shaped path length
}

export function ConnectionLines({
  activeModuleId,
  cellSize,
  cellHeight,
  gap,
}: ConnectionLinesProps) {
  const actualCellHeight = cellHeight ?? cellSize;
  const activeIndex = animationOrder.indexOf(activeModuleId);

  const connections: {
    id: string;
    fromId: string;
    path: string;
    pathLength: number;
    isActive: boolean;
    isCompleted: boolean;
    isRecent: boolean; // Just completed (fading trail)
  }[] = [];

  modules.forEach((module) => {
    module.connectsTo.forEach((targetId) => {
      const targetModule = getModuleById(targetId);
      if (!targetModule) return;

      const fromCenter = getModuleCenter(
        module.gridPosition.row,
        module.gridPosition.col,
        cellSize,
        actualCellHeight,
        gap
      );
      const toCenter = getModuleCenter(
        targetModule.gridPosition.row,
        targetModule.gridPosition.col,
        cellSize,
        actualCellHeight,
        gap
      );

      const moduleIndex = animationOrder.indexOf(module.id);
      const isActive = module.id === activeModuleId;
      const isCompleted = moduleIndex < activeIndex;
      // Recent = completed in the last 2 steps (for trail effect)
      const isRecent = isCompleted && (activeIndex - moduleIndex) <= 2;

      connections.push({
        id: `${module.id}-${targetId}`,
        fromId: module.id,
        path: generateOrthogonalPath(fromCenter, toCenter),
        pathLength: getApproxPathLength(fromCenter, toCenter),
        isActive,
        isCompleted,
        isRecent,
      });
    });
  });

  const gridWidth = 3 * cellSize + 2 * gap;
  const gridHeight = 4 * actualCellHeight + 3 * gap;

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
            opacity={0.15}
          />
        );
      })}

      {/* Animated connection paths with trail effect */}
      {connections.map((conn) => {
        const gradientName = moduleGradientMap[conn.fromId] || 'teal';
        const isVisible = conn.isActive || conn.isRecent;
        
        // Calculate dash array for flowing animation
        const dashLength = 30;
        const gapLength = conn.pathLength - dashLength;
        
        return (
          <motion.path
            key={conn.id}
            d={conn.path}
            fill="none"
            stroke={`url(#gradient-${gradientName})`}
            strokeWidth={conn.isActive ? 3 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={conn.isActive ? `${dashLength} ${Math.max(gapLength, 20)}` : 'none'}
            initial={{ 
              opacity: 0,
              strokeDashoffset: 0 
            }}
            animate={{
              opacity: conn.isActive ? 1 : conn.isRecent ? 0.6 : 0,
              strokeDashoffset: conn.isActive ? [0, -(dashLength + gapLength)] : 0,
            }}
            transition={{ 
              opacity: { duration: 0.3, ease: 'easeInOut' },
              strokeDashoffset: {
                duration: 1.5,
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
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="blur(4px)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </svg>
  );
}
