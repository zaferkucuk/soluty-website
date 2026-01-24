'use client';

import { motion } from 'framer-motion';
import type { Module } from './modules-data';
import { DESIGN_TOKENS, GROUP_GRADIENTS } from './modules-data';

interface ModuleCardProps {
  module: Module;
  isActive: boolean;
  moduleName: string;
  cardSize: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// ==========================================================================
// Stripe-style Card Constants
// ==========================================================================

/**
 * Stripe's exact styling values:
 * - Inactive scale: 0.886
 * - Active scale: 1.0
 */
const CARD_STYLES = {
  inactiveScale: 0.886,
  activeScale: 1.0,
  inactiveBg: '#f6f9fc',
  activeBg: '#ffffff',
  activeShadow: 'rgba(50, 50, 93, 0.25) 0px 12.6px 25.2px -11.5733px, rgba(0, 0, 0, 0.1) 0px 7.56px 15.12px -7.56px',
  noShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
  inactiveBorder: '1px solid rgba(0, 0, 0, 0.04)',
  activeBorder: '1px solid rgba(0, 0, 0, 0.06)',
} as const;

// ==========================================================================
// ModuleCard Component
// ==========================================================================

export function ModuleCard({
  module,
  isActive,
  moduleName,
  cardSize,
  onMouseEnter,
  onMouseLeave,
}: ModuleCardProps) {
  const Icon = module.icon;
  const groupGradient = GROUP_GRADIENTS[module.groupId];
  
  const iconSize = cardSize === 80 ? 32 : cardSize === 72 ? 28 : 24;
  const fontSize = cardSize === 80 ? 11 : 10;
  const borderRadius = cardSize === 80 ? 12 : cardSize === 72 ? 10 : 8;

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ width: cardSize, height: cardSize }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Layer 1: Outline/Ghost (visible when inactive) */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        style={{
          width: cardSize,
          height: cardSize,
          borderRadius,
          border: CARD_STYLES.inactiveBorder,
          backgroundColor: CARD_STYLES.inactiveBg,
          transformOrigin: 'center center',
        }}
        initial={{ scale: CARD_STYLES.inactiveScale, opacity: 1 }}
        animate={{ 
          scale: isActive ? CARD_STYLES.activeScale : CARD_STYLES.inactiveScale,
          opacity: isActive ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        key={`outline-${module.id}`}
      >
        <div className="flex items-center justify-center">
          <Icon
            size={iconSize}
            strokeWidth={1.5}
            color={DESIGN_TOKENS.colors.inactiveIcon}
            style={{ opacity: DESIGN_TOKENS.colors.inactiveIconOpacity }}
          />
        </div>
      </motion.div>

      {/* Layer 2: Solid (visible when active) */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        style={{
          width: cardSize,
          height: cardSize,
          borderRadius,
          border: CARD_STYLES.activeBorder,
          backgroundColor: CARD_STYLES.activeBg,
          transformOrigin: 'center center',
        }}
        initial={{ scale: CARD_STYLES.inactiveScale, opacity: 0 }}
        animate={{ 
          scale: isActive ? CARD_STYLES.activeScale : CARD_STYLES.inactiveScale,
          opacity: isActive ? 1 : 0,
          boxShadow: isActive ? CARD_STYLES.activeShadow : CARD_STYLES.noShadow,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        key={`solid-${module.id}`}
      >
        <div className="flex items-center justify-center">
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24">
            <defs>
              <linearGradient
                id={`icon-gradient-${module.id}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={groupGradient.start} />
                <stop offset="100%" stopColor={groupGradient.end} />
              </linearGradient>
            </defs>
            <Icon
              size={iconSize}
              strokeWidth={1.5}
              stroke={`url(#icon-gradient-${module.id})`}
              fill="none"
            />
          </svg>
        </div>

        <motion.span
          className="mt-1.5 text-center leading-tight px-1 w-full truncate"
          style={{ 
            fontSize,
            color: DESIGN_TOKENS.colors.activeLabel,
            fontWeight: 500,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.2, delay: isActive ? 0.1 : 0 }}
        >
          {moduleName}
        </motion.span>
      </motion.div>
    </div>
  );
}
