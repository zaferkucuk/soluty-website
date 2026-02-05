'use client';

import { useRef, useEffect } from 'react';
import { FAQItem } from './FAQItem';

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
 * FAQCategory — Category wrapper with exclusive accordion
 *
 * All breakpoints use accordion behavior.
 * Only one question open at a time within a category.
 * All questions closed on initial load.
 */
export function FAQCategory({ id, title, questions }: FAQCategoryProps) {
  const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([]);

  useEffect(() => {
    const handlers: Array<() => void> = [];

    detailsRefs.current.forEach((details, index) => {
      if (!details) return;

      const handler = () => {
        if (details.open) {
          detailsRefs.current.forEach((other, i) => {
            if (other && i !== index && other.open) {
              other.open = false;
            }
          });
        }
      };

      details.addEventListener('toggle', handler);
      handlers.push(() => details.removeEventListener('toggle', handler));
    });

    return () => {
      handlers.forEach((cleanup) => cleanup());
    };
  }, [questions]);

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

      <div className="mt-6">
        {questions.map((q, index) => (
          <FAQItem
            key={q.id}
            ref={(el) => { detailsRefs.current[index] = el; }}
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
