/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadgesGrid } from "@/components/modules/badges/badges-grid";
import { MotivationCarousel } from "@/components/modules/motivation/motivation-carousel";
import { PreferencesForm } from "@/components/modules/PreferenceForm";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { apiService } from "services/api";
import { IBadge, IBadgeList, IMotivation } from "services/api/types";
export default async function UserPage() {
  let motivation: IMotivation | null = null;
  let badges: IBadge[] = [];
  let badgesTotal = 0;

  const cookiesData = await cookies();
  const cookieHeader = cookiesData.toString();

  try {
    motivation = await apiService.getDailyMotivation({
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
  } catch (err: any) {
    console.error("Failed to fetch daily motivation:", err);
  }

  try {
    const res: IBadgeList = await apiService.getMyBadges(
      {
        skip: 0,
        limit: 10,
      },
      {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      }
    );
    badges = res.badges ?? [];
    badgesTotal = res.total ?? 0;
  } catch (err: any) {
    console.error("Failed to fetch badges:", err);
  }

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
