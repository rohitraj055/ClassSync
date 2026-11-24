const OFFICIAL_STUDENT_EMAIL = /^[^\s@]+@students\.iiests\.ac\.in$/i;

export function isOfficialStudentEmail(email: string): boolean {
  return OFFICIAL_STUDENT_EMAIL.test(email.trim());
}
