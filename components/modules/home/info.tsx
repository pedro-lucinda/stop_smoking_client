"use client";
import EditPreferenceBtn from "@/components/elements/edit-preference-btn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookOpen, Flame, MessageCircle, Target } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  quitDate: string;
  reason?: string;
}

export function Info({ quitDate, reason }: Props) {
  const router = useRouter();

  const calculateDays = () => {
    const quit = new Date(quitDate);
    const today = new Date();

    // Reset time to start of day for both dates
    const quitStart = new Date(
      quit.getFullYear(),
      quit.getMonth(),
      quit.getDate()
    );
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const diffTime = todayStart.getTime() - quitStart.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = calculateDays();

  return (
    <Card>
      <CardContent>
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
        {reason && (
          <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">Your Reason</p>
            <p className="text-sm text-foreground font-medium">{reason}</p>
          </div>
        )}
        <div className="w-full flex justify-between items-center mt-3">
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => router.push("/cravings")}
              className={cn(
                "h-8 px-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
              )}
              aria-label="Navigate to Cravings page"
            >
              <Flame className="w-4 h-4 mr-1" aria-hidden="true" />
              Cravings
            </Button>
            <Button
              size="sm"
              onClick={() => router.push("/diary")}
              className={cn(
                "h-8 px-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
              )}
              aria-label="Navigate to Diary page"
            >
              <BookOpen className="w-4 h-4 mr-1" aria-hidden="true" />
              Diary
            </Button>
            <Button
              size="sm"
              onClick={() => router.push("/chat")}
              className={cn(
                "h-8 px-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
              )}
              aria-label="Navigate to Chat page"
            >
              <MessageCircle className="w-4 h-4 mr-1" aria-hidden="true" />
              Chat
            </Button>
          </div>
          <EditPreferenceBtn />
        </div>
      </CardContent>
    </Card>
  );
}
