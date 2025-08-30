import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGE_OPTIONS } from "utils/constants";

interface Props {
  language: string;
  setLanguage: (language: string) => void;
  isLoading: boolean;
}

export function LanguagePicker({ language, setLanguage, isLoading }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="language">Preferred Language</Label>
      <Select value={language} onValueChange={setLanguage} disabled={isLoading}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-black">
          {LANGUAGE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
