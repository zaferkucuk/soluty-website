import { useTranslations } from "next-intl";
import { ModuleGrid } from "./components/ModuleGrid";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <div className="min-h-screen bg-zinc-50">
      <main className="mx-auto max-w-7xl px-6 pt-8 pb-16 lg:pt-12 lg:pb-24">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-6">
            {/* Stripe-style Large Headline - 3 lines */}
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
              style={{ 
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: '#0a2540'
              }}
            >
              <span className="block">{t("headline.line1")}</span>
              <span className="block">{t("headline.line2")}</span>
              <span className="block">{t("headline.line3")}</span>
            </h1>
            
            {/* Subheadline */}
            <p 
              className="max-w-xl text-xl sm:text-2xl leading-relaxed"
              style={{ color: '#425466' }}
            >
              {t("subheadline")}
            </p>

            {/* Email Input + CTA */}
            <div className="flex flex-col gap-4 sm:flex-row mt-4">
              {/* Email Input */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="
                    w-full h-14 px-5 pr-36
                    text-base text-[#0a2540]
                    bg-white
                    border border-slate-300
                    rounded-full
                    placeholder:text-[#425466]/60
                    focus:outline-none focus:ring-2 focus:ring-[#4DB6A0] focus:border-transparent
                    transition-all duration-200
                  "
                />
                {/* Submit Button inside input */}
                <button
                  type="button"
                  className="
                    absolute right-2 top-1/2 -translate-y-1/2
                    inline-flex h-10 items-center justify-center gap-2
                    rounded-full px-5
                    text-white font-medium text-sm
                    bg-[#4DB6A0] hover:bg-[#3da08c]
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#4DB6A0] focus:ring-offset-2
                  "
                >
                  {t("cta.submit")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Secondary Link */}
            <a
              className="inline-flex items-center gap-1 text-[#4DB6A0] hover:text-[#3da08c] font-medium transition-colors"
              href="#services"
            >
              {t("cta.secondary")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            {/* Trust Bar */}
            <div className="mt-4 flex flex-wrap gap-6 text-sm" style={{ color: '#425466' }}>
              <span className="flex items-center gap-2">
                <span className="text-lg">🇩🇪</span>
                {t("trust.builtInGermany")}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#4DB6A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
