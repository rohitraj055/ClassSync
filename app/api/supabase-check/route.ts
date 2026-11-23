import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();

    if (error) {
      return NextResponse.json(
        { connected: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      connected: true,
      message: "Supabase connection successful!",
      authenticated: !!data?.claims,
    });
  } catch {
    return NextResponse.json(
      { connected: false, message: "Connection test failed." },
      { status: 500 }
    );
  }
}