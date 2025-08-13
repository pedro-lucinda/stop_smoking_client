"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Award } from "lucide-react";
import type { IBadge } from "services/api/types";

function fmt(d?: string) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export type Props = {
  badge: IBadge;
  className?: string;
  showDate?: boolean; // uses created_at
  onClick?: () => void;
};

export function BadgeItem({
  badge,
  className,
  showDate,
  onClick,
}: {
  badge: IBadge & { image?: string | null; icon?: string | null }; // tolerate both
  className?: string;
  showDate?: boolean;
  onClick?: () => void;
}) {
  const src = badge.image ?? badge.icon ?? null;

  const body = (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-ring",
        className
      )}
      title={badge.description ?? badge.name}
      aria-label={badge.name}
    >
      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-muted grid place-items-center">
        <img
          src={src as string}
          alt={badge.name}
          className="object-cover w-10 h-10"
        />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-1">
          <Award className="h-4 w-4 opacity-70" aria-hidden />
          <span className="truncate font-medium">{badge.name}</span>
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {badge.description ?? "No description"}
        </div>
        {showDate && badge.created_at ? (
          <div className="mt-0.5 text-[11px] text-muted-foreground/80">
            Earned {fmt(badge.created_at)}
          </div>
        ) : null}
      </div>
    </button>
  );

  return badge.description ? (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>{body}</TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm font-medium">{badge.name}</p>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    body
  );
}
