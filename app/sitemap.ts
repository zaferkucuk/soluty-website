import type { MetadataRoute } from 'next';

const BASE_URL = 'https://soluty.io';
const locales = ['de', 'en', 'tr'] as const;

interface PageEntry {
  path: string;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
}

const pages: PageEntry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/faq', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/impressum', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const url = page.path === '/'
        ? `${BASE_URL}/${locale}`
        : `${BASE_URL}/${locale}${page.path}`;

      const languages: Record<string, string> = {};
      for (const alt of locales) {
        const altUrl = page.path === '/'
          ? `${BASE_URL}/${alt}`
          : `${BASE_URL}/${alt}${page.path}`;
        languages[alt] = altUrl;
      }

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
