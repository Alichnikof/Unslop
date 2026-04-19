# vibe-stack - CLAUDE.md

> Template operating manual for projects bootstrapped from vibe-stack.

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

## 3) Stack

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


## 4) MCPs

Use the configured MCP servers in `.mcp.json` when they fit the task:

| MCP | Use For |
|-----|---------|
| Magic / 21st.dev | Search and select high-quality React components before building from scratch |
| Supabase | Backend work: schema inspection, migrations, SQL, auth, generated types, and project metadata |

Component rule: check **Magic / 21st.dev** before building complex React UI from scratch, then adapt results to `docs/design/DESIGN.md`.
---

## 5) CLI-First

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

## 6) Motion Guidance (Flexible Defaults)

These are defaults, not hard laws. Adapt by use case and skill guidance.

- Prefer `LazyMotion` + `domAnimation` for most pages.
- Prefer transform and opacity animations for performance.
- Respect reduced motion (`useReducedMotion()`).
- Use subtle entry and hover motion when it improves clarity.
- If a selected skill recommends a different motion pattern, follow the skill.

---

## 7) SEO Baseline

Every production page should include:
- Metadata title and description via Next.js Metadata API
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Structured data (JSON-LD) where relevant
- `sitemap.xml`
- `robots.txt` that references sitemap
- `llms.txt` in public

---

## 8) Sub-agents

Use sub-agents when tasks are independent:
- Separate page sections
- SEO/setup vs UI implementation
- Research vs coding

Rules:
- Keep each sub-agent scope narrow.
- Run in parallel only when tasks do not depend on each other.
- Summarize outcomes briefly before continuing.

---

## 9) Skills (Project-Local)

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

## 10) Content and Media Placement

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

## 11) Code Rules

- Use `var(--token)` for component colors (avoid hardcoded hex in components)
- Prefer semantic HTML (`section`, `article`, `nav`, `header`, `footer`)
- One component per file, PascalCase naming
- No Tailwind `@apply`
- Typecheck before commit: `npx tsc --noEmit`
- Prefer `next/font` for font loading

---

## 12) Context and Uncertainty Policy

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

## 13) Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```
