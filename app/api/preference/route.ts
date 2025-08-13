/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const auth = await getAuth();
  if (auth instanceof NextResponse) {
    return auth;
  }
  const accessToken = auth.accessToken;

  try {
    const upstream = await fetch(`${process.env.API_BASE_URL}/preference/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;
  const { headers } = auth;

  try {
    const body = await req.json();

    const upstream = await fetch(`${process.env.API_BASE_URL}/preference/`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Internal Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;
  const { headers } = auth;

  try {
    const body = await req.json();

    const upstream = await fetch(`${process.env.API_BASE_URL}/preference/`, {
      method: "PATCH",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Internal Error" },
      { status: 500 }
    );
  }
}
