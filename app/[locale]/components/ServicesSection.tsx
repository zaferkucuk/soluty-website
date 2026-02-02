'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Code2, Database, Brain } from 'lucide-react';
import { ServiceCard } from './ServiceCard';

// ─── Video Config ────────────────────────────────────────
// Adjust playbackRate to change video speed:
//   1.0 = normal | 0.8 = 80% (slower) | 0.6 = 60% | 0.5 = half speed
const VIDEO_CONFIG = {
  playbackRate: 1.0,
};

// Design tokens
const COLORS = {
  textInverse: '#FFFFFF',
  textInverseSecondary: 'rgba(255, 255, 255, 0.75)',
  brandPrimary: '#4DB6A0',
  bgSection: '#0F2A39',
  bgInnerCard: 'rgba(255, 255, 255, 0.1)',
  borderInnerCard: 'rgba(255, 255, 255, 0.3)',
};

const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

/**
 * Services Section
 * 
 * Layout: Dark section → inner card (slightly lighter) → service cards
 * Inspired by Epicor's layered card approach.
 * 
 * TEST implementation — video will be replaced with a custom solution.
 */
export function ServicesSection() {
  const t = useTranslations('services');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Apply playback speed
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
          style={{ opacity: 0.65 }}
        >
          <source src="/videos/epicor-bg-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Gradient Overlay (Epicor-style: transparent → bgSection at 70%) ── */}
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
      <div className="relative z-[2] max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
        {/* Eyebrow — outside the inner card */}
        <p
          className="text-xs md:text-sm font-semibold tracking-widest uppercase mb-6 md:mb-8 text-center"
          style={{
            color: COLORS.brandPrimary,
            fontFamily: FONTS.sans,
            letterSpacing: '0.1em',
          }}
        >
          {t('eyebrow')}
        </p>

        {/* ── Inner Card (Epicor-style raised container) ── */}
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
          {/* Section Header — inside the card */}
          <header className="text-center mb-8 md:mb-10 lg:mb-12">
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

          {/* Cards Grid */}
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
                style={service.isHighlighted ? {
                  transform: 'scale(1.05)',
                  zIndex: 2,
                  position: 'relative' as const,
                } : undefined}
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
