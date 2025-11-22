"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Tab = "plan" | "bigpicture" | "business" | "tech" | "research" | "crm" | "links" | "market" | "gtm";

const TABS: { id: Tab; label: string; path: string }[] = [
  { id: "plan", label: "PLAN", path: "plan" },
  { id: "bigpicture", label: "BIG PICTURE", path: "plan" },
  { id: "business", label: "BUSINESS", path: "business" },
  { id: "tech", label: "TECH", path: "tech" },
  { id: "research", label: "RESEARCH", path: "research" },
  { id: "crm", label: "CRM", path: "crm" },
  { id: "links", label: "LINKS", path: "links" },
  { id: "market", label: "MARKET", path: "market" },
  { id: "gtm", label: "GTM", path: "gtm" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("bigpicture");
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Load files for the active tab
  useEffect(() => {
    const loadFiles = async () => {
      const currentTab = TABS.find((t) => t.id === activeTab);
      if (!currentTab) return;

      try {
        const res = await fetch(`/api/files?path=${currentTab.path}`);
        const data = await res.json();
        setFiles(data.files || []);

        // Auto-select high-level-vision.md for bigpicture tab
        if (activeTab === "bigpicture" && data.files?.includes("high-level-vision.md")) {
          setSelectedFile("high-level-vision.md");
        } else if (data.files?.length > 0) {
          setSelectedFile(data.files[0]);
        }
      } catch (error) {
        console.error("Error loading files:", error);
        setFiles([]);
      }
    };

    loadFiles();
  }, [activeTab]);

  // Load file content
  useEffect(() => {
    if (!selectedFile) {
      setContent("");
      return;
    }

    const loadContent = async () => {
      const currentTab = TABS.find((t) => t.id === activeTab);
      if (!currentTab) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/content?path=${currentTab.path}/${selectedFile}`);
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
  }, [selectedFile, activeTab]);

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
            <div className="bg-white rounded-lg border p-4 sticky top-24">
              <h2 className="font-semibold mb-3 text-gray-700">Files</h2>
              <div className="space-y-1">
                {files.length === 0 ? (
                  <p className="text-sm text-gray-500">No files</p>
                ) : (
                  files.map((file) => (
                    <button
                      key={file}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedFile === file
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {file.replace(".md", "")}
                    </button>
                  ))
                )}
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg border p-8">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-4 text-gray-600">Loading...</p>
                </div>
              ) : content ? (
                <article className="markdown prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                  </ReactMarkdown>
                </article>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  Select a file to view its content
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
