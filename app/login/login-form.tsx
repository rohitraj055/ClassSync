"use client";

import { useActionState, useState, type FormEvent } from "react";
import { signInAction, type AuthFormState } from "@/app/auth/actions";
import { isOfficialStudentEmail } from "@/lib/auth/validation";

const initialState: AuthFormState = {};

export default function LoginForm({ confirmationError }: { confirmationError: boolean }) {
  const [state, formAction, pending] = useActionState(signInAction, initialState);
  const [clientError, setClientError] = useState("");

  function validateForm(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    if (!isOfficialStudentEmail(email)) {
      event.preventDefault();
      setClientError("Use your official @students.iiests.ac.in email address.");
      return;
    }

    setClientError("");
  }

  return (
    <form className="auth-form" action={formAction} onSubmit={validateForm}>
      {confirmationError && (
        <p className="auth-message error" role="alert">
          This verification link is invalid or has expired. Please use the latest verification email, then sign in.
        </p>
      )}

      <label htmlFor="loginEmail">IIEST student email</label>
      <input
        id="loginEmail"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@students.iiests.ac.in"
        required
      />

      <label htmlFor="loginPassword">Password</label>
      <input
        id="loginPassword"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Your password"
        required
      />

      {(clientError || state.error) && (
        <p className="auth-message error" role="alert">{clientError || state.error}</p>
      )}

      <button className="auth-submit" type="submit" disabled={pending}>
        {pending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}
