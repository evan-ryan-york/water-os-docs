# Project Overview

**Version:** 1.0 | **Last Updated:** 2025-11-28

## What This Application Is

This is a **personal project management and documentation platform** for WaterOS, a water infrastructure startup. Built with Next.js, it replaces tools like Notion with a custom solution that renders markdown files and interactive React components. The platform runs locally on port 5301 and is deployed on Vercel.

## The Business Context: WaterOS / Clearwater

WaterOS is a startup building technology infrastructure for water delivery and distribution in urban Africa, starting with Accra, Ghana. The project has two major phases:

### Phase 1: Clearwater (Years 0-3)
A **driver-first operating system for bulk water delivery** - a three-sided marketplace connecting:
1. **Water truck drivers** - Primary customers who use the platform for depot finding, route optimization, and digital payments
2. **Water purchasers** - Residential and commercial customers ordering water delivery
3. **Water depots** - Bulk water sources that supply the truck drivers

**Business Model:**
- 5% commission on drivers' existing customer transactions
- 20% commission on new commercial leads provided by the platform
- Target: 154 trucks (7.7% market share in Accra) by Month 28

### Phase 2: WaterOS (Years 3-10+)
Infrastructure securitization platform that builds "Island Grids" - ring-fenced pipe networks funded by private capital. The vision is to become the "VISA and FICO of the global water sector" - validating water infrastructure investments for institutional investors.

## Purpose of This Documentation Platform

This platform serves as the **central command center** for planning, tracking, and documenting all aspects of the WaterOS venture:

1. **Strategic Planning** - Business plans, execution roadmaps, financial projections
2. **Technical Documentation** - Platform architecture, build timelines, technical specs
3. **Market Research** - User research synthesis, meeting notes, competitive analysis
4. **Business Operations** - Legal strategy, investor relations, CRM
5. **Research** - Deep dives on specific topics (e.g., TankerWala competitor model)

## Content Organization

The platform uses a **Tab > Menu Item** hierarchy:

| Tab | Purpose |
|-----|---------|
| **Plan** | Executive summary, execution plan, month-by-month tasks, GWCL partnership strategy |
| **Big Picture** | High-level vision, sequence of events, founder profile |
| **Tech** | Platform vision, GPS POC build plan, technical specifications |
| **Business** | Legal strategy (Ghana incorporation), investor list |
| **Market** | User research, customer meeting notes, driver validation |
| **Research** | Deep dives (e.g., TankerWala model analysis) |
| **CRM** | Customer relationship management dashboard |
| **Links** | External resource bookmarks |
| **GTM** | Go-to-market materials (currently empty) |

## Key Documents for Understanding the Project

For any LLM working with this codebase, these are the most important documents to understand the business:

1. **Plan > Executive Summary** (`wateros/plan/business-plan-v5.md`)
   - Complete business plan with market analysis, financial projections, and go-to-market strategy
   - The most comprehensive single document about the venture

2. **Big Picture > High Level Vision** (`wateros/plan/high-level-vision.md`)
   - Long-term 20-year vision from logistics marketplace to infrastructure securitization
   - Explains the "Digital Revenue Bond" concept

3. **Big Picture > Sequence of Events** (`wateros/plan/sequence-of-events.md`)
   - Step-by-step progression from marketplace to infrastructure company

4. **Tech > Platform Vision** (`wateros/tech/tech-plan-2025-11-09.md`)
   - Detailed technical specification for the mobile apps and web platform
   - Database schema, API design, build timeline

5. **Business > Legal Strategy** (`wateros/business/legal-strategy.md`)
   - Ghana incorporation requirements, GIPC regulations, partner structuring
   - Critical for understanding operational constraints

6. **Plan > GWCL Strategy** (`wateros/plan/gwcl-strategy.md`)
   - Partnership approach with Ghana Water Company Limited
   - The "Virtual DMA" concept for transparency

## Key Concepts

### The Problem
- Accra has a 90 million gallon/day water deficit
- 2,000+ informal tankers fill the gap
- Drivers waste time/fuel finding water at depots
- No digital coordination, all cash-based

### The Solution
- **Depot Finder** - Real-time depot water availability (killer feature)
- **Digital Payments** - Mobile Money integration via Paystack
- **Route Optimization** - Reduce fuel costs
- **Customer Management** - CRM for drivers' existing relationships

### Key Metrics
- **TAM:** $13.14B globally (informal water markets)
- **SAM:** $35M/year in Accra (at 12% commission)
- **Target:** $2.13M cumulative revenue over 28 months
- **Profitability:** Month 10 (June 2027)

### Financial Requirements
- **Total Raise:** $350,000
- **GIPC Capital Requirement:** $200,000 (for foreign-owned Ghana company)
- **Pre-launch Phase:** 9 months of relationship building before September 2026 launch

## Technical Platform Overview

The WaterOS product will consist of:

1. **Android Driver App** - Depot finder, order management, earnings tracking
2. **Android Customer App** - Order water, track delivery, pay via Mobile Money
3. **Web Admin Dashboard** - Operations command center
4. **Backend API** - Next.js with Supabase database

See `docs/project-wide/tech-stack.md` for this documentation platform's technical details.

## Timeline

| Phase | Dates | Focus |
|-------|-------|-------|
| Pre-Launch | Nov 2025 - Aug 2026 | Research, depot partnerships, driver recruitment, platform build |
| Launch | Sep 2026 | 10 drivers, 5-8 depots, 5-10 commercial clients |
| Validation | Sep 2026 - Feb 2027 | Prove model, 10% subsidies |
| Scale | Mar 2027 - Dec 2028 | Grow to 154 trucks, reach profitability |

## Founder

**Ryan York** - Solo founder with dual operator/developer background:
- Former CEO of $10M/year charter school network
- Expert full-stack developer (11+ web apps, 100,000+ users)
- Building entire MVP solo (no external engineering costs)
- Based in US, relocating to Accra for launch

## Deprecated Content

Documents that are no longer current are moved to `docs/archive/`. **LLMs should ignore everything in the archive folder** - it contains outdated planning documents, superseded strategies, and historical content kept only for reference.

If you're unsure whether a document is current, check if it's referenced in this overview or in `app/lib/navigation.ts`.

## For LLMs: How to Navigate This Codebase

1. **Finding Content:** Check `app/lib/navigation.ts` - this maps all Tab > Menu items to file paths
2. **Content Lives in:** `wateros/` directory (markdown files)
3. **React Components:** `app/components/` for interactive features
4. **Adding Content:** Create markdown in `wateros/`, add entry to `CONTENT_MAP` in `navigation.ts`

When users reference pages like "Big Picture > High Level Vision":
1. Look up the tab in `CONTENT_MAP` (e.g., `bigpicture`)
2. Find the item by label (e.g., "High Level Vision")
3. The `path` field gives the file location (e.g., `plan/high-level-vision.md` = `wateros/plan/high-level-vision.md`)
