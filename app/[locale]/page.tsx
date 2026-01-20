import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            {t("headline.line1")}
            <br />
            <span className="text-blue-600">{t("headline.line2")}</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {t("subheadline")}
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-white transition-colors hover:bg-blue-700"
            href="#contact"
          >
            {t("cta.primary")}
          </a>
          <a
            className="flex h-12 items-center justify-center rounded-lg border border-solid border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="#services"
          >
            {t("cta.secondary")}
          </a>
        </div>

        <div className="flex gap-4 text-sm text-zinc-500">
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
