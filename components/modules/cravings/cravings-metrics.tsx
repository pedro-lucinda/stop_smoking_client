import { Badge } from "@/components/ui/badge";
import { Activity, Cigarette, Heart, Users } from "lucide-react";
import type { ICraving } from "services/api/types";

interface Props {
  craving: ICraving;
}

export function CravingsMetrics({ craving }: Props) {
  const getDesireColor = (desire: number) => {
    if (desire >= 8)
      return "bg-destructive/20 text-destructive border-destructive/30";
    if (desire >= 6)
      return "bg-orange-500/20 text-orange-600 border-orange-500/30";
    if (desire >= 4)
      return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
    return "bg-primary/20 text-primary border-primary/30";
  };

  return (
    <div className="space-y-3">
      {/* Metrics row */}
      <div className="flex items-center gap-3 flex-wrap">
        <Badge
          variant="outline"
          className={getDesireColor(craving.desire_range ?? 0)}
        >
          <Heart className="w-3 h-3 mr-1" />
          Desire {craving.desire_range ?? 0}/10
        </Badge>

        <Badge
          variant="outline"
          className={
            craving.have_smoked
              ? "bg-destructive/20 text-destructive border-destructive/30"
              : "bg-primary/20 text-primary border-primary/30"
          }
        >
          <Cigarette className="w-3 h-3 mr-1" />
          {craving.have_smoked ? "Smoked" : "Resisted"}
        </Badge>

        {typeof craving.number_of_cigarets_smoked === "number" &&
          craving.number_of_cigarets_smoked > 0 && (
            <Badge
              variant="outline"
              className="bg-destructive/20 text-destructive border-destructive/30"
            >
              {craving.number_of_cigarets_smoked} cigs
            </Badge>
          )}
      </div>

      {/* Additional details */}
      {(craving.feeling || craving.activity || craving.company) && (
        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
          {craving.feeling && (
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span>{craving.feeling}</span>
            </div>
          )}
          {craving.activity && (
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3" />
              <span>{craving.activity}</span>
            </div>
          )}
          {craving.company && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{craving.company}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
