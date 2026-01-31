import { useTranslations } from "next-intl";
import { ModuleGrid } from "./components/ModuleGrid";
import { HeroEmailForm } from "./components/HeroEmailForm";
import { HeroVideo } from "./components/HeroVideo";
import { ServicesSection } from "./components/ServicesSection";

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
        {/* Container aligned with Header: max-w-[1280px] mx-auto px-4 md:px-6 */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-4 pb-12 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 items-start">
            
            {/* Left: Text Content - aligned with header logo */}
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

            {/* Right: Video - overflows right edge of viewport */}
            <div className="order-first lg:order-last lg:relative">
              {/* Video extends beyond container to viewport edge */}
              <div 
                className="lg:absolute lg:left-0 lg:top-0"
                style={{ 
                  width: 'calc(50vw - 24px)',
                  maxWidth: '800px'
                }}
              >
                <HeroVideo videoSrc="/videos/hero.webm" />
              </div>
            </div>
          </div>
        </div>

        {/* Temporary Comparison Section */}
        <div className="mx-auto max-w-7xl px-6">
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h2 className="heading-3 mb-8 text-center">Hero Visual Comparison</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Option A: ModuleGrid
                  <span className="block text-sm font-normal text-slate-500">
                    (Stripe-inspired, current)
                  </span>
                </h3>
                <div className="flex justify-center">
                  <ModuleGrid />
                </div>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Option B: HeroVideo
                  <span className="block text-sm font-normal text-slate-500">
                    (Wealthsimple-style, with video)
                  </span>
                </h3>
                <div className="flex justify-center">
                  <HeroVideo videoSrc="/videos/hero.webm" />
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-teal-50 rounded-xl border border-teal-200">
              <h4 className="font-semibold mb-2 text-teal-800">🤔 Hangi yaklaşımı tercih ediyorsun?</h4>
              <ul className="space-y-2 text-sm text-teal-700">
                <li><strong>Option A (ModuleGrid):</strong> Soluty&apos;ye özel, ERP modüllerini gösteren interaktif görsel</li>
                <li><strong>Option B (Video):</strong> Premium hissi veren, profesyonel video animasyonu</li>
                <li><strong>Hibrit:</strong> ModuleGrid&apos;i video gibi animate edebiliriz (daha fazla çalışma gerektirir)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />
    </div>
  );
}
