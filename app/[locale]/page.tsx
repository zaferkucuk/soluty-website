import { useTranslations } from "next-intl";

interface HeroIllustrationProps {
  labels: {
    order: string;
    route: string;
    driver: string;
    delivery: string;
    invoice: string;
  };
}

function HeroIllustration({ labels }: HeroIllustrationProps) {
  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* Connection Lines */}
        <g stroke="#3b82f6" strokeWidth="2" fill="none">
          {/* Order to Route */}
          <line x1="80" y1="80" x2="200" y2="80" />
          <polygon points="195,75 205,80 195,85" fill="#3b82f6" />
          
          {/* Route to Driver */}
          <line x1="200" y1="80" x2="320" y2="80" />
          <polygon points="315,75 325,80 315,85" fill="#3b82f6" />
          
          {/* Driver to Delivery */}
          <line x1="320" y1="100" x2="320" y2="180" />
          <polygon points="315,175 320,185 325,175" fill="#3b82f6" />
          
          {/* Delivery to Invoice */}
          <line x1="300" y1="200" x2="120" y2="200" />
          <polygon points="125,195 115,200 125,205" fill="#3b82f6" />
        </g>

        {/* Order Node */}
        <g>
          <circle cx="80" cy="80" r="35" fill="#f0f9ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="80" y="65" textAnchor="middle" className="text-2xl">📦</text>
          <text x="80" y="85" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="500">
            {labels.order}
          </text>
        </g>

        {/* Route Node */}
        <g>
          <circle cx="200" cy="80" r="35" fill="#f0f9ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="200" y="65" textAnchor="middle" className="text-2xl">🗺️</text>
          <text x="200" y="85" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="500">
            {labels.route}
          </text>
        </g>

        {/* Driver Node */}
        <g>
          <circle cx="320" cy="80" r="35" fill="#f0f9ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="320" y="65" textAnchor="middle" className="text-2xl">🚚</text>
          <text x="320" y="85" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="500">
            {labels.driver}
          </text>
        </g>

        {/* Delivery Node */}
        <g>
          <circle cx="320" cy="200" r="35" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
          <text x="320" y="185" textAnchor="middle" className="text-2xl">✓</text>
          <text x="320" y="205" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="500">
            {labels.delivery}
          </text>
        </g>

        {/* Invoice Node */}
        <g>
          <circle cx="80" cy="200" r="35" fill="#f0f9ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="80" y="185" textAnchor="middle" className="text-2xl">🧾</text>
          <text x="80" y="205" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="500">
            {labels.invoice}
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations("hero");

  const illustrationLabels = {
    order: t("illustration.order"),
    route: t("illustration.route"),
    driver: t("illustration.driver"),
    delivery: t("illustration.delivery"),
    invoice: t("illustration.invoice"),
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
              {t("headline.line1")}
              <br />
              <span className="text-blue-600">{t("headline.line2")}</span>
            </h1>
            
            <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {t("subheadline")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                className="flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-white font-medium transition-colors hover:bg-blue-700"
                href="#contact"
              >
                {t("cta.primary")}
              </a>
              <a
                className="flex h-12 items-center justify-center rounded-lg border border-zinc-300 px-6 font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                href="#services"
              >
                {t("cta.secondary")}
              </a>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="order-first lg:order-last">
            <HeroIllustration labels={illustrationLabels} />
          </div>
        </div>

        {/* Trust Bar */}
        <div className="mt-12 lg:mt-16 flex flex-wrap gap-6 text-sm text-zinc-500 border-t border-zinc-200 dark:border-zinc-800 pt-8">
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
