'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { modules, animationOrder } from './modules-data';
import { ModuleCard } from './ModuleCard';
import { ModuleTooltip } from './ModuleTooltip';
import { ConnectionLines } from './ConnectionLines';

// Updated card size: 80x96 (was 64x64)
const CARD_WIDTH = 80;
const CARD_HEIGHT = 96;
const GAP = 12; // Reduced gap since cards are larger
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
  const gridWidth = 3 * CARD_WIDTH + 2 * GAP;
  const gridHeight = 4 * CARD_HEIGHT + 3 * GAP;

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
        cellSize={CARD_WIDTH}
        cellHeight={CARD_HEIGHT}
        gap={GAP}
      />

      {/* Module Grid */}
      <div
        className="relative grid"
        style={{
          gridTemplateColumns: `repeat(3, ${CARD_WIDTH}px)`,
          gridTemplateRows: `repeat(4, ${CARD_HEIGHT}px)`,
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
