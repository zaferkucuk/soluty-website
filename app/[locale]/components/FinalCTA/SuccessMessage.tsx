'use client';

import { useTranslations } from 'next-intl';

interface SuccessMessageProps {
  onSendAnother: () => void;
}

export function SuccessMessage({ onSendAnother }: SuccessMessageProps) {
  const t = useTranslations('finalCta');

  return (
    <div
      className="p-6 md:p-8 rounded-xl shadow-md text-center"
      style={{
        backgroundColor: 'var(--color-bg-card)',
      }}
      role="status"
      aria-live="polite"
    >
      {/* Success Icon */}
      <div
        className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: 'var(--color-brand-subtle)',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-brand-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Heading */}
      <h3
        className="text-2xl md:text-3xl mb-3"
        style={{
          fontFamily: 'var(--font-serif)',
          color: 'var(--color-text-primary)',
          fontWeight: 400,
        }}
      >
        {t('success.heading')}
      </h3>

      {/* Message */}
      <p
        className="text-base mb-8 max-w-md mx-auto"
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
        }}
      >
        {t('success.message')}
      </p>

      {/* Send Another Button */}
      <button
        type="button"
        onClick={onSendAnother}
        className="inline-flex items-center justify-center h-12 px-8 rounded-lg font-medium text-base transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          fontFamily: 'var(--font-sans)',
          backgroundColor: 'var(--color-brand-primary)',
          color: 'var(--color-text-inverse)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-brand-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-brand-primary)';
        }}
      >
        {t('success.cta')}
      </button>
    </div>
  );
}

export default SuccessMessage;
