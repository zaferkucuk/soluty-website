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
  const t = await getTranslations({ locale, namespace: 'impressum' });

  return {
    title: t('meta.title'),
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${BASE_URL}/${locale}/impressum`,
      languages: {
        de: `${BASE_URL}/de/impressum`,
        en: `${BASE_URL}/en/impressum`,
        tr: `${BASE_URL}/tr/impressum`,
        'x-default': `${BASE_URL}/de/impressum`,
      },
    },
  };
}

export default function ImpressumPage() {
  const t = useTranslations('impressum');
  const locale = useLocale();

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('headline'),
    url: `${BASE_URL}/${locale}/impressum`,
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
        item: `${BASE_URL}/${locale}/impressum`,
      },
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
          className="mb-12"
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

        {/* § 5 TMG */}
        <section className="mb-10">
          <h2
            className="mb-4"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textPrimary,
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            {t('sections.angaben.title')}
          </h2>
          <address
            className="not-italic"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textSecondary,
              fontSize: '16px',
              lineHeight: 1.8,
            }}
          >
            <strong style={{ color: COLORS.textPrimary }}>{t('companyName')}</strong>
            <br />
            {t('sections.angaben.street')}
            <br />
            {t('sections.angaben.city')}
            <br />
            {t('sections.angaben.country')}
          </address>
        </section>

        {/* Vertretungsberechtigte */}
        <section className="mb-10">
          <h2
            className="mb-4"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textPrimary,
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            {t('sections.vertretung.title')}
          </h2>
          <p
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textSecondary,
              fontSize: '16px',
              lineHeight: 1.8,
            }}
          >
            {t('sections.vertretung.persons')}
          </p>
        </section>

        {/* Handelsregister */}
        <section className="mb-10">
          <h2
            className="mb-4"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textPrimary,
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            {t('sections.registereintrag.title')}
          </h2>
          <p
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textSecondary,
              fontSize: '16px',
              lineHeight: 1.8,
            }}
          >
            {t('sections.registereintrag.court')}
            <br />
            {t('sections.registereintrag.number')}
          </p>
        </section>

        {/* USt-IdNr. */}
        <section className="mb-10">
          <h2
            className="mb-4"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textPrimary,
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            {t('sections.umsatzsteuer.title')}
          </h2>
          <p
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textSecondary,
              fontSize: '16px',
              lineHeight: 1.8,
            }}
          >
            {t('sections.umsatzsteuer.label')}: {t('sections.umsatzsteuer.number')}
          </p>
        </section>

        {/* Kontakt */}
        <section className="mb-10">
          <h2
            className="mb-4"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textPrimary,
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            {t('sections.kontakt.title')}
          </h2>
          <div
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textSecondary,
              fontSize: '16px',
              lineHeight: 1.8,
            }}
          >
            <p>
              {t('sections.kontakt.emailLabel')}:{' '}
              <a
                href={`mailto:${t('sections.kontakt.email')}`}
                style={{ color: COLORS.brandPrimary }}
              >
                {t('sections.kontakt.email')}
              </a>
            </p>
            <p>
              {t('sections.kontakt.phoneLabel')}:{' '}
              <a
                href={`tel:${t('sections.kontakt.phone').replace(/\s/g, '')}`}
                style={{ color: COLORS.brandPrimary }}
              >
                {t('sections.kontakt.phone')}
              </a>
            </p>
            <p>
              {t('sections.kontakt.websiteLabel')}:{' '}
              <a
                href={t('sections.kontakt.website')}
                style={{ color: COLORS.brandPrimary }}
              >
                {t('sections.kontakt.website')}
              </a>
            </p>
          </div>
        </section>

        {/* Verantwortlich für Inhalt */}
        <section className="mb-10">
          <h2
            className="mb-4"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textPrimary,
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            {t('sections.verantwortlich.title')}
          </h2>
          <address
            className="not-italic"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textSecondary,
              fontSize: '16px',
              lineHeight: 1.8,
            }}
          >
            {t('sections.verantwortlich.person')}
            <br />
            {t('sections.verantwortlich.street')}
            <br />
            {t('sections.verantwortlich.city')}
          </address>
        </section>

        {/* EU-Streitbeilegung */}
        <section className="mb-10">
          <h2
            className="mb-4"
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textPrimary,
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            {t('sections.streitbeilegung.title')}
          </h2>
          <p
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textSecondary,
              fontSize: '16px',
              lineHeight: 1.8,
            }}
          >
            {t('sections.streitbeilegung.text')}
          </p>
        </section>
      </article>
    </div>
  );
}
