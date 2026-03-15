import { useTranslations, useLocale } from "next-intl";
import { HeroEmailForm } from "./components/HeroEmailForm";
import { HeroVideo } from "./components/HeroVideo";
import { ServicesSection } from "./components/ServicesSection";
import { ERPFeaturesSection } from "./components/ERPFeaturesSection";
import { HomeFAQ } from "./components/HomeFAQ";
import { FinalCTASection } from "./components/FinalCTA";
import { SectionDivider } from "./components/ui/SectionDivider";

const BASE_URL = 'https://soluty.io';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  bgPrimary: '#FCFCFC',
}

// Font constants for inline styles (Tailwind v4 CSS variable workaround)
const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
}

export default function HomePage() {
  const t = useTranslations("hero");
  const tMeta = useTranslations("metadata");
  const tServices = useTranslations("services");
  const locale = useLocale();

  // WebPage JSON-LD
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: tMeta('title'),
    description: tMeta('description'),
    url: `${BASE_URL}/${locale}`,
    isPartOf: { '@id': `${BASE_URL}/#website` },
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bgPrimary }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema).replace(/</g, '\\u003c'),
        }}
      />

      {/* Hero Section
          Single <HeroVideo> instance — rendered once, positioned via CSS.
          Mobile: stacked (video edge-to-edge on top, text below with padding)
          Desktop: two-column (text left, video absolute right)
          Previously two separate layouts caused hero.webm to load twice. */}
      <section style={{ overflowX: 'clip' }}>

        {/* Mobile layout — visible below lg */}
        <div
          className="lg:hidden flex flex-col"
          style={{ minHeight: 'calc(100vh - 80px)' }}
        >
          <div className="flex-1 flex flex-col justify-center">
            {/* Video — edge-to-edge, no horizontal padding */}
            <div className="w-full mb-4 pt-2">
              <HeroVideo videoSrc="/videos/hero.webm" />
            </div>
            {/* Text content — with horizontal padding */}
            <div className="px-6">
              <HeroTextContent t={t} colors={COLORS} fonts={FONTS} />
            </div>
          </div>
          <div className="py-3 shrink-0 px-6">
            <p
              className="font-semibold tracking-widest uppercase text-center"
              style={{
                fontFamily: FONTS.sans,
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: COLORS.textPrimary,
              }}
            >
              {tServices('eyebrow')}
            </p>
          </div>
        </div>

        {/* Desktop layout — visible from lg */}
        <div
          className="hidden lg:flex lg:flex-col relative"
          style={{ minHeight: 'calc(100vh - 88px)' }}
        >
          <div className="flex-1 flex items-center relative">
            <div className="relative z-10 max-w-[1200px] 2xl:max-w-[1400px] mx-auto px-6 md:px-10 w-full">
              <div className="max-w-[520px]">
                <HeroTextContent t={t} colors={COLORS} fonts={FONTS} />
              </div>
            </div>

            {/* Video — absolute, right-aligned. Single HeroVideo instance for desktop. */}
            <div
              className="absolute top-0 right-0 h-full flex items-center"
              style={{ width: '62%' }}
            >
              <div style={{ width: '168%', marginRight: '-24%' }}>
                <HeroVideo videoSrc="/videos/hero.webm" />
              </div>
            </div>
          </div>

          <div className="py-4 shrink-0 relative z-10">
            <p
              className="font-semibold tracking-widest uppercase text-center"
              style={{
                fontFamily: FONTS.sans,
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: COLORS.textPrimary,
              }}
            >
              {tServices('eyebrow')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Divider: Services → ERP Features */}
      <SectionDivider />

      {/* ERP Features Section */}
      <ERPFeaturesSection />

      {/* Divider: ERP Features → FAQ */}
      <SectionDivider />

      {/* Home FAQ Section */}
      <HomeFAQ />

      {/* Divider: FAQ → Final CTA */}
      <SectionDivider />

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Divider: Final CTA → Footer */}
      <SectionDivider />
    </div>
  );
}

/** Shared text content to avoid duplication between mobile and desktop */
function HeroTextContent({ 
  t, 
  colors, 
  fonts 
}: { 
  t: ReturnType<typeof useTranslations<'hero'>>; 
  colors: typeof COLORS; 
  fonts: typeof FONTS;
}) {
  return (
    <>
      <h1
        style={{
          fontFamily: fonts.serif,
          color: colors.textPrimary,
          fontSize: 'clamp(2.5rem, 2.26vw + 2.06rem, 4rem)',
          fontWeight: 400,
          lineHeight: 1.16,
          letterSpacing: '0.01em',
        }}
      >
        <span className="block">{t("headline.line1")}</span>
        <span className="block">{t("headline.line2")}</span>
      </h1>

      <p
        className="mt-6 max-w-md"
        style={{
          fontFamily: fonts.sans,
          color: colors.textSecondary,
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: 1.65,
        }}
      >
        {t("subheadline")}
      </p>

      <p
        className="mt-2 max-w-md"
        style={{
          fontFamily: fonts.sans,
          color: colors.textSecondary,
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: 1.65,
        }}
      >
        {t("tagline")}
      </p>

      <div className="mt-8">
        <HeroEmailForm />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke={colors.textSecondary}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span
          className="text-sm font-medium"
          style={{
            fontFamily: fonts.sans,
            color: colors.textSecondary,
          }}
        >
          {t("trust.gdprCompliant")}
        </span>
      </div>
    </>
  );
}
