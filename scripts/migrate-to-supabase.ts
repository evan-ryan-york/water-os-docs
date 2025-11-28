/**
 * Migration Script: JSON Files → Supabase
 *
 * This script migrates existing data from local JSON files to Supabase.
 * Run with: npx tsx scripts/migrate-to-supabase.ts
 *
 * Prerequisites:
 * 1. Create Supabase project and run the migration SQL
 * 2. Set environment variables in .env:
 *    - NEXT_PUBLIC_SUPABASE_URL
 *    - NEXT_PUBLIC_SUPABASE_ANON_KEY
 * 3. Install tsx: pnpm add -D tsx
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// Load environment variables
import * as dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use service role key for migrations (bypasses RLS)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error("   Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Paths to JSON data
const DATA_DIR = path.join(process.cwd(), "wateros");
const EXECUTION_PLAN_PATH = path.join(process.cwd(), "app/lib/executionPlanData.json");

interface ExecutionPlanData {
  metadata: {
    version: string;
    lastUpdated: string;
    startDate: string;
    endDate: string;
    totalMonths: number;
  };
  completedTasks: string[];
  domains: { key: string; name: string; subtitle: string }[];
  tasks: {
    [domainKey: string]: {
      [monthKey: string]: string[];
    };
  };
}

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  organizationId: string;
  jobTitle: string;
  description: string;
  tags: string[];
  dateAdded: string;
  lastContacted: string;
}

interface Organization {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  avatar?: string;
  primaryContactId?: string;
  businessType: string;
  tags: string[];
  dateAdded: string;
}

interface Note {
  id: string;
  entityId: string;
  entityType: "person" | "organization";
  content: string;
  timestamp: string;
}

interface LinkData {
  title: string;
  summary: string;
  bulletPoints: string[];
  url: string;
  dateAdded: string;
}

async function migrateExecutionPlan() {
  console.log("\n📋 Migrating Execution Plan tasks...");

  try {
    const fileContent = fs.readFileSync(EXECUTION_PLAN_PATH, "utf8");
    const data: ExecutionPlanData = JSON.parse(fileContent);

    const completedSet = new Set(data.completedTasks);
    const tasksToInsert: {
      name: string;
      domain: string;
      month: string;
      task_index: number;
      is_completed: boolean;
      completed_at: string | null;
    }[] = [];

    // Flatten tasks structure
    for (const [domain, months] of Object.entries(data.tasks)) {
      for (const [month, taskList] of Object.entries(months)) {
        taskList.forEach((taskName, index) => {
          const taskKey = `${domain}-${month}-${index}`;
          const isCompleted = completedSet.has(taskKey);

          tasksToInsert.push({
            name: taskName,
            domain,
            month,
            task_index: index,
            is_completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null,
          });
        });
      }
    }

    console.log(`   Found ${tasksToInsert.length} tasks to migrate`);

    // Insert in batches of 100
    const batchSize = 100;
    for (let i = 0; i < tasksToInsert.length; i += batchSize) {
      const batch = tasksToInsert.slice(i, i + batchSize);
      const { error } = await supabase.from("tasks").insert(batch);

      if (error) {
        console.error(`   ❌ Error inserting tasks batch ${i / batchSize + 1}:`, error.message);
      } else {
        console.log(`   ✓ Inserted batch ${i / batchSize + 1} (${batch.length} tasks)`);
      }
    }

    console.log(`   ✅ Execution Plan migration complete`);
  } catch (error) {
    console.error("   ❌ Failed to migrate Execution Plan:", error);
  }
}

async function migrateCRM() {
  console.log("\n👥 Migrating CRM data...");

  try {
    // Migrate Organizations first (people reference them)
    const orgsPath = path.join(DATA_DIR, "crm/organizations.json");
    const orgsContent = fs.readFileSync(orgsPath, "utf8");
    const organizations: Organization[] = JSON.parse(orgsContent);

    console.log(`   Found ${organizations.length} organizations`);

    // Create a mapping from old IDs to new UUIDs
    const orgIdMap = new Map<string, string>();

    for (const org of organizations) {
      const { data, error } = await supabase
        .from("crm_organizations")
        .insert({
          name: org.name,
          address: org.address || null,
          email: org.email || null,
          phone: org.phone || null,
          avatar_url: org.avatar || null,
          business_type: org.businessType || null,
          tags: org.tags || [],
          date_added: org.dateAdded || new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error(`   ❌ Error inserting organization "${org.name}":`, error.message);
      } else if (data) {
        orgIdMap.set(org.id, data.id);
        console.log(`   ✓ Migrated organization: ${org.name}`);
      }
    }

    // Migrate People
    const peoplePath = path.join(DATA_DIR, "crm/people.json");
    const peopleContent = fs.readFileSync(peoplePath, "utf8");
    const people: Person[] = JSON.parse(peopleContent);

    console.log(`   Found ${people.length} people`);

    const personIdMap = new Map<string, string>();

    for (const person of people) {
      const { data, error } = await supabase
        .from("crm_people")
        .insert({
          first_name: person.firstName || null,
          last_name: person.lastName || null,
          email: person.email || null,
          phone: person.phone || null,
          avatar_url: person.avatar || null,
          job_title: person.jobTitle || null,
          description: person.description || null,
          tags: person.tags || [],
          date_added: person.dateAdded || new Date().toISOString(),
          last_contacted: person.lastContacted || null,
        })
        .select()
        .single();

      if (error) {
        console.error(`   ❌ Error inserting person "${person.firstName} ${person.lastName}":`, error.message);
      } else if (data) {
        personIdMap.set(person.id, data.id);
        console.log(`   ✓ Migrated person: ${person.firstName} ${person.lastName}`);

        // Create person-organization relationship if exists
        if (person.organizationId && orgIdMap.has(person.organizationId)) {
          const newOrgId = orgIdMap.get(person.organizationId)!;
          const { error: relError } = await supabase.from("crm_people_organizations").insert({
            person_id: data.id,
            organization_id: newOrgId,
            is_primary: true,
          });

          if (relError) {
            console.error(`   ❌ Error creating person-org relationship:`, relError.message);
          }
        }
      }
    }

    // Migrate Notes
    const notesPath = path.join(DATA_DIR, "crm/notes.json");
    const notesContent = fs.readFileSync(notesPath, "utf8");
    const notes: Note[] = JSON.parse(notesContent);

    console.log(`   Found ${notes.length} notes`);

    for (const note of notes) {
      // Map old entity ID to new UUID
      let newEntityId: string | undefined;
      if (note.entityType === "person") {
        newEntityId = personIdMap.get(note.entityId);
      } else if (note.entityType === "organization") {
        newEntityId = orgIdMap.get(note.entityId);
      }

      if (!newEntityId) {
        console.warn(`   ⚠ Skipping note ${note.id}: entity not found`);
        continue;
      }

      const { error } = await supabase.from("crm_notes").insert({
        entity_id: newEntityId,
        entity_type: note.entityType,
        content: note.content,
        timestamp: note.timestamp || new Date().toISOString(),
      });

      if (error) {
        console.error(`   ❌ Error inserting note:`, error.message);
      } else {
        console.log(`   ✓ Migrated note for ${note.entityType}`);
      }
    }

    console.log(`   ✅ CRM migration complete`);
  } catch (error) {
    console.error("   ❌ Failed to migrate CRM:", error);
  }
}

async function migrateLinks() {
  console.log("\n🔗 Migrating Links...");

  try {
    const linksDir = path.join(DATA_DIR, "links");
    const files = fs.readdirSync(linksDir).filter((f) => f.endsWith(".json"));

    console.log(`   Found ${files.length} link files`);

    for (const file of files) {
      const filePath = path.join(linksDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      const link: LinkData = JSON.parse(content);

      const { error } = await supabase.from("links").insert({
        title: link.title,
        summary: link.summary || null,
        bullet_points: link.bulletPoints || [],
        url: link.url,
        date_added: link.dateAdded || new Date().toISOString(),
      });

      if (error) {
        if (error.code === "23505") {
          console.warn(`   ⚠ Skipping duplicate URL: ${link.url}`);
        } else {
          console.error(`   ❌ Error inserting link "${link.title}":`, error.message);
        }
      } else {
        console.log(`   ✓ Migrated link: ${link.title}`);
      }
    }

    console.log(`   ✅ Links migration complete`);
  } catch (error) {
    console.error("   ❌ Failed to migrate Links:", error);
  }
}

async function main() {
  console.log("🚀 Starting migration to Supabase...");
  console.log(`   URL: ${supabaseUrl}`);

  // Test connection
  const { error: testError } = await supabase.from("tasks").select("count").limit(1);
  if (testError) {
    console.error("❌ Failed to connect to Supabase:", testError.message);
    console.error("   Make sure you've run the migration SQL first.");
    process.exit(1);
  }

  console.log("   ✓ Connected to Supabase");

  await migrateExecutionPlan();
  await migrateCRM();
  await migrateLinks();

  console.log("\n🎉 Migration complete!");
  console.log("\nNext steps:");
  console.log("1. Verify data in Supabase dashboard");
  console.log("2. Test the app locally with: pnpm dev");
  console.log("3. Set up a user in Supabase Auth and assign them the 'editor' role");
}

main().catch(console.error);
