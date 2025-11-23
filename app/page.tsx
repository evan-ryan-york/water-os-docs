"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import UserResearch from "./components/UserResearch";
import CRM from "./components/CRM";
import ExecutionPlan18M from "./components/ExecutionPlan18M";
import ByMonth from "./components/ByMonth";

type Tab = "plan" | "bigpicture" | "business" | "tech" | "research" | "crm" | "links" | "market" | "gtm";

const TABS: { id: Tab; label: string }[] = [
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

// Curated content structure matching the old app
const CONTENT_MAP: Record<Tab, { label: string; path: string }[]> = {
  plan: [
    { label: "Executive Summary", path: "plan/high-level-strategy.md" },
    { label: "Execution Plan Table", path: "__component:execution-plan__" },
    { label: "Contamination Plan", path: "plan/contamination-sop.md" },
    { label: "By Month", path: "__component:by-month__" },
    { label: "Risk Identification and Mitigation", path: "plan/risk-identification-mitigation.md" },
    { label: "Moat", path: "plan/deep-swot.md" },
    { label: "GWCL Strategy", path: "plan/gwcl-strategy.md" },
  ],
  bigpicture: [
    { label: "🎯 High Level Vision", path: "plan/high-level-vision.md" },
    { label: "🔄 Flywheel", path: "plan/flywheel.md" },
    { label: "🚧 20 Barriers", path: "plan/20-barriers.md" },
    { label: "📅 20-Year Roadmap", path: "plan/detailed-20-year-phase.md" },
    { label: "📄 Ryan 1-Pager", path: "plan/ryan-1-pager.md" },
    { label: "🔍 Ryan Deep Dive", path: "plan/ryan-deep-dive.md" },
  ],
  business: [
    { label: "Legal Strategy", path: "business/legal-strategy.md" },
    { label: "Ghana Legal Consultation", path: "business/yorke-legal-consultation-11-19-2025.md" },
  ],
  tech: [
    { label: "Platform Vision", path: "tech/tech-plan-2025-11-09.md" },
    { label: "GPS POC Build Plan", path: "research/tech/gps-poc-completion-report.md" },
  ],
  research: [
    { label: "TankerWala Model", path: "research/tankerwala-model.md" },
  ],
  crm: [],
  links: [],
  market: [
    { label: "User Research", path: "market/user-research-synthesis-2025-11-09.md" },
    { label: "Anna Meeting 2025-10-31", path: "market/anna-meeting-2025-10-31.md" },
    { label: "Anna Meeting 2025-11-07", path: "market/anna-meeting-2025-11-07.md" },
    { label: "Driver Validation Plan", path: "market/driver-validation-plan.md" },
  ],
  gtm: [],
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  // Get files for active tab
  const files = CONTENT_MAP[activeTab] || [];

  // Auto-select first file when tab changes
  useEffect(() => {
    setContent(""); // Clear content immediately when tab changes
    const currentFiles = CONTENT_MAP[activeTab] || [];
    if (currentFiles.length > 0) {
      setSelectedFile(currentFiles[0].path);
    } else {
      setSelectedFile("");
    }
  }, [activeTab]);

  const toggleTask = (taskKey: string) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskKey)) {
        newSet.delete(taskKey);
      } else {
        newSet.add(taskKey);
      }
      return newSet;
    });
  };

  // Load file content
  useEffect(() => {
    if (!selectedFile) {
      setContent("");
      return;
    }

    // Skip loading for component identifiers
    if (selectedFile.startsWith("__component:")) {
      setContent("");
      return;
    }

    const loadContent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/content?path=${selectedFile}`);
        const data = await res.json();
        setContent(data.content || "");
      } catch (error) {
        console.error("Error loading content:", error);
        setContent("Error loading content");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [selectedFile]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <h1 className="text-xl font-bold">WaterOS</h1>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Strategic Planning</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div key={activeTab} className="bg-white rounded-lg border p-4 sticky top-24">
              <h2 className="font-semibold mb-3 text-gray-700">
                {TABS.find((t) => t.id === activeTab)?.label} Sections
              </h2>
              <div className="space-y-1">
                {files.length === 0 ? (
                  <p className="text-sm text-gray-500">No content available</p>
                ) : (
                  files.map((file) => (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFile(file.path)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedFile === file.path
                          ? "bg-black text-white font-medium"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {file.label}
                    </button>
                  ))
                )}
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Special case: CRM component */}
            {activeTab === "crm" ? (
              <div className="bg-white rounded-lg border p-8">
                <CRM />
              </div>
            ) : /* Special case: Execution Plan Table */
            selectedFile === "__component:execution-plan__" ? (
              <div className="bg-white rounded-lg border p-8">
                <ExecutionPlan18M completedTasks={completedTasks} toggleTask={toggleTask} />
              </div>
            ) : /* Special case: By Month */
            selectedFile === "__component:by-month__" ? (
              <div className="bg-white rounded-lg border p-8">
                <ByMonth completedTasks={completedTasks} toggleTask={toggleTask} />
              </div>
            ) : /* Special case: User Research component */
            activeTab === "market" && selectedFile === "market/user-research-synthesis-2025-11-09.md" ? (
              <UserResearch />
            ) : (
              <div className="bg-white rounded-lg border p-8">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                  </div>
                ) : content ? (
                  <article className="prose prose-slate max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content}
                    </ReactMarkdown>
                  </article>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    {files.length === 0
                      ? "This section is coming soon"
                      : "Select a file to view its content"}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
