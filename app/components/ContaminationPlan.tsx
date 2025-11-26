"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CopyButton from "./CopyButton";

type ContaminationTab = "sop" | "sopTech" | "assurance" | "transparency";

interface ContaminationPlanProps {
  sopContent: string;
  sopTechContent: string;
  assuranceContent: string;
  transparencyContent: string;
}

export default function ContaminationPlan({
  sopContent,
  sopTechContent,
  assuranceContent,
  transparencyContent,
}: ContaminationPlanProps) {
  const [activeTab, setActiveTab] = useState<ContaminationTab>("sop");

  const getActiveContent = () => {
    switch (activeTab) {
      case "sop":
        return sopContent;
      case "sopTech":
        return sopTechContent;
      case "assurance":
        return assuranceContent;
      case "transparency":
        return transparencyContent;
    }
  };

  const content = getActiveContent();

  return (
    <div>
      {/* Sub-tab navigation */}
      <div className="mb-6 border-b">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("sop")}
            className={`px-4 py-2 rounded-t transition-colors ${
              activeTab === "sop"
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Contamination SOP
          </button>
          <button
            onClick={() => setActiveTab("sopTech")}
            className={`px-4 py-2 rounded-t transition-colors ${
              activeTab === "sopTech"
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            SOP Tech Requirements
          </button>
          <button
            onClick={() => setActiveTab("assurance")}
            className={`px-4 py-2 rounded-t transition-colors ${
              activeTab === "assurance"
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Assurance Protocol
          </button>
          <button
            onClick={() => setActiveTab("transparency")}
            className={`px-4 py-2 rounded-t transition-colors ${
              activeTab === "transparency"
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Transparency Plan
          </button>
        </div>
      </div>

      {/* Content area with copy button */}
      <div className="flex justify-end mb-4">
        <CopyButton content={content} />
      </div>
      <article className="prose prose-slate max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
