import { Spinner } from "@/components/ui/kibo-ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?:
    | "default"
    | "circle"
    | "pinwheel"
    | "circle-filled"
    | "ellipsis"
    | "ring"
    | "bars"
    | "infinite";
  className?: string;
  text?: string;
}

export function Loading({
  size = "md",
  variant = "ring",
  className = "",
  text,
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        className
      )}
    >
      <Spinner variant={variant} className={sizeClasses[size]} />
      {text && (
        <p
          className="text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          {text}
        </p>
      )}
    </div>
  );
}

// Page-level loading component
export function PageLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <Loading size="lg" text={text} />
    </div>
  );
}

// Section-level loading component
export function SectionLoading({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-8">
      <Loading size="md" text={text} />
    </div>
  );
}
