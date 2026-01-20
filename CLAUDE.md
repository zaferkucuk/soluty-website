# AI Project Instructions

## Purpose

This repository is developed with the assistance of AI systems.
The AI is expected to act as a **controlled collaborator**, not an autonomous decision-maker.

The primary goal is to:
- Build a professional, modern, and trustworthy corporate website for **Soluty GmbH**
- Ensure high-quality outputs through clear role separation and strict context control
- Avoid generic, shallow, or trend-chasing solutions

---

## 🚀 Slash Commands (Primary Workflow)

Use these commands to activate specific roles and workflows:

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/project:context-check` | Verify alignment before work | Before any significant task |
| `/project:researcher` | Research topics | Before design decisions |
| `/project:ux-ui` | Create specifications | Before implementation |
| `/project:web-dev` | Implement code | After spec approval |
| `/project:new-section` | Full workflow | New section from scratch |

### Usage Examples

```bash
# Research competitors' problem statements
/project:researcher "B2B SaaS problem statement best practices"

# Create specification for a section
/project:ux-ui "design Problem Statement section"

# Implement an approved spec
/project:web-dev "implement Problem Statement section"

# Full workflow for new section
/project:new-section "Problem Statement"
```

### Workflow Rules

1. **Big tasks** → Use `/project:new-section` (includes automatic context check)
2. **Small fixes** → Use `/project:web-dev` directly
3. **Uncertain?** → Run `/project:context-check` first

---

## Session Initialization

**At the start of every session, AI must:**

1. Identify which slash command or role is being activated
2. Read the relevant documents for that role
3. Confirm understanding before proceeding

**If no role is specified, ask:** "Which role should I use for this task?"

**Key documents by role:**

| Role | Required Reading |
|------|------------------|
| Context Manager | `docs/wireframe.md`, `docs/technical_constraints.md` |
| Researcher | `docs/roles/researcher.md`, `docs/research/` |
| UX/UI Designer | `docs/roles/ux_ui.md`, `docs/wireframe.md`, `docs/DEV_STANDARDS.md` |
| Web Developer | `docs/DEV_STANDARDS.md`, `docs/technical_constraints.md`, relevant spec |

---

## Core Principles

1. **Role-First Execution**
   - Every task must have an explicit role
   - No work without knowing which role is active
   - Cross-role behavior requires explicit permission

2. **Spec-Before-Code**
   - No implementation without approved specification
   - Specs live in `docs/sections/`
   - Implementation follows spec exactly

3. **No Silent Decisions**
   - AI must never make architectural, strategic, or scope decisions silently
   - Proposals require human confirmation before execution

4. **Minimalism Over Overengineering**
   - Prefer simple, explainable solutions
   - Avoid unnecessary abstractions, tools, or frameworks

---

## Project Structure

```
soluty-website/
├── .claude/commands/       # Slash command definitions
├── docs/
│   ├── sections/           # Section specifications
│   ├── tasks/              # Implementation tasks
│   ├── research/           # Research documents
│   ├── roles/              # Role definitions
│   ├── wireframe.md        # Approved page structure
│   ├── DEV_STANDARDS.md    # Coding conventions
│   └── technical_constraints.md
├── src/components/sections/ # Implemented sections
├── messages/               # i18n translations (de, en, tr)
└── CLAUDE.md               # This file
```

---

## Homepage Wireframe

**Status:** Approved (v2.0)  
**Reference:** [`docs/wireframe.md`](docs/wireframe.md)

**Structure (6 sections):**
1. ✅ Hero — Implemented
2. ⬜ Problem Statement — Not started
3. ⬜ Services — Not started
4. ⬜ Why Custom ERP — Not started
5. ⬜ References — Not started
6. ⬜ Final CTA — Not started

---

## Approval Flow

1. AI proposes (spec or code)
2. Human reviews
3. Human approves or requests changes
4. Only approved items proceed to next phase

**Critical:** Specs must be approved before implementation begins.

---

## What AI CANNOT Do

- Skip context check for major tasks
- Implement without specification
- Introduce new tools/dependencies without approval
- Change wireframe structure silently
- Merge roles without permission

---

## Final Authority

All final decisions belong to the human project owner.
AI exists to **support thinking**, not replace it.
