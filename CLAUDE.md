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

Keep strategic/brand context in root `PRODUCT.md` and website design decisions in root `DESIGN.md`. Both live at the repo root — not nested under `docs/` — because `impeccable`'s own tooling (`/impeccable init`, `/impeccable document`) reads and writes them there.

Rules:
- User and AI both update these files as decisions evolve.
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
| Motion | Motion (motion.dev — import from `motion/react`; prefer LazyMotion + domAnimation) |
| Backend | Supabase via MCP when available |
| Deployment | Cloudflare Workers — static export or SSR/full-stack via an adapter, chosen per project (see §6) |
| Source control | GitHub |

Key packages:
- `motion` (the current name of Framer Motion; import from `motion/react` — never add `framer-motion` back as a direct dependency, it would bundle the runtime twice)
- `shadcn/ui`
- `next/font`

shadcn/ui usage:
- shadcn is not a runtime framework; it copies accessible React component source into `components/ui/` so it can be owned, styled, and adapted locally.
- Use shadcn for durable primitives and registry blocks: buttons, forms, inputs, selects, checkboxes, switches, dialogs, sheets, tabs, cards, tables, accordions, tooltips, badges, skeletons, and similar UI infrastructure.
- Before adding or modifying shadcn components, run `npx shadcn@latest info --json`; use `npx shadcn@latest docs <component>` for APIs/examples; use `npx shadcn@latest add --dry-run` or `--diff` before replacing existing customized components.
- Preserve shadcn structure and accessibility first. Adapt styling through semantic tokens and project patterns; do not paste random component code that fights `components.json`, aliases, or the design source of truth.

---

## 5) MCPs

Use the configured MCP servers in `.mcp.json` when they fit the task:

| MCP | Use For |
|-----|---------|
| Magic / 21st.dev | Search and select high-quality React components before building from scratch |
| Supabase | Backend work: schema inspection, migrations, SQL, auth, generated types, and project metadata |

Component rule: check **Magic / 21st.dev** before building complex React UI from scratch, then adapt results to `DESIGN.md`.

Backend rule: use **Supabase MCP** for database and backend operations when a Supabase project is configured. Prefer project-scoped access with `project_ref`.

Higgsfield and shadcn are deliberately CLI/skill-based, not MCP — use the CLI commands and skills below instead.

---

## 6) CLI-First

Use CLI tools by default to reduce context and token usage.

| Tool | Preferred usage |
|------|------------------|
| Wrangler CLI | `npx wrangler dev`, `npx wrangler deploy` — swap for the deploy target's own CLI if a project doesn't use Cloudflare |
| GitHub CLI | `gh pr create`, `gh pr view`, `gh issue create` |
| Firecrawl CLI | `npx firecrawl scrape`, `npx firecrawl search`, `npx firecrawl crawl` |
| Playwright CLI | `npx playwright screenshot` for visual QA, `npx playwright test` for E2E |
| shadcn CLI | `npx shadcn@latest add/info/docs/diff` |
| Impeccable CLI | `npx impeccable detect <path>` for a deterministic anti-pattern scan; `/impeccable <command>` inside the AI tool for the full workflow |
| Higgsfield CLI | `higgsfield generate create`, `higgsfield product-photoshoot create`, `higgsfield account status` — only for projects doing creative generation |

Rules:
- Prefer direct CLI runs over long explanatory back-and-forth.
- Keep command output summaries short and relevant.
- Avoid loading large files unless required for the task.
- For UI/content changes, assume the user already has `npm run dev` running unless told otherwise. Do not start, restart, or kill the dev server just to view ordinary changes.

### Visual QA screenshots (Playwright CLI)

Use the **Playwright `screenshot` CLI** to capture rendered pages — never ad-hoc system-Chrome `--headless` calls or inline `playwright` scripts.

Capture against the running dev server:

```bash
# Above-the-fold viewport capture (default: viewport only, not full page)
npx playwright screenshot --viewport-size=1440,900 --wait-for-timeout=2000 \
  http://localhost:3000 screenshots/home-desktop.png

# Mobile
npx playwright screenshot --viewport-size=390,844 --wait-for-timeout=2000 \
  http://localhost:3000 screenshots/home-mobile.png

# Whole page flow (only when layout across sections changed)
npx playwright screenshot --full-page --viewport-size=1440,2400 \
  http://localhost:3000/some-route screenshots/route-full.png
```

Guidance:
- Default to the **viewport** capture (omit `--full-page`); use `--full-page` only when section-to-section flow changed.
- Always pass `--wait-for-timeout=2000` so fonts, video, and entry animations settle before capture.
- Capture the **two reference viewports** (desktop `1440,900`, mobile `390,844`) for hero/layout work; one viewport is enough for a single isolated component.
- Write shots to `screenshots/` (gitignored scratch) or the session scratchpad — never commit screenshots.
- Capture **once after the edit set is complete**, not after every tweak, to respect the token/time budget.
- **`whileInView`/scroll-triggered motion gotcha:** elements that only animate in on viewport intersection start at `opacity: 0` and never intersect in a `--full-page` capture, so below-the-fold sections render blank — that's a screenshot artifact, not a bug. Scroll/capture per-viewport instead, or confirm content is in the DOM with `curl -s <url> | grep`.
- Do not run `npm run build` as a default verification step after visual, copy, spacing, or small component edits. Prefer `npm run typecheck` when code safety matters, and rely on the dev server for visual feedback.
- Run a full production build only when explicitly requested, before deployment/commit if required, or when the change touches dependencies, framework config, build/runtime behavior, environment variables, metadata generation, or routing.

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

**Default: do the work inline.** Each subagent starts cold, re-derives full context, and burns its own request quota — spawning too liberally is a common source of wasted budget.

Spawn a subagent only when ALL of the following are true:
1. The subtask is genuinely independent (no shared state or sequential dependency).
2. Doing it inline would pollute the main context with large, noisy output (e.g. a full-site crawl result, a broad grep across many files).
3. The time saving from parallel execution clearly outweighs the cold-start cost.

Never spawn for:
- Simple file reads, targeted searches, or single-file edits — use direct search/read tools.
- Tasks that can be expressed as one focused CLI or tool call.
- "Research then implement" flows where research output is needed before coding starts — do them sequentially inline.
- Exploratory questions or design decisions — answer inline.

When you do spawn:
- Keep each subagent scope narrow and single-purpose.
- Run in parallel only when tasks truly do not depend on each other.
- Summarize the outcome in one sentence before continuing.

---

## 10) Skills

Skills are auto-discovered — their descriptions load into context — but you choose when to invoke them; they do not fire on their own.

Skill routing for design/UI work:
- `impeccable` is the authority for brand direction, visual critique, density, anti-slop checks, and final polish.
- `ui-ux-pro-max` is a secondary checklist/database for broad UX patterns, accessibility reminders, and ideation. Do not let it override `PRODUCT.md`, `DESIGN.md`, or `impeccable` when it recommends generic SaaS defaults.
- `shadcn` owns shadcn/ui component discovery, docs, registry installs, and component composition rules.
- `framer-motion` / `gsap-*` own React motion implementation details; use them after the design direction is chosen. `gsap-*` is the better fit for scroll-driven/timeline sequencing; `framer-motion` (the Motion library) for declarative React component animation.

Beyond design, route specialized work to its skill *before* hand-writing inline: `copywriting` / `copy-editing` / `marketing-psychology` / `stop-slop` for marketing copy and messaging; `seo-audit` / `ai-seo` / `schema-markup` / `programmatic-seo` / `site-architecture` for SEO and IA; `page-cro` for conversion; `firecrawl*` for anything that needs live web content; `higgsfield-*` / `image` for creative generation. When a request is clearly copy, SEO, CRO, or creative-asset work, load the matching skill first.

Structure rules:
- One folder per skill: `.claude/skills/<skill-name>/`.
- `impeccable` is generated output of the `impeccable` npm package — update it via `npx impeccable skills update`, never by hand-editing files inside it.
- If a skill has a tracked GitHub source, record it in `skills-lock.json`. If a new skill is added, document it in `README.md`.

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
- Default to flat colors, borders, shadows, opacity, and motion for decoration. Treat gradient text, gradient buttons/borders, and multi-color glows as opt-in per this project's own `DESIGN.md`, not a default — they're one of the most common AI-slop tells.
- Prefer semantic HTML (`section`, `article`, `nav`, `header`, `footer`)
- One component per file, PascalCase naming
- No Tailwind `@apply`
- Typecheck before commit: `npx tsc --noEmit`
- Prefer `next/font` for font loading
- Avoid backwards-compatibility hacks (renaming unused vars instead of deleting, re-exporting removed types, `// removed` comments) when you're certain something is unused — delete it.
- Don't approximate a brand's real logo/SVG with a lookalike icon or initials when the user expects the actual mark. Use verified official assets, or ship a text-only chip until the real asset is available.

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

## 14) Compounding Learning And Skills

Treat repeated work as a chance to improve the repo's operating system.

Rules:
- When a workflow, checklist, prompt pattern, CLI sequence, design decision rule, or implementation habit repeats and proves useful, propose turning it into a skill, script, template, or documented rule.
- If the rule is project-specific and lightweight, add it to `CLAUDE.md` or the relevant source-of-truth doc (`DESIGN.md`, `PRODUCT.md`) instead of leaving it only in chat.
- If the workflow is reusable across projects or has multiple steps, propose or create a skill following the installed skill workflow.
- Keep additions concise and operational. Do not paste conversation logs or large external docs.
- When changing public website copy, consider mirroring the final copy in a `docs/website-copy-map.md` so copy lives somewhere reviewable outside the component tree.
- After each substantial task, briefly note any new repeatable pattern that should be documented or turned into a skill.
- For complex UI sections, use Magic / 21st.dev Inspiration Search before building. If a found component improves quality, install or adapt it even when it adds dependencies; the goal is the best output, not the lightest codebase. Hand-build only when the component genuinely misses the desired interaction, visual direction, or implementation quality.
- After homepage or visual-section changes, run a density/readability pass before finalizing: avoid default giant sections, oversized repeated headings, over-rounded cards, and full-viewport sections unless the fold truly needs it. Verify desktop and mobile screenshots for scanability and space efficiency.
- Token budget hygiene: the biggest waste sources are repeated full-file reads, long build error dumps, full-repo status checks, repeated dependency installs, unnecessary full production builds, full-page screenshots when only one section changed, and unnecessary subagent spawns (each one starts cold and burns a full request). Prefer targeted searches/reads, scoped status checks, `npm run typecheck` for code safety, and one verification pass after the edit set is complete.
- When installing a registry component, preserve its structure and behavior first. Adapt styling/copy only as much as needed for brand fit, accessibility, and density; do not rewrite the component unless the installed version is broken or incompatible.

---

## 15) Useful Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
```
