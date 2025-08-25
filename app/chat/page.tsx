/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { ChatInput } from "@/components/modules/chat/input";
import { MessagesContainer } from "@/components/modules/chat/messages/container";
import { createChatRuntime, streamMessage } from "@/lib/chat/stream";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiService } from "services/api";
import { ChatMessage } from "services/api/types";
import { STREAM_EP, THREAD_EP } from "utils/constants";

export default function ChatPage() {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [value, setValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const initRef = useRef(false);
  const sendingRef = useRef(false);

  // current assistant message index
  const aIdxRef = useRef<number | null>(null);
  // tool id -> index map for current assistant message
  const toolIdxByIdRef = useRef<Record<string, number>>({});

  const runtime = useMemo(
    () =>
      createChatRuntime({
        setIsGenerating,
        abortRef,
        sendingRef,
        patch,
        aIdxRef,
        toolIdxByIdRef,
      }),
    [setIsGenerating, patch]
  );

  async function getAccessToken(): Promise<string | null> {
    try {
      const data = await apiService.getAccessToken({
        credentials: "include",
        cache: "no-store",
      });
      return data.accessToken;
    } catch {
      return null;
    }
  }

  async function authHeaders(): Promise<HeadersInit> {
    const t = await getAccessToken();
    console.log({ t });
    return t
      ? { "Content-Type": "application/json", Authorization: `Bearer ${t}` }
      : { "Content-Type": "application/json" };
  }

  // immutable patch helper
  function patch(mut: (draft: ChatMessage[]) => void) {
    setMessages((prev) => {
      const next = prev.map((m) => ({
        ...m,
        tools: m.tools ? [...m.tools] : undefined,
      }));
      mut(next);
      return next;
    });
  }

  const createThread = useCallback(async () => {
    try {
      const headers = await authHeaders();
      const r = await fetch(THREAD_EP, {
        method: "POST",
        headers,
        credentials: "include",
      });
      if (!r.ok) throw new Error("Failed to create thread");
      const d: { thread_id: string } = await r.json();
      setThreadId(d.thread_id);
    } catch (e) {
      console.error(e);
    }
  }, []);

  async function handleSend(text?: string) {
    if (sendingRef.current) return;
    sendingRef.current = true;

    try {
      const content = (text ?? value).trim();
      if (!content || !threadId) return;

      runtime.beginFlight();
      runtime.pushUserMessage(content);
      setValue("");
      runtime.seedAssistantShell();

      for await (const evt of streamMessage({
        endpoint: STREAM_EP,
        threadId,
        content,
        signal: abortRef.current!.signal,
        getHeaders: authHeaders,
      })) {
        runtime.handleChatEvent(evt);
      }
    } finally {
      runtime.endFlight();
    }
  }

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    createThread();
  }, []);

  return (
    <div className="flex flex-col gap-5 h-full w-full overflow-hidden">
      <div className="w-full h-12 rounded-lg bg-gray-200 flex items-center px-10">
        <h3 className="font-bold text-md">Chat</h3>
      </div>
      <MessagesContainer messages={messages} />
      <div className="px-10 pb-4">
        <ChatInput
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          onSubmit={(e?: any) => {
            e?.preventDefault?.();
            handleSend();
          }}
          disabled={isGenerating}
        />
      </div>
    </div>
  );
}
