/* eslint-disable @typescript-eslint/no-explicit-any */
import { PreferencesForm } from "@/components/modules/PreferenceForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { apiService } from "services/api";
import { IMotivation } from "services/api/types";

export default async function UserPage() {
  let motivation: IMotivation | null = null;
  const cookieHeader = await cookies().toString();
  let pref = null;
  try {
    motivation = await apiService.getDailyMotivation({
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
    pref = await apiService.getPreference({
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
  } catch (err: any) {
    console.error("Failed to fetch daily motivation:", err);
  }

  if (!motivation) {
    return <PreferencesForm />;
  }
  return (
    <Card className=" overflow-y-auto">
      <CardHeader>
        <CardTitle className="font-bold text-lg">
          Daily Motivation — {motivation.date}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <h3 className="font-bold text-md"> Ideas</h3>
          <p>{motivation.ideas}</p>
        </section>
        <section>
          <h3 className="font-bold text-md">Recommendations</h3>
          <p>{motivation.recommendations}</p>
        </section>
      </CardContent>
    </Card>
  );
}
