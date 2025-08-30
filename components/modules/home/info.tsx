import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";

interface Props {
  quitDate: string;
}

export function Info({ quitDate }: Props) {
  const calculateDays = () => {
    const quit = new Date(quitDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - quit.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = calculateDays();

  return (
    <Card className="bg-gradient-to-br from-card to-secondary/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quit Date</p>
              <p className="text-sm font-semibold text-foreground">
                {quitDate}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Days Smoke-Free</p>
            <span className="text-2xl font-bold text-primary">{days}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
