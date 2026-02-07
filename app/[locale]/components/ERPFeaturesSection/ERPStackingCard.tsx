'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import type { ERPStackingCardProps } from './types';

// Design tokens
const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
};

const ICON_STYLES = {
  /** Matches Contact/ValueProposition + ServiceCard exactly */
  containerSize: 40,
  iconSize: 20,
  bg: 'rgba(92, 90, 88, 0.08)',
  color: '#5C5A58',
  strokeWidth: 2,
};

/**
 * Individual stacking card for the ERP Features section.
 *
 * Two-layer structure (first card only):
 * 1. `.card-bg` — absolute, rotated -1.75deg, with thin primary green border
 * 2. `.card-content` — relative, white background, holds actual content
 *
 * Only the first card (index === 0) shows the angled background card.
 *
 * Each card uses `position: sticky` to stack on top of previous cards.
 *
 * Icon style: 40px circle + 20px icon (consistent with ServiceCard + ValueProposition)
 *
 * Layout:
 *   Row 1: [Icon] [Title]
 *   Row 2: [Description]
 */
export const ERPStackingCard = forwardRef<HTMLElement, ERPStackingCardProps>(
  function ERPStackingCard({ module, index, isVisible }, ref) {
    const t = useTranslations();
    const Icon = module.icon;

    const entryDelay = index * 50;
    const isFirstCard = index === 0;

    return (
      <article
        ref={ref}
        role="listitem"
        aria-label={t(module.titleKey)}
        data-module-id={module.id}
        className={
          'relative ' +
          'sticky top-[30vh] md:top-[30vh] lg:top-[30vh] ' +
          'transition-all duration-500 ease-out ' +
          (isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4')
        }
        style={{
          transitionDelay: isVisible ? `${entryDelay}ms` : '0ms',
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
              border: '1px solid var(--color-border-strong)',
              boxShadow: 'var(--shadow-sm)',
            }}
            aria-hidden="true"
          />
        )}

        {/* Layer 2: card-content */}
        <div
          className={
            'relative rounded-xl border border-[var(--color-border)] ' +
            'bg-white p-6 md:p-5 ' +
            'transition-shadow duration-250 ease-out ' +
            'hover:shadow-[var(--shadow-md)]'
          }
          style={{
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Row 1: Icon + Title */}
          <div className="flex items-center gap-3">
            {/* Icon — 40px circle + 20px icon (matches Contact/ServiceCard) */}
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-full"
              style={{
                width: ICON_STYLES.containerSize,
                height: ICON_STYLES.containerSize,
                backgroundColor: ICON_STYLES.bg,
              }}
            >
              <Icon
                size={ICON_STYLES.iconSize}
                strokeWidth={ICON_STYLES.strokeWidth}
                style={{ color: ICON_STYLES.color }}
                aria-hidden="true"
              />
            </div>

            {/* Title — 24px Crimson Pro weight 500 */}
            <h3
              className="flex-1 min-w-0 leading-tight"
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: FONTS.serif,
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: 1.3,
              }}
            >
              {t(module.titleKey)}
            </h3>
          </div>

          {/* Row 2: Description — 18px body-lg */}
          <p
            className="mt-3"
            style={{
              lineHeight: 1.65,
              color: 'var(--color-text-secondary)',
              fontSize: '18px',
            }}
          >
            {t(module.descriptionKey)}
          </p>
        </div>
      </article>
    );
  }
);
