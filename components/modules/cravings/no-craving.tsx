import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

export function NoCraving() {
  return (
    <Card className="bg-gradient-to-br from-card to-secondary/30 border-dashed">
      <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
            <Flame className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            No cravings recorded for this day
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
