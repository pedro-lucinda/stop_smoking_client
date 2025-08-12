"use client";

import { useState } from "react";
import { apiService } from "services/api";
import type { DiaryUpdate, IDiary } from "services/api/types";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DiaryForm } from "./diary-form";

interface Props {
  diary: IDiary;
  date: string; // YYYY-MM-DD
  onSuccess?: (updated: IDiary) => void;
  trigger: React.ReactNode; // e.g. <Button><Edit/></Button>
}

export default function DiaryEditPopover({
  diary,
  onSuccess,
  date,
  trigger,
}: Props) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function save(payload: DiaryUpdate) {
    setPending(true);

    try {
      const updated = await apiService.updateDiary(diary.id, payload);
      onSuccess?.(updated);
      setOpen(false);
    } catch (e: any) {
      console.log(String(e?.message || e));
    } finally {
      setPending(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-[360px] p-4">
        <DiaryForm
          date={date}
          onClose={() => setOpen(false)}
          onSave={save as any}
          disabled={pending}
        />
      </PopoverContent>
    </Popover>
  );
}
