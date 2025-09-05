"use client";
import { SelectField } from "@/components/elements/select-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { CravingCreate, ICraving } from "services/api/types";
import {
  ACTIVITY_OPTIONS,
  COMPANY_OPTIONS,
  FEELING_OPTIONS,
} from "../../../utils/constants";

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
    feeling: initial?.feeling || "none",
    activity: initial?.activity || "none",
    company: initial?.company || "none",
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
        feeling: form.feeling === "none" ? null : form.feeling.trim() || null,
        activity:
          form.activity === "none" ? null : form.activity.trim() || null,
        company: form.company === "none" ? null : form.company.trim() || null,
      };
      await onSubmit(payload);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {err && <p className="text-sm text-destructive">{err}</p>}

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

      <div className="flex items-center gap-2">
        <Checkbox
          id="have_smoked"
          checked={form.have_smoked}
          onCheckedChange={(v) => setForm((s) => ({ ...s, have_smoked: !!v }))}
          disabled={submitting || disabled}
        />
        <Label htmlFor="have_smoked">Smoked</Label>
      </div>

      {form.have_smoked && (
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
      )}

      <SelectField
        id="feeling"
        label="Feeling"
        value={form.feeling}
        options={FEELING_OPTIONS}
        placeholder="Select a feeling"
        onValueChange={(value) => setForm((s) => ({ ...s, feeling: value }))}
        disabled={submitting || disabled}
      />

      <SelectField
        id="activity"
        label="Activity"
        value={form.activity}
        options={ACTIVITY_OPTIONS}
        placeholder="Select an activity"
        onValueChange={(value) => setForm((s) => ({ ...s, activity: value }))}
        disabled={submitting || disabled}
      />

      <SelectField
        id="company"
        label="Company"
        value={form.company}
        options={COMPANY_OPTIONS}
        placeholder="Select company"
        onValueChange={(value) => setForm((s) => ({ ...s, company: value }))}
        disabled={submitting || disabled}
      />

      <div className="flex gap-2 justify-end">
        <Button
          className="text-black"
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
