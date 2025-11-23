"use client";

import { useState } from "react";
import ByMonth from "./ByMonth";

export default function ByMonthWrapper() {
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

  return <ByMonth completedTasks={completedTasks} toggleTask={toggleTask} />;
}
