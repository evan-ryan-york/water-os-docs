import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "app/lib/executionPlanData.json");

// GET - return current completed tasks
export async function GET() {
  try {
    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf8");
    const data = JSON.parse(fileContent);
    return NextResponse.json({ completedTasks: data.completedTasks || [] });
  } catch (error) {
    console.error("Error reading tasks:", error);
    return NextResponse.json({ completedTasks: [] });
  }
}

// POST - toggle a task's completion status
export async function POST(request: NextRequest) {
  try {
    const { taskKey } = await request.json();

    if (!taskKey || typeof taskKey !== "string") {
      return NextResponse.json({ error: "Invalid taskKey" }, { status: 400 });
    }

    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf8");
    const data = JSON.parse(fileContent);

    const completedTasks: string[] = data.completedTasks || [];
    const taskIndex = completedTasks.indexOf(taskKey);

    if (taskIndex === -1) {
      // Task not completed, mark it as completed
      completedTasks.push(taskKey);
    } else {
      // Task completed, remove it
      completedTasks.splice(taskIndex, 1);
    }

    data.completedTasks = completedTasks;

    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));

    return NextResponse.json({ completedTasks, toggled: taskKey });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
