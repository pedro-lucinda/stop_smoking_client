import { getAuth } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

const API = (process.env.API_BASE_URL ?? "").replace(/\/+$/, "");

export async function GET(req: NextRequest) {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;

  const upstream = new URL(`${API}/diary/`);
  req.nextUrl.searchParams.forEach((v, k) => upstream.searchParams.set(k, v)); // date/skip/limit

  const r = await fetch(upstream, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return NextResponse.json(await r.json(), { status: r.status });
}

export async function POST(req: NextRequest) {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();

  const r = await fetch(`${API}/diary/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  return NextResponse.json(await r.json(), { status: r.status });
}
