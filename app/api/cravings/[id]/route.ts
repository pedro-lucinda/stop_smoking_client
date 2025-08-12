import { getAuth } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

const API = (process.env.API_BASE_URL ?? "").replace(/\/+$/, "");

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;

  const r = await fetch(`${API}/craving/${params.id}`, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  return NextResponse.json(await r.json(), { status: r.status });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();

  const r = await fetch(`${API}/craving/${params.id}`, {
    method: "PUT",
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

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;

  const r = await fetch(`${API}/craving/${params.id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${auth.accessToken}` },
    cache: "no-store",
  });

  if (r.status === 204) return new NextResponse(null, { status: 204 });
  return NextResponse.json(await r.json(), { status: r.status });
}
