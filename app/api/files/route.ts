import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dirPath = searchParams.get("path") || "";

  try {
    const fullPath = path.join(process.cwd(), "wateros", dirPath);

    // Check if directory exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ files: [] });
    }

    const files = fs.readdirSync(fullPath)
      .filter(file => file.endsWith(".md"))
      .sort();

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.json({ files: [], error: "Failed to read directory" }, { status: 500 });
  }
}
