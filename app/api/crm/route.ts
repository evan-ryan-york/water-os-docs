import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, CrmOrganization, CrmPerson, CrmNote } from "@/app/lib/supabase";

// Types for CRM data with relationships
interface PersonOrganizationRelation {
  organization_id: string;
  role: string | null;
  is_primary: boolean;
  organization: CrmOrganization | null;
}

interface PersonWithOrganizations extends CrmPerson {
  organizations: PersonOrganizationRelation[];
}

// GET - fetch CRM data by type
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  if (!type || !["people", "organizations", "notes"].includes(type)) {
    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();

    if (type === "people") {
      // Fetch people with their organization relationships
      const { data: people, error } = await supabase
        .from("crm_people")
        .select(`
          *,
          organizations:crm_people_organizations(
            organization_id,
            role,
            is_primary,
            organization:crm_organizations(*)
          )
        `)
        .order("last_name")
        .order("first_name");

      if (error) {
        console.error("Error fetching people:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Transform to match existing UI expectations
      const transformedPeople = (people as unknown as PersonWithOrganizations[]).map((person) => {
        const primaryOrg = person.organizations?.find((o) => o.is_primary);
        return {
          id: person.id,
          firstName: person.first_name,
          lastName: person.last_name,
          email: person.email,
          phone: person.phone,
          avatar: person.avatar_url || "",
          organizationId: primaryOrg?.organization_id || null,
          jobTitle: person.job_title,
          description: person.description,
          tags: person.tags || [],
          dateAdded: person.date_added,
          lastContacted: person.last_contacted,
          // Include all organizations for the new many-to-many relationship
          organizations: person.organizations?.map((o) => ({
            organizationId: o.organization_id,
            role: o.role,
            isPrimary: o.is_primary,
            organization: o.organization,
          })) || [],
        };
      });

      return NextResponse.json({ data: transformedPeople });
    }

    if (type === "organizations") {
      const { data: organizations, error } = await supabase
        .from("crm_organizations")
        .select("*")
        .order("name");

      if (error) {
        console.error("Error fetching organizations:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Transform to match existing UI expectations
      const transformedOrgs = (organizations as unknown as CrmOrganization[]).map((org) => ({
        id: org.id,
        name: org.name,
        address: org.address,
        email: org.email,
        phone: org.phone,
        avatar: org.avatar_url || "",
        businessType: org.business_type,
        tags: org.tags || [],
        dateAdded: org.date_added,
      }));

      return NextResponse.json({ data: transformedOrgs });
    }

    if (type === "notes") {
      const { data: notes, error } = await supabase
        .from("crm_notes")
        .select("*")
        .order("timestamp", { ascending: false });

      if (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Transform to match existing UI expectations
      const transformedNotes = (notes as unknown as CrmNote[]).map((note) => ({
        id: note.id,
        entityId: note.entity_id,
        entityType: note.entity_type,
        content: note.content,
        timestamp: note.timestamp,
      }));

      return NextResponse.json({ data: transformedNotes });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Error reading CRM data:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

// POST - create or update CRM data
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  const action = searchParams.get("action") || "upsert"; // 'upsert' or 'create'

  if (!type || !["people", "organizations", "notes", "people_organizations"].includes(type)) {
    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const supabase = getSupabaseServerClient();

    if (type === "people") {
      const person = body.data;
      const dbPerson = {
        id: person.id || undefined,
        first_name: person.firstName,
        last_name: person.lastName,
        email: person.email,
        phone: person.phone,
        avatar_url: person.avatar || null,
        job_title: person.jobTitle,
        description: person.description,
        tags: person.tags || [],
        last_contacted: person.lastContacted || null,
      };

      let result;
      if (person.id && action === "upsert") {
        // Update existing
        const { data, error } = await supabase
          .from("crm_people")
          .update(dbPerson)
          .eq("id", person.id)
          .select()
          .single();
        result = { data, error };
      } else {
        // Create new
        const { data, error } = await supabase
          .from("crm_people")
          .insert(dbPerson)
          .select()
          .single();
        result = { data, error };
      }

      if (result.error) {
        console.error("Error saving person:", result.error);
        return NextResponse.json({ error: result.error.message }, { status: 500 });
      }

      // Handle organization relationships if provided
      if (person.organizations && result.data) {
        // Delete existing relationships
        await supabase
          .from("crm_people_organizations")
          .delete()
          .eq("person_id", result.data.id);

        // Insert new relationships
        if (person.organizations.length > 0) {
          const relationships = person.organizations.map((org: { organizationId: string; role?: string; isPrimary?: boolean }) => ({
            person_id: result.data.id,
            organization_id: org.organizationId,
            role: org.role || null,
            is_primary: org.isPrimary || false,
          }));

          await supabase.from("crm_people_organizations").insert(relationships);
        }
      }

      return NextResponse.json({ success: true, data: result.data });
    }

    if (type === "organizations") {
      const org = body.data;
      const dbOrg = {
        id: org.id || undefined,
        name: org.name,
        address: org.address,
        email: org.email,
        phone: org.phone,
        avatar_url: org.avatar || null,
        business_type: org.businessType,
        tags: org.tags || [],
      };

      let result;
      if (org.id && action === "upsert") {
        const { data, error } = await supabase
          .from("crm_organizations")
          .update(dbOrg)
          .eq("id", org.id)
          .select()
          .single();
        result = { data, error };
      } else {
        const { data, error } = await supabase
          .from("crm_organizations")
          .insert(dbOrg)
          .select()
          .single();
        result = { data, error };
      }

      if (result.error) {
        console.error("Error saving organization:", result.error);
        return NextResponse.json({ error: result.error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, data: result.data });
    }

    if (type === "notes") {
      const note = body.data;
      const dbNote = {
        id: note.id || undefined,
        entity_id: note.entityId,
        entity_type: note.entityType,
        content: note.content,
        timestamp: note.timestamp || new Date().toISOString(),
      };

      let result;
      if (note.id && action === "upsert") {
        const { data, error } = await supabase
          .from("crm_notes")
          .update(dbNote)
          .eq("id", note.id)
          .select()
          .single();
        result = { data, error };
      } else {
        const { data, error } = await supabase
          .from("crm_notes")
          .insert(dbNote)
          .select()
          .single();
        result = { data, error };
      }

      if (result.error) {
        console.error("Error saving note:", result.error);
        return NextResponse.json({ error: result.error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, data: result.data });
    }

    if (type === "people_organizations") {
      // Manage person-organization relationships directly
      const { personId, organizationId, role, isPrimary } = body.data;

      const { data, error } = await supabase
        .from("crm_people_organizations")
        .upsert({
          person_id: personId,
          organization_id: organizationId,
          role: role || null,
          is_primary: isPrimary || false,
        })
        .select()
        .single();

      if (error) {
        console.error("Error saving relationship:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Error writing CRM data:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}

// DELETE - delete CRM data
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  if (!type || !["people", "organizations", "notes", "people_organizations"].includes(type)) {
    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
  }

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();

    const tableMap: Record<string, string> = {
      people: "crm_people",
      organizations: "crm_organizations",
      notes: "crm_notes",
      people_organizations: "crm_people_organizations",
    };

    const { error } = await supabase.from(tableMap[type]).delete().eq("id", id);

    if (error) {
      console.error(`Error deleting ${type}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting CRM data:", error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}
