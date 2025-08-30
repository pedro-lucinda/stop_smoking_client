import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  body: string;
}

export function MotivationCard({ title, body }: Props) {
  return (
    <Card className="h-full bg-background border-primary/20 gap-2 text-foreground shadow-none">
      <CardContent className="p-6">
        <CardTitle className="text-lg font-bold text-primary">
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">
          {body}
        </p>
      </CardContent>
    </Card>
  );
}
