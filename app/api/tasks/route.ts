import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getTaskKeyFromTask } from "@/app/lib/supabase";

// GET - return all tasks with completion status
export async function GET() {
  try {
    const supabase = getSupabaseServerClient();

    const { data: tasks, error } = await supabase
      .from("tasks")
      .select("*")
      .order("domain")
      .order("month")
      .order("task_index");

    if (error) {
      console.error("Error fetching tasks:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return completed task keys for backward compatibility with existing UI
    const completedTasks = tasks
      .filter((task) => task.is_completed)
      .map((task) => getTaskKeyFromTask(task));

    return NextResponse.json({ completedTasks, tasks });
  } catch (error) {
    console.error("Error reading tasks:", error);
    return NextResponse.json({ completedTasks: [], tasks: [] });
  }
}

// POST - toggle a task's completion status
export async function POST(request: NextRequest) {
  try {
    const { taskKey } = await request.json();

    if (!taskKey || typeof taskKey !== "string") {
      return NextResponse.json({ error: "Invalid taskKey" }, { status: 400 });
    }

    // Parse task key: "domain-YYYY-MM-index"
    const match = taskKey.match(/^(.+)-(\d{4}-\d{2})-(\d+)$/);
    if (!match) {
      return NextResponse.json({ error: "Invalid taskKey format" }, { status: 400 });
    }

    const [, domain, month, indexStr] = match;
    const taskIndex = parseInt(indexStr, 10);

    const supabase = getSupabaseServerClient();

    // Find the task
    const { data: task, error: fetchError } = await supabase
      .from("tasks")
      .select("*")
      .eq("domain", domain)
      .eq("month", month)
      .eq("task_index", taskIndex)
      .single();

    if (fetchError || !task) {
      console.error("Task not found:", fetchError);
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Toggle completion status
    const newCompletedStatus = !task.is_completed;
    const { error: updateError } = await supabase
      .from("tasks")
      .update({
        is_completed: newCompletedStatus,
        completed_at: newCompletedStatus ? new Date().toISOString() : null,
      })
      .eq("id", task.id);

    if (updateError) {
      console.error("Error updating task:", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Fetch updated completed tasks list
    const { data: allTasks } = await supabase
      .from("tasks")
      .select("*")
      .eq("is_completed", true);

    const completedTasks = (allTasks || []).map((t) => getTaskKeyFromTask(t));

    return NextResponse.json({ completedTasks, toggled: taskKey });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

// PUT - update a task's name
export async function PUT(request: NextRequest) {
  try {
    const { taskKey, name } = await request.json();

    if (!taskKey || typeof taskKey !== "string") {
      return NextResponse.json({ error: "Invalid taskKey" }, { status: 400 });
    }

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    // Parse task key
    const match = taskKey.match(/^(.+)-(\d{4}-\d{2})-(\d+)$/);
    if (!match) {
      return NextResponse.json({ error: "Invalid taskKey format" }, { status: 400 });
    }

    const [, domain, month, indexStr] = match;
    const taskIndex = parseInt(indexStr, 10);

    const supabase = getSupabaseServerClient();

    const { error: updateError } = await supabase
      .from("tasks")
      .update({ name: name.trim() })
      .eq("domain", domain)
      .eq("month", month)
      .eq("task_index", taskIndex);

    if (updateError) {
      console.error("Error updating task name:", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, taskKey, name: name.trim() });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
