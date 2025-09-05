import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Angry, Plus } from "lucide-react";
import { useState } from "react";
import type { CravingCreate } from "services/api/types";
import { CravingForm } from "./craving-form";

interface Props {
  date: string;
  handleCreate: (payload: CravingCreate) => Promise<void>;
}

export function AddCravingModal({ date, handleCreate }: Props) {
  const [openNew, setOpenNew] = useState(false);
  return (
    <Dialog open={openNew} onOpenChange={setOpenNew}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Craving
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Angry className=" w-4 h-4" />
            New Craving
          </DialogTitle>
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
  );
}
