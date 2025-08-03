/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { format, parse } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { apiService } from "services/api";
import { IPreference } from "services/api/types";

// Language options
const LANGUAGE_OPTIONS = [
  { value: "en-us", label: "English" },
  { value: "pt-BR", label: "Português (Brasil)" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
];

interface PreferencesFormProps {
  pref?: IPreference | null;
}

export function PreferencesForm({ pref = null }: PreferencesFormProps) {
  const router = useRouter();

  // Initialize state from pref
  const [reason, setReason] = useState<string>(pref?.reason || "");
  const [quitDate, setQuitDate] = useState<string>(pref?.quit_date || "");
  const [language, setLanguage] = useState<string>(
    pref?.language || LANGUAGE_OPTIONS[0].value
  );

  const [goals, setGoals] = useState<
    { description: string; is_completed: boolean }[] | null
  >(
    pref?.goals.map((g) => ({
      description: g.description,
      is_completed: g.is_completed,
    })) ?? null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddGoal = () =>
    setGoals((prev) => [...prev, { description: "", is_completed: false }]);
  const handleRemoveGoal = (index: number) =>
    setGoals((prev) => prev.filter((_, i) => i !== index));
  const handleGoalChange = (
    index: number,
    field: "description" | "is_completed",
    value: string | boolean
  ) => {
    setGoals((prev) =>
      prev.map((g, i) => (i === index ? { ...g, [field]: value } : g))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const payload = { reason, quit_date: quitDate, language, goals };
      await apiService.updatePreference(payload, {
        headers: { cookie: document.cookie },
      });
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save preferences.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Smoking Cessation Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Reason */}
          <div className="flex flex-col space-y-1">
            <Label htmlFor="reason">Why are you quitting?</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. To improve my health and save money"
            />
          </div>

          {/* Quit Date */}
          <div className="flex flex-col space-y-1">
            <Label htmlFor="quit_date">Planned Quit Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {quitDate
                    ? format(parse(quitDate, "yyyy-MM-dd", new Date()), "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    quitDate
                      ? parse(quitDate, "yyyy-MM-dd", new Date())
                      : undefined
                  }
                  onSelect={(date) =>
                    date && setQuitDate(format(date, "yyyy-MM-dd"))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Language */}
          <div className="flex flex-col space-y-1">
            <Label htmlFor="language">Preferred Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Goals */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Goals & Milestones</Label>
              <Button size="sm" type="button" onClick={handleAddGoal}>
                + Add Goal
              </Button>
            </div>
            <div className="space-y-3">
              {goals.map((goal, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <Textarea
                      placeholder="Describe your goal"
                      value={goal.description}
                      onChange={(e) =>
                        handleGoalChange(index, "description", e.target.value)
                      }
                      className="flex-1"
                    />
                    <div className="flex items-center space-x-2 ml-4">
                      <Checkbox
                        id={`goal-${index}-completed`}
                        checked={goal.is_completed}
                        onCheckedChange={(checked) =>
                          handleGoalChange(index, "is_completed", checked)
                        }
                      />
                      <Label htmlFor={`goal-${index}-completed`}>
                        Completed
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveGoal(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </CardContent>
        <CardFooter>
          <div className="flex justify-end">
            <Button type="submit">Save Preferences</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
