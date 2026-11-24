import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isInvalidRefreshTokenError } from "@/lib/auth/session";
import { getStudentProfile } from "@/lib/profile-data";
import { isAcademicProfileComplete } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import Dashboard from "./dashboard";

export default function Home() {
  return (
    <Suspense fallback={<main className="dashboard-loading">Loading your dashboard...</main>}>
      <AuthenticatedDashboard />
    </Suspense>
  );
}

async function AuthenticatedDashboard() {
  await connection();

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error) {
    if (isInvalidRefreshTokenError(error)) {
      redirect("/login");
    }

    throw new Error(`Unable to verify your session: ${error.message}`);
  }

  const claims = data?.claims;

  if (!claims) {
    redirect("/login");
  }

  if (typeof claims.sub !== "string") {
    redirect("/login");
  }

  const { profile, error: profileError } = await getStudentProfile(supabase, claims.sub);

  if (profileError) {
    throw new Error(`Unable to load your academic profile: ${profileError.message}`);
  }

  if (!isAcademicProfileComplete(profile)) {
    redirect("/profile/setup");
  }

  const metadataName = claims.user_metadata?.full_name;
  const email = typeof claims.email === "string" ? claims.email : "";
  const displayName =
    profile?.full_name?.trim() ||
    (typeof metadataName === "string" && metadataName.trim()
      ? metadataName.trim()
      : email.split("@")[0] || "Student");

  return <Dashboard displayName={displayName} email={email} />;
}
