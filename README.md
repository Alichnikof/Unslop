# Unslop

> A practical starter for building higher-quality websites and full-stack web apps with AI coding tools.

Unslop packages the project structure, AI instructions, local skills, MCP setup, and documentation patterns I want at the start of a serious AI-assisted build.

The goal is simple: give the AI good context before it writes code, give humans clear places to put decisions and inspiration, and keep the project shippable instead of letting it drift into generic AI output.

Current local skill inventory: **40 project-level skills** in `.claude/skills/`, with one folder per skill.

This repo is opinionated, practical, and still evolving.

If you have ideas, improvements, or tools that deserve a place in the stack, open an issue or submit a PR.

---

## Why This Exists

Most AI-generated sites fail for boring reasons: missing context, weak taste, placeholder content, no visual references, no QA loop, and no clear source of truth. Unslop gives those pieces a home.

It is built around Claude Code, but the structure is useful in Cursor, Codex, Windsurf, GitHub Copilot, and other agentic tools. Rename `CLAUDE.md` to the instruction filename your tool expects if needed.

The stack combines:

- **Project instructions** in `CLAUDE.md`
- **Strategic/brand context** in `PRODUCT.md`, **visual design decisions** in `DESIGN.md` (root — this is where `impeccable`'s own tooling reads/writes them)
- **Human inspiration intake** in `docs/inspiration/`
- **Content staging** in `docs/content/` and `public/content/`
- **Local skills** for design critique, animation, copy/SEO/CRO, research, and creative generation
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
- Use root `DESIGN.md` (paired with `PRODUCT.md`) as the design source of truth
- Check `docs/inspiration/` for relevant visual references before design work
- Build SEO-ready pages with metadata, Open Graph, JSON-LD, sitemap, robots, and `llms.txt`
- Use Motion defaults with flexibility per use case (including reduced motion)
- Run CLI-first workflows (Wrangler, GitHub, Firecrawl, Playwright, shadcn) for token efficiency
- Use Magic / 21st.dev when selecting React components
- Use Supabase MCP for backend schema, SQL, migrations, auth, and project metadata

### Design source of truth

Design decisions live in root `DESIGN.md`, paired with `PRODUCT.md` for strategic/brand context. Both live at the repo root because `impeccable`'s own `/impeccable init` and `/impeccable document` commands read and write them there.

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

Keep it simple: drop references directly in the folder, add short notes when needed, and distill real decisions into `DESIGN.md`.

### Framework & Core

- **Next.js** (App Router) — React with Server Components
- **TypeScript** (strict mode)
- **Tailwind CSS** — utility-first with CSS custom properties for design tokens
- **shadcn/ui** — component library to extend (pre-configured via `components.json`)
- **Motion** (formerly Framer Motion) — animation, import from `motion/react` (LazyMotion + domAnimation only)

### Optional, add per-project

Not installed by default — pull these in when a specific project needs them:

- **Cal.com embed** (`@calcom/embed-react`) — inline booking widgets
- **Hugeicons** (`@hugeicons/react` + `@hugeicons/core-free-icons`) — icon set
- **shaders** (`shaders`) — decorative shader/visual-FX backgrounds

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
| **Impeccable** | Design quality: `/impeccable init/craft/critique/audit/polish/...`, plus a `detect` anti-pattern scanner |
| **Firecrawl** | Web scraping, search, content extraction |
| **GitHub** | PRs, issues, releases from terminal |
| **Wrangler** | Cloudflare Worker dev/deploy — static export or SSR/full-stack via an adapter, whichever the project needs |
| **shadcn** | Component registry: `npx shadcn@latest add/info/docs/diff` |
| **Higgsfield** | Image/video/product creative generation (optional, project-dependent) |

### Skills (project-local in `.claude/skills/`)

| Category | Skills | Count |
|----------|--------|-------|
| **Design/UI authority** | `impeccable` (critique, audit, polish, craft — wins over generic defaults), `ui-ux-pro-max` (secondary UX/accessibility checklist), `shadcn`, `migrate-radix-to-base` | **4** |
| **Animation** | `framer-motion`, `gsap-core`, `gsap-react`, `gsap-frameworks`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-plugins`, `gsap-utils`, `gsap-performance` | **9** |
| **Copy & marketing** | `copywriting`, `copy-editing`, `marketing-psychology`, `stop-slop`, `product-marketing-context`, `content-strategy`, `competitor-alternatives` | **7** |
| **SEO** | `seo-audit`, `ai-seo`, `schema-markup`, `programmatic-seo`, `site-architecture` | **5** |
| **Conversion** | `page-cro` | **1** |
| **Web research** | `firecrawl`, `firecrawl-search`, `firecrawl-scrape`, `firecrawl-crawl`, `firecrawl-map`, `firecrawl-download`, `firecrawl-interact`, `firecrawl-agent` | **8** |
| **Creative generation** | `higgsfield-generate`, `higgsfield-product-photoshoot`, `higgsfield-marketplace-cards`, `higgsfield-soul-id`, `image` | **5** |
| **Misc** | `playwright` | **1** |
| **Total (project-local)** | All skills loaded from this repo | **40** |

No skill in this template is assumed to be global-only. All skills are stored directly at `.claude/skills/<skill-name>/`.

`impeccable` ships as generated output of the `impeccable` npm package (see Setup below) — don't hand-edit it. If you add or bump other skills with a tracked install source, record it in `skills-lock.json`.

---

## File Structure

```
unslop/
├── CLAUDE.md                    # AI operating manual (the core value)
├── README.md                    # You are here
├── PRODUCT.md                   # Strategic/brand context (users, purpose, voice)
├── DESIGN.md                    # Visual design spec (colors, type, components)
├── package.json                 # Minimal deps
├── components.json              # shadcn/ui config
├── tsconfig.json                # Strict TypeScript
├── next.config.ts               # Next.js config
├── postcss.config.mjs           # PostCSS + Tailwind
├── .gitignore
├── .mcp.json                    # MCP server config (Magic / 21st.dev + Supabase)
├── skills-lock.json             # Locked GitHub-sourced skill versions
├── .claude/
│   ├── settings.json            # Claude Code permissions + impeccable hook
│   └── skills/                  # 40 project-local skills (one folder per skill)
│       ├── ai-seo/
│       ├── competitor-alternatives/
│       ├── content-strategy/
│       ├── copy-editing/
│       ├── copywriting/
│       ├── firecrawl/ firecrawl-agent/ firecrawl-crawl/ firecrawl-download/
│       │   firecrawl-interact/ firecrawl-map/ firecrawl-scrape/ firecrawl-search/
│       ├── framer-motion/
│       ├── gsap-core/ gsap-frameworks/ gsap-performance/ gsap-plugins/
│       │   gsap-react/ gsap-scrolltrigger/ gsap-timeline/ gsap-utils/
│       ├── higgsfield-generate/ higgsfield-marketplace-cards/
│       │   higgsfield-product-photoshoot/ higgsfield-soul-id/
│       ├── image/
│       ├── impeccable/
│       ├── marketing-psychology/
│       ├── migrate-radix-to-base/
│       ├── page-cro/
│       ├── playwright/
│       ├── product-marketing-context/
│       ├── programmatic-seo/
│       ├── schema-markup/
│       ├── seo-audit/
│       ├── shadcn/
│       ├── site-architecture/
│       ├── stop-slop/
│       └── ui-ux-pro-max/
├── docs/
│   ├── project-context.md       # Project-context fill-in block
│   ├── inspiration/             # Human-curated visual and product references
│   │   └── README.md            # Inspiration workflow
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
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (`npx wrangler`) — for Cloudflare Worker dev/deploy
- [Playwright CLI](https://playwright.dev/) (`npx playwright install`)
- [Firecrawl CLI](https://www.firecrawl.dev/) (`npm i -g firecrawl`)
- [Higgsfield CLI](https://higgsfield.ai/) — optional, only for projects doing creative generation
- UI/UX Pro Max is included in `.claude/skills/ui-ux-pro-max/` (project-local)

### Configure MCPs

Edit `.mcp.json` and add your project credentials:
- **Magic / 21st.dev**: replace `YOUR_API_KEY_HERE` with your 21st.dev API key
- **Supabase**: replace `YOUR_PROJECT_REF` with your Supabase project ref

> **Warning**: Never commit real API keys. The `.mcp.json` ships with placeholders only.

### Start a new project

Before asking the AI to build:

1. Run `/impeccable init` in your AI coding tool — it interviews you and writes `PRODUCT.md`, and offers to write `DESIGN.md` once there's code to extract from.
2. Fill `docs/project-context.md`.
3. Add visual references to `docs/inspiration/`.
4. Then ask the AI to implement.

### Deployment

This template doesn't hardcode a deploy target in `next.config.ts` — decide per project:

- **Static export**: `output: "export"` in `next.config.ts`, served as static assets by a Cloudflare Worker (`wrangler deploy`). Right for marketing/brochure sites with no server routes.
- **SSR / full-stack**: use a Cloudflare adapter (e.g. OpenNext for Cloudflare) so the Worker actually renders. Right for anything with dynamic routes, auth, or a backend.

Either way, confirm during setup whether pushing to your main branch auto-deploys (CI-configured) before assuming it does.

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
- [GSAP](https://gsap.com/) — scroll-driven and timeline animation, framework-agnostic
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
