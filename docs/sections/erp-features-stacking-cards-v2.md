# ERP Features Section — Stacking Cards Spec v2.0

**Status:** Approved  
**Version:** 2.0  
**Date:** February 2026  
**Role:** UX/UI Designer  
**Supersedes:** `erp-features-section-spec.md` v1.0 (kart gösterim yöntemi değişiyor)  
**Reference:** Dataforest.ai stacking process cards + Soluty mevcut kart UI (screenshot)

---

## 1. Değişiklik Özeti

### v1.0 → v2.0: Ne Değişiyor

| Aspect | v1.0 (Stripe Two-Column) | v2.0 (Stacking Cards) |
|--------|--------------------------|----------------------|
| Sol sütun | Modül kartları (scroll) | Stacking modül kartları (`position: sticky`) |
| Sağ sütun | Sticky ModuleGrid | Sticky ModuleGrid **(değişmedi)** |
| Kart gösterimi | Dikey liste, tümü görünür, active/inactive states | `position: sticky` ile üst üste yığılma |
| Scroll etkileşimi | IntersectionObserver → active kart → grid highlight | CSS sticky stacking + IntersectionObserver (grid highlight korunuyor) |
| Kart gölge efekti | Yok | Eğik gölge katmanı (card-bg, rotate -1.75°) |
| İkon rengi | Gri (default), kategori rengi (active) | Brand-primary (#4DB6A0) — tüm kartlar |

### Değişmeyen Öğeler

- **ModuleGrid:** Sağ sütunda sticky olarak kalıyor
- **Scroll-linked highlight:** Aktif kart → ModuleGrid'de ilgili modül/grup vurgulanır (v1.0 mapping korunuyor)
- 13 modül tanımı (ID, ikon, kategori, çeviri anahtarları)
- Kategori renk sistemi (6 kategori)
- i18n çeviri yapısı (DE/EN/TR)
- Erişilebilirlik gereksinimleri (WCAG 2.1 AA)

---

## 2. Proje Sahibi Kararları

| # | Soru | Karar |
|---|------|-------|
| 1 | ModuleGrid nereye? | Sağ sütunda kalıyor — mevcut yapı korunuyor |
| 2 | Eğik gölge (card-bg, rotate -1.75°) | Evet — ekleniyor |
| 3 | İkon rengi | Brand-primary (#4DB6A0) — tüm kartlarda aynı |
| 4 | Sol sütunda CTA | Evet — "Beratung anfragen" gösterilecek |

---

## 3. Genel Yapı

### 3.1 Section Layout — Desktop (≥1024px)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                            max-width: 1280px                                      │
│                            margin: 0 auto                                         │
│                            padding: 96px 64px                                     │
│                                                                                   │
│  ┌────────────────────────────────────────────────────────────────────────────┐   │
│  │                      Section Header (centered)                              │   │
│  │   Eyebrow: "ERP-MODULE"                                                    │   │
│  │   Headline: "Alle Werkzeuge für Ihr Liefergeschäft..."                     │   │
│  │   Subheadline: "Von der Auftragserfassung..."                              │   │
│  │                      margin-bottom: 64px                                    │   │
│  └────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                   │
│  ┌───────────────────────────────────────────┬────────────────────────────────┐   │
│  │   SOL SÜTUN (Stacking Cards)              │  SAĞ SÜTUN (Sticky ModuleGrid)│   │
│  │   flex: 1                                  │  width: 520px                  │   │
│  │                                            │  flex-shrink: 0                │   │
│  │                                            │  position: sticky              │   │
│  │  ┌──────────────────────────────────────┐  │  top: 96px                     │   │
│  │  │  KART 1 — Aufträge                   │  │                                │   │
│  │  │  position: sticky, top: 96px         │  │  ┌────────────────────────┐    │   │
│  │  │  ┌─ card-bg (rotated shadow) ─────┐  │  │  │                        │    │   │
│  │  │  │  ┌─ card-content ────────────┐  │  │  │  │    ModuleGrid         │    │   │
│  │  │  │  │ icon  Title    [Badge]    │  │  │  │  │    Component          │    │   │
│  │  │  │  │ Description...            │  │  │  │  │                        │    │   │
│  │  │  │  └───────────────────────────┘  │  │  │  │  (scroll-linked        │    │   │
│  │  │  └─────────────────────────────────┘  │  │  │   highlighting)        │    │   │
│  │  └──────────────────────────────────────┘  │  │  │                        │    │   │
│  │           gap: 32px                        │  │  │                        │    │   │
│  │  ┌──────────────────────────────────────┐  │  │  └────────────────────────┘    │   │
│  │  │  KART 2 — Verkauf                    │  │  │                                │   │
│  │  │  position: sticky, top: 96px         │  │  │                                │   │
│  │  └──────────────────────────────────────┘  │  │                                │   │
│  │           gap: 32px                        │  │                                │   │
│  │  ┌──────────────────────────────────────┐  │  │                                │   │
│  │  │  KART 3 — Planung                    │  │  │                                │   │
│  │  └──────────────────────────────────────┘  │  │                                │   │
│  │           ...                              │  │                                │   │
│  │  ┌──────────────────────────────────────┐  │  │                                │   │
│  │  │  KART 13 — Ausgaben                  │  │  │                                │   │
│  │  └──────────────────────────────────────┘  │  │                                │   │
│  │                                            │  │                                │   │
│  └───────────────────────────────────────────┴────────────────────────────────┘   │
│                                                                                   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Tablet (768px–1023px)

```
┌──────────────────────────────────────────┐
│           padding: 64px 32px              │
│                                          │
│     Section Header (centered, full-w)    │
│           margin-bottom: 48px            │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  ModuleGrid (centered, scale 0.85)│  │
│  │  Tüm modüller aktif, auto-cycle   │  │
│  │  margin-bottom: 48px              │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  Kart listesi (stacking)          │  │
│  │  Tek sütun, full-width            │  │
│  │  position: sticky, top: 88px      │  │
│  │  gap: 28px                        │  │
│  └────────────────────────────────────┘  │
│                                          │
└──────────────────────────────────────────┘

Note: İki sütun kalkıyor → stacked.
Sticky stacking korunuyor.
ModuleGrid scroll-link kapalı (tüm modüller aktif).
```

### 3.3 Mobile (<768px)

```
┌────────────────────────────────┐
│        padding: 48px 20px      │
│                                │
│   Section Header (centered)    │
│       margin-bottom: 32px      │
│                                │
│  ┌──────────────────────────┐  │
│  │  ModuleGrid (4×6 mobile) │  │
│  │  Tüm modüller aktif      │  │
│  │  margin-bottom: 32px     │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │  Kart listesi (stacking) │  │
│  │  position: sticky         │  │
│  │  top: 80px               │  │
│  │  gap: 24px               │  │
│  └──────────────────────────┘  │
│                                │
└────────────────────────────────┘
```

---

## 4. Stacking Mekanizması — Teknik Detay

### 4.1 Temel Prensip

Her modül kartı `position: sticky` ve aynı `top` değerine sahiptir. Kullanıcı aşağı scroll ettikçe her yeni kart viewport'ta aynı noktaya yapışır ve DOM sırasında sonraki kart öncekinin **üzerine** yığılır.

```
Scroll ilerlediğinde:

   top: 96px ──────►  ┌─────────────┐
                       │  KART 1     │ ← sticky'de kalıyor
                       └─────────────┘
                       ┌─────────────┐
                       │  KART 2     │ ← kart 1'in üstüne oturdu
                       └─────────────┘
                            ...
                       ┌─────────────┐
                       │  KART 5     │ ← henüz yapışmadı, doğal konumda
                       └─────────────┘
```

### 4.2 Neden Çalışıyor

- DOM sıralamasında sonraki elementler aynı `z-index`'te daha üste render edilir
- `position: sticky` elemanlar container içindeki doğal flow'larını korur
- Container toplam yüksekliği = tüm kartlar + gap'ler → yeterli scroll mesafesi sağlar
- Gap, stacking sırasında alttaki kartın üst kenarının kısaca görünmesini sağlar

### 4.3 Sticky Top Hesaplaması

```
Header height:     72px (desktop), 64px (tablet/mobile)
Top spacing:       24px (desktop/tablet), 16px (mobile)
─────────────────────────────────────────────
Desktop top:       96px
Tablet top:        88px
Mobile top:        80px
```

### 4.4 Sol Sütun Container CSS

```css
/* Sol sütun — stacking kartlar */
.erp-features__left {
  flex: 1;
  min-width: 0;
}

/* Kart wrapper */
.erp-features__cards {
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
  overflow: visible;
}

/* Her kart — STACKING MEKANİZMASININ KALBİ */
.erp-stacking-card {
  position: sticky;
  top: 96px; /* = header + spacing */
}
```

### 4.5 Sağ Sütun — Sticky ModuleGrid (v1.0'dan korunuyor)

```css
.erp-features__right {
  width: 520px;
  flex-shrink: 0;
  position: sticky;
  top: 96px;
  align-self: flex-start;
}
```

### 4.6 Container Yükseklik Tahmini

```
13 kart × ~200px ortalama yükseklik = ~2600px
12 gap × 32px = ~384px
Toplam sol sütun: ~2984px

Sağ sticky ModuleGrid yüksekliği: ~600px
Stacking scroll mesafesi: ~2984px - viewport ≈ ~2184px
```

ModuleGrid, stacking kartları scroll edilirken yaklaşık ~2184px boyunca ekranda sabit kalır.

---

## 5. Kart Tasarımı

### 5.1 Kart Anatomisi — Katmanlı Yapı

Her kart iki katmandan oluşur: **card-bg** (eğik gölge) ve **card-content** (asıl içerik).

```
┌─ .erp-stacking-card (position: sticky, top: 96px) ─────────────────┐
│                                                                      │
│  ┌─ .card-bg ──────────────────────────────────────────────────┐    │
│  │  position: absolute                                          │    │
│  │  inset: 0                                                    │    │
│  │  z-index: -1                                                 │    │
│  │  background: white                                           │    │
│  │  border: 1px solid var(--color-border)                       │    │
│  │  border-radius: 20px                                         │    │
│  │  transform: rotate(-1.75deg)                                 │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌─ .card-content ──────────────────────────────────────────────┐   │
│  │  position: relative                                           │   │
│  │  background: white                                            │   │
│  │  border: 1px solid var(--color-border)                        │   │
│  │  border-radius: 20px                                          │   │
│  │  padding: 32px                                                │   │
│  │                                                                │   │
│  │  ROW 1: flex, justify-between, align-center                   │   │
│  │  ┌────────────────────────────┐  ┌──────────────────────┐    │   │
│  │  │ ┌──────┐  Title            │  │   Category Badge     │    │   │
│  │  │ │ Icon │  (heading-4)      │  │   (pill, sağ taraf)  │    │   │
│  │  │ │48×48 │                   │  │                      │    │   │
│  │  │ │ #4DB6A0                  │  └──────────────────────┘    │   │
│  │  │ └──────┘                   │                               │   │
│  │  └────────────────────────────┘                               │   │
│  │                                                                │   │
│  │  gap: 16px                                                    │   │
│  │                                                                │   │
│  │  ROW 2: Description                                           │   │
│  │  ┌────────────────────────────────────────────────────────┐   │   │
│  │  │  Alle Aufträge zentral erfassen, verwalten und         │   │   │
│  │  │  verfolgen. Vom Eingang bis zur Auslieferung —         │   │   │
│  │  │  mit Echtzeit-Statusaktualisierung.                    │   │   │
│  │  └────────────────────────────────────────────────────────┘   │   │
│  │                                                                │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### 5.2 Eğik Gölge Katmanı (card-bg)

Dataforest referansından alınan derinlik efekti. Her kartın arkasında hafif eğik beyaz dikdörtgen, "kart destesi" illüzyonu yaratır.

```css
.card-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: white;
  border: 1px solid var(--color-border); /* rgba(50,48,47,0.12) */
  border-radius: 20px;
  transform: rotate(-1.75deg);
  pointer-events: none;
}
```

### 5.3 Kart İçerik Katmanı (card-content)

```css
.card-content {
  position: relative;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 32px;
  transition: box-shadow 250ms ease;
}

.card-content:hover {
  box-shadow: 0 4px 16px rgba(50, 48, 47, 0.08);
}
```

### 5.4 Kart Boyutları

| Property | Desktop (≥1024px) | Tablet (768–1023px) | Mobile (<768px) |
|----------|-------------------|---------------------|-----------------|
| Padding | 32px | 28px | 24px |
| Border radius | 20px | 18px | 16px |
| Icon size | 48px | 44px | 40px |
| Icon-title gap | 12px | 12px | 10px |
| Row 1-Row 2 gap | 16px | 14px | 12px |
| Border | 1px solid var(--color-border) | same | same |
| Background | white | white | white |
| card-bg rotation | -1.75deg | -1.75deg | -1.5deg |

### 5.5 Kart Tipografisi

| Element | Font | Size (Desktop) | Size (Tablet) | Size (Mobile) | Weight | Color |
|---------|------|----------------|---------------|---------------|--------|-------|
| Title | --font-serif | 22px | 20px | 18px | 500 | --color-text-primary |
| Description | --font-sans | 15px | 14px | 14px | 400 | --color-text-secondary |
| Category Badge | --font-sans | 13px | 12px | 12px | 500 | Kategori rengi |

### 5.6 İkon Rengi

Tüm kartlardaki ikonlar brand-primary renginde:

```css
.erp-card__icon {
  width: 48px;
  height: 48px;
  color: var(--color-brand-primary); /* #4DB6A0 */
  stroke-width: 1.5;
  flex-shrink: 0;
}
```

### 5.7 Category Badge Stilleri

v1.0'dan aynen korunuyor:

```css
.erp-card__badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 14px;
  border-radius: 9999px;
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

/* Kategori renkleri */
.erp-card__badge--order       { background: rgba(77, 182, 160, 0.10);  color: #4DB6A0; }
.erp-card__badge--logistics   { background: rgba(139, 92, 246, 0.10);  color: #8B5CF6; }
.erp-card__badge--sales       { background: rgba(59, 130, 246, 0.10);  color: #3B82F6; }
.erp-card__badge--inventory   { background: rgba(245, 158, 11, 0.10);  color: #F59E0B; }
.erp-card__badge--finance     { background: rgba(16, 185, 129, 0.10);  color: #10B981; }
.erp-card__badge--customer    { background: rgba(236, 72, 153, 0.10);  color: #EC4899; }
```

---

## 6. Scroll-Linked Interaction (Desktop Only)

### 6.1 Davranış — v1.0'dan Korunuyor

ModuleGrid sağ sütunda sticky olarak duruyor. Sol sütundaki stacking kartlardan hangisi en üstte (viewport center'a en yakın) ise, ModuleGrid'de ilgili modül/grup vurgulanır.

Tek fark: v1.0'da kartlar scroll edildikçe active/inactive opacity durumu vardı. v2.0'da buna gerek yok çünkü en üstteki kart zaten doğal olarak "aktif" — alttakiler gizlenmiş durumda.

### 6.2 IntersectionObserver — Sadece Grid Highlight İçin

```typescript
// Stacking pattern'da IntersectionObserver SADECE ModuleGrid highlight için kullanılır
// Kart active/inactive state yönetimi YOK — CSS sticky bunu doğal olarak yapar

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
        const moduleId = entry.target.dataset.moduleId;
        setActiveModuleForGrid(moduleId);
        // ModuleGrid'de ilgili modül/grubu vurgula
      }
    });
  },
  {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
  }
);
```

### 6.3 ModuleGrid Integration

v1.0'daki ModuleGrid props yapısı korunuyor:

```typescript
interface ModuleGridProps {
  activeGroupId?: number;
  highlightMode?: 'auto-cycle' | 'scroll-linked';
  highlightTargets?: string[];
}
```

### 6.4 Module → Grid Mapping

v1.0'daki mapping aynen korunuyor (erp-features-section-spec.md Section 2.3).

---

## 7. Modül Envanteri

v1.0'dan **aynen korunur.** 13 modül, 6 kategori:

| # | ID | Icon (Lucide) | Category |
|---|-----|---------------|----------|
| 1 | orders | ClipboardList | Order Management |
| 2 | sales | BadgeDollarSign | Sales & Billing |
| 3 | planning | CalendarDays | Logistics |
| 4 | route | Route | Logistics |
| 5 | crm | Users | Customer |
| 6 | warehouse | Warehouse | Inventory |
| 7 | products | Package | Inventory |
| 8 | delivery | Truck | Logistics |
| 9 | cashbox | Banknote | Finance |
| 10 | waybillInvoice | FileText | Sales & Billing |
| 11 | payments | CreditCard | Finance |
| 12 | reporting | LayoutDashboard | Customer |
| 13 | expenses | TrendingDown | Finance |

Kategori renkleri:

| Category | Color |
|----------|-------|
| Order Management | #4DB6A0 |
| Logistics | #8B5CF6 |
| Sales & Billing | #3B82F6 |
| Inventory | #F59E0B |
| Finance | #10B981 |
| Customer | #EC4899 |

---

## 8. Section Header

v1.0'dan korunuyor.

```
text-align: center
max-width: 720px
margin: 0 auto 64px

Eyebrow: "ERP-MODULE" (caption, brand-primary, uppercase, letter-spacing: 0.1em)
Headline: "Alle Werkzeuge für Ihr Liefergeschäft — in einer Lösung" (heading-2, serif)
Subheadline: "Von der Auftragserfassung bis zur Rechnungsstellung..." (body-lg, secondary)
```

---

## 9. CTA Button (Sol Sütun — Desktop)

Desktop'ta section header'ın altında, kartların üstünde bir CTA butonu gösterilir:

```
┌─ Section Header ─┐
│ Eyebrow           │
│ Headline          │
│ Subheadline       │
│                   │
│ [Beratung anfragen →]  ← CTA butonu
│                   │
│ margin-bottom: 48px
│                   │
│ ┌─ Kart 1 ─────┐ │
│ └───────────────┘ │
```

CTA tablet/mobile'da section header altına, kartların üstüne yerleşir.

```css
.erp-features__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: var(--color-brand-primary);
  color: white;
  border-radius: 8px;
  font-family: var(--font-sans);
  font-size: 15px;
  font-weight: 600;
  transition: background-color 200ms ease;
  margin-top: 24px;
  margin-bottom: 48px;
}

.erp-features__cta:hover {
  background-color: var(--color-brand-primary-hover); /* #3DA08C */
}
```

CTA çeviri anahtarları (v1.0 header spec'ten):

| Language | Text |
|----------|------|
| DE | Beratung anfragen |
| EN | Request consultation |
| TR | Danışmanlık talep et |

---

## 10. Responsive Davranış

| Breakpoint | Layout | Stacking | Scroll-Link | ModuleGrid | Cards Gap | Card Padding |
|------------|--------|----------|-------------|------------|-----------|--------------|
| ≥1024px | İki sütun (flex row) | ✅ top: 96px | ✅ Evet | Sağ sticky (520px) | 32px | 32px |
| 768–1023px | Tek sütun (stacked) | ✅ top: 88px | ❌ Hayır | Üstte centered (0.85x) | 28px | 28px |
| <768px | Tek sütun (stacked) | ✅ top: 80px | ❌ Hayır | Üstte centered (4×6) | 24px | 24px |

Stacking efekti **tüm breakpoint'lerde çalışır.**

---

## 11. Animasyon

### 11.1 Section Entry (IntersectionObserver ile)

```css
.section-header {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms ease, transform 600ms ease;
}
.section-header.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 11.2 Kart Entry (Staggered)

```css
.erp-stacking-card {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 400ms ease, transform 400ms ease;
}
.erp-stacking-card.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger: 50ms per card, max 13 × 50ms = 650ms */
.erp-stacking-card:nth-child(1)  { transition-delay: 0ms; }
.erp-stacking-card:nth-child(2)  { transition-delay: 50ms; }
/* ... */
.erp-stacking-card:nth-child(13) { transition-delay: 600ms; }
```

### 11.3 Stacking Sırasında

Stacking sırasında **ek animasyon yok.** Efekt tamamen browser'ın native sticky davranışından gelir.

### 11.4 Hover

```css
.card-content:hover {
  box-shadow: 0 4px 16px rgba(50, 48, 47, 0.08);
}
```

### 11.5 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .section-header,
  .erp-stacking-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

---

## 12. i18n — Çeviri Anahtarları

v1.0'daki tüm çeviriler aynen korunur. Referans: `erp-features-section-spec.md` → Section 14.

---

## 13. Erişilebilirlik

v1.0 gereksinimlerinden aynen korunur:

| Requirement | Implementation |
|-------------|----------------|
| Renk kontrastı | Tüm metin 4.5:1 minimum |
| Focus visible | 2px outline, --color-brand-primary, offset 2px |
| Klavye nav | Tab ile kartlar arası geçiş |
| Screen reader | `role="list"` + `role="listitem"` |
| Reduced motion | Tüm entry animasyonları kapatılır |
| Touch targets | Kartlar full-width, ≥44px yükseklik |
| Heading hierarchy | h2 section title, h3 kart title'lar |

### ARIA Yapısı

```html
<section id="erp-features" aria-labelledby="erp-features-heading">

  <div class="section-header">
    <p class="section-eyebrow">ERP-MODULE</p>
    <h2 id="erp-features-heading">
      Alle Werkzeuge für Ihr Liefergeschäft — in einer Lösung
    </h2>
    <p>Von der Auftragserfassung bis zur Rechnungsstellung...</p>
  </div>

  <div class="erp-features-container">

    <!-- Sol sütun — stacking kartlar -->
    <div class="erp-features__left">
      <a href="#contact" class="erp-features__cta">Beratung anfragen</a>

      <div class="erp-features__cards" role="list" aria-label="ERP Module">

        <article class="erp-stacking-card" role="listitem"
                 aria-label="Aufträge — Auftragsverwaltung"
                 data-module-id="orders">
          <div class="card-bg" aria-hidden="true"></div>
          <div class="card-content">
            <div class="card-header">
              <div class="card-title-group">
                <ClipboardList aria-hidden="true" />
                <h3>Aufträge</h3>
              </div>
              <span class="erp-card__badge erp-card__badge--order">
                Auftragsverwaltung
              </span>
            </div>
            <p class="card-description">
              Alle Aufträge zentral erfassen, verwalten und verfolgen.
              Vom Eingang bis zur Auslieferung — mit Echtzeit-Statusaktualisierung.
            </p>
          </div>
        </article>

        <!-- ... 12 kart daha -->

      </div>
    </div>

    <!-- Sağ sütun — sticky ModuleGrid -->
    <aside class="erp-features__right" aria-hidden="true">
      <ModuleGrid />
    </aside>

  </div>
</section>
```

---

## 14. Component Yapısı

```
app/[locale]/components/ERPFeaturesSection/
├── index.tsx                       # Ana section — iki sütun layout
├── ERPFeaturesHeader.tsx           # Section header (eyebrow + headline + sub)
├── ERPStackingCard.tsx             # Tekil modül kartı (card-bg + card-content)
├── ERPStackingCardList.tsx         # Sol sütun: CTA + kart wrapper
├── StickyModuleGrid.tsx            # Sağ sütun: sticky wrapper (v1.0'dan)
├── useScrollLinkedHighlight.ts     # IntersectionObserver (v1.0'dan — grid highlight)
├── erp-modules-data.ts            # 13 modül tanımı (v1.0'dan)
└── types.ts                        # TypeScript interfaces
```

### 14.1 TypeScript Interfaces

```typescript
interface ERPModule {
  id: string;
  titleKey: string;
  categoryKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  categoryId: 'order' | 'logistics' | 'sales' | 'inventory' | 'finance' | 'customer';
  gridHighlightTargets: string[];
  gridHighlightType: 'single' | 'group';
  gridGroupId?: number;
}

interface ERPStackingCardProps {
  module: ERPModule;
  index: number;          // stagger delay için
}
```

### 14.2 v1.0'dan Değişen Bileşenler

| Bileşen | Değişiklik |
|---------|-----------|
| `ERPStackingCard.tsx` | Yeni — `card-bg` (eğik gölge) + `card-content` katmanlı yapı |
| `ERPStackingCardList.tsx` | Güncelleme — kartlara `position: sticky` ekleniyor, CTA butonu ekleniyor |
| `ModuleFeatureCard.tsx` | Kaldırılıyor — `ERPStackingCard.tsx` ile değiştiriliyor |
| `ModuleFeatureList.tsx` | Kaldırılıyor — `ERPStackingCardList.tsx` ile değiştiriliyor |

### 14.3 Bağımlılıklar

| Dependency | Purpose | Status |
|------------|---------|--------|
| next-intl | i18n çeviriler | ✅ Mevcut |
| framer-motion | Entry animasyonları | ✅ Mevcut |
| lucide-react | Modül ikonları | ✅ Mevcut |
| Tailwind CSS | Stillendirme | ✅ Mevcut |
| ModuleGrid | Sağ sütun vizualizasyon | ✅ Mevcut |
| IntersectionObserver | Grid highlight (browser native) | ✅ Mevcut |

---

## 15. Performans

| Metrik | v1.0 | v2.0 |
|--------|------|------|
| Kart state yönetimi | 13 kart × active/inactive | Yok — CSS handles it |
| Scroll-driven JS | IntersectionObserver (kart state + grid highlight) | IntersectionObserver (sadece grid highlight) |
| CSS complexity | Opacity + shadow transitions per card | `position: sticky` (browser-native) |
| Ek DOM elementleri | Yok | card-bg × 13 (lightweight div) |
| Re-render | Her scroll'da aktif kart state update | Sadece grid highlight state update |

---

## 16. Tailwind Sınıf Referansı

```tsx
// Section container
"py-24 lg:py-32"

// Content wrapper
"max-w-7xl mx-auto px-5 md:px-8 lg:px-16"

// Section header
"text-center max-w-3xl mx-auto mb-16 lg:mb-20"

// İki sütun container
"flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16"

// Sol sütun (stacking cards)
"flex-1 min-w-0"

// CTA button
"inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-brand-primary)] text-white rounded-lg font-semibold text-[15px] hover:bg-[var(--color-brand-primary-hover)] transition-colors mb-12"

// Kart wrapper
"flex flex-col gap-6 lg:gap-8 relative"

// Tekil kart (sticky container)
"sticky top-20 lg:top-24"

// card-bg (eğik gölge)
"absolute inset-0 -z-10 bg-white border border-[var(--color-border)] rounded-[20px] -rotate-[1.75deg] pointer-events-none"

// card-content
"relative bg-white border border-[var(--color-border)] rounded-[20px] p-6 lg:p-8 transition-shadow duration-250 hover:shadow-md"

// Kart header
"flex justify-between items-center"

// Icon + title
"inline-flex items-center gap-3"

// Icon
"w-12 h-12 text-[var(--color-brand-primary)] stroke-[1.5] shrink-0"

// Title
"font-serif text-[22px] font-medium text-[var(--color-text-primary)]"

// Badge
"inline-flex items-center px-3.5 py-1 rounded-full text-[13px] font-medium whitespace-nowrap"

// Description
"mt-4 font-sans text-[15px] leading-relaxed text-[var(--color-text-secondary)]"

// Sağ sütun (sticky ModuleGrid)
"w-full lg:w-[520px] lg:flex-shrink-0 lg:sticky lg:top-24"
```

---

## 17. Kabul Kriterleri

### İşlevsellik
- [ ] 13 modül kartı doğru sırada render edilir
- [ ] Desktop: İki sütun — sol stacking kartlar, sağ sticky ModuleGrid
- [ ] Desktop: Kartlar scroll ile aynı top noktasına yapışarak üst üste yığılır
- [ ] Desktop: Scroll-linked highlight — üstteki kart → ModuleGrid'de ilgili modül vurgulanır
- [ ] Tablet/Mobil: Tek sütun, ModuleGrid üstte, kartlar altta (stacking korunur)
- [ ] CTA butonu section header altında gösterilir

### Görsel
- [ ] Kart UI: ikon + başlık (sol), badge (sağ), açıklama (alt)
- [ ] İkonlar brand-primary (#4DB6A0) renginde
- [ ] Kategori badge'leri doğru renklerde
- [ ] Eğik gölge (card-bg, -1.75deg rotation) her kartta görünür
- [ ] Kartlar beyaz, hover'da shadow artışı

### Responsive
- [ ] 375px → 1440px+ düzgün çalışır
- [ ] Tablet'te tek sütun, ModuleGrid üstte
- [ ] Mobilde kompakt kartlar, stacking korunur

### Performans
- [ ] Stacking CSS-only — scroll sırasında kart state update yok
- [ ] Entry animasyonları 60fps
- [ ] Layout shift yok

### Erişilebilirlik
- [ ] Klavye tab navigasyonu
- [ ] Screen reader role="list" + role="listitem"
- [ ] prefers-reduced-motion desteği
- [ ] WCAG 2.1 AA renk kontrastı (4.5:1)

### i18n
- [ ] Tüm metin çeviri dosyalarından (DE/EN/TR)
- [ ] Hardcoded string yok

---

## 18. Revizyon Geçmişi

| Version | Tarih | Değişiklikler |
|---------|-------|---------------|
| 1.0 | 2026-02-01 | İlk spec: Stripe two-column + scroll-linked highlight |
| 2.0 | 2026-02-05 | Sol sütun stacking cards pattern (Dataforest referansı). ModuleGrid sağda kalıyor. Eğik gölge eklendi. İkonlar brand-primary. CTA eklendi. |