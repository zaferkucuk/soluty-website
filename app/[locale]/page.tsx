import { useTranslations } from "next-intl";
import { ModuleGrid } from "./components/ModuleGrid";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Stripe-style Gradient Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
        
        {/* Animated blobs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-pink-500/50 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-orange-400/60 rounded-full blur-3xl translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-300/50 rounded-full blur-3xl" />
        
        {/* White overlay at bottom for content readability */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
      </div>

      <main className="mx-auto max-w-7xl px-6 pt-32 pb-16 lg:pt-40 lg:pb-24">
        {/* Hero Content */}
        <div className="max-w-4xl">
          {/* Stripe-style Large Headline */}
          <h1 className="font-bold leading-[1.1] tracking-tight">
            <span 
              className="block text-6xl sm:text-7xl lg:text-8xl"
              style={{ 
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                color: '#0a2540'
              }}
            >
              {t("headline")}
            </span>
          </h1>
          
          {/* Subheadline */}
          <p 
            className="mt-8 text-xl sm:text-2xl leading-relaxed max-w-2xl"
            style={{ color: '#425466' }}
          >
            {t("subheadline")}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-white font-semibold text-lg transition-all hover:opacity-90 hover:scale-105"
              style={{ backgroundColor: '#635bff' }}
              href="#contact"
            >
              {t("cta.primary")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              className="inline-flex h-14 items-center justify-center rounded-full border-2 border-slate-900/20 px-8 font-semibold text-lg transition-all hover:bg-white/50 hover:border-slate-900/40"
              style={{ color: '#0a2540' }}
              href="#services"
            >
              {t("cta.secondary")}
            </a>
          </div>

          {/* Trust Bar */}
          <div className="mt-16 flex flex-wrap gap-8 text-sm" style={{ color: '#425466' }}>
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

        {/* Module Grid - positioned to the right on large screens */}
        <div className="mt-16 lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:mt-0">
          <ModuleGrid />
        </div>
      </main>
    </div>
  );
}
