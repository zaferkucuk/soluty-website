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
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl">
              {t("headline.line1")}
              <br />
              <span className="text-teal-600">{t("headline.line2")}</span>
            </h1>
            
            <p className="max-w-xl text-lg leading-8 text-zinc-600">
              {t("subheadline")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                className="flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-white font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: '#4DB6A0' }}
                href="#contact"
              >
                {t("cta.primary")}
              </a>
              <a
                className="flex h-12 items-center justify-center rounded-lg border border-zinc-300 px-6 font-medium transition-colors hover:bg-zinc-100"
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
        <div className="mt-12 lg:mt-16 flex flex-wrap gap-6 text-sm text-zinc-500 border-t border-zinc-200 pt-8">
          <span className="flex items-center gap-2">
            🇩🇪 {t("trust.builtInGermany")}
          </span>
          <span className="flex items-center gap-2">
            ✓ {t("trust.gdprCompliant")}
          </span>
        </div>
      </main>
    </div>
  );
}
