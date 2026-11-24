import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import ProfileForm from "@/app/profile/setup/profile-form";
import { isInvalidRefreshTokenError } from "@/lib/auth/session";
import { getStudentProfile } from "@/lib/profile-data";
import { isAcademicProfileComplete } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";

export default function ProfileSetupPage() {
  return (
    <main className="auth-page">
      <section className="auth-card profile-setup-card" aria-labelledby="profile-setup-title">
        <Link className="auth-brand" href="/" aria-label="ClassSync home">
          <span className="brand-mark"><span /></span>
          <span className="brand-name">class<span>sync</span></span>
        </Link>
        <p className="auth-eyebrow">IIEST SHIBPUR STUDENT PORTAL</p>
        <h1 id="profile-setup-title">Complete your profile</h1>
        <p className="auth-description">
          Add your academic details to continue to your student dashboard.
        </p>
        <Suspense fallback={<p className="auth-loading" role="status">Loading your profile...</p>}>
          <ProfileSetupContent />
        </Suspense>
      </section>
    </main>
  );
}

async function ProfileSetupContent() {
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

  if (!claims || typeof claims.sub !== "string") {
    redirect("/login");
  }

  const { profile, error: profileError } = await getStudentProfile(supabase, claims.sub);

  if (profileError) {
    throw new Error(`Unable to load your academic profile: ${profileError.message}`);
  }

  if (isAcademicProfileComplete(profile)) {
    redirect("/");
  }

  if (!profile) {
    return (
      <p className="auth-message error" role="alert">
        We couldn&apos;t find a profile record for your account. Please contact support.
      </p>
    );
  }

  const metadataName = claims.user_metadata?.full_name;
  const suggestedName = typeof metadataName === "string" ? metadataName : "";

  return <ProfileForm profile={profile} suggestedName={suggestedName} />;
}
