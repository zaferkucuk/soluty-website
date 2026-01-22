# Module Grid Component Specification

**Status:** Ready for Implementation  
**Version:** 1.2  
**Last Updated:** 2025-01-22

---

## Overview

The Module Grid is an animated, interactive visualization of Soluty's ERP system capabilities. It replaces the current static Hero illustration and demonstrates how different business modules connect and work together in a delivery workflow context.

**Purpose:** Show the breadth and integration of custom ERP functionality without overwhelming the user with technical details.

**Placement:** Hero section — right side (replaces current static SVG illustration)

**Behavior:** Auto-cycling animation with active label display and hover interaction for additional details.

---

## Integration with Hero Section

### Current Hero Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────┐  ┌──────────────────────────────┐ │
│  │                         │  │                              │ │
│  │  HEADLINE               │  │   [CURRENT: Static SVG       │ │
│  │  SUBHEADLINE            │  │    - TO BE REMOVED]          │ │
│  │                         │  │                              │ │
│  │  [CTA BUTTONS]          │  │                              │ │
│  │                         │  │                              │ │
│  └─────────────────────────┘  └──────────────────────────────┘ │
│                                                                 │
│  TRUST BAR                                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### New Hero Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────┐  ┌──────────────────────────────┐ │
│  │                         │  │                              │ │
│  │  HEADLINE               │  │   [NEW: Animated Module      │ │
│  │  SUBHEADLINE            │  │    Grid Component]           │ │
│  │                         │  │                              │ │
│  │  [CTA BUTTONS]          │  │   Auto-cycling + active      │ │
│  │                         │  │   label + hover tooltips     │ │
│  └─────────────────────────┘  └──────────────────────────────┘ │
│                                                                 │
│  TRUST BAR                                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Note:** No separate section headline — the grid speaks for itself within the Hero context.

---

## Modules (10 items)

| # | Key | DE | EN | TR | Lucide Icon |
|---|-----|----|----|----|----|
| 1 | order | Bestellung | Order | Sipariş | `Package` |
| 2 | workPlan | Arbeitsplan | Work Plan | İş Planı | `ClipboardList` |
| 3 | routeOptimization | Routenoptimierung | Route Optimization | Rota Optimizasyonu | `Map` |
| 4 | sales | Vertrieb | Sales | Satış | `TrendingUp` |
| 5 | deliveryNote | Lieferschein | Delivery Note | Lieferschein | `FileText` |
| 6 | warehouse | Lager | Warehouse | Depo | `Warehouse` |
| 7 | productManagement | Produktverwaltung | Product Management | Ürün Yönetimi | `Boxes` |
| 8 | crm | CRM | CRM | CRM | `Users` |
| 9 | invoice | Rechnung | Invoice | Fatura | `Receipt` |
| 10 | payments | Zahlungen | Payments | Ödemeler | `CreditCard` |

**Note:** Module list is configurable — can be expanded or reduced. Icons are Lucide (can be replaced with custom SVGs later).

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
| Loop | Continuous (restarts after module 10) |
| Pause on hover | No |
| Pause on click | No |

### Module Highlight (Active State)

When a module is "active" in the cycle:
- Module icon scales up slightly (1.1x)
- Border color changes to brand color (#4DB6A0)
- Icon color changes to brand color
- **Shadow/elevation effect appears** (box-shadow)
- **Module name label appears below the card** (permanent while active)
- Connection line to next module animates (stroke-dashoffset)

### Active Label Display (NEW in v1.2)

| Property | Value |
|----------|-------|
| Visibility | Always visible when module is active |
| Position | Centered below the module card |
| Animation | Fade in (150ms) when becoming active |
| Content | Translated module name from i18n |
| Style | Dark background pill, white text |

**Important:** The active label is different from hover tooltip. Active label shows automatically during auto-cycle. Hover tooltip provides additional context on mouse interaction.

### Hover Interaction

| Trigger | Action |
|---------|--------|
| Mouse enter module | Show module name tooltip (if not already active) |
| Mouse leave module | Hide tooltip |
| Click module | No action (no errors, future enhancement) |

**Note:** If the hovered module is already active (showing label), the hover tooltip is suppressed to avoid duplication.

---

## Visual Design

### Desktop Layout (≥1024px)

```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│      ┌────┐      ┌────┐      ┌────┐                      │
│      │ 📦 │ ───► │ 📋 │ ───► │ 🗺️ │                      │
│      └────┘      └────┘      └────┘                      │
│         │                        │                        │
│         │                        ▼                        │
│         │        ┌────┐      ┌────┐      ┌────┐          │
│         │        │ 💰 │ ◄─── │ 👥 │ ◄─── │ 📦 │          │
│         │        └────┘      └────┘      └────┘          │
│         │           │                        ▲            │
│         │           ▼                        │            │
│         │        ┌────┐      ┌────┐      ┌────┐          │
│         └──────► │ 📄 │ ───► │ 🏭 │ ───► │ 🧾 │ ──► 💳   │
│                  └────┘      └────┘      └────┘          │
│                                                           │
└───────────────────────────────────────────────────────────┘

Container: ~45% of Hero width (right side)
```

### Mobile Layout (<768px)

```
┌─────────────────────────┐
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
│   Connection lines:     │
│   Simplified/hidden     │
│                         │
└─────────────────────────┘

Placed between headline and CTAs on mobile
```

### Module Card States

#### Default State
```
┌──────────────┐
│              │
│    [ICON]    │   
│              │
└──────────────┘
```
- Size: 64x64px (desktop), 48x48px (mobile)
- Background: #F9FAFB
- Border: 1px solid #E5E7EB
- Icon: #374151
- Shadow: none

#### Active State (NEW: includes label + shadow)
```
    ╔══════════════╗
    ║              ║
    ║    [ICON]    ║   ← Shadow + scale(1.1)
    ║              ║
    ╚══════════════╝
    ┌────────────────┐
    │  Module Name   │   ← Active label (auto-shown)
    └────────────────┘
```
- Border: 2px solid #4DB6A0
- Icon: #4DB6A0
- Transform: scale(1.1)
- **Shadow: 0 8px 24px rgba(77, 182, 160, 0.25)**
- **Label visible below card**

#### Hover State (non-active module)
```
┌──────────────┐
│    [ICON]    │
└──────────────┘
    ┌────────────┐
    │ Module Name│  ← Tooltip (on hover only)
    └────────────┘
```
- Tooltip BG: #1F2937
- Tooltip Text: #FFFFFF

### Active Label Component

| Property | Value |
|----------|-------|
| Background | #1F2937 (dark gray) |
| Text color | #FFFFFF |
| Font size | 12px |
| Font weight | 500 (medium) |
| Padding | 4px 12px |
| Border radius | 16px (pill shape) |
| Margin top | 8px (below card) |
| Max width | 120px |
| Text overflow | ellipsis |

### Connection Lines (UPDATED in v1.2)

| Property | Value |
|----------|-------|
| Stroke width | 2px |
| Default color | #4DB6A0 at 30% opacity |
| Active color | #4DB6A0 at 100% opacity |
| Style | Solid |
| Animation | stroke-dashoffset "drawing" effect |
| **Path type** | **L-shaped orthogonal (right angles)** |
| Corner radius | 4px (subtle rounding at corners) |

**Path Behavior:**
- Lines travel along grid edges (horizontal or vertical)
- When changing direction, lines make 90° turns
- No diagonal lines
- Path flows around modules, not through them

**Example L-shaped path:**
```
[Module A] ────┐
               │
               └──── [Module B]
```

### Colors (Brand Aligned)

| Element | Value |
|---------|-------|
| Module background | #F9FAFB |
| Module border (default) | #E5E7EB |
| Module border (active) | #4DB6A0 |
| Icon color (default) | #374151 |
| Icon color (active) | #4DB6A0 |
| Connection line | #4DB6A0 (varying opacity) |
| Tooltip/Label background | #1F2937 |
| Tooltip/Label text | #FFFFFF |
| **Active shadow** | rgba(77, 182, 160, 0.25) |

---

## Spacing

| Element | Desktop | Mobile |
|---------|---------|--------|
| Grid container max-width | 400px | 280px |
| Module card size | 64x64px | 48x48px |
| Gap between modules | 16px | 12px |
| Label/Tooltip offset | 8px below card | 8px below card |
| **Active label height** | 24px | 20px |

---

## Technical Requirements

### Animation Library

**Framer Motion** (approved)

```typescript
import { motion, AnimatePresence } from 'framer-motion';
```

### Auto-Cycle Hook

```typescript
// hooks/useModuleCycle.ts
import { useState, useEffect } from 'react';

export function useModuleCycle(moduleCount: number, interval: number = 500) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % moduleCount);
    }, interval);
    
    return () => clearInterval(timer);
  }, [moduleCount, interval]);
  
  return activeIndex;
}
```

### L-Shaped Path Generator

```typescript
// utils/pathGenerator.ts
interface Point {
  x: number;
  y: number;
}

export function generateOrthogonalPath(from: Point, to: Point): string {
  // Determine if horizontal-first or vertical-first based on positions
  const midX = from.x;
  const midY = to.y;
  
  // Create L-shaped path with rounded corner
  return `M ${from.x} ${from.y} L ${midX} ${midY} L ${to.x} ${to.y}`;
}
```

### Reduced Motion Support

```typescript
import { useReducedMotion } from 'framer-motion';

function ModuleGrid() {
  const shouldReduceMotion = useReducedMotion();
  
  // If reduced motion preferred, show static grid without animation
  if (shouldReduceMotion) {
    return <StaticModuleGrid />;
  }
  
  return <AnimatedModuleGrid />;
}
```

### Accessibility

- Container: `role="img"` with `aria-label="ERP module workflow visualization showing connected business modules"`
- Individual modules: `aria-hidden="true"` (decorative)
- Active label: Uses `aria-live="polite"` for screen reader announcements
- Tooltip: Uses `aria-describedby` pattern
- Reduced motion: Respect `prefers-reduced-motion`
- No essential information conveyed only through animation

### Performance

- Lucide icons (SVG, tree-shakeable)
- CSS transforms for scaling (GPU accelerated)
- `will-change: transform` on animated elements
- Single interval timer, not per-module timers
- Connection lines as single SVG layer
- AnimatePresence for smooth label transitions

---

## i18n Translation Keys

```json
{
  "moduleGrid": {
    "ariaLabel": "ERP module workflow visualization",
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

---

## Component Structure

```
src/components/sections/HeroSection/
├── index.tsx                  # Main Hero (updated)
├── HeroContent.tsx            # Text + CTAs (unchanged)
├── ModuleGrid/                # NEW - replaces HeroIllustration
│   ├── index.tsx              # Main grid component
│   ├── ModuleCard.tsx         # Individual module with icon
│   ├── ModuleLabel.tsx        # Active label component (NEW)
│   ├── ConnectionLines.tsx    # SVG connection paths (L-shaped)
│   ├── ModuleTooltip.tsx      # Hover tooltip
│   └── modules-data.ts        # Module definitions + positions
├── TrustBar.tsx               # Trust badges (unchanged)
└── HeroIllustration.tsx       # TO BE DELETED
```

---

## Data Structure

```typescript
// ModuleGrid/modules-data.ts
import { 
  Package, ClipboardList, Map, TrendingUp, FileText,
  Warehouse, Boxes, Users, Receipt, CreditCard 
} from 'lucide-react';

export interface Module {
  id: string;
  key: string;           // i18n key
  icon: React.ComponentType;
  gridPosition: { row: number; col: number };
  connectsTo: string[];  // IDs of next modules in flow
}

export const modules: Module[] = [
  {
    id: 'order',
    key: 'order',
    icon: Package,
    gridPosition: { row: 1, col: 1 },
    connectsTo: ['workPlan', 'sales']
  },
  {
    id: 'workPlan',
    key: 'workPlan',
    icon: ClipboardList,
    gridPosition: { row: 1, col: 2 },
    connectsTo: ['routeOptimization']
  },
  {
    id: 'routeOptimization',
    key: 'routeOptimization',
    icon: Map,
    gridPosition: { row: 1, col: 3 },
    connectsTo: ['deliveryNote']
  },
  {
    id: 'deliveryNote',
    key: 'deliveryNote',
    icon: FileText,
    gridPosition: { row: 2, col: 3 },
    connectsTo: ['warehouse']
  },
  {
    id: 'warehouse',
    key: 'warehouse',
    icon: Warehouse,
    gridPosition: { row: 3, col: 3 },
    connectsTo: ['productManagement']
  },
  {
    id: 'productManagement',
    key: 'productManagement',
    icon: Boxes,
    gridPosition: { row: 2, col: 3 },
    connectsTo: ['crm']
  },
  {
    id: 'crm',
    key: 'crm',
    icon: Users,
    gridPosition: { row: 2, col: 2 },
    connectsTo: ['sales']
  },
  {
    id: 'sales',
    key: 'sales',
    icon: TrendingUp,
    gridPosition: { row: 2, col: 1 },
    connectsTo: ['invoice']
  },
  {
    id: 'invoice',
    key: 'invoice',
    icon: Receipt,
    gridPosition: { row: 3, col: 1 },
    connectsTo: ['payments']
  },
  {
    id: 'payments',
    key: 'payments',
    icon: CreditCard,
    gridPosition: { row: 3, col: 2 },
    connectsTo: [] // End of flow
  }
];

// Animation sequence order
export const animationOrder = [
  'order', 'workPlan', 'routeOptimization', 'deliveryNote', 
  'warehouse', 'productManagement', 'crm', 'sales', 
  'invoice', 'payments'
];
```

---

## Migration Steps

1. Create `ModuleGrid/` component folder inside `HeroSection/`
2. Implement `ModuleCard` with shadow support
3. Implement `ModuleLabel` for active state display
4. Implement `ConnectionLines` with L-shaped paths
5. Implement `ModuleTooltip` for hover
6. Create `modules-data.ts` with module definitions
7. Update `HeroSection/index.tsx` to use `ModuleGrid` instead of `HeroIllustration`
8. Add i18n keys to `messages/{de,en,tr}.json`
9. Delete `HeroIllustration.tsx`
10. Test all breakpoints and languages

---

## Out of Scope

- Click action on modules
- Detailed module descriptions/modals
- Module filtering or search
- Drag-and-drop reordering
- Backend data integration
- Custom SVG icons (using Lucide for now)
- Module-specific colors (all use brand teal)

---

## Dependencies

- `framer-motion` — Animation (needs to be added to project)
- `next-intl` — Translations (already in project)
- `lucide-react` — Icons (already in project)
- Tailwind CSS — Styling (already in project)

---

## Acceptance Criteria

- [ ] 10 modules display correctly in grid layout
- [ ] Auto-cycle runs at 500ms intervals
- [ ] Active module has visual highlight (scale + color)
- [ ] **Active module shows label with translated name**
- [ ] **Active module has shadow/elevation effect**
- [ ] **Connection lines use L-shaped orthogonal paths**
- [ ] Connection lines animate between modules
- [ ] Hover shows tooltip (for non-active modules)
- [ ] Click does nothing (no errors)
- [ ] Animation loops continuously (restarts after module 10)
- [ ] `prefers-reduced-motion` shows static grid
- [ ] Responsive: Desktop (side of hero), Mobile (compact grid)
- [ ] All module names from translation files (DE/EN/TR)
- [ ] Lucide icons render correctly
- [ ] No performance issues (60fps animation)
- [ ] Old HeroIllustration component removed

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-22 | Initial specification |
| 1.1 | 2025-01-22 | Updated: placement in Hero (not separate section), Lucide icons confirmed, removed section headline |
| 1.2 | 2025-01-22 | **Major update:** Added active label display, L-shaped connection paths, shadow/elevation effect. Based on Stripe.com comparison analysis. |
