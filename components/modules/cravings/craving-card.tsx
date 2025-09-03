import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { useState } from "react";
import type { CravingCreate, ICraving } from "services/api/types";
import { CravingsMetrics } from "./cravings-metrics";
import { EditCravingModal } from "./edit-craving-modal";

interface Props {
  craving: ICraving;
  date: string;
  handleUpdate: (id: number, payload: CravingCreate) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
}

export function CravingCard({
  craving,
  date,
  handleUpdate,
  handleDelete,
}: Props) {
  const [editing, setEditing] = useState<ICraving | null>(null);

  return (
    <Card
      key={craving.id}
      className="bg-gradient-to-br from-card to-secondary/30 hover:shadow-lg transition-all duration-300 max-w-[350px] w-full"
    >
      <CardContent className="">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Main content */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {craving.comments}
              </p>
              {/* Metrics row */}
              <CravingsMetrics craving={craving} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <EditCravingModal
              editing={editing}
              setEditing={setEditing}
              c={craving}
              date={date}
              handleUpdate={handleUpdate}
            />
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => handleDelete(craving.id)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
