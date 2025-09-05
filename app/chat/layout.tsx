import { PageLoading } from "@/components/elements/loading";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Protected Layout",
  description: "Protected Layout",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="py-2 container mx-auto flex-1 flex flex-col min-h-0">
      <Suspense fallback={<PageLoading text="Loading chat..." />}>
        {children}
      </Suspense>
    </main>
  );
}
