'use client';

import { useTranslations } from 'next-intl';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  textInverse: '#FFFFFF',
  brandPrimary: '#4DB6A0',
  brandHover: '#3DA08C',
  brandSubtle: 'rgba(77, 182, 160, 0.1)',
  bgCard: '#FFFFFF',
};

const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

interface SuccessMessageProps {
  onSendAnother: () => void;
}

export function SuccessMessage({ onSendAnother }: SuccessMessageProps) {
  const t = useTranslations('finalCta');

  return (
    <div
      className="p-6 md:p-8 rounded-xl shadow-md text-center"
      style={{
        backgroundColor: COLORS.bgCard,
      }}
      role="status"
      aria-live="polite"
    >
      {/* Success Icon */}
      <div
        className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: COLORS.brandSubtle,
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke={COLORS.brandPrimary}
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
          fontFamily: FONTS.serif,
          color: COLORS.textPrimary,
          fontWeight: 400,
        }}
      >
        {t('success.heading')}
      </h3>

      {/* Message */}
      <p
        className="text-base mb-8 max-w-md mx-auto"
        style={{
          fontFamily: FONTS.sans,
          color: COLORS.textSecondary,
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
          fontFamily: FONTS.sans,
          backgroundColor: COLORS.brandPrimary,
          color: COLORS.textInverse,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.brandHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.brandPrimary;
        }}
      >
        {t('success.cta')}
      </button>
    </div>
  );
}

export default SuccessMessage;
