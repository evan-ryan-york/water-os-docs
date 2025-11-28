import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/app/lib/supabase";

// POST - upload an avatar image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const entityType = formData.get("entityType") as string | null; // 'person' or 'organization'
    const entityId = formData.get("entityId") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!entityType || !["person", "organization"].includes(entityType)) {
      return NextResponse.json({ error: "Invalid entityType" }, { status: 400 });
    }

    if (!entityId) {
      return NextResponse.json({ error: "No entityId provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    // Generate unique filename
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${entityType}/${entityId}.${fileExt}`;

    // Convert File to ArrayBuffer then to Buffer for upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Delete existing avatar if any (ignore errors if file doesn't exist)
    await supabase.storage
      .from("crm-avatars")
      .remove([`${entityType}/${entityId}.jpg`, `${entityType}/${entityId}.png`, `${entityType}/${entityId}.gif`, `${entityType}/${entityId}.webp`]);

    // Upload new avatar
    const { data, error } = await supabase.storage
      .from("crm-avatars")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Error uploading avatar:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from("crm-avatars")
      .getPublicUrl(data.path);

    // Update the entity's avatar_url in the database
    const table = entityType === "person" ? "crm_people" : "crm_organizations";
    const { error: updateError } = await supabase
      .from(table)
      .update({ avatar_url: urlData.publicUrl })
      .eq("id", entityId);

    if (updateError) {
      console.error("Error updating avatar URL:", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
    });
  } catch (error) {
    console.error("Error in avatar upload:", error);
    return NextResponse.json({ error: "Failed to upload avatar" }, { status: 500 });
  }
}

// DELETE - remove an avatar
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const entityType = searchParams.get("entityType");
  const entityId = searchParams.get("entityId");

  if (!entityType || !["person", "organization"].includes(entityType)) {
    return NextResponse.json({ error: "Invalid entityType" }, { status: 400 });
  }

  if (!entityId) {
    return NextResponse.json({ error: "No entityId provided" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();

    // Delete all possible avatar files for this entity
    await supabase.storage
      .from("crm-avatars")
      .remove([
        `${entityType}/${entityId}.jpg`,
        `${entityType}/${entityId}.png`,
        `${entityType}/${entityId}.gif`,
        `${entityType}/${entityId}.webp`,
      ]);

    // Clear the avatar_url in the database
    const table = entityType === "person" ? "crm_people" : "crm_organizations";
    const { error: updateError } = await supabase
      .from(table)
      .update({ avatar_url: null })
      .eq("id", entityId);

    if (updateError) {
      console.error("Error clearing avatar URL:", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting avatar:", error);
    return NextResponse.json({ error: "Failed to delete avatar" }, { status: 500 });
  }
}
