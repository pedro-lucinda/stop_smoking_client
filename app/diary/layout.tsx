import { PageLoading } from "@/components/elements/loading";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dairy",
  description: "Dairy",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="p-10 container mx-auto h-screen overflow-y-auto">
      <Suspense fallback={<PageLoading text="Loading diary..." />}>
        {children}
      </Suspense>
    </main>
  );
}
