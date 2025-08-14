import { auth0 } from "@/lib/auth0";

const API = (process.env.API_BASE_URL ?? "").replace(/\/+$/, "");

export async function serverFetch<T>(path: string): Promise<T> {
  const session = await auth0.getSession();
  const accessToken = session?.tokenSet?.accessToken as string;
  if (!accessToken) throw new Error("No access token");

  const r = await fetch(`${API}${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(String(r.status));
  return r.json() as Promise<T>;
}
