# SEO & GEO Specification — Soluty GmbH

**Version:** 1.0
**Tarih:** Şubat 2026
**Rol:** Researcher çıktısı — Web Developer ve UX/UI için referans
**Durum:** Onaylandı — implementasyon başlayabilir

---

## 1. Stratejik Konumlandırma

### 1.1 Soluty Kim İçin Ne Yapıyor?

Bu sorunun cevabı tüm SEO/GEO stratejisinin temelidir.

**Net tanım (AI ve arama motorları için):**
> Soluty ist ein Berliner Softwareunternehmen, das individuelle ERP-Systeme für kleine und mittlere Lieferunternehmen in Deutschland entwickelt — speziell für Betriebe mit Außendienst, Tourenplanung, Lagerverwaltung und Fahrerabrechnung.

Bu tanım her sayfada, structured data'da ve içerik yapısında tutarlı olacak.

### 1.2 Neden Konumlandırma SEO'dan Önce Gelir

❌ Yanlış hedef: "ERP Software" — SAP, Oracle, Sage ile rekabet edilemez
✅ Doğru hedefler:
- "ERP für Lieferunternehmen"
- "Tourenplanung Software Mittelstand"
- "Individuelle ERP-Software Berlin"
- "ERP für Großhandel mit Auslieferung"
- "Fahrerabrechnung System Deutschland"
- "Maßgeschneiderte ERP-Lösung KMU"

Bu terimler düşük rekabetli, yüksek niyet (intent) taşıyan, gerçek alıcıların kullandığı terimlerdir.

### 1.3 Hedef Kitle

| Segment | Dil | Arama Davranışı |
|---|---|---|
| Alman KOBİ'ler (Lieferunternehmen) | Almanca (birincil) | "ERP Lieferfirma", "Tourenplanung Software" |
| Alman KOBİ'ler (Großhandel) | Almanca | "Lagerverwaltung ERP", "Digitalisierung Großhandel" |
| Türk kökenli işletmeler Berlin | Türkçe + Almanca | "teslimat yazılımı", "ERP KOBİ" |
| Genel B2B (uluslararası) | İngilizce | "custom ERP Germany", "delivery management software" |

---

## 2. Anahtar Kelime Stratejisi

### 2.1 3 Katmanlı Yapı

#### Katman 1 — Money Pages (Lead Üretici)

Doğrudan lead getiren sayfalar. Her biri ayrı URL, 1.500+ kelime, gerçek use-case.

| Keyword (DE) | Amaç | Mevcut Durum |
|---|---|---|
| ERP für Lieferunternehmen | Ana hizmet | Ana sayfa kısmen |
| Tourenplanung Software | Modül odaklı | Yok |
| Lagerverwaltung Lieferbetrieb | Modül odaklı | Yok |
| Fahrerabrechnung System | Modül odaklı | Yok |
| Individuelle ERP-Software | Genel hizmet | Kısmen |
| ERP für Großhandel | Sektör odaklı | Yok |

> **Not:** Bu sayfalar şu anki wireframe'de yok. Phase 3+ için human approval gerektirir. Bu belge stratejiyi kaydeder; implementasyon ayrıca onaylanacak.

#### Katman 2 — Authority İçerikler (Long-tail Trafik)

Araştırma aşamasındaki alıcıları çeker.

| Başlık (DE) | Format |
|---|---|
| Was kostet ein ERP-System für Lieferunternehmen? | FAQ / Kılavuz |
| Excel vs. ERP für Lieferbetriebe | Karşılaştırma |
| Wie digitalisiert man eine Auslieferungsfirma? | Kılavuz |
| GoBD-konforme Rechnungsstellung: Was müssen KMU wissen? | Kılavuz |
| Tourenplanung: Excel oder Software? | Karşılaştırma |

> **Not:** Bu içerikler blog veya kaynaklar bölümü gerektirir. Phase 3+ planı.

#### Katman 3 — GEO İçerikler (AI Arama İçin)

ChatGPT, Perplexity, Google AI Overviews bu sorulara cevap arıyor:

- "Welches ERP ist gut für Lieferfirmen in Deutschland?"
- "ERP mit Fahrerabrechnung Empfehlung?"
- "Alternativen zu Odoo für Lieferunternehmen?"
- "ERP Software Berlin Mittelstand"
- "Individuelle ERP-Entwicklung Kosten Deutschland"

Bu sorulara doğrudan, öz ve veri destekli cevaplar veren içerik bloklarına ihtiyaç var.
Mevcut FAQ sayfası bu formata yakın — güçlendirilmeli.

---

## 3. Teknik SEO Gereksinimleri

### 3.1 Proje Teknik Gerçekleri

```
Framework:    Next.js 16.1.4 (App Router)
i18n:         next-intl 4.7.0
Locales:      ['de', 'en', 'tr'] — defaultLocale: 'de'
Hosting:      Hostinger KVM VPS (NOT Vercel — dikkat)
Domain:       soluty.io
URL yapısı:   /de/*, /en/*, /tr/*
```

**Kritik not:** `vercel.json` dosyası repoda mevcut ancak `technical_constraints.md` hosting'i
Hostinger VPS olarak tanımlıyor. Security headers task'ı bu çelişkiyi dikkate almalı.
`next.config.ts` içindeki `headers()` fonksiyonu her iki platformda çalışır ve tercih edilmeli.

### 3.2 Zorunlu Teknik Kontrol Listesi

#### robots.ts

```
✅ Googlebot: allow all
✅ Bingbot: allow all
✅ Sitemap URL dahil
⚠️ AI Eğitim Botları: BLOCK (GPTBot, ClaudeBot, Google-Extended, CCBot)
✅ AI Alıntı Botları: ALLOW (ChatGPT-User, OAI-SearchBot, PerplexityBot)
```

**Neden bu ayrım kritik:** GPTBot siteyi eğitim verisi olarak kullanır (atıf vermez).
PerplexityBot ve ChatGPT-User ise kullanıcı aramalarına cevap oluştururken siteyi kaynak
gösterir — bu trafik ve marka görünürlüğü demektir.

#### sitemap.ts

```
✅ Tüm locale'lar dahil: /de/, /en/, /tr/
✅ Her sayfa için xhtml:link alternates
✅ changefreq ve priority değerleri
✅ lastModified dinamik
```

Priority önerileri:
- Ana sayfa: 1.0
- Hizmetler: 0.9
- FAQ: 0.8
- Impressum/Datenschutz: 0.3

#### metadataBase

```typescript
// app/[locale]/layout.tsx içinde ZORUNLU
export const metadata: Metadata = {
  metadataBase: new URL('https://soluty.io'),
}
```

Bu olmadan tüm OG görselleri ve canonical URL'ler relative olur — kırık.

#### Canonical URL'ler

- Her locale kendi URL'ini canonical gösterir
- `/de/` → canonical: `https://soluty.io/de/`
- `/en/` → canonical: `https://soluty.io/en/`
- `/tr/` → canonical: `https://soluty.io/tr/`
- Cross-locale canonical YAPILMAZ (çeviri = farklı içerik)

#### hreflang

- `x-default` → Almanca (`/de/`)
- 3 lokasyonda aynı anda: `<head>` meta, HTTP headers (next-intl middleware otomatik), sitemap
- Çift yönlü referans zorunlu: A → B ise B → A da olmalı

#### Trailing Slash

`next.config.ts`'de `trailingSlash: false` tercih edilir (mevcut URL'lerle tutarlı olmalı).
Sitemap, canonical ve hreflang URL'leri aynı formatı kullanmalı — karışıklık duplicate content'e yol açar.

#### HTML lang attribute

`<html lang="de">` — next-intl bunu otomatik yönetiyor, ancak her locale için
doğru değerin (`de`, `en`, `tr`) set edildiği doğrulanmalı.

#### 404 Sayfası

`app/not-found.tsx` oluşturulmalı. 404'leri ana sayfaya yönlendirme YAPILMAMALI
(soft 404 oluşturur, Search Console'da sorun çıkarır).

---

## 4. Metadata Gereksinimleri

### 4.1 Her Sayfa İçin generateMetadata

```
title:              [Sayfa Başlığı] | Soluty GmbH
description:        150–160 karakter, Almanca için tam limit kullanılabilir
og:title:           title ile aynı veya kısa optimize versiyon
og:description:     description ile aynı
og:image:           1200×630px, /public/og/ altında, sayfa bazında
og:type:            website (ana sayfa), article (blog gelince)
og:locale:          de_DE / en_US / tr_TR
og:site_name:       Soluty GmbH
twitter:card:       summary_large_image
twitter:title:      og:title ile aynı
twitter:description: og:description ile aynı
twitter:image:      og:image ile aynı
canonical:          Her locale kendi URL'i (self-referencing)
alternates:         hreflang değerleri
```

### 4.2 Mevcut Metadata Durumu

`messages/de.json`'da global metadata mevcut:

```json
"metadata": {
  "title": "Soluty GmbH | Individuelle ERP-Lösungen für Unternehmen",
  "description": "Führen Sie Ihr Unternehmen digital. Einfach, effizient, individuell..."
}
```

Bu temel mevcut ancak eksikler:
- Sayfa bazında ayrı OG görselleri yok
- Twitter Card metadata yok
- FAQ sayfası için ayrı metadata yok (`faqPage.meta` var — entegre edilmeli)
- hreflang `alternates` generateMetadata'da set edilmiyor

---

## 5. Structured Data (JSON-LD)

### 5.1 Schema — Sayfa Haritası

| Sayfa | Schema Türleri |
|---|---|
| Ana sayfa (`/de/`) | Organization + WebSite + WebPage + BreadcrumbList |
| FAQ sayfası (`/de/faq`) | FAQPage + WebPage + BreadcrumbList |
| Hizmetler (services section) | Service + WebPage |
| Kontakt / Final CTA | LocalBusiness (veya Organization) + WebPage |
| Impressum | WebPage + BreadcrumbList |
| Datenschutz | WebPage + BreadcrumbList |

### 5.2 Organization Schema (Global)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://soluty.io/#organization",
  "name": "Soluty GmbH",
  "url": "https://soluty.io",
  "logo": "https://soluty.io/logo.png",
  "description": "Individuelle ERP-Software für Lieferunternehmen in Deutschland. Maßgeschneiderte Lösungen für Tourenplanung, Lagerverwaltung und Fahrerabrechnung.",
  "foundingDate": "2022",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chausseestraße 93",
    "addressLocality": "Berlin",
    "postalCode": "10115",
    "addressCountry": "DE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+49-171-8023675",
    "contactType": "sales",
    "availableLanguage": ["German", "Turkish", "English"]
  },
  "areaServed": "DE",
  "knowsAbout": [
    "ERP-Software",
    "Lieferunternehmen",
    "Tourenplanung",
    "Lagerverwaltung",
    "Fahrerabrechnung"
  ]
}
```

### 5.3 WebSite Schema (Global — Sitelink Searchbox için)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://soluty.io/#website",
  "url": "https://soluty.io",
  "name": "Soluty GmbH",
  "publisher": { "@id": "https://soluty.io/#organization" },
  "inLanguage": ["de", "en", "tr"]
}
```

### 5.4 FAQPage Schema

Mevcut FAQ sayfasındaki `faqPage.questions` içindeki `answerCapsule` alanları
zaten 40–60 kelimelik öz cevaplar olarak yapılandırılmış — bu GEO için ideal format.
Her soru FAQPage schema'sına dönüştürülecek.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was ist ein ERP-System und wofür wird es eingesetzt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein ERP-System (Enterprise Resource Planning) ist eine Software, die alle Geschäftsprozesse eines Unternehmens in einer zentralen Plattform zusammenführt..."
      }
    }
  ]
}
```

**Not:** Google Ağustos 2023'te FAQPage rich results'ı sınırladı ancak
schema'nın GEO (AI alıntı) değeri arttı. FAQPage schema olan sayfalar
Google AI Overviews'a 3.2× daha fazla dahil ediliyor (Princeton KDD 2024).

### 5.5 Next.js Uygulama Yöntemi

```tsx
// Server Component içinde — client bundle'ı şişirmez
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(schema).replace(/</g, '\\u003c')
  }}
/>
```

Global schema'lar `app/[locale]/layout.tsx`'e, sayfa-spesifik olanlar
ilgili `page.tsx`'e gider. `@graph` yaklaşımı büyük sayfalar için tercih edilebilir.

---

## 6. Performance & Core Web Vitals

### 6.1 Hedef Skorlar

| Metrik | Hedef | Araç |
|---|---|---|
| PageSpeed (desktop) | ≥ 95 | Google PageSpeed Insights |
| PageSpeed (mobile) | ≥ 90 | Google PageSpeed Insights |
| LCP | < 2.5s | Chrome DevTools / CrUX |
| INP | < 200ms | Chrome DevTools |
| CLS | < 0.1 | Chrome DevTools |
| Lighthouse SEO | 100 | Chrome DevTools |
| Lighthouse Accessibility | ≥ 95 | Chrome DevTools |
| Lighthouse Best Practices | ≥ 95 | Chrome DevTools |

### 6.2 Next.js Spesifik Optimizasyonlar

**Font (CLS önleme + external request yok):**
```typescript
import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin', 'latin-ext'],  // latin-ext: ä, ö, ü, ß, Ş, ğ için şart
  display: 'swap'
})
```

**Images (LCP + CLS):**
```tsx
// Hero görseli — priority zorunlu (LCP elementi)
<Image src="/hero.webp" priority width={800} height={600} alt="..." />

// Tüm görsellerde width/height zorunlu (CLS önleme)
<Image src="/feature.webp" width={400} height={300} alt="..." />
```

**Dynamic imports (bundle boyutu):**
```tsx
// Framer-motion gibi ağır bileşenler
const HeavyAnimation = dynamic(() => import('./HeavyAnimation'), { ssr: false })
```

**Server/Client sınırı:**
`'use client'` direktifi minimum tutulacak. Sadece interaktif bileşenler
(form, animasyon, useState) client olacak. Statik içerik her zaman Server Component.

### 6.3 Çerez / Analytics Kararı

Mevcut kurulumda sadece teknik zorunlu işlemler var (Nodemailer form, session yok).
Alman DPA: teknik zorunlu çerezler için banner gerekmez. Bu hem CWV'yi iyileştirir
hem de DSGVO açısından en güvenli seçenek.

Eğer analytics eklenecekse tercih sırası:
1. **Plausible Analytics** (cookieless, DSGVO uyumlu, banner gerektirmez)
2. **Matomo** (self-hosted, cookieless mod)
3. Google Analytics 4 (banner gerektirir, veri AB dışına çıkar)

---

## 7. GEO (Generative Engine Optimization) Stratejisi

### 7.1 GEO Nedir

GEO, ChatGPT, Perplexity, Google AI Overviews, Bing Copilot gibi AI sistemlerinin
yanıt oluştururken bir kaynağı alıntılamasını sağlamak için yapılan optimizasyon.

Princeton Üniversitesi araştırması (KDD 2024): doğru GEO teknikleriyle AI yanıtlarında
görünürlük %40'a kadar artıyor.

Gerçekçi beklenti: Google hâlâ AI platformlardan 345× daha fazla trafik gönderiyor.
GEO kısa vadede marka bilinirliği, uzun vadede trafik kaynağı.

### 7.2 AI Tarayıcı Stratejisi (robots.ts)

```
# Eğitim botları — ENGELLE (atıf vermeden içerik alır)
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

# Alıntı/arama botları — İZİN VER (kullanıcılara kaynak gösterir)
User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

### 7.3 İçerik Yapısı (AI Alıntısı İçin)

AI sistemleri şu yapıdaki içerikleri alıntılar:

**"Answer Capsule / Fact Block" formatı:**
1. **Net tanım** (40–60 kelime, bağımsız olarak anlamlı, öz) — AI bu bloğu doğrudan alır
2. **Somut kanıt** (spesifik veri, rakam, gerçek örnek)
3. **Bağlam/kaynak** (şirkete atıf, "laut Soluty GmbH")

Mevcut `faqPage.questions[n].answerCapsule` alanları bu formata uygun.
Bu yapı tüm içeriklerde standart hale getirilmeli.

**Başlık yapısı (soru formatı AI için ideal):**
```
H1: [Sayfa konusu] — spesifik, tek
H2: "Was ist...?" / "Wie funktioniert...?" / "Welche Module...?"
H3: Alt konular
```

Soru formatındaki H2'ler arama sorgularıyla birebir eşleşir ve
AI sistemleri bu yapıyı tercih eder.

### 7.4 E-E-A-T Sinyalleri

| Sinyal | Açıklama | Soluty İçin Eylem |
|---|---|---|
| Experience (Deneyim) | Gerçek uygulama örnekleri | Müşteri use-case'leri, somut sonuçlar |
| Expertise (Uzmanlık) | Teknik derinlik | GoBD, DSGVO, Tourenplanung teknik içerik |
| Authoritativeness (Otorite) | Dış referanslar | G2, Capterra, OMR Reviews profilleri |
| Trustworthiness (Güven) | Doğrulanabilir kimlik | Impressum, adres, telefon, HTTPS, sertifikalar |

**Öncelikli eylemler (Phase 2 sonrası):**
1. Google Business Profile kurulumu — Berlin ERP şirketi olarak doğrulama
2. G2 profil oluşturma (ücretsiz)
3. OMR Reviews profil (Alman pazar için en güçlü)
4. WLW (Wer liefert was) kaydı
5. LinkedIn şirket sayfası aktif kullanım

### 7.5 Karşılaştırma İçeriği (Phase 3+)

AI sistemleri karşılaştırma sayfalarını çok sık alıntılar. Planlanan:

- "Soluty vs. Odoo für Lieferunternehmen"
- "Individuelle ERP vs. Standardsoftware"
- "Was kostet ERP im Vergleich zu Excel?"

Bu içerikler blog/resources bölümüyle birlikte planlanacak.

### 7.6 GEO Ölçümü

Araçlar:
- **Manuel test** (ücretsiz): ChatGPT, Perplexity, Google'da aylık 10–15 hedef soru — Soluty çıkıyor mu?
- **Otterly.ai** ($29/ay): AI görünürlük takibi otomasyonu
- **GA4 Referral**: `chatgpt.com`, `perplexity.ai` referral trafiği izleme

---

## 8. Güvenlik Headers

### 8.1 Hedef

SecurityHeaders.com'da **A+** rating.

### 8.2 next.config.ts Headers

```typescript
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  },
  {
    key: 'X-XSS-Protection',
    value: '0'  // Devre dışı — CSP'ye güven, eski header güvenlik açığı yaratır
  }
]
```

**CSP (Content-Security-Policy):** Framer-motion ve inline styles nedeniyle önce
`Content-Security-Policy-Report-Only` modda test edilecek, sonra enforce edilecek.
Bu ayrı task olarak yönetilecek.

### 8.3 Hostinger VPS Notu

`next.config.ts` içindeki `headers()` fonksiyonu tercih edilen yöntem — her platformda çalışır.
VPS'de ayrıca nginx config'den de header eklenebilir ama çakışma riski nedeniyle
tek kaynak prensibi uygulanmalı. `vercel.json`'daki header konfigürasyonu
Hostinger VPS deployment'ında etkisizdir.

---

## 9. Erişilebilirlik (WCAG 2.1 AA)

### 9.1 Neden Bu Kapsama Dahil Edildi

Lighthouse 4 kategoride ölçüm yapar: Performance, SEO, Best Practices, Accessibility.
Üç kategoride 95+ ama Accessibility'de düşük skor genel izlenimi zayıflatır.
Ayrıca `technical_constraints.md`'de WCAG 2.1 AA zorunlu olarak belirtilmiş.

### 9.2 Hedef

Lighthouse Accessibility: **≥ 95**

### 9.3 Kontrol Listesi

```
GÖRSELLER
✅ Anlamlı görseller: alt text açıklayıcı
✅ Dekoratif görseller: alt="" veya aria-hidden="true"
✅ Arka plan görselleri: CSS'te, içerik taşımıyor

RENKler
✅ Normal metin kontrastı: ≥ 4.5:1
✅ Büyük metin (18px+ veya 14px+ bold): ≥ 3:1
✅ UI bileşenleri ve focus göstergesi: ≥ 3:1

KLAVYE & NAVIGASYON
✅ Tüm interaktif elementler Tab ile erişilebilir
✅ Focus göstergesi görünür ve net
✅ Tab sırası mantıklı (DOM sırası ile uyumlu)
✅ Skip-to-content linki aktif (messages/de.json'da "skipToContent" mevcut)
✅ Modal/overlay: focus trap uygulanmış
✅ Esc tuşu modal kapatıyor

YAPI VE SEMANTİK
✅ H1 her sayfada yalnızca bir kez
✅ H2-H3 hiyerarşisi mantıklı, atlama yok
✅ Landmark roller: <main>, <header>, <nav>, <footer>
✅ <html lang="xx"> doğru locale ile set edilmiş

FORMLAR
✅ Her input için <label> veya aria-label
✅ Required alanlar aria-required="true"
✅ Hata mesajları aria-describedby ile bağlı
✅ Submit butonu anlamlı metin taşıyor

INTERAKTIF ELEMENTLER
✅ Butonlar anlamlı metin veya aria-label
✅ Linkler hedefi açıklıyor (yeni sekmede açılıyorsa belirtilmiş)
✅ Icon-only butonlar: aria-label zorunlu
✅ Toggle/switch: aria-pressed veya role="switch"

ANİMASYONLAR
✅ prefers-reduced-motion sorgusu uygulanmış
✅ Framer-motion animasyonlar bu tercihle devre dışı kalabilmeli
```

### 9.4 Mevcut Durum Tespiti (Audit Gerekli)

Mevcut bileşenler (`ModuleGrid`, animasyonlar, `WhatsApp button`, form) için
kapsamlı accessibility audit yapılmalı. Özellikle:
- Framer-motion animasyonlarda `prefers-reduced-motion` kontrolü
- Form validation mesajlarının screen reader ile okunabilirliği
- Language switcher button'larının aria yapısı
- Mobile menu toggle'ın accessibility durumu

### 9.5 Test Araçları

1. **Chrome DevTools → Lighthouse** — Genel skor ve otomatik tespitler
2. **axe DevTools** (browser eklentisi) — WCAG 2.1 AA ihlalleri detaylı
3. **WAVE** (wave.webaim.org) — Görsel rapor
4. **WebAIM Contrast Checker** — Renk kontrastı doğrulama
5. **Klavye testi** (manuel) — Tab, Enter, Esc ile gezinme

---

## 10. Legal Sayfalar

### 10.1 Impressum

**Yasal dayanak:** § 5 DDG (Digitale-Dienste-Gesetz — TMG'nin yerini aldı, 2024)

**Zorunlu bilgiler:**

```
✅ Tam şirket adı:          Soluty GmbH
✅ Adres:                   Chausseestraße 93, 10115 Berlin
✅ Telefon:                 +49 171 8023675
✅ E-posta:                 info@soluty.de
⚠️ Handelsregisternummer:  HRB [no] — Zafer'den alınacak
⚠️ Registergericht:        Amtsgericht Charlottenburg
⚠️ Geschäftsführer:        [Ad Soyad] — Zafer'den alınacak
⚠️ USt-IdNr.:              [KDV no] — varsa eklenmeli
```

**URL yapısı:**
```
/de/impressum
/en/imprint
/tr/impressum
```

**Önemli:** Sadece Almanca yeterli değil — yabancı dil sayfalarda da erişilebilir
(link footer'da her locale'da görünmeli).

### 10.2 Datenschutzerklärung

**Yasal dayanak:** DSGVO (GDPR) Art. 13, Art. 14

**Zorunlu bölümler:**

```
1. Verantwortlicher
   Soluty GmbH, Chausseestraße 93, 10115 Berlin
   info@soluty.de, +49 171 8023675

2. Erhobene Daten
   - Kontaktformular: Name, Firma, E-Mail, Telefon (optional), Nachricht
   - Server-Logs: IP (anonymisiert), Datum, Uhrzeit, User-Agent

3. Zweck der Verarbeitung
   - Formular: Kontaktanfragen bearbeiten (Art. 6 Abs. 1 lit. b DSGVO)
   - Logs: Sicherheit und Fehleranalyse (Art. 6 Abs. 1 lit. f DSGVO)

4. Drittanbieter
   - Zoho Mail / SMTP: E-Mail-Versand (Auftragsverarbeitung)
   - Hosting: [Hostinger] — Serverstandort DE/EU

5. Speicherdauer
   - Kontaktdaten: bis Anfrage erledigt, max. 3 Jahre (Handelsrecht)
   - Server-Logs: 7 Tage

6. Betroffenenrechte
   - Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17)
   - Einschränkung (Art. 18), Widerspruch (Art. 21)
   - Beschwerderecht: Berliner Beauftragte für Datenschutz

7. Keine Cookies (wenn kein Analytics)
   Technisch notwendige Verarbeitung — kein Cookie-Banner erforderlich
```

**URL yapısı:**
```
/de/datenschutz
/en/privacy
/tr/gizlilik
```

---

## 11. Lokal SEO

### 11.1 Google Business Profile

```
✅ Kategorie:   "Custom Software Development Company"
✅ Name:        Soluty GmbH
✅ Adresse:     Chausseestraße 93, 10115 Berlin
✅ Telefon:     +49 171 8023675
✅ E-Mail:      info@soluty.de
✅ Website:     https://soluty.io
✅ Beschreibung: ERP-Software für Lieferunternehmen in Berlin...
✅ Öffnungszeiten: Mo–Fr 09:00–18:00
```

NAP tutarlılığı zorunlu: GBP, website footer, Impressum ve tüm dizinlerde
Name, Address, Phone formatı birebir aynı olmalı.

### 11.2 Dizin Kayıtları

| Platform | Öncelik | Not |
|---|---|---|
| Google Business Profile | 🔴 Kritik | Knowledge Panel için zorunlu |
| OMR Reviews | 🟡 Yüksek | Alman B2B için en güçlü platform |
| G2 | 🟡 Yüksek | Uluslararası SaaS/software karşılaştırma |
| Capterra | 🟡 Yüksek | SMB software araştırması için güçlü |
| WLW (Wer liefert was) | 🟠 Orta | Alman B2B dizini |
| Kompass | 🟠 Orta | Avrupa B2B |
| Gelbe Seiten | 🟠 Orta | Lokal arama |

### 11.3 Domain Notu

Google .io'yu gTLD olarak işler — coğrafi dezavantaj yok.
`soluty.de` savunma amaçlı alınmalı ve `soluty.io`'ya 301 yönlendirmeli (~5–15€/yıl).
British Indian Ocean Territory transfer durumu uzun vadeli .io belirsizliği yaratabilir.

---

## 12. KPI'lar ve Başarı Kriterleri

### 12.1 Teknik KPI'lar (30 gün içinde ölçülebilir)

| KPI | Hedef | Araç |
|---|---|---|
| Lighthouse SEO | 100 | Chrome DevTools |
| Lighthouse Accessibility | ≥ 95 | Chrome DevTools |
| Lighthouse Best Practices | ≥ 95 | Chrome DevTools |
| PageSpeed desktop | ≥ 95 | PageSpeed Insights |
| PageSpeed mobile | ≥ 90 | PageSpeed Insights |
| SecurityHeaders.com | A+ | securityheaders.com |
| Rich Results Test | Hatasız | Google Rich Results Test |
| hreflang doğrulama | Hatasız | TechnicalSEO.com hreflang checker |
| Search Console | 0 kritik hata | Google Search Console |
| Sitemap submit | Tamamlandı | Google Search Console |

### 12.2 Organik KPI'lar (3–9 ay görünür sonuç)

| KPI | Hedef (3 ay) | Hedef (9 ay) |
|---|---|---|
| Organik trafik | 200+ ziyaret/ay | 1.000+ ziyaret/ay |
| Top 10 keyword sayısı | 5+ | 20+ |
| Beratung talep formu | 1–2/ay | 5+/ay |
| AI alıntı görünürlüğü | Perplexity'de görünme | ChatGPT + Google AI'da görünme |

### 12.3 Gerçekçi Zaman Beklentisi

```
0–30 gün:   Teknik SEO tamamlanır, indexleme başlar, Search Console temizlenir
1–3 ay:     İlk uzun-kuyruk keyword sıralamalar görünür
3–6 ay:     Organik trafik ölçülebilir büyüme gösterir
6–9 ay:     Rekabetçi niş keyword'lerde Top 10 potansiyeli
```

SEO 6–9 aylık bir süreçtir. Doğru yapılırsa: lead maliyeti düşer,
reklama bağımlılık azalır, marka otoritesi oluşur.

**Soluty'nin en büyük avantajı:** Gerçek operasyonel bilgi.
Rakip ERP siteleri genel konuşur — Soluty depo, sürücü, tahsilat, rota,
maliyet hesabını anlatır. Bu fark içeriklere yansıtılmalı.

---

## 13. Phase 3+ Yol Haritası (Bu Spec'in Kapsamı Dışı)

Aşağıdakiler onaylı wireframe'i aşar veya büyük kapsam kararları gerektirir.
Strateji olarak kaydedilmiştir — implementasyon için ayrıca human approval alınacak.

### Genişletilmiş Site Mimarisi (Onay Gerekli)

```
/de/erp-fuer-lieferunternehmen/     → Katman 1 Money Page
/de/tourenplanung-software/         → Katman 1 Money Page
/de/lagerverwaltung-lieferbetrieb/  → Katman 1 Money Page
/de/fahrerabrechnung-system/        → Katman 1 Money Page
/de/branchen/grosshandel/           → Sektör sayfası
/de/branchen/lebensmittel-lieferung/→ Sektör sayfası
/de/vergleich/odoo-alternative/     → Karşılaştırma (GEO güçlü)
/de/blog/                           → Authority + GEO içerik
```

### İçerik Üretimi

- Katman 2 authority içerikler (kılavuzlar, karşılaştırmalar)
- Katman 3 GEO içerikler (AI soru-cevap formatı, Fact Block yapısı)
- Ekip/Hakkımızda sayfası (Person schema, E-E-A-T için)

### Backlink Stratejisi

- Alman IT blogları (az ama kaliteli)
- Mittelstand platformları (IHK Berlin, Bitkom)
- ERP karşılaştırma siteleri (saas-check.de, it-matchmaker.com)
- LinkedIn makaleleri (founder/CEO kaleminden)

Az ama kaliteli — spam link building Almanya pazarında zarar verir.

### Analitik Altyapı

- Google Search Console — Phase 2'de kurulacak (zorunlu)
- Bing Webmaster Tools — Phase 2'de kurulacak
- Plausible veya Matomo cookieless — opsiyonel, önerilen
- AI alıntı takibi: Otterly.ai veya manuel aylık test

---

## 14. Task Dosyaları (Bu Spec'ten Türetilen)

| Dosya | Kapsam | Öncelik |
|---|---|---|
| `docs/tasks/seo-technical-foundation.md` | robots.ts, sitemap.ts, metadataBase, trailing slash, 404 | 🔴 1 |
| `docs/tasks/seo-metadata.md` | generateMetadata, OG, Twitter Card, hreflang, canonical | 🔴 2 |
| `docs/tasks/seo-structured-data.md` | JSON-LD — Organization, WebSite, FAQPage, Service, BreadcrumbList | 🔴 3 |
| `docs/tasks/seo-performance.md` | next/font latin-ext, Image priority, CWV, dynamic imports | 🟡 4 |
| `docs/tasks/seo-security-headers.md` | next.config.ts headers, CSP Report-Only → enforce | 🟡 5 |
| `docs/tasks/seo-accessibility.md` | WCAG 2.1 AA audit, düzeltmeler, test süreci | 🟡 6 |
| `docs/tasks/legal-pages.md` | Impressum (§5 DDG) + Datenschutz, 3 dil, i18n | 🟡 7 |

---

## 15. Referanslar

- Google Search Central — hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google Search Central — Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- Princeton GEO Paper (KDD 2024): "Generative Engine Optimization" — Aggarwal et al.
- Next.js JSON-LD: https://nextjs.org/docs/app/guides/json-ld
- Next.js robots.txt: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Next.js sitemap.xml: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- DDG § 5 Impressum: https://www.e-recht24.de/impressum-generator.html
- DSGVO Art. 13: https://dsgvo-gesetz.de/art-13-dsgvo/
- Berliner Beauftragte für Datenschutz: https://www.datenschutz-berlin.de
