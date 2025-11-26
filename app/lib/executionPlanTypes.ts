// Shared types for Execution Plan components

export interface Domain {
  key: string;
  name: string;
  subtitle: string;
}

export interface Month {
  key: string;
  display: string;
}

export interface ExecutionPlanData {
  metadata: {
    version: string;
    lastUpdated: string;
    startDate: string;
    endDate: string;
    totalMonths: number;
  };
  completedTasks: string[];
  domains: Domain[];
  tasks: {
    [domainKey: string]: {
      [monthKey: string]: string[];
    };
  };
}

// Generate task key for consistent identification across components
export function getTaskKey(domain: string, month: string, taskIndex: number): string {
  return `${domain}-${month}-${taskIndex}`;
}

// Generate months array from start to end date
export function generateMonths(): Month[] {
  const months: Month[] = [];
  const startDate = new Date(2025, 10, 1); // November 2025 (month is 0-indexed)

  for (let i = 0; i < 18; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    months.push({
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      display: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });
  }

  return months;
}

// Domain color mapping for By Month view
export function getDomainColor(domainKey: string): string {
  const colors: { [key: string]: string } = {
    travel: "bg-green-100 text-green-800 border-green-300",
    market: "bg-blue-100 text-blue-800 border-blue-300",
    gtm: "bg-purple-100 text-purple-800 border-purple-300",
    technical: "bg-orange-100 text-orange-800 border-orange-300",
    hiring: "bg-pink-100 text-pink-800 border-pink-300",
    business: "bg-yellow-100 text-yellow-800 border-yellow-300",
    legal: "bg-red-100 text-red-800 border-red-300",
    marketing: "bg-indigo-100 text-indigo-800 border-indigo-300"
  };
  return colors[domainKey] || "bg-gray-100 text-gray-800 border-gray-300";
}
