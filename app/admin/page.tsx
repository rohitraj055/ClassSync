import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isInvalidRefreshTokenError } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import AdminDashboard from "./admin-dashboard";

export default function AdminPage() {
  return (
    <Suspense fallback={<main><p>Verifying administrator access...</p></main>}>
      <AdminContent />
    </Suspense>
  );
}

async function AdminContent() {
  await connection();

  const supabase = await createClient();

  // Verify the authenticated user's identity.
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

  // Verify primary owner permissions.
  const {
    data: isPrimaryOwner,
    error: ownerCheckError,
  } = await supabase.rpc("is_current_user_primary_owner");

  if (ownerCheckError) {
    throw new Error("Unable to verify administrator permissions.");
  }

  if (isPrimaryOwner !== true) {
    redirect("/");
  }

  const ownerEmail =
    typeof claims.email === "string" ? claims.email : "Primary Owner";

  return <AdminDashboard ownerEmail={ownerEmail} />;
}