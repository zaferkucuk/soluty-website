'use client';

import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  border: 'rgba(50, 48, 47, 0.12)',
  borderStrong: 'rgba(50, 48, 47, 0.25)',
  bgWhite: '#FFFFFF',
};

const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

export interface ServiceCardProps {
  /** Lucide icon component */
  icon: LucideIcon;
  /** Card headline */
  headline: string;
  /** Card description (2-3 sentences) */
  description: string;
  /** CTA link text */
  ctaText: string;
  /** CTA link href */
  ctaHref?: string;
  /** Optional badge text (e.g., "Kernkompetenz") */
  badge?: string;
  /** Whether this card is highlighted (Custom ERP) */
  isHighlighted?: boolean;
  /** Animation delay in seconds */
  animationDelay?: number;
}

/**
 * ServiceCard Component
 *
 * Typography system mapping:
 * - Badge: caption (14px/400/DM Sans/#5C5A58)
 * - Headline: card-title (24px/500/Crimson Pro/#32302F)
 * - Description: section-body (18px/400/DM Sans/#5C5A58)
 * - CTA: link-inline (inherit size/500/DM Sans/#5C5A58 + underline)
 *
 * Highlighted card: scale(1.05) applied via parent wrapper in ServicesSection.
 */
export function ServiceCard({
  icon: Icon,
  headline,
  description,
  ctaText,
  ctaHref = '#',
  badge,
  isHighlighted = false,
  animationDelay = 0,
}: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: animationDelay,
        ease: 'easeOut',
      }}
      className={`
        relative flex flex-col h-full
        bg-white rounded-xl
        p-6 md:p-7 lg:p-8
        transition-all duration-250 ease-out
        hover:-translate-y-1
        focus-within:outline-2 focus-within:outline-offset-2
        ${isHighlighted 
          ? 'border-2 shadow-md hover:shadow-xl' 
          : 'border shadow-sm hover:shadow-lg'
        }
      `}
      style={{
        borderColor: isHighlighted ? COLORS.borderStrong : COLORS.border,
      }}
      onMouseEnter={(e) => {
        if (!isHighlighted) {
          e.currentTarget.style.borderColor = COLORS.borderStrong;
        }
      }}
      onMouseLeave={(e) => {
        if (!isHighlighted) {
          e.currentTarget.style.borderColor = COLORS.border;
        }
      }}
    >
      {/* Badge — caption style: 14px/400/#5C5A58 */}
      {badge && (
        <span
          className="absolute top-4 right-4 px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: 'rgba(92, 90, 88, 0.08)',
            color: COLORS.textSecondary,
            fontFamily: FONTS.sans,
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          {badge}
        </span>
      )}

      {/* Icon */}
      <div
        className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-xl mb-5 md:mb-6"
        style={{
          backgroundColor: 'rgba(92, 90, 88, 0.06)',
        }}
      >
        <Icon
          className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
          style={{ color: COLORS.textSecondary }}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      {/* card-title: 24px/500/Crimson Pro/#32302F */}
      <h3
        className="mb-3 md:mb-4"
        style={{
          fontFamily: FONTS.serif,
          fontWeight: 500,
          color: COLORS.textPrimary,
          lineHeight: 1.3,
          fontSize: '24px',
        }}
      >
        {headline}
      </h3>

      {/* section-body: 18px/400/DM Sans/#5C5A58 */}
      <p
        className="flex-grow mb-5 md:mb-6"
        style={{
          fontFamily: FONTS.sans,
          color: COLORS.textSecondary,
          lineHeight: 1.65,
          fontSize: '18px',
          fontWeight: 400,
        }}
      >
        {description}
      </p>

      {/* link-inline: 500 + underline + #5C5A58 */}
      <a
        href={ctaHref}
        className="group inline-flex items-center gap-1.5 underline hover:no-underline transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
        style={{
          color: COLORS.textSecondary,
          fontFamily: FONTS.sans,
          fontSize: '16px',
          fontWeight: 500,
        }}
      >
        {ctaText}
        <ArrowRight
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>
    </motion.article>
  );
}
