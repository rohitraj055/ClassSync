import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import LoginForm from "@/app/login/login-form";
import { isInvalidRefreshTokenError } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <Link className="auth-brand" href="/" aria-label="ClassSync home">
          <span className="brand-mark">
            <span />
          </span>
          <span className="brand-name">
            class<span>sync</span>
          </span>
        </Link>

        <p className="auth-eyebrow">IIEST SHIBPUR • CLASSSYNC</p>

        <h1 id="login-title">Welcome back</h1>

        <p className="auth-description">
          Log in with your student or administrator account.
        </p>

        <Suspense
          fallback={
            <p className="auth-loading" role="status">
              Loading your account form...
            </p>
          }
        >
          <LoginContent searchParams={searchParams} />
        </Suspense>

        <p className="auth-switch">
          New to ClassSync? <Link href="/signup">Create an account</Link>
        </p>
      </section>
    </main>
  );
}

async function LoginContent({ searchParams }: LoginPageProps) {
  await connection();

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error) {
    if (!isInvalidRefreshTokenError(error)) {
      throw new Error(`Unable to verify your session: ${error.message}`);
    }
  } else if (data?.claims) {
    const {
      data: isPrimaryOwner,
      error: ownerCheckError,
    } = await supabase.rpc("is_current_user_primary_owner");

    if (ownerCheckError) {
      throw new Error("Unable to verify account permissions.");
    }

    if (isPrimaryOwner === true) {
      redirect("/admin");
    }

    redirect("/");
  }

  const { error: queryError } = await searchParams;

  return <LoginForm confirmationError={queryError === "confirmation"} />;
}