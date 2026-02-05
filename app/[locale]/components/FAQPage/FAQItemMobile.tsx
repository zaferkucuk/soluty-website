// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  divider: '#E5E5E3',
};

const FONTS = {
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

interface FAQItemMobileProps {
  question: string;
  answerCapsule: string;
  answerExtended?: string;
  isLast?: boolean;
}

/**
 * FAQItemMobile — Mobile version with accordion
 *
 * Uses native details/summary for accessibility.
 * Multiple questions can be open simultaneously.
 */
export function FAQItemMobile({
  question,
  answerCapsule,
  answerExtended,
  isLast = false,
}: FAQItemMobileProps) {
  return (
    <details
      className="group"
      style={{
        borderBottom: isLast ? 'none' : `1px solid ${COLORS.divider}`,
      }}
    >
      <summary
        className="flex items-center justify-between w-full py-5 cursor-pointer list-none"
        style={{ fontFamily: FONTS.sans }}
      >
        <span
          className="text-base font-medium pr-4 group-hover:text-[#4DB6A0] transition-colors duration-150"
          style={{
            color: COLORS.textPrimary,
            fontSize: '16px',
          }}
        >
          {question}
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
      <div className="pb-5">
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
