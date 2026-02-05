import { forwardRef } from 'react';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  divider: '#E5E5E3',
};

const FONTS = {
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

interface FAQItemProps {
  question: string;
  answerCapsule: string;
  answerExtended?: string;
  isLast?: boolean;
}

/**
 * FAQItem — Accordion item for FAQ page
 *
 * Uses native details/summary for accessibility.
 * Shows 2-line preview of answerCapsule when closed.
 * Full answer visible when opened.
 * forwardRef allows parent to manage exclusive accordion behavior.
 */
export const FAQItem = forwardRef<HTMLDetailsElement, FAQItemProps>(
  function FAQItem({ question, answerCapsule, answerExtended, isLast = false }, ref) {
    return (
      <details
        ref={ref}
        className="group"
        style={{
          borderBottom: isLast ? 'none' : `1px solid ${COLORS.divider}`,
        }}
      >
        <summary
          className="flex items-start justify-between w-full py-5 cursor-pointer list-none"
          style={{ fontFamily: FONTS.sans }}
        >
          <div className="flex-1 pr-4">
            {/* Question */}
            <span
              className="block text-base lg:text-lg font-medium group-hover:text-[#4DB6A0] transition-colors duration-150"
              style={{
                color: COLORS.textPrimary,
                fontSize: '16px',
              }}
            >
              {question}
            </span>
            {/* 2-line preview — visible when closed, hidden when open */}
            <span
              className="block mt-2 line-clamp-2 group-open:hidden"
              style={{
                fontFamily: FONTS.sans,
                fontSize: '15px',
                lineHeight: 1.65,
                color: COLORS.textSecondary,
              }}
            >
              {answerCapsule}
            </span>
          </div>
          {/* Chevron icon */}
          <span
            className="flex-shrink-0 w-5 h-5 mt-1 flex items-center justify-center"
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
        {/* Full answer — visible when open */}
        <div className="pb-5 pr-9">
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: '15px',
              lineHeight: 1.65,
              color: COLORS.textSecondary,
            }}
          >
            {answerCapsule}
          </p>
          {answerExtended && (
            <p
              className="mt-3"
              style={{
                fontFamily: FONTS.sans,
                fontSize: '15px',
                lineHeight: 1.65,
                color: COLORS.textSecondary,
              }}
            >
              {answerExtended}
            </p>
          )}
        </div>
      </details>
    );
  }
);
