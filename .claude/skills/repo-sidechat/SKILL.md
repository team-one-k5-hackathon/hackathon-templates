---
name: repo-sidechat
description: Reference for wiring up the AI side-chat panel in this hackathon repo. Use this skill whenever adding a chat panel to a new page, creating a route-specific server action for the chat, or building a custom widget that the LLM can render inline in the conversation.
---

# Repository Side-Chat Reference

The side-chat is a resizable panel where users can ask questions about the page's data. The LLM (Azure OpenAI `gpt-4o`) responds with structured JSON that the `Chat` component renders as text or inline chart widgets.

## Architecture

```
<Chat>                             src/components/blocks/chat.tsx
  └─ calls processMessages()  →   your route's server action  (e.g. src/app/(routes)/demo/chat.ts)
       └─ chatCompletionWrapper()  src/components/blocks/chat-server.ts
            └─ Azure OpenAI gpt-4o  (AZURE_OPENAI_* env vars)
```

The LLM always returns this JSON shape:

```json
{
  "response": [
    { "type": "text",       "props": { "text": "Here is the chart:" } },
    { "type": "area_chart", "props": { "title": "Revenue", "data": [...], "xAxis": {}, "yAxis": {}, "aspectRatio": "4" } }
  ]
}
```

Each `type` must match the `name` in a registered widget's `.llm.functionCall.name`.

---

## Adding chat to a page

### 1. Wrap your layout with ResizablePanelGroup

```tsx
// src/app/(routes)/my-route/page.tsx
"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Chat } from "@/components/blocks/chat"
import { AreaChartCard } from "@/components/charts/area-chart"
import { chatCompletion } from "./chat"

const DATA = JSON.stringify(myData)  // serialise whatever context the LLM needs

export default function Page() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full max-h-screen items-stretch">
      <ResizablePanel defaultSize={70} minSize={40}>
        {/* main page content */}
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="h-full p-4">
          <Chat<string>
            data={DATA}
            widgets={[AreaChartCard]}          // optional: extend beyond TextWidget
            processMessages={chatCompletion}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

### 2. Create the route's server action

```ts
// src/app/(routes)/my-route/chat.ts
"use server"

import type { LLMResponse, Message } from "@/components/blocks/chat"
import { chatCompletionWrapper } from "@/components/blocks/chat-server"
import type { LLMProps } from "@/types/llm"

export async function chatCompletion({
  messages,
  data,
  widgets,
}: {
  messages: Message[]
  data: string | null
  widgets?: LLMProps[]
}): Promise<LLMResponse> {
  return chatCompletionWrapper({
    instructions: "You are an assistant for...",  // describe the context and tone
    data: data ?? "No data provided",
    messages,
    widgets,
  })
}
```

---

## Chat component props

| Prop | Type | Description |
|---|---|---|
| `data` | `T \| null` | Serialised context passed verbatim to the LLM prompt |
| `processMessages` | `async fn` | Server action that calls `chatCompletionWrapper` |
| `widgets` | `IWidget[]` | Optional extra widgets beyond the built-in `TextWidget` |
| `onMessageCallback` | `fn` | Optional — called after each message with the full history |

`TextWidget` (renders plain text) is always registered. Pass additional widgets in `widgets` to make them available to the LLM.

---

## Built-in widgets

| Widget | LLM name | Import |
|---|---|---|
| `TextWidget` | `text` | built-in, always registered |
| `AreaChartCard` | `area_chart` | `@/components/charts/area-chart` |
| `BarComparisonChart` | `bar_chart` | `@/components/charts/bar-comparison-chart` |

---

## Creating a custom widget

A widget is a React component with a static `.llm` property that describes it to the LLM.

```ts
// src/components/widgets/my-widget.tsx
import type { IWidget } from "@/types/llm"

interface MyWidgetProps {
  label: string
  value: number
}

const MyWidget: IWidget<MyWidgetProps> = ({ label, value }) => (
  <div className="rounded border p-3">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
)

MyWidget.llm = {
  functionCall: {
    name: "my_widget",                  // LLM uses this name to call the widget
    description: "Displays a single KPI value with a label.",
    parameters: {
      type: "object",
      properties: {
        label: { type: "string", description: "The metric name" },
        value: { type: "number", description: "The numeric value to display" },
      },
      required: ["label", "value"],
    },
  },
  example: { label: "Revenue", value: 42000 },  // shown to LLM as a usage example
}

export { MyWidget }
```

Then register it on the page:

```tsx
<Chat widgets={[MyWidget, AreaChartCard]} ... />
```

The `Chat` component automatically tells the LLM about every registered widget and maps response types to the correct component at render time.

---

## Tips

- Keep `data` focused — only pass what the LLM needs to answer questions about the page. Serialise with `JSON.stringify(myData)`.
- For chart widgets inside the chat panel, use `aspectRatio="4"` (wider = more legible in the narrow panel).
- The `instructions` string in your server action is the main lever for controlling tone and behaviour — describe the domain, what data is available, and how the LLM should respond.
- Add `export const maxDuration = 60` to your page file to avoid Next.js function timeouts on slow completions.
