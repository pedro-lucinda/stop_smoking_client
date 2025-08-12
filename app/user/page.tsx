/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadgesGrid } from "@/components/modules/badges/badges-grid";
import { PreferencesForm } from "@/components/modules/PreferenceForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
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

  return (
    <Card className="overflow-y-auto">
      <CardHeader>
        <CardTitle className="font-bold text-lg">
          Daily Motivation — {motivation.date}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="font-bold text-md">Progress</h3>
          <p>{motivation.progress}</p>
        </section>

        <section>
          <h3 className="font-bold text-md">Motivation</h3>
          <p>{motivation.motivation}</p>
        </section>

        <section>
          <h3 className="font-bold text-md">Cravings</h3>
          <p>{motivation.cravings}</p>
        </section>

        <section>
          <h3 className="font-bold text-md">Ideas</h3>
          <p>{motivation.ideas}</p>
        </section>

        <section>
          <h3 className="font-bold text-md">Recommendations</h3>
          <p>{motivation.recommendations}</p>
        </section>

        <section>
          <h3 className="font-bold text-md">Badges</h3>
          <BadgesGrid badges={badges} showDate />
        </section>
      </CardContent>
    </Card>
  );
}
