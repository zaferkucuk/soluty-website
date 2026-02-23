# Task: SEO Metadata

**Phase:** 2 — SEO & Technical Infrastructure  
**Rol:** Web Developer  
**Öncelik:** 🔴 2  
**Bağımlılık:** `seo-technical-foundation.md` tamamlanmış olmalı  
**Spec referansı:** `docs/seo-geo-spec.md` §4

---

## Görev Tanımı

Her sayfa için `generateMetadata()` fonksiyonu ile Open Graph, Twitter Card,
hreflang alternates ve self-referencing canonical URL'leri implement etmek.

---

## Kapsam

### 1. Root Layout Metadata — app/[locale]/layout.tsx

```typescript
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' })

  const localeMap: Record<string, string> = {
    de: 'de_DE',
    en: 'en_US',
    tr: 'tr_TR'
  }

  return {
    metadataBase: new URL('https://soluty.io'),
    title: {
      default: t('title'),
      template: '%s | Soluty GmbH'
    },
    description: t('description'),
    openGraph: {
      type: 'website',
      siteName: 'Soluty GmbH',
      locale: localeMap[params.locale] ?? 'de_DE',
      images: [{
        url: '/og/homepage.jpg',
        width: 1200,
        height: 630,
        alt: t('title')
      }]
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      canonical: `https://soluty.io/${params.locale}`,
      languages: {
        'de': 'https://soluty.io/de',
        'en': 'https://soluty.io/en',
        'tr': 'https://soluty.io/tr',
        'x-default': 'https://soluty.io/de'
      }
    }
  }
}
```

---

### 2. Sayfa Bazında Metadata — FAQ Sayfası Örneği

```typescript
// app/[locale]/faq/page.tsx
export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'faqPage.meta' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://soluty.io/${params.locale}/faq`,
      images: [{ url: '/og/faq.jpg', width: 1200, height: 630 }]
    },
    alternates: {
      canonical: `https://soluty.io/${params.locale}/faq`,
      languages: {
        'de': 'https://soluty.io/de/faq',
        'en': 'https://soluty.io/en/faq',
        'tr': 'https://soluty.io/tr/faq',
        'x-default': 'https://soluty.io/de/faq'
      }
    }
  }
}
```

**Bu pattern tüm sayfalara uygulanacak.**

---

### 3. OG Görseli Gereksinimleri

```
Boyut:      1200×630px
Format:     JPG veya WebP
Konum:      /public/og/
Dosyalar:
  /public/og/homepage.jpg    → Ana sayfa
  /public/og/faq.jpg         → FAQ sayfası
  /public/og/impressum.jpg   → Genel fallback veya sayfa özel
```

OG görselleri yoksa önce genel bir görsel (`default.jpg`) oluşturulabilir,
sonra sayfa bazında özelleştirilebilir.

---

### 4. messages/*.json Güncellemesi

`faqPage.meta` zaten `de.json`'da mevcut:
```json
"faqPage": {
  "meta": {
    "title": "Häufig gestellte Fragen — Soluty GmbH | ...",
    "description": "Antworten auf die häufigsten Fragen..."
  }
}
```

`en.json` ve `tr.json`'da eşdeğer alanların varlığı kontrol edilmeli,
yoksa eklenmeli.

---

### 5. HTML lang Doğrulaması

next-intl `<html lang="{locale}">` set ediyor. Test:
1. `/de/` sayfasını aç
2. Sağ tıkla → Kaynağı görüntüle
3. `<html lang="de">` doğrula
4. `/en/` ve `/tr/` için tekrarla

---

## Doğrulama

```
✅ View Source: <html lang="de"> / <html lang="en"> / <html lang="tr">
✅ View Source: <link rel="canonical" href="https://soluty.io/de" />
✅ View Source: hreflang link etiketleri 3 dil + x-default
✅ Facebook Sharing Debugger: OG görsel + title + description
✅ Twitter Card Validator: summary_large_image doğru
✅ Ahrefs / TechnicalSEO.com hreflang checker: hata yok
✅ Her locale'da title template çalışıyor: "FAQ | Soluty GmbH"
```
