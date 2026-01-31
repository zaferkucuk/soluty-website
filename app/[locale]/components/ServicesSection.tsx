'use client';

import { useTranslations } from 'next-intl';
import { Code2, Database, Brain } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  brandPrimary: '#4DB6A0',
  bgSecondary: '#F7F6F5',
};

const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

/**
 * Services Section
 * 
 * Displays 3 service cards in a grid layout:
 * - Desktop: 3 columns (Custom Projects | Custom ERP | AI Solutions)
 * - Mobile: 1 column (Custom ERP first for hierarchy)
 * 
 * Custom ERP is visually highlighted with accent border.
 */
export function ServicesSection() {
  const t = useTranslations('services');

  // Service card data - order matters for mobile (ERP first)
  const services = [
    {
      id: 'customProjects',
      icon: Code2,
      isHighlighted: false,
      desktopOrder: 1,
      mobileOrder: 2,
    },
    {
      id: 'customERP',
      icon: Database,
      isHighlighted: true,
      desktopOrder: 2,
      mobileOrder: 1, // First on mobile
    },
    {
      id: 'aiSolutions',
      icon: Brain,
      isHighlighted: false,
      desktopOrder: 3,
      mobileOrder: 3,
    },
  ];

  // Sort for mobile (ERP first) - CSS handles desktop order
  const sortedServices = [...services].sort((a, b) => a.mobileOrder - b.mobileOrder);

  return (
    <section
      id="services"
      className="py-12 md:py-16 lg:py-24"
      style={{ backgroundColor: COLORS.bgSecondary }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
        {/* Section Header */}
        <header className="text-center mb-10 md:mb-12 lg:mb-16">
          {/* Eyebrow */}
          <p
            className="text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4"
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
            id="services-heading"
            className="heading-2 mb-4 md:mb-5"
            style={{
              fontFamily: FONTS.serif,
              color: COLORS.textPrimary,
            }}
          >
            {t('headline')}
          </h2>

          {/* Subheadline */}
          <p
            className="body-lg max-w-2xl mx-auto"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textSecondary,
            }}
          >
            {t('subheadline')}
          </p>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {sortedServices.map((service, index) => (
            <div
              key={service.id}
              className={`
                ${service.mobileOrder === 1 ? 'order-first' : ''}
                md:order-none
              `}
              style={{
                // Desktop order via CSS custom property
                '--desktop-order': service.desktopOrder,
              } as React.CSSProperties}
            >
              <ServiceCard
                icon={service.icon}
                headline={t(`cards.${service.id}.headline`)}
                description={t(`cards.${service.id}.description`)}
                ctaText={t(`cards.${service.id}.cta`)}
                ctaHref={`#${service.id}`}
                badge={service.isHighlighted ? t(`cards.${service.id}.badge`) : undefined}
                isHighlighted={service.isHighlighted}
                animationDelay={index * 0.1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
