/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { CravingCreate, ICraving } from "services/api/types";

type Props = {
  date: string; // YYYY-MM-DD
  initial?: ICraving;
  onSubmit: (payload: CravingCreate) => Promise<void> | void;
  onCancel: () => void;
  disabled?: boolean;
};

type FormState = {
  comments: string;
  have_smoked: boolean;
  desire_range: number | "";
  number_of_cigarets_smoked: number | "";
  feeling: string;
  activity: string;
  company: string;
};

export function CravingForm({
  date,
  initial,
  onSubmit,
  onCancel,
  disabled,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>(() => ({
    comments: initial?.comments ?? "",
    have_smoked: initial?.have_smoked ?? false,
    desire_range: initial?.desire_range ?? 0,
    number_of_cigarets_smoked: initial?.number_of_cigarets_smoked ?? 0,
    feeling: initial?.feeling ?? "",
    activity: initial?.activity ?? "",
    company: initial?.company ?? "",
  }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setSubmitting(true);
    try {
      const payload: CravingCreate = {
        date,
        comments: form.comments.trim(),
        have_smoked: !!form.have_smoked,
        desire_range:
          form.desire_range === "" ? null : Number(form.desire_range),
        number_of_cigarets_smoked:
          form.number_of_cigarets_smoked === ""
            ? null
            : Number(form.number_of_cigarets_smoked),
        feeling: form.feeling.trim() || null,
        activity: form.activity.trim() || null,
        company: form.company.trim() || null,
      };
      await onSubmit(payload);
    } catch (e: any) {
      setErr(e.message || "Save failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {err && <p className="text-sm text-red-600">{err}</p>}

      <div className="grid gap-1">
        <Label htmlFor="comments">Comments</Label>
        <Textarea
          id="comments"
          value={form.comments}
          onChange={(e) => setForm((s) => ({ ...s, comments: e.target.value }))}
          disabled={submitting || disabled}
          required
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="desire_range">Desire (0–10)</Label>
        <Input
          id="desire_range"
          type="number"
          min={0}
          max={10}
          value={form.desire_range}
          onChange={(e) =>
            setForm((s) => ({
              ...s,
              desire_range: e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
          disabled={submitting || disabled}
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="number_of_cigarets_smoked">Cigarettes smoked</Label>
        <Input
          id="number_of_cigarets_smoked"
          type="number"
          min={0}
          value={form.number_of_cigarets_smoked}
          onChange={(e) =>
            setForm((s) => ({
              ...s,
              number_of_cigarets_smoked:
                e.target.value === "" ? "" : Number(e.target.value),
            }))
          }
          disabled={submitting || disabled}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="have_smoked"
          checked={form.have_smoked}
          onCheckedChange={(v) => setForm((s) => ({ ...s, have_smoked: !!v }))}
          disabled={submitting || disabled}
        />
        <Label htmlFor="have_smoked">Smoked</Label>
      </div>

      <div className="grid gap-1">
        <Label htmlFor="feeling">Feeling</Label>
        <Input
          id="feeling"
          value={form.feeling}
          onChange={(e) => setForm((s) => ({ ...s, feeling: e.target.value }))}
          disabled={submitting || disabled}
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="activity">Activity</Label>
        <Input
          id="activity"
          value={form.activity}
          onChange={(e) => setForm((s) => ({ ...s, activity: e.target.value }))}
          disabled={submitting || disabled}
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={form.company}
          onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
          disabled={submitting || disabled}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting || disabled}>
          {initial ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
}
