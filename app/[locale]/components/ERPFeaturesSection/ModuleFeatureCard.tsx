'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import type { ERPModule } from './erp-modules-data';
import { CATEGORY_COLORS } from './erp-modules-data';

// ==========================================================================
// Types
// ==========================================================================

interface ModuleFeatureCardProps {
  module: ERPModule;
  /** Active state (scroll-linked, desktop only) */
  isActive: boolean;
  /** Inactive state — other cards dim when one is active */
  isInactive: boolean;
  /** Index for staggered entry animation */
  index: number;
  /** Whether entry animation has been triggered */
  isVisible: boolean;
}

// ==========================================================================
// ModuleFeatureCard Component
// ==========================================================================

/**
 * Individual module card for the ERP Features section.
 *
 * Desktop: Vertical layout (icon → title → badge → description)
 * Mobile: Horizontal compact layout (icon left, content right)
 *
 * Reference: docs/sections/erp-features-section-spec.md Section 5
 */
export const ModuleFeatureCard = forwardRef<HTMLElement, ModuleFeatureCardProps>(
  function ModuleFeatureCard({ module, isActive, isInactive, index, isVisible }, ref) {
    const t = useTranslations();
    const Icon = module.icon;
    const colors = CATEGORY_COLORS[module.categoryId];

    // Staggered entry delay: 50ms per card (spec Section 9.3)
    const entryDelay = index * 50;

    return (
      <article
        ref={ref}
        role="listitem"
        aria-label={`${t(module.titleKey)} — ${t(module.categoryKey)}`}
        data-module-id={module.id}
        className={
          'group rounded-xl transition-all duration-250 ease-out border ' +
          /* Entry animation */
          (isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4') +
          ' ' +
          /* State: active (desktop scroll-linked) */
          (isActive
            ? 'bg-white border-[var(--color-border)] shadow-[var(--shadow-md)]'
            : '') +
          ' ' +
          /* State: inactive (other cards dimmed) */
          (isInactive ? 'border-transparent opacity-55' : '') +
          ' ' +
          /* State: default (no scroll-linking active) */
          (!isActive && !isInactive
            ? 'bg-[var(--color-bg-primary)] border-transparent'
            : '') +
          ' ' +
          /* Hover: always override inactive */
          'hover:bg-white hover:border-[var(--color-border)] hover:shadow-[var(--shadow-sm)] hover:opacity-100' +
          ' ' +
          /* Desktop: vertical layout */
          'p-6 md:p-5 ' +
          /* Mobile: horizontal compact layout */
          'flex flex-row items-start gap-3 md:flex-col md:items-stretch md:gap-0'
        }
        style={{
          transitionDelay: isVisible ? `${entryDelay}ms` : '0ms',
        }}
        tabIndex={0}
      >
        {/* Icon */}
        <div
          className={
            'flex-shrink-0 ' +
            /* Mobile: 32px, Desktop: 40px */
            'w-8 h-8 md:w-10 md:h-10 md:mb-4'
          }
        >
          <Icon
            className="w-full h-full"
            strokeWidth={1.5}
            style={{
              color: isActive ? colors.color : 'var(--color-text-secondary)',
              transition: 'color 250ms ease',
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            className="heading-4 !text-lg md:!text-[22px] !leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {t(module.titleKey)}
          </h3>

          {/* Category Badge */}
          <div className="mt-1.5 md:mt-2">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium"
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

          {/* Description */}
          <p
            className="body-sm mt-2 md:mt-3"
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
