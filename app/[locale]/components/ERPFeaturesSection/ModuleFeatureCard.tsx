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
 * Layout (both mobile & desktop):
 *   Row 1: [Icon] [Title] ............... [Category Badge]
 *   Row 2: [Description]
 *
 * Badge color behavior:
 *   - Inactive/default: standard text color, neutral background
 *   - Active/hovered: category color with tinted background
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
          /* Padding */
          'p-6 md:p-5'
        }
        style={{
          transitionDelay: isVisible ? `${entryDelay}ms` : '0ms',
        }}
        tabIndex={0}
      >
        {/* Row 1: Icon + Title + Category Badge */}
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10">
            <Icon
              className="w-full h-full"
              strokeWidth={1.5}
              style={{
                color: isActive ? colors.color : 'var(--color-text-secondary)',
                transition: 'color 250ms ease',
              }}
            />
          </div>

          {/* Title */}
          <h3
            className="heading-4 !text-lg md:!text-[22px] !leading-tight flex-1 min-w-0"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {t(module.titleKey)}
          </h3>

          {/* Category Badge — right-aligned */}
          <span
            className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors duration-250 ease-out"
            style={{
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.02em',
              backgroundColor: isActive ? colors.bg : 'var(--color-bg-tertiary, rgba(0,0,0,0.04))',
              color: isActive ? colors.color : 'var(--color-text-secondary)',
            }}
          >
            {t(module.categoryKey)}
          </span>
        </div>

        {/* Row 2: Description */}
        <p
          className="body-sm mt-3 md:mt-3"
          style={{
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
          }}
        >
          {t(module.descriptionKey)}
        </p>
      </article>
    );
  }
);
