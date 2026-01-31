import { useTranslations } from "next-intl";
import { ModuleGrid } from "./components/ModuleGrid";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <main className="mx-auto max-w-7xl px-6 pt-8 pb-16 lg:pt-12 lg:pb-24">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col">
            {/* Headline - Serif font */}
            <h1 className="heading-1 text-5xl sm:text-6xl lg:text-[4.5rem]">
              <span className="block">{t("headline.line1")}</span>
              <span className="block">{t("headline.line2")}</span>
              <span className="block">{t("headline.line3")}</span>
            </h1>
            
            {/* Subheadline - Sans font */}
            <p className="body-lg mt-8 max-w-xl text-xl sm:text-2xl">
              {t("subheadline")}
            </p>

            {/* Email Input + CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {/* Email Input */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="
                    w-full h-14 px-5 pr-36
                    text-base
                    font-[var(--font-sans)]
                    text-[var(--color-text-primary)]
                    bg-white
                    border border-[var(--color-border-strong)]
                    rounded-full
                    placeholder:text-[var(--color-text-muted)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent
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
                    font-[var(--font-sans)]
                    bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-hover)]
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-2
                  "
                >
                  {t("cta.submit")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Trust Bar */}
            <div className="mt-6 flex flex-wrap gap-6">
              <span className="badge badge-brand">
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
