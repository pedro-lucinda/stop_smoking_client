import { getAuth } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;
  return NextResponse.json(auth, { status: 200 });
}
