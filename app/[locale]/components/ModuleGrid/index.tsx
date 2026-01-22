'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { modules, animationOrder } from './modules-data';
import { ModuleCard } from './ModuleCard';
import { ModuleTooltip } from './ModuleTooltip';
import { ConnectionLines } from './ConnectionLines';

const CELL_SIZE = 64;
const GAP = 16;
const ANIMATION_INTERVAL = 500;

export function ModuleGrid() {
  const t = useTranslations('moduleGrid.modules');
  const tGrid = useTranslations('moduleGrid');
  const shouldReduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);

  const activeModuleId = animationOrder[activeIndex];

  // Auto-cycle animation
  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % animationOrder.length);
    }, ANIMATION_INTERVAL);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  // Grid dimensions
  const gridWidth = 3 * CELL_SIZE + 2 * GAP;
  const gridHeight = 4 * CELL_SIZE + 3 * GAP;

  // Get module position in grid
  const getGridStyle = (row: number, col: number) => ({
    gridRow: row,
    gridColumn: col,
  });

  // Should show tooltip (only for non-active hovered modules)
  const shouldShowTooltip = (moduleId: string) =>
    hoveredModuleId === moduleId && activeModuleId !== moduleId;

  return (
    <div
      className="relative w-full max-w-md mx-auto lg:mx-0"
      role="img"
      aria-label={tGrid('ariaLabel')}
    >
      {/* Connection Lines SVG */}
      <ConnectionLines
        activeModuleId={activeModuleId}
        cellSize={CELL_SIZE}
        gap={GAP}
      />

      {/* Module Grid */}
      <div
        className="relative grid"
        style={{
          gridTemplateColumns: `repeat(3, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(4, ${CELL_SIZE}px)`,
          gap: GAP,
          width: gridWidth,
          height: gridHeight,
        }}
      >
        {modules.map((module) => (
          <div
            key={module.id}
            className="relative flex items-center justify-center"
            style={getGridStyle(module.gridPosition.row, module.gridPosition.col)}
            aria-hidden="true"
          >
            <ModuleCard
              module={module}
              isActive={activeModuleId === module.id}
              moduleName={t(module.key)}
              onMouseEnter={() => setHoveredModuleId(module.id)}
              onMouseLeave={() => setHoveredModuleId(null)}
            />

            {/* Hover Tooltip (only for non-active modules) */}
            <ModuleTooltip
              moduleName={t(module.key)}
              isVisible={shouldShowTooltip(module.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModuleGrid;
