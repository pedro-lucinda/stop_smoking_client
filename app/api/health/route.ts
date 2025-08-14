import { getAuth } from "@/lib/auth0";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API = (process.env.API_BASE_URL ?? "").replace(/\/+$/, "");

export async function GET() {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;

  const r = await fetch(`${API}/health/`, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return NextResponse.json(await r.json(), { status: r.status });
}
