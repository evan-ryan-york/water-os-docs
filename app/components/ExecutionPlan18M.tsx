"use client";

import React, { useState } from "react";
import { useExecutionPlan } from "../context/ExecutionPlanContext";
import { getTaskKey } from "../lib/executionPlanTypes";

export default function ExecutionPlan18M() {
  const { domains, months, toggleTask, isTaskCompleted, getTasksForCell } = useExecutionPlan();
  const [copied, setCopied] = useState(false);

  const generateCopyText = () => {
    let text = "# 18-Month Execution Plan: November 2025 - April 2027\n\n";
    text += "This execution plan outlines the strategy for launching Water OS, a three-sided marketplace for bulk water delivery in Accra, Ghana.\n\n";
    text += "---\n\n";

    // Group by month for chronological flow
    months.forEach(month => {
      text += `## ${month.display}\n\n`;

      domains.forEach(domain => {
        const tasks = getTasksForCell(domain.key, month.key);

        if (tasks.length > 0) {
          text += `### ${domain.name}`;
          if (domain.subtitle) {
            text += ` ${domain.subtitle}`;
          }
          text += `\n\n`;

          if (domain.key === "travel") {
            text += `${tasks[0]}\n\n`;
          } else {
            tasks.forEach(task => {
              text += `• ${task}\n`;
            });
            text += "\n";
          }
        }
      });

      text += "---\n\n";
    });

    return text;
  };

  const copyToClipboard = async () => {
    try {
      const text = generateCopyText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative" style={{ width: '100%', minWidth: 0 }}>
      <button
        onClick={copyToClipboard}
        className="absolute top-0 right-0 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition-colors z-10"
        title="Copy to clipboard"
      >
        {copied ? "✓ Copied!" : "📋 Copy Plan"}
      </button>

      <div className="pt-12" style={{ width: '100%', minWidth: 0 }}>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Execution Plan Table</h1>
        <p className="text-sm text-gray-500 mb-4">Version: 1.0 | Last Updated: 2025-11-26</p>
        <p className="text-gray-600 mb-6">November 2025 - April 2027</p>

        {/* Matrix Table */}
        <div className="overflow-auto max-h-[calc(100vh-200px)] border rounded-lg" style={{ width: '100%', maxWidth: '100%' }}>
          <table className="border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border-r-2 border-gray-300 p-3 text-left font-bold shadow-[2px_2px_4px_rgba(0,0,0,0.1)]" style={{ position: 'sticky', left: 0, top: 0, zIndex: 30, backgroundColor: 'rgb(249 250 251)', width: '60px', minWidth: '60px' }}>
                  Domain
                </th>
                {months.map(month => (
                  <th key={month.key} className="border-l border-gray-300 p-3 text-xs font-semibold text-gray-700" style={{ position: 'sticky', top: 0, zIndex: 20, backgroundColor: 'rgb(249 250 251)', minWidth: '280px', width: '280px' }}>
                    {month.display}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {domains.map((domain, idx) => (
                <tr key={domain.key} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border-r-2 border-gray-300 p-2 font-semibold text-xs align-top shadow-[2px_0_4px_rgba(0,0,0,0.1)]" style={{ position: 'sticky', left: 0, zIndex: 10, backgroundColor: 'rgb(243 244 246)', width: '60px', minWidth: '60px' }}>
                    <div className="writing-mode-vertical transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
                      {domain.name}
                    </div>
                  </td>
                  {months.map(month => {
                    const tasks = getTasksForCell(domain.key, month.key);
                    const isTravel = domain.key === "travel";
                    const isOnGround = isTravel && tasks.length > 0 && tasks[0].includes("On-the-Ground");
                    const cellBgColor = isOnGround ? "bg-green-100" : "bg-white";

                    return (
                      <td
                        key={`${domain.key}-${month.key}`}
                        className={`border border-gray-300 p-3 ${cellBgColor} transition-all align-top`}
                      >
                        <div className="min-h-[100px] space-y-2">
                          {tasks.length > 0 ? (
                            tasks.map((task, taskIdx) => {
                              const taskKey = getTaskKey(domain.key, month.key, taskIdx);
                              const isCompleted = isTaskCompleted(taskKey);

                              // Travel row: no checkboxes, just display the text
                              if (isTravel) {
                                return (
                                  <div key={taskIdx} className="text-sm font-medium text-gray-800">
                                    {task}
                                  </div>
                                );
                              }

                              // Other rows: show checkboxes
                              return (
                                <div
                                  key={taskIdx}
                                  className={`task-card border rounded-lg p-3 shadow-sm hover:shadow-md transition-all border-gray-200 ${
                                    isCompleted ? 'bg-green-50' : 'bg-white'
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    <input
                                      type="checkbox"
                                      checked={isCompleted}
                                      onChange={() => toggleTask(taskKey)}
                                      className="task-checkbox mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div className={`flex-1 text-xs leading-relaxed ${isCompleted ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                      {task}
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : null}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
