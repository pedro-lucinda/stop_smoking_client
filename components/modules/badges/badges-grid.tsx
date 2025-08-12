import { IBadge } from "services/api/types";
import { BadgeItem } from "./badge";
import { cn } from "@/lib/utils";

export type Props = {
  badges: IBadge[];
  showDate?: boolean;
  emptyText?: string;
  className?: string;
};


export function BadgesGrid({
  badges,
  showDate,
  emptyText = "No badges yet.",
  className,
}: Props) {
  if (!badges?.length) {
    return <p className="text-sm text-muted-foreground">{emptyText}</p>;
  }
  return (
    <ul
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
        className
      )}
    >
      {badges.map((b) => (
        <li key={b.id}>
          <BadgeItem badge={b} showDate={showDate} />
        </li>
      ))}
    </ul>
  );
}
