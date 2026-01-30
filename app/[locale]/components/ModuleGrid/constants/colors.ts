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
    glow: 'rgba(17, 239, 227, 0.6)',
  },
  
  // Cyan → Blue (8 uses)
  cyanBlue: {
    start: '#11EFE3',
    end: '#0073E6',
    glow: 'rgba(17, 239, 227, 0.6)',
  },
  
  // Pink → Purple (12 uses)
  pinkPurple: {
    start: '#FF5996',
    end: '#9966FF',
    glow: 'rgba(255, 89, 150, 0.6)',
  },
  
  // Yellow → Green (6 uses)
  yellowGreen: {
    start: '#FFD848',
    end: '#00D924',
    glow: 'rgba(255, 216, 72, 0.6)',
  },
  
  // Blue → Pink/Magenta (6 uses)
  bluePink: {
    start: '#0073E6',
    end: '#FF80FF',
    glow: 'rgba(0, 115, 230, 0.6)',
  },
  
  // Teal → Green (4 uses)
  tealGreen: {
    start: '#1DF5E9',
    end: '#00D924',
    glow: 'rgba(29, 245, 233, 0.6)',
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
  strokeWidthActive: 2.5,
  
  /** Background trace stroke width */
  traceStrokeWidth: 2,
  
  /** Background trace color - lighter for better visibility */
  traceColor: '#cbd5e1',
  
  /** Background trace opacity - increased for visibility */
  traceOpacity: 0.35,
  
  /** Glow blur radius in pixels */
  glowBlur: 6,
  
  /** Glow stroke width - disabled */
  glowStrokeWidth: 0,
  
  /** Glow opacity - disabled */
  glowOpacity: 0,
  
  /** Flow particle radius */
  particleRadius: 4,
  
  /** Flow particle color */
  particleColor: '#FFFFFF',
} as const;

// ==========================================================================
// Animation Constants
// ==========================================================================

export const ANIMATION_CONSTANTS = {
  /** Gradient rotation speed (degrees per second) - faster for visible effect */
  rotationSpeed: 50,
  
  /** Base flow particle duration in seconds */
  baseParticleDuration: 1.8,
  
  /** Minimum particle duration */
  minParticleDuration: 1.5,
  
  /** Pixels per second for particle speed calculation - faster */
  particleSpeedFactor: 120,
  
  /** Line draw animation duration in seconds - faster */
  lineDrawDuration: 0.35,
  
  /** Fade transition duration in seconds - faster */
  fadeTransitionDuration: 0.25,
} as const;
