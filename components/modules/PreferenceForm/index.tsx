/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/kibo-ui/spinner";
import { Label } from "@/components/ui/label";
import { apiService } from "services/api";
import { IPreference } from "services/api/types";
import { LANGUAGE_OPTIONS } from "utils/constants";
import { GoalCard } from "./goals/goal-card";
import { LanguagePicker } from "./language-picker";
import { QuitDatePicker } from "./quit-date-picker";
import { ReasonInput } from "./reason-input";

interface PreferencesFormProps {
  pref?: IPreference;
}

export function PreferencesForm({ pref }: PreferencesFormProps) {
  const router = useRouter();

  // Initialize state from pref
  const [reason, setReason] = useState<string>(pref?.reason || "");
  const [quitDate, setQuitDate] = useState<string>(pref?.quit_date || "");
  const [language, setLanguage] = useState<string>(
    pref?.language || LANGUAGE_OPTIONS[0].value
  );
  const [isLoading, setIsLoading] = useState(false);
  const [goals, setGoals] = useState<
    { description: string; is_completed: boolean }[] | null
  >(
    pref?.goals.map((g) => ({
      description: g.description,
      is_completed: g.is_completed,
    })) ?? null
  );
  const [error, setError] = useState<string | null>(null);

  const handleAddGoal = () =>
    setGoals((prev) =>
      prev
        ? [...prev, { description: "", is_completed: false }]
        : [{ description: "", is_completed: false }]
    );
  const handleRemoveGoal = (index: number) =>
    setGoals((prev) => (prev ? prev.filter((_, i) => i !== index) : prev));
  const handleGoalChange = (
    index: number,
    field: "description" | "is_completed",
    value: string | boolean
  ) => {
    setGoals((prev) =>
      prev
        ? prev.map((g, i) => (i === index ? { ...g, [field]: value } : g))
        : prev
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const payload = {
        reason,
        quit_date: quitDate,
        language,
        goals: goals ?? undefined,
      };
      if (pref) {
        await apiService.updatePreference(payload, {
          headers: { cookie: document.cookie },
        });
      } else {
        await apiService.createPreference(payload as IPreference, {
          headers: { cookie: document.cookie },
        });
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to save preferences.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto p-4 ">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-bold text-xl">
            Your Smoking Cessation Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Reason */}
          <ReasonInput
            reason={reason}
            setReason={setReason}
            isLoading={isLoading}
          />
          <div className="flex items-center gap-10">
            {/* Quit Date */}
            <QuitDatePicker
              quitDate={quitDate}
              setQuitDate={setQuitDate}
              isLoading={isLoading}
            />

            {/* Language */}
            <LanguagePicker
              language={language}
              setLanguage={setLanguage}
              isLoading={isLoading}
            />
          </div>

          {/* Goals */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Goals & Milestones</Label>
              <Button
                size="sm"
                type="button"
                onClick={handleAddGoal}
                disabled={isLoading}
              >
                + Add Goal
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              {goals?.map((goal, index) => (
                <GoalCard
                  key={index}
                  goal={goal}
                  handleGoalChange={handleGoalChange}
                  handleRemoveGoal={handleRemoveGoal}
                  isLoading={isLoading}
                  index={index}
                />
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter>
          <div className="flex  items-center w-full gap-2">
            <Button type="submit" disabled={isLoading}>
              Save Settings {isLoading && <Spinner variant="ring" />}
            </Button>

            <Button
              className=""
              variant="outline"
              onClick={() => router.push("/")}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
