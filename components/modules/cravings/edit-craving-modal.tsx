import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import type { CravingCreate, ICraving } from "services/api/types";
import { CravingForm } from "./craving-form";

type Props = {
  editing: ICraving | null;
  setEditing: (v: ICraving | null) => void;
  c: ICraving;
  date: string;
  handleUpdate: (id: number, payload: CravingCreate) => Promise<void>;
};

export function EditCravingModal({
  editing,
  setEditing,
  c,
  date,
  handleUpdate,
}: Props) {
  const [open, setOpen] = useState(false);

  // Sync open state with editing state
  useEffect(() => {
    setOpen(editing?.id === c.id);
  }, [editing, c.id]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setEditing(null);
    }
  };

  const handleSubmit = async (payload: CravingCreate) => {
    await handleUpdate(c.id, payload);
    setEditing(null);
    setOpen(false);
  };

  const handleCancel = () => {
    setEditing(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 hover:bg-primary/10"
          onClick={() => setEditing(c)}
        >
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Craving</DialogTitle>
        </DialogHeader>
        {editing && (
          <CravingForm
            date={date}
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
