# vibe-stack — CLAUDE.md

> Read this before touching any file. This is the AI's operating manual for this project.

---

## Identity

- **What:** A vibe-coded website project bootstrapped from vibe-stack
- **Goal:** Ship a professional, animated, SEO-optimized website — not AI slop

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties for design tokens |
| Components | shadcn/ui — extend, don't override |
| Animations | Framer Motion — `LazyMotion` + `domAnimation` only |
| Backend | Supabase (via MCP) |
| Deployment | Vercel |
| Source control | GitHub |

### Key packages to know
- `framer-motion` — all animation (never raw CSS animation for complex motion)
- `shadcn/ui` — base components
- `next/font` — font loading (no external font CDNs)
- Check **21st.dev MCP** before building complex animated components from scratch

---

## SEO & Discoverability

Every page must have:
- `<title>` and `<meta name="description">` via Next.js Metadata API
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Structured data (JSON-LD) where appropriate
- Generate `sitemap.xml` at build time (use `next-sitemap` or App Router sitemap)
- `robots.txt` — allow all, point to sitemap
- `llms.txt` — describe the site for AI crawlers (template in `/public/llms.txt`)

---

## Animation Rules

- Always use `LazyMotion` + `domAnimation` feature bundle (never the full Framer Motion bundle)
- Entry: `opacity: 0 → 1`, `y: 24 → 0`, spring or ease-out, 0.5–0.8s
- Stagger: `0.08s` between children via `staggerChildren` in variants
- Hover: `scale: 1.02` on cards (spring), never scale text
- Always respect `useReducedMotion()` — wrap all motion
- No layout animations on landing pages (performance)
- Animate only `transform` and `opacity` (GPU-accelerated properties)

---

## Anti-AI-Slop Rules

These rules exist because AI-generated websites all look the same. Break the pattern.

### NEVER
- Gradient text
- Purple/blue neon glows
- Floating blob decorations
- Emoji in UI copy or code
- Generic "AI grid" background patterns
- `border-radius` > 8px on buttons
- Dark mode purple soup
- Placeholder text in production ("Lorem ipsum", "[Your title here]")

### ALWAYS
- Strong typographic hierarchy (size contrast between heading levels)
- Structured whitespace — let the layout breathe
- Semantic HTML (`section`, `article`, `nav`, `header`, `footer` — not `div` soup)
- CSS custom properties for ALL colors (`var(--token)`, never hardcoded hex in components)
- One accent color max — restraint is taste
- Real content, real copy, real data

---

## CLI-First Workflow

Use these CLIs directly — don't use the web UI when the CLI works:

| Tool | Usage |
|------|-------|
| **Vercel CLI** | `vercel deploy --prod`, `vercel env pull`, `vercel logs` |
| **GitHub CLI** | `gh pr create`, `gh issue create`, `gh repo` |
| **Firecrawl CLI** | `npx firecrawl` — scrape sites for content, research, competitive analysis |
| **Playwright CLI** | `npx playwright test` — E2E tests, visual regression, screenshots |
| **Impeccable** | `/impeccable audit`, `/impeccable polish` — design quality enforcement |

### Deploy flow
```bash
npm run build          # verify build passes
vercel deploy --prod   # deploy to production
```

### Git flow
```bash
gh pr create           # create PR from current branch
gh pr merge            # merge after review
```

---

## Sub-agents

Use parallel sub-agents (via Superpowers plugin) whenever tasks are independent:
- Separate agents for different page sections
- Separate agents for SEO setup vs component building
- Separate agents for test writing vs implementation
- Separate agents for research vs coding

This is faster and keeps context windows clean.

---

## Supabase Backend

All backend work goes through the Supabase MCP:
- Schema changes via `apply_migration` (never raw SQL in app code)
- Use `execute_sql` for queries during development
- Auth via Supabase Auth — don't roll your own
- Edge Functions for server-side logic that doesn't fit in Next.js API routes
- Never hardcode connection strings — use environment variables via `vercel env pull`

---

## Design Quality

Before calling a page "done":
1. Run `/impeccable audit` to check for design issues
2. Run `/impeccable polish` to refine details
3. Use Playwright to screenshot at 375px, 768px, and 1440px
4. Check color contrast meets WCAG AA minimum
5. Verify animations respect `prefers-reduced-motion`

### Skills available
- `/impeccable` — full design audit suite (audit, polish, animate, bolder, clarify, colorize, critique, delight, distill, layout, optimize, overdrive, quieter, shape, typeset)
- `/design-taste-frontend` — anti-AI-slop design enforcement
- `/high-end-visual-design` — premium agency-level design standards
- `/stitch-design-taste` — semantic design system generation

---

## Code Rules

- `var(--token)` for all colors — zero hardcoded hex in components
- One component per file, PascalCase naming
- Server actions: camelCase verbs (`joinWaitlist`, `submitFeedback`)
- CSS tokens: `--category-variant` pattern
- No `@apply` — inline Tailwind utility classes only
- Semantic HTML over `div`
- `noEmit` type check before every commit: `npx tsc --noEmit`
- Prefer `next/font` for all font loading

---

## Context Optimization

Keep this CLAUDE.md lean. Don't add:
- Conversation logs or session notes
- Debugging history
- Copy-pasted documentation
- Redundant explanations

If you need project-specific context (design tokens, component inventory, API schemas), create separate files in a `docs/` folder and reference them here.

---

## Screenshots

Save all Playwright screenshots to `screenshots/` at project root. Never save to project root or `.playwright-mcp/`.

---

## Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm run lint       # linting
npm run typecheck  # strict TypeScript check
```
