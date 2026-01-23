/**
 * Color Constants for ModuleGrid Connection Lines
 * 
 * Based on Stripe.com analysis (January 2026)
 * These are the actual gradient color pairs used by Stripe.
 */

// ==========================================================================
// Stripe-Extracted Color Pairs
// ==========================================================================

export interface ColorPair {
  start: string;
  end: string;
  glow: string;
}

/**
 * Stripe's actual gradient color combinations.
 * Extracted from Stripe.com HomepageFrontdoor component.
 */
export const STRIPE_COLOR_PAIRS: Record<string, ColorPair> = {
  // Cyan → Purple (most common, 12 uses)
  cyanPurple: {
    start: '#11EFE3',
    end: '#9966FF',
    glow: 'rgba(17, 239, 227, 0.4)',
  },
  
  // Cyan → Blue (8 uses)
  cyanBlue: {
    start: '#11EFE3',
    end: '#0073E6',
    glow: 'rgba(17, 239, 227, 0.4)',
  },
  
  // Pink → Purple (12 uses)
  pinkPurple: {
    start: '#FF5996',
    end: '#9966FF',
    glow: 'rgba(255, 89, 150, 0.4)',
  },
  
  // Yellow → Green (6 uses)
  yellowGreen: {
    start: '#FFD848',
    end: '#00D924',
    glow: 'rgba(255, 216, 72, 0.4)',
  },
  
  // Blue → Pink/Magenta (6 uses)
  bluePink: {
    start: '#0073E6',
    end: '#FF80FF',
    glow: 'rgba(0, 115, 230, 0.4)',
  },
  
  // Teal → Green (4 uses)
  tealGreen: {
    start: '#1DF5E9',
    end: '#00D924',
    glow: 'rgba(29, 245, 233, 0.4)',
  },
};

// ==========================================================================
// Group-to-Color Mapping for Soluty
// ==========================================================================

/**
 * Maps Soluty module groups to Stripe-style color pairs.
 * Chosen for visual harmony and brand alignment.
 */
export const GROUP_COLOR_MAP: Record<number, ColorPair> = {
  1: STRIPE_COLOR_PAIRS.cyanPurple,   // Order Management - Teal/Purple
  2: STRIPE_COLOR_PAIRS.pinkPurple,   // Logistics - Pink/Purple
  3: STRIPE_COLOR_PAIRS.cyanBlue,     // Sales & Billing - Cyan/Blue
  4: STRIPE_COLOR_PAIRS.yellowGreen,  // Inventory - Yellow/Green
  5: STRIPE_COLOR_PAIRS.tealGreen,    // Finance - Teal/Green
  6: STRIPE_COLOR_PAIRS.bluePink,     // Customer - Blue/Pink
};

// ==========================================================================
// Line Style Constants
// ==========================================================================

export const LINE_STYLES = {
  /** Stroke width when connection is inactive */
  strokeWidthInactive: 2,
  
  /** Stroke width when connection is active */
  strokeWidthActive: 2,
  
  /** Background trace stroke width */
  traceStrokeWidth: 2,
  
  /** Background trace color */
  traceColor: '#94a3b8',
  
  /** Background trace opacity */
  traceOpacity: 0.12,
  
  /** Glow blur radius in pixels */
  glowBlur: 8,
  
  /** Glow stroke width */
  glowStrokeWidth: 12,
  
  /** Glow opacity */
  glowOpacity: 0.4,
  
  /** Flow particle radius */
  particleRadius: 4,
  
  /** Flow particle color */
  particleColor: '#FFFFFF',
} as const;

// ==========================================================================
// Animation Constants
// ==========================================================================

export const ANIMATION_CONSTANTS = {
  /** Gradient rotation speed (degrees per second) */
  rotationSpeed: 30,
  
  /** Base flow particle duration in seconds */
  baseParticleDuration: 2.0,
  
  /** Minimum particle duration */
  minParticleDuration: 1.8,
  
  /** Pixels per second for particle speed calculation */
  particleSpeedFactor: 150,
  
  /** Line draw animation duration in seconds */
  lineDrawDuration: 0.5,
  
  /** Fade transition duration in seconds */
  fadeTransitionDuration: 0.4,
} as const;
