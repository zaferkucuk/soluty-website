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
    isActive: boolean;
    isCompleted: boolean;
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

      connections.push({
        id: `${module.id}-${targetId}`,
        fromId: module.id,
        path: generateOrthogonalPath(fromCenter, toCenter),
        isActive,
        isCompleted,
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
      style={{ overflow: 'visible' }}
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
        
        {/* Faded versions for completed paths */}
        {Object.entries(gradientPalette).map(([name, colors]) => (
          <linearGradient
            key={`${name}-faded`}
            id={`gradient-${name}-faded`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={colors.start} stopOpacity={0.4} />
            <stop offset="100%" stopColor={colors.end} stopOpacity={0.4} />
          </linearGradient>
        ))}
      </defs>

      {/* Connection Paths */}
      {connections.map((conn) => {
        const gradientName = moduleGradientMap[conn.fromId] || 'teal';
        const gradientId = conn.isActive
          ? `gradient-${gradientName}`
          : conn.isCompleted
            ? `gradient-${gradientName}-faded`
            : `gradient-${gradientName}-faded`;

        return (
          <motion.path
            key={conn.id}
            d={conn.path}
            fill="none"
            stroke={conn.isActive || conn.isCompleted ? `url(#${gradientId})` : 'rgba(200, 200, 200, 0.3)'}
            strokeWidth={conn.isActive ? 2.5 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: conn.isActive || conn.isCompleted ? 1 : 0,
              opacity: conn.isActive ? 1 : conn.isCompleted ? 0.7 : 0.3,
            }}
            transition={{ 
              duration: conn.isActive ? 0.5 : 0.3,
              ease: 'easeInOut'
            }}
          />
        );
      })}
    </svg>
  );
}
