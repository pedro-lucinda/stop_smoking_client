import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  body: string;
}

const getCardIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case "progress":
      return "📈";
    case "motivation":
      return "💪";
    case "cravings":
      return "🔥";
    case "ideas":
      return "💡";
    case "recommendations":
      return "🎯";
    default:
      return "✨";
  }
};

const getCardGradient = (title: string) => {
  switch (title.toLowerCase()) {
    case "progress":
      return "from-green-500 to-emerald-600";
    case "motivation":
      return "from-blue-500 to-cyan-600";
    case "cravings":
      return "from-orange-500 to-red-500";
    case "ideas":
      return "from-purple-500 to-pink-500";
    case "recommendations":
      return "from-indigo-500 to-blue-600";
    default:
      return "from-primary to-primary/60";
  }
};

export function MotivationCard({ title, body }: Props) {
  const icon = getCardIcon(title);
  const gradient = getCardGradient(title);

  return (
    <Card
      className="h-full bg-gradient-to-br from-background to-background/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
      role="article"
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, "-")}-title`}
    >
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300",
              gradient
            )}
            aria-hidden="true"
          >
            <span
              className="text-white text-xl"
              role="img"
              aria-label={`${title} icon`}
            >
              {icon}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <CardTitle
                id={`${title.toLowerCase().replace(/\s+/g, "-")}-title`}
                className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300"
              >
                {title}
              </CardTitle>
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs bg-gradient-to-r text-white border-0 px-2 py-1",
                  gradient
                )}
                aria-label={`Category: ${title}`}
              >
                {title}
              </Badge>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-base text-gray-800 leading-7 font-medium mb-0">
                {body}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
