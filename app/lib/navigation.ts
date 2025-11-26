export type Tab = "plan" | "bigpicture" | "business" | "tech" | "research" | "crm" | "links" | "market" | "gtm";

export interface NavItem {
  label: string;
  slug: string;
  path: string; // File path for markdown files, or component identifier
}

export const TABS: { id: Tab; label: string }[] = [
  { id: "plan", label: "PLAN" },
  { id: "tech", label: "TECH" },
  { id: "bigpicture", label: "BIG PICTURE" },
  { id: "business", label: "BUSINESS" },
  { id: "market", label: "MARKET" },
  { id: "research", label: "RESEARCH" },
  { id: "gtm", label: "GTM" },
  { id: "crm", label: "CRM" },
  { id: "links", label: "LINKS" },
];

export const CONTENT_MAP: Record<Tab, NavItem[]> = {
  plan: [
    { label: "Executive Summary", slug: "executive-summary", path: "plan/business-plan-v5.md" },
    { label: "Execution Plan Table", slug: "execution-plan", path: "__component:execution-plan__" },
    { label: "Contamination SOP", slug: "contamination-sop", path: "plan/contamination-sop.md" },
    { label: "SOP Tech Requirements", slug: "sop-tech-requirements", path: "plan/contamination-sop-tech.md" },
    { label: "Assurance Protocol", slug: "assurance-protocol", path: "plan/assurance-protocol.md" },
    { label: "Transparency Plan", slug: "transparency-plan", path: "plan/transparency-plan.md" },
    { label: "By Month", slug: "by-month", path: "__component:by-month__" },
    { label: "Risk Identification and Mitigation", slug: "risk-identification-mitigation", path: "plan/risk-identification-mitigation.md" },
    { label: "Moat", slug: "moat", path: "plan/deep-swot.md" },
    { label: "GWCL Strategy", slug: "gwcl-strategy", path: "plan/gwcl-strategy.md" },
  ],
  bigpicture: [
    { label: "🎯 High Level Vision", slug: "high-level-vision", path: "plan/high-level-vision.md" },
    { label: "📊 WaterOS Sequence of Events", slug: "sequence-of-events", path: "plan/sequence-of-events.md" },
    { label: "📄 Ryan 1-Pager", slug: "ryan-1-pager", path: "plan/ryan-1-pager.md" },
    { label: "🔍 Ryan Deep Dive", slug: "ryan-deep-dive", path: "plan/ryan-deep-dive.md" },
  ],
  business: [
    { label: "Legal Strategy", slug: "legal-strategy", path: "business/legal-strategy.md" },
    { label: "Ghana Legal Consultation", slug: "ghana-legal-consultation", path: "business/yorke-legal-consultation-11-19-2025.md" },
    { label: "Investor List", slug: "investor-list", path: "__component:investor-list__" },
  ],
  tech: [
    { label: "Platform Vision", slug: "platform-vision", path: "tech/tech-plan-2025-11-09.md" },
    { label: "GPS POC Build Plan", slug: "gps-poc-build-plan", path: "research/tech/gps-poc-completion-report.md" },
  ],
  research: [
    { label: "TankerWala Model", slug: "tankerwala-model", path: "research/tankerwala-model.md" },
  ],
  crm: [
    { label: "CRM Dashboard", slug: "dashboard", path: "__component:crm__" },
  ],
  links: [
    { label: "Links", slug: "links", path: "__component:links__" },
  ],
  market: [
    { label: "User Research", slug: "user-research", path: "market/user-research-synthesis-2025-11-09.md" },
    { label: "Anna Meeting 2025-10-24", slug: "anna-meeting-2025-10-24", path: "__component:anna-meeting-10-24__" },
    { label: "Anna Meeting 2025-10-31", slug: "anna-meeting-2025-10-31", path: "market/anna-meeting-2025-10-31.md" },
    { label: "Anna Meeting 2025-11-07", slug: "anna-meeting-2025-11-07", path: "market/anna-meeting-2025-11-07.md" },
    { label: "Driver Validation Plan", slug: "driver-validation-plan", path: "market/driver-validation-plan.md" },
  ],
  gtm: [],
};

// Helper to get first item for a tab
export function getFirstItem(tab: Tab): NavItem | null {
  const items = CONTENT_MAP[tab];
  return items.length > 0 ? items[0] : null;
}

// Helper to find item by slug within a tab
export function getItemBySlug(tab: Tab, slug: string): NavItem | null {
  return CONTENT_MAP[tab].find(item => item.slug === slug) || null;
}
