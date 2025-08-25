import { humanize, safeStringify } from "@/lib/chat/stream";
import { AssistantTool } from "services/api/types";
import { TOOL_LABEL } from "utils/constants";

interface Props {
  t: AssistantTool;
}

export function ToolCard({ t }: Props) {
  function labelForTool(name: string) {
    return TOOL_LABEL[name] ?? humanize(name);
  }
  const title = labelForTool(t.name);

  return (
    <details className="rounded-md border bg-muted/30">
      <summary className="cursor-pointer list-none flex items-center justify-between gap-3 p-3">
        <div className="flex items-center gap-2">
          <span className="inline-block h-4 w-4 rounded bg-slate-400" />
          <span className="text-sm font-medium">{title}</span>
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              t.state === "output-available"
                ? "bg-emerald-100 text-emerald-800"
                : t.state === "output-error"
                ? "bg-rose-100 text-rose-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {t.state === "output-available"
              ? "Complete"
              : t.state === "output-error"
              ? "Error"
              : "Running"}
          </span>
        </div>
        <span className="text-slate-500 text-xs">toggle</span>
      </summary>

      <div className="p-3 border-t grid gap-3">
        {t.input !== undefined && (
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1">
              Input
            </div>
            <pre className="text-xs whitespace-pre-wrap break-words bg-white/40 dark:bg-black/20 rounded p-2">
              {safeStringify(t.input)}
            </pre>
          </div>
        )}
        {t.errorText ? (
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1">
              Error
            </div>
            <pre className="text-xs whitespace-pre-wrap break-words bg-rose-50 dark:bg-rose-900/20 text-rose-700 rounded p-2">
              {t.errorText}
            </pre>
          </div>
        ) : t.output !== undefined ? (
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1">
              Output
            </div>
            <pre className="text-xs whitespace-pre-wrap break-words bg-white/40 dark:bg-black/20 rounded p-2">
              {safeStringify(t.output)}
            </pre>
          </div>
        ) : null}
      </div>
    </details>
  );
}
