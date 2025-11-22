import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path") || "";

  try {
    const fullPath = path.join(process.cwd(), "wateros", filePath);

    // Security check: ensure path is within wateros directory
    const resolvedPath = path.resolve(fullPath);
    const waterosPath = path.resolve(process.cwd(), "wateros");

    if (!resolvedPath.startsWith(waterosPath)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 403 });
    }

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const content = fs.readFileSync(fullPath, "utf-8");
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
