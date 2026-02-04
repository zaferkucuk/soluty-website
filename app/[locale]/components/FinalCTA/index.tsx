import { useTranslations } from 'next-intl';
import { ValueProposition } from './ValueProposition';
import { ContactForm } from './ContactForm';

// Design tokens
const COLORS = {
  bgSection: '#F7F6F5',
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
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
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
