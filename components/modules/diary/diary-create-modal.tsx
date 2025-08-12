/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { apiService } from "services/api";
import type { DiaryCreate, IDiary } from "services/api/types";
import { DiaryForm } from "./diary-form";

export default function DiaryCreateDialog({
  date,
  trigger,
  onSuccess,
}: {
  date: string; // YYYY-MM-DD
  trigger: React.ReactNode;
  onSuccess?: (created: IDiary) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function create(payload: DiaryCreate) {
    setPending(true);

    try {
      const created = await apiService.createDiary(payload, {
        credentials: "include",
      });
      onSuccess?.(created);
      setOpen(false);
    } catch (e: any) {
      console.log(String(e?.message || e));
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Create diary · {date}</DialogTitle>
        </DialogHeader>
        <DiaryForm
          date={date}
          onClose={() => setOpen(false)}
          onSave={create as any}
          disabled={pending}
        />
      </DialogContent>
    </Dialog>
  );
}
