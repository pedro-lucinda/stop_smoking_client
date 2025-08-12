"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { apiService } from "services/api";

export default function DiaryDeleteDialog({
  diaryId,
  trigger,
  onSuccess,
}: {
  diaryId: number;
  trigger: React.ReactNode; // e.g. <Button size="icon"><Trash/></Button>
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState<string>();

  async function confirm() {
    setPending(true);
    setErr(undefined);
    try {
      await apiService.deleteDiary(diaryId, { credentials: "include" });
      onSuccess?.();
      setOpen(false);
    } catch (e: any) {
      setErr(String(e?.message || e));
    } finally {
      setPending(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete diary?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Entry ID {diaryId}.
            {err && <div className="mt-2 text-red-600 text-xs">{err}</div>}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirm} disabled={pending}>
            {pending ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
