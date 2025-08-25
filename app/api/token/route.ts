import { getAuth } from "@/lib/auth0";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json(auth, { status: 200 });
}
