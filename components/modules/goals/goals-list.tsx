import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle, Target } from "lucide-react";
import type { IGoal } from "services/api/types";

interface GoalsListProps {
  goals: IGoal[];
}

export function GoalsList({ goals }: GoalsListProps) {
  if (!goals || goals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="w-5 h-5 text-primary" />
            Goals & Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No goals set yet. Set your goals in preferences to track your
            progress!
          </p>
        </CardContent>
      </Card>
    );
  }

  const completedGoals = goals.filter((goal) => goal.is_completed).length;
  const totalGoals = goals.length;
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
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/30"
          >
            {completedGoals}/{totalGoals} completed
          </Badge>
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
        <div className="space-y-3">
          {goals.map((goal, index) => (
            <div
              key={goal.id || index}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                goal.is_completed
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {goal.is_completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
