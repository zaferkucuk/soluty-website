'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Module } from './modules-data';
import { GRID_CONFIG } from './modules-data';

interface ModuleCardProps {
  module: Module;
  isActive: boolean;
  moduleName: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// Stripe-style shadow (subtle)
const cardShadows = {
  default: 'rgba(0, 0, 0, 0.04) 0px 1px 3px, rgba(0, 0, 0, 0.02) 0px 1px 2px',
  hover: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
  active: 'rgba(0, 0, 0, 0.08) 0px 4px 12px, rgba(77, 182, 160, 0.3) 0px 0px 0px 2px',
};

export function ModuleCard({
  module,
  isActive,
  moduleName,
  onMouseEnter,
  onMouseLeave,
}: ModuleCardProps) {
  const Icon = module.icon;

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center rounded-xl bg-white cursor-default"
      style={{
        width: GRID_CONFIG.cardWidth,
        height: GRID_CONFIG.cardHeight,
        border: isActive ? '2px solid #4DB6A0' : '1px solid #E5E7EB',
      }}
      initial={{ boxShadow: cardShadows.default }}
      animate={{
        boxShadow: isActive ? cardShadows.active : cardShadows.default,
      }}
      whileHover={{
        boxShadow: cardShadows.hover,
      }}
      transition={{ duration: 0.2 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Icon */}
      <Icon
        size={26}
        strokeWidth={1.5}
        className="transition-colors duration-200"
        style={{ color: isActive ? '#4DB6A0' : '#6B7280' }}
      />

      {/* Label */}
      <span
        className="mt-2 text-[11px] font-medium text-center leading-tight px-2 w-full"
        style={{ 
          color: isActive ? '#374151' : '#9CA3AF',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {moduleName}
      </span>

      {/* Active indicator dot */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-500"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
