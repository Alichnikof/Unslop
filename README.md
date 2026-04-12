# vibe-stack

> A curated starter for vibe-coding professional websites with Claude Code.

This repo is a starting point for building websites with AI that actually look good — not like AI slop. It bundles the plugins, MCPs, CLIs, skills, and configuration that make Claude Code a full design-to-deploy workflow.

The `CLAUDE.md` file is the brain — it teaches Claude Code how to build websites that are SEO-optimized, animated, accessible, and visually distinctive.

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/YOUR_USERNAME/vibe-stack.git my-project
cd my-project
npm install

# Start dev server
npm run dev

# Open in Claude Code and start building
```

---

## What's Inside

### The CLAUDE.md

The core value of this repo. It instructs Claude Code to:

- Build **SEO-optimized** pages (meta tags, Open Graph, JSON-LD, sitemap, robots.txt)
- Generate **llms.txt** for AI discoverability
- Create **animated** interfaces with Framer Motion (LazyMotion, spring physics, reduced motion support)
- Avoid **AI slop** (no gradient text, no purple neon, no floating blobs, no emoji in UI)
- **Deploy via CLI** — Vercel, GitHub, Firecrawl, Playwright all from the terminal
- Use **sub-agents** for parallel work
- Use **Supabase** for backend via MCP
- Optimize for **context window efficiency**

### Framework & Core

- **Next.js** (App Router) — React with Server Components
- **TypeScript** (strict mode)
- **Tailwind CSS** — utility-first with CSS custom properties for design tokens
- **shadcn/ui** — component library to extend
- **Framer Motion** — animation (LazyMotion + domAnimation only)

---

## The Stack

### Plugins (Claude Code)

| Plugin | What it does |
|--------|-------------|
| **Superpowers** | Parallel sub-agents, code review, git workflows, plan-then-execute |
| **Supabase** | Database, auth, edge functions — all via MCP |
| **Vercel** | Deployment, env vars, domain management, framework intelligence |

### MCPs

| MCP | What it does |
|-----|-------------|
| **21st.dev** | Search and install animated React components (configured in `.claude/.mcp.json`) |
| **Gemini Design** | AI-powered frontend code generation via Google Gemini — still testing this one, might not stay in the final stack (configured in `.claude/.mcp.json`) |

### CLIs

| CLI | What it does |
|-----|-------------|
| **Playwright** | E2E testing, visual regression, screenshots |
| **Impeccable** | Design quality audits (audit, polish, animate, critique...) |
| **Firecrawl** | Web scraping, search, content extraction |
| **GitHub CLI** (`gh`) | PRs, issues, releases from terminal |
| **Vercel CLI** | Deploy, env vars, domains, logs |

### Skills (bundled in `.claude/skills/`)

| Skill | What it does |
|-------|-------------|
| **Impeccable** (18 skills) | Full design audit suite — audit, polish, animate, bolder, clarify, colorize, critique, delight, distill, layout, optimize, overdrive, quieter, shape, typeset, adapt, impeccable |
| **design-taste-frontend** | Anti-AI-slop design enforcement with metric-based rules |
| **high-end-visual-design** | Premium agency-level design standards |
| **minimalist-ui** | Editorial-style, warm monochrome, ultra-flat components |
| **industrial-brutalist-ui** | Raw Swiss typography meets terminal aesthetics |
| **redesign-existing-projects** | Audit and upgrade existing websites |
| **stitch-design-taste** | Semantic design system generation (DESIGN.md files) |

---

## Coming Soon

Things I'm currently trying out and might add to the stack:

- **Firecrawl CLI Skill** — want to bundle web scraping as a skill so you don't need the CLI separately
- **Nano Banana MCP** — AI-powered design assistance, looks promising
- **Chrome DevTools MCP** — browser debugging and performance profiling straight from Claude Code
- **Gemini Design MCP** — letting Gemini generate frontend code for you, already in the MCP config but still figuring out if it earns its spot
- **Google Stitch MCP** — semantic design system generation, haven't fully tested yet
- **Pencil.dev MCP** — collaborative design tooling, same deal — trying it out

---

## File Structure

```
vibe-stack/
├── CLAUDE.md                    # AI operating manual (the core value)
├── README.md                    # You are here
├── package.json                 # Minimal deps
├── tsconfig.json                # Strict TypeScript
├── next.config.ts               # Next.js config
├── postcss.config.mjs           # PostCSS + Tailwind
├── .gitignore
├── skills-lock.json             # Locked skill versions
├── .claude/
│   ├── settings.json            # Claude Code permissions
│   ├── .mcp.json                # MCP server config (add your API keys)
│   └── skills/                  # 23 bundled design skills
│       ├── impeccable/          # Core design intelligence
│       ├── audit/               # Design audit
│       ├── polish/              # Design polish
│       ├── animate/             # Animation guidance
│       ├── design-taste-frontend/  # Anti-AI-slop enforcement
│       ├── high-end-visual-design/ # Premium design standards
│       └── ... (18 more)
├── app/
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Start here
│   └── globals.css              # Design tokens template
├── components/
│   └── motion/                  # Animation wrappers
├── lib/                         # Utilities
├── public/
│   ├── robots.txt               # SEO
│   ├── sitemap.xml              # SEO (generate at build)
│   └── llms.txt                 # AI discoverability
└── screenshots/                 # Playwright screenshots
```

---

## Setup

### Prerequisites

- Node.js 20+
- [Claude Code](https://claude.ai/code) CLI installed
- [GitHub CLI](https://cli.github.com/) (`gh`)
- [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`)
- [Playwright CLI](https://playwright.dev/) (`npx playwright install`)
- [Firecrawl CLI](https://www.firecrawl.dev/) (`npm i -g firecrawl`)
- [UI/UX Pro Max Skill](https://ui-ux-pro-max-skill.nextlevelbuilder.io/) — installed globally in your Claude Code config (`claude skill add`)

### Install Claude Code plugins

```bash
claude plugin add superpowers
claude plugin add supabase
claude plugin add vercel
```

### Configure MCPs

Edit `.claude/.mcp.json` and add your API keys:
- **21st.dev**: Get a key at [21st.dev](https://21st.dev)
- **Gemini Design**: Get a key at [Google AI Studio](https://aistudio.google.com/)

> **Warning**: Never commit real API keys. The `.mcp.json` ships with placeholders only.

---

## Philosophy

1. **Typography over decoration** — strong hierarchy, not visual noise
2. **Restraint is taste** — one accent color, structured whitespace, purposeful motion
3. **CLI-first** — deploy, push, scrape, test from the terminal
4. **Parallel agents** — break work into independent sub-tasks
5. **Real content** — no placeholders in production
6. **Context efficiency** — keep CLAUDE.md lean, offload details to `docs/`

---

## Resources

Tools, skills, and references that power this stack:

- [Impeccable](https://impeccable.style/) — design quality CLI for auditing and polishing UI
- [21st.dev](https://21st.dev/home) — animated React component library via MCP
- [Pencil.dev](https://www.pencil.dev/) — collaborative design tooling
- [Google Stitch](https://stitch.withgoogle.com/) — semantic design system generation
- [Taste Skill](https://github.com/Leonxlnx/taste-skill) — design taste enforcement skills for Claude Code
- [UI/UX Pro Max Skill](https://ui-ux-pro-max-skill.nextlevelbuilder.io/) — advanced design system queries and generation (global prerequisite)
- [Firecrawl](https://www.firecrawl.dev/) — web scraping and content extraction
- [Playwright](https://playwright.dev/) — browser automation and visual testing

---

## License

MIT
