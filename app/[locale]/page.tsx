import { useTranslations } from "next-intl";
import { HeroEmailForm } from "./components/HeroEmailForm";
import { HeroVideo } from "./components/HeroVideo";
import { ServicesSection } from "./components/ServicesSection";
import { ERPFeaturesSection } from "./components/ERPFeaturesSection";

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  bgPrimary: '#FCFCFC',
  brandPrimary: '#4DB6A0',
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
        <div className="mx-auto max-w-7xl px-6 pt-4 pb-16 lg:pt-6 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 lg:gap-4 items-center">
            
            {/* Left: Text Content */}
            <div className="flex flex-col">
              <h1 
                className="heading-1"
                style={{
                  fontFamily: FONTS.serif,
                  color: COLORS.textPrimary,
                }}
              >
                <span className="block">{t("headline.line1")}</span>
                <span className="block">{t("headline.line2")}</span>
                <span className="block">{t("headline.line3")}</span>
              </h1>
              
              <p 
                className="body-lg mt-6 max-w-md"
                style={{ 
                  fontFamily: FONTS.sans,
                  color: COLORS.textSecondary,
                  fontSize: '18px',
                  lineHeight: 1.6,
                }}
              >
                {t("subheadline")}
              </p>

              <div className="mt-8">
                <HeroEmailForm />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke={COLORS.brandPrimary} 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span 
                  className="text-sm font-medium"
                  style={{ 
                    fontFamily: FONTS.sans,
                    color: COLORS.brandPrimary,
                  }}
                >
                  {t("trust.gdprCompliant")}
                </span>
              </div>
            </div>

            {/* Right: Video */}
            <div className="order-first lg:order-last">
              <div className="lg:w-[calc(100%+24vw)]" style={{ maxWidth: '1300px' }}>
                <HeroVideo videoSrc="/videos/hero.webm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* ERP Features Section */}
      <ERPFeaturesSection />
    </div>
  );
}
