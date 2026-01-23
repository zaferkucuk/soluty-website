'use client';

import { useState, useEffect, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  modules,
  mobileGridPositions,
  getActiveModuleIdsForGroup,
  getGridDimensions,
  getRandomStartGroup,
  getNextGroupId,
  gridToPixel,
  DESIGN_TOKENS,
} from './modules-data';
import { ModuleCard } from './ModuleCard';
import { ConnectionLines } from './ConnectionLines';

// ==========================================================================
// Hook: useMediaQuery
// ==========================================================================

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  
  return matches;
}

// ==========================================================================
// ModuleGrid Component
// ==========================================================================

export function ModuleGrid() {
  const t = useTranslations('moduleGrid.modules');
  const tGrid = useTranslations('moduleGrid');
  const shouldReduceMotion = useReducedMotion();
  
  // Responsive breakpoint
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  
  // Determine card size and gap based on breakpoint
  const { cardSize, gap, columns, rows } = useMemo(() => {
    if (isMobile) {
      return {
        cardSize: DESIGN_TOKENS.card.mobile.width,
        gap: DESIGN_TOKENS.card.mobile.gap,
        columns: 4,
        rows: 6,
      };
    }
    if (isTablet) {
      return {
        cardSize: DESIGN_TOKENS.card.tablet.width,
        gap: DESIGN_TOKENS.card.tablet.gap,
        columns: 6,
        rows: 6,
      };
    }
    return {
      cardSize: DESIGN_TOKENS.card.desktop.width,
      gap: DESIGN_TOKENS.card.desktop.gap,
      columns: 6,
      rows: 6,
    };
  }, [isMobile, isTablet]);
  
  // Grid dimensions
  const gridDimensions = useMemo(
    () => getGridDimensions(columns, rows, cardSize, gap),
    [columns, rows, cardSize, gap]
  );
  
  // Active group state - starts with random group
  const [activeGroupId, setActiveGroupId] = useState(() => {
    // Use 1 for SSR, will be randomized on client
    return 1;
  });
  
  // Initialize with random group on client
  useEffect(() => {
    setActiveGroupId(getRandomStartGroup());
  }, []);
  
  // Hover state
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);
  
  // Get active module IDs for current group
  const activeModuleIds = useMemo(
    () => getActiveModuleIdsForGroup(activeGroupId),
    [activeGroupId]
  );
  
  // Auto-cycle through groups
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const timer = setInterval(() => {
      setActiveGroupId((prev) => getNextGroupId(prev));
    }, DESIGN_TOKENS.animation.groupDuration);
    
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);
  
  // Check if module is active
  const isModuleActive = (moduleId: string) => activeModuleIds.includes(moduleId);
  
  return (
    <div
      className="relative"
      style={{
        width: gridDimensions.width,
        height: gridDimensions.height,
      }}
      role="region"
      aria-label={tGrid('ariaLabel')}
      aria-live="polite"
    >
      {/* Connection Lines SVG - behind cards */}
      <ConnectionLines
        activeGroupId={activeGroupId}
        gridWidth={gridDimensions.width}
        gridHeight={gridDimensions.height}
        cardSize={cardSize}
        gap={gap}
        isMobile={isMobile}
      />
      
      {/* Module Cards */}
      <div
        className="relative"
        style={{
          width: gridDimensions.width,
          height: gridDimensions.height,
        }}
      >
        {modules.map((module) => {
          // Get position based on mobile or desktop
          const position = isMobile
            ? mobileGridPositions[module.id]
            : module.gridPosition;
          
          const pixelPosition = gridToPixel(position, cardSize, gap);
          const isActive = isModuleActive(module.id);
          
          return (
            <div
              key={module.id}
              className="absolute transition-transform duration-200"
              style={{
                left: pixelPosition.x,
                top: pixelPosition.y,
                width: cardSize,
                height: cardSize,
                zIndex: isActive ? 10 : 1,
              }}
            >
              <ModuleCard
                module={module}
                isActive={isActive}
                moduleName={t(module.key)}
                cardSize={cardSize}
                onMouseEnter={() => setHoveredModuleId(module.id)}
                onMouseLeave={() => setHoveredModuleId(null)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ModuleGrid;
