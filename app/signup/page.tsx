import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import SignupForm from "@/app/signup/signup-form";
import { isInvalidRefreshTokenError } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export default function SignupPage() {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="signup-title">
        <Link className="auth-brand" href="/" aria-label="ClassSync home">
          <span className="brand-mark"><span /></span>
          <span className="brand-name">class<span>sync</span></span>
        </Link>
        <p className="auth-eyebrow">IIEST SHIBPUR STUDENT PORTAL</p>
        <h1 id="signup-title">Create your account</h1>
        <p className="auth-description">Use your official student email to get started.</p>
        <Suspense fallback={<p className="auth-loading" role="status">Loading your account form...</p>}>
          <SignupContent />
        </Suspense>
        <p className="auth-switch">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}

async function SignupContent() {
  await connection();

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error) {
    if (!isInvalidRefreshTokenError(error)) {
      throw new Error(`Unable to verify your session: ${error.message}`);
    }
  } else if (data?.claims) {
    redirect("/");
  }

  return <SignupForm />;
}
