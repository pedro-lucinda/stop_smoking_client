/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = "nodejs";

import { getAuth } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;
  const { accessToken } = auth;

  try {
    const upstream = await fetch(`${process.env.API_BASE_URL}/user/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;
  const { accessToken } = auth;

  try {
    const body = await req.json();
    const upstream = await fetch(`${process.env.API_BASE_URL}/user/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
