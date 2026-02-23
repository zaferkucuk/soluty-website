# Task: SEO Structured Data (JSON-LD)

**Phase:** 2 — SEO & Technical Infrastructure  
**Rol:** Web Developer  
**Öncelik:** 🔴 3  
**Bağımlılık:** `seo-technical-foundation.md` tamamlanmış olmalı  
**Spec referansı:** `docs/seo-geo-spec.md` §5

---

## Görev Tanımı

Tüm sayfalara JSON-LD structured data eklemek. Organization + WebSite global layout'a,
sayfa-spesifik schema'lar ilgili `page.tsx`'e gidecek.

---

## Kapsam

### 1. Schema — Sayfa Haritası

| Sayfa | Schema | Konum |
|---|---|---|
| Tüm sayfalar | Organization + WebSite | `app/[locale]/layout.tsx` |
| Ana sayfa | WebPage | `app/[locale]/page.tsx` |
| FAQ sayfası | FAQPage + WebPage + BreadcrumbList | `app/[locale]/faq/page.tsx` |
| Impressum | WebPage + BreadcrumbList | `app/[locale]/impressum/page.tsx` |
| Datenschutz | WebPage + BreadcrumbList | `app/[locale]/datenschutz/page.tsx` |

---

### 2. Global Schema — app/[locale]/layout.tsx

```tsx
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://soluty.io/#organization',
  name: 'Soluty GmbH',
  url: 'https://soluty.io',
  logo: 'https://soluty.io/logo.png',
  description: 'Individuelle ERP-Software für Lieferunternehmen in Deutschland. Maßgeschneiderte Lösungen für Tourenplanung, Lagerverwaltung und Fahrerabrechnung.',
  foundingDate: '2022',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Chausseestraße 93',
    addressLocality: 'Berlin',
    postalCode: '10115',
    addressCountry: 'DE'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+49-171-8023675',
    contactType: 'sales',
    availableLanguage: ['German', 'Turkish', 'English']
  },
  areaServed: 'DE',
  knowsAbout: ['ERP-Software', 'Lieferunternehmen', 'Tourenplanung', 'Lagerverwaltung', 'Fahrerabrechnung']
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://soluty.io/#website',
  url: 'https://soluty.io',
  name: 'Soluty GmbH',
  publisher: { '@id': 'https://soluty.io/#organization' },
  inLanguage: ['de', 'en', 'tr']
}

// Layout JSX içinde:
<>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c')
    }}
  />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c')
    }}
  />
  {children}
</>
```

---

### 3. FAQPage Schema — app/[locale]/faq/page.tsx

Mevcut `messages/de.json` içindeki `faqPage.questions` verisi kullanılacak.
`answerCapsule` alanları schema için kullanılacak (40–60 kelime, öz format).

```typescript
// FAQ soruları i18n'den dinamik olarak alınacak
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answerCapsule  // answerExtended değil — öz versiyon
    }
  }))
}
```

**Önemli:** Schema metinleri HTML tag içermemeli — düz metin olmalı.

---

### 4. BreadcrumbList Schema — FAQ Örneği

```typescript
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Startseite',
      item: `https://soluty.io/${locale}`
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'FAQ',
      item: `https://soluty.io/${locale}/faq`
    }
  ]
}
```

`name` değerleri i18n'den alınmalı (Almanca/İngilizce/Türkçe).

---

### 5. Uygulama Notu

- JSON-LD schema'lar **Server Component** içinde render edilecek
- `'use client'` olan bileşenlere schema eklenmeyecek
- `JSON.stringify(...).replace(/</g, '\\u003c')` güvenlik için zorunlu
- Her schema ayrı `<script>` tag'i olacak (birleştirme gerekmez)

---

## Doğrulama

```
✅ Google Rich Results Test (search.google.com/test/rich-results):
   - Ana sayfa: Organization valid
   - FAQ sayfası: FAQPage valid, tüm sorular tanınıyor
✅ Schema.org Validator (validator.schema.org): hata yok
✅ View Source: JSON-LD script tagları görünüyor
✅ BreadcrumbList: Google Search Console → Rich Results → Breadcrumbs
✅ Her locale'da schema doğru dil değerlerini gösteriyor
```
