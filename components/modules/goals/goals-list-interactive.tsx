"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  Circle,
  ExternalLink,
  Plus,
  Target,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { apiService } from "services/api";
import type { IGoal } from "services/api/types";
import { GoalsModal } from "./goals-modal";

interface GoalsListInteractiveProps {
  goals: IGoal[];
  onGoalsUpdate?: (updatedGoals: IGoal[]) => void;
}

export function GoalsListInteractive({
  goals,
  onGoalsUpdate,
}: GoalsListInteractiveProps) {
  const [localGoals, setLocalGoals] = useState<IGoal[]>(goals);
  const [updatingGoalId, setUpdatingGoalId] = useState<number | null>(null);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update local goals when props change
  useEffect(() => {
    setLocalGoals(goals);
  }, [goals]);

  const handleGoalToggle = useCallback(
    async (goalIndex: number) => {
      const goal = localGoals[goalIndex];

      // Use goal.id if available, otherwise use index as temporary ID
      const goalId = goal.id || goalIndex;
      setUpdatingGoalId(goalId);

      try {
        // Optimistically update the UI
        const updatedGoals = localGoals.map((g, index) =>
          index === goalIndex ? { ...g, is_completed: !g.is_completed } : g
        );
        setLocalGoals(updatedGoals);

        // Update the preference via API
        await apiService.updatePreference(
          { goals: updatedGoals },
          { credentials: "include" }
        );

        // Notify parent component of the update
        onGoalsUpdate?.(updatedGoals);
      } catch (error) {
        console.error("Failed to update goal:", error);
        // Revert the optimistic update on error
        setLocalGoals(goals);
      } finally {
        setUpdatingGoalId(null);
      }
    },
    [localGoals, goals, onGoalsUpdate]
  );

  const handleAddGoal = useCallback(async () => {
    if (!newGoalDescription.trim()) return;

    setIsAddingGoal(true);

    try {
      const newGoal: IGoal = {
        description: newGoalDescription.trim(),
        is_completed: false,
      };

      // Optimistically add the goal
      const updatedGoals = [...localGoals, newGoal];
      setLocalGoals(updatedGoals);
      setNewGoalDescription("");

      // Update the preference via API
      await apiService.updatePreference(
        { goals: updatedGoals },
        { credentials: "include" }
      );

      // Notify parent component of the update
      onGoalsUpdate?.(updatedGoals);
    } catch (error) {
      console.error("Failed to add goal:", error);
      // Revert the optimistic update on error
      setLocalGoals(goals);
    } finally {
      setIsAddingGoal(false);
    }
  }, [newGoalDescription, localGoals, goals, onGoalsUpdate]);

  const handleCancelAddGoal = () => {
    setNewGoalDescription("");
    setIsAddingGoal(false);
  };

  const handleDeleteGoal = useCallback(
    async (goalIndex: number) => {
      const goal = localGoals[goalIndex];
      const goalId = goal.id || goalIndex;
      setUpdatingGoalId(goalId);

      try {
        // Optimistically remove the goal
        const updatedGoals = localGoals.filter(
          (_, index) => index !== goalIndex
        );
        setLocalGoals(updatedGoals);

        // Update the preference via API
        await apiService.updatePreference(
          { goals: updatedGoals },
          { credentials: "include" }
        );

        // Notify parent component of the update
        onGoalsUpdate?.(updatedGoals);
      } catch (error) {
        console.error("Failed to delete goal:", error);
        // Revert the optimistic update on error
        setLocalGoals(goals);
      } finally {
        setUpdatingGoalId(null);
      }
    },
    [localGoals, goals, onGoalsUpdate]
  );

  if (!localGoals || localGoals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-primary" />
              Goals & Milestones
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsModalOpen(true)}
                className="h-8"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                View All
              </Button>
              <Button
                size="sm"
                onClick={() => setIsAddingGoal(true)}
                disabled={isAddingGoal}
                className="h-8"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Goal
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isAddingGoal ? (
            <div className="flex items-center gap-2 p-3 rounded-lg border border-primary/30 bg-primary/5">
              <Input
                placeholder="Enter your new goal..."
                value={newGoalDescription}
                onChange={(e) => setNewGoalDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddGoal();
                  } else if (e.key === "Escape") {
                    handleCancelAddGoal();
                  }
                }}
                autoFocus
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={handleAddGoal}
                disabled={!newGoalDescription.trim()}
              >
                Add
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelAddGoal}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No goals set yet. Click "Add Goal" to get started!
            </p>
          )}
        </CardContent>

        <GoalsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          goals={localGoals}
          onGoalsUpdate={(updatedGoals) => {
            setLocalGoals(updatedGoals);
            onGoalsUpdate?.(updatedGoals);
          }}
        />
      </Card>
    );
  }

  const completedGoals = localGoals.filter((goal) => goal.is_completed).length;
  const totalGoals = localGoals.length;
  const completionPercentage =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-primary" />
            Goals & Milestones
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/30"
            >
              {completedGoals}/{totalGoals} completed
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="h-8"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View All
            </Button>
            <Button
              size="sm"
              onClick={() => setIsAddingGoal(true)}
              disabled={isAddingGoal}
              className="h-8"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Goal
            </Button>
          </div>
        </div>
        {totalGoals > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[100px] overflow-y-auto">
          {isAddingGoal && (
            <div className="flex items-center gap-2 p-3 rounded-lg border border-primary/30 bg-primary/5">
              <Input
                placeholder="Enter your new goal..."
                value={newGoalDescription}
                onChange={(e) => setNewGoalDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddGoal();
                  } else if (e.key === "Escape") {
                    handleCancelAddGoal();
                  }
                }}
                autoFocus
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={handleAddGoal}
                disabled={!newGoalDescription.trim()}
              >
                Add
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelAddGoal}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
          {localGoals.map((goal, index) => (
            <div
              key={goal.id || index}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                goal.is_completed
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div
                className="flex-shrink-0 mt-0.5 cursor-pointer"
                onClick={() => handleGoalToggle(index)}
              >
                {updatingGoalId === (goal.id || index) ? (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : goal.is_completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div
                className="flex-1 cursor-pointer"
                onClick={() => handleGoalToggle(index)}
              >
                <p
                  className={`text-sm ${
                    goal.is_completed
                      ? "text-green-800 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {goal.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteGoal(index);
                  }}
                  disabled={updatingGoalId === (goal.id || index)}
                  className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <GoalsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        goals={localGoals}
        onGoalsUpdate={(updatedGoals) => {
          setLocalGoals(updatedGoals);
          onGoalsUpdate?.(updatedGoals);
        }}
      />
    </Card>
  );
}
