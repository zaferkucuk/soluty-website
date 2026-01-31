import { useTranslations } from "next-intl";
import { ModuleGrid } from "./components/ModuleGrid";
import { HeroEmailForm } from "./components/HeroEmailForm";
import { HeroVideo } from "./components/HeroVideo";

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
      <main className="mx-auto max-w-7xl px-6 pt-8 pb-16 lg:pt-12 lg:pb-24">
        
        {/* ============================================================
            HERO VISUAL COMPARISON - TOGGLE BETWEEN OPTIONS
            ============================================================
            
            Option A: Current ModuleGrid (Stripe-inspired)
            Option B: New HeroVideo (Wealthsimple-inspired)
            
            To test with video, add file to: public/videos/hero.webm
            ============================================================ */}
        
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col">
            {/* Headline - Crimson Pro (Typewolf's Tiempos alternative) */}
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

            {/* Trust Bar - simple text with checkmark, no button style */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
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

          {/* Right: Visual (Toggle between options) */}
          <div className="order-first lg:order-last flex justify-center lg:justify-end">
            {/* 
              =====================================
              OPTION A: ModuleGrid (Current)
              =====================================
              Uncomment this and comment Option B to use ModuleGrid
            */}
            {/* <ModuleGrid /> */}
            
            {/* 
              =====================================
              OPTION B: HeroVideo (Wealthsimple-style)
              =====================================
              - Without video: Shows animated floating mockups
              - With video: Add file to public/videos/hero.webm
            */}
            <HeroVideo 
              // Uncomment when you have the video file:
              // videoSrc="/videos/hero.webm"
              // posterSrc="/videos/hero-poster.webp"
            />
          </div>
        </div>

        {/* ============================================================
            VISUAL COMPARISON SECTION (Temporary - for testing)
            ============================================================ */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <h2 className="heading-3 mb-8 text-center">Hero Visual Comparison</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Option A: ModuleGrid */}
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

            {/* Option B: HeroVideo Placeholder */}
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Option B: HeroVideo
                <span className="block text-sm font-normal text-slate-500">
                  (Wealthsimple-inspired, new)
                </span>
              </h3>
              <div className="flex justify-center">
                <HeroVideo />
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-6 bg-slate-100 rounded-xl">
            <h4 className="font-semibold mb-2">🎬 Video Entegrasyonu için:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
              <li>
                Wealthsimple videosunu indir: 
                <code className="ml-2 px-2 py-1 bg-slate-200 rounded text-xs break-all">
                  https://videos.ctfassets.net/.../homeHeroEvoEvergreen-en-CA.webm
                </code>
              </li>
              <li>
                Dosyayı şuraya kaydet: 
                <code className="ml-2 px-2 py-1 bg-slate-200 rounded text-xs">
                  public/videos/hero.webm
                </code>
              </li>
              <li>
                page.tsx&apos;te HeroVideo componentine videoSrc prop&apos;unu ekle
              </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
