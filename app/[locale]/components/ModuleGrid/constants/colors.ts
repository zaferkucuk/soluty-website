/**
 * Color Constants for ModuleGrid Connection Lines
 *
 * Soluty brand palette – derived from four base colors:
 *   #4DB6A0  (brand teal)
 *   #332436  (deep plum)
 *   #be95c2  (soft lavender)
 *   #363439  (charcoal)
 */

// ==========================================================================
// Types
// ==========================================================================

export interface ColorPair {
  start: string;
  end: string;
  glow: string;
}

// ==========================================================================
// Soluty Brand Color Pairs
// ==========================================================================

/**
 * Six gradient pairs built from the four Soluty brand colors.
 * Each pair blends two of the base colors or a tinted variation
 * to keep all groups distinguishable while staying on-palette.
 */
export const SOLUTY_COLOR_PAIRS: Record<string, ColorPair> = {
  // Teal → Deep Plum
  tealPlum: {
    start: '#4DB6A0',
    end: '#332436',
    glow: 'rgba(77, 182, 160, 0.45)',
  },

  // Deep Plum → Soft Lavender
  plumLavender: {
    start: '#332436',
    end: '#be95c2',
    glow: 'rgba(190, 149, 194, 0.40)',
  },

  // Soft Lavender → Teal
  lavenderTeal: {
    start: '#be95c2',
    end: '#4DB6A0',
    glow: 'rgba(133, 166, 177, 0.40)',
  },

  // Charcoal → Teal
  charcoalTeal: {
    start: '#363439',
    end: '#4DB6A0',
    glow: 'rgba(77, 182, 160, 0.35)',
  },

  // Teal → Soft Lavender
  tealLavender: {
    start: '#4DB6A0',
    end: '#be95c2',
    glow: 'rgba(133, 166, 177, 0.40)',
  },

  // Soft Lavender → Charcoal
  lavenderCharcoal: {
    start: '#be95c2',
    end: '#363439',
    glow: 'rgba(190, 149, 194, 0.35)',
  },
};

// ==========================================================================
// Group-to-Color Mapping for Soluty
// ==========================================================================

/**
 * Maps module groups to brand-derived color pairs.
 * Ordering maximises visual contrast between adjacent active groups.
 */
export const GROUP_COLOR_MAP: Record<number, ColorPair> = {
  1: SOLUTY_COLOR_PAIRS.tealPlum,          // Order Management
  2: SOLUTY_COLOR_PAIRS.plumLavender,      // Logistics
  3: SOLUTY_COLOR_PAIRS.charcoalTeal,      // Sales & Billing
  4: SOLUTY_COLOR_PAIRS.lavenderTeal,      // Inventory
  5: SOLUTY_COLOR_PAIRS.tealLavender,      // Finance
  6: SOLUTY_COLOR_PAIRS.lavenderCharcoal,  // Customer
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

  /** Background trace color */
  traceColor: '#cbd5e1',

  /** Background trace opacity */
  traceOpacity: 0.35,

  /** Glow blur radius in pixels */
  glowBlur: 6,

  /** Glow stroke width */
  glowStrokeWidth: 1,

  /** Glow opacity */
  glowOpacity: 0.1,

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
  rotationSpeed: 50,

  /** Base flow particle duration in seconds */
  baseParticleDuration: 1.8,

  /** Minimum particle duration */
  minParticleDuration: 1.5,

  /** Pixels per second for particle speed calculation */
  particleSpeedFactor: 120,

  /** Line draw animation duration in seconds */
  lineDrawDuration: 0.35,

  /** Fade transition duration in seconds */
  fadeTransitionDuration: 0.25,
} as const;
