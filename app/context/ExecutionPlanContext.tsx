"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import executionPlanData from "../lib/executionPlanData.json";
import { ExecutionPlanData, Domain, Month, generateMonths } from "../lib/executionPlanTypes";

interface ExecutionPlanContextType {
  // Data
  data: ExecutionPlanData;
  domains: Domain[];
  months: Month[];

  // Completed tasks state
  completedTasks: Set<string>;
  toggleTask: (taskKey: string) => void;
  isTaskCompleted: (taskKey: string) => boolean;

  // Helper to get tasks for a domain/month
  getTasksForCell: (domainKey: string, monthKey: string) => string[];
}

const ExecutionPlanContext = createContext<ExecutionPlanContextType | null>(null);

interface ExecutionPlanProviderProps {
  children: ReactNode;
}

export function ExecutionPlanProvider({ children }: ExecutionPlanProviderProps) {
  // Initialize from the JSON file's completedTasks array
  const data = executionPlanData as ExecutionPlanData;
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(
    new Set(data.completedTasks || [])
  );

  const domains = data.domains;
  const months = generateMonths();

  // Fetch latest completed tasks on mount (in case JSON was updated elsewhere)
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        if (data.completedTasks) {
          setCompletedTasks(new Set(data.completedTasks));
        }
      })
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  const toggleTask = useCallback(async (taskKey: string) => {
    // Optimistically update UI
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskKey)) {
        newSet.delete(taskKey);
      } else {
        newSet.add(taskKey);
      }
      return newSet;
    });

    // Persist to JSON file via API
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskKey }),
      });

      if (!res.ok) {
        console.error("Failed to persist task toggle");
        // Revert on error
        setCompletedTasks((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(taskKey)) {
            newSet.delete(taskKey);
          } else {
            newSet.add(taskKey);
          }
          return newSet;
        });
      }
    } catch (err) {
      console.error("Failed to persist task toggle:", err);
    }
  }, []);

  const isTaskCompleted = useCallback((taskKey: string) => {
    return completedTasks.has(taskKey);
  }, [completedTasks]);

  const getTasksForCell = useCallback((domainKey: string, monthKey: string): string[] => {
    const domainTasks = data.tasks[domainKey];
    if (!domainTasks) return [];
    return domainTasks[monthKey] || [];
  }, [data.tasks]);

  const value: ExecutionPlanContextType = {
    data,
    domains,
    months,
    completedTasks,
    toggleTask,
    isTaskCompleted,
    getTasksForCell,
  };

  return (
    <ExecutionPlanContext.Provider value={value}>
      {children}
    </ExecutionPlanContext.Provider>
  );
}

export function useExecutionPlan() {
  const context = useContext(ExecutionPlanContext);
  if (!context) {
    throw new Error("useExecutionPlan must be used within an ExecutionPlanProvider");
  }
  return context;
}
