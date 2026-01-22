# Task: Module Grid Implementation (v1.2)

**Priority:** High  
**Role:** Web Developer  
**Status:** Ready to Start  
**Spec Version:** 1.2

---

## Pre-Task: Read These Files First

```
1. docs/DEV_STANDARDS.md        → Coding conventions
2. docs/technical_constraints.md → Technology boundaries  
3. docs/sections/module-grid.md  → Full specification (SOURCE OF TRUTH) ⚠️ v1.2
```

Do NOT write any code until you have read all three files.

---

## Goal

Replace the static `HeroIllustration` component with an animated `ModuleGrid` component that shows 10 ERP modules with:
- Auto-cycling animation (500ms)
- **Active label display** (shows module name when active)
- **L-shaped connection paths** (orthogonal, not bezier)
- **Shadow/elevation effect** on active module
- Hover tooltips for non-active modules

---

## What Changed in v1.2

| Feature | v1.1 | v1.2 |
|---------|------|------|
| Active module display | Icon highlight only | Icon + label + shadow |
| Connection paths | Bezier curves | L-shaped orthogonal |
| Hover tooltip | Always shown | Only for non-active modules |
| New component | - | ModuleLabel.tsx |

---

## Step-by-Step Implementation

### Step 1: Install Framer Motion

```bash
npm install framer-motion
```

Verify it's added to `package.json`.

---

### Step 2: Create Module Data File

**File:** `src/components/sections/HeroSection/ModuleGrid/modules-data.ts`

Create module definitions with:
- 10 modules (order, workPlan, routeOptimization, sales, deliveryNote, warehouse, productManagement, crm, invoice, payments)
- Each module has: id, key (for i18n), icon (Lucide component), gridPosition, connectsTo array
- Export `animationOrder` array for cycle sequence

Reference: See "Data Structure" section in `docs/sections/module-grid.md`

---

### Step 3: Create ModuleCard Component

**File:** `src/components/sections/HeroSection/ModuleGrid/ModuleCard.tsx`

Props:
- `module`: Module data object
- `isActive`: boolean
- `onHover`: (isHovering: boolean) => void

Features:
- Render Lucide icon
- Scale to 1.1x when active
- Border color change when active (#4DB6A0)
- Icon color change when active
- **Shadow effect when active:** `box-shadow: 0 8px 24px rgba(77, 182, 160, 0.25)`

Use Framer Motion for animations.

---

### Step 4: Create ModuleLabel Component (NEW in v1.2)

**File:** `src/components/sections/HeroSection/ModuleGrid/ModuleLabel.tsx`

Props:
- `moduleName`: string (translated)
- `isVisible`: boolean

Features:
- **Always visible when module is active** (not just on hover)
- Dark background pill (#1F2937)
- White text (#FFFFFF)
- Font size: 12px, weight: 500
- Padding: 4px 12px
- Border radius: 16px (pill shape)
- Positioned 8px below card (centered)
- Fade in animation (150ms) using AnimatePresence

```tsx
import { motion, AnimatePresence } from 'framer-motion';

interface ModuleLabelProps {
  moduleName: string;
  isVisible: boolean;
}

export function ModuleLabel({ moduleName, isVisible }: ModuleLabelProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 
                     px-3 py-1 bg-gray-800 text-white text-xs font-medium 
                     rounded-full whitespace-nowrap"
          aria-live="polite"
        >
          {moduleName}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

### Step 5: Create ModuleTooltip Component

**File:** `src/components/sections/HeroSection/ModuleGrid/ModuleTooltip.tsx`

Props:
- `moduleName`: string (translated)
- `isVisible`: boolean

Features:
- Dark background (#1F2937)
- White text
- Positioned 8px below card
- Fade in/out animation
- **Only shown for non-active modules on hover**

---

### Step 6: Create ConnectionLines Component (UPDATED in v1.2)

**File:** `src/components/sections/HeroSection/ModuleGrid/ConnectionLines.tsx`

Props:
- `modules`: Module[]
- `activeModuleId`: string
- `gridCellSize`: number (for position calculations)

Features:
- SVG overlay with pointer-events: none
- **L-shaped orthogonal paths** (right angles, no diagonals)
- Active connection line at full opacity (#4DB6A0)
- Inactive lines at 30% opacity
- stroke-dashoffset animation for "drawing" effect
- Corner radius: 4px at turns

**Path Generation Logic:**
```typescript
function generateOrthogonalPath(from: Point, to: Point): string {
  // Horizontal first, then vertical
  const midX = to.x;
  const midY = from.y;
  
  return `M ${from.x} ${from.y} L ${midX} ${midY} L ${to.x} ${to.y}`;
}
```

**Example paths:**
```
Horizontal then vertical:
[A] ────┐
        │
        └──── [B]

Vertical then horizontal:
[A]
 │
 └──────── [B]
```

---

### Step 7: Create Main ModuleGrid Component

**File:** `src/components/sections/HeroSection/ModuleGrid/index.tsx`

Features:
- Import all sub-components (ModuleCard, ModuleLabel, ModuleTooltip, ConnectionLines)
- Use `useState` for activeIndex and hoveredModule
- Use `useEffect` with setInterval (500ms) for auto-cycle
- Handle `prefers-reduced-motion` (show static grid)
- Grid layout matching spec (see wireframe in spec)
- Pass correct props to children
- **Show ModuleLabel for active module**
- **Show ModuleTooltip only when hovering non-active module**

Add `"use client"` directive at top (client component for animations).

```tsx
// Tooltip logic
const showTooltip = hoveredModule && hoveredModule !== activeModuleId;
const showLabel = activeModuleId; // Always show for active
```

---

### Step 8: Create Index Export

**File:** `src/components/sections/HeroSection/ModuleGrid/index.ts` (if needed)

Or ensure `index.tsx` exports the component as default.

---

### Step 9: Add Translation Keys

Update these files:

**`messages/en.json`** — Add under root:
```json
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
```

**`messages/de.json`** — Add:
```json
"moduleGrid": {
  "ariaLabel": "ERP-Modul-Workflow-Visualisierung",
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
```

**`messages/tr.json`** — Add:
```json
"moduleGrid": {
  "ariaLabel": "ERP modül iş akışı görselleştirmesi",
  "modules": {
    "order": "Sipariş",
    "workPlan": "İş Planı",
    "routeOptimization": "Rota Optimizasyonu",
    "sales": "Satış",
    "deliveryNote": "İrsaliye",
    "warehouse": "Depo",
    "productManagement": "Ürün Yönetimi",
    "crm": "CRM",
    "invoice": "Fatura",
    "payments": "Ödemeler"
  }
}
```

---

### Step 10: Update HeroSection

**File:** `src/components/sections/HeroSection/index.tsx`

Changes:
1. Remove import of `HeroIllustration`
2. Add import of `ModuleGrid`
3. Replace `<HeroIllustration />` with `<ModuleGrid />`

---

### Step 11: Delete Old Illustration

**Delete:** `src/components/sections/HeroSection/HeroIllustration.tsx`

(Only after ModuleGrid is working)

---

### Step 12: Test

Run dev server:
```bash
npm run dev
```

Test checklist:
- [ ] Grid displays 10 modules
- [ ] Auto-cycle runs (module highlights every 0.5s)
- [ ] **Active module shows label with translated name**
- [ ] **Active module has shadow effect**
- [ ] **Connection lines are L-shaped (orthogonal)**
- [ ] Connection lines animate
- [ ] Hover shows tooltip (only for non-active modules)
- [ ] Switch language — labels/tooltips update
- [ ] Mobile view — compact grid
- [ ] No console errors
- [ ] Animation is smooth (60fps)

---

### Step 13: Commit

```bash
git add .
git commit -m "feat(hero): replace static illustration with animated ModuleGrid v1.2

- Add active label display for current module
- Implement L-shaped orthogonal connection paths
- Add shadow/elevation effect on active module
- Tooltip only shows for non-active modules on hover"
git push
```

---

## Key Technical Notes

### Colors
- Brand: `#4DB6A0`
- Module BG: `#F9FAFB`
- Module Border: `#E5E7EB`
- Icon Default: `#374151`
- Label/Tooltip BG: `#1F2937`
- **Active Shadow:** `rgba(77, 182, 160, 0.25)`

### Sizes
- Module Card: 64x64px (desktop), 48x48px (mobile)
- Gap: 16px (desktop), 12px (mobile)
- Icon: 24px
- **Label font:** 12px, font-weight 500
- **Label padding:** 4px 12px

### Animation
- Interval: 500ms
- Scale on active: 1.1
- **Label fade-in:** 150ms
- Use `framer-motion` for all animations
- Use `AnimatePresence` for label/tooltip transitions

### Accessibility
- Container: `role="img"` + `aria-label`
- Modules: `aria-hidden="true"`
- **Active label:** `aria-live="polite"`
- Respect `prefers-reduced-motion`

---

## Files to Create

```
src/components/sections/HeroSection/ModuleGrid/
├── index.tsx           # Main component
├── ModuleCard.tsx      # Single module (with shadow)
├── ModuleLabel.tsx     # Active label (NEW)
├── ModuleTooltip.tsx   # Hover tooltip
├── ConnectionLines.tsx # SVG lines (L-shaped)
└── modules-data.ts     # Data definitions
```

---

## Files to Modify

```
messages/de.json        # Add moduleGrid keys
messages/en.json        # Add moduleGrid keys
messages/tr.json        # Add moduleGrid keys
src/components/sections/HeroSection/index.tsx  # Use ModuleGrid
```

---

## Files to Delete

```
src/components/sections/HeroSection/HeroIllustration.tsx
```

---

## Success Criteria (v1.2)

- [ ] 10 modules in grid layout
- [ ] 500ms auto-cycle animation
- [ ] **Active module shows label** with translated name
- [ ] **Active module has shadow/elevation**
- [ ] **Connection lines are L-shaped** (orthogonal paths)
- [ ] Connection lines animate
- [ ] Hover tooltips work for non-active modules (DE/EN/TR)
- [ ] Mobile responsive
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Smooth 60fps animation
- [ ] prefers-reduced-motion respected

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-22 | Initial task |
| 1.2 | 2025-01-22 | Added: active label, L-shaped paths, shadow effect (Stripe comparison) |
