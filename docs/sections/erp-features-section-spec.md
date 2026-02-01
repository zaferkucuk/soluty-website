# ERP Features Section — UX/UI Specification

**Status:** Ready for Implementation  
**Version:** 1.0  
**Date:** February 2026  
**Role:** UX/UI Designer  
**Reference:** Stripe.com "Modular Solutions" Section (January 2026)

---

## 1. Executive Summary

Bu section, Soluty'nin 13 ERP modülünü Stripe'ın "Modular solutions" bölümünden ilham alan sticky two-column layout ile sunar. Sol sütunda modül açıklamaları scroll ederken, sağ sütundaki ModuleGrid komponenti sabit kalır ve scroll pozisyonuna göre ilgili modül/grup vurgulanır.

### Section Positioning

| Aspect | Value |
|--------|-------|
| Section Order | 3rd (after Hero → Services) |
| Section ID | `erp-features` |
| Strategic Goal | Ürün derinliğini göster, teknik yetkinliği kanıtla |
| Target Emotion | "Bu ekip tam da ihtiyacımız olanı anlıyor" |
| Scroll Behavior | Sticky right column with scroll-linked highlighting |

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| 13 modules (not 16) | Araştırma sonucu: deals, e-signature, notifications çıkarıldı — delivery sektörüne odaklanma |
| Sticky right column | Stripe referans: ModuleGrid her zaman görünür, bağlam kaybı yok |
| Scroll-linked highlight | Kullanıcı hangi modülü okuduğunu grid'de görsün — keşif deneyimi |
| Section background: #FCFCFC | Hero ile aynı — seamless geçiş |

---

## 2. Module Inventory (13 Modules)

### 2.1 Module List

| # | ID | Display Key | Icon (Lucide) | Category | Group ID |
|---|-----|-------------|---------------|----------|----------|
| 1 | orders | orders | ClipboardList | Order Management | 1 |
| 2 | sales | sales | BadgeDollarSign | Sales & Billing | 3 |
| 3 | planning | planning | CalendarDays | Logistics | 2 |
| 4 | route | route | Route | Logistics | 2 |
| 5 | crm | crm | Users | Customer | 6 |
| 6 | warehouse | warehouse | Warehouse | Inventory | 4 |
| 7 | products | products | Package | Inventory | 4 |
| 8 | delivery | delivery | Truck | Logistics | 2 |
| 9 | cashbox | cashbox | Banknote | Finance | 5 |
| 10 | waybillInvoice | waybillInvoice | FileText | Sales & Billing | 3 |
| 11 | payments | payments | CreditCard | Finance | 5 |
| 12 | reporting | reporting | LayoutDashboard | Customer | 6 |
| 13 | expenses | expenses | TrendingDown | Finance | 5 |

### 2.2 Category Grouping

| Category | Modules | Color Token |
|----------|---------|-------------|
| Order Management | orders | Teal (#4DB6A0) |
| Logistics | planning, route, delivery | Purple (#8B5CF6) |
| Sales & Billing | sales, waybillInvoice | Blue (#3B82F6) |
| Inventory | warehouse, products | Amber (#F59E0B) |
| Finance | cashbox, payments, expenses | Emerald (#10B981) |
| Customer | crm, reporting | Pink (#EC4899) |

### 2.3 Module → ModuleGrid Mapping

Sol sütundaki her modül kartı, sağ sütundaki ModuleGrid'deki bir veya birden fazla modülü vurgular. Mapping aşağıdaki gibidir:

| Left Column Module | ModuleGrid Highlight Target | Highlight Type |
|--------------------|----------------------------|----------------|
| orders | Group 1 (orders + deals) | Full group |
| sales | Group 3 (sales + invoice + esignature) | Full group |
| planning | Group 2 source (planning) | Single module |
| route | Group 2 target (route) | Single module |
| crm | Group 6 source (crm) | Single module |
| warehouse | Group 4 target (warehouse) | Single module |
| products | Group 4 source (products) | Single module |
| delivery | Group 2 (planning + route) | Full group |
| cashbox | Group 5 target (cashbox) | Single module |
| waybillInvoice | Group 3 target (invoice) | Single module |
| payments | Group 5 source (payments) | Single module |
| reporting | Group 6 target (dashboard) | Single module |
| expenses | Group 5 target (expenses) | Single module |

---

## 3. Section Layout

### 3.1 Desktop (≥1024px) — Sticky Two-Column

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                  max-width: 1280px                               │
│                                  padding: 0 64px                                 │
│                                  margin: 0 auto                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌────────────────────────────────────────────────────────────────────────┐     │
│   │                      Section Header (centered)                         │     │
│   │                                                                        │     │
│   │   Eyebrow: "ERP-MODULE" (caption, brand color, uppercase)              │     │
│   │   Headline: "Alle Werkzeuge..." (heading-2, serif)                     │     │
│   │   Subheadline: "Von der Auftragserfassung..." (body-lg)                │     │
│   │                                                                        │     │
│   │                      margin-bottom: 64px                               │     │
│   └────────────────────────────────────────────────────────────────────────┘     │
│                                                                                  │
│   ┌─────────────────────────────────────────────────────────────────────────┐    │
│   │                    Two-Column Container                                  │    │
│   │                    display: flex                                         │    │
│   │                    gap: 64px                                             │    │
│   │                    align-items: flex-start                               │    │
│   │                                                                          │    │
│   │   ┌────────────────────────┐    ┌──────────────────────────────────┐    │    │
│   │   │   LEFT COLUMN          │    │   RIGHT COLUMN                   │    │    │
│   │   │   flex: 1              │    │   width: 520px                   │    │    │
│   │   │   (scrolls normally)   │    │   flex-shrink: 0                 │    │    │
│   │   │                        │    │   position: sticky               │    │    │
│   │   │   ┌──────────────────┐ │    │   top: 96px (header offset)     │    │    │
│   │   │   │  Module Card 1   │ │    │                                  │    │    │
│   │   │   │  (orders)        │ │    │   ┌──────────────────────────┐   │    │    │
│   │   │   └──────────────────┘ │    │   │                          │   │    │    │
│   │   │   gap: 16px            │    │   │      ModuleGrid          │   │    │    │
│   │   │   ┌──────────────────┐ │    │   │      Component           │   │    │    │
│   │   │   │  Module Card 2   │ │    │   │                          │   │    │    │
│   │   │   │  (sales)         │ │    │   │    (scroll-linked        │   │    │    │
│   │   │   └──────────────────┘ │    │   │     highlighting)        │   │    │    │
│   │   │   gap: 16px            │    │   │                          │   │    │    │
│   │   │   ┌──────────────────┐ │    │   │                          │   │    │    │
│   │   │   │  Module Card 3   │ │    │   └──────────────────────────┘   │    │    │
│   │   │   │  (planning)      │ │    │                                  │    │    │
│   │   │   └──────────────────┘ │    │                                  │    │    │
│   │   │         ...            │    │                                  │    │    │
│   │   │   ┌──────────────────┐ │    │                                  │    │    │
│   │   │   │  Module Card 13  │ │    │                                  │    │    │
│   │   │   │  (expenses)      │ │    │                                  │    │    │
│   │   │   └──────────────────┘ │    │                                  │    │    │
│   │   │                        │    │                                  │    │    │
│   │   └────────────────────────┘    └──────────────────────────────────┘    │    │
│   │                                                                          │    │
│   └─────────────────────────────────────────────────────────────────────────┘    │
│                                                                                  │
│                              padding: 96px 0 (top/bottom)                        │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Tablet (768px–1023px) — Stacked Layout

```
┌──────────────────────────────────────────┐
│               padding: 0 32px             │
├──────────────────────────────────────────┤
│                                          │
│         Section Header (centered)        │
│         margin-bottom: 48px              │
│                                          │
│   ┌──────────────────────────────────┐   │
│   │        ModuleGrid                │   │
│   │        (centered, scale: 0.85)   │   │
│   │        margin-bottom: 48px       │   │
│   └──────────────────────────────────┘   │
│                                          │
│   ┌──────────────────────────────────┐   │
│   │  Module Cards (2-column grid)    │   │
│   │  grid-template-columns: 1fr 1fr  │   │
│   │  gap: 16px                       │   │
│   │                                  │   │
│   │  ┌─────────┐  ┌─────────┐       │   │
│   │  │ Card 1  │  │ Card 2  │       │   │
│   │  └─────────┘  └─────────┘       │   │
│   │  ┌─────────┐  ┌─────────┐       │   │
│   │  │ Card 3  │  │ Card 4  │       │   │
│   │  └─────────┘  └─────────┘       │   │
│   │        ...                       │   │
│   └──────────────────────────────────┘   │
│                                          │
│             padding: 64px 0              │
│                                          │
└──────────────────────────────────────────┘

Note: Sticky behavior disabled.
ModuleGrid shows all modules active (no scroll-linking).
```

### 3.3 Mobile (<768px) — Stacked + Compact Cards

```
┌───────────────────────────────┐
│         padding: 0 20px       │
├───────────────────────────────┤
│                               │
│    Section Header (centered)  │
│    margin-bottom: 32px        │
│                               │
│   ┌───────────────────────┐   │
│   │     ModuleGrid        │   │
│   │   (4×6 mobile grid)   │   │
│   │   (centered)          │   │
│   │   margin-bottom: 32px │   │
│   └───────────────────────┘   │
│                               │
│   ┌───────────────────────┐   │
│   │  Module Cards (stack) │   │
│   │  flex-direction: col  │   │
│   │  gap: 12px            │   │
│   │                       │   │
│   │  ┌─────────────────┐  │   │
│   │  │  Card 1 (compact)│  │   │
│   │  └─────────────────┘  │   │
│   │  ┌─────────────────┐  │   │
│   │  │  Card 2 (compact)│  │   │
│   │  └─────────────────┘  │   │
│   │        ...            │   │
│   └───────────────────────┘   │
│                               │
│          padding: 48px 0      │
│                               │
└───────────────────────────────┘

Note: Sticky behavior disabled.
ModuleGrid shows all modules active.
Compact cards: icon + title + description (no CTA).
```

---

## 4. Section Header Specification

### 4.1 Typography

| Element | Class | Font | Size (Desktop) | Size (Mobile) | Weight | Color |
|---------|-------|------|----------------|---------------|--------|-------|
| Eyebrow | caption | --font-sans | 12px | 12px | 600 | --color-brand-primary |
| Headline | heading-2 | --font-serif | 36px | 28px | 400 | --color-text-primary |
| Subheadline | body-lg | --font-sans | 18px | 16px | 400 | --color-text-secondary |

### 4.2 Eyebrow Styling

```css
.section-eyebrow {
  font-family: var(--font-sans);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-brand-primary);
  margin-bottom: 16px;
}
```

### 4.3 Content (German Primary)

**Eyebrow:** `ERP-MODULE`

**Headline:** "Alle Werkzeuge für Ihr Liefergeschäft — in einer Lösung"

**Subheadline:** "Von der Auftragserfassung bis zur Rechnungsstellung: 13 Module, die nahtlos zusammenarbeiten und sich an Ihren Workflow anpassen."

### 4.4 Header Layout

```
text-align: center
max-width: 720px (headline + subheadline)
margin: 0 auto
margin-bottom: 64px (desktop), 48px (tablet), 32px (mobile)
```

---

## 5. Module Card Specification

### 5.1 Card Anatomy (Desktop)

```
┌─────────────────────────────────────────────────────────────────┐
│  padding: 24px                                                   │
│                                                                   │
│  ┌─────────┐                                                     │
│  │  ICON   │  40×40px, category color, stroke-width: 1.5         │
│  └─────────┘                                                     │
│  gap: 16px                                                       │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  TITLE (heading-4, serif)                                    │ │
│  │  "Siparişler" / "Aufträge" / "Orders"                       │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  gap: 8px                                                        │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  CATEGORY BADGE (caption)                                    │ │
│  │  "Auftragsverwaltung" — category color bg, small pill        │ │
│  └─────────────────────────────────────────────────────────────┘ │
│  gap: 12px                                                       │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  DESCRIPTION (body-sm, secondary color)                      │ │
│  │  2-3 sentences, max 60 words                                 │ │
│  │  line-height: 1.6                                            │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Card Anatomy (Mobile — Compact)

```
┌──────────────────────────────────────────────┐
│  padding: 16px                                │
│                                                │
│  ┌──────┐  TITLE (heading-4, 18px)            │
│  │ ICON │  CATEGORY BADGE (inline, 11px)      │
│  │32×32 │                                      │
│  └──────┘  DESCRIPTION (body-sm, 13px)        │
│            1-2 sentences                       │
│                                                │
└──────────────────────────────────────────────┘

Note: Horizontal layout on mobile — icon left, content right.
```

### 5.3 Card Dimensions

| Property | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| Padding | 24px | 20px | 16px |
| Icon Size | 40px | 36px | 32px |
| Border Radius | 12px | 12px | 10px |
| Gap (cards) | 16px | 16px | 12px |
| Min Height | auto | auto | auto |

### 5.4 Card States

#### Default State

```css
.module-feature-card {
  background: var(--color-bg-primary); /* #FCFCFC */
  border: 1px solid transparent;
  border-radius: var(--radius-lg); /* 12px */
  transition: all 250ms ease;
}
```

#### Active State (scroll-linked — desktop only)

```css
.module-feature-card--active {
  background: white;
  border: 1px solid var(--color-border); /* rgba(50, 48, 47, 0.12) */
  box-shadow: var(--shadow-md);
  /* 0 4px 12px rgba(50, 48, 47, 0.08) */
}

.module-feature-card--active .icon {
  color: [category-gradient-start]; /* e.g., #4DB6A0 for Order Management */
}
```

#### Inactive State (scroll-linked — desktop only)

```css
.module-feature-card--inactive {
  background: transparent;
  border: 1px solid transparent;
  opacity: 0.55;
}
```

#### Hover State

```css
.module-feature-card:hover {
  background: white;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  opacity: 1;
}
```

### 5.5 Category Badge

```css
.category-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 9999px; /* pill */
  font-size: 11px;
  font-weight: 500;
  font-family: var(--font-sans);
  letter-spacing: 0.02em;
  /* Colors per category — see Section 2.2 */
}

/* Example: Order Management */
.category-badge--order {
  background: rgba(77, 182, 160, 0.1);
  color: #4DB6A0;
}

/* Example: Logistics */
.category-badge--logistics {
  background: rgba(139, 92, 246, 0.1);
  color: #8B5CF6;
}

/* Example: Sales & Billing */
.category-badge--sales {
  background: rgba(59, 130, 246, 0.1);
  color: #3B82F6;
}

/* Example: Inventory */
.category-badge--inventory {
  background: rgba(245, 158, 11, 0.1);
  color: #F59E0B;
}

/* Example: Finance */
.category-badge--finance {
  background: rgba(16, 185, 129, 0.1);
  color: #10B981;
}

/* Example: Customer */
.category-badge--customer {
  background: rgba(236, 72, 153, 0.1);
  color: #EC4899;
}
```

---

## 6. Scroll-Linked Interaction (Desktop Only)

### 6.1 Behavior Description

Kullanıcı sol sütundaki modül kartları arasında scroll yaptığında:

1. Viewport ortasına en yakın kart **active** duruma geçer
2. Diğer kartlar **inactive** duruma düşer (opacity: 0.55)
3. Sağ sütundaki ModuleGrid'de, active kartın mapping'ine göre ilgili modül veya grup vurgulanır
4. ModuleGrid'in otomatik group-cycle animasyonu duraklar
5. Kullanıcı section'dan çıktığında ModuleGrid otomatik animasyona döner

### 6.2 Technical Implementation (IntersectionObserver)

```typescript
// Pseudocode — implementation reference for Web Developer

const SCROLL_THRESHOLD = 0.6; // Card 60%+ visible = active

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= SCROLL_THRESHOLD) {
        const moduleId = entry.target.dataset.moduleId;
        setActiveModule(moduleId);
        // Trigger ModuleGrid highlight via mapping (Section 2.3)
      }
    });
  },
  {
    root: null, // viewport
    rootMargin: '-40% 0px -40% 0px', // Center ~20% band
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
  }
);

moduleCards.forEach((card) => observer.observe(card));
```

### 6.3 ModuleGrid Integration

ModuleGrid bileşeni şu anda `activeGroupId` prop'u üzerinden çalışıyor. Scroll-linked highlighting için ek bir prop gerekecek:

```typescript
interface ModuleGridProps {
  // Existing
  activeGroupId?: number;

  // New — scroll-linked override
  highlightMode?: 'auto-cycle' | 'scroll-linked';
  highlightTargets?: string[]; // Module IDs to highlight
}
```

**Davranış:**
- `highlightMode: 'auto-cycle'` → Mevcut davranış (3.5s group rotation)
- `highlightMode: 'scroll-linked'` → Dış kontrol, otomatik cycle durur
- Section dışına çıkıldığında → `'auto-cycle'` moduna geri dön

### 6.4 Scroll States Timeline

```
User enters section (scrolling down)
  │
  ├─ Section header visible → ModuleGrid: auto-cycle mode
  │
  ├─ First module card enters center → ModuleGrid: scroll-linked mode
  │  └─ Card 1 active → Grid highlights: Group 1
  │
  ├─ User scrolls to Card 5 → Grid highlights: Group 6 (CRM)
  │
  ├─ User scrolls to Card 8 → Grid highlights: Group 2 (delivery)
  │
  ├─ Last card passes center → ModuleGrid stays on last highlight
  │
  └─ User exits section → ModuleGrid: auto-cycle mode resumes
```

---

## 7. Sticky Column Specification (Desktop)

### 7.1 CSS Implementation

```css
.erp-features-container {
  display: flex;
  align-items: flex-start;
  gap: 64px;
}

.erp-features__left {
  flex: 1;
  min-width: 0;
}

.erp-features__right {
  width: 520px;
  flex-shrink: 0;
  position: sticky;
  top: 96px; /* header height (72px) + spacing (24px) */
  align-self: flex-start;
}
```

### 7.2 Sticky Offset Calculation

```
Header height:     72px (from header spec)
Top spacing:       24px (breathing room)
──────────────────────────
sticky top value:  96px
```

### 7.3 Container Height

Container height, sol sütunun toplam yüksekliğine eşittir:

```
13 cards × ~120px average height = ~1560px
12 gaps × 16px = ~192px
Total: ~1752px scroll content
```

Bu, ModuleGrid'in (~600px height) ekranda en az ~1150px boyunca sticky kalmasını sağlar.

---

## 8. Color & Background Specification

### 8.1 Section Background

```css
.erp-features-section {
  background-color: var(--color-bg-primary); /* #FCFCFC */
}
```

**Rationale:** Hero section ile aynı arka plan — seamless geçiş. Services section `--color-bg-secondary (#F7F6F5)` kullandığı için, ERP Features'a geçişte ince bir kontrast farkı oluşur.

### 8.2 Visual Hierarchy

```
Hero (#FCFCFC) → Services (#F7F6F5) → ERP Features (#FCFCFC)
                                       ↑ açık → koyu → açık rhythm
```

---

## 9. Animation Specification

### 9.1 Section Entry Animation

```css
/* Section header — fade in up */
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

### 9.2 ModuleGrid Entry

```css
/* ModuleGrid container — fade in */
.module-grid-container {
  opacity: 0;
  transition: opacity 800ms ease;
  transition-delay: 200ms;
}

.module-grid-container.visible {
  opacity: 1;
}
```

### 9.3 Module Card Entry (Staggered)

```css
.module-feature-card {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 400ms ease, transform 400ms ease;
}

.module-feature-card.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger: each card delayed by 50ms from previous */
.module-feature-card:nth-child(1) { transition-delay: 0ms; }
.module-feature-card:nth-child(2) { transition-delay: 50ms; }
/* ... up to :nth-child(13) { transition-delay: 600ms; } */
```

### 9.4 Active Card Transition

```css
.module-feature-card {
  transition: 
    opacity 300ms ease,
    background-color 250ms ease,
    border-color 250ms ease,
    box-shadow 250ms ease;
}
```

### 9.5 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .section-header,
  .module-grid-container,
  .module-feature-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

---

## 10. Typography Specification

### 10.1 Section Header

| Element | Property | Value |
|---------|----------|-------|
| Eyebrow | font-family | var(--font-sans) |
| | font-size | 12px |
| | font-weight | 600 |
| | letter-spacing | 0.1em |
| | text-transform | uppercase |
| | color | var(--color-brand-primary) |
| Headline | class | heading-2 |
| | font-family | var(--font-serif) |
| | font-size | 36px (desktop), 28px (mobile) |
| | font-weight | 400 |
| | line-height | 1.2 |
| | color | var(--color-text-primary) |
| Subheadline | class | body-lg |
| | font-size | 18px (desktop), 16px (mobile) |
| | line-height | 1.65 |
| | color | var(--color-text-secondary) |
| | max-width | 640px |

### 10.2 Module Card Typography

| Element | Property | Value |
|---------|----------|-------|
| Title | class | heading-4 |
| | font-family | var(--font-serif) |
| | font-size | 22px (desktop), 18px (mobile) |
| | font-weight | 500 |
| | color | var(--color-text-primary) |
| Category Badge | font-family | var(--font-sans) |
| | font-size | 11px |
| | font-weight | 500 |
| Description | class | body-sm |
| | font-family | var(--font-sans) |
| | font-size | 14px (desktop), 13px (mobile) |
| | line-height | 1.6 |
| | color | var(--color-text-secondary) |

---

## 11. Spacing System

### 11.1 Section Spacing

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Section padding-top | 96px | 64px | 48px |
| Section padding-bottom | 96px | 64px | 48px |
| Section padding-x | 64px | 32px | 20px |
| Header → Content gap | 64px | 48px | 32px |

### 11.2 Two-Column Gap

| Breakpoint | Column Gap |
|------------|------------|
| Desktop (≥1024px) | 64px |
| Tablet (768–1023px) | N/A (stacked) |
| Mobile (<768px) | N/A (stacked) |

### 11.3 Card Internal Spacing

| Element | Desktop | Mobile |
|---------|---------|--------|
| Card padding | 24px | 16px |
| Icon → Title gap | 16px | 12px |
| Title → Badge gap | 8px | 6px |
| Badge → Description gap | 12px | 8px |

### 11.4 Card List Spacing

| Breakpoint | Cards Gap | Layout |
|------------|-----------|--------|
| Desktop | 16px | Single column |
| Tablet | 16px | 2-column grid |
| Mobile | 12px | Single column |

---

## 12. Responsive Behavior Summary

| Breakpoint | Layout | Sticky | Scroll-Link | ModuleGrid | Cards |
|------------|--------|--------|-------------|------------|-------|
| ≥1024px | Two-column | ✅ Yes | ✅ Yes | 6×6 (80px) | Vertical list |
| 768–1023px | Stacked | ❌ No | ❌ No | 6×6 (72px), centered | 2-col grid |
| <768px | Stacked | ❌ No | ❌ No | 4×6 (64px), centered | Vertical list, compact |

---

## 13. Accessibility Requirements

### 13.1 WCAG 2.1 AA Checklist

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | All text meets 4.5:1 against background |
| Focus visible | 2px outline, --color-brand-primary, offset 2px |
| Keyboard nav | Tab through cards in order |
| Screen reader | Section landmark with aria-label |
| Reduced motion | All animations disabled |
| Touch targets | Cards are full-width tappable areas (≥44px height) |
| Heading hierarchy | h2 section title, h3 module titles |

### 13.2 ARIA Implementation

```html
<section
  id="erp-features"
  aria-labelledby="erp-features-heading"
>
  <h2 id="erp-features-heading">
    Alle Werkzeuge für Ihr Liefergeschäft
  </h2>

  <div role="list" aria-label="ERP Module">
    <article
      role="listitem"
      aria-label="Aufträge — Auftragsverwaltung"
      data-module-id="orders"
    >
      <!-- Card content -->
    </article>
    <!-- ... -->
  </div>

  <aside aria-label="ERP-Modul Übersicht" aria-hidden="false">
    <!-- ModuleGrid — decorative visualization -->
    <!-- aria-hidden="true" on ModuleGrid since cards provide the content -->
  </aside>
</section>
```

### 13.3 Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Focus next module card |
| Shift+Tab | Focus previous module card |
| Enter | Scroll card to center (trigger highlight) |
| Escape | Return focus to section header |

---

## 14. i18n Translation Keys

### 14.1 Section Header

```json
{
  "erpFeatures": {
    "eyebrow": {
      "de": "ERP-MODULE",
      "en": "ERP MODULES",
      "tr": "ERP MODÜLLERİ"
    },
    "headline": {
      "de": "Alle Werkzeuge für Ihr Liefergeschäft — in einer Lösung",
      "en": "Every tool your delivery business needs — in one solution",
      "tr": "Teslimat işiniz için gereken her araç — tek bir çözümde"
    },
    "subheadline": {
      "de": "Von der Auftragserfassung bis zur Rechnungsstellung: 13 Module, die nahtlos zusammenarbeiten und sich an Ihren Workflow anpassen.",
      "en": "From order entry to invoicing: 13 modules that work together seamlessly and adapt to your workflow.",
      "tr": "Sipariş girişinden faturalamaya: sorunsuz çalışan ve iş akışınıza uyum sağlayan 13 modül."
    }
  }
}
```

### 14.2 Module Cards

```json
{
  "erpFeatures": {
    "modules": {
      "orders": {
        "title": {
          "de": "Aufträge",
          "en": "Orders",
          "tr": "Siparişler"
        },
        "category": {
          "de": "Auftragsverwaltung",
          "en": "Order Management",
          "tr": "Sipariş Yönetimi"
        },
        "description": {
          "de": "Alle Aufträge zentral erfassen, verwalten und verfolgen. Vom Eingang bis zur Auslieferung — mit Echtzeit-Statusaktualisierung.",
          "en": "Capture, manage, and track all orders centrally. From receipt to delivery — with real-time status updates.",
          "tr": "Tüm siparişleri merkezi olarak girin, yönetin ve takip edin. Alımdan teslimata — gerçek zamanlı durum güncellemeleri ile."
        }
      },
      "sales": {
        "title": {
          "de": "Verkauf",
          "en": "Sales",
          "tr": "Satışlar"
        },
        "category": {
          "de": "Vertrieb & Abrechnung",
          "en": "Sales & Billing",
          "tr": "Satış & Faturalama"
        },
        "description": {
          "de": "Preislisten, Angebote und Vertriebsprozesse digitalisieren. Automatische Kalkulation und nahtlose Übergabe an die Fakturierung.",
          "en": "Digitize price lists, quotes, and sales processes. Automatic calculation and seamless handoff to invoicing.",
          "tr": "Fiyat listeleri, teklifler ve satış süreçlerini dijitalleştirin. Otomatik hesaplama ve faturalamaya sorunsuz aktarım."
        }
      },
      "planning": {
        "title": {
          "de": "Planung",
          "en": "Planning",
          "tr": "İş Planlama"
        },
        "category": {
          "de": "Logistik",
          "en": "Logistics",
          "tr": "Lojistik"
        },
        "description": {
          "de": "Tagesplanung, Kapazitätsübersicht und Ressourcenzuweisung in einem Blick. Optimiert für Lieferbetriebe mit mehreren Teams.",
          "en": "Daily planning, capacity overview, and resource allocation at a glance. Optimized for delivery operations with multiple teams.",
          "tr": "Günlük planlama, kapasite görünümü ve kaynak atama tek bakışta. Birden fazla ekipli teslimat operasyonları için optimize edildi."
        }
      },
      "route": {
        "title": {
          "de": "Routenplanung",
          "en": "Route Planning",
          "tr": "Rota Planlama"
        },
        "category": {
          "de": "Logistik",
          "en": "Logistics",
          "tr": "Lojistik"
        },
        "description": {
          "de": "Intelligente Routenoptimierung für kürzere Wege und weniger Kraftstoff. Berücksichtigt Zeitfenster, Fahrzeugkapazität und Verkehr.",
          "en": "Intelligent route optimization for shorter distances and less fuel. Considers time windows, vehicle capacity, and traffic.",
          "tr": "Daha kısa mesafeler ve daha az yakıt için akıllı rota optimizasyonu. Zaman pencerelerini, araç kapasitesini ve trafiği hesaba katar."
        }
      },
      "crm": {
        "title": {
          "de": "CRM",
          "en": "CRM",
          "tr": "CRM"
        },
        "category": {
          "de": "Kundenbeziehungen",
          "en": "Customer Relations",
          "tr": "Müşteri İlişkileri"
        },
        "description": {
          "de": "Kundendaten, Kommunikationshistorie und Präferenzen zentral verwalten. Besserer Service durch vollständige Kundenübersicht.",
          "en": "Centrally manage customer data, communication history, and preferences. Better service through complete customer overview.",
          "tr": "Müşteri verileri, iletişim geçmişi ve tercihleri merkezi olarak yönetin. Eksiksiz müşteri görünümü ile daha iyi hizmet."
        }
      },
      "warehouse": {
        "title": {
          "de": "Lagerverwaltung",
          "en": "Warehouse",
          "tr": "Depo Yönetimi"
        },
        "category": {
          "de": "Bestandsmanagement",
          "en": "Inventory",
          "tr": "Envanter"
        },
        "description": {
          "de": "Lagerbestände in Echtzeit überwachen, Mindestbestände definieren und automatische Nachbestellungen auslösen.",
          "en": "Monitor inventory levels in real time, define minimum stock, and trigger automatic reorders.",
          "tr": "Stok seviyelerini gerçek zamanlı izleyin, minimum stok tanımlayın ve otomatik yeniden sipariş tetikleyin."
        }
      },
      "products": {
        "title": {
          "de": "Produkte",
          "en": "Products",
          "tr": "Ürünler"
        },
        "category": {
          "de": "Bestandsmanagement",
          "en": "Inventory",
          "tr": "Envanter"
        },
        "description": {
          "de": "Produktkatalog mit Varianten, Preisstufen und Lieferanteninformationen. Schnelle Suche und flexible Kategorisierung.",
          "en": "Product catalog with variants, price tiers, and supplier info. Fast search and flexible categorization.",
          "tr": "Varyantlar, fiyat katmanları ve tedarikçi bilgileri içeren ürün kataloğu. Hızlı arama ve esnek kategorizasyon."
        }
      },
      "delivery": {
        "title": {
          "de": "Lieferung",
          "en": "Delivery",
          "tr": "Teslimat"
        },
        "category": {
          "de": "Logistik",
          "en": "Logistics",
          "tr": "Lojistik"
        },
        "description": {
          "de": "Lieferstatus in Echtzeit verfolgen, Zustellnachweise digital erfassen und Kunden automatisch benachrichtigen.",
          "en": "Track delivery status in real time, capture proof of delivery digitally, and notify customers automatically.",
          "tr": "Teslimat durumunu gerçek zamanlı takip edin, teslimat kanıtlarını dijital olarak alın ve müşterileri otomatik bilgilendirin."
        }
      },
      "cashbox": {
        "title": {
          "de": "Kasse",
          "en": "Cash Tracking",
          "tr": "Kasa Takibi"
        },
        "category": {
          "de": "Finanzen",
          "en": "Finance",
          "tr": "Finans"
        },
        "description": {
          "de": "Tägliche Kassenabschlüsse, Bargeldverwaltung und Abgleich mit Bankbewegungen. Immer wissen, wo Ihr Geld ist.",
          "en": "Daily cash closing, cash management, and reconciliation with bank transactions. Always know where your money is.",
          "tr": "Günlük kasa kapanışları, nakit yönetimi ve banka hareketleri ile mutabakat. Paranızın nerede olduğunu her zaman bilin."
        }
      },
      "waybillInvoice": {
        "title": {
          "de": "Lieferschein & Rechnung",
          "en": "Waybill & Invoice",
          "tr": "İrsaliye & Fatura"
        },
        "category": {
          "de": "Vertrieb & Abrechnung",
          "en": "Sales & Billing",
          "tr": "Satış & Faturalama"
        },
        "description": {
          "de": "Lieferscheine und Rechnungen automatisch aus Aufträgen generieren. GoBD-konform und bereit für Ihre Steuerberatung.",
          "en": "Automatically generate waybills and invoices from orders. GoBD-compliant and ready for your tax advisor.",
          "tr": "Siparişlerden otomatik olarak irsaliye ve fatura oluşturun. Yasal uyumlu ve mali müşaviriniz için hazır."
        }
      },
      "payments": {
        "title": {
          "de": "Zahlungsverfolgung",
          "en": "Payment Tracking",
          "tr": "Ödeme Takibi"
        },
        "category": {
          "de": "Finanzen",
          "en": "Finance",
          "tr": "Finans"
        },
        "description": {
          "de": "Offene Posten überwachen, Zahlungseingänge automatisch zuordnen und Mahnungen bei Verzug auslösen.",
          "en": "Monitor open items, automatically match incoming payments, and trigger reminders for overdue amounts.",
          "tr": "Açık kalemleri izleyin, gelen ödemeleri otomatik eşleştirin ve geciken tutarlar için hatırlatma tetikleyin."
        }
      },
      "reporting": {
        "title": {
          "de": "Berichte & Dashboard",
          "en": "Reports & Dashboard",
          "tr": "Raporlama & Dashboard"
        },
        "category": {
          "de": "Kundenbeziehungen",
          "en": "Customer Relations",
          "tr": "Müşteri İlişkileri"
        },
        "description": {
          "de": "Individuelle Dashboards und Berichte für alle Unternehmensbereiche. Von Umsatzanalysen bis zur Fahrerleistung.",
          "en": "Custom dashboards and reports for all business areas. From revenue analytics to driver performance.",
          "tr": "Tüm iş alanları için özelleştirilebilir panolar ve raporlar. Gelir analizlerinden sürücü performansına."
        }
      },
      "expenses": {
        "title": {
          "de": "Ausgabenverwaltung",
          "en": "Expense Management",
          "tr": "Masraf Yönetimi"
        },
        "category": {
          "de": "Finanzen",
          "en": "Finance",
          "tr": "Finans"
        },
        "description": {
          "de": "Betriebsausgaben erfassen, kategorisieren und auswerten. Kraftstoff, Wartung, Personal — alles an einem Ort.",
          "en": "Record, categorize, and analyze operating expenses. Fuel, maintenance, personnel — all in one place.",
          "tr": "İşletme giderlerini kaydedin, kategorilendirin ve analiz edin. Yakıt, bakım, personel — hepsi tek yerde."
        }
      }
    }
  }
}
```

---

## 15. Implementation Notes

### 15.1 Component Structure

```
src/components/sections/
└── ERPFeaturesSection/
    ├── index.tsx                    # Main section component
    ├── ERPFeaturesHeader.tsx        # Section header (eyebrow + headline + sub)
    ├── ModuleFeatureCard.tsx        # Individual module card
    ├── ModuleFeatureList.tsx        # Left column: scrollable card list
    ├── StickyModuleGrid.tsx         # Right column: sticky wrapper for ModuleGrid
    ├── useScrollLinkedHighlight.ts  # Custom hook: IntersectionObserver logic
    ├── erp-modules-data.ts          # 13 module definitions + mapping
    └── types.ts                     # TypeScript interfaces
```

### 15.2 Key Props Interface

```typescript
interface ERPModule {
  id: string;
  titleKey: string;          // i18n key
  categoryKey: string;       // i18n key
  descriptionKey: string;    // i18n key
  icon: LucideIcon;
  categoryId: string;        // 'order' | 'logistics' | 'sales' | 'inventory' | 'finance' | 'customer'
  gridHighlightTargets: string[]; // Module IDs to highlight in ModuleGrid
  gridHighlightType: 'single' | 'group'; // Single module or full group
  gridGroupId?: number;      // Group ID for full group highlight
}

interface ModuleFeatureCardProps {
  module: ERPModule;
  isActive: boolean;
  categoryColor: string;
}
```

### 15.3 Tailwind Classes Reference

```tsx
// Section container
"bg-[var(--color-bg-primary)] py-24 lg:py-32"

// Content wrapper
"max-w-7xl mx-auto px-5 md:px-8 lg:px-16"

// Two-column container (desktop)
"flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16"

// Left column
"flex-1 min-w-0 flex flex-col gap-4"

// Right column (sticky)
"w-full lg:w-[520px] lg:flex-shrink-0 lg:sticky lg:top-24"

// Module card (default)
"rounded-xl p-6 transition-all duration-250 border border-transparent"

// Module card (active)
"bg-white border-[var(--color-border)] shadow-md"

// Module card (inactive)
"opacity-55"

// Category badge
"inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium"
```

### 15.4 Dependencies

| Dependency | Purpose | Status |
|------------|---------|--------|
| next-intl | i18n translation | ✅ Existing |
| framer-motion | Entry animations | ✅ Existing |
| lucide-react | Module icons | ✅ Existing |
| ModuleGrid component | Grid visualization | ✅ Existing (needs new props) |
| IntersectionObserver API | Scroll detection | ✅ Browser native |

### 15.5 ModuleGrid Modification Required

Mevcut ModuleGrid'e eklenmesi gereken değişiklikler:

1. **Yeni prop:** `highlightMode: 'auto-cycle' | 'scroll-linked'`
2. **Yeni prop:** `highlightTargets: string[]` — vurgulanacak modül ID'leri
3. **Davranış:** `scroll-linked` modunda otomatik group rotation durur
4. **Davranış:** `highlightTargets` değiştiğinde smooth transition (300ms)

### 15.6 Performance Considerations

| Concern | Mitigation |
|---------|------------|
| IntersectionObserver cost | Single observer for all cards, not per-card |
| Re-render on scroll | Debounce state updates (16ms — one frame) |
| ModuleGrid re-render | Memoize with React.memo, compare highlightTargets |
| Animation jank | Use CSS transitions, avoid JS-driven animation |
| Layout shift | Fixed dimensions for sticky column |

---

## 16. Acceptance Criteria

- [ ] Section header displays with eyebrow, headline, subheadline
- [ ] 13 module cards render correctly with icon, title, badge, description
- [ ] Desktop: Right column sticky while left scrolls
- [ ] Desktop: Scroll-linked highlighting works (active card → grid highlight)
- [ ] Desktop: ModuleGrid pauses auto-cycle during scroll interaction
- [ ] Tablet: Stacked layout, ModuleGrid above cards, 2-column card grid
- [ ] Mobile: Stacked layout, compact card design
- [ ] Responsive: Smooth transitions between breakpoints
- [ ] Accessibility: Keyboard navigable, ARIA labels, reduced motion
- [ ] i18n: All text from translation files (DE/EN/TR)
- [ ] Performance: No layout shift, smooth 60fps scroll
- [ ] Category colors match design tokens

---

## 17. Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-01 | Initial specification |

---

*This specification is implementation-ready. Web Developer may proceed with implementation.*
