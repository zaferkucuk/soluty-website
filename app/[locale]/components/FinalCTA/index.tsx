import { useTranslations } from 'next-intl';
import { ValueProposition } from './ValueProposition';
import { ContactForm } from './ContactForm';

// Design tokens
const COLORS = {
  bgSection: '#FCFCFC',
};

/**
 * Final CTA Section
 *
 * Two-column layout on desktop: Value proposition left, contact form right.
 * Stacked on tablet/mobile.
 */
export function FinalCTASection() {
  const t = useTranslations('finalCta');

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: COLORS.bgSection }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Desktop: Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Value Proposition */}
          <ValueProposition />

          {/* Right: Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default FinalCTASection;
