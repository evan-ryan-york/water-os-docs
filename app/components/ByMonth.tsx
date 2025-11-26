"use client";

import React, { useState } from "react";
import { useExecutionPlan } from "../context/ExecutionPlanContext";
import { getTaskKey, getDomainColor } from "../lib/executionPlanTypes";

interface IndividualTask {
  domain: string;
  domainName: string;
  taskText: string;
  taskIndex: number;
  isTravel: boolean;
}

export default function ByMonth() {
  const { domains, months, toggleTask, isTaskCompleted, getTasksForCell } = useExecutionPlan();
  const [selectedMonth, setSelectedMonth] = useState(months[0].key);
  const [copied, setCopied] = useState(false);

  // Build individual tasks for the selected month
  const individualTasks: IndividualTask[] = [];
  domains.forEach((domain) => {
    const tasks = getTasksForCell(domain.key, selectedMonth);
    const isTravel = domain.key === "travel";

    if (isTravel && tasks.length > 0) {
      // For travel, just show the content as-is
      individualTasks.push({
        domain: domain.key,
        domainName: domain.name,
        taskText: tasks[0],
        taskIndex: 0,
        isTravel: true
      });
    } else {
      // For other domains, create individual task items
      tasks.forEach((taskText, idx) => {
        individualTasks.push({
          domain: domain.key,
          domainName: domain.name,
          taskText,
          taskIndex: idx,
          isTravel: false
        });
      });
    }
  });

  const selectedMonthDisplay = months.find(m => m.key === selectedMonth)?.display || "";

  const generateCopyText = () => {
    let text = `# Execution Plan - ${selectedMonthDisplay}\n\n`;

    // Group tasks by domain
    const tasksByDomain: { [domain: string]: IndividualTask[] } = {};
    individualTasks.forEach(task => {
      if (!tasksByDomain[task.domain]) {
        tasksByDomain[task.domain] = [];
      }
      tasksByDomain[task.domain].push(task);
    });

    // Format each domain's tasks
    domains.forEach(domain => {
      const domainTasks = tasksByDomain[domain.key];
      if (domainTasks && domainTasks.length > 0) {
        text += `## ${domain.name}\n`;
        if (domain.subtitle) text += `${domain.subtitle}\n`;
        text += '\n';

        domainTasks.forEach(task => {
          if (task.isTravel) {
            text += `${task.taskText}\n\n`;
          } else {
            text += `- ${task.taskText}\n`;
          }
        });
        text += '\n';
      }
    });

    return text;
  };

  const handleCopy = async () => {
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
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">By Month</h1>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Version: 1.0 | Last Updated: 2025-11-26</p>
      </div>

      {/* Month selector chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {months.map(month => (
          <button
            key={month.key}
            onClick={() => setSelectedMonth(month.key)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedMonth === month.key
                ? "bg-black text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {month.display}
          </button>
        ))}
      </div>

      {/* Selected month display */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{selectedMonthDisplay}</h2>
      </div>

      {/* Tasks for selected month in three columns */}
      {individualTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {individualTasks.map((task, idx) => {
            const taskKey = getTaskKey(task.domain, selectedMonth, task.taskIndex);
            const isCompleted = isTaskCompleted(taskKey);

            return (
              <div
                key={idx}
                className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition-all ${
                  isCompleted ? 'bg-green-50' : 'bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  {!task.isTravel && (
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={() => toggleTask(taskKey)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold border flex-shrink-0 ${getDomainColor(task.domain)}`}>
                        {task.domainName}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${
                      isCompleted ? 'line-through text-gray-400' : 'text-gray-700'
                    } ${task.isTravel ? 'font-medium' : ''}`}>
                      {task.taskText}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>No tasks scheduled for this month.</p>
        </div>
      )}
    </div>
  );
}
