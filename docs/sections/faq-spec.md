# FAQ System — UX/UI Specification

**Rol:** UX/UI Designer  
**Tarih:** 2026-02-05  
**Versiyon:** 1.0  
**Durum:** Onaylandı ✅  
**Girdi:** FAQ Araştırma Raporu (Şubat 2026), Soluty wireframe v3.0, mevcut component'lar

---

## 1. Kapsam

Bu spesifikasyon iki bağımsız component'ı tanımlar:

| Component | Konum | Soru Sayısı | Amacı |
|-----------|-------|-------------|-------|
| **HomeFAQ** | Homepage, Final CTA'dan önce | 3 | Güven oluşturma + `/faq` yönlendirme |
| **FAQPage** | `/de/faq`, `/en/faq`, `/tr/faq` | 16 (4 kategori) | SEO/GEO + kapsamlı bilgi merkezi |

---

## 2. Homepage Mini-FAQ (HomeFAQ)

### 2.1 Konum ve İlişki

Homepage section sırasına ekleme:

```
Hero → Services → ERP Features → [Why Custom Software] → HomeFAQ → Final CTA
```

HomeFAQ, Final CTA'dan hemen önce yer alır. Ziyaretçinin karar aşamasındaki son tereddütlerini gidermek ve CTA'ya yumuşak geçiş sağlamak amacıyla konumlandırılmıştır.

### 2.2 İçerik Yapısı — 3 Soru

Seçim kriterleri: Ziyaretçinin "bana uygun mu?" sorusunu CTA öncesinde cevaplayarak dönüşüm sağlayan Awareness/Evaluation odaklı sorular.

| # | Soru (DE temsili) | Buyer Journey |
|---|-------------------|---------------|
| 1 | Braucht mein Unternehmen wirklich ein ERP-System? | Awareness |
| 2 | Was bringt Digitalisierung Lieferunternehmen? | Awareness |
| 3 | Standardsoftware oder individuelle Lösung — was ist sinnvoller? | Evaluation |

**Neden bu 3 soru:**
- "ERP gerekli mi?" → temel belirsizliği giderir
- "Dijitalleşme ne kazandırır?" → somut fayda gösterir
- "Hazır mı, özel mi?" → Soluty'nin USP'sine geçiş sağlar
- Bu üçlü, "evet, mantıklı / evet, faydalı / evet, özel daha iyi" akışıyla CTA'ya yönlendirir

### 2.3 Görsel Tasarım

**Arka plan:** `#FCFCFC` (bgPrimary — mevcut site arka planı ile tutarlı)

**Layout — Desktop (≥1024px):**

```
┌──────────────────────────────────────────────────────┐
│  max-w-3xl mx-auto, text-center                      │
│                                                       │
│  [Eyebrow — uppercase, brandPrimary]                 │
│  HÄUFIG GESTELLTE FRAGEN                              │
│                                                       │
│  [H2 — Crimson Pro, textPrimary]                     │
│  Antworten auf Ihre wichtigsten Fragen               │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │ ▸ Braucht mein Unternehmen wirklich ein ERP?    │ │
│  │   [Divider — 1px, #E5E5E3]                      │ │
│  │ ▸ Was bringt Digitalisierung Lieferunternehmen? │ │
│  │   [Divider — 1px, #E5E5E3]                      │ │
│  │ ▸ Standardsoftware oder individuelle Lösung?    │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  [Link → /faq — DM Sans, brandPrimary]               │
│  Alle Fragen und Antworten →                          │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Layout — Mobil (<1024px):**

Aynı yapı, `px-6` padding ile. Soru genişliği tam container.

### 2.4 Accordion Davranışı

- Tıklama ile açılır/kapanır (tek soru açık, diğerleri kapanır)
- İlk yüklemede tüm sorular kapalı
- HTML `<details>/<summary>` elementi ile uygulanır (JS bağımlılığı yok)
- Açma/kapama geçişi: `max-height` transition, 200ms ease

**Açık soru görünümü:**

```
┌─────────────────────────────────────────────────────┐
│ ▾ Braucht mein Unternehmen wirklich ein ERP?        │
│                                                      │
│   Wenn Bestellungen zunehmen, die Lagerverwaltung   │
│   komplexer wird und Teams mit unterschiedlichen    │
│   Tools arbeiten, wird ein ERP-System notwendig.    │
│   Ab diesem Punkt ist eine zentrale Lösung keine    │
│   Option mehr, sondern eine Voraussetzung.          │
│                                                      │
│   [Divider]                                          │
│ ▸ Was bringt Digitalisierung Lieferunternehmen?     │
│   [Divider]                                          │
│ ▸ Standardsoftware oder individuelle Lösung?        │
└─────────────────────────────────────────────────────┘
```

### 2.5 Tipografi ve Spacing

| Element | Font | Size (Desktop) | Size (Mobile) | Color | Weight |
|---------|------|---------------|---------------|-------|--------|
| Eyebrow | DM Sans | 12px / 0.75rem | 12px | `#4DB6A0` | 600 |
| H2 Başlık | Crimson Pro | heading-2 class | heading-2 class | `#32302F` | 400 |
| Soru metni | DM Sans | 18px / 1.125rem | 16px / 1rem | `#32302F` | 500 |
| Cevap metni | DM Sans | 16px / 1rem | 15px / 0.9375rem | `#5C5A58` | 400 |
| Link CTA | DM Sans | 16px / 1rem | 16px | `#4DB6A0` | 500 |

| Spacing | Değer |
|---------|-------|
| Section padding-y | `py-16 lg:py-24` |
| Eyebrow → H2 | `mb-4` |
| H2 → Soru listesi | `mt-10` |
| Soru satırları arası | `0` (divider ile ayrılır) |
| Soru tıklama alanı padding | `py-5` |
| Soru → Cevap arası | `pb-5` (açıkken) |
| Soru listesi → Link CTA | `mt-8` |

### 2.6 Etkileşim Detayları

- Soru satırı tam genişliğinde tıklanabilir (sadece metin değil)
- Chevron ikonu (▸/▾): sağ tarafta, 20×20px, `#5C5A58`
- Hover state: soru metni `#32302F` → `#4DB6A0` (color transition 150ms)
- Focus state: outline `2px solid #4DB6A0`, offset 2px
- Link CTA hover: underline

### 2.7 Schema Markup

Homepage FAQ'da **schema markup UYGULANMAZ**. Gerekçe: Google, FAQPage schema'yı yalnızca sayfanın birincil amacı FAQ olan sayfalarda önerir. Homepage'in birincil amacı değer önerisi sunmaktır.

### 2.8 i18n Anahtarları

```json
{
  "homeFaq": {
    "eyebrow": "Häufig gestellte Fragen",
    "headline": "Antworten auf Ihre wichtigsten Fragen",
    "linkToFaq": "Alle Fragen und Antworten",
    "items": {
      "erpNeeded": {
        "question": "Braucht mein Unternehmen wirklich ein ERP-System?",
        "answer": "..."
      },
      "digitalization": {
        "question": "Was bringt Digitalisierung Lieferunternehmen?",
        "answer": "..."
      },
      "standardVsCustom": {
        "question": "Standardsoftware oder individuelle Lösung — was ist sinnvoller?",
        "answer": "..."
      }
    }
  }
}
```

TR ve EN anahtarları aynı yapıda, içerik dile uygun orijinal sorularla.

---

## 3. Detaylı FAQ Sayfası (FAQPage)

### 3.1 URL Yapısı

| Dil | URL |
|-----|-----|
| DE | `/de/faq` |
| EN | `/en/faq` |
| TR | `/tr/faq` |

### 3.2 Sayfa Amacı

SEO/GEO ana merkezi. LLM alıntılanması için optimize edilmiş, kapsamlı soru-cevap sayfası. Google Featured Snippet ve AI arama motorları (ChatGPT, Perplexity, Gemini) için yapılandırılmış.

### 3.3 İçerik Yapısı — 16 Soru, 4 Kategori

| Kategori | Soru Sayısı | Buyer Journey |
|----------|-------------|---------------|
| A — Genel ERP & Dijitalleşme | 4 | Awareness |
| B — Maliyet, Süre ve Teknik | 5 | Evaluation |
| C — Güvenlik & Yasal | 3 | Evaluation |
| D — Soluty ile Çalışma | 4 | Decision |

**Soru listesi (DE temsili — TR ve EN bağımsız içerikle):**

**A) Genel ERP & Dijitalleşme**
1. ERP sistemi nedir ve ne işe yarar?
2. Şirketim için ERP gerçekten gerekli mi?
3. Excel ne zaman yetersiz kalır?
4. Dijitalleşme teslimat şirketlerine ne kazandırır?

**B) Maliyet, Süre ve Teknik**
5. Özel ERP yazılımı ne kadara mal olur?
6. ERP geliştirme süreci ne kadar sürer?
7. Hazır ERP mi, özel ERP mi daha mantıklı?
8. ERP modülleri nelerden oluşur?
9. Mevcut sistemlerimle entegrasyon mümkün mü?

**C) Güvenlik & Yasal**
10. ERP sistemi DSGVO (GDPR) uyumlu olabilir mi?
11. Veriler nerede saklanır?
12. Kullanıcı yetkileri nasıl yönetilir?

**D) Soluty ile Çalışma**
13. Soluty ile bir ERP projesi nasıl başlar?
14. Geliştirme sürecinde müşteri ne kadar dahil olur?
15. Go-live sonrası destek var mı?
16. Soluty neden Almanya merkezli bir ERP sunuyor?

### 3.4 Cevap Yapısı — Answer Capsule Formatı

Her cevap iki katmanlı yapıda yazılır:

```
[H3 — Soru]
[Paragraf 1 — Answer Capsule: 40-60 kelime, bağımsız, link yok]
[Paragraf 2 — Genişletilmiş bağlam: 80-120 kelime, internal linkler burada]
```

**Toplam cevap uzunluğu:** 120-180 kelime (araştırmanın gösterdiği optimal aralık)

**Answer capsule kuralları:**
- Kendi başına anlamlı bir bilgi birimi
- İçinde link yok (AI alıntılama için kritik)
- En az bir somut bilgi (sayı, süre, maliyet aralığı)
- Sorunun anahtar kelimelerini ilk cümlede tekrarlar

### 3.5 Görsel Tasarım — Sayfa Düzeni

**Arka plan:** `#FCFCFC` (bgPrimary)

**Layout — Desktop (≥1024px):**

```
┌──────────────────────────────────────────────────────────────┐
│  Header (site-wide)                                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Breadcrumb: Home > FAQ                                       │
│  [DM Sans, 14px, #5C5A58]                                    │
│                                                               │
│  ┌─────────────────┬────────────────────────────────────────┐│
│  │                 │                                         ││
│  │  SIDE NAV       │  MAIN CONTENT                          ││
│  │  (Sticky)       │                                         ││
│  │                 │  [H1] Häufig gestellte Fragen           ││
│  │  ▪ Grundlagen   │                                         ││
│  │  ▪ Kosten &     │  [Intro paragraph — 2-3 cümle]         ││
│  │    Technik      │                                         ││
│  │  ▪ Sicherheit   │  [Last updated: DD.MM.YYYY]            ││
│  │  ▪ Zusammen-    │                                         ││
│  │    arbeit       │  ─────────────────────────────          ││
│  │                 │                                         ││
│  │  w: 220px       │  [H2] Grundlagen: ERP und               ││
│  │  sticky top-24  │       Digitalisierung                   ││
│  │                 │                                         ││
│  │                 │  [H3] Was ist ein ERP-System...?        ││
│  │                 │  [Answer capsule]                        ││
│  │                 │  [Extended context]                      ││
│  │                 │                                         ││
│  │                 │  [H3] Braucht mein Lieferdienst...?     ││
│  │                 │  [Answer capsule]                        ││
│  │                 │  [Extended context]                      ││
│  │                 │                                         ││
│  │                 │  ... (devam)                             ││
│  │                 │                                         ││
│  │                 │  ─────────────────────────────          ││
│  │                 │                                         ││
│  │                 │  [CTA Banner]                            ││
│  │                 │  Noch Fragen? → Kontakt                 ││
│  │                 │                                         ││
│  └─────────────────┴────────────────────────────────────────┘│
│                                                               │
├──────────────────────────────────────────────────────────────┤
│  Footer (site-wide)                                           │
└──────────────────────────────────────────────────────────────┘
```

**Layout — Mobil (<1024px):**

```
┌──────────────────────────────┐
│  Header                       │
├──────────────────────────────┤
│                               │
│  Breadcrumb: Home > FAQ       │
│                               │
│  [H1] Häufig gestellte       │
│       Fragen                  │
│                               │
│  [Intro paragraph]           │
│  [Last updated]              │
│                               │
│  ┌──────────────────────────┐│
│  │ Kategori Tabs (scroll)   ││
│  │ [Grundl.] [Kosten] ...   ││
│  └──────────────────────────┘│
│                               │
│  [H2] Grundlagen              │
│                               │
│  ┌──────────────────────────┐│
│  │ ▸ Was ist ein ERP-System?││
│  │──────────────────────────││
│  │ ▸ Braucht mein Liefer... ││
│  │──────────────────────────││
│  │ ▸ Excel ne zaman...      ││
│  │──────────────────────────││
│  │ ▸ Dijitalleşme ne...     ││
│  └──────────────────────────┘│
│                               │
│  ... (diğer kategoriler)     │
│                               │
│  [CTA Banner]                │
│                               │
├──────────────────────────────┤
│  Footer                       │
└──────────────────────────────┘
```

### 3.6 Desktop: Tüm Cevaplar Açık

**Kritik tasarım kararı:** Desktop'ta accordion yok — tüm cevaplar her zaman görünür.

**Gerekçe:**
- AI crawler'lar tüm içeriği doğrudan okuyabilir (gizli içerik riski yok)
- B2B ziyaretçileri sayfayı tarar, tıklamaktan kaçınır
- Side nav ile navigasyon sağlanır, accordion gereksiz
- SEO açısından tüm içerik ilk render'da mevcut

### 3.7 Mobil: Accordion

**Mobil'de accordion aktif.** Gerekçe:
- 16 sorunun tüm cevapları açık olduğunda sayfa aşırı uzar
- Mobil kullanıcılar hedeflediği soruya hızla ulaşmak ister
- `<details>/<summary>` ile JS bağımlılığı yok

**Accordion davranışı:**
- Tıklama ile açılır/kapanır
- Birden fazla soru aynı anda açık olabilir (bağımsız toggle)
- Açma/kapama: CSS `max-height` transition, 200ms ease
- İlk yüklemede tüm sorular kapalı

### 3.8 Side Navigation (Desktop)

- Konum: Sol taraf, `sticky top-24`
- Genişlik: `w-56` (224px)
- İçerik: 4 kategori bağlantısı
- Aktif kategori: `color: #4DB6A0`, `font-weight: 600`, sol border `2px solid #4DB6A0`
- Scroll davranışı: Sayfa kaydırıldıkça aktif kategori güncellenir (IntersectionObserver)
- Mobilde gizli (`hidden lg:block`)

### 3.9 Mobil Kategori Tab'ları

- Konum: H1 ve intro'nun altında, horizontal scroll
- Sticky: `sticky top-16` (header yüksekliğinin altında)
- Arka plan: `#FCFCFC` (sayfa arka planı ile aynı, blur yok)
- Aktif tab: `color: #4DB6A0`, `border-bottom: 2px solid #4DB6A0`
- İnaktif tab: `color: #5C5A58`
- Tıklama: İlgili kategoriye smooth scroll

### 3.10 Tipografi ve Spacing

| Element | Font | Size (Desktop) | Size (Mobile) | Color | Weight |
|---------|------|---------------|---------------|-------|--------|
| Breadcrumb | DM Sans | 14px | 13px | `#5C5A58` | 400 |
| H1 | Crimson Pro | heading-1 class | heading-1 class | `#32302F` | 400 |
| Intro text | DM Sans | 18px | 16px | `#5C5A58` | 400 |
| Güncelleme tarihi | DM Sans | 13px | 13px | `#5C5A58` opacity 0.6 | 400 |
| Side nav item | DM Sans | 15px | — | `#5C5A58` / `#4DB6A0` aktif | 400 / 600 |
| Mobil tab | DM Sans | 14px | 14px | `#5C5A58` / `#4DB6A0` | 500 |
| H2 kategori | Crimson Pro | 28px | 24px | `#32302F` | 400 |
| H3 soru | DM Sans | 18px | 16px | `#32302F` | 500 |
| Answer capsule | DM Sans | 16px | 15px | `#5C5A58` | 400 |
| Extended context | DM Sans | 16px | 15px | `#5C5A58` | 400 |
| Internal link (bağlam içi) | DM Sans | 16px | 15px | `#4DB6A0` | 500 |

| Spacing | Değer |
|---------|-------|
| Breadcrumb → H1 | `mt-4` |
| H1 → Intro | `mt-4` |
| Intro → Güncelleme tarihi | `mt-2` |
| Güncelleme tarihi → İlk H2 | `mt-12` |
| H2 → İlk H3 | `mt-8` |
| H3 → Answer capsule | `mt-3` |
| Answer capsule → Extended context | `mt-3` |
| Soru blokları arası | `mt-10` (desktop), `0` + divider (mobil accordion) |
| Kategoriler arası | `mt-16` |
| Son kategori → CTA banner | `mt-16` |
| Side nav → Main content gap | `gap-12` (grid) |

### 3.11 CTA Banner (Sayfa Sonu)

Sayfanın altında, son kategoriden sonra yer alır.

```
┌──────────────────────────────────────────────────────┐
│                                                       │
│  Keine Antwort gefunden?                             │
│  Sprechen Sie direkt mit unserem Team.               │
│                                                       │
│  [Button: Kostenlos beraten lassen]                  │
│                                                       │
└──────────────────────────────────────────────────────┘
```

- Arka plan: `#F5F5F3` (hafif gri, section ayrımı)
- Border radius: `16px`
- Padding: `p-8 lg:p-12`
- Başlık: DM Sans, 20px, `#32302F`, font-weight 600
- Alt metin: DM Sans, 16px, `#5C5A58`
- Button: Mevcut site CTA stili ile tutarlı (`#4DB6A0` bg, beyaz metin)

### 3.12 HTML Semantik Yapı

```html
<main>
  <nav aria-label="Breadcrumb">
    <ol>
      <li><a href="/">Home</a></li>
      <li aria-current="page">FAQ</li>
    </ol>
  </nav>

  <article>
    <h1>Häufig gestellte Fragen</h1>
    <p>[Intro]</p>
    <time datetime="2026-02-05">Zuletzt aktualisiert: 05.02.2026</time>

    <!-- Kategori A -->
    <section id="grundlagen" aria-labelledby="grundlagen-heading">
      <h2 id="grundlagen-heading">Grundlagen: ERP und Digitalisierung</h2>

      <article>
        <h3>Was ist ein ERP-System und wofür wird es eingesetzt?</h3>
        <p>[Answer capsule — link yok]</p>
        <p>[Extended context — internal linkler burada]</p>
      </article>

      <article>
        <h3>Braucht mein Lieferdienst eine eigene ERP-Software?</h3>
        <p>[Answer capsule]</p>
        <p>[Extended context]</p>
      </article>

      <!-- ... -->
    </section>

    <!-- Kategori B, C, D aynı yapıda -->
  </article>
</main>
```

### 3.13 FAQPage Schema Markup (JSON-LD)

Her dil sayfası için ayrı uygulama:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Sorunun tam metni]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer capsule + Extended context birleşik metin]"
      }
    }
  ]
}
```

**Kurallar:**
- Schema içindeki metin, sayfa üzerindeki görünür metinle birebir eşleşmeli
- JSON-LD formatında, `<head>` içinde veya `<script type="application/ld+json">`
- 16 sorunun tamamı dahil

**Ek schema'lar:**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://soluty.de/de" },
    { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://soluty.de/de/faq" }
  ]
}
```

### 3.14 Meta Veriler

| Meta | DE | EN | TR |
|------|----|----|-----|
| Title | Häufig gestellte Fragen — Soluty GmbH \| Individuelle ERP-Software | FAQ — Soluty GmbH \| Custom ERP Software | Sıkça Sorulan Sorular — Soluty GmbH \| Özel ERP Yazılımı |
| Description | Antworten auf die häufigsten Fragen zu individueller ERP-Entwicklung: Kosten, Zeitrahmen, Module und DSGVO-Konformität. | Answers to common questions about custom ERP development: costs, timelines, modules, and GDPR compliance. | Özel ERP geliştirme hakkında sıkça sorulan sorular: maliyet, süre, modüller ve DSGVO uyumluluğu. |
| Canonical | `https://soluty.de/de/faq` | `https://soluty.de/en/faq` | `https://soluty.de/tr/faq` |

Hreflang: Her sayfa üç dil referansını karşılıklı olarak içerir.

---

## 4. Erişilebilirlik Gereksinimleri

### 4.1 Genel (Her İki Component)

- Tüm interaktif elementler klavye ile erişilebilir (Tab, Enter, Space)
- Focus state: `outline: 2px solid #4DB6A0`, `outline-offset: 2px`
- Renk kontrastı: WCAG 2.1 AA minimum (4.5:1 metin, 3:1 büyük metin)
- Screen reader'lar için anlamlı ARIA etiketleri

### 4.2 Accordion (HomeFAQ + FAQPage mobil)

- `<details>/<summary>` kullanımı → native browser a11y desteği
- `aria-expanded` durumu otomatik yönetilir (native element)
- Chevron ikonu `aria-hidden="true"`

### 4.3 Side Navigation (FAQPage desktop)

- `<nav aria-label="FAQ-Kategorien">`
- Aktif kategori: `aria-current="true"`
- Scroll spy ile aktif durumun güncellenmesi

### 4.4 Breadcrumb

- `<nav aria-label="Breadcrumb">`
- `<ol>` yapısı ile sıralı liste
- Aktif sayfa: `aria-current="page"`

---

## 5. Responsive Breakpoint Tanımları

| Breakpoint | Değer | HomeFAQ | FAQPage |
|------------|-------|---------|---------|
| Mobile | < 768px | Full width, accordion | Accordion, sticky tab'lar, side nav gizli |
| Tablet | 768px–1023px | Full width, accordion | Accordion, sticky tab'lar, side nav gizli |
| Desktop | ≥ 1024px | Centered max-w-3xl, accordion | Side nav + main content grid, cevaplar açık |

---

## 6. Performans Kısıtlamaları

- Sayfa görsel içermez (metin ağırlıklı) → LCP < 1.5s hedefi
- Accordion açılışlarında layout shift olmamalı → CLS < 0.05
- `<details>/<summary>` native browser desteği → JS bundle etkisi sıfır
- IntersectionObserver (side nav scroll spy) → tek küçük client component

---

## 7. i18n Yapısı

### 7.1 Translation Key Yapısı (FAQPage)

```json
{
  "faqPage": {
    "breadcrumb": { "home": "Startseite", "faq": "FAQ" },
    "meta": {
      "title": "Häufig gestellte Fragen — Soluty GmbH",
      "description": "..."
    },
    "headline": "Häufig gestellte Fragen",
    "intro": "Diese Seite beantwortet die häufigsten Fragen...",
    "lastUpdated": "Zuletzt aktualisiert",
    "categories": {
      "basics": {
        "title": "Grundlagen: ERP und Digitalisierung",
        "navLabel": "Grundlagen"
      },
      "costAndTech": {
        "title": "Kosten, Zeitrahmen und Technik",
        "navLabel": "Kosten & Technik"
      },
      "security": {
        "title": "Sicherheit und rechtliche Anforderungen",
        "navLabel": "Sicherheit"
      },
      "collaboration": {
        "title": "Zusammenarbeit mit Soluty",
        "navLabel": "Zusammenarbeit"
      }
    },
    "questions": {
      "q01": {
        "question": "Was ist ein ERP-System und wofür wird es eingesetzt?",
        "answerCapsule": "...",
        "answerExtended": "..."
      },
      "q02": { "...": "..." }
    },
    "ctaBanner": {
      "headline": "Keine Antwort gefunden?",
      "subtext": "Sprechen Sie direkt mit unserem Team.",
      "button": "Kostenlos beraten lassen"
    }
  }
}
```

### 7.2 Üç Dil = Üç Bağımsız İçerik

Her dil çeviri değil, o dilin arama davranışına uygun orijinal sorular içerir. Soru sayıları eşit (16), kategoriler aynı, ancak soru ifadeleri ve cevap içerikleri dile özgü.

---

## 8. Component Mimarisi Özeti

```
app/[locale]/
├── components/
│   └── HomeFAQ/
│       └── index.tsx          ← Server component
│
├── faq/
│   └── page.tsx               ← FAQ sayfası (server component)
│
app/[locale]/components/
├── FAQPage/
│   ├── index.tsx              ← Ana layout (server component)
│   ├── FAQSideNav.tsx         ← Desktop side nav (client — IntersectionObserver)
│   ├── FAQMobileTabs.tsx      ← Mobil sticky tab'lar (client — scroll + click)
│   ├── FAQCategory.tsx        ← Kategori wrapper (server)
│   ├── FAQItem.tsx            ← Tek soru-cevap (server)
│   ├── FAQItemMobile.tsx      ← Mobil accordion soru-cevap (server — details/summary)
│   └── FAQCtaBanner.tsx       ← Sayfa sonu CTA (server)
```

**Not:** Bu component yapısı bir önerdir. Web Developer, implementasyon sırasında teknik gerekçeyle değiştirebilir.

---

## 9. Onay Durumu

| # | Madde | Durum |
|---|-------|-------|
| 1 | Homepage'de 3 soru (ERP gerekli mi, dijitalleşme faydası, hazır vs özel) | ✅ Onaylandı |
| 2 | FAQ sayfasında 16 soru, 4 kategori yapısı | ✅ Onaylandı |
| 3 | Desktop'ta cevaplar açık / Mobil'de accordion | ✅ Onaylandı |
| 4 | Side nav (desktop) + sticky tab'lar (mobil) navigasyon | ✅ Onaylandı |
| 5 | Answer capsule formatı (40-60 kelime + genişletilmiş bağlam) | ✅ Onaylandı |
| 6 | FAQPage schema markup uygulanması | ✅ Onaylandı |
| 7 | Component mimarisi | ✅ Onaylandı |

**Onay tarihi:** 2026-02-05  
**Sonraki adım:** FAQ içerik oluşturma (Researcher rolü) veya implementasyon (Web Developer rolü)