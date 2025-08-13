import { Auth0Client } from "@auth0/nextjs-auth0/server";

// Initialize the Auth0 client
export const auth0 = new Auth0Client({
  // Options are loaded from environment variables by default
  // Ensure necessary environment variables are properly set
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  appBaseUrl: process.env.APP_BASE_URL,
  secret: process.env.AUTH0_SECRET,

  authorizationParameters: {
    audience: process.env.AUTH0_AUDIENCE,
  },
});

import { NextResponse } from "next/server";

interface IHeader {
  Accept: string;
  "Content-Type"?: string;
  Authorization?: string;
}

interface IResponse {
  headers: IHeader;
  accessToken: string;
}

export async function getAuth(): Promise<IResponse | NextResponse> {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accessToken = session.tokenSet?.accessToken as string;
  const headers = {
    Accept: "*/*",
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  return { headers, accessToken };
}
