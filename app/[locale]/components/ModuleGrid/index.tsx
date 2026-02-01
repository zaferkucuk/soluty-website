'use client';

import { useState, useEffect, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  modules,
  mobileGridPositions,
  getGridDimensions,
  gridToPixel,
  DESIGN_TOKENS,
} from './modules-data';
import { ModuleCard } from './ModuleCard';
import { ConnectionLines } from './ConnectionLines';
import { useSequentialActivation } from './hooks';

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
// Sequential Activation Configuration
// ==========================================================================

const SEQUENTIAL_CONFIG = {
  cardActivationDelay: 200,
  groupDisplayDuration: 2500,
  groupTransitionDelay: 400,
  cardDeactivationDelay: 150,
};

// ==========================================================================
// ModuleGrid Props Interface
// ==========================================================================

interface ModuleGridProps {
  /**
   * Highlight mode:
   * - 'auto-cycle': Default — groups rotate automatically (3.5s per group)
   * - 'scroll-linked': External control — auto-cycle pauses, highlightTargets used
   */
  highlightMode?: 'auto-cycle' | 'scroll-linked';
  /**
   * Module IDs to highlight when in scroll-linked mode.
   * Ignored when highlightMode is 'auto-cycle'.
   */
  highlightTargets?: string[];
}

// ==========================================================================
// ModuleGrid Component
// ==========================================================================

export function ModuleGrid({
  highlightMode = 'auto-cycle',
  highlightTargets = [],
}: ModuleGridProps) {
  const t = useTranslations('moduleGrid.modules');
  const tGrid = useTranslations('moduleGrid');
  const shouldReduceMotion = useReducedMotion() ?? false;
  
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
  
  // Sequential activation state — runs in auto-cycle mode
  const { visibleModuleIds, activeGroupId } = useSequentialActivation(
    SEQUENTIAL_CONFIG,
    shouldReduceMotion
  );
  
  // Hover state
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);
  
  // Determine if a module is active based on current mode
  const isModuleActive = (moduleId: string): boolean => {
    if (highlightMode === 'scroll-linked' && highlightTargets.length > 0) {
      // Scroll-linked: only highlight specified targets
      return highlightTargets.includes(moduleId);
    }
    // Auto-cycle: use sequential activation
    return visibleModuleIds.includes(moduleId);
  };

  // Determine active group ID for ConnectionLines
  const effectiveGroupId = useMemo(() => {
    if (highlightMode === 'scroll-linked' && highlightTargets.length > 0) {
      // Find which group the highlighted modules belong to
      const targetModule = modules.find((m) => highlightTargets.includes(m.id));
      return targetModule ? targetModule.groupId : activeGroupId;
    }
    return activeGroupId;
  }, [highlightMode, highlightTargets, activeGroupId]);

  // Effective visible module IDs for ConnectionLines
  const effectiveVisibleIds = useMemo(() => {
    if (highlightMode === 'scroll-linked' && highlightTargets.length > 0) {
      return highlightTargets;
    }
    return visibleModuleIds;
  }, [highlightMode, highlightTargets, visibleModuleIds]);
  
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
      {/* Connection Lines SVG */}
      <ConnectionLines
        activeGroupId={effectiveGroupId}
        visibleModuleIds={effectiveVisibleIds}
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
