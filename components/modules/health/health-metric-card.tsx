"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  description: string;
  value: number; // 0–100
  className?: string;
  size?: number; // px
  stroke?: number; // px
};

export function HealthMetricCard({
  name,
  description,
  value,
  className,
  size = 60,
  stroke = 10,
}: Props) {
  const pct = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dashArray = `${c} ${c}`;
  const dashOffset = c * (1 - pct / 100);

  return (
    <Card
      className={cn(
        "flex items-center justify-center p-4 w-[200px] h-[200px]",
        className
      )}
    >
      <CardContent className="flex flex-col items-center justify-center gap-3 p-0">
        <div
          className="relative"
          style={{ width: size, height: size }}
          aria-label={`${name} ${pct}%`}
          role="img"
        >
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
              {/* track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="currentColor"
                className="text-muted-foreground/20"
                strokeWidth={stroke}
              />
              {/* progress */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="#2da733"
                className="text-primary"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
              />
            </g>
          </svg>

          <div className="absolute inset-0 grid place-items-center">
            <p className="text-sm font-bold text-green-700 tabular-nums">
              {pct}%
            </p>
          </div>
        </div>

        <p className="text-sm text-center font-bold ">{name}</p>
        <p className="text-xs text-center text-muted-foreground leading-snug">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
