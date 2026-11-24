"use client";

import { useActionState, useState, type FormEvent } from "react";
import { signUpAction, type AuthFormState } from "@/app/auth/actions";
import { isOfficialStudentEmail } from "@/lib/auth/validation";

const initialState: AuthFormState = {};

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signUpAction, initialState);
  const [clientError, setClientError] = useState("");

  function validateForm(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!isOfficialStudentEmail(email)) {
      event.preventDefault();
      setClientError("Use your official @students.iiests.ac.in email address.");
      return;
    }

    if (password.length < 8) {
      event.preventDefault();
      setClientError("Your password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      event.preventDefault();
      setClientError("Your passwords do not match.");
      return;
    }

    setClientError("");
  }

  return (
    <>
      {state.success ? (
        <div className="auth-message success" role="status">{state.success}</div>
      ) : (
        <form className="auth-form" action={formAction} onSubmit={validateForm}>
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            maxLength={100}
            required
          />

          <label htmlFor="signupEmail">Official student email</label>
          <input
            id="signupEmail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@students.iiests.ac.in"
            required
          />

          <label htmlFor="signupPassword">Password</label>
          <input
            id="signupPassword"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            minLength={8}
            required
          />

          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password again"
            minLength={8}
            required
          />

          {(clientError || state.error) && (
            <p className="auth-message error" role="alert">{clientError || state.error}</p>
          )}

          <button className="auth-submit" type="submit" disabled={pending}>
            {pending ? "Creating account..." : "Create account"}
          </button>
        </form>
      )}
    </>
  );
}
