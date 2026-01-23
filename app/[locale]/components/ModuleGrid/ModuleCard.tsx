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

// Stripe-inspired multi-layer shadow system
const cardShadows = {
  default: `
    rgba(50, 50, 93, 0.08) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.12) 0px 8px 16px -8px
  `,
  hover: `
    rgba(50, 50, 93, 0.15) 0px 20px 40px -8px,
    rgba(0, 0, 0, 0.18) 0px 12px 24px -12px
  `,
  active: `
    rgba(50, 50, 93, 0.2) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.25) 0px 18px 36px -18px,
    rgba(77, 182, 160, 0.25) 0px 0px 0px 2px
  `,
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
      className="relative flex flex-col items-center justify-center rounded-2xl bg-white cursor-default overflow-hidden"
      style={{
        width: GRID_CONFIG.cardWidth,
        height: GRID_CONFIG.cardHeight,
      }}
      initial={{
        boxShadow: cardShadows.default,
        scale: 1,
      }}
      animate={{
        scale: isActive ? 1.03 : 1,
        boxShadow: isActive ? cardShadows.active : cardShadows.default,
      }}
      whileHover={{
        boxShadow: isActive ? cardShadows.active : cardShadows.hover,
        scale: isActive ? 1.03 : 1.01,
      }}
      transition={{ 
        duration: 0.3,
        ease: 'easeOut',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Subtle gradient overlay for depth */}
      <div 
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.02) 100%)'
        }}
      />

      {/* Icon */}
      <motion.div
        animate={{
          scale: isActive ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon
          size={36}
          strokeWidth={1.5}
          className="transition-colors duration-300"
          style={{ color: isActive ? '#4DB6A0' : '#6B7280' }}
        />
      </motion.div>

      {/* Label - Always visible, styled based on active state */}
      <AnimatePresence mode="wait">
        <motion.span
          key={isActive ? 'active' : 'inactive'}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-3 text-xs font-medium text-center leading-tight px-3 w-full"
          style={{ 
            color: isActive ? '#374151' : '#9CA3AF',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          aria-live="polite"
        >
          {moduleName}
        </motion.span>
      </AnimatePresence>

      {/* Active indicator dot */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal-500"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
