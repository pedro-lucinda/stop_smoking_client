import { getAuth } from "@/lib/auth0";
import { NextResponse } from "next/server";

const API = (process.env.API_BASE_URL ?? "").replace(/\/+$/, "");

export async function DELETE() {
  const auth = await getAuth();
  if (auth instanceof NextResponse) return auth;

  const r = await fetch(`${API}/user/me/reset`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  // Handle 204 No Content response
  if (r.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.json(await r.json(), { status: r.status });
}
