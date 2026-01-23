'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * HeroBackground - Stripe-inspired animated gradient background
 * 
 * Creates a multi-layer gradient with animated blobs for visual depth.
 * Respects prefers-reduced-motion for accessibility.
 * 
 * Layers:
 * 1. Base gradient (static, multi-color radial gradients)
 * 2. Animated blob overlays (slow, organic movement)
 * 3. Subtle noise texture for depth (optional)
 */
export function HeroBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div 
      className="absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base multi-layer gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(228, 126, 237, 0.35) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 10% 80%, rgba(255, 184, 108, 0.30) 0%, transparent 40%),
            radial-gradient(ellipse 50% 50% at 50% 50%, rgba(247, 201, 76, 0.20) 0%, transparent 35%),
            radial-gradient(ellipse 70% 60% at 80% 20%, rgba(173, 106, 235, 0.30) 0%, transparent 45%),
            radial-gradient(ellipse 60% 50% at 90% 70%, rgba(108, 145, 247, 0.25) 0%, transparent 50%),
            linear-gradient(135deg, #fdfaff 0%, #f8f5ff 25%, #fffbf0 50%, #f5f3ff 75%, #f0f7ff 100%)
          `
        }}
      />

      {/* Animated blob 1 - Magenta (top-left area) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '50vw',
          height: '50vw',
          maxWidth: '600px',
          maxHeight: '600px',
          background: 'radial-gradient(circle, rgba(228, 126, 237, 0.25) 0%, transparent 70%)',
          left: '5%',
          top: '10%',
          filter: 'blur(60px)',
        }}
        animate={shouldReduceMotion ? {} : {
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated blob 2 - Purple (top-right area) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '45vw',
          height: '45vw',
          maxWidth: '500px',
          maxHeight: '500px',
          background: 'radial-gradient(circle, rgba(173, 106, 235, 0.22) 0%, transparent 70%)',
          right: '5%',
          top: '5%',
          filter: 'blur(60px)',
        }}
        animate={shouldReduceMotion ? {} : {
          x: [0, -25, 0],
          y: [0, 15, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated blob 3 - Blue (bottom-right area) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '40vw',
          height: '40vw',
          maxWidth: '450px',
          maxHeight: '450px',
          background: 'radial-gradient(circle, rgba(108, 145, 247, 0.20) 0%, transparent 70%)',
          right: '15%',
          bottom: '10%',
          filter: 'blur(60px)',
        }}
        animate={shouldReduceMotion ? {} : {
          x: [0, 20, 0],
          y: [0, -15, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated blob 4 - Orange/Yellow (center-left area) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '35vw',
          height: '35vw',
          maxWidth: '400px',
          maxHeight: '400px',
          background: 'radial-gradient(circle, rgba(255, 184, 108, 0.18) 0%, transparent 70%)',
          left: '20%',
          top: '50%',
          filter: 'blur(60px)',
        }}
        animate={shouldReduceMotion ? {} : {
          x: [0, -15, 0],
          y: [0, 20, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle top edge fade for depth */}
      <div 
        className="absolute inset-x-0 top-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}

export default HeroBackground;
