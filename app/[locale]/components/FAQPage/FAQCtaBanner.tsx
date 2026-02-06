import Link from 'next/link';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  textInverse: '#FFFFFF',
  bgBanner: '#F5F5F3',
  brandPrimary: '#1f1f1f',
};

const FONTS = {
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

interface FAQCtaBannerProps {
  headline: string;
  subtext: string;
  buttonText: string;
  buttonHref?: string;
}

/**
 * FAQCtaBanner — End-of-page CTA banner
 *
 * Encourages visitors to contact if they didn't find their answer.
 */
export function FAQCtaBanner({
  headline,
  subtext,
  buttonText,
  buttonHref = '/#contact',
}: FAQCtaBannerProps) {
  return (
    <div
      className="mt-16 p-8 lg:p-12 text-center"
      style={{
        backgroundColor: COLORS.bgBanner,
        borderRadius: '16px',
      }}
    >
      <h3
        className="text-xl font-semibold"
        style={{
          fontFamily: FONTS.sans,
          color: COLORS.textPrimary,
          fontSize: '20px',
        }}
      >
        {headline}
      </h3>
      <p
        className="mt-2"
        style={{
          fontFamily: FONTS.sans,
          fontSize: '16px',
          color: COLORS.textSecondary,
        }}
      >
        {subtext}
      </p>
      <Link
        href={buttonHref}
        className="inline-block mt-6 px-6 py-3 font-medium transition-all duration-150 hover:opacity-90"
        style={{
          fontFamily: FONTS.sans,
          fontSize: '15px',
          backgroundColor: COLORS.brandPrimary,
          color: COLORS.textInverse,
          borderRadius: '9999px',
        }}
      >
        {buttonText}
      </Link>
    </div>
  );
}
