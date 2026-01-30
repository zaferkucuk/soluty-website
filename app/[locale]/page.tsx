import { useTranslations } from "next-intl";
import { ModuleGrid } from "./components/ModuleGrid";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <div className="min-h-screen bg-zinc-50">
      <main className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-6">
            {/* Stripe-style Large Headline */}
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
              style={{ 
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: '#0a2540'
              }}
            >
              {t("headline")}
            </h1>
            
            {/* Subheadline */}
            <p 
              className="max-w-xl text-xl sm:text-2xl leading-relaxed"
              style={{ color: '#425466' }}
            >
              {t("subheadline")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row mt-4">
              <a
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-white font-semibold text-lg transition-all hover:opacity-90"
                style={{ backgroundColor: '#635bff' }}
                href="#contact"
              >
                {t("cta.primary")}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                className="inline-flex h-14 items-center justify-center rounded-full border-2 border-slate-300 px-8 font-semibold text-lg transition-all hover:bg-slate-100"
                style={{ color: '#0a2540' }}
                href="#services"
              >
                {t("cta.secondary")}
              </a>
            </div>

            {/* Trust Bar */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm" style={{ color: '#425466' }}>
              <span className="flex items-center gap-2">
                <span className="text-lg">🇩🇪</span>
                {t("trust.builtInGermany")}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
