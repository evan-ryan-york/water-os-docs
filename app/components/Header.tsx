"use client";

import Link from "next/link";
import { TABS, getFirstItem, type Tab } from "../lib/navigation";

interface HeaderProps {
  activeTab?: Tab;
}

export default function Header({ activeTab }: HeaderProps) {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-3">
          <h1 className="text-xl font-bold">WaterOS</h1>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">Strategic Planning</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {TABS.map((tab) => {
            const firstItem = getFirstItem(tab.id);
            const href = firstItem ? `/${tab.id}/${firstItem.slug}` : `/${tab.id}`;

            return (
              <Link
                key={tab.id}
                href={href}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
