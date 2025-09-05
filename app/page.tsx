import { PageLoading } from "@/components/elements/loading";
import { HomeContent } from "@/components/modules/home/home-content";
import { LoginPage } from "@/components/modules/home/login-page";
import { auth0 } from "@/lib/auth0";
import { Suspense } from "react";

export default async function Home() {
  // is authenticated
  const session = await auth0.getSession();
  const accessToken = session?.tokenSet?.accessToken as string;
  if (!accessToken) {
    return <LoginPage />;
  }

  return (
    <Suspense fallback={<PageLoading text="Loading your dashboard..." />}>
      <HomeContent />
    </Suspense>
  );
}
