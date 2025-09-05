"use client";
import { PageLoading } from "@/components/elements/loading";
import { CravingsContent } from "@/components/modules/cravings/cravings-content";
import { Suspense } from "react";

export default function CravingsPage() {
  return (
    <Suspense fallback={<PageLoading text="Loading your cravings..." />}>
      <CravingsContent />
    </Suspense>
  );
}
