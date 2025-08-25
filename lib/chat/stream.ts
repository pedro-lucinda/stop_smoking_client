import { ChatEvent, ChatMessage } from "services/api/types";

export function toHeaderObj(h?: HeadersInit): Record<string, string> {
  if (!h) return {};
  if (h instanceof Headers) {
    const o: Record<string, string> = {};
    h.forEach((v, k) => (o[k] = v));
    return o;
  }
  if (Array.isArray(h)) return Object.fromEntries(h) as Record<string, string>;
  return { ...(h as Record<string, string>) };
}

async function streamChat(
  endpoint: (id: string) => string,
  threadId: string,
  headers: HeadersInit,
  content: string,
  signal: AbortSignal
): Promise<Response> {
  const hdr = {
    ...toHeaderObj(headers),
    Accept: "text/event-stream",
    "Content-Type": "application/json",
  };
  return fetch(endpoint(threadId), {
    method: "POST",
    headers: hdr,
    body: JSON.stringify({ message: content }),
    signal,
    credentials: "include",
    cache: "no-store",
  });
}

export async function* streamMessage(opts: {
  endpoint: (id: string) => string;
  threadId: string;
  content: string;
  signal: AbortSignal;
  getHeaders: () => Promise<HeadersInit>;
}): AsyncGenerator<ChatEvent, void, unknown> {
  const headers = await opts.getHeaders();
  const res = await streamChat(
    opts.endpoint,
    opts.threadId,
    headers,
    opts.content,
    opts.signal
  );
  if (!res.ok || !res.body)
    throw new Error(await res.text().catch(() => "stream failed"));

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buf = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buf += decoder.decode(value, { stream: true });
      const frames = buf.split(/\r?\n\r?\n/);
      buf = frames.pop() ?? "";

      for (const f of frames) {
        const data = f
          .split(/\r?\n/)
          .filter((l) => l.startsWith("data:"))
          .map((l) => l.slice(5).trim())
          .join("\n");
        if (!data || data === "[DONE]") continue;
        try {
          yield JSON.parse(data) as ChatEvent;
        } catch {
          /* ignore */
        }
      }
    }
  } finally {
    try {
      reader.releaseLock();
    } catch {}
  }
}

interface Deps {
  setIsGenerating: (v: boolean) => void;
  abortRef: React.RefObject<AbortController | null>;
  sendingRef: React.RefObject<boolean>;
  patch: (mut: (draft: ChatMessage[]) => void) => void;
  aIdxRef: React.RefObject<number | null>;
  toolIdxByIdRef: React.RefObject<Record<string, number>>;
}

export function createChatRuntime(deps: Deps) {
  const {
    setIsGenerating,
    abortRef,
    sendingRef,
    patch,
    aIdxRef,
    toolIdxByIdRef,
  } = deps;

  function beginFlight(): void {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setIsGenerating(true);
  }

  function endFlight(): void {
    setIsGenerating(false);
    abortRef.current = null;
    sendingRef.current = false;
  }

  function pushUserMessage(content: string): void {
    patch((d) => d.push({ id: crypto.randomUUID(), role: "user", content }));
  }

  function seedAssistantShell(): void {
    patch((d) => {
      d.push({
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        tools: [],
      });
      aIdxRef.current = d.length - 1;
      toolIdxByIdRef.current = {};
    });
  }

  function applyToken(text: string): void {
    const aIdx = aIdxRef.current;
    if (aIdx == null || !text) return;
    patch((d) => {
      d[aIdx] = { ...d[aIdx], content: d[aIdx].content + text };
    });
  }

  function applyToolCall(id: string, name: string, args: unknown): void {
    const aIdx = aIdxRef.current;
    if (aIdx == null || !id || !name) return;
    patch((d) => {
      const tools = d[aIdx].tools ?? [];
      tools.push({ id, name, state: "input-available", input: args });
      d[aIdx] = { ...d[aIdx], tools };
      toolIdxByIdRef.current[id] = tools.length - 1;
    });
  }

  function applyToolResult(id: string, content: unknown): void {
    const aIdx = aIdxRef.current;
    if (aIdx == null || !id) return;
    patch((d) => {
      const tools = d[aIdx].tools ?? [];
      const i = toolIdxByIdRef.current[id];
      if (i == null || tools[i] == null) return;
      tools[i] = { ...tools[i], state: "output-available", output: content };
      d[aIdx] = { ...d[aIdx], tools: [...tools] };
    });
  }

  function applyToolError(id: string, errorText: string): void {
    const aIdx = aIdxRef.current;
    if (aIdx == null || !id) return;
    patch((d) => {
      const tools = d[aIdx].tools ?? [];
      const i = toolIdxByIdRef.current[id];
      if (i == null || tools[i] == null) return;
      tools[i] = { ...tools[i], state: "output-error", errorText };
      d[aIdx] = { ...d[aIdx], tools: [...tools] };
    });
  }

  function handleChatEvent(evt: ChatEvent): void {
    const kind = (evt as any)?.event as ChatEvent["event"];
    if (kind === "token") return applyToken((evt as any).text ?? "");
    if (kind === "tool_call")
      return applyToolCall(
        (evt as any).id || "",
        (evt as any).tool || "",
        (evt as any).args ?? {}
      );
    if (kind === "tool_result")
      return applyToolResult((evt as any).id || "", (evt as any).content);
    if (kind === "tool_error")
      return applyToolError(
        (evt as any).id || "",
        (evt as any).error ?? "error"
      );
  }

  return {
    beginFlight,
    endFlight,
    pushUserMessage,
    seedAssistantShell,
    handleChatEvent,
  };
}

export function safeStringify(v: unknown) {
  try {
    const seen = new WeakSet();
    return JSON.stringify(
      v,
      (_k, val) => {
        if (typeof val === "object" && val !== null) {
          if (seen.has(val as object)) return "[Circular]";
          seen.add(val as object);
        }
        return val;
      },
      2
    );
  } catch {
    try {
      return String(v);
    } catch {
      return "[Unserializable]";
    }
  }
}

export function humanize(name: string) {
  if (!name) return "Tool";
  return name.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
