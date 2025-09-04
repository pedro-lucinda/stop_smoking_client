import { HealthMetricsList } from "@/components/modules/health/health-metrics-list";
import { Info } from "@/components/modules/home/info";
import { LoginPage } from "@/components/modules/home/login-page";
import { MotivationCarousel } from "@/components/modules/motivation/motivation-carousel";
import { PreferencesForm } from "@/components/modules/PreferenceForm";
import { auth0 } from "@/lib/auth0";
import { Suspense } from "react";
import { serverFetch } from "services/api/server-fetch";
import {
  IBadgeList,
  IHealth,
  IMotivation,
  IPreference,
} from "services/api/types";

export default async function Home() {
  // is authenticated
  const session = await auth0.getSession();
  const accessToken = session?.tokenSet?.accessToken as string;
  if (!accessToken) {
    return <LoginPage />;
  }

  let motivation: IMotivation | null = null;
  let badgesData: IBadgeList | null = null;
  let health: IHealth | null = null;
  let preferences: IPreference | null = null;
  try {
    motivation = await serverFetch<IMotivation>("/motivation/detailed-text");
    badgesData = await serverFetch<IBadgeList>("/badges/me");
    health = await serverFetch<IHealth>("/health");
    preferences = await serverFetch<IPreference>("/preference");
  } catch (e) {
    console.error(e);
  }
  if (!motivation || !badgesData || !health || !preferences) {
    return <PreferencesForm />;
  }

  const topics = [
    { title: "Progress", body: motivation.progress },
    { title: "Motivation", body: motivation.motivation },
    { title: "Cravings", body: motivation.cravings },
    { title: "Ideas", body: motivation.ideas },
    { title: "Recommendations", body: motivation.recommendations },
  ];

  return (
    <Suspense fallback={<div className="animate-pulse h-8 w-8" />}>
      <main className=" h-screen overflow-y-auto w-full">
        <section className="p-10 container mx-auto">
          <div className="flex flex-col overflow-y-auto gap-5 w-full">
            <Info quitDate={preferences.quit_date} />
            <HealthMetricsList data={health} />
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">Daily Feed</h2>
              </div>
              <MotivationCarousel items={topics} />
            </section>
          </div>
        </section>
      </main>
    </Suspense>
  );
}
