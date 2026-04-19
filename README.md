# Unslop

> A boilerplate for AI-assisted website builds, with the instructions, tools, and design systems needed to ship cleaner, sharper website design with any AI coding tool.

Unslop is the template I use when starting a new website project.

The goal is simple: every new build should start from the same solid base, use the same good practices, and give the AI the same high-quality context from day one. Instead of reassembling that setup every time, I bundled it here, instructions, skills, MCPs, CLI tools, and a minimal project scaffold.

Current local skill inventory: **26 project-level skills** in `.claude/skills/`, with one folder per skill.

This repo is opinionated, practical, and still evolving. I update it as I find better tools, better patterns, and better ways to make AI-assisted web builds more repeatable.

If you have ideas, improvements, or tools that deserve a place in the stack, open an issue or submit a PR.

---

## Works with any AI coding tool

I use Claude Code daily so that's what this is built around, but Unslop isn't locked to one AI. Cursor, GitHub Copilot, Codex, Windsurf — they all read instruction files. Rename `CLAUDE.md` to `AGENTS.md` or whatever your tool expects and you're good to go.

The value here isn't the AI — it's the stack. The combination of:
- **Instructions** that teach any AI to stop generating slop and start building with taste
- **CLI tools** that give your AI real capabilities — deploy, scrape, test, screenshot, all from the terminal
- **MCP resources** that give your AI access to quality components instead of hallucinating everything from scratch
- **Skills** that enforce best practices — accessibility, production quality, design critique, polish, and the stuff AI skips by default

Swap the AI, keep the stack. The setup is the value.

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/Alichnikof/unslop.git my-project
cd my-project
npm install

# Start dev server
npm run dev

# Open in Claude Code and start building
```

---

## What's Inside

### The CLAUDE.md

This is the core instruction file. It tells the AI how to work inside the project and what standards to follow.

It covers things like:

- Fill project context first before implementation work starts
- Build SEO-optimized pages (meta tags, Open Graph, JSON-LD, sitemap, robots.txt, llms.txt)
- Use Framer Motion defaults with flexibility per use case (including reduced motion)
- Run CLI-first workflows (Vercel, GitHub, Firecrawl, Playwright) for token efficiency
- Use the configured Magic MCP from 21st.dev when selecting React components
- Use Supabase MCP for backend schema, SQL, migrations, auth, and project metadata
- Use parallel sub-agents only when tasks are independent
- Keep context lean and ask focused questions when requirements are unclear

### The DESIGN.md

Design decisions live in a dedicated file at `docs/design/DESIGN.md`.

This is the shared design spec for both the user and the AI:
- Keep project-specific design direction there (not in CLAUDE.md)
- Update it as visual decisions evolve
- Keep it minimal and practical: core rules first, details only when needed


### Framework & Core

- **Next.js** (App Router) — React with Server Components
- **TypeScript** (strict mode)
- **Tailwind CSS** — utility-first with CSS custom properties for design tokens
- **shadcn/ui** — component library to extend
- **Framer Motion** — animation (LazyMotion + domAnimation only)

---

## The Stack

### MCPs

| MCP | What it does |
|-----|-------------|
| **Magic / 21st.dev** | Search and select high-quality React components before building from scratch (configured in `.mcp.json`) |
| **Supabase** | Backend access for schema inspection, SQL, migrations, auth, generated types, and project metadata (configured in `.mcp.json`) |

### CLIs

| CLI | What it does |
|-----|-------------|
| **Playwright** | E2E testing, visual regression, screenshots |
| **Impeccable** | Design quality audits (audit, polish, animate, critique...) |
| **Firecrawl** | Web scraping, search, content extraction |
| **GitHub** | PRs, issues, releases from terminal |
| **Vercel** | Deploy, env vars, domains, logs |

### Skills (project-local in `.claude/skills/`)

| Skill Slice | What it does | Count |
|-------|-------------|-------|
| **Impeccable skills** | Design quality workflow and focused modules (audit, critique, polish, motion, layout, clarity, responsiveness, optimization) | **17** |
| **Firecrawl skills** | Web research and extraction (search, scrape, crawl, interact, map, download, structured agent) | **8** |
| **UI/UX Pro Max** | Design intelligence search and generation workflows | **1** |
| **Total (project-local)** | All skills loaded from this repo | **26** |

No skill in this template is assumed to be global-only.

All skills are stored directly at `.claude/skills/<skill-name>/`.
---

## Coming Soon

Things I'm currently trying out and might add to the stack:

- **Nano Banana MCP** — AI-powered design assistance, looks promising
- **Chrome DevTools MCP** — browser debugging and performance profiling straight from Claude Code
- **Pencil.dev MCP** — collaborative design tooling, same deal — trying it out
- UI UX Pro CLI ?

---

## File Structure

```
unslop/
├── CLAUDE.md                    # AI operating manual (the core value)
├── README.md                    # You are here
├── package.json                 # Minimal deps
├── tsconfig.json                # Strict TypeScript
├── next.config.ts               # Next.js config
├── postcss.config.mjs           # PostCSS + Tailwind
├── .gitignore
├── .mcp.json                    # MCP server config (Magic / 21st.dev; add your API key)
├── skills-lock.json             # Locked GitHub-installed Impeccable skill versions
├── .claude/
│   ├── settings.json            # Claude Code permissions
│   └── skills/                  # 26 project-local skills (one folder per skill)
│       ├── adapt/
│       ├── animate/
│       ├── audit/
│       ├── bolder/
│       ├── clarify/
│       ├── colorize/
│       ├── critique/
│       ├── delight/
│       ├── distill/
│       ├── firecrawl/
│       ├── firecrawl-agent/
│       ├── firecrawl-crawl/
│       ├── firecrawl-download/
│       ├── firecrawl-interact/
│       ├── firecrawl-map/
│       ├── firecrawl-scrape/
│       ├── firecrawl-search/
│       ├── impeccable/
│       ├── layout/
│       ├── optimize/
│       ├── overdrive/
│       ├── polish/
│       ├── quieter/
│       ├── shape/
│       ├── typeset/
│       └── ui-ux-pro-max/
├── docs/
│   ├── design/
│   │   └── DESIGN.md            # Shared design spec (user + AI)
│   └── content/
│       ├── README.md            # Raw -> production content flow
│       └── inbox/               # Raw user files (non-public)
├── app/
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Start here
│   └── globals.css              # Design tokens template
├── components/
│   └── motion/                  # Animation wrappers
├── lib/                         # Utilities
├── public/
│   ├── content/
│   │   ├── images/             # Final images served by the website
│   │   ├── videos/             # Final videos served by the website
│   │   ├── icons/              # Final icons/SVGs served by the website
│   │   └── downloads/          # Final downloadable files
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
- UI/UX Pro Max is included in `.claude/skills/ui-ux-pro-max/` (project-local)

### Configure MCPs

Edit `.mcp.json` and add your project credentials:
- **Magic / 21st.dev**: replace `YOUR_API_KEY_HERE` with your 21st.dev API key.
- **Supabase**: replace `YOUR_PROJECT_REF` with your Supabase project ref. The hosted MCP uses browser-based OAuth in clients that support it; keep it project-scoped.

> **Warning**: Never commit real API keys. The `.mcp.json` ships with placeholders only.

---

## Resources

Tools, skills, and references that power this stack:

- [Impeccable](https://impeccable.style/) — design quality CLI for auditing and polishing UI
- [21st.dev](https://21st.dev/home) — animated React component library via MCP
- [Supabase MCP](https://supabase.com/mcp) — backend, database, and project access through MCP
- [Pencil.dev](https://www.pencil.dev/) — collaborative design tooling
- [UI/UX Pro Max Skill](https://ui-ux-pro-max-skill.nextlevelbuilder.io/) — advanced design system queries and generation (included locally in this template)
- [Firecrawl](https://www.firecrawl.dev/) — web scraping and content extraction
- [Playwright](https://playwright.dev/) — browser automation and visual testing

---

## License

MIT
