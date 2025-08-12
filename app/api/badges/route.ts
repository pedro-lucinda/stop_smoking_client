import { getAuth } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

const API = (process.env.API_BASE_URL ?? "").replace(/\/+$/, "");

export async function GET(req: NextRequest) {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;

  const upstream = new URL(`${API}/badges/me`);
  req.nextUrl.searchParams.forEach((v, k) => upstream.searchParams.set(k, v)); // skip/limit

  const r = await fetch(upstream, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return r.status === 204
    ? new NextResponse(null, { status: 204 })
    : NextResponse.json(await r.json(), { status: r.status });
}
