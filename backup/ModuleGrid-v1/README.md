# ModuleGrid v1 Backup

Date: 2026-02-02
Commit: fa07ff6e5be2157dd1392656a4afcf5becd20e7d

## Purpose
Full backup of ModuleGrid component before removing inactive card visibility.
Inactive cards had a ghost/outline appearance (border + transparent bg + muted icon).

## Files backed up
Only files that will be modified are backed up here:
- `index.tsx` — Main grid component
- `ModuleCard.tsx` — Card component with inactive/active layers

Other ModuleGrid files (unchanged) remain at their original paths:
- `ConnectionLines.tsx`
- `ConnectionSVG.tsx`
- `ModuleTooltip.tsx`
- `modules-data.ts`
- `types.ts`
- `constants/colors.ts`
- `constants/index.ts`
- `hooks/useRotatingGradient.ts`
- `hooks/useSequentialActivation.ts`
- `hooks/index.ts`
- `utils/pathCalculation.ts`
- `utils/index.ts`

## Restore instructions
Copy backup files to `app/[locale]/components/ModuleGrid/` to restore original behavior.
