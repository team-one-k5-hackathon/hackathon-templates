// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import { useCallback, useState } from "react"

import type { LLMProps } from "@/types/llm"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Chat } from "@/components/blocks/chat"
import type { LLMResponse, Message } from "@/components/blocks/chat"
import { AreaChartCard } from "@/components/charts/area-chart"
import { BarComparisonChart } from "@/components/charts/bar-comparison-chart"

import { chatDemoCompletion } from "./chat"

const DEFAULT_PROMPT =
  "You are a helpful general-purpose assistant. Answer concisely and use the available widgets to visualise data whenever it would be clearer than plain text."

export default function ChatDemoPage() {
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_PROMPT)

  const processMessages = useCallback(
    ({
      messages,
      data,
      widgets,
    }: {
      messages: Message[]
      data: string | null
      widgets?: LLMProps[]
    }): Promise<LLMResponse> =>
      chatDemoCompletion({ messages, data: systemPrompt, widgets }),
    [systemPrompt]
  )

  return (
    <div className="flex flex-col h-screen p-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Chat</h1>
        <p className="text-muted-foreground mt-1">
          AI chat component with support for text and chart widgets.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="system-prompt">System prompt</Label>
        <Textarea
          id="system-prompt"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          rows={3}
          className="resize-none font-mono text-sm"
        />
      </div>

      <div className="flex-1 border rounded-lg overflow-hidden">
        <Chat
          data={null}
          widgets={[AreaChartCard, BarComparisonChart]}
          processMessages={processMessages}
        />
      </div>
    </div>
  )
}
