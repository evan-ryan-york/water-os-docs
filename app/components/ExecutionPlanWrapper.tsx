"use client";

import { useState } from "react";
import ExecutionPlan18M from "./ExecutionPlan18M";

export default function ExecutionPlanWrapper() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (taskKey: string) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskKey)) {
        newSet.delete(taskKey);
      } else {
        newSet.add(taskKey);
      }
      return newSet;
    });
  };

  return <ExecutionPlan18M completedTasks={completedTasks} toggleTask={toggleTask} />;
}
