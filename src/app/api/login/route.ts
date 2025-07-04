// /api/login.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const response = await fetch("https://app-api.carvoyance.com/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  const res = NextResponse.json({
    success: true,
    access_token: data.access_token, // ✅ вернуть токен в теле
    refresh_token: data.refresh_token, // ✅ вернуть рефреш тоже
  });

  return res;
}
