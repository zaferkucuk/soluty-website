'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Module } from './modules-data';

interface ModuleCardProps {
  module: Module;
  isActive: boolean;
  moduleName: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

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
      className="relative flex flex-col items-center justify-center rounded-xl bg-gray-50 cursor-default"
      style={{
        width: 80,
        height: 96,
        borderWidth: isActive ? 2 : 1,
        borderStyle: 'solid',
        borderColor: isActive ? '#4DB6A0' : '#E5E7EB',
      }}
      animate={{
        scale: isActive ? 1.05 : 1,
        boxShadow: isActive
          ? '0 8px 24px rgba(77, 182, 160, 0.25)'
          : '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
      transition={{ duration: 0.2 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Icon */}
      <Icon
        size={28}
        className="transition-colors"
        style={{ color: isActive ? '#4DB6A0' : '#6B7280' }}
      />

      {/* Label - Always visible when active, inside card */}
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="mt-2 text-[11px] font-medium text-gray-700 text-center leading-tight px-1 max-w-[72px] truncate"
            aria-live="polite"
          >
            {moduleName}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Placeholder for consistent height when not active */}
      {!isActive && <div className="mt-2 h-[14px]" />}
    </motion.div>
  );
}
