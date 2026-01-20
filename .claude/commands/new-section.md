# New Section Workflow

This is a **full workflow** for creating a new homepage section from start to finish.

## Workflow: $ARGUMENTS

---

## PHASE 1: Context Check (MANDATORY)

Before anything else, perform a context check.

Read and verify:
1. `docs/wireframe.md` — Is this section in the approved structure?
2. `docs/sections/` — Does a spec already exist?
3. `src/components/sections/` — Is it already implemented?

### Decision Gate

| Status | Action |
|--------|--------|
| Not in wireframe | STOP. "Section not in approved wireframe. Requires human approval." |
| Spec exists, not implemented | Skip to Phase 3 (Implementation) |
| Spec exists, implemented | STOP. "Section already complete. Did you mean to update it?" |
| No spec, not implemented | Continue to Phase 2 |

---

## PHASE 2: Specification (UX/UI Designer)

Switch to UX/UI Designer role.

### 2.1 Research (if needed)
- Check `docs/research/` for existing research
- If research needed, pause and suggest: "Run /project:researcher first?"

### 2.2 Create Specification
Create `docs/sections/[section-name].md` with:
- Content (EN reference + DE/TR if possible)
- Layout (desktop + mobile wireframes)
- Typography & colors
- Spacing (Tailwind tokens)
- Component structure
- i18n keys
- Accessibility requirements
- Acceptance criteria

### 2.3 Human Review
After creating spec, STOP and ask:
"Specification created. Please review `docs/sections/[section-name].md` and approve before implementation."

**Wait for human approval before Phase 3.**

---

## PHASE 3: Implementation (Web Developer)

Switch to Web Developer role.

### 3.1 Pre-Implementation
Read:
- `docs/DEV_STANDARDS.md`
- `docs/sections/[section-name].md`
- `docs/technical_constraints.md`

### 3.2 Create Components
```
src/components/sections/[SectionName]/
├── index.tsx
├── [SubComponents].tsx
```

### 3.3 Add Translations
Update `messages/{de,en,tr}.json` with i18n keys from spec.

### 3.4 Integrate
Add component to the appropriate page.

### 3.5 Verify
- [ ] TypeScript compiles
- [ ] All text from i18n
- [ ] Responsive (375px → 1440px)
- [ ] Accessible
- [ ] Matches spec

### 3.6 Commit
```
feat: implement [section-name] section
```

---

## PHASE 4: Completion Report

After implementation, output:

```
WORKFLOW COMPLETE
=================

Section: [name]
Spec: docs/sections/[name].md
Components: src/components/sections/[Name]/
Translations: messages/{de,en,tr}.json

Status: ✓ Complete

Next suggested section: [based on wireframe order]
```

---

## Workflow Rules

1. **Never skip Phase 1** — Context check is mandatory
2. **Always pause after Phase 2** — Human must approve spec
3. **Follow spec exactly in Phase 3** — No deviations
4. **One section at a time** — Complete before starting next
