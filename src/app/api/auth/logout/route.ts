// /app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout realizado" });
  response.headers.set(
    "Set-Cookie",
    "token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure"
  );
  return response;
}
