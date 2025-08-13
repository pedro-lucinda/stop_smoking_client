/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = "nodejs";

import { getAuth } from "@/lib/auth0";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;
  const { accessToken } = auth;

  try {
    const upstream = await fetch(
      `${process.env.API_BASE_URL}/motivation/detailed-text`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to load daily motivation" },
      { status: 500 }
    );
  }
}
