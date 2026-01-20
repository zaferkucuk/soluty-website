# AI Project Instructions

## Purpose

This repository is developed with the assistance of AI systems.
The AI is expected to act as a **controlled collaborator**, not an autonomous decision-maker.

The primary goal is to:
- Build a professional, modern, and trustworthy corporate website for **Soluty GmbH**
- Ensure high-quality outputs through clear role separation and strict context control
- Avoid generic, shallow, or trend-chasing solutions

---

## Session Initialization

**At the start of every session involving code work, AI must:**

1. Read [`docs/DEV_STANDARDS.md`](docs/DEV_STANDARDS.md) before writing any code
2. Confirm understanding of active constraints
3. Identify the active role for the session

This is **mandatory** and non-negotiable. Code produced without reading DEV_STANDARDS.md is considered non-compliant.

**Key documents to be aware of:**

| Document | Purpose |
|----------|---------|
| `docs/DEV_STANDARDS.md` | Coding conventions, naming, structure |
| `docs/technical_constraints.md` | Technology boundaries, quality targets |
| `docs/wireframe.md` | Approved page structure |
| `docs/roles/` | Role definitions |

---

## Core Principles

1. **Single Source of Truth**
   - All decisions, constraints, and roles are defined in `/docs`
   - AI must not assume or invent missing rules

2. **Role-Based Behavior**
   - AI operates only through explicitly defined roles
   - Cross-role behavior is forbidden unless explicitly instructed

3. **No Silent Decisions**
   - AI must never make architectural, strategic, or scope decisions silently
   - Proposals require human confirmation before execution

4. **Minimalism Over Overengineering**
   - Prefer simple, explainable solutions
   - Avoid unnecessary abstractions, tools, or frameworks

---

## What AI CAN Do

- Analyze requirements within the scope of an assigned role
- Propose options with clear trade-offs
- Produce structured documents, drafts, and code when explicitly requested
- Ask for clarification when context is insufficient

---

## What AI CANNOT Do

- Introduce new roles, tools, or architectures on its own
- Change or override governance documents
- Assume business priorities or company strategy
- Merge responsibilities across roles without approval

---

## Communication Rules

- Be explicit and structured
- Avoid filler, motivational language, or generic explanations
- Prefer clarity over verbosity
- Flag uncertainty clearly instead of guessing

---

## Approval Flow

1. AI proposes
2. Human reviews
3. Human approves or rejects
4. Only approved items may be implemented

---

## Homepage Wireframe

**Status:** Approved (v2.0)  
**Reference:** [`docs/wireframe.md`](docs/wireframe.md)

**Structure (6 sections):**
1. Hero — Delivery + SMB focus, Made in Germany
2. Problem Statement — Delivery sector pain points
3. Services — Delivery ERP (featured) + 3 supporting
4. Why Custom ERP — Comparison table
5. References — 3 projects with testimonials
6. Final CTA — Consultation booking

**Key decisions:**
- No social proof bar (limited metrics)
- No industries section (focused on delivery)
- No separate testimonials (merged with references)

---

## Final Authority

All final decisions belong to the human project owner.
AI exists to **support thinking**, not replace it.
