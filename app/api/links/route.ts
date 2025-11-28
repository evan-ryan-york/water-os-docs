import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/app/lib/supabase";

interface LinkData {
  title: string;
  summary: string;
  bulletPoints: string[];
  url: string;
  dateAdded: string;
}

// GET - fetch all links
export async function GET() {
  try {
    const supabase = getSupabaseServerClient();

    const { data: links, error } = await supabase
      .from("links")
      .select("*")
      .order("date_added", { ascending: false });

    if (error) {
      console.error("Error fetching links:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform to match existing UI expectations
    const transformedLinks: LinkData[] = links.map((link) => ({
      title: link.title,
      summary: link.summary || "",
      bulletPoints: link.bullet_points || [],
      url: link.url,
      dateAdded: link.date_added,
    }));

    return NextResponse.json(transformedLinks);
  } catch (error) {
    console.error("Error reading links:", error);
    return NextResponse.json({ error: "Failed to load links" }, { status: 500 });
  }
}

// POST - create a new link
export async function POST(request: NextRequest) {
  try {
    const linkData: LinkData = await request.json();
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("links")
      .insert({
        title: linkData.title,
        summary: linkData.summary || null,
        bullet_points: linkData.bulletPoints || [],
        url: linkData.url,
        date_added: linkData.dateAdded || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving link:", error);
      // Check for unique constraint violation (duplicate URL)
      if (error.code === "23505") {
        return NextResponse.json({ error: "Link with this URL already exists" }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Error saving link:", error);
    return NextResponse.json({ error: "Failed to save link" }, { status: 500 });
  }
}

// PUT - update an existing link
export async function PUT(request: NextRequest) {
  try {
    const { id, ...linkData } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing link id" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    const updateData: Record<string, unknown> = {};
    if (linkData.title !== undefined) updateData.title = linkData.title;
    if (linkData.summary !== undefined) updateData.summary = linkData.summary;
    if (linkData.bulletPoints !== undefined) updateData.bullet_points = linkData.bulletPoints;
    if (linkData.url !== undefined) updateData.url = linkData.url;

    const { error } = await supabase
      .from("links")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.error("Error updating link:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json({ error: "Failed to update link" }, { status: 500 });
  }
}

// DELETE - delete a link by URL (for backward compatibility) or by ID
export async function DELETE(request: NextRequest) {
  try {
    const { url, id } = await request.json();
    const supabase = getSupabaseServerClient();

    let error;

    if (id) {
      // Delete by ID (preferred)
      const result = await supabase.from("links").delete().eq("id", id);
      error = result.error;
    } else if (url) {
      // Delete by URL (backward compatibility)
      const result = await supabase.from("links").delete().eq("url", url);
      error = result.error;
    } else {
      return NextResponse.json({ error: "Missing url or id" }, { status: 400 });
    }

    if (error) {
      console.error("Error deleting link:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json({ error: "Failed to delete link" }, { status: 500 });
  }
}
