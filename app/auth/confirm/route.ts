import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

const supportedOtpTypes = [
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
] as const satisfies readonly EmailOtpType[];

function isSupportedOtpType(type: string): type is (typeof supportedOtpTypes)[number] {
  return (supportedOtpTypes as readonly string[]).includes(type);
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("error", "confirmation");
  return NextResponse.redirect(loginUrl);
}

export async function GET(request: NextRequest) {
  const callbackUrl = new URL(request.url);
  const tokenHash = callbackUrl.searchParams.get("token_hash");
  const type = callbackUrl.searchParams.get("type");
  const code = callbackUrl.searchParams.get("code");
  const supabase = await createClient();

  if (tokenHash) {
    if (!type || !isSupportedOtpType(type)) {
      return redirectToLogin(request);
    }

    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });

    if (error) {
      return redirectToLogin(request);
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return redirectToLogin(request);
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  return redirectToLogin(request);
}
