import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { FAQPageContent } from '../components/FAQPage';

// Last updated date for FAQ content
const LAST_UPDATED = '2026-02-05';

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqPage' });

  const canonicalUrls: Record<string, string> = {
    de: 'https://soluty.de/de/faq',
    en: 'https://soluty.de/en/faq',
    tr: 'https://soluty.de/tr/faq',
  };

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: canonicalUrls[locale],
      languages: {
        de: canonicalUrls.de,
        en: canonicalUrls.en,
        tr: canonicalUrls.tr,
      },
    },
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqPage' });

  // Build translations object for the page component
  const translations = {
    breadcrumb: {
      home: t('breadcrumb.home'),
      faq: t('breadcrumb.faq'),
    },
    headline: t('headline'),
    intro: t('intro'),
    lastUpdated: t('lastUpdated'),
    categories: {
      basics: {
        title: t('categories.basics.title'),
        navLabel: t('categories.basics.navLabel'),
      },
      costAndTech: {
        title: t('categories.costAndTech.title'),
        navLabel: t('categories.costAndTech.navLabel'),
      },
      security: {
        title: t('categories.security.title'),
        navLabel: t('categories.security.navLabel'),
      },
      collaboration: {
        title: t('categories.collaboration.title'),
        navLabel: t('categories.collaboration.navLabel'),
      },
    },
    questions: {
      q01: {
        question: t('questions.q01.question'),
        answerCapsule: t('questions.q01.answerCapsule'),
        answerExtended: t('questions.q01.answerExtended'),
      },
      q02: {
        question: t('questions.q02.question'),
        answerCapsule: t('questions.q02.answerCapsule'),
        answerExtended: t('questions.q02.answerExtended'),
      },
      q03: {
        question: t('questions.q03.question'),
        answerCapsule: t('questions.q03.answerCapsule'),
        answerExtended: t('questions.q03.answerExtended'),
      },
      q04: {
        question: t('questions.q04.question'),
        answerCapsule: t('questions.q04.answerCapsule'),
        answerExtended: t('questions.q04.answerExtended'),
      },
      q05: {
        question: t('questions.q05.question'),
        answerCapsule: t('questions.q05.answerCapsule'),
        answerExtended: t('questions.q05.answerExtended'),
      },
      q06: {
        question: t('questions.q06.question'),
        answerCapsule: t('questions.q06.answerCapsule'),
        answerExtended: t('questions.q06.answerExtended'),
      },
      q07: {
        question: t('questions.q07.question'),
        answerCapsule: t('questions.q07.answerCapsule'),
        answerExtended: t('questions.q07.answerExtended'),
      },
      q08: {
        question: t('questions.q08.question'),
        answerCapsule: t('questions.q08.answerCapsule'),
        answerExtended: t('questions.q08.answerExtended'),
      },
      q09: {
        question: t('questions.q09.question'),
        answerCapsule: t('questions.q09.answerCapsule'),
        answerExtended: t('questions.q09.answerExtended'),
      },
      q10: {
        question: t('questions.q10.question'),
        answerCapsule: t('questions.q10.answerCapsule'),
        answerExtended: t('questions.q10.answerExtended'),
      },
      q11: {
        question: t('questions.q11.question'),
        answerCapsule: t('questions.q11.answerCapsule'),
        answerExtended: t('questions.q11.answerExtended'),
      },
      q12: {
        question: t('questions.q12.question'),
        answerCapsule: t('questions.q12.answerCapsule'),
        answerExtended: t('questions.q12.answerExtended'),
      },
      q13: {
        question: t('questions.q13.question'),
        answerCapsule: t('questions.q13.answerCapsule'),
        answerExtended: t('questions.q13.answerExtended'),
      },
      q14: {
        question: t('questions.q14.question'),
        answerCapsule: t('questions.q14.answerCapsule'),
        answerExtended: t('questions.q14.answerExtended'),
      },
      q15: {
        question: t('questions.q15.question'),
        answerCapsule: t('questions.q15.answerCapsule'),
        answerExtended: t('questions.q15.answerExtended'),
      },
      q16: {
        question: t('questions.q16.question'),
        answerCapsule: t('questions.q16.answerCapsule'),
        answerExtended: t('questions.q16.answerExtended'),
      },
    },
    ctaBanner: {
      headline: t('ctaBanner.headline'),
      subtext: t('ctaBanner.subtext'),
      button: t('ctaBanner.button'),
    },
  };

  // Build FAQ JSON-LD schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Object.values(translations.questions).map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answerExtended ? `${q.answerCapsule} ${q.answerExtended}` : q.answerCapsule,
      },
    })),
  };

  // Build BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: translations.breadcrumb.home,
        item: `https://soluty.de/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: translations.breadcrumb.faq,
        item: `https://soluty.de/${locale}/faq`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <FAQPageContent
        translations={translations}
        locale={locale}
        lastUpdatedDate={LAST_UPDATED}
      />
    </>
  );
}
