import { useTranslations } from "next-intl";
import { ModuleGrid } from "./components/ModuleGrid";
import { HeroBackground } from "./components/HeroBackground";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <HeroBackground />
      
      <main className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
              {t("headline.line1")}
              <br />
              <span className="text-teal-600">{t("headline.line2")}</span>
            </h1>
            
            <p className="max-w-xl text-lg leading-8 text-gray-600">
              {t("subheadline")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                className="flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-white font-medium transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ backgroundColor: '#4DB6A0' }}
                href="#contact"
              >
                {t("cta.primary")}
              </a>
              <a
                className="flex h-12 items-center justify-center rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm px-6 font-medium transition-all hover:bg-white hover:border-gray-400"
                href="#services"
              >
                {t("cta.secondary")}
              </a>
            </div>
          </div>

          {/* Right: Module Grid */}
          <div className="order-first lg:order-last flex justify-center lg:justify-end">
            <ModuleGrid />
          </div>
        </div>

        {/* Trust Bar */}
        <div className="mt-12 lg:mt-16 flex flex-wrap gap-6 text-sm text-gray-600 border-t border-gray-200/50 pt-8">
          <span className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
            🇩🇪 {t("trust.builtInGermany")}
          </span>
          <span className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
            ✓ {t("trust.gdprCompliant")}
          </span>
        </div>
      </main>
    </div>
  );
}
