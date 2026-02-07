import { useTranslations } from "next-intl";
import { HeroEmailForm } from "./components/HeroEmailForm";
import { HeroVideo } from "./components/HeroVideo";
import { ServicesSection } from "./components/ServicesSection";
import { ERPFeaturesSection } from "./components/ERPFeaturesSection";
import { HomeFAQ } from "./components/HomeFAQ";
import { FinalCTASection } from "./components/FinalCTA";
import { SectionDivider } from "./components/ui/SectionDivider";

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bgPrimary }}>
      {/* Hero Section */}
      <section style={{ overflowX: 'clip' }}>
        {/* Mobile: stacked layout */}
        <div className="lg:hidden px-6 pt-4 pb-12">
          <div className="max-w-md mx-auto mb-8">
            <HeroVideo videoSrc="/videos/hero.webm" />
          </div>
          <HeroTextContent t={t} colors={COLORS} fonts={FONTS} />
        </div>

        {/* Desktop: text left + absolute video right
            Container matches Header: max-w-[1400px] mx-auto px-6 md:px-10 */}
        <div className="hidden lg:block relative" style={{ minHeight: '540px' }}>
          {/* Text — aligned with header container */}
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-10">
            <div style={{ minHeight: '480px', display: 'flex', alignItems: 'center' }}>
              <div className="max-w-[520px]">
                <HeroTextContent t={t} colors={COLORS} fonts={FONTS} />
              </div>
            </div>
          </div>

          {/* Video — absolute positioned, right-aligned, free from container */}
          <div
            className="absolute top-0 right-0 h-full flex items-center"
            style={{ width: '58%' }}
          >
            <div style={{ width: '120%', marginRight: '-10%' }}>
              <HeroVideo videoSrc="/videos/hero.webm" />
            </div>
          </div>
        </div>
      </section>

      {/* Divider: Hero → Services */}
      <SectionDivider />

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
        className="heading-1"
        style={{
          fontFamily: fonts.serif,
          color: colors.textPrimary,
        }}
      >
        <span className="block">{t("headline.line1")}</span>
        <span className="block">{t("headline.line2")}</span>
        <span className="block">{t("headline.line3")}</span>
        <span className="block">{t("headline.line4")}</span>
      </h1>

      <p
        className="body-lg mt-6 max-w-md"
        style={{
          fontFamily: fonts.sans,
          color: colors.textSecondary,
          fontSize: '18px',
          lineHeight: 1.6,
        }}
      >
        {t("subheadline")}
      </p>

      <p
        className="body-lg mt-2 max-w-md"
        style={{
          fontFamily: fonts.sans,
          color: colors.textSecondary,
          fontSize: '18px',
          lineHeight: 1.6,
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
