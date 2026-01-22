'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { modules, animationOrder, getGridBounds, CARD_WIDTH, CARD_HEIGHT } from './modules-data';
import { ModuleCard } from './ModuleCard';
import { ModuleTooltip } from './ModuleTooltip';
import { ConnectionLines } from './ConnectionLines';

// Animation timing - 2.5 seconds per module for comfortable viewing
const ANIMATION_INTERVAL = 2500;

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

  // Get organic grid bounds
  const gridBounds = getGridBounds();

  // Should show tooltip (only for non-active hovered modules)
  const shouldShowTooltip = (moduleId: string) =>
    hoveredModuleId === moduleId && activeModuleId !== moduleId;

  return (
    <div
      className="relative w-full max-w-md mx-auto lg:mx-0"
      role="img"
      aria-label={tGrid('ariaLabel')}
    >
      {/* Connection Lines SVG - positioned behind cards */}
      <ConnectionLines
        activeModuleId={activeModuleId}
        gridWidth={gridBounds.width}
        gridHeight={gridBounds.height}
      />

      {/* Module Grid - Organic absolute positioning */}
      <div
        className="relative"
        style={{
          width: gridBounds.width,
          height: gridBounds.height,
        }}
      >
        {modules.map((module) => (
          <div
            key={module.id}
            className="absolute"
            style={{
              left: module.position.x,
              top: module.position.y,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
            }}
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
