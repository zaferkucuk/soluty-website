# Task: SEO Technical Foundation

**Phase:** 2 — SEO & Technical Infrastructure  
**Rol:** Web Developer  
**Öncelik:** 🔴 1 (ilk yapılacak)  
**Bağımlılık:** Yok — tüm diğer SEO task'larından önce tamamlanmalı  
**Spec referansı:** `docs/seo-geo-spec.md` §3

---

## Görev Tanımı

Next.js App Router'da temel SEO altyapısını kurmak:
robots.ts, sitemap.ts, metadataBase, trailing slash tutarlılığı, canonical URL yapısı ve 404 sayfası.

---

## Kapsam

### 1. app/robots.ts

AI eğitim botlarını engelle, alıntı botlarına izin ver.

```typescript
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/'
      },
      // AI eğitim botları — engelle (atıf vermeden içerik alır)
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      // AI alıntı botları — izin ver (kaynak gösterir)
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
    ],
    sitemap: 'https://soluty.io/sitemap.xml'
  }
}
```

**Dosya yolu:** `app/robots.ts`

---

### 2. app/sitemap.ts

Tüm locale'lar ve sayfalar için sitemap. Her sayfa için hreflang alternates dahil.

```typescript
import type { MetadataRoute } from 'next'

const baseUrl = 'https://soluty.io'
const locales = ['de', 'en', 'tr'] as const

type SitemapEntry = MetadataRoute.Sitemap[number]

function buildEntry(
  path: string,
  priority: number,
  changeFreq: SitemapEntry['changeFrequency']
): SitemapEntry[] {
  return locales.map(locale => ({
    url: `${baseUrl}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map(l => [l, `${baseUrl}/${l}${path}`])
      )
    }
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...buildEntry('', 1.0, 'weekly'),           // Ana sayfa
    ...buildEntry('/faq', 0.8, 'monthly'),       // FAQ sayfası
    ...buildEntry('/impressum', 0.3, 'yearly'),  // Impressum
    ...buildEntry('/datenschutz', 0.3, 'yearly') // Datenschutz
  ]
}
```

**Dosya yolu:** `app/sitemap.ts`

**Not:** Yeni sayfa eklendiğinde bu dosyaya eklenmeli.

---

### 3. metadataBase — app/[locale]/layout.tsx

Root layout'a eklenecek. Bu olmadan tüm OG görselleri ve canonical URL'ler kırık.

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://soluty.io'),
  // ... diğer metadata
}
```

**Kontrol:** Mevcut layout'ta `metadataBase` var mı denetlenmeli.

---

### 4. Trailing Slash Tutarlılığı — next.config.ts

```typescript
const nextConfig: NextConfig = {
  trailingSlash: false,  // Tüm URL'ler slash olmadan: /de/faq (doğru), /de/faq/ (yanlış)
}
```

**Kritik:** Sitemap, canonical ve hreflang URL'leri bu ayarla uyumlu olmalı.
Tutarsız slash = duplicate content.

---

### 5. app/not-found.tsx

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1>404 — Seite nicht gefunden</h1>
      <p>Die gesuchte Seite existiert nicht.</p>
      <Link href="/de">Zur Startseite</Link>
    </main>
  )
}
```

**Kritik:** 404'leri ana sayfaya yönlendirme YAPILMAMALI — soft 404 oluşturur.
Search Console'da sorun çıkarır.

---

## Doğrulama

```
✅ https://soluty.io/robots.txt — tarayıcıda doğru içerik gösteriyor
✅ https://soluty.io/sitemap.xml — tüm sayfalar ve locale'lar var
✅ Sitemap'teki URL'ler hreflang alternates içeriyor
✅ metadataBase set edilmiş — OG görseli full URL olarak render oluyor
✅ Trailing slash tutarlı — sitemap ve canonical aynı format
✅ /de/yanlissayfa — 404 sayfası doğru, yönlendirme yok
✅ Google Rich Results Test — hata yok
```

---

## Bağımlı Task'lar

Bu task tamamlanmadan şunlar başlayamaz:
- `seo-metadata.md` (metadataBase gerektirir)
- `seo-structured-data.md` (sitemap URL'leri referans alır)
