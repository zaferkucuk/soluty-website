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

1. Read project files via **GitHub API** (git clone does not work in this environment)
2. Read **mandatory documents** (always required, regardless of role)
3. Read **role-specific documents** for the active role
4. Confirm understanding before proceeding

### Default Role

**If no role is specified:** Use **Researcher** role as default.

### Mandatory Reading (Every Session)

These documents must be read at the start of every session, regardless of role:

| Document | Purpose |
|----------|---------|
| `CLAUDE.md` | This file - project rules and session protocol |
| `docs/DEV_STANDARDS.md` | Project coding conventions and quality standards |
| `docs/technical_constraints.md` | Non-negotiable technical boundaries |
| `docs/wireframe.md` | Approved page structure and current progress |

### Role-Specific Reading

**When a role is assigned or changed, AI must read the corresponding role document from `docs/roles/`:**

| Role | Role Document | Additional Documents |
|------|---------------|---------------------|
| Context Manager | — | — (mandatory docs are sufficient) |
| Researcher | `docs/roles/researcher.md` | `docs/research/` |
| UX/UI Designer | `docs/roles/ux_ui.md` | relevant section specs from `docs/sections/` |
| Web Developer | `docs/roles/web_developer.md` | relevant spec from `docs/sections/`, relevant task from `docs/tasks/` |

**Critical:** Always read the role's `.md` file before starting any work in that role.

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

**Status:** Approved (v3.0)  
**Reference:** [`docs/wireframe.md`](docs/wireframe.md)

**Structure:**
- ✅ Header — Implemented
1. ✅ Hero — Implemented
2. ⬜ Problem Statement — Not started
3. ✅ Services — Implemented
4. 📋 ERP Features — Spec ready (`docs/sections/erp-features-section-spec.md`)
5. ⬜ Why Custom Software — Not started
6. ⬜ References — Not started
7. ⬜ Final CTA — Not started
- ⬜ Footer — Not started

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
