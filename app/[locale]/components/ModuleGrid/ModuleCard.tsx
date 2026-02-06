'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Module } from './modules-data';

interface ModuleCardProps {
  module: Module;
  isActive: boolean;
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
  inactiveScale: 0.886,
  activeScale: 1.1,

  // Background colors
  activeBg: '#ffffff',

  // Shadows
  activeShadow: 'rgba(50, 50, 93, 0.25) 0px 12.6px 25.2px -11.5733px, rgba(0, 0, 0, 0.1) 0px 7.56px 15.12px -7.56px',
  noShadow: '0px 0px 0px 0px rgba(0,0,0,0)',

  // Borders
  activeBorder: '1px solid rgba(0, 0, 0, 0.06)',

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
  moduleName,
  cardSize,
  onMouseEnter,
  onMouseLeave,
}: ModuleCardProps) {
  const Icon = module.icon;

  const borderRadius = Math.round(cardSize * 0.10);

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
      {/* Only render card when active — invisible otherwise */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute flex flex-col items-center justify-center"
            style={{
              width: cardSize,
              height: cardSize,
              borderRadius,
              border: CARD_STYLES.activeBorder,
              backgroundColor: CARD_STYLES.activeBg,
              transformOrigin: 'center center',
              top: 0,
              left: 0,
              gap: 6,
            }}
            initial={{ scale: CARD_STYLES.inactiveScale, opacity: 0 }}
            animate={{
              scale: CARD_STYLES.activeScale,
              opacity: 1,
              boxShadow: CARD_STYLES.activeShadow,
            }}
            exit={{
              scale: CARD_STYLES.inactiveScale,
              opacity: 0,
              boxShadow: CARD_STYLES.noShadow,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Solid Brand Teal Icon — unified color across all groups */}
            <Icon
              size={CARD_STYLES.iconSize}
              strokeWidth={1.5}
              style={{ color: CARD_STYLES.iconColor }}
            />

            {/* Label — matches ERP stacking card description style */}
            <span
              className="text-center px-1"
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                whiteSpace: 'nowrap',
              }}
            >
              {moduleName}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
