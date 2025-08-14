/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadgesGrid } from "@/components/modules/badges/badges-grid";
import { HealthMetricsList } from "@/components/modules/health/health-metrics-list";
import { MotivationCarousel } from "@/components/modules/motivation/motivation-carousel";
import { PreferencesForm } from "@/components/modules/PreferenceForm";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import Link from "next/link";
import { serverFetch } from "services/api/server-fetch";
import { IBadgeList, IHealth, IMotivation } from "services/api/types";
export default async function UserPage() {
  const motivation = await serverFetch<IMotivation>(
    "/motivation/detailed-text"
  );
  const { badges } = await serverFetch<IBadgeList>("/badges/me");
  const health = await serverFetch<IHealth>("/health");
  console.log({ health });
  if (!motivation) {
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
    <div className="flex flex-col overflow-y-auto gap-5">
      <Link href="/preferences" className="ml-auto">
        <Button variant="outline" size="sm">
          <Settings2 className="h-4 w-4 mr-2" />
          Edit preferences
        </Button>
      </Link>
      <HealthMetricsList data={health} />
      <section className="flex gap-2 flex-col justify-between">
        <h3 className="font-bold text-lg">Badges</h3>
        <BadgesGrid badges={badges} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Daily Feed</h2>
        </div>
        <MotivationCarousel items={topics} />
      </section>
    </div>
  );
}
