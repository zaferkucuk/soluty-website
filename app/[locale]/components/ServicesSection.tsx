'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Code2, Database, Brain } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

// ─── Video Config ────────────────────────────────────────────────
const VIDEO_CONFIG = {
  playbackRate: 1.0,
  opacity: 0.5,
};

// Design tokens
const COLORS = {
  textInverse: '#FFFFFF',
  textInverseSecondary: 'rgba(255, 255, 255, 0.75)',
  bgSection: '#0F2A39',
  bgInnerCard: 'rgba(255, 255, 255, 0.1)',
  borderInnerCard: 'rgba(255, 255, 255, 0.3)',
};

const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

/**
 * ServicesSection
 *
 * Typography system mapping:
 * - Eyebrow: eyebrow (14px/600/DM Sans + uppercase + tracking) — inverse color
 * - Headline: section-title (52px/400/Crimson Pro) via .heading-2 — inverse color
 * - Subheadline: section-body (18px/400/DM Sans) via .body-lg — inverse color
 * - Cards use ServiceCard component with own typography
 *
 * Note: Highlighted card uses border/shadow differentiation only.
 * scale() was removed because it distorts typography (24px → 25.2px).
 */
export function ServicesSection() {
  const t = useTranslations('services');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = VIDEO_CONFIG.playbackRate;
    }
  }, []);

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
      mobileOrder: 1,
    },
    {
      id: 'aiSolutions',
      icon: Brain,
      isHighlighted: false,
      desktopOrder: 3,
      mobileOrder: 3,
    },
  ];

  const sortedServices = [...services].sort((a, b) => a.mobileOrder - b.mobileOrder);

  return (
    <section
      id="services"
      className="relative overflow-hidden py-12 md:py-16 lg:py-24"
      style={{ backgroundColor: COLORS.bgSection }}
      aria-labelledby="services-heading"
    >
      {/* ── Video Background Layer ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover"
          style={{ opacity: VIDEO_CONFIG.opacity }}
        >
          <source src="/videos/epicor-bg-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Gradient Overlay ── */}
      <div
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background: `
            linear-gradient(180deg, ${COLORS.bgSection} 0%, transparent 15%),
            linear-gradient(0deg, ${COLORS.bgSection} 0%, transparent 15%),
            linear-gradient(180deg, rgba(15,42,57,0) 0%, rgba(15,42,57,0.7) 70%)
          `,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-[2] max-w-[1200px] mx-auto px-6 md:px-10">
        {/* eyebrow: 14px/600 + uppercase + tracking — inverse */}
        <p
          className="font-semibold tracking-widest uppercase mb-6 md:mb-8 text-center"
          style={{
            color: COLORS.textInverseSecondary,
            fontFamily: FONTS.sans,
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.1em',
          }}
        >
          {t('eyebrow')}
        </p>

        {/* ── Inner Card ── */}
        <div
          className="p-6 md:p-10 lg:p-14"
          style={{
            backgroundColor: COLORS.bgInnerCard,
            borderTop: `1px solid ${COLORS.borderInnerCard}`,
            borderRadius: '40px',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          {/* Section Header */}
          <header className="text-center mb-8 md:mb-10 lg:mb-12">
            {/* section-title — inverse */}
            <h2
              id="services-heading"
              className="heading-2 mb-4 md:mb-5"
              style={{
                fontFamily: FONTS.serif,
                color: COLORS.textInverse,
              }}
            >
              {t('headline')}
            </h2>

            {/* section-body — inverse */}
            <p
              className="body-lg max-w-2xl mx-auto"
              style={{
                fontFamily: FONTS.sans,
                color: COLORS.textInverseSecondary,
              }}
            >
              {t('subheadline')}
            </p>
          </header>

          {/* Cards Grid — no scale() on highlighted card to preserve typography consistency */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 md:items-center">
            {sortedServices.map((service) => (
              <div
                key={service.id}
                className={`
                  ${service.mobileOrder === 1 ? 'order-first' : ''}
                  ${service.isHighlighted ? 'md:order-2' : ''}
                  ${service.desktopOrder === 1 ? 'md:order-1' : ''}
                  ${service.desktopOrder === 3 ? 'md:order-3' : ''}
                `}
              >
                <ServiceCard
                  icon={service.icon}
                  headline={t(`cards.${service.id}.headline`)}
                  description={t(`cards.${service.id}.description`)}
                  ctaText={t(`cards.${service.id}.cta`)}
                  ctaHref={`#${service.id}`}
                  badge={service.isHighlighted ? t(`cards.${service.id}.badge`) : undefined}
                  isHighlighted={service.isHighlighted}
                  animationDelay={service.isHighlighted ? 0 : (service.desktopOrder === 1 ? 0.1 : 0.2)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
