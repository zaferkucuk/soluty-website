'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  bgPrimary: '#FCFCFC',
  brandPrimary: '#4DB6A0',
  divider: '#E5E5E3',
};

const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

// FAQ item keys
const FAQ_ITEMS = ['erpNeeded', 'digitalization', 'standardVsCustom'] as const;

/**
 * HomeFAQ Section
 *
 * Mini-FAQ on the homepage with 3 questions.
 * Accordion behavior: only one question open at a time.
 * Uses native details/summary for accessibility.
 */
export function HomeFAQ() {
  const t = useTranslations('homeFaq');
  const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([]);

  // Handle accordion behavior: close other details when one opens
  useEffect(() => {
    const handleToggle = (index: number) => {
      detailsRefs.current.forEach((details, i) => {
        if (details && i !== index && details.open) {
          details.open = false;
        }
      });
    };

    detailsRefs.current.forEach((details, index) => {
      if (details) {
        const toggleHandler = () => handleToggle(index);
        details.addEventListener('toggle', toggleHandler);
      }
    });

    return () => {
      detailsRefs.current.forEach((details) => {
        if (details) {
          details.removeEventListener('toggle', () => {});
        }
      });
    };
  }, []);

  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: COLORS.bgPrimary }}
      aria-labelledby="home-faq-heading"
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Eyebrow */}
        <p
          className="text-center text-xs font-semibold tracking-widest uppercase mb-4"
          style={{
            color: COLORS.brandPrimary,
            fontFamily: FONTS.sans,
            letterSpacing: '0.1em',
          }}
        >
          {t('eyebrow')}
        </p>

        {/* Headline */}
        <h2
          id="home-faq-heading"
          className="heading-2 text-center"
          style={{
            fontFamily: FONTS.serif,
            color: COLORS.textPrimary,
          }}
        >
          {t('headline')}
        </h2>

        {/* FAQ Accordion */}
        <div className="mt-10">
          {FAQ_ITEMS.map((itemKey, index) => (
            <details
              key={itemKey}
              ref={(el) => { detailsRefs.current[index] = el; }}
              className="group"
              style={{
                borderBottom: index < FAQ_ITEMS.length - 1 ? `1px solid ${COLORS.divider}` : 'none',
              }}
            >
              <summary
                className="flex items-center justify-between w-full py-5 cursor-pointer list-none transition-colors duration-150"
                style={{ fontFamily: FONTS.sans }}
              >
                <span
                  className="text-lg lg:text-[18px] font-medium pr-4 group-hover:text-[#4DB6A0] transition-colors duration-150"
                  style={{
                    color: COLORS.textPrimary,
                    fontSize: '16px',
                  }}
                >
                  {t(`items.${itemKey}.question`)}
                </span>
                {/* Chevron icon */}
                <span
                  className="flex-shrink-0 w-5 h-5 flex items-center justify-center"
                  style={{ color: COLORS.textSecondary }}
                  aria-hidden="true"
                >
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-open:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </summary>
              <div
                className="pb-5"
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: '15px',
                  lineHeight: 1.65,
                  color: COLORS.textSecondary,
                }}
              >
                {t(`items.${itemKey}.answer`)}
              </div>
            </details>
          ))}
        </div>

        {/* Link to full FAQ page */}
        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 font-medium transition-colors duration-150 hover:underline"
            style={{
              fontFamily: FONTS.sans,
              fontSize: '16px',
              color: COLORS.brandPrimary,
            }}
          >
            {t('linkToFaq')}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeFAQ;
