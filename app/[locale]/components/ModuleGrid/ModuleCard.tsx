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
// Stripe-style Shadows
// ==========================================================================

const cardShadows = {
  inactive: 'none',
  hover: '0 2px 8px rgba(0, 0, 0, 0.08)',
  active: '0 4px 12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(77, 182, 160, 0.1)',
};

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
  
  // Calculate icon size based on card size
  const iconSize = cardSize === 80 ? 32 : cardSize === 72 ? 28 : 24;
  const fontSize = cardSize === 80 ? 11 : 10;
  const borderRadius = cardSize === 80 ? 16 : cardSize === 72 ? 14 : 12;

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center bg-white cursor-pointer select-none"
      style={{
        width: cardSize,
        height: cardSize,
        borderRadius,
      }}
      initial={false}
      animate={{
        borderColor: isActive 
          ? 'rgba(77, 182, 160, 0.3)' 
          : 'rgba(0, 0, 0, 0.06)',
        borderWidth: 1,
        borderStyle: 'solid',
        boxShadow: isActive ? cardShadows.active : cardShadows.inactive,
      }}
      whileHover={{
        borderColor: isActive 
          ? 'rgba(77, 182, 160, 0.3)' 
          : 'rgba(0, 0, 0, 0.1)',
        boxShadow: isActive ? cardShadows.active : cardShadows.hover,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Icon with gradient for active state */}
      <motion.div
        className="flex items-center justify-center"
        initial={false}
        animate={{
          opacity: isActive ? 1 : DESIGN_TOKENS.colors.inactiveIconOpacity,
        }}
        whileHover={{
          opacity: isActive ? 1 : DESIGN_TOKENS.colors.hoverIconOpacity,
        }}
        transition={{ duration: 0.2 }}
      >
        {isActive ? (
          // Gradient icon for active state
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
        ) : (
          // Simple gray icon for inactive state
          <Icon
            size={iconSize}
            strokeWidth={1.5}
            color={DESIGN_TOKENS.colors.inactiveIcon}
          />
        )}
      </motion.div>

      {/* Label - visible when active or hovered */}
      <motion.span
        className="mt-1.5 text-center leading-tight px-1 w-full truncate"
        style={{ fontSize }}
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          color: isActive 
            ? DESIGN_TOKENS.colors.activeLabel 
            : DESIGN_TOKENS.colors.inactiveLabel,
          fontWeight: isActive ? 500 : 400,
        }}
        whileHover={{
          opacity: isActive ? 1 : 0.7,
        }}
        transition={{ duration: 0.15 }}
      >
        {moduleName}
      </motion.span>
    </motion.div>
  );
}
