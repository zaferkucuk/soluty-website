'use client';

import { useTranslations } from 'next-intl';
import { erpModules } from './erp-modules-data';
import { ERPStackingCard } from './ERPStackingCard';
import type { ERPStackingCardListProps } from './types';

// ==========================================================================
// ERPStackingCardList Component
// ==========================================================================

/**
 * Left column: CTA button + stacking card list.
 *
 * CTA button appears above the cards (after section header).
 * Cards use CSS `position: sticky` to stack on top of each other
 * as the user scrolls — no JavaScript state management.
 *
 * Reference: erp-features-stacking-cards-v2 spec
 */
export function ERPStackingCardList({
  setCardRef,
  cardsVisible,
}: ERPStackingCardListProps) {
  const t = useTranslations();

  return (
    <div className="flex-1 min-w-0">
      {/* CTA Button — above cards */}
      <div className="mb-6 md:mb-8">
        <a
          href="#contact"
          className="btn btn-brand"
        >
          {t('erpFeatures.cta')}
        </a>
      </div>

      {/* Stacking Card List */}
      <div
        role="list"
        aria-label={t('erpFeatures.eyebrow')}
        className="flex flex-col gap-6 md:gap-8"
      >
        {erpModules.map((module, index) => (
          <ERPStackingCard
            key={module.id}
            ref={setCardRef(index)}
            module={module}
            index={index}
            isVisible={cardsVisible}
          />
        ))}
      </div>
    </div>
  );
}
