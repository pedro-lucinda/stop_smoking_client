import { getAuth } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

const API = (process.env.API_BASE_URL ?? "").replace(/\/+$/, "");

function parseId(raw: string) {
  const id = Number(raw);
  if (!Number.isInteger(id)) throw new Error("invalid id");
  return id;
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ diary_id: string }> }
) {
  const { diary_id } = await ctx.params; // ✅ await params
  const id = parseId(diary_id);

  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;

  const r = await fetch(`${API}/diary/${id}`, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  const body = await r.json();
  return NextResponse.json(body, { status: r.status });
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ diary_id: string }> }
) {
  const { diary_id } = await ctx.params; // ✅ await params
  const id = parseId(diary_id);

  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;

  const data = await req.json();
  const r = await fetch(`${API}/diary/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const body = await r.json();
  return NextResponse.json(body, { status: r.status });
}

export async function DELETE(
  _req: NextRequest,
  ctx: { params: Promise<{ diary_id: string }> }
) {
  const { diary_id } = await ctx.params; // ✅ await params
  const id = parseId(diary_id);

  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;

  const r = await fetch(`${API}/diary/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      Accept: "application/json",
    },
  });
  return new NextResponse(null, { status: r.status });
}
