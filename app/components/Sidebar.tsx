"use client";

import Link from "next/link";
import { CONTENT_MAP, TABS, type Tab } from "../lib/navigation";

interface SidebarProps {
  activeTab: Tab;
  currentSlug?: string;
}

export default function Sidebar({ activeTab, currentSlug }: SidebarProps) {
  const files = CONTENT_MAP[activeTab] || [];
  const tabLabel = TABS.find((t) => t.id === activeTab)?.label;

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="bg-white rounded-lg border p-4 sticky top-24">
        <h2 className="font-semibold mb-3 text-gray-700">
          {tabLabel} Sections
        </h2>
        <div className="space-y-1">
          {files.length === 0 ? (
            <p className="text-sm text-gray-500">No content available</p>
          ) : (
            files.map((file) => (
              <Link
                key={file.slug}
                href={`/${activeTab}/${file.slug}`}
                className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  currentSlug === file.slug
                    ? "bg-black text-white font-medium"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                {file.label}
              </Link>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
