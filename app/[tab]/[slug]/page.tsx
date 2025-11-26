import { notFound } from "next/navigation";
import { TABS, getItemBySlug, type Tab, CONTENT_MAP } from "../../lib/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MarkdownContentWithCopy from "../../components/MarkdownContentWithCopy";
import UserResearch from "../../components/UserResearch";
import CRM from "../../components/CRM";
import ExecutionPlanWrapper from "../../components/ExecutionPlanWrapper";
import ByMonthWrapper from "../../components/ByMonthWrapper";
import InvestorList from "../../components/InvestorList";
import AnnaMeeting1024 from "../../components/AnnaMeeting1024";
import Links from "../../components/Links";
import ContaminationPlan from "../../components/ContaminationPlan";
import fs from "fs";
import path from "path";

interface PageProps {
  params: {
    tab: string;
    slug: string;
  };
}

// Generate static params for all routes
export async function generateStaticParams() {
  const params: { tab: string; slug: string }[] = [];

  TABS.forEach((tab) => {
    const items = CONTENT_MAP[tab.id];
    items.forEach((item) => {
      params.push({
        tab: tab.id,
        slug: item.slug,
      });
    });
  });

  return params;
}

async function getContent(filePath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), "wateros", filePath);
    const content = fs.readFileSync(fullPath, "utf8");
    return content;
  } catch (error) {
    console.error("Error reading file:", error);
    return "Error loading content";
  }
}

export default async function ContentPage({ params }: PageProps) {
  const { tab, slug } = params;

  // Validate tab
  const validTab = TABS.find((t) => t.id === tab);
  if (!validTab) {
    notFound();
  }

  const tabId = tab as Tab;
  const item = getItemBySlug(tabId, slug);

  if (!item) {
    notFound();
  }

  // Special case: Contamination Plan (needs to load 4 markdown files)
  if (item.path === "__component:contamination-plan__") {
    const [sopContent, sopTechContent, assuranceContent, transparencyContent] = await Promise.all([
      getContent("plan/contamination-sop.md"),
      getContent("plan/contamination-sop-tech.md"),
      getContent("plan/assurance-protocol.md"),
      getContent("plan/transparency-plan.md"),
    ]);

    return (
      <div className="min-h-screen bg-gray-50">
        <Header activeTab={tabId} />
        <main className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            <Sidebar activeTab={tabId} currentSlug={slug} />
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-lg border p-8">
                <ContaminationPlan
                  sopContent={sopContent}
                  sopTechContent={sopTechContent}
                  assuranceContent={assuranceContent}
                  transparencyContent={transparencyContent}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Handle special component cases
  const renderContent = () => {
    // Special case: CRM component
    if (item.path === "__component:crm__") {
      return <CRM />;
    }

    // Special case: Execution Plan Table
    if (item.path === "__component:execution-plan__") {
      return <ExecutionPlanWrapper />;
    }

    // Special case: By Month
    if (item.path === "__component:by-month__") {
      return <ByMonthWrapper />;
    }

    // Special case: User Research component
    if (tabId === "market" && slug === "user-research") {
      return <UserResearch />;
    }

    // Special case: Investor List component
    if (item.path === "__component:investor-list__") {
      return <InvestorList />;
    }

    // Special case: Anna Meeting 10-24 component
    if (item.path === "__component:anna-meeting-10-24__") {
      return <AnnaMeeting1024 />;
    }

    // Special case: Links component
    if (item.path === "__component:links__") {
      return <Links />;
    }

    return null;
  };

  const specialComponent = renderContent();

  // If it's a special component, render it
  if (specialComponent) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header activeTab={tabId} />
        <main className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            <Sidebar activeTab={tabId} currentSlug={slug} />
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-lg border p-8">
                {specialComponent}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Otherwise, load and render markdown content
  const content = await getContent(item.path);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={tabId} />
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <Sidebar activeTab={tabId} currentSlug={slug} />
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border p-8">
              <MarkdownContentWithCopy content={content} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
