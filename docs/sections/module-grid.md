# Module Grid Section Specification

**Status:** Draft - Awaiting Approval  
**Version:** 1.0  
**Last Updated:** 2025-01-22

---

## Overview

The Module Grid is an animated, interactive visualization of Soluty's ERP system capabilities. It demonstrates how different business modules connect and work together in a delivery workflow context.

**Purpose:** Show the breadth and integration of custom ERP functionality without overwhelming the user with technical details.

**Behavior:** Auto-cycling animation with hover interaction for module details.

---

## Modules (10 items)

| # | Key | DE | EN | TR | Icon |
|---|-----|----|----|----|----|
| 1 | order | Bestellung | Order | Sipariş | 📦 |
| 2 | workPlan | Arbeitsplan | Work Plan | İş Planı | 📋 |
| 3 | routeOptimization | Routenoptimierung | Route Optimization | Rota Optimizasyonu | 🗺️ |
| 4 | sales | Vertrieb | Sales | Satış | 💰 |
| 5 | deliveryNote | Lieferschein | Delivery Note | Lieferschein | 📄 |
| 6 | warehouse | Lager | Warehouse | Depo | 🏭 |
| 7 | productManagement | Produktverwaltung | Product Management | Ürün Yönetimi | 📦 |
| 8 | crm | CRM | CRM | CRM | 👥 |
| 9 | invoice | Rechnung | Invoice | Fatura | 🧾 |
| 10 | payments | Zahlungen | Payments | Ödemeler | 💳 |

**Note:** Module list is configurable — can be expanded or reduced.

---

## Flow Sequence (Connection Lines)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [Bestellung] ──► [Arbeitsplan] ──► [Routenoptimierung]   │
│        │                                      │             │
│        │                                      ▼             │
│        │                              [Lieferschein]        │
│        │                                      │             │
│        │                                      ▼             │
│        │                                  [Lager]           │
│        ▼                                      │             │
│   [Vertrieb] ◄──── [CRM] ◄──── [Produktverwaltung]         │
│        │                                                    │
│        ▼                                                    │
│   [Rechnung] ──────────────────────► [Zahlungen]           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Animation Order (1-10):**
1. Bestellung (Order)
2. Arbeitsplan (Work Plan)
3. Routenoptimierung (Route Optimization)
4. Lieferschein (Delivery Note)
5. Lager (Warehouse)
6. Produktverwaltung (Product Management)
7. CRM
8. Vertrieb (Sales)
9. Rechnung (Invoice)
10. Zahlungen (Payments)

---

## Animation Behavior

### Auto-Cycle

| Property | Value |
|----------|-------|
| Interval | 500ms (0.5 seconds) |
| Loop | Continuous (restarts after last module) |
| Pause on hover | No |
| Pause on click | No |

### Module Highlight

When a module is "active" in the cycle:
- Module icon scales up slightly (1.1x)
- Connection line to next module animates (stroke-dashoffset)
- Subtle glow or border highlight on active module

### Hover Interaction

| Trigger | Action |
|---------|--------|
| Mouse enter module | Show module name tooltip |
| Mouse leave module | Hide tooltip |
| Click module | No action (future: could link to detail) |

**Important:** Hover shows tooltip but does NOT pause the auto-cycle animation.

---

## Visual Design

### Grid Layout

**Desktop (≥1024px):**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    MODULE GRID SECTION                          │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │      ┌────┐      ┌────┐      ┌────┐                      │ │
│  │      │ 📦 │ ───► │ 📋 │ ───► │ 🗺️ │                      │ │
│  │      └────┘      └────┘      └────┘                      │ │
│  │         │                        │                        │ │
│  │         │                        ▼                        │ │
│  │         │        ┌────┐      ┌────┐      ┌────┐          │ │
│  │         │        │ 💰 │ ◄─── │ 👥 │ ◄─── │ 📦 │          │ │
│  │         │        └────┘      └────┘      └────┘          │ │
│  │         │           │                        ▲            │ │
│  │         │           ▼                        │            │ │
│  │         │        ┌────┐      ┌────┐      ┌────┐          │ │
│  │         └──────► │ 📄 │ ───► │ 🏭 │ ───► │ 🧾 │ ──► 💳   │ │
│  │                  └────┘      └────┘      └────┘          │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│                    [Optional Section Headline]                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Mobile (<768px):**

```
┌─────────────────────────┐
│                         │
│   MODULE GRID           │
│   (Horizontal scroll    │
│    or compact 3x4)      │
│                         │
│   ┌────┬────┬────┐     │
│   │ 📦 │ 📋 │ 🗺️ │     │
│   ├────┼────┼────┤     │
│   │ 📄 │ 🏭 │ 📦 │     │
│   ├────┼────┼────┤     │
│   │ 👥 │ 💰 │ 🧾 │     │
│   ├────┴────┴────┤     │
│   │     💳       │     │
│   └──────────────┘     │
│                         │
│   Connection lines      │
│   simplified or hidden  │
│                         │
└─────────────────────────┘
```

### Module Card

```
┌──────────────┐
│              │
│    [ICON]    │   64x64px (desktop)
│     48px     │   48x48px (mobile)
│              │
└──────────────┘

Hover state:
┌──────────────┐
│    [ICON]    │
│   ────────   │
│  Module Name │  (tooltip below)
└──────────────┘
```

### Connection Lines

| Property | Value |
|----------|-------|
| Stroke width | 2px |
| Color | Brand color (#4DB6A0) at 60% opacity |
| Active color | Brand color (#4DB6A0) at 100% |
| Style | Solid or dashed |
| Animation | stroke-dashoffset for "drawing" effect |

### Colors

| Element | Color |
|---------|-------|
| Module background | White or very light gray (#F9FAFB) |
| Module border (default) | Light gray (#E5E7EB) |
| Module border (active) | Brand color (#4DB6A0) |
| Icon color | Dark gray (#374151) |
| Icon color (active) | Brand color (#4DB6A0) |
| Connection line | Brand color at varying opacity |
| Tooltip background | Dark (#1F2937) |
| Tooltip text | White |

---

## Spacing

| Element | Desktop | Mobile |
|---------|---------|--------|
| Section padding (top/bottom) | 80px | 48px |
| Grid container max-width | 800px | 100% |
| Module card size | 80x80px | 64x64px |
| Gap between modules | 24px | 16px |
| Tooltip offset | 8px below | 8px below |

---

## Technical Requirements

### Animation Library

**Framer Motion** (approved)

```typescript
import { motion, AnimatePresence } from 'framer-motion';
```

### Key Hooks

```typescript
// Auto-cycle state management
const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % modules.length);
  }, 500);
  return () => clearInterval(interval);
}, []);
```

### SVG Connection Lines

```typescript
// Bezier curves connecting modules
<svg className="absolute inset-0 pointer-events-none">
  <motion.path
    d="M x1,y1 C cx1,cy1 cx2,cy2 x2,y2"
    stroke="#4DB6A0"
    strokeWidth={2}
    fill="none"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.5 }}
  />
</svg>
```

### Accessibility

- Grid container: `role="img"` with `aria-label` describing the module flow
- Individual modules: `aria-hidden="true"` (decorative)
- Tooltip: Not essential information (decorative enhancement)
- Reduced motion: Respect `prefers-reduced-motion` — disable auto-cycle

```typescript
const prefersReducedMotion = usePrefersReducedMotion();

useEffect(() => {
  if (prefersReducedMotion) return; // No animation
  // ... interval logic
}, [prefersReducedMotion]);
```

### Performance

- SVG-based icons (not images)
- CSS transforms for scaling (GPU accelerated)
- No layout thrashing during animation
- Lazy load if below fold

---

## i18n Translation Keys

```json
{
  "moduleGrid": {
    "sectionTitle": "Integrated ERP Modules",
    "modules": {
      "order": "Order",
      "workPlan": "Work Plan",
      "routeOptimization": "Route Optimization",
      "sales": "Sales",
      "deliveryNote": "Delivery Note",
      "warehouse": "Warehouse",
      "productManagement": "Product Management",
      "crm": "CRM",
      "invoice": "Invoice",
      "payments": "Payments"
    }
  }
}
```

**German (de.json):**
```json
{
  "moduleGrid": {
    "sectionTitle": "Integrierte ERP-Module",
    "modules": {
      "order": "Bestellung",
      "workPlan": "Arbeitsplan",
      "routeOptimization": "Routenoptimierung",
      "sales": "Vertrieb",
      "deliveryNote": "Lieferschein",
      "warehouse": "Lager",
      "productManagement": "Produktverwaltung",
      "crm": "CRM",
      "invoice": "Rechnung",
      "payments": "Zahlungen"
    }
  }
}
```

**Turkish (tr.json):**
```json
{
  "moduleGrid": {
    "sectionTitle": "Entegre ERP Modülleri",
    "modules": {
      "order": "Sipariş",
      "workPlan": "İş Planı",
      "routeOptimization": "Rota Optimizasyonu",
      "sales": "Satış",
      "deliveryNote": "Lieferschein",
      "warehouse": "Depo",
      "productManagement": "Ürün Yönetimi",
      "crm": "CRM",
      "invoice": "Fatura",
      "payments": "Ödemeler"
    }
  }
}
```

---

## Component Structure

```
src/components/sections/
└── ModuleGrid/
    ├── index.tsx              # Main component
    ├── ModuleCard.tsx         # Individual module with icon
    ├── ConnectionLines.tsx    # SVG connection paths
    ├── ModuleTooltip.tsx      # Hover tooltip
    ├── useModuleCycle.ts      # Auto-cycle hook
    └── modules-data.ts        # Module definitions
```

---

## Data Structure

```typescript
// modules-data.ts

export interface Module {
  id: string;
  key: string;           // i18n key
  icon: string;          // Icon identifier (Lucide icon name)
  position: {
    row: number;         // Grid row (1-4)
    col: number;         // Grid column (1-4)
  };
  connectsTo: string[];  // IDs of connected modules
}

export const modules: Module[] = [
  {
    id: 'order',
    key: 'order',
    icon: 'Package',
    position: { row: 1, col: 1 },
    connectsTo: ['workPlan', 'deliveryNote']
  },
  // ... remaining modules
];
```

---

## Out of Scope

- Click action on modules (future enhancement)
- Detailed module descriptions
- Module filtering or search
- Drag-and-drop reordering
- Integration with actual backend data

---

## Dependencies

- `framer-motion` — Animation library
- `next-intl` — Translations
- `lucide-react` — Icons
- Tailwind CSS — Styling

---

## Acceptance Criteria

- [ ] 10 modules display in grid layout
- [ ] Auto-cycle animation runs at 500ms intervals
- [ ] Connection lines animate between modules
- [ ] Hover shows module name tooltip
- [ ] Click does nothing (no errors)
- [ ] Animation loops continuously
- [ ] Reduced motion preference respected
- [ ] Responsive: Desktop grid, mobile compact
- [ ] All text from translation files (DE/EN/TR)
- [ ] Icons render correctly (Lucide)
- [ ] No performance issues (60fps animation)

---

## Open Questions

1. **Section placement:** Where does this grid appear on the homepage? (Suggest: after Hero, before Services detail)

2. **Section headline:** Should there be a headline above the grid? (e.g., "Integrated ERP Modules")

3. **Icon selection:** Approve icon choices or provide alternatives?

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-22 | Initial specification |
