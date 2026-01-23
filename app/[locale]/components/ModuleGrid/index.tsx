'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  modules, 
  moduleGroups, 
  groupAnimationOrder, 
  getGridBounds,
  GRID_CONFIG,
} from './modules-data';
import { ModuleCard } from './ModuleCard';
import { ModuleTooltip } from './ModuleTooltip';
import { ConnectionLines } from './ConnectionLines';

// Animation timing - 3.5 seconds per group for comfortable viewing
const ANIMATION_INTERVAL = 3500;

export function ModuleGrid() {
  const t = useTranslations('moduleGrid.modules');
  const tGrid = useTranslations('moduleGrid');
  const shouldReduceMotion = useReducedMotion();

  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);

  // Get current active group
  const activeGroupId = groupAnimationOrder[activeGroupIndex];
  const activeGroup = moduleGroups.find(g => g.id === activeGroupId);
  const activeModuleIds = activeGroup?.moduleIds || [];

  // Auto-cycle through groups
  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = setInterval(() => {
      setActiveGroupIndex((prev) => (prev + 1) % groupAnimationOrder.length);
    }, ANIMATION_INTERVAL);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  // Get grid bounds
  const gridBounds = getGridBounds();

  // Check if module is active (part of current group)
  const isModuleActive = (moduleId: string) => activeModuleIds.includes(moduleId);

  // Should show tooltip (only for non-active hovered modules)
  const shouldShowTooltip = (moduleId: string) =>
    hoveredModuleId === moduleId && !isModuleActive(moduleId);

  return (
    <div
      className="relative"
      style={{
        width: gridBounds.width,
        height: gridBounds.height,
      }}
      role="img"
      aria-label={tGrid('ariaLabel')}
    >
      {/* Connection Lines SVG - positioned behind cards */}
      <ConnectionLines
        activeModuleIds={activeModuleIds}
        activeGroupIndex={activeGroupIndex}
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
              width: GRID_CONFIG.cardWidth,
              height: GRID_CONFIG.cardHeight,
              zIndex: isModuleActive(module.id) ? 10 : 1,
            }}
            aria-hidden="true"
          >
            <ModuleCard
              module={module}
              isActive={isModuleActive(module.id)}
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
