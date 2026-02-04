import { useTranslations } from 'next-intl';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  textMuted: '#8A8785',
  brandPrimary: '#4DB6A0',
  brandSubtle: 'rgba(77, 182, 160, 0.1)',
};

const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

// Benefit icons as inline SVG components
function CheckCircleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={COLORS.brandPrimary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={COLORS.brandPrimary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={COLORS.brandPrimary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function ValueProposition() {
  const t = useTranslations('finalCta');

  const benefits = [
    { key: 'free', icon: CheckCircleIcon },
    { key: 'duration', icon: ClockIcon },
    { key: 'analysis', icon: TargetIcon },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Eyebrow */}
      <p
        className="text-xs md:text-sm font-semibold tracking-widest uppercase"
        style={{
          color: COLORS.brandPrimary,
          fontFamily: FONTS.sans,
          letterSpacing: '0.1em',
        }}
      >
        {t('eyebrow')}
      </p>

      {/* Heading */}
      <h2
        id="contact-heading"
        className="text-3xl md:text-4xl lg:text-[42px] leading-tight"
        style={{
          fontFamily: FONTS.serif,
          color: COLORS.textPrimary,
          fontWeight: 400,
        }}
      >
        {t('heading')}
      </h2>

      {/* Subtext */}
      <p
        className="text-lg"
        style={{
          fontFamily: FONTS.sans,
          color: COLORS.textSecondary,
          lineHeight: 1.65,
        }}
      >
        {t('subtext')}
      </p>

      {/* Benefits List */}
      <ul className="flex flex-col gap-4 mt-2" role="list">
        {benefits.map(({ key, icon: Icon }) => (
          <li key={key} className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: COLORS.brandSubtle }}
            >
              <Icon />
            </div>
            <span
              className="text-base"
              style={{
                fontFamily: FONTS.sans,
                color: COLORS.textPrimary,
              }}
            >
              {t(`benefits.${key}`)}
            </span>
          </li>
        ))}
      </ul>

      {/* Response Promise */}
      <p
        className="text-sm mt-2"
        style={{
          fontFamily: FONTS.sans,
          color: COLORS.textMuted,
        }}
      >
        {t('responsePromise')}
      </p>

      {/* Alternative Contact */}
      <div
        className="pt-6 mt-4"
        style={{ borderTop: `1px solid rgba(50, 48, 47, 0.12)` }}
      >
        <p
          className="text-sm mb-3"
          style={{
            fontFamily: FONTS.sans,
            color: COLORS.textMuted,
          }}
        >
          {t('alternative.or')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={`mailto:${t('alternative.email')}`}
            className="inline-flex items-center gap-2 text-base hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.brandPrimary,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {t('alternative.email')}
          </a>
          <a
            href={`tel:${t('alternative.phone').replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 text-base hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.brandPrimary,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {t('alternative.phone')}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ValueProposition;
