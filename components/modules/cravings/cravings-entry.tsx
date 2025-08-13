"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { apiService } from "services/api";
import type { ICraving, CravingCreate } from "services/api/types";
import { CravingForm } from "./craving-form";

type Props = {
  date: string;
  items: ICraving[];
  total: number;
  setItems: (fn: (prev: ICraving[]) => ICraving[]) => void;
  setTotal: (fn: (prev: number) => number) => void;
};

export function CravingsEntry({
  date,
  items,
  total,
  setItems,
  setTotal,
}: Props) {
  const [openNew, setOpenNew] = useState(false);
  const [editing, setEditing] = useState<ICraving | null>(null);

  async function handleCreate(payload: CravingCreate) {
    const created = await apiService.createCraving(payload);
    setItems((prev) => [created, ...prev]);
    setTotal((t) => t + 1);
  }

  async function handleUpdate(id: number, payload: CravingCreate) {
    const updated = await apiService.updateCraving(id, payload);
    setItems((prev) => prev.map((c) => (c.id === id ? updated : c)));
  }

  async function handleDelete(id: number) {
    await apiService.deleteCraving(id);
    setItems((prev) => prev.filter((c) => c.id !== id));
    setTotal((t) => Math.max(0, t - 1));
  }

  return (
    <section className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Cravings on {date} ({total})
        </h3>
        <Dialog open={openNew} onOpenChange={setOpenNew}>
          <DialogTrigger asChild>
            <Button size="sm">Add craving</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New craving</DialogTitle>
            </DialogHeader>
            <CravingForm
              date={date}
              onSubmit={async (p) => {
                await handleCreate(p);
                setOpenNew(false);
              }}
              onCancel={() => setOpenNew(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No cravings for this day.
        </p>
      ) : (
        <ul className="divide-y rounded-xl border">
          {items.map((c) => (
            <li
              key={c.id}
              className="p-3 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="text-sm font-medium">
                  {c.comments}
                  <span className="ml-2 text-xs text-muted-foreground">
                    Desire {c.desire_range ?? 0}/10 · Smoked{" "}
                    {c.have_smoked ? "yes" : "no"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground space-x-2">
                  {c.feeling ? <span>Feeling: {c.feeling}</span> : null}
                  {c.activity ? <span>Activity: {c.activity}</span> : null}
                  {c.company ? <span>Company: {c.company}</span> : null}
                  {typeof c.number_of_cigarets_smoked === "number" ? (
                    <span>Cigs: {c.number_of_cigarets_smoked}</span>
                  ) : null}
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog
                  open={editing?.id === c.id}
                  onOpenChange={(v) => !v && setEditing(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditing(c)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit craving</DialogTitle>
                    </DialogHeader>
                    {editing && (
                      <CravingForm
                        date={date}
                        initial={editing}
                        onSubmit={async (p) => {
                          await handleUpdate(c.id, p);
                          setEditing(null);
                        }}
                        onCancel={() => setEditing(null)}
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
