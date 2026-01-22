'use client';

import { motion } from 'framer-motion';
import { modules, animationOrder, getModuleById } from './modules-data';

interface ConnectionLinesProps {
  activeModuleId: string;
  cellSize: number;
  cellHeight?: number; // Optional, defaults to cellSize for backward compatibility
  gap: number;
}

interface Point {
  x: number;
  y: number;
}

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
  // L-shaped path: horizontal first, then vertical
  const midX = to.x;
  const midY = from.y;

  // If same row, just horizontal line
  if (from.y === to.y) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }

  // If same column, just vertical line
  if (from.x === to.x) {
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }

  // L-shaped path
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

  // Generate all connection paths
  const connections: {
    id: string;
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
      {connections.map((conn) => (
        <motion.path
          key={conn.id}
          d={conn.path}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: conn.isActive || conn.isCompleted ? 1 : 0,
            stroke: conn.isActive
              ? '#4DB6A0'
              : conn.isCompleted
                ? 'rgba(77, 182, 160, 0.5)'
                : 'rgba(77, 182, 160, 0.3)',
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </svg>
  );
}
