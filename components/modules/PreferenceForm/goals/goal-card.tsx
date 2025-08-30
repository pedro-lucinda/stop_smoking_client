import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface Props {
  goal: {
    description: string;
    is_completed: boolean;
  };
  handleGoalChange: (
    index: number,
    field: "description" | "is_completed",
    value: string | boolean
  ) => void;
  handleRemoveGoal: (index: number) => void;
  isLoading: boolean;
  index: number;
  isCompleted: boolean;
}

export function GoalCard({
  goal,
  handleGoalChange,
  handleRemoveGoal,
  isLoading,
  index,
  isCompleted,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Textarea
        placeholder="Describe your goal"
        value={goal.description}
        onChange={(e) => handleGoalChange(index, "description", e.target.value)}
        className="flex-1"
        disabled={isLoading}
      />

      <Button
        type="button"
        variant="destructive"
        size="icon"
        onClick={() => handleRemoveGoal(index)}
        disabled={isLoading}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
