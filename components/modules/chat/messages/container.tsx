import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response as AIResponse } from "@/components/ai-elements/response";
import { ToolCard } from "@/components/modules/chat/tools/tool-card";
import { ChatMessage } from "services/api/types";

interface Props {
  messages: ChatMessage[];
}

export function MessagesContainer({ messages }: Props) {
  return (
    <section className="flex flex-col w-full flex-1 min-h-0 overflow-hidden px-10">
      <Conversation>
        <ConversationContent>
          {messages?.map((m) => (
            <Message from={m.role} key={m.id}>
              <MessageContent className="!text-green-50">
                {m.role === "assistant" && m.tools?.length ? (
                  <div className="flex flex-col gap-2 mb-2">
                    {m.tools.map((t) => (
                      <ToolCard key={t.id} t={t} />
                    ))}
                  </div>
                ) : null}
                <AIResponse className="text-green-50">{m.content}</AIResponse>
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </section>
  );
}
