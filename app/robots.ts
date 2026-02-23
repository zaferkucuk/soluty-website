import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all standard crawlers
      {
        userAgent: '*',
        allow: '/',
      },
      // Allow citation/search bots explicitly
      {
        userAgent: ['ChatGPT-User', 'OAI-SearchBot', 'PerplexityBot'],
        allow: '/',
      },
      // Block AI training bots
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot', 'anthropic-ai'],
        disallow: '/',
      },
    ],
    sitemap: 'https://soluty.io/sitemap.xml',
  };
}
