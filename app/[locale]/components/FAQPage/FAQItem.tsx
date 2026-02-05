// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
};

const FONTS = {
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

interface FAQItemProps {
  question: string;
  answerCapsule: string;
  answerExtended?: string;
}

/**
 * FAQItem — Desktop version
 *
 * Question and answer displayed together, always visible (no accordion).
 * Used on desktop where all answers are shown.
 */
export function FAQItem({ question, answerCapsule, answerExtended }: FAQItemProps) {
  return (
    <article className="mt-10 first:mt-0">
      <h3
        className="text-lg font-medium"
        style={{
          fontFamily: FONTS.sans,
          color: COLORS.textPrimary,
          fontSize: '18px',
        }}
      >
        {question}
      </h3>
      <p
        className="mt-3"
        style={{
          fontFamily: FONTS.sans,
          fontSize: '16px',
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
            fontSize: '16px',
            lineHeight: 1.65,
            color: COLORS.textSecondary,
          }}
        >
          {answerExtended}
        </p>
      )}
    </article>
  );
}
