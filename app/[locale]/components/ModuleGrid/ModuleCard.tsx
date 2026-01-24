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
// Card Style Constants - Based on Stripe's exact values
// ==========================================================================

/**
 * Stripe's exact styling values from their homepage:
 * 
 * Card:
 * - Size: 78×78px
 * - Border radius: 8px
 * - Icon (logo): ~35×35px centered in card
 * 
 * Label:
 * - Font: sohne-var (Stripe custom), fallback to system fonts
 * - Font size: 12px
 * - Font weight: 425 (between normal 400 and medium 500)
 * - Letter spacing: 0.2px
 * - Line height: 15px
 * - Color: rgb(46, 58, 85)
 * - Position: absolute, top: 73px (5px below card bottom)
 * 
 * Scale:
 * - Inactive: 0.886364
 * - Active: 1.0 (we use 1.1 for more emphasis)
 */
const CARD_STYLES = {
  // Scale values
  inactiveScale: 0.886,
  activeScale: 1.1,
  
  // Background colors
  inactiveBg: '#f6f9fc',
  activeBg: '#ffffff',
  
  // Shadows
  activeShadow: 'rgba(50, 50, 93, 0.25) 0px 12.6px 25.2px -11.5733px, rgba(0, 0, 0, 0.1) 0px 7.56px 15.12px -7.56px',
  noShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
  
  // Borders
  inactiveBorder: '1px solid rgba(0, 0, 0, 0.04)',
  activeBorder: '1px solid rgba(0, 0, 0, 0.06)',
  
  // Label styling (Stripe exact values)
  label: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 12,          // Stripe: 12px
    fontWeight: 450,       // Stripe: 425 (we use 450 for better visibility)
    letterSpacing: '0.2px',// Stripe: 0.2px
    lineHeight: '15px',    // Stripe: 15px
    color: 'rgb(46, 58, 85)', // Stripe exact color
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
  
  // Stripe uses ~45% of card size for icon (35px in 78px card)
  const iconSize = Math.round(cardSize * 0.40); // 40% of card
  const borderRadius = Math.round(cardSize * 0.10); // ~10% = 8px for 80px card
  
  // Gap between card bottom and label top (in pixels)
  // Stripe: label at top:73px for 78px card = ~6px gap below card
  const labelGap = 6;

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
      {/* Layer 1: Outline/Ghost (visible when inactive) */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{
          width: cardSize,
          height: cardSize,
          borderRadius,
          border: CARD_STYLES.inactiveBorder,
          backgroundColor: CARD_STYLES.inactiveBg,
          transformOrigin: 'center center',
          top: 0,
          left: 0,
        }}
        initial={{ scale: CARD_STYLES.inactiveScale, opacity: 1 }}
        animate={{ 
          scale: isActive ? CARD_STYLES.activeScale : CARD_STYLES.inactiveScale,
          opacity: isActive ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <Icon
          size={iconSize}
          strokeWidth={1.5}
          color={DESIGN_TOKENS.colors.inactiveIcon}
          style={{ opacity: DESIGN_TOKENS.colors.inactiveIconOpacity }}
        />
      </motion.div>

      {/* Layer 2: Solid (visible when active) */}
      <motion.div
        className="absolute flex items-center justify-center"
        style={{
          width: cardSize,
          height: cardSize,
          borderRadius,
          border: CARD_STYLES.activeBorder,
          backgroundColor: CARD_STYLES.activeBg,
          transformOrigin: 'center center',
          top: 0,
          left: 0,
        }}
        initial={{ scale: CARD_STYLES.inactiveScale, opacity: 0 }}
        animate={{ 
          scale: isActive ? CARD_STYLES.activeScale : CARD_STYLES.inactiveScale,
          opacity: isActive ? 1 : 0,
          boxShadow: isActive ? CARD_STYLES.activeShadow : CARD_STYLES.noShadow,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Gradient Icon - centered in card */}
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
      </motion.div>

      {/* Label - positioned below card, NOT affected by card scale */}
      <motion.span
        className="absolute text-center w-full left-0 pointer-events-none"
        style={{ 
          top: cardSize + labelGap,
          fontFamily: CARD_STYLES.label.fontFamily,
          fontSize: CARD_STYLES.label.fontSize,
          fontWeight: CARD_STYLES.label.fontWeight,
          letterSpacing: CARD_STYLES.label.letterSpacing,
          lineHeight: CARD_STYLES.label.lineHeight,
          color: CARD_STYLES.label.color,
          whiteSpace: 'nowrap',
        }}
        initial={{ opacity: 0, y: -4 }}
        animate={{ 
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : -4,
        }}
        transition={{ duration: 0.2, delay: isActive ? 0.15 : 0 }}
      >
        {moduleName}
      </motion.span>
    </div>
  );
}
