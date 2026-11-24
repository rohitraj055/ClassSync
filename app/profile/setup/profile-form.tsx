"use client";

import { useActionState, useState } from "react";
import { updateProfileAction, type ProfileSetupState } from "@/app/profile/setup/actions";
import {
  DEPARTMENTS,
  getBranchOptions,
  isDepartmentOption,
  OTHER_OPTION,
  type StudentProfile,
} from "@/lib/profile";

const initialState: ProfileSetupState = {};

export default function ProfileForm({
  profile,
  suggestedName,
}: {
  profile: StudentProfile;
  suggestedName: string;
}) {
  const [state, formAction, pending] = useActionState(updateProfileAction, initialState);
  const storedDepartment = profile.department ?? "";
  const initialDepartment = isDepartmentOption(storedDepartment)
    ? storedDepartment
    : storedDepartment
      ? OTHER_OPTION
      : "";
  const initialBranchOptions = getBranchOptions(initialDepartment);
  const [department, setDepartment] = useState(initialDepartment);
  const [branch, setBranch] = useState(() => {
    const storedBranch = profile.branch ?? "";
    return initialBranchOptions.includes(storedBranch)
      ? storedBranch
      : initialBranchOptions.includes(initialDepartment)
        ? initialDepartment
        : "";
  });
  const branchOptions = getBranchOptions(department);

  function handleDepartmentChange(value: string) {
    setDepartment(value);
    setBranch(value ? (value === OTHER_OPTION ? OTHER_OPTION : value) : "");
  }

  return (
    <form className="auth-form profile-setup-form" action={formAction}>
      <div className="profile-fields">
        <div className="profile-field">
          <label htmlFor="profileFullName">Full name</label>
          <input
            id="profileFullName"
            name="fullName"
            type="text"
            autoComplete="name"
            maxLength={100}
            defaultValue={profile.full_name?.trim() || suggestedName}
            required
          />
        </div>

        <div className="profile-field">
          <label htmlFor="rollNumber">Roll number</label>
          <input
            id="rollNumber"
            name="rollNumber"
            type="text"
            autoComplete="off"
            maxLength={50}
            defaultValue={profile.roll_number ?? ""}
            required
          />
        </div>

        <div className="profile-field">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={department}
            onChange={(event) => handleDepartmentChange(event.currentTarget.value)}
            required
          >
            <option value="">Select a department</option>
            {DEPARTMENTS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="profile-field">
          <label htmlFor="branch">Branch</label>
          <select
            id="branch"
            name="branch"
            value={branch}
            onChange={(event) => setBranch(event.currentTarget.value)}
            required
            disabled={!department}
          >
            <option value="">Select a branch</option>
            {branchOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="profile-field">
          <label htmlFor="admissionYear">Admission year</label>
          <input
            id="admissionYear"
            name="admissionYear"
            type="number"
            inputMode="numeric"
            min={1900}
            max={32767}
            step={1}
            defaultValue={profile.admission_year ?? ""}
            required
          />
        </div>

        <div className="profile-field">
          <label htmlFor="graduationYear">Graduation year</label>
          <input
            id="graduationYear"
            name="graduationYear"
            type="number"
            inputMode="numeric"
            min={1900}
            max={32767}
            step={1}
            defaultValue={profile.graduation_year ?? ""}
            required
          />
        </div>

        <div className="profile-field">
          <label htmlFor="currentSemester">Current semester</label>
          <input
            id="currentSemester"
            name="currentSemester"
            type="number"
            inputMode="numeric"
            min={1}
            max={32767}
            step={1}
            defaultValue={profile.current_semester ?? ""}
            required
          />
        </div>
      </div>

      {state.error && <p className="auth-message error" role="alert">{state.error}</p>}

      <button className="auth-submit" type="submit" disabled={pending}>
        {pending ? "Saving profile..." : "Save and continue"}
      </button>
    </form>
  );
}
