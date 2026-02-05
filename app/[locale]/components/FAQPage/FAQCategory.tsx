import { FAQItem } from './FAQItem';
import { FAQItemMobile } from './FAQItemMobile';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
};

const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
};

interface Question {
  id: string;
  question: string;
  answerCapsule: string;
  answerExtended: string;
}

interface FAQCategoryProps {
  id: string;
  title: string;
  questions: Question[];
}

/**
 * FAQCategory — Category wrapper
 *
 * Desktop: Shows all answers expanded
 * Mobile: Shows accordion items
 */
export function FAQCategory({ id, title, questions }: FAQCategoryProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mt-16 first:mt-0">
      <h2
        id={`${id}-heading`}
        className="text-2xl lg:text-[28px]"
        style={{
          fontFamily: FONTS.serif,
          color: COLORS.textPrimary,
          fontWeight: 400,
        }}
      >
        {title}
      </h2>

      {/* Desktop: All answers visible */}
      <div className="hidden lg:block mt-8">
        {questions.map((q) => (
          <FAQItem
            key={q.id}
            question={q.question}
            answerCapsule={q.answerCapsule}
            answerExtended={q.answerExtended}
          />
        ))}
      </div>

      {/* Mobile: Accordion */}
      <div className="lg:hidden mt-6">
        {questions.map((q, index) => (
          <FAQItemMobile
            key={q.id}
            question={q.question}
            answerCapsule={q.answerCapsule}
            answerExtended={q.answerExtended}
            isLast={index === questions.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
