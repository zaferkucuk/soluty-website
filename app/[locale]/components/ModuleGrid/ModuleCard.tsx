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
 * Stripe's exact styling values extracted from their homepage.
 * The dual-layer system uses:
 * - Outline layer: visible when inactive (ghost state)
 * - Solid layer: visible when active (elevated state)
 */
const STRIPE_CARD_STYLES = {
  // Scale values
  inactiveScale: 0.886,  // ~88.6% when inactive
  activeScale: 1.0,      // 100% when active
  
  // Background colors
  inactiveBg: '#f6f9fc', // Light gray (outline layer)
  activeBg: '#ffffff',   // Pure white (solid layer)
  
  // Stripe's exact box-shadow for active cards
  // Two-layer shadow for depth and softness
  activeShadow: 'rgba(50, 50, 93, 0.25) 0px 12.6px 25.2px -11.5733px, rgba(0, 0, 0, 0.1) 0px 7.56px 15.12px -7.56px',
  
  // Border for subtle definition
  inactiveBorder: '1px solid rgba(0, 0, 0, 0.04)',
  activeBorder: '1px solid rgba(0, 0, 0, 0.06)',
  
  // Animation timing
  transitionDuration: 0.3,
  transitionEase: [0.4, 0, 0.2, 1], // Material Design easing
} as const;

// ==========================================================================
// ModuleCard Component - Stripe-style Dual Layer
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
  
  // Calculate sizes based on card size
  const iconSize = cardSize === 80 ? 32 : cardSize === 72 ? 28 : 24;
  const fontSize = cardSize === 80 ? 11 : 10;
  const borderRadius = cardSize === 80 ? 12 : cardSize === 72 ? 10 : 8;

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
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          borderRadius,
          border: STRIPE_CARD_STYLES.inactiveBorder,
        }}
        initial={false}
        animate={{
          backgroundColor: STRIPE_CARD_STYLES.inactiveBg,
          scale: isActive ? STRIPE_CARD_STYLES.activeScale : STRIPE_CARD_STYLES.inactiveScale,
          opacity: isActive ? 0 : 1,
        }}
        transition={{
          duration: STRIPE_CARD_STYLES.transitionDuration,
          ease: STRIPE_CARD_STYLES.transitionEase,
        }}
      >
        {/* Inactive icon */}
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
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          borderRadius,
          border: STRIPE_CARD_STYLES.activeBorder,
        }}
        initial={false}
        animate={{
          backgroundColor: STRIPE_CARD_STYLES.activeBg,
          scale: isActive ? STRIPE_CARD_STYLES.activeScale : STRIPE_CARD_STYLES.inactiveScale,
          opacity: isActive ? 1 : 0,
          boxShadow: isActive ? STRIPE_CARD_STYLES.activeShadow : 'none',
        }}
        transition={{
          duration: STRIPE_CARD_STYLES.transitionDuration,
          ease: STRIPE_CARD_STYLES.transitionEase,
        }}
      >
        {/* Active gradient icon */}
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

        {/* Label - only in solid layer */}
        <motion.span
          className="mt-1.5 text-center leading-tight px-1 w-full truncate"
          style={{ 
            fontSize,
            color: DESIGN_TOKENS.colors.activeLabel,
            fontWeight: 500,
          }}
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
            delay: isActive ? 0.1 : 0,
          }}
        >
          {moduleName}
        </motion.span>
      </motion.div>
    </div>
  );
}
