// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use server"

import { LLMProps } from "@/types/llm"
import type { LLMResponse, Message } from "@/components/blocks/chat"
import { chatCompletionWrapper } from "@/components/blocks/chat-server"

interface ChatCompletionProps {
  data: string | null
  messages: Message[]
  widgets?: LLMProps[]
}

export async function chatCompletion({
  messages,
  data,
  widgets,
}: ChatCompletionProps): Promise<LLMResponse> {
  // Constants
  const instructions =
    "You are an e-commerce analytics assistant. The user is viewing a dashboard for an online retail store. You have access to monthly data including visits, revenue, orders, returns, conversion rate, and average order value, as well as breakdowns by channel and product category. Answer questions concisely based on the data provided. Use chart widgets to visualise comparisons or trends whenever that would be clearer than text alone."

  try {
    // Stringify
    const dataJson = data ? data : "No data provided"

    // Completion
    return await chatCompletionWrapper({
      instructions: instructions,
      data: dataJson,
      messages: messages,
      widgets: widgets,
    })
  } catch (error) {
    console.error("Error processing message:", error)
    return {
      response: [
        {
          type: "text",
          props: {
            value:
              "Es tut mir leid, es gab einen Fehler bei der Verarbeitung deiner Anfrage.",
          },
        },
      ],
    }
  }
}
