"use client";
import { CravingsEntry } from "@/components/modules/cravings/cravings-entry";
import DiaryCalendar from "@/components/modules/diary/diary-calendar";
import { useCallback, useEffect, useState } from "react";
import { apiService } from "services/api";
import type { ICraving } from "services/api/types";

interface CravingsContentProps {
  initialDate?: string;
}

export function CravingsContent({ initialDate }: CravingsContentProps) {
  const [date, setDate] = useState<string>(
    initialDate || new Date().toISOString().split("T")[0]
  );
  const [items, setItems] = useState<ICraving[]>([]);
  const [total, setTotal] = useState(0);

  const load = useCallback(async (d: string) => {
    try {
      const { cravings, total } = await apiService.getCravings(
        { day: d, skip: 0, limit: 200 },
        { credentials: "include" }
      );
      setItems(cravings);
      setTotal(total);
    } catch (e: unknown) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    load(date);
  }, [date, load]);

  return (
    <section className="flex-1 w-full flex flex-col overflow-y-auto py-10 ">
      <div className="flex flex-col gap-5 w-full max-w-3xl mx-auto">
        <div className="flex flex-col gap-1 ">
          <h1 className=" font-bold text-center text-2xl">Cravings</h1>
          <p className="text-center text-sm text-blue-900">
            Here you can track your cravings.
            <br />
            Track your cravings to help you stay on track.
          </p>
        </div>
        <DiaryCalendar selected={date} onSelect={setDate} />
        <div className="flex w-full h-full ">
          <CravingsEntry
            key={date}
            date={date}
            items={items}
            total={total}
            setItems={setItems}
            setTotal={setTotal}
          />
        </div>
      </div>
    </section>
  );
}
