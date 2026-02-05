import Link from 'next/link';
import { FAQSideNav } from './FAQSideNav';
import { FAQMobileTabs } from './FAQMobileTabs';
import { FAQCategory } from './FAQCategory';
import { FAQCtaBanner } from './FAQCtaBanner';

// Design tokens
const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  bgPrimary: '#FCFCFC',
};

const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

// Category to question mapping
const CATEGORY_QUESTIONS: Record<string, string[]> = {
  basics: ['q01', 'q02', 'q03', 'q04'],
  costAndTech: ['q05', 'q06', 'q07', 'q08', 'q09'],
  security: ['q10', 'q11', 'q12'],
  collaboration: ['q13', 'q14', 'q15', 'q16'],
};

const CATEGORY_ORDER = ['basics', 'costAndTech', 'security', 'collaboration'];

interface FAQPageContentProps {
  translations: {
    breadcrumb: { home: string; faq: string };
    headline: string;
    intro: string;
    lastUpdated: string;
    categories: Record<string, { title: string; navLabel: string }>;
    questions: Record<string, { question: string; answerCapsule: string; answerExtended: string }>;
    ctaBanner: { headline: string; subtext: string; button: string };
  };
  locale: string;
  lastUpdatedDate: string;
}

/**
 * FAQPageContent — Main FAQ page layout
 *
 * Desktop: Side nav + main content grid
 * Mobile: Sticky tabs + accordion content
 */
export function FAQPageContent({
  translations,
  locale,
  lastUpdatedDate,
}: FAQPageContentProps) {
  const t = translations;

  // Build categories for navigation
  const categories = CATEGORY_ORDER.map((id) => ({
    id,
    navLabel: t.categories[id].navLabel,
    title: t.categories[id].title,
  }));

  // Build questions for each category
  const categoriesWithQuestions = CATEGORY_ORDER.map((categoryId) => ({
    id: categoryId,
    title: t.categories[categoryId].title,
    questions: CATEGORY_QUESTIONS[categoryId].map((qId) => ({
      id: qId,
      question: t.questions[qId].question,
      answerCapsule: t.questions[qId].answerCapsule,
      answerExtended: t.questions[qId].answerExtended,
    })),
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bgPrimary }}>
      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol
            className="flex items-center gap-2 text-sm"
            style={{ fontFamily: FONTS.sans, color: COLORS.textSecondary }}
          >
            <li>
              <Link
                href={`/${locale}`}
                className="hover:text-[#4DB6A0] transition-colors duration-150"
              >
                {t.breadcrumb.home}
              </Link>
            </li>
            <li aria-hidden="true">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li aria-current="page" style={{ color: COLORS.textPrimary }}>
              {t.breadcrumb.faq}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mt-4">
          <h1
            className="heading-1"
            style={{
              fontFamily: FONTS.serif,
              color: COLORS.textPrimary,
            }}
          >
            {t.headline}
          </h1>
          <p
            className="mt-4 max-w-2xl text-lg"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textSecondary,
              fontSize: '18px',
              lineHeight: 1.65,
            }}
          >
            {t.intro}
          </p>
          <time
            dateTime={lastUpdatedDate}
            className="block mt-2 text-sm"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textSecondary,
              opacity: 0.6,
            }}
          >
            {t.lastUpdated}: {formatDate(lastUpdatedDate, locale)}
          </time>
        </header>

        {/* Mobile Tabs */}
        <FAQMobileTabs categories={categories} />

        {/* Main content area */}
        <div className="mt-12 lg:flex lg:gap-12">
          {/* Side Navigation (Desktop) */}
          <FAQSideNav categories={categories} ariaLabel="FAQ-Kategorien" />

          {/* Main content */}
          <article className="flex-1 min-w-0">
            {categoriesWithQuestions.map((category) => (
              <FAQCategory
                key={category.id}
                id={category.id}
                title={category.title}
                questions={category.questions}
              />
            ))}

            {/* CTA Banner */}
            <FAQCtaBanner
              headline={t.ctaBanner.headline}
              subtext={t.ctaBanner.subtext}
              buttonText={t.ctaBanner.button}
              buttonHref={`/${locale}#contact`}
            />
          </article>
        </div>
      </div>
    </div>
  );
}

/** Format date according to locale */
function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  const localeMap: Record<string, string> = {
    de: 'de-DE',
    en: 'en-US',
    tr: 'tr-TR',
  };
  return date.toLocaleDateString(localeMap[locale] || 'de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export { FAQSideNav } from './FAQSideNav';
export { FAQMobileTabs } from './FAQMobileTabs';
export { FAQCategory } from './FAQCategory';
export { FAQItem } from './FAQItem';
export { FAQItemMobile } from './FAQItemMobile';
export { FAQCtaBanner } from './FAQCtaBanner';
