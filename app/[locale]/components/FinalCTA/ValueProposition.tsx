import { useTranslations } from 'next-intl';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  iconStroke: '#5C5A58',
  iconBg: 'rgba(92, 90, 88, 0.08)',
};

const FONTS = {
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
      stroke={COLORS.iconStroke}
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
      stroke={COLORS.iconStroke}
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
      stroke={COLORS.iconStroke}
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
      {/* section-title */}
      <h2
        id="contact-heading"
        className="heading-2"
      >
        {t('heading')}
      </h2>

      {/* section-body */}
      <p className="body-lg">
        {t('subtext')}
      </p>

      {/* card-body items */}
      <ul className="flex flex-col gap-4 mt-2" role="list">
        {benefits.map(({ key, icon: Icon }) => (
          <li key={key} className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: COLORS.iconBg }}
            >
              <Icon />
            </div>
            <span
              style={{
                fontFamily: FONTS.sans,
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.6,
                color: COLORS.textSecondary,
              }}
            >
              {t(`benefits.${key}`)}
            </span>
          </li>
        ))}
      </ul>

      {/* caption */}
      <p
        className="mt-2"
        style={{
          fontFamily: FONTS.sans,
          fontSize: '14px',
          fontWeight: 400,
          color: COLORS.textSecondary,
        }}
      >
        {t('responsePromise')}
      </p>

      {/* Alternative Contact */}
      <div
        className="pt-6 mt-4"
        style={{ borderTop: `1px solid rgba(50, 48, 47, 0.12)` }}
      >
        {/* caption */}
        <p
          className="mb-3"
          style={{
            fontFamily: FONTS.sans,
            fontSize: '14px',
            fontWeight: 400,
            color: COLORS.textSecondary,
          }}
        >
          {t('alternative.or')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* link-inline: 500 + underline */}
          <a
            href={`mailto:${t('alternative.email')}`}
            className="inline-flex items-center gap-2 underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              fontFamily: FONTS.sans,
              fontSize: '14px',
              fontWeight: 500,
              color: COLORS.textSecondary,
            }}
          >
            <svg
              width="16"
              height="16"
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
            className="inline-flex items-center gap-2 underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              fontFamily: FONTS.sans,
              fontSize: '14px',
              fontWeight: 500,
              color: COLORS.textSecondary,
            }}
          >
            <svg
              width="16"
              height="16"
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
