'use client';

import { useTranslations } from 'next-intl';
import type { ERPFeaturesHeaderProps } from './types';

/**
 * Section header for ERP Features: eyebrow + headline + subheadline.
 * Entry animation: fade-in + slide-up when visible.
 */
export function ERPFeaturesHeader({ isVisible }: ERPFeaturesHeaderProps) {
  const t = useTranslations();

  return (
    <div
      className={
        'text-center mx-auto mb-8 md:mb-12 lg:mb-16 ' +
        'transition-all duration-600 ease-out ' +
        (isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6')
      }
      style={{ maxWidth: 720 }}
    >
      {/* Eyebrow — 14px to match Services */}
      <p
        className="mb-4"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-text-secondary)',
        }}
      >
        {t('erpFeatures.eyebrow')}
      </p>

      {/* Headline */}
      <h2
        id="erp-features-heading"
        className="heading-2"
      >
        {t('erpFeatures.headline')}
      </h2>

      {/* Subheadline */}
      <p
        className="body-lg mt-4 mx-auto"
        style={{ maxWidth: 640 }}
      >
        {t('erpFeatures.subheadline')}
      </p>
    </div>
  );
}
