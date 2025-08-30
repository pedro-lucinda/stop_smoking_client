import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ReasonInputProps {
  reason: string;
  setReason: (reason: string) => void;
  isLoading: boolean;
}

export function ReasonInput({
  reason,
  setReason,
  isLoading,
}: ReasonInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="reason pr-1">Why are you quitting?</Label>
      <Textarea
        id="reason"
        rows={5}
        className="scroll-auto h-50"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="e.g. To improve my health and save money"
        disabled={isLoading}
      />
    </div>
  );
}
