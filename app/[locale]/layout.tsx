import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { fontVariables } from "../fonts";
import "../globals.css";

const BASE_URL = 'https://soluty.io';

const localeToOgLocale: Record<string, string> = {
  de: 'de_DE',
  en: 'en_US',
  tr: 'tr_TR',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t('title'),
      template: '%s | Soluty GmbH',
    },
    description: t('description'),
    icons: {
      icon: [
        { url: '/soluty-icon.svg', type: 'image/svg+xml' },
      ],
      shortcut: '/soluty-icon.svg',
      apple: '/soluty-icon.svg',
    },
    openGraph: {
      type: 'website',
      siteName: 'Soluty GmbH',
      locale: localeToOgLocale[locale] ?? 'de_DE',
      images: [
        {
          url: '/og/homepage.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        de: `${BASE_URL}/de`,
        en: `${BASE_URL}/en`,
        tr: `${BASE_URL}/tr`,
        'x-default': `${BASE_URL}/de`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  // Organization JSON-LD (global)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Soluty GmbH',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Individuelle ERP-Software für Lieferunternehmen in Deutschland. Maßgeschneiderte Lösungen für Tourenplanung, Lagerverwaltung und Fahrerabrechnung.',
    foundingDate: '2022',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chausseestraße 93',
      addressLocality: 'Berlin',
      postalCode: '10115',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-171-8023675',
      contactType: 'sales',
      availableLanguage: ['German', 'Turkish', 'English'],
    },
    areaServed: 'DE',
    knowsAbout: [
      'ERP-Software',
      'Lieferunternehmen',
      'Tourenplanung',
      'Lagerverwaltung',
      'Fahrerabrechnung',
    ],
  };

  // WebSite JSON-LD (global)
  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Soluty GmbH',
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: ['de', 'en', 'tr'],
  };

  return (
    <html lang={locale}>
      <body className={`${fontVariables} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema).replace(/</g, '\\u003c'),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
