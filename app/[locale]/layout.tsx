import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
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

  return (
    <html lang={locale}>
      <body className={`${fontVariables} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
