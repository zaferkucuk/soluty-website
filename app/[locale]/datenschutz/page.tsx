import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';

const BASE_URL = 'https://soluty.io';

const COLORS = {
  textPrimary: '#32302F',
  textSecondary: '#5C5A58',
  bgPrimary: '#FCFCFC',
  brandPrimary: '#4DB6A0',
};

const FONTS = {
  serif: "'Crimson Pro', Georgia, 'Times New Roman', serif",
  sans: "'DM Sans', system-ui, 'Helvetica Neue', Arial, sans-serif",
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'datenschutz' });

  return {
    title: t('meta.title'),
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${locale}/datenschutz`,
      languages: {
        de: `${BASE_URL}/de/datenschutz`,
        en: `${BASE_URL}/en/datenschutz`,
        tr: `${BASE_URL}/tr/datenschutz`,
        'x-default': `${BASE_URL}/de/datenschutz`,
      },
    },
  };
}

export default function DatenschutzPage() {
  const t = useTranslations('datenschutz');
  const locale = useLocale();

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('headline'),
    url: `${BASE_URL}/${locale}/datenschutz`,
    isPartOf: { '@id': `${BASE_URL}/#website` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('headline'),
        item: `${BASE_URL}/${locale}/datenschutz`,
      },
    ],
  };

  const sectionKeys = [
    'verantwortlicher',
    'erhobene_daten',
    'rechtsgrundlage',
    'drittanbieter',
    'speicherdauer',
    'cookies',
    'betroffenenrechte',
    'beschwerderecht',
  ] as const;

  const sectionsWithList = ['erhobene_daten', 'betroffenenrechte'] as const;

  const listItemKeys: Record<string, string[]> = {
    erhobene_daten: ['server', 'contact'],
    betroffenenrechte: [
      'auskunft',
      'berichtigung',
      'loeschung',
      'einschraenkung',
      'datenportabilitaet',
      'widerspruch',
    ],
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bgPrimary }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />

      <article className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <h1
          className="mb-4"
          style={{
            fontFamily: FONTS.serif,
            color: COLORS.textPrimary,
            fontSize: 'clamp(2rem, 1.5vw + 1.6rem, 3rem)',
            fontWeight: 400,
            lineHeight: 1.2,
          }}
        >
          {t('headline')}
        </h1>

        <p
          className="mb-12"
          style={{
            fontFamily: FONTS.sans,
            color: COLORS.textSecondary,
            fontSize: '14px',
          }}
        >
          {t('lastUpdated')}
        </p>

        {sectionKeys.map((key) => (
          <section key={key} className="mb-10">
            <h2
              className="mb-4"
              style={{
                fontFamily: FONTS.sans,
                color: COLORS.textPrimary,
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {t(`sections.${key}.title`)}
            </h2>

            <p
              style={{
                fontFamily: FONTS.sans,
                color: COLORS.textSecondary,
                fontSize: '16px',
                lineHeight: 1.8,
              }}
            >
              {t(`sections.${key}.text`)}
            </p>

            {/* Contact info for Verantwortlicher */}
            {key === 'verantwortlicher' && (
              <address
                className="not-italic mt-4"
                style={{
                  fontFamily: FONTS.sans,
                  color: COLORS.textSecondary,
                  fontSize: '16px',
                  lineHeight: 1.8,
                }}
              >
                <strong style={{ color: COLORS.textPrimary }}>
                  {t('sections.verantwortlicher.company')}
                </strong>
                <br />
                {t('sections.verantwortlicher.street')}
                <br />
                {t('sections.verantwortlicher.city')}
                <br />
                <br />
                {t('sections.verantwortlicher.emailLabel')}:{' '}
                <a
                  href={`mailto:${t('sections.verantwortlicher.email')}`}
                  style={{ color: COLORS.brandPrimary }}
                >
                  {t('sections.verantwortlicher.email')}
                </a>
                <br />
                {t('sections.verantwortlicher.phoneLabel')}:{' '}
                <a
                  href={`tel:${t('sections.verantwortlicher.phone').replace(/\s/g, '')}`}
                  style={{ color: COLORS.brandPrimary }}
                >
                  {t('sections.verantwortlicher.phone')}
                </a>
              </address>
            )}

            {/* List items for sections that have them */}
            {(sectionsWithList as readonly string[]).includes(key) && (
              <>
                <ul
                  className="mt-4 list-disc pl-6 space-y-2"
                  style={{
                    fontFamily: FONTS.sans,
                    color: COLORS.textSecondary,
                    fontSize: '16px',
                    lineHeight: 1.8,
                  }}
                >
                  {listItemKeys[key].map((itemKey) => (
                    <li key={itemKey}>
                      {t(`sections.${key}.items.${itemKey}`)}
                    </li>
                  ))}
                </ul>
                {key === 'betroffenenrechte' && (
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: FONTS.sans,
                      color: COLORS.textSecondary,
                      fontSize: '16px',
                      lineHeight: 1.8,
                    }}
                  >
                    {t('sections.betroffenenrechte.contact')}
                  </p>
                )}
              </>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}
