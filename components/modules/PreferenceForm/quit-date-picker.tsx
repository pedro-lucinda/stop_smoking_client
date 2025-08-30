import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface Props {
  quitDate: string;
  setQuitDate: (date: string) => void;
  isLoading: boolean;
}

export function QuitDatePicker({ quitDate, setQuitDate, isLoading }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="quit_date">Planned Quit Date</Label>
      <Popover>
        <PopoverTrigger asChild disabled={isLoading}>
          <Button
            variant="outline"
            className="w-[200px] justify-start"
            disabled={isLoading}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {quitDate
              ? format(parse(quitDate, "yyyy-MM-dd", new Date()), "PPP")
              : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white dark:bg-black"
          align="start"
        >
          <Calendar
            mode="single"
            selected={
              quitDate ? parse(quitDate, "yyyy-MM-dd", new Date()) : undefined
            }
            onSelect={(date) => date && setQuitDate(format(date, "yyyy-MM-dd"))}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
