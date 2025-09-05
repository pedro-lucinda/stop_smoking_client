"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle, Circle, Plus, Target, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { apiService } from "services/api";
import type { IGoal } from "services/api/types";

interface GoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  goals: IGoal[];
  onGoalsUpdate: (updatedGoals: IGoal[]) => void;
}

export function GoalsModal({
  isOpen,
  onClose,
  goals,
  onGoalsUpdate,
}: GoalsModalProps) {
  const [localGoals, setLocalGoals] = useState<IGoal[]>(goals);
  const [updatingGoalId, setUpdatingGoalId] = useState<number | null>(null);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoalDescription, setNewGoalDescription] = useState("");

  // Update local goals when props change
  useEffect(() => {
    setLocalGoals(goals);
  }, [goals]);

  const handleGoalToggle = async (goalIndex: number) => {
    const goal = localGoals[goalIndex];
    const goalId = goal.id || goalIndex;
    setUpdatingGoalId(goalId);

    try {
      const updatedGoals = localGoals.map((g, index) =>
        index === goalIndex ? { ...g, is_completed: !g.is_completed } : g
      );
      setLocalGoals(updatedGoals);

      await apiService.updatePreference(
        { goals: updatedGoals },
        { credentials: "include" }
      );

      onGoalsUpdate?.(updatedGoals);
    } catch (error) {
      console.error("Failed to update goal:", error);
      setLocalGoals(goals);
    } finally {
      setUpdatingGoalId(null);
    }
  };

  const handleAddGoal = async () => {
    if (!newGoalDescription.trim()) return;

    setIsAddingGoal(true);

    try {
      const newGoal: IGoal = {
        description: newGoalDescription.trim(),
        is_completed: false,
      };

      const updatedGoals = [...localGoals, newGoal];
      setLocalGoals(updatedGoals);
      setNewGoalDescription("");

      await apiService.updatePreference(
        { goals: updatedGoals },
        { credentials: "include" }
      );

      onGoalsUpdate?.(updatedGoals);
    } catch (error) {
      console.error("Failed to add goal:", error);
      setLocalGoals(goals);
    } finally {
      setIsAddingGoal(false);
    }
  };

  const handleDeleteGoal = async (goalIndex: number) => {
    const goal = localGoals[goalIndex];
    const goalId = goal.id || goalIndex;
    setUpdatingGoalId(goalId);

    try {
      const updatedGoals = localGoals.filter((_, index) => index !== goalIndex);
      setLocalGoals(updatedGoals);

      await apiService.updatePreference(
        { goals: updatedGoals },
        { credentials: "include" }
      );

      onGoalsUpdate?.(updatedGoals);
    } catch (error) {
      console.error("Failed to delete goal:", error);
      setLocalGoals(goals);
    } finally {
      setUpdatingGoalId(null);
    }
  };

  const handleCancelAddGoal = () => {
    setNewGoalDescription("");
    setIsAddingGoal(false);
  };

  const completedGoals = localGoals.filter((goal) => goal.is_completed).length;
  const totalGoals = localGoals.length;
  const completionPercentage =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Target className="w-6 h-6 text-primary" />
            Goals & Milestones
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/30 ml-auto"
            >
              {completedGoals}/{totalGoals} completed
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {totalGoals > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          )}

          <div className="flex-1 overflow-y-auto space-y-3">
            {isAddingGoal && (
              <div className="flex items-center gap-2 p-4 rounded-lg border border-primary/30 bg-primary/5">
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelAddGoal}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            {localGoals.length === 0 ? (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  No goals set yet. Click "Add Goal" to get started!
                </p>
                <Button onClick={() => setIsAddingGoal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Goal
                </Button>
              </div>
            ) : (
              localGoals.map((goal, index) => (
                <div
                  key={goal.id || index}
                  className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
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
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : goal.is_completed ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => handleGoalToggle(index)}
                  >
                    <p
                      className={`text-base ${
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
              ))
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              size="sm"
              onClick={() => setIsAddingGoal(true)}
              disabled={isAddingGoal}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
