/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Spinner } from "@/components/ui/kibo-ui/spinner";
import { useCallback, useEffect, useState } from "react";
import { apiService } from "services/api";
import type { IDiary } from "services/api/types";
import DiaryCalendar from "./diary-calendar";
import { DiaryEntry } from "./diary-entry";

export default function DiaryContainer() {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [currentDairy, setCurrentDiary] = useState<IDiary>();
  const [loading, setLoading] = useState(true);

  const fetchDiaryByDate = useCallback(
    async (d: string, signal?: AbortSignal) => {
      setLoading(true);
      try {
        const { diaries } = await apiService.getDiaries(
          { date: d, skip: 0, limit: 1 },
          { signal, credentials: "include" }
        );
        const dairy = diaries[0];
        setCurrentDiary(dairy);
      } catch (e: any) {
        console.log(e);
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const ac = new AbortController();
    fetchDiaryByDate(date, ac.signal);
    return () => ac.abort();
  }, [date, fetchDiaryByDate]);

  return (
    <div className="flex flex-col gap-10 w-full h-full">
      <DiaryCalendar selected={date} onSelect={setDate} />
      {loading ? (
        <Spinner variant="ring" className="w-6 h-6 mx-auto" />
      ) : (
        <div className="flex w-full h-full">
          <DiaryEntry
            key={currentDairy?.id ?? date}
            diary={currentDairy}
            date={date}
          />
        </div>
      )}
    </div>
  );
}
