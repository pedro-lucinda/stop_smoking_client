import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cigarette, Edit, Flame, Target, Trash } from "lucide-react";
import { useState } from "react";
import { IDiary } from "services/api/types";
import { formatDate } from "utils/date/format-date";
import DiaryCreateDialog from "./diary-create-modal";
import DiaryDeleteDialog from "./diary-delete-modal";
import DiaryEditPopover from "./diary-edit-modal";

interface Props {
  date: string;
  diary: IDiary | undefined;
}
export function DiaryEntry({ diary, date }: Props) {
  const [local, setLocal] = useState<IDiary | undefined>(diary);

  function handleDeleted() {
    setLocal(undefined);
  }
  const isFuture = new Date(date) > new Date();

  if (!local) {
    return (
      <Card className="h-full bg-gradient-to-br w-full from-card to-secondary/30 border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-4 p-6 h-full">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No diary for{" "}
              <span className="font-medium text-foreground">
                {formatDate(date)}
              </span>
            </p>
          </div>
          {!isFuture && (
            <DiaryCreateDialog
              date={date}
              onSuccess={(created) => setLocal(created)}
              trigger={
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Create Entry
                </Button>
              }
            />
          )}
        </CardContent>
      </Card>
    );
  }

  const cravingIntensity = local.craving_range ?? 0;
  const cravings = local.number_of_cravings ?? 0;
  const cigarettes = local.number_of_cigarets_smoked ?? 0;

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 8)
      return "bg-destructive/20 text-destructive border-destructive/30";
    if (intensity >= 6)
      return "bg-orange-500/20 text-orange-600 border-orange-500/30";
    if (intensity >= 4)
      return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
    return "bg-primary/20 text-primary border-primary/30";
  };

  return (
    <Card className="h-full w-full bg-gradient-to-br from-card to-secondary/30 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            {formatDate(date)}
          </h3>
          <div className="flex items-center gap-1">
            <DiaryEditPopover
              diary={local}
              date={date}
              onSuccess={(u) => setLocal(u)}
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-primary/10"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              }
            />
            <DiaryDeleteDialog
              diaryId={local.id}
              onSuccess={handleDeleted}
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              }
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Craving Intensity</span>
            </div>
            <Badge
              variant="outline"
              className={getIntensityColor(cravingIntensity)}
            >
              {cravingIntensity}/10
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Cravings</span>
            </div>
            <Badge
              variant="outline"
              className="bg-primary/20 text-primary border-primary/30"
            >
              {cravings}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              <Cigarette className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium">Cigarettes Smoked</span>
            </div>
            <Badge
              variant="outline"
              className="bg-destructive/20 text-destructive border-destructive/30"
            >
              {cigarettes}
            </Badge>
          </div>
        </div>

        {/* Notes Section */}
        {local.notes && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary" />
              Notes
            </h4>
            <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {local.notes}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
