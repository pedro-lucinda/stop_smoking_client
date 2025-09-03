"use client";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";
import { apiService } from "services/api";
import type { CravingCreate, ICraving } from "services/api/types";
import { AddCravingModal } from "./add-craving-modal";
import { CravingCard } from "./craving-card";
import { NoCraving } from "./no-craving";

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
    <section className="w-full gap-5 flex flex-col ">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Cravings</h3>
          </div>
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/30"
          >
            {total} entries
          </Badge>
        </div>
        <AddCravingModal date={date} handleCreate={handleCreate} />
      </div>

      {items.length === 0 ? (
        <NoCraving />
      ) : (
        <div className="flex flex-wrap gap-10">
          {items.map((c) => (
            <CravingCard
              key={c.id}
              craving={c}
              date={date}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
