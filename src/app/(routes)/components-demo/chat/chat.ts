// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use server"

import type { LLMProps } from "@/types/llm"
import type { LLMResponse, Message } from "@/components/blocks/chat"
import { chatCompletionWrapper } from "@/components/blocks/chat-server"

interface ChatDemoCompletionProps {
  data: string | null
  messages: Message[]
  widgets?: LLMProps[]
}

export async function chatDemoCompletion({
  data,
  messages,
  widgets,
}: ChatDemoCompletionProps): Promise<LLMResponse> {
  return chatCompletionWrapper({
    instructions:
      data ??
      "You are a helpful general-purpose assistant. Answer concisely and use the available widgets to visualise data whenever it would be clearer than plain text.",
    data: null,
    messages,
    widgets,
  })
}
