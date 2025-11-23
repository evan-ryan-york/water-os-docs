import { redirect, notFound } from "next/navigation";
import { TABS, getFirstItem, type Tab, CONTENT_MAP } from "../lib/navigation";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface PageProps {
  params: {
    tab: string;
  };
}

// Generate static params for all tabs
export async function generateStaticParams() {
  return TABS.map((tab) => ({
    tab: tab.id,
  }));
}

export default function TabPage({ params }: PageProps) {
  const { tab } = params;

  // Validate tab
  const validTab = TABS.find((t) => t.id === tab);
  if (!validTab) {
    notFound();
  }

  const tabId = tab as Tab;
  const firstItem = getFirstItem(tabId);

  // If tab has items, redirect to the first item
  if (firstItem) {
    redirect(`/${tabId}/${firstItem.slug}`);
  }

  // Otherwise, show "coming soon" page with header and sidebar
  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={tabId} />
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <Sidebar activeTab={tabId} />
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border p-8">
              <div className="text-center py-12 text-gray-500">
                This section is coming soon
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
