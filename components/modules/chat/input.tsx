"use client";
import {
  PromptInput,
  PromptInputProps,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ai-elements/prompt-input";

interface Props extends Omit<PromptInputProps, "onChange"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}
export function ChatInput({
  onChange,
  onSubmit,
  value,
  disabled,
  ...rest
}: Props) {
  return (
    <div className=" relative mt-auto w-full  ">
      <PromptInput
        onSubmit={onSubmit}
        className=" w-full max-w-full relative "
        {...rest}
      >
        <PromptInputTextarea
          onChange={onChange}
          value={value}
          placeholder="How can I help you stop smoking?"
        />
        <PromptInputToolbar>
          <PromptInputSubmit
            className="absolute right-1 bottom-1"
            disabled={disabled ?? false}
            status={"ready"}
          />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
}
