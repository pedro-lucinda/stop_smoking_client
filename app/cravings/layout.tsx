import { PageLoading } from "@/components/elements/loading";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cravings",
  description: "Cravings",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen w-full overflow-y-auto">
      <Suspense fallback={<PageLoading text="Loading cravings..." />}>
        {children}
      </Suspense>
    </main>
  );
}
