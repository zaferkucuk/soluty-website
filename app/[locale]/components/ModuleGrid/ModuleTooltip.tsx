'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ModuleTooltipProps {
  moduleName: string;
  isVisible: boolean;
}

export function ModuleTooltip({ moduleName, isVisible }: ModuleTooltipProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-full whitespace-nowrap z-10 pointer-events-none"
        >
          {moduleName}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
