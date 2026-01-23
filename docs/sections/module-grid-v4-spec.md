# ModuleGrid v4.0 - UX/UI Design Specification

**Status:** Approved  
**Version:** 4.0  
**Role:** UX/UI Designer  
**Date:** 2026-01-23  
**Reference:** Stripe.com Homepage (January 2026)

---

## 1. Executive Summary

Bu spesifikasyon, ModuleGrid komponentinin Stripe.com kalitesinde yeniden tasarlanmasını tanımlar. Mevcut v2.x implementasyonundan tamamen farklı bir yapı önerilmektedir.

### Key Changes from v2.x

| Aspect | v2.x (Current) | v4.0 (Proposed) |
|--------|----------------|-----------------|
| Module count | 10 | **16** |
| Grid type | Organic staggered | **6×6 Rigid sparse** |
| Groups | 5 (chain connection) | **6 (parallel branching)** |
| Empty cells | 0 | **20 (invisible)** |
| Animation start | First group | **Random group** |
| Card size | 95×95px | **~80×80px (Stripe-match)** |
| Mobile grid | Same as desktop | **4×6 grid** |

---

## 2. Stripe.com Visual Analysis

### 2.1 Card Specifications (Stripe)

| Property | Value | Notes |
|----------|-------|-------|
| Card width | ~80-85px | Square cards |
| Card height | ~80-85px | Including label space |
| Border radius | 16-20px | Rounded corners |
| Background | #FFFFFF | Pure white |
| Border | 1px solid rgba(0,0,0,0.06) | Very subtle |
| Icon size | 32-36px | Centered in card |
| Label font | 12-13px | Below icon |
| Gap between cards | ~24-32px | Consistent spacing |

### 2.2 Active vs Inactive States (Stripe)

| Property | Active | Inactive |
|----------|--------|----------|
| Icon color | **Gradient (brand colors)** | Gray (#9CA3AF) |
| Icon opacity | 100% | ~30-40% |
| Label visibility | **Visible** | Hidden |
| Card shadow | Subtle elevation | None or very subtle |
| Card border | Slightly more visible | Nearly invisible |

### 2.3 Hover Behavior (Stripe Analysis)

| State | Behavior |
|-------|----------|
| **Inactive + No Hover** | Gray icon (~35% opacity), no label, minimal border |
| **Inactive + Hover** | Icon brightens slightly (~50% opacity), cursor: pointer, subtle shadow appears |
| **Active** | Full color gradient icon, label visible, elevated shadow |
| **Active + Hover** | Same as active (no additional change) |

**Transition:** 200-300ms ease-out for all state changes

---

## 3. Final Module List (16 Modules)

### 3.1 Module Inventory

| # | ID | Display Name (EN) | Grid Position | Group |
|---|----|--------------------|---------------|-------|
| 1 | orders | Orders | 1b | 1 |
| 2 | deals | Deals | 4b | 1 |
| 3 | planning | Planning | 1d | 2 |
| 4 | route | Route | 3e | 2 |
| 5 | sales | Sales | 5b | 3 |
| 6 | invoice | Invoice | 5e | 3 |
| 7 | esignature | E-Signature | 6c | 3 |
| 8 | warehouse | Warehouse | 3a | 4 |
| 9 | products | Products | 3c | 4 |
| 10 | deposits | Deposits | 4d | 4 |
| 11 | payments | Payments | 2f | 5 |
| 12 | cashbox | Cashbox | 4e | 5 |
| 13 | expenses | Expenses | 6f | 5 |
| 14 | crm | CRM | 4c | 6 |
| 15 | dashboard | Dashboard | 6b | 6 |
| 16 | notifications | Notifications | 5d | 6 |

### 3.2 Grid Position Map

```
        Col 1    Col 2    Col 3    Col 4    Col 5    Col 6
       ┌────────┬────────┬────────┬────────┬────────┬────────┐
Row a  │        │        │WAREHOU │        │        │        │
       │        │        │   SE   │        │        │        │
       ├────────┼────────┼────────┼────────┼────────┼────────┤
Row b  │ ORDERS │        │        │ DEALS  │ SALES  │DASHBRD │
       │   ●    │        │        │   ○    │   ●    │   ○    │
       ├────────┼────────┼────────┼────────┼────────┼────────┤
Row c  │        │        │PRODUCTS│  CRM   │        │E-SIGN  │
       │        │        │   ●    │   ●    │        │   ○    │
       ├────────┼────────┼────────┼────────┼────────┼────────┤
Row d  │PLANNING│        │        │DEPOSITS│ NOTIFS │        │
       │   ●    │        │        │   ○    │   ○    │        │
       ├────────┼────────┼────────┼────────┼────────┼────────┤
Row e  │        │        │ ROUTE  │CASHBOX │INVOICE │        │
       │        │        │   ○    │   ○    │   ○    │        │
       ├────────┼────────┼────────┼────────┼────────┼────────┤
Row f  │        │PAYMENTS│        │        │        │EXPENSES│
       │        │   ●    │        │        │        │   ○    │
       └────────┴────────┴────────┴────────┴────────┴────────┘

● = Connection source (çizgi başlangıç)
○ = Connection target (çizgi bitiş)

Grid Stats:
- Total cells: 36
- Filled cells: 16
- Empty cells: 20
- Fill ratio: 44%
```

---

## 4. Group Structure & Connections

### 4.1 Group Definitions (6 Groups)

| Group | Name | Source | Targets | Connection Type |
|-------|------|--------|---------|-----------------|
| 1 | Order Management | Orders (1b) | Deals (4b) | Single line |
| 2 | Logistics | Planning (1d) | Route (3e) | Single line |
| 3 | Sales & Billing | Sales (5b) | E-Signature (6c), Invoice (5e) | **Parallel (2 lines)** |
| 4 | Inventory | Products (3c) | Warehouse (3a), Deposits (4d) | **Parallel (2 lines)** |
| 5 | Finance | Payments (2f) | Cashbox (4e), Expenses (6f) | **Parallel (2 lines)** |
| 6 | Customer | CRM (4c) | Dashboard (6b), Notifications (5d) | **Parallel (2 lines)** |

### 4.2 Parallel Line Specification

When a group has 2 targets, draw **2 separate lines** (not Y-fork):

```
Source ●────────────────────────────● Target 1
       │
       └────────────────────────────● Target 2

NOT this (Y-fork - WRONG):
Source ●──────────┬─────────────────● Target 1
                  │
                  └─────────────────● Target 2
```

---

## 5. Card Design Specification

### 5.1 Card Dimensions

| Property | Desktop | Mobile |
|----------|---------|--------|
| Width | 80px | 64px |
| Height | 80px | 64px |
| Border radius | 16px | 12px |
| Icon size | 32px | 24px |
| Label font | 11px | 10px |
| Card gap | 24px | 16px |

### 5.2 Card States

#### Inactive State
```css
.module-card--inactive {
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: none;
}

.module-card--inactive .icon {
  color: #9CA3AF;
  opacity: 0.35;
}

.module-card--inactive .label {
  display: none;
}
```

#### Inactive + Hover State
```css
.module-card--inactive:hover {
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}

.module-card--inactive:hover .icon {
  opacity: 0.55;
}

.module-card--inactive:hover .label {
  display: block;
  opacity: 0.7;
}
```

#### Active State
```css
.module-card--active {
  background: #FFFFFF;
  border: 1px solid rgba(77, 182, 160, 0.3);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(77, 182, 160, 0.1);
}

.module-card--active .icon {
  /* Gradient fill - see Icon Gradients section */
  opacity: 1;
}

.module-card--active .label {
  display: block;
  color: #1F2937;
  font-weight: 500;
}
```

### 5.3 Card Content Structure

```
┌──────────────────────────┐
│                          │
│      ┌────────────┐      │
│      │            │      │
│      │    ICON    │      │  ← 32px, centered
│      │            │      │
│      └────────────┘      │
│                          │
│        "Label"           │  ← 11px, centered, below icon
│                          │
└──────────────────────────┘

Card padding: 12px
Icon-to-label gap: 8px
```

### 5.4 Icon Gradient System (Active State)

| Group | Gradient Start | Gradient End | Glow Color |
|-------|----------------|--------------|------------|
| 1 - Orders | #4DB6A0 (Teal) | #2DD4BF | rgba(77, 182, 160, 0.3) |
| 2 - Logistics | #8B5CF6 (Purple) | #A78BFA | rgba(139, 92, 246, 0.3) |
| 3 - Sales | #3B82F6 (Blue) | #60A5FA | rgba(59, 130, 246, 0.3) |
| 4 - Inventory | #F59E0B (Amber) | #FBBF24 | rgba(245, 158, 11, 0.3) |
| 5 - Finance | #10B981 (Emerald) | #34D399 | rgba(16, 185, 129, 0.3) |
| 6 - Customer | #EC4899 (Pink) | #F472B6 | rgba(236, 72, 153, 0.3) |

---

## 6. Connection Line Specification

### 6.1 Line Layer Structure (4 Layers)

```
Layer 4 (top):    ●───────────────●   Flow Particle (animated)
Layer 3:          ═══════════════════  Glow Halo (blur)
Layer 2:          ─────────────────────  Main Line (gradient)
Layer 1 (bottom): ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  Background Trace
```

| Layer | Stroke Width | Opacity | Blur | Color |
|-------|--------------|---------|------|-------|
| Background Trace | 2px | 0.12 | 0 | #94A3B8 |
| Main Line (inactive) | 2.5px | 0.15 | 0 | Gradient |
| Main Line (active) | 3.5px | 0.85 | 0 | Gradient |
| Glow Halo | 12px | 0.4 | 8px | Group color |
| Flow Particle | 4px circle | 1.0 | 4px | #FFFFFF |

### 6.2 Line Gradients

```css
/* Primary (Teal → Purple → Blue) */
#gradient-primary {
  stop 0%: #4DB6A0;
  stop 50%: #8B5CF6;
  stop 100%: #6C91F7;
}

/* Secondary (Purple → Blue) */
#gradient-secondary {
  stop 0%: #AD6AEB;
  stop 100%: #6C91F7;
}

/* Tertiary (Amber → Yellow) */
#gradient-tertiary {
  stop 0%: #FFB86C;
  stop 100%: #F7C94C;
}
```

### 6.3 Path Style (Smooth Bezier)

```typescript
function createSmoothPath(from: Point, to: Point): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const tension = 0.4;
  
  // Horizontal dominant
  if (Math.abs(dx) > Math.abs(dy)) {
    const cp = Math.abs(dx) * tension;
    return `M ${from.x} ${from.y} C ${from.x + cp} ${from.y}, ${to.x - cp} ${to.y}, ${to.x} ${to.y}`;
  }
  
  // Vertical dominant
  const cp = Math.abs(dy) * tension;
  return `M ${from.x} ${from.y} C ${from.x} ${from.y + cp}, ${to.x} ${to.y - cp}, ${to.x} ${to.y}`;
}
```

### 6.4 Flow Particle Animation

```typescript
const flowParticleAnimation = {
  offsetDistance: ['0%', '100%'],
  opacity: [0, 1, 1, 1, 0],
  transition: {
    duration: 2.0, // seconds
    repeat: Infinity,
    ease: 'linear',
    times: [0, 0.1, 0.5, 0.9, 1] // Fade in/out at edges
  }
};
```

**Particles per line:** 2 (staggered at 50% offset)

---

## 7. Animation Specification

### 7.1 Group Cycle Behavior

```
1. Page loads → Random group becomes active (e.g., Grp 4)
2. Active group displays for 3.5 seconds
3. Transition to next group (400ms fade)
4. Repeat steps 2-3
5. After Group 6, return to Group 1
6. Infinite loop

Example sequence (starting from random Group 4):
  Grp 4 (3.5s) → Grp 5 (3.5s) → Grp 6 (3.5s) → 
  Grp 1 (3.5s) → Grp 2 (3.5s) → Grp 3 (3.5s) → 
  [back to Grp 4]
```

### 7.2 State Transitions

| Transition | Duration | Easing |
|------------|----------|--------|
| Card inactive → active | 400ms | ease-out |
| Card active → inactive | 300ms | ease-in |
| Line fade in | 400ms | ease-out |
| Line fade out | 300ms | ease-in |
| Icon color change | 300ms | ease-in-out |
| Label appear | 200ms | ease-out |
| Label disappear | 150ms | ease-in |
| Hover state | 200ms | ease-out |

### 7.3 Active Group Display

When a group is active:
1. **Source module:** Full active state
2. **Target module(s):** Full active state
3. **Connection line(s):** Visible with glow and particles
4. **All other modules:** Inactive state (gray, no label)

### 7.4 Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .flow-particle { display: none; }
  .module-card { transition: none; }
  .connection-line { transition: none; }
  .glow-layer { animation: none; }
}
```

---

## 8. Responsive Design

### 8.1 Breakpoints

| Breakpoint | Grid Layout | Card Size | Behavior |
|------------|-------------|-----------|----------|
| Desktop (≥1024px) | 6×6 | 80×80px | Full animation |
| Tablet (768-1023px) | 6×6 | 72×72px | Full animation |
| Mobile (≤767px) | **4×6** | 64×64px | Simplified animation |

### 8.2 Mobile Grid (4×6)

```
        Col 1    Col 2    Col 3    Col 4
       ┌────────┬────────┬────────┬────────┐
Row a  │        │WAREHOU │        │        │
       ├────────┼────────┼────────┼────────┤
Row b  │ ORDERS │ DEALS  │ SALES  │DASHBRD │
       ├────────┼────────┼────────┼────────┤
Row c  │PRODUCTS│  CRM   │        │E-SIGN  │
       ├────────┼────────┼────────┼────────┤
Row d  │PLANNING│DEPOSITS│ NOTIFS │        │
       ├────────┼────────┼────────┼────────┤
Row e  │ ROUTE  │CASHBOX │INVOICE │        │
       ├────────┼────────┼────────┼────────┤
Row f  │PAYMENTS│        │        │EXPENSES│
       └────────┴────────┴────────┴────────┘
```

### 8.3 Container Dimensions

| Breakpoint | Container Width | Container Height |
|------------|-----------------|------------------|
| Desktop | ~600px | ~600px |
| Tablet | ~520px | ~520px |
| Mobile | ~320px | ~480px |

---

## 9. Accessibility Requirements

### 9.1 WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | Active icons: 4.5:1 minimum against white |
| Focus visible | 2px outline on keyboard focus |
| Reduced motion | Disable animations per user preference |
| Screen reader | aria-label on each module card |
| Touch target | 44×44px minimum (cards exceed this) |

### 9.2 ARIA Implementation

```html
<div 
  role="region" 
  aria-label="ERP Module Workflow Visualization"
  aria-live="polite"
>
  <div 
    role="button"
    aria-pressed="false"
    aria-label="Orders module - Click to learn more"
    tabindex="0"
  >
    <!-- Card content -->
  </div>
</div>
```

### 9.3 Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move focus to next module |
| Shift+Tab | Move focus to previous module |
| Enter/Space | Activate focused module (pause animation) |
| Escape | Resume animation |

---

## 10. i18n Translation Keys

```json
{
  "moduleGrid": {
    "ariaLabel": {
      "de": "ERP-Modul Workflow-Visualisierung",
      "en": "ERP Module Workflow Visualization",
      "tr": "ERP Modül İş Akışı Görselleştirmesi"
    },
    "modules": {
      "orders": { "de": "Aufträge", "en": "Orders", "tr": "Siparişler" },
      "deals": { "de": "Angebote", "en": "Deals", "tr": "Teklifler" },
      "planning": { "de": "Planung", "en": "Planning", "tr": "Planlama" },
      "route": { "de": "Routenplanung", "en": "Route", "tr": "Rota" },
      "sales": { "de": "Verkauf", "en": "Sales", "tr": "Satış" },
      "invoice": { "de": "Rechnung", "en": "Invoice", "tr": "Fatura" },
      "esignature": { "de": "E-Signatur", "en": "E-Signature", "tr": "E-İmza" },
      "warehouse": { "de": "Lager", "en": "Warehouse", "tr": "Depo" },
      "products": { "de": "Produkte", "en": "Products", "tr": "Ürünler" },
      "deposits": { "de": "Einlagen", "en": "Deposits", "tr": "Depozitolar" },
      "payments": { "de": "Zahlungen", "en": "Payments", "tr": "Ödemeler" },
      "cashbox": { "de": "Kasse", "en": "Cashbox", "tr": "Kasa" },
      "expenses": { "de": "Ausgaben", "en": "Expenses", "tr": "Giderler" },
      "crm": { "de": "CRM", "en": "CRM", "tr": "CRM" },
      "dashboard": { "de": "Dashboard", "en": "Dashboard", "tr": "Gösterge Paneli" },
      "notifications": { "de": "Benachrichtigungen", "en": "Notifications", "tr": "Bildirimler" }
    }
  }
}
```

---

## 11. Icon Assignments (Lucide React)

| Module | Icon Name |
|--------|-----------|
| orders | `ClipboardList` |
| deals | `Handshake` |
| planning | `CalendarDays` |
| route | `Route` |
| sales | `BadgeDollarSign` |
| invoice | `FileText` |
| esignature | `PenTool` |
| warehouse | `Warehouse` |
| products | `Package` |
| deposits | `Landmark` |
| payments | `CreditCard` |
| cashbox | `Banknote` |
| expenses | `TrendingDown` |
| crm | `Users` |
| dashboard | `LayoutDashboard` |
| notifications | `Bell` |

---

## 12. Design Tokens

```typescript
const MODULE_GRID_TOKENS = {
  // Card
  cardSize: { desktop: 80, tablet: 72, mobile: 64 },
  cardRadius: { desktop: 16, tablet: 14, mobile: 12 },
  cardGap: { desktop: 24, tablet: 20, mobile: 16 },
  
  // Animation
  groupDuration: 3500, // ms
  transitionDuration: 400, // ms
  flowParticleDuration: 2000, // ms
  
  // Colors
  inactiveIconColor: '#9CA3AF',
  inactiveIconOpacity: 0.35,
  hoverIconOpacity: 0.55,
  
  // Connection Lines
  lineWidthInactive: 2.5,
  lineWidthActive: 3.5,
  glowBlur: 8,
  glowOpacity: 0.4,
};
```

---

## 13. Revision History

| Version | Date | Changes |
|---------|------|---------|
| 4.0 | 2026-01-23 | Initial v4.0 specification |
