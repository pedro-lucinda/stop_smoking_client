"use client";
import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from "@/components/ui/kibo-ui/mini-calendar";
import { sameDay, toYMD } from "utils/date/dates";


export default function DiaryCalendar({
  selected,
  onSelect,
}: {
  selected: string; // YYYY-MM-DD
  onSelect: (d: string) => void;
}) {
  const sel = new Date(selected);

  return (
    <div className="w-fit mx-auto">
      <MiniCalendar>
        <MiniCalendarNavigation direction="prev" />
        <MiniCalendarDays>
          {(day: Date) => (
            <div
              key={day.getTime()}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(toYMD(day))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect(toYMD(day));
              }}
              className={
                sameDay(day, sel) ? "ring-2 ring-primary rounded-md" : ""
              }
            >
              <MiniCalendarDay date={day} />
            </div>
          )}
        </MiniCalendarDays>
        <MiniCalendarNavigation direction="next" />
      </MiniCalendar>
    </div>
  );
}
