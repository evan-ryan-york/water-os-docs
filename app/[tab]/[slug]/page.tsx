import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TABS, getItemBySlug, type Tab, CONTENT_MAP } from "../../lib/navigation";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import UserResearch from "../../components/UserResearch";
import CRM from "../../components/CRM";
import ExecutionPlanWrapper from "../../components/ExecutionPlanWrapper";
import ByMonthWrapper from "../../components/ByMonthWrapper";
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
              <article className="prose prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
