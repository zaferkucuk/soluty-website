/**
 * ERP Features Section — TypeScript Interfaces
 *
 * Shared types for the stacking cards v2.0 implementation.
 *
 * Reference: erp-features-stacking-cards-v2 spec
 */

import type { ERPModule } from './erp-modules-data';

// ==========================================================================
// ERPStackingCard Props
// ==========================================================================

export interface ERPStackingCardProps {
  /** Module data from erp-modules-data.ts */
  module: ERPModule;
  /** Index for staggered entry animation */
  index: number;
  /** Whether entry animation has been triggered */
  isVisible: boolean;
}

// ==========================================================================
// ERPStackingCardList Props
// ==========================================================================

export interface ERPStackingCardListProps {
  /** Callback to set card refs for scroll-linked highlight */
  setCardRef: (index: number) => (el: HTMLElement | null) => void;
  /** Whether cards container is visible (for entry animation) */
  cardsVisible: boolean;
}

// ==========================================================================
// ERPFeaturesHeader Props
// ==========================================================================

export interface ERPFeaturesHeaderProps {
  /** Whether the header is visible (for entry animation) */
  isVisible: boolean;
}
