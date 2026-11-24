import type { createClient } from "@/lib/supabase/server";
import type { StudentProfile } from "@/lib/profile";

type ServerSupabaseClient = Awaited<ReturnType<typeof createClient>>;

const PROFILE_COLUMNS =
  "id, full_name, roll_number, department, branch, admission_year, graduation_year, current_semester";

export async function getStudentProfile(
  supabase: ServerSupabaseClient,
  userId: string
): Promise<{ profile: StudentProfile | null; error: Error | null }> {
  const { data, error } = await supabase
    .from("profiles")
    .select(PROFILE_COLUMNS)
    .eq("id", userId)
    .maybeSingle();

  return { profile: data as StudentProfile | null, error };
}
