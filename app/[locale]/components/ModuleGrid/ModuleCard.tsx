'use client';

import { motion } from 'framer-motion';
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
      className="relative flex flex-col items-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="flex items-center justify-center rounded-xl bg-gray-50 transition-colors"
        style={{
          width: 64,
          height: 64,
          borderWidth: isActive ? 2 : 1,
          borderStyle: 'solid',
          borderColor: isActive ? '#4DB6A0' : '#E5E7EB',
        }}
        animate={{
          scale: isActive ? 1.1 : 1,
          boxShadow: isActive
            ? '0 8px 24px rgba(77, 182, 160, 0.25)'
            : '0 0 0 rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.2 }}
      >
        <Icon
          size={24}
          className="transition-colors"
          style={{ color: isActive ? '#4DB6A0' : '#374151' }}
        />
      </motion.div>

      {/* Active Label */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-full whitespace-nowrap z-10"
          aria-live="polite"
        >
          {moduleName}
        </motion.div>
      )}
    </motion.div>
  );
}
