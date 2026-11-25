"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isOfficialStudentEmail } from "@/lib/auth/validation";
import { getStudentProfile } from "@/lib/profile-data";
import { isAcademicProfileComplete } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";

export type AuthFormState = {
  error?: string;
  success?: string;
};

function formValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function friendlyAuthError(message: string, action: "signup" | "login"): string {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("already registered")) {
    return "An account with this email already exists. Try logging in instead.";
  }

  if (normalizedMessage.includes("email not confirmed")) {
    return "Please verify your email before logging in.";
  }

  if (action === "login" && normalizedMessage.includes("invalid login credentials")) {
    return "That email or password doesn't match. Check your details and try again.";
  }

  return message || `We couldn't ${action === "signup" ? "create your account" : "log you in"}. Please try again.`;
}

export async function signUpAction(
  _previousState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const fullName = formValue(formData, "fullName").trim();
  const email = formValue(formData, "email").trim();
  const password = formValue(formData, "password");
  const confirmPassword = formValue(formData, "confirmPassword");

  if (!fullName) {
    return { error: "Enter your full name." };
  }

  if (fullName.length > 100) {
    return { error: "Your full name must be 100 characters or fewer." };
  }

  if (!isOfficialStudentEmail(email)) {
    return { error: "Use your official @students.iiests.ac.in email address." };
  }

  if (password.length < 8) {
    return { error: "Your password must be at least 8 characters long." };
  }

  if (password !== confirmPassword) {
    return { error: "Your passwords do not match." };
  }

  const requestHeaders = await headers();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    requestHeaders.get("origin") ??
    requestHeaders.get("referer");

  if (!siteUrl) {
    return {
      error: "We couldn't determine the confirmation link. Please configure NEXT_PUBLIC_SITE_URL and try again.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: new URL("/auth/confirm", siteUrl).toString(),
      data: { full_name: fullName },
    },
  });

  if (error) {
    return { error: friendlyAuthError(error.message, "signup") };
  }

  return {
    success: "Check your inbox for a verification link to activate your ClassSync account.",
  };
}

export async function signInAction(
  _previousState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = formValue(formData, "email").trim();
  const password = formValue(formData, "password");

  if (!email) {
    return { error: "Enter your email address." };
  }

  if (!password) {
    return { error: "Enter your password." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: friendlyAuthError(error.message, "login") };
  }

  const { data: claimsData, error: claimsError } =
    await supabase.auth.getClaims();

  if (claimsError) {
    await supabase.auth.signOut();

    return {
      error: "Your login succeeded, but we couldn't verify your session. Please try again.",
    };
  }

  const claims = claimsData?.claims;
  const userId = claims?.sub;

  if (typeof userId !== "string") {
    await supabase.auth.signOut();

    return {
      error: "We couldn't identify your account. Please try again.",
    };
  }

  // Check Primary Super Admin authorization using verified identity.
  const {
    data: isPrimaryOwner,
    error: ownerCheckError,
  } = await supabase.rpc("is_current_user_primary_owner");

  if (ownerCheckError) {
    await supabase.auth.signOut();

    return {
      error: "We couldn't verify your account permissions. Please try again.",
    };
  }

  // Primary Super Admin does not need a student dashboard profile.
  if (isPrimaryOwner === true) {
    redirect("/admin");
  }

  // All non-owner accounts must use an official IIEST student email.
  const verifiedEmail =
    typeof claims?.email === "string" ? claims.email : "";

  if (!isOfficialStudentEmail(verifiedEmail)) {
    await supabase.auth.signOut();

    return {
      error: "Only authorized IIEST student accounts can log in.",
    };
  }

  const { profile, error: profileError } =
    await getStudentProfile(supabase, userId);

  if (profileError) {
    return {
      error: "Your login succeeded, but we couldn't load your academic profile. Please try again.",
    };
  }

  if (!isAcademicProfileComplete(profile)) {
    redirect("/profile/setup");
  }

  redirect("/");
}