# Unslop - CLAUDE.md

> Operating manual for AI-assisted website and full-stack app builds.

---

## 0) First Step After Cloning

Before building features, fill the Project Context section below.
If context is missing or ambiguous, ask the user a focused question before implementation.

---

## 1) Project Context (Fill First)

Copy this section into `docs/project-context.md` and fill it:

- Project name:
- Product type:
- Target users:
- Main user goal:
- Primary pages/routes:
- Brand voice and visual direction:
- Required integrations:
- SEO priorities:
- Performance priorities:
- Non-goals:
- Launch constraints:

This block is project-dependent and is required for reliable output.

---

## 2) Design Source Of Truth

Keep website design decisions in `docs/design/DESIGN.md`.

Rules:
- User and AI both update that file as decisions evolve.
- Keep `CLAUDE.md` for operating rules only (do not duplicate detailed design specs here).

---

## 3) Inspiration Intake

Use `docs/inspiration/` as a simple drop zone for visual references, screenshots, exported design drafts, example `DESIGN.md` files, Stitch outputs, Claude Design outputs, competitor notes, and moodboards.

Before visual design, redesign, or design critique work, quickly check `docs/inspiration/README.md` and any obviously relevant files in `docs/inspiration/`. Do not load the whole folder unless the user asks.

Rule of thumb: inspiration is input, `DESIGN.md` is the decision.

---

## 4) Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties for tokens |
| Components | shadcn/ui (extend, do not fight base patterns) |
| Motion | Framer Motion (prefer LazyMotion + domAnimation) |
| Backend | Supabase via MCP when available |
| Deployment | Vercel |
| Source control | GitHub |

Key packages:
- `framer-motion`
- `shadcn/ui`
- `next/font`

---


## 5) MCPs

Use the configured MCP servers in `.mcp.json` when they fit the task:

| MCP | Use For |
|-----|---------|
| Magic / 21st.dev | Search and select high-quality React components before building from scratch |
| Supabase | Backend work: schema inspection, migrations, SQL, auth, generated types, and project metadata |

Component rule: check **Magic / 21st.dev** before building complex React UI from scratch, then adapt results to `docs/design/DESIGN.md`.

Backend rule: use **Supabase MCP** for database and backend operations when a Supabase project is configured. Prefer project-scoped access with `project_ref`.

---

## 6) CLI-First

Use CLI tools by default to reduce context and token usage.

| Tool | Preferred usage |
|------|------------------|
| Vercel CLI | `vercel deploy --prod`, `vercel env pull`, `vercel logs` |
| GitHub CLI | `gh pr create`, `gh pr view`, `gh issue create` |
| Firecrawl CLI | `npx firecrawl scrape`, `npx firecrawl search`, `npx firecrawl crawl` |
| Playwright CLI | `npx playwright test` |

Rules:
- Prefer direct CLI runs over long explanatory back-and-forth.
- Keep command output summaries short and relevant.
- Avoid loading large files unless required for the task.

---

## 7) Motion Guidance (Flexible Defaults)

These are defaults, not hard laws. Adapt by use case and skill guidance.

- Prefer `LazyMotion` + `domAnimation` for most pages.
- Prefer transform and opacity animations for performance.
- Respect reduced motion (`useReducedMotion()`).
- Use subtle entry and hover motion when it improves clarity.
- If a selected skill recommends a different motion pattern, follow the skill.

---

## 8) SEO Baseline

Every production page should include:
- Metadata title and description via Next.js Metadata API
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Structured data (JSON-LD) where relevant
- `sitemap.xml`
- `robots.txt` that references sitemap
- `llms.txt` in public

---

## 9) Sub-agents

Use sub-agents when tasks are independent:
- Separate page sections
- SEO/setup vs UI implementation
- Research vs coding

Rules:
- Keep each sub-agent scope narrow.
- Run in parallel only when tasks do not depend on each other.
- Summarize outcomes briefly before continuing.

---

## 10) Skills (Project-Local)

All skills in this repo are project-local under `.claude/skills/`. The active inventory is intentionally limited to **26 skills**:

| Slice | Count | Purpose |
|-------|-------|---------|
| Impeccable | 17 | Design quality workflow: shape, audit, critique, layout, polish, motion, clarity, responsiveness, optimization |
| Firecrawl | 8 | Web search, scraping, crawling, mapping, interaction, download, and structured extraction |
| UI/UX Pro Max | 1 | Design intelligence search and generation workflows |

Structure rules:
- One folder per skill: `.claude/skills/<skill-name>/`
- Do not use family wrapper folders
- If a new skill is added, document it in `README.md`

---

## 11) Content and Media Placement

Use `public/content/` for final assets that must be publicly served.

Use `docs/content/inbox/` for raw user-provided source files you want to keep in the project but not serve publicly.

Workflow:
- Raw/source assets in `docs/content/inbox/`
- Optimized production assets in `public/content/`
- Keep project notes and rationale in `docs/`

Recommended structure:
- `public/content/images/`
- `public/content/videos/`
- `public/content/icons/`
- `public/content/downloads/`

---

## 12) Code Rules

- Use `var(--token)` for component colors (avoid hardcoded hex in components)
- Prefer semantic HTML (`section`, `article`, `nav`, `header`, `footer`)
- One component per file, PascalCase naming
- No Tailwind `@apply`
- Typecheck before commit: `npx tsc --noEmit`
- Prefer `next/font` for font loading

---

## 13) Context and Uncertainty Policy

Keep this file and related context lean:
- No conversation logs
- No long debug transcripts
- No copy-pasted external docs

Working style:
- Read only what is needed.
- Summarize findings briefly.
- Ask a question when unsure instead of guessing.
- Prefer one clear question over multiple speculative assumptions.

---

## 14) Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```
