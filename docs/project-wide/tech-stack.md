# Tech Stack

**Version:** 1.0 | **Last Updated:** 2025-11-28

## Overview

WaterOS Docs is a Next.js application that serves as a personal project management and documentation platform. It renders markdown files and interactive React components, replacing tools like Notion with a custom solution.

## Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.x | React framework with App Router |
| React | 18.3.x | UI library |
| TypeScript | 5.x | Type-safe JavaScript |

### Next.js App Router

The application uses Next.js 14's App Router with:
- **Dynamic routing**: `app/[tab]/[slug]/page.tsx` handles content routing
- **Static generation**: `generateStaticParams()` pre-renders all content pages
- **API routes**: RESTful endpoints in `app/api/` for data operations
- **React Server Components**: Server-side rendering for markdown content

## Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 3.4.x | Utility-first CSS framework |
| @tailwindcss/typography | 0.5.x | Prose styling for markdown content |
| PostCSS | 8.4.x | CSS processing |
| Autoprefixer | 10.4.x | CSS vendor prefixing |

### Design System

- Gray background (`bg-gray-50`) with white content cards
- Sticky header and sidebar navigation
- `prose` class for markdown content styling

## Content Rendering

| Technology | Version | Purpose |
|------------|---------|---------|
| react-markdown | 9.0.x | Markdown to React components |
| remark-gfm | 4.0.x | GitHub Flavored Markdown support |
| gray-matter | 4.0.x | YAML frontmatter parsing |

### Content Types

1. **Markdown files** - Stored in `wateros/` directory
2. **React components** - Interactive views (CRM, Execution Plan, Links, etc.)

## Database & Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Supabase | 2.47.x | PostgreSQL database & auth |
| @supabase/ssr | 0.5.x | Server-side rendering support |

### Data Models

- **Tasks** - Execution plan task tracking
- **CRM Organizations** - Business contacts
- **CRM People** - Individual contacts
- **CRM Notes** - Notes for people/organizations
- **Links** - External resource bookmarks

## API Routes

| Endpoint | Purpose |
|----------|---------|
| `/api/tasks` | Task CRUD operations |
| `/api/crm` | CRM data management |
| `/api/links` | Links management |
| `/api/avatar` | Avatar uploads |
| `/api/content` | Content retrieval |
| `/api/files` | File operations |

## Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| pnpm | - | Package manager |
| ESLint | 8.57.x | Code linting |
| eslint-config-next | 14.2.x | Next.js ESLint rules |
| tsx | 4.19.x | TypeScript execution (scripts) |
| dotenv | 16.4.x | Environment variable loading |

## Deployment

| Service | Purpose |
|---------|---------|
| Vercel | Hosting and deployment |

Configuration in `vercel.json` and `.vercel/` directory.

## Project Structure

```
water-os-docs/
├── app/
│   ├── api/              # API routes
│   ├── components/       # React components
│   ├── context/          # React context providers
│   ├── lib/              # Utilities and config
│   │   ├── navigation.ts # Central navigation config
│   │   ├── supabase.ts   # Database client
│   │   └── executionPlanTypes.ts
│   └── [tab]/[slug]/     # Dynamic content routing
├── wateros/              # Content directory
│   ├── plan/             # Strategic planning docs
│   ├── business/         # Legal, investors
│   ├── tech/             # Technical specs
│   ├── market/           # User research
│   ├── research/         # Research documents
│   ├── crm/              # CRM JSON data
│   └── links/            # External links JSON
├── docs/                 # Project documentation
├── scripts/              # Migration scripts
└── supabase/             # Database migrations
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server on port 5301 |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm migrate` | Run Supabase migration script |

## Environment Variables

Required environment variables (see `.env.example`):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

## Key Architectural Decisions

1. **App Router over Pages Router** - Modern Next.js patterns with server components
2. **Markdown-first content** - Easy editing, clean version control
3. **Component pages for interactivity** - CRM, task tracking, etc.
4. **Supabase for persistence** - Serverless PostgreSQL with real-time capabilities
5. **Tailwind for styling** - Rapid UI development with utility classes
6. **Central navigation config** - Single source of truth in `navigation.ts`
