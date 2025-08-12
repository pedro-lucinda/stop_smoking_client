import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { DiaryCreate, DiaryUpdate, IDiary } from "services/api/types";

interface Props {
  diary?: IDiary;
  date: string;
  onSave: (payload: DiaryCreate | DiaryUpdate) => void;
  onClose: () => void;
  disabled?: boolean;
}
type FormState = {
  notes: string;
  have_smoked: boolean;
  craving_range: number;
  number_of_cravings: number;
  number_of_cigarets_smoked: number;
};

export function DiaryForm({ diary, date, onClose, onSave, disabled }: Props) {
  const [form, setForm] = useState<FormState>(() => ({
    notes: diary?.notes ?? "",
    have_smoked: !!diary?.have_smoked,
    craving_range: diary?.craving_range ?? 0,
    number_of_cravings: diary?.number_of_cravings ?? 0,
    number_of_cigarets_smoked: diary?.number_of_cigarets_smoked ?? 0,
  }));

  const set =
    <K extends keyof FormState>(k: K) =>
    (v: FormState[K]) =>
      setForm((s) => ({ ...s, [k]: v }));

  const setNum =
    <K extends keyof FormState>(k: K) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((s) => ({ ...s, [k]: Number(e.target.value || 0) as any }));

  function handleSave() {
    const payload: DiaryCreate | DiaryUpdate = {
      date,
      ...form,
    };
    onSave(payload);
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">{date}</div>

      <div className="grid gap-2">
        <Label htmlFor={`craving-${diary?.id ?? date}`}>
          Craving Intensity (0–10)
        </Label>
        <Input
          value={form.craving_range}
          onChange={setNum("craving_range")}
          min={0}
          max={10}
          type="number"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`cravings-${diary?.id ?? date}`}>
          Number of cravings
        </Label>
        <Input
          value={form.number_of_cravings}
          onChange={setNum("number_of_cravings")}
          type="number"
          min={0}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`cigs-${diary?.id ?? date}`}>Cigarettes smoked</Label>
        <Input
          value={form.number_of_cigarets_smoked}
          onChange={setNum("number_of_cigarets_smoked")}
          type="number"
          min={0}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={form.have_smoked}
          onCheckedChange={(v) => set("have_smoked")(!!v)}
        />

        <Label htmlFor={`smoked-${diary?.id ?? date}`}>Smoked this day</Label>
      </div>

      <div className="grid gap-2">
        <Label htmlFor={`notes-${diary?.id ?? date}`}>Notes</Label>
        <Textarea
          value={form.notes}
          onChange={(e) => set("notes")(e.target.value)}
        />
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
        <Button type="button" onClick={handleSave} disabled={disabled}>
          {disabled ? "Saving…" : "Save"}
        </Button>
      </div>
    </div>
  );
}
