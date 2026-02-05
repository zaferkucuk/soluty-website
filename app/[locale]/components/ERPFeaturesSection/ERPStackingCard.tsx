'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import { CATEGORY_COLORS } from './erp-modules-data';
import type { ERPStackingCardProps } from './types';

// ==========================================================================
// ERPStackingCard Component
// ==========================================================================

/**
 * Individual stacking card for the ERP Features section.
 *
 * Two-layer structure (first card only):
 * 1. `.card-bg` — absolute, rotated -1.75deg, with thin primary green border
 * 2. `.card-content` — relative, white background, holds actual content
 *
 * Only the first card (index === 0) shows the angled background card.
 * All other cards render flat without the angled bg layer.
 *
 * Each card uses `position: sticky` to stack on top of previous cards
 * as the user scrolls. No JavaScript state management for stacking —
 * purely CSS driven.
 *
 * Layout:
 *   Row 1: [Icon] [Title] ............... [Category Badge]
 *   Row 2: [Description]
 *
 * Reference: erp-features-stacking-cards-v2 spec
 */
export const ERPStackingCard = forwardRef<HTMLElement, ERPStackingCardProps>(
  function ERPStackingCard({ module, index, isVisible }, ref) {
    const t = useTranslations();
    const Icon = module.icon;
    const colors = CATEGORY_COLORS[module.categoryId];

    // Staggered entry delay: 50ms per card
    const entryDelay = index * 50;

    // Only first card gets the angled background
    const isFirstCard = index === 0;

    return (
      <article
        ref={ref}
        role="listitem"
        aria-label={`${t(module.titleKey)} — ${t(module.categoryKey)}`}
        data-module-id={module.id}
        className={
          'relative ' +
          /* Sticky stacking: each card sticks and overlaps previous */
          'sticky top-[30vh] md:top-[30vh] lg:top-[30vh] ' +
          /* Entry animation */
          'transition-all duration-500 ease-out ' +
          (isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4')
        }
        style={{
          transitionDelay: isVisible ? `${entryDelay}ms` : '0ms',
          /* Ensure later cards stack on top of earlier cards */
          zIndex: index + 1,
        }}
        tabIndex={0}
      >
        {/* Layer 1: card-bg — angled shadow effect (FIRST CARD ONLY) */}
        {isFirstCard && (
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              zIndex: -1,
              transform: 'rotate(-1.75deg)',
              backgroundColor: 'var(--color-bg-tertiary, #EFEEED)',
              border: '1px solid var(--color-brand-primary)',
              boxShadow: 'var(--shadow-sm)',
            }}
            aria-hidden="true"
          />
        )}

        {/* Layer 2: card-content — actual card content */}
        <div
          className={
            'relative rounded-xl border border-[var(--color-border)] ' +
            'bg-white p-6 md:p-5 ' +
            /* Hover: shadow increase */
            'transition-shadow duration-250 ease-out ' +
            'hover:shadow-[var(--shadow-md)]'
          }
          style={{
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Row 1: Icon + Title + Category Badge */}
          <div className="flex items-center gap-3">
            {/* Icon — brand-primary, 30% smaller */}
            <div className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7">
              <Icon
                className="w-full h-full"
                strokeWidth={1.5}
                style={{
                  color: 'var(--color-brand-primary)',
                }}
              />
            </div>

            {/* Title */}
            <h3
              className="heading-4 !text-[18px] !leading-tight flex-1 min-w-0"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {t(module.titleKey)}
            </h3>

            {/* Category Badge — gray/black tones */}
            <span
              className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[18px] font-medium"
              style={{
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.02em',
                backgroundColor: colors.bg,
                color: colors.color,
              }}
            >
              {t(module.categoryKey)}
            </span>
          </div>

          {/* Row 2: Description */}
          <p
            className="mt-3 text-[18px]"
            style={{
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
            }}
          >
            {t(module.descriptionKey)}
          </p>
        </div>
      </article>
    );
  }
);
