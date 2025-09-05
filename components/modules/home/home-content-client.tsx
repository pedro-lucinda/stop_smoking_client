"use client";
import { GoalsListInteractive } from "@/components/modules/goals/goals-list-interactive";
import { HealthMetricsList } from "@/components/modules/health/health-metrics-list";
import { Info } from "@/components/modules/home/info";
import { MotivationCarousel } from "@/components/modules/motivation/motivation-carousel";
import { useState } from "react";
import type {
  IGoal,
  IHealth,
  IMotivation,
  IPreference,
} from "services/api/types";

interface HomeContentClientProps {
  initialPreferences: IPreference;
  health: IHealth;
  motivation: IMotivation;
}

export function HomeContentClient({
  initialPreferences,
  health,
  motivation,
}: HomeContentClientProps) {
  const [preferences, setPreferences] =
    useState<IPreference>(initialPreferences);

  const handleGoalsUpdate = (updatedGoals: IGoal[]) => {
    setPreferences((prev) => ({
      ...prev,
      goals: updatedGoals,
    }));
  };

  const topics = [
    { title: "Progress", body: motivation.progress },
    { title: "Motivation", body: motivation.motivation },
    { title: "Cravings", body: motivation.cravings },
    { title: "Ideas", body: motivation.ideas },
    { title: "Recommendations", body: motivation.recommendations },
  ];

  return (
    <main className=" h-screen overflow-y-auto w-full">
      <section className="p-10 container mx-auto">
        <div className="flex flex-col overflow-y-auto gap-5 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Info
              quitDate={preferences.quit_date}
              reason={preferences.reason}
            />
            <GoalsListInteractive
              goals={preferences.goals}
              onGoalsUpdate={handleGoalsUpdate}
            />
          </div>
          <HealthMetricsList data={health} />
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📰</span>
                </div>
                <h2 className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Daily Feed
                </h2>
              </div>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Your personalized motivation and insights to keep you on track
              </p>
            </div>
            <MotivationCarousel items={topics} />
          </section>
        </div>
      </section>
    </main>
  );
}
