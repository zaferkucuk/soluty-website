import { useTranslations } from "next-intl";
import { ModuleGrid } from "./components/ModuleGrid";
import { HeroEmailForm } from "./components/HeroEmailForm";

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  bgPrimary: '#FCFCFC',
  brandPrimary: '#4DB6A0',
}

// Font constants for inline styles (Tailwind v4 CSS variable workaround)
const FONTS = {
  serif: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
}

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bgPrimary }}>
      <main className="mx-auto max-w-7xl px-6 pt-8 pb-16 lg:pt-12 lg:pb-24">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col">
            {/* Headline - Cormorant Garamond (Tiempos alternative) */}
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
            
            {/* Subheadline - DM Sans */}
            <p 
              className="body-lg mt-8 max-w-xl"
              style={{ 
                fontFamily: FONTS.sans,
                color: COLORS.textSecondary,
                fontSize: '20px',
                lineHeight: 1.6,
              }}
            >
              {t("subheadline")}
            </p>

            {/* Email Input + CTA */}
            <div className="mt-10">
              <HeroEmailForm />
            </div>

            {/* Trust Bar */}
            <div className="mt-6 flex flex-wrap gap-4">
              <span 
                className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full"
                style={{ 
                  fontFamily: FONTS.sans,
                  backgroundColor: 'rgba(77, 182, 160, 0.1)',
                  color: COLORS.brandPrimary 
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t("trust.gdprCompliant")}
              </span>
            </div>
          </div>

          {/* Right: Module Grid */}
          <div className="order-first lg:order-last flex justify-center lg:justify-end">
            <ModuleGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
