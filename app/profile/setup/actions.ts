"use server";

import { redirect } from "next/navigation";
import { getBranchOptions, isDepartmentOption } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";

export type ProfileSetupState = {
  error?: string;
};

function formValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseSmallInt(value: string): number | null {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed <= 32767 ? parsed : null;
}

export async function updateProfileAction(
  _previousState: ProfileSetupState,
  formData: FormData
): Promise<ProfileSetupState> {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();

  if (claimsError) {
    return { error: "We couldn't verify your account. Please sign in again." };
  }

  const userId = claimsData?.claims?.sub;

  if (typeof userId !== "string") {
    return { error: "Your session has expired. Please sign in again." };
  }

  const fullName = formValue(formData, "fullName");
  const rollNumber = formValue(formData, "rollNumber");
  const department = formValue(formData, "department");
  const branch = formValue(formData, "branch");
  const admissionYear = parseSmallInt(formValue(formData, "admissionYear"));
  const graduationYear = parseSmallInt(formValue(formData, "graduationYear"));
  const currentSemester = parseSmallInt(formValue(formData, "currentSemester"));

  if (!fullName || fullName.length > 100) {
    return { error: "Enter a full name of 100 characters or fewer." };
  }

  if (!rollNumber || rollNumber.length > 50) {
    return { error: "Enter a roll number of 50 characters or fewer." };
  }

  if (!isDepartmentOption(department)) {
    return { error: "Select a valid department." };
  }

  if (!getBranchOptions(department).includes(branch)) {
    return { error: "Select a valid branch for your department." };
  }

  if (admissionYear === null || admissionYear < 1900) {
    return { error: "Enter a valid admission year." };
  }

  if (graduationYear === null || graduationYear <= admissionYear) {
    return { error: "Graduation year must be a valid year after admission." };
  }

  if (currentSemester === null || currentSemester < 1) {
    return { error: "Enter a valid current semester." };
  }

  const { data: updatedProfile, error: updateError } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      roll_number: rollNumber,
      department,
      branch,
      admission_year: admissionYear,
      graduation_year: graduationYear,
      current_semester: currentSemester,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select("id")
    .maybeSingle();

  if (updateError) {
    return { error: `We couldn't save your profile: ${updateError.message}` };
  }

  if (!updatedProfile) {
    return { error: "Your profile record could not be found. Please contact support." };
  }

  redirect("/");
}
