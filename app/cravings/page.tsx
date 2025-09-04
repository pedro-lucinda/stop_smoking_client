/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CravingsEntry } from "@/components/modules/cravings/cravings-entry";
import DiaryCalendar from "@/components/modules/diary/diary-calendar";
import { Spinner } from "@/components/ui/kibo-ui/spinner";
import { useCallback, useEffect, useState } from "react";
import { apiService } from "services/api";
import type { ICraving } from "services/api/types";

export default function CravingsPage() {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [items, setItems] = useState<ICraving[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (d: string, signal?: AbortSignal) => {
    setLoading(true);
    try {
      const { cravings, total } = await apiService.getCravings(
        { day: d, skip: 0, limit: 200 },
        { signal, credentials: "include" }
      );
      setItems(cravings);
      setTotal(total);
    } catch (e: any) {
      console.error(e);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    load(date, ac.signal);
    return () => ac.abort();
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
        {loading ? (
          <Spinner variant="ring" className="w-6 h-6 mx-auto" />
        ) : (
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
        )}
      </div>
    </section>
  );
}
