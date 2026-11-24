export const OTHER_OPTION = "Other";

export const DEPARTMENTS = [
  "Aerospace Engineering",
  "Applied Mechanics",
  "Architecture",
  "Civil Engineering",
  "Computer Science and Technology",
  "Electrical Engineering",
  "Electronics and Telecommunication Engineering",
  "Information Technology",
  "Mechanical Engineering",
  "Metallurgy and Materials Engineering",
  "Mining Engineering",
  "MnC",
  "BS-MS Physics",
  "BS-MS Chemistry",
  "BS-MS Mathematics",
  OTHER_OPTION,
] as const;

export type StudentProfile = {
  id: string;
  full_name: string | null;
  roll_number: string | null;
  department: string | null;
  branch: string | null;
  admission_year: number | null;
  graduation_year: number | null;
  current_semester: number | null;
};

export function isDepartmentOption(value: string): boolean {
  return (DEPARTMENTS as readonly string[]).includes(value);
}

export function getBranchOptions(department: string): string[] {
  if (!isDepartmentOption(department)) {
    return [];
  }

  return department === OTHER_OPTION
    ? [OTHER_OPTION]
    : [department, OTHER_OPTION];
}

export function isAcademicProfileComplete(profile: StudentProfile | null): boolean {
  if (!profile) {
    return false;
  }

  const admissionYear = profile.admission_year;
  const graduationYear = profile.graduation_year;
  const currentSemester = profile.current_semester;

  return Boolean(
    profile.full_name?.trim() &&
      profile.roll_number?.trim() &&
      profile.department?.trim() &&
      profile.branch?.trim() &&
      admissionYear !== null &&
      graduationYear !== null &&
      currentSemester !== null &&
      Number.isInteger(admissionYear) &&
      Number.isInteger(graduationYear) &&
      Number.isInteger(currentSemester) &&
      admissionYear >= 1900 &&
      graduationYear > admissionYear &&
      currentSemester > 0
  );
}
