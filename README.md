# Unslop

> A practical starter for building higher-quality websites and full-stack web apps with AI coding tools.

Unslop packages the project structure, AI instructions, local skills, MCP setup, and documentation patterns I want at the start of a serious AI-assisted build.

The goal is simple: give the AI good context before it writes code, give humans clear places to put decisions and inspiration, and keep the project shippable instead of letting it drift into generic AI output.

Current local skill inventory: **26 project-level skills** in `.claude/skills/`, with one folder per skill.

This repo is opinionated, practical, and still evolving.

If you have ideas, improvements, or tools that deserve a place in the stack, open an issue or submit a PR.

---

## Why This Exists

Most AI-generated sites fail for boring reasons: missing context, weak taste, placeholder content, no visual references, no QA loop, and no clear source of truth. Unslop gives those pieces a home.

It is built around Claude Code, but the structure is useful in Cursor, Codex, Windsurf, GitHub Copilot, and other agentic tools. Rename `CLAUDE.md` to the instruction filename your tool expects if needed.

The stack combines:

- **Project instructions** in `CLAUDE.md`
- **Design decisions** in `docs/design/DESIGN.md`
- **Human inspiration intake** in `docs/inspiration/`
- **Content staging** in `docs/content/` and `public/content/`
- **Local skills** for design critique, polishing, research, and UI/UX guidance
- **MCPs** for component discovery and backend work

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

### Project instructions

`CLAUDE.md` is the operating manual for the AI. It covers:

- Fill project context before implementation
- Use `docs/design/DESIGN.md` as the design source of truth
- Check `docs/inspiration/` for relevant visual references before design work
- Build SEO-ready pages with metadata, Open Graph, JSON-LD, sitemap, robots, and `llms.txt`
- Use Framer Motion defaults with flexibility per use case (including reduced motion)
- Run CLI-first workflows (Vercel, GitHub, Firecrawl, Playwright) for token efficiency
- Use Magic / 21st.dev when selecting React components
- Use Supabase MCP for backend schema, SQL, migrations, auth, and project metadata

### Design source of truth

Design decisions live in `docs/design/DESIGN.md`.

- Keep project-specific design direction there (not in CLAUDE.md)
- Update it as visual decisions evolve
- Distill inspiration into decisions before implementation

### Inspiration library

`docs/inspiration/` is where humans can collect references before the AI designs:

- screenshots
- example `DESIGN.md` files
- Google Stitch outputs
- Claude Design outputs
- AI design drafts
- competitor notes
- moodboards and design research

Keep it simple: drop references directly in the folder, add short notes when needed, and distill real decisions into `docs/design/DESIGN.md`.

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
├── .mcp.json                    # MCP server config (Magic / 21st.dev + Supabase)
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
│   ├── inspiration/             # Human-curated visual and product references
│   │   ├── README.md            # Inspiration workflow
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
- An AI coding tool that can read project instructions
- [GitHub CLI](https://cli.github.com/) (`gh`)
- [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`)
- [Playwright CLI](https://playwright.dev/) (`npx playwright install`)
- [Firecrawl CLI](https://www.firecrawl.dev/) (`npm i -g firecrawl`)
- UI/UX Pro Max is included in `.claude/skills/ui-ux-pro-max/` (project-local)

### Configure MCPs

Edit `.mcp.json` and add your project credentials:
- **Magic / 21st.dev**: replace `YOUR_API_KEY_HERE` with your 21st.dev API key
- **Supabase**: replace `YOUR_PROJECT_REF` with your Supabase project ref

> **Warning**: Never commit real API keys. The `.mcp.json` ships with placeholders only.

### Start a new project

Before asking the AI to build:

1. Fill `docs/project-context.md`.
2. Add visual references to `docs/inspiration/`.
3. Fill the first pass of `docs/design/DESIGN.md`.
4. Then ask the AI to implement.

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
- [MotionSites](https://motionsites.ai/) — hero section and animated landing-page prompt inspiration
- [Designspiration](https://www.designspiration.com/) — broad visual moodboards, color, typography, photography, and layout ideas
- [Dribbble](https://dribbble.com/) — UI shots, interaction ideas, visual style exploration, and component polish references
- [Godly](https://godly.website/) — high-end website inspiration with polished visual direction
- [Land-book](https://land-book.com/) — website and landing page inspiration across modern product, SaaS, portfolio, and ecommerce sites
- [Unsplash](https://unsplash.com/) — free photography and image assets for drafts, hero images, moodboards, and content direction
- [Higgsfield](https://higgsfield.ai/) — AI image and video generation, cinematic visuals, product imagery, and campaign-style assets
- [Awesome DESIGN.md](https://github.com/VoltAgent/awesome-design-md) — example `DESIGN.md` files inspired by popular websites and brand design systems

---

## License

MIT
