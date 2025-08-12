import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { IDiary } from "services/api/types";
import { formatDate } from "utils/date/format-date";
import DiaryCreateDialog from "./diary-create-modal";
import DiaryDeleteDialog from "./diary-delete-modal";
import DiaryEditPopover from "./diary-edit-modal";

interface Props {
  date: string;
  diary: IDiary | undefined;
}
export function DiaryEntry({ diary, date }: Props) {
  const [local, setLocal] = useState<IDiary | undefined>(diary);

  const formattedDate = formatDate(date ?? "", "long");
  function handleDeleted() {
    setLocal(undefined);
  }
  const isFuture = new Date(date) > new Date();

  if (!local) {
    return (
      <div className="rounded-xl flex flex-col items-center w-full h-full border p-4">
        No diary for <span className="font-medium">{date}</span>.
        {!isFuture && (
          <DiaryCreateDialog
            date={date}
            onSuccess={(created) => setLocal(created)}
            trigger={<Button>Create</Button>}
          />
        )}
      </div>
    );
  }
  return (
    <div className="rounded-xl flex flex-col items-center w-full h-full border p-4">
      <header className="flex items-center justify-between mb-2 w-full">
        <p className="text-lg ml-auto mr-[-55px] font-bold text-center uppercase  tracking-wide">
          {formattedDate}
        </p>
        <div className="flex items-center gap-2 ml-auto">
          <DiaryEditPopover
            diary={local}
            date={date}
            onSuccess={(u) => setLocal(u)}
            trigger={
              <Button variant="ghost" size="icon" aria-label="Edit diary">
                <Edit className="w-5 h-5" />
              </Button>
            }
          />
          <DiaryDeleteDialog
            diaryId={local.id}
            onSuccess={handleDeleted}
            trigger={
              <Button variant="ghost" size="icon" aria-label="Delete diary">
                <Trash className="w-5 h-5" />
              </Button>
            }
          />
        </div>
      </header>
      <div className="flex flex-col justify-center items-center ">
        <p className="font-bold text-sm">
          Craving Intensity: {local.craving_range ?? 0} / 10
        </p>
        <p className="font-bold text-sm">
          Cravings: {local.number_of_cravings ?? 0}
        </p>
        <p className="font-bold text-sm">
          Cigarettes Smoked: {local.number_of_cigarets_smoked ?? 0}
        </p>
      </div>
      {local.notes && (
        <div className="mt-10 w-full h-full flex flex-col gap-1">
          <p className="font-bold ml-2">Notes:</p>
          <div className="border h-full p-4 rounded-xl">
            <p className="text-sm whitespace-pre-wrap">{local.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}
