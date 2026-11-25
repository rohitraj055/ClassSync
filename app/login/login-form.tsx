"use client";

import { useActionState } from "react";
import { signInAction, type AuthFormState } from "@/app/auth/actions";

const initialState: AuthFormState = {};

export default function LoginForm({
  confirmationError,
}: {
  confirmationError: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    signInAction,
    initialState
  );

  return (
    <form className="auth-form" action={formAction}>
      {confirmationError && (
        <p className="auth-message error" role="alert">
          This verification link is invalid or has expired. Please use the
          latest verification email, then sign in.
        </p>
      )}

      <label htmlFor="loginEmail">Email address</label>
      <input
        id="loginEmail"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
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

      {state.error && (
        <p className="auth-message error" role="alert">
          {state.error}
        </p>
      )}

      <button className="auth-submit" type="submit" disabled={pending}>
        {pending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}