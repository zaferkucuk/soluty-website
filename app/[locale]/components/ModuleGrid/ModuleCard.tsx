'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
  
  // Label styling
  label: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 11,
    fontWeight: 450,
    letterSpacing: '0.2px',
    lineHeight: '13px',
    color: 'rgb(46, 58, 85)',
  },
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
  
  // Icon size: 32% of card to ensure it fits with label
  const iconSize = Math.round(cardSize * 0.32);
  const borderRadius = Math.round(cardSize * 0.10);
  
  // Unique gradient ID for this card
  const gradientId = `icon-gradient-${module.id}`;

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
              gap: 4,
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
            {/* SVG Gradient Definition (hidden) */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={groupGradient.start} />
                  <stop offset="100%" stopColor={groupGradient.end} />
                </linearGradient>
              </defs>
            </svg>

            {/* Gradient Icon - rendered directly */}
            <Icon
              size={iconSize}
              strokeWidth={1.5}
              stroke={`url(#${gradientId})`}
              fill="none"
            />

            {/* Label */}
            <span
              className="text-center"
              style={{ 
                fontFamily: CARD_STYLES.label.fontFamily,
                fontSize: CARD_STYLES.label.fontSize,
                fontWeight: CARD_STYLES.label.fontWeight,
                letterSpacing: CARD_STYLES.label.letterSpacing,
                lineHeight: CARD_STYLES.label.lineHeight,
                color: CARD_STYLES.label.color,
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
