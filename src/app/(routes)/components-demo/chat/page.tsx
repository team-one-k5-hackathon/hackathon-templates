// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import { useCallback, useMemo, useState } from "react"
import { AreaChart, BarChart2, Check, Type } from "lucide-react"

import type { IWidget } from "@/types/llm"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Textarea } from "@/components/ui/textarea"
import { Chat } from "@/components/blocks/chat"
import type { LLMResponse, Message } from "@/components/blocks/chat"
import { AreaChartCard } from "@/components/charts/area-chart"
import { BarComparisonChart } from "@/components/charts/bar-comparison-chart"

import { chatDemoCompletion } from "./chat"

const DEFAULT_PROMPT =
  "You are a helpful general-purpose assistant. Answer concisely and use the available widgets to visualise data whenever it would be clearer than plain text."

const AVAILABLE_WIDGETS: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  widget: IWidget<any>
  label: string
  description: string
  icon: React.ElementType
}[] = [
  {
    widget: AreaChartCard,
    label: "Area Chart",
    description: AreaChartCard.llm.functionCall.name,
    icon: AreaChart,
  },
  {
    widget: BarComparisonChart,
    label: "Bar Chart",
    description: BarComparisonChart.llm.functionCall.name,
    icon: BarChart2,
  },
]

export default function ChatDemoPage() {
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_PROMPT)
  const [enabledWidgets, setEnabledWidgets] = useState<Set<string>>(
    () => new Set(AVAILABLE_WIDGETS.map((w) => w.description))
  )

  const selectedWidgets = useMemo(
    () =>
      AVAILABLE_WIDGETS.filter((w) => enabledWidgets.has(w.description)).map(
        (w) => w.widget
      ),
    [enabledWidgets]
  )

  const toggleWidget = (name: string) =>
    setEnabledWidgets((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })

  const processMessages = useCallback(
    ({
      messages,
      data,
      widgets,
    }: {
      messages: Message[]
      data: string | null
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      widgets?: IWidget<any>[]
    }): Promise<LLMResponse> =>
      chatDemoCompletion({
        messages,
        data: systemPrompt,
        widgets: widgets?.map((w) => w.llm!).filter(Boolean),
      }),
    [systemPrompt]
  )

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full max-h-screen items-stretch"
    >
      <ResizablePanel defaultSize={70} minSize={40}>
        <div className="h-full flex flex-col p-4 gap-4">
          <h1 className="text-2xl font-bold">Chat</h1>
          <div className="flex-1 overflow-hidden">
          <Chat
            data={null}
            widgets={selectedWidgets}
            processMessages={processMessages}
          />
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="h-full overflow-auto p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              AI chat component with support for text and chart widgets.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="system-prompt" className="text-sm font-semibold">System prompt</Label>
            <Textarea
              id="system-prompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={6}
              className="resize-none font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">Widgets</Label>
            <div className="flex flex-wrap gap-2">
              {/* Text widget — always on */}
              <div className="flex items-center gap-2.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 cursor-not-allowed select-none">
                <Type className="size-4 text-primary/60" />
                <span className="text-sm font-medium text-primary/60">Text</span>
              </div>

              {AVAILABLE_WIDGETS.map(({ label, description, icon: Icon }) => {
                const selected = enabledWidgets.has(description)
                return (
                  <button
                    key={description}
                    type="button"
                    onClick={() => toggleWidget(description)}
                    className={cn(
                      "relative flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors",
                      selected
                        ? "border-primary/40 bg-primary/8 text-foreground"
                        : "border-border bg-background text-muted-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className={cn("size-4", selected ? "text-primary" : "text-muted-foreground")} />
                    <span className="text-sm font-medium">{label}</span>
                    {selected && (
                      <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary">
                        <Check className="size-2.5 text-primary-foreground" strokeWidth={3} />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
