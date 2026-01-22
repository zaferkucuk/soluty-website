# Task: Module Grid Implementation

**Priority:** High  
**Role:** Web Developer  
**Status:** Ready to Start

---

## Pre-Task: Read These Files First

```
1. docs/DEV_STANDARDS.md        → Coding conventions
2. docs/technical_constraints.md → Technology boundaries  
3. docs/sections/module-grid.md  → Full specification (SOURCE OF TRUTH)
```

Do NOT write any code until you have read all three files.

---

## Goal

Replace the static `HeroIllustration` component with an animated `ModuleGrid` component that shows 10 ERP modules with auto-cycling animation and hover tooltips.

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

Use Framer Motion for animations.

---

### Step 4: Create ModuleTooltip Component

**File:** `src/components/sections/HeroSection/ModuleGrid/ModuleTooltip.tsx`

Props:
- `moduleName`: string (translated)
- `isVisible`: boolean

Features:
- Dark background (#1F2937)
- White text
- Positioned 8px below card
- Fade in/out animation

---

### Step 5: Create ConnectionLines Component

**File:** `src/components/sections/HeroSection/ModuleGrid/ConnectionLines.tsx`

Props:
- `modules`: Module[]
- `activeModuleId`: string

Features:
- SVG overlay with pointer-events: none
- Bezier curves connecting modules based on `connectsTo`
- Active connection line at full opacity (#4DB6A0)
- Inactive lines at 30% opacity
- stroke-dashoffset animation for "drawing" effect

---

### Step 6: Create Main ModuleGrid Component

**File:** `src/components/sections/HeroSection/ModuleGrid/index.tsx`

Features:
- Import all sub-components
- Use `useState` for activeIndex and hoveredModule
- Use `useEffect` with setInterval (500ms) for auto-cycle
- Handle `prefers-reduced-motion` (show static grid)
- Grid layout matching spec (see wireframe in spec)
- Pass correct props to children

Add `"use client"` directive at top (client component for animations).

---

### Step 7: Create Index Export

**File:** `src/components/sections/HeroSection/ModuleGrid/index.ts` (if needed)

Or ensure `index.tsx` exports the component as default.

---

### Step 8: Add Translation Keys

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
    "deliveryNote": "Lieferschein",
    "warehouse": "Depo",
    "productManagement": "Ürün Yönetimi",
    "crm": "CRM",
    "invoice": "Fatura",
    "payments": "Ödemeler"
  }
}
```

---

### Step 9: Update HeroSection

**File:** `src/components/sections/HeroSection/index.tsx`

Changes:
1. Remove import of `HeroIllustration`
2. Add import of `ModuleGrid`
3. Replace `<HeroIllustration />` with `<ModuleGrid />`

---

### Step 10: Delete Old Illustration

**Delete:** `src/components/sections/HeroSection/HeroIllustration.tsx`

(Only after ModuleGrid is working)

---

### Step 11: Test

Run dev server:
```bash
npm run dev
```

Test checklist:
- [ ] Grid displays 10 modules
- [ ] Auto-cycle runs (module highlights every 0.5s)
- [ ] Connection lines visible
- [ ] Hover shows tooltip with correct language
- [ ] Switch language — tooltips update
- [ ] Mobile view — compact grid
- [ ] No console errors
- [ ] Animation is smooth (60fps)

---

### Step 12: Commit

```bash
git add .
git commit -m "feat(hero): replace static illustration with animated ModuleGrid"
git push
```

---

## Key Technical Notes

### Colors
- Brand: `#4DB6A0`
- Module BG: `#F9FAFB`
- Module Border: `#E5E7EB`
- Icon Default: `#374151`
- Tooltip BG: `#1F2937`

### Sizes
- Module Card: 64x64px (desktop), 48x48px (mobile)
- Gap: 16px (desktop), 12px (mobile)
- Icon: 24px

### Animation
- Interval: 500ms
- Scale on active: 1.1
- Use `framer-motion` for all animations

### Accessibility
- Container: `role="img"` + `aria-label`
- Modules: `aria-hidden="true"`
- Respect `prefers-reduced-motion`

---

## Files to Create

```
src/components/sections/HeroSection/ModuleGrid/
├── index.tsx           # Main component
├── ModuleCard.tsx      # Single module
├── ModuleTooltip.tsx   # Hover tooltip
├── ConnectionLines.tsx # SVG lines
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

## Success Criteria

- [ ] 10 modules in grid layout
- [ ] 500ms auto-cycle animation
- [ ] Connection lines animate
- [ ] Hover tooltips work (DE/EN/TR)
- [ ] Mobile responsive
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Smooth 60fps animation
- [ ] prefers-reduced-motion respected
