# CLAUDE.md - WaterOS Docs

## What This Project Is

This is a **personal project management and documentation platform** for WaterOS, a water infrastructure startup. It replaces tools like Notion with a custom Next.js application that renders markdown files and interactive React components.

## Quick Start

```bash
pnpm install
pnpm dev        # Runs on http://localhost:5301
pnpm build      # Production build
```

## Architecture Overview

### Tech Stack
- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS** with Typography plugin for prose styling
- **Markdown** rendered via react-markdown + remark-gfm
- **Deployed on Vercel**

### Project Structure

```
water-os-docs/
├── app/
│   ├── components/           # React components
│   ├── lib/navigation.ts     # CENTRAL NAVIGATION CONFIG (most important file)
│   ├── api/                  # API routes for dynamic data
│   └── [tab]/[slug]/page.tsx # Dynamic content routing
├── wateros/                  # ALL CONTENT LIVES HERE
│   ├── plan/                 # Strategic planning docs
│   ├── business/             # Legal, investors
│   ├── tech/                 # Technical specs
│   ├── market/               # User research, meetings
│   ├── research/             # Deep dives by topic
│   ├── crm/                  # CRM JSON data
│   └── links/                # External links JSON
└── CLAUDE.md                 # You are here
```

## How Content Works

### Two Content Types

1. **Markdown Files** - Stored in `wateros/` directory, rendered with prose styling
2. **React Components** - Special interactive views (CRM, Execution Plan, etc.)

### When to Use Which

**Default to Markdown.** If the content doesn't require interactivity, use a markdown file. Markdown is faster to create, easier to edit, has cleaner version control diffs, and requires no build step or TypeScript knowledge.

**Use React only when you need interactivity.** This includes: user input (toggles, checkboxes, filters), dynamic data fetching, sorting/searching, collapsible sections, or any state management. If the page is purely "read this content," it should be markdown.

### Page Header Requirements

Every page must have a header at the top with:
1. **Title** - The page title as an H1
2. **Version** - Version number (start at 1.0, increment for significant updates)
3. **Last Updated** - Date in YYYY-MM-DD format

**For markdown files**, use this format at the top:
```markdown
# Page Title
**Version:** 1.0 | **Last Updated:** 2025-01-15
```

**For React components**, include the same info in the component's rendered output, typically as:
```tsx
<h1 className="text-2xl font-bold">Page Title</h1>
<p className="text-sm text-gray-500">Version: 1.0 | Last Updated: 2025-01-15</p>
```

When updating a page, always update the "Last Updated" date. Increment the version for significant content changes.

### Adding New Content

**To add a markdown page:**
1. Create the `.md` file in the appropriate `wateros/` subdirectory
2. Add an entry to `CONTENT_MAP` in `app/lib/navigation.ts`:
   ```typescript
   { label: "Display Name", slug: "url-slug", path: "folder/filename.md" }
   ```

**To add a React component page:**
1. Create the component in `app/components/`
2. Add routing logic in `app/[tab]/[slug]/page.tsx`
3. Add entry to `CONTENT_MAP` with path: `"__component:component-name__"`

### Navigation Structure

The app uses a **Tab > Item** hierarchy defined in `app/lib/navigation.ts`:

```typescript
// Tabs (top navigation)
TABS: ["plan", "tech", "bigpicture", "business", "market", "research", "gtm", "crm", "links"]

// Items per tab (sidebar navigation)
CONTENT_MAP: Record<Tab, NavItem[]>
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `app/lib/navigation.ts` | **Central config** - all tabs and content items defined here |
| `app/[tab]/[slug]/page.tsx` | Main content router - handles markdown vs component rendering |
| `app/components/Header.tsx` | Top navigation with tabs |
| `app/components/Sidebar.tsx` | Side navigation showing items in current tab |
| `app/components/MarkdownContentWithCopy.tsx` | Markdown renderer with copy button |
| `wateros/` | All documentation content |

## How the User References Pages

The user will reference pages using **Tab > Menu Name** format, like "Big Picture > High Level Vision" or "Plan > Executive Summary".

To find the actual file path:
1. Open `app/lib/navigation.ts`
2. Find the tab in `CONTENT_MAP` (e.g., `bigpicture`)
3. Find the item by its `label` (e.g., "High Level Vision")
4. The `path` field shows the file location (e.g., `plan/high-level-vision.md` means `wateros/plan/high-level-vision.md`)

If the path starts with `__component:`, it's a React component in `app/components/`.

If the referenced page doesn't exist, ask the user to clarify before proceeding.

## Common Tasks

### Add a new document
1. Create markdown file in `wateros/[section]/`
2. Add entry to `CONTENT_MAP` in `navigation.ts`

### Add a new tab
1. Add tab id to the `Tab` type union in `navigation.ts`
2. Add tab entry to `TABS` array
3. Add empty array entry to `CONTENT_MAP`

### Modify navigation order
Edit the arrays in `navigation.ts` - order in array = order in UI

## Component Pages

These use `__component:name__` syntax in `navigation.ts`:

- `execution-plan` - 18-month execution roadmap with task tracking
- `by-month` - Monthly task breakdown view
- `crm` - Customer relationship management dashboard
- `investor-list` - Investor tracking
- `links` - External links directory
- `anna-meeting-10-24` - Meeting notes visualization

## Data Storage

- **CRM data**: `wateros/crm/` (JSON files)
- **Links data**: `wateros/links/` (JSON files)
- **Documents**: `wateros/[section]/*.md`

## Styling Notes

- Uses Tailwind's `prose` class for markdown content
- Gray background (#f9fafb) with white content cards
- Sticky header and sidebar navigation

## Related Projects

This docs platform is part of the larger WaterOS ecosystem. Planning documents may reference:
- `water-os-planning/` - Sibling directory with additional planning materials
