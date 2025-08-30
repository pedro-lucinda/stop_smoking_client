/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useId, useState } from "react";
import type { DiaryCreate, DiaryUpdate, IDiary } from "services/api/types";

type FormState = {
  notes: string;
  have_smoked: boolean;
  craving_range: number; // 0..10
  number_of_cravings: number; // >=0
  number_of_cigarets_smoked: number; // >=0
};

export function DiaryForm({
  diary,
  date,
  onSave,
  onClose,
  disabled,
}: {
  diary?: IDiary;
  date: string;
  onSave: (payload: DiaryCreate | DiaryUpdate) => void;
  onClose: () => void;
  disabled?: boolean;
}) {
  const uid = useId();

  const [form, setForm] = useState<FormState>(() => ({
    notes: diary?.notes ?? "",
    have_smoked: !!diary?.have_smoked,
    craving_range: diary?.craving_range ?? 0,
    number_of_cravings: diary?.number_of_cravings ?? 0,
    number_of_cigarets_smoked: diary?.number_of_cigarets_smoked ?? 0,
  }));

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState | "date", string>>
  >({});

  const set =
    <K extends keyof FormState>(k: K) =>
    (v: FormState[K]) =>
      setForm((s) => ({ ...s, [k]: v }));

  const setNum =
    <K extends keyof FormState>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const n = e.target.value === "" ? 0 : Number(e.target.value);
      setForm(
        (s) => ({ ...s, [k]: Number.isFinite(n) ? Math.trunc(n) : 0 } as any)
      );
    };

  function validate(): boolean {
    const next: Partial<Record<keyof FormState | "date", string>> = {};

    if (
      !Number.isFinite(form.craving_range) ||
      form.craving_range < 0 ||
      form.craving_range > 10
    ) {
      next.craving_range = "Craving must be between 0 and 10.";
    }
    if (
      !Number.isInteger(form.number_of_cravings) ||
      form.number_of_cravings < 0
    ) {
      next.number_of_cravings = "Cravings must be a non-negative integer.";
    }
    if (
      form.have_smoked &&
      (!Number.isInteger(form.number_of_cigarets_smoked) ||
        form.number_of_cigarets_smoked < 0)
    ) {
      next.number_of_cigarets_smoked =
        "Cigarettes must be a non-negative integer.";
    }
    if (!form.notes.trim()) next.notes = "Notes are required.";
    if (form.notes.length > 2000) next.notes = "Notes too long.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const base = {
      notes: form.notes.trim() || undefined,
      have_smoked: !!form.have_smoked,
      craving_range: Math.min(Math.max(Math.round(form.craving_range), 0), 10),
      number_of_cravings: Math.max(Math.round(form.number_of_cravings), 0),
      number_of_cigarets_smoked: Math.max(
        Math.round(form.number_of_cigarets_smoked),
        0
      ),
    };

    if (!diary) {
      const payload: DiaryCreate = { date, ...base };
      onSave(payload);
      return;
    }

    const diff: DiaryUpdate = {};
    if ((diary.notes ?? "") !== (base.notes ?? "")) diff.notes = base.notes;
    if (!!diary.have_smoked !== base.have_smoked)
      diff.have_smoked = base.have_smoked;
    if ((diary.craving_range ?? 0) !== base.craving_range)
      diff.craving_range = base.craving_range;
    if ((diary.number_of_cravings ?? 0) !== base.number_of_cravings)
      diff.number_of_cravings = base.number_of_cravings;
    if (
      (diary.number_of_cigarets_smoked ?? 0) !== base.number_of_cigarets_smoked
    )
      diff.number_of_cigarets_smoked = base.number_of_cigarets_smoked;

    onSave(diff);
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="text-sm font-medium">{date}</div>

      <div className="grid gap-2">
        <Label htmlFor={`${uid}-craving`}>Craving Intensity (0–10)</Label>
        <Input
          id={`${uid}-craving`}
          value={form.craving_range}
          onChange={setNum("craving_range")}
          min={0}
          max={10}
          step={1}
          inputMode="numeric"
          type="number"
          aria-invalid={!!errors.craving_range}
        />
        {errors.craving_range && (
          <p className="text-xs text-destructive">{errors.craving_range}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`${uid}-cravings`}>Number of cravings</Label>
        <Input
          id={`${uid}-cravings`}
          value={form.number_of_cravings}
          onChange={setNum("number_of_cravings")}
          type="number"
          inputMode="numeric"
          min={0}
          step={1}
          aria-invalid={!!errors.number_of_cravings}
        />
        {errors.number_of_cravings && (
          <p className="text-xs text-destructive">
            {errors.number_of_cravings}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id={`${uid}-smoked`}
          checked={form.have_smoked}
          onCheckedChange={(v) => set("have_smoked")(!!v)}
        />
        <Label htmlFor={`${uid}-smoked`}>Smoked this day</Label>
      </div>

      {form.have_smoked && (
        <div className="grid gap-2">
          <Label htmlFor={`${uid}-cigs`}>Cigarettes smoked</Label>
          <Input
            id={`${uid}-cigs`}
            value={form.number_of_cigarets_smoked}
            onChange={setNum("number_of_cigarets_smoked")}
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            aria-invalid={!!errors.number_of_cigarets_smoked}
          />
          {errors.number_of_cigarets_smoked && (
            <p className="text-xs text-destructive">
              {errors.number_of_cigarets_smoked}
            </p>
          )}
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor={`${uid}-notes`}>Notes</Label>
        <Textarea
          id={`${uid}-notes`}
          value={form.notes}
          onChange={(e) => set("notes")(e.target.value)}
          rows={4}
          required
          aria-invalid={!!errors.notes}
          className=" overflow-y-auto h-40 resize-none"
        />
        {errors.notes && (
          <p className="text-xs text-destructive">{errors.notes}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={disabled}>
          {disabled ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  );
}
