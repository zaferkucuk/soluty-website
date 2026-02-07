'use client';

import { motion } from 'framer-motion';
import type { Module } from './modules-data';

interface ModuleCardProps {
  module: Module;
  isActive: boolean;
  /** Whether connection lines are currently drawn on the grid */
  hasActiveConnections: boolean;
  moduleName: string;
  cardSize: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// ==========================================================================
// Card Style Constants (Stripe-inspired)
// ==========================================================================

const CARD_STYLES = {
  // Scale values
  inactiveScale: 1,
  activeScale: 1.1,

  // Opacity values
  inactiveOpacity: 0.35,
  /** Extra-faded: inactive cards when connection lines are visible (50% of inactive) */
  dimmedOpacity: 0.18,
  activeOpacity: 1,

  // Background colors
  activeBg: '#ffffff',
  inactiveBg: '#ffffff',

  // Shadows
  activeShadow: 'rgba(50, 50, 93, 0.25) 0px 12.6px 25.2px -11.5733px, rgba(0, 0, 0, 0.1) 0px 7.56px 15.12px -7.56px',
  noShadow: '0px 0px 0px 0px rgba(0,0,0,0)',

  // Borders
  activeBorder: '1px solid rgba(0, 0, 0, 0.06)',
  inactiveBorder: '1px solid rgba(0, 0, 0, 0.04)',

  // Icon color — solid Brand Teal (unified across all groups)
  iconColor: '#4DB6A0',

  // Icon size — matching ERP stacking card icons (24px default, 28px md)
  iconSize: 24,
} as const;

// ==========================================================================
// ModuleCard Component
// ==========================================================================

export function ModuleCard({
  module,
  isActive,
  hasActiveConnections,
  moduleName,
  cardSize,
  onMouseEnter,
  onMouseLeave,
}: ModuleCardProps) {
  const Icon = module.icon;

  const borderRadius = Math.round(cardSize * 0.10);

  // Determine opacity:
  //   active card  → always full opacity
  //   inactive + lines visible → extra dimmed (so lines stand out)
  //   inactive + no lines      → normal faded
  const opacity = isActive
    ? CARD_STYLES.activeOpacity
    : hasActiveConnections
      ? CARD_STYLES.dimmedOpacity
      : CARD_STYLES.inactiveOpacity;

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{
        width: cardSize,
        height: cardSize,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Card always visible — faded when inactive, extra-dimmed when lines are active */}
      <motion.div
        className="absolute flex flex-col items-center justify-center"
        style={{
          width: cardSize,
          height: cardSize,
          borderRadius,
          transformOrigin: 'center center',
          top: 0,
          left: 0,
          gap: 6,
        }}
        animate={{
          scale: isActive ? CARD_STYLES.activeScale : CARD_STYLES.inactiveScale,
          opacity,
          boxShadow: isActive ? CARD_STYLES.activeShadow : CARD_STYLES.noShadow,
          border: isActive ? CARD_STYLES.activeBorder : CARD_STYLES.inactiveBorder,
          backgroundColor: isActive ? CARD_STYLES.activeBg : CARD_STYLES.inactiveBg,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Solid Brand Teal Icon — unified color across all groups */}
        <Icon
          size={CARD_STYLES.iconSize}
          strokeWidth={1.5}
          style={{ color: CARD_STYLES.iconColor }}
        />

        {/* Label — 11.6px base (×1.1 scale when active ≈ 12.8px visual) */}
        <span
          className="text-center px-1"
          style={{
            fontSize: 11.6,
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            whiteSpace: 'nowrap',
          }}
        >
          {moduleName}
        </span>
      </motion.div>
    </div>
  );
}
