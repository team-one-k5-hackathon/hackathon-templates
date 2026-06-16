// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use server"

import { createAnthropic } from "@ai-sdk/anthropic"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createOpenAI } from "@ai-sdk/openai"
import { generateText, jsonSchema, Output, type LanguageModel } from "ai"

import { LLMProps } from "@/types/llm"
import type { LLMResponse, Message } from "./chat"

function getModel(): LanguageModel {
  const provider = process.env.AI_PROVIDER ?? "azure"

  switch (provider) {
    case "azure": {
      const azure = createOpenAI({
        baseURL: `${process.env.AZURE_OPENAI_ENDPOINT?.replace(/\/$/, "")}/openai/v1/`,
        apiKey: process.env.AZURE_OPENAI_API_KEY!,
      })
      return azure(process.env.AZURE_OPENAI_DEPLOYMENT ?? "gpt-4o-mini")
    }
    case "openai": {
      const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY! })
      return openai(process.env.AI_MODEL ?? "gpt-5.4-mini")
    }
    case "anthropic": {
      const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
      return anthropic(process.env.AI_MODEL ?? "claude-haiku-4-5-20251001")
    }
    case "google": {
      const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY! })
      return google(process.env.AI_MODEL ?? "gemini-3.1-flash-lite")
    }
    default:
      throw new Error(`Unknown AI_PROVIDER: "${provider}". Use azure, openai, anthropic, or google.`)
  }
}

export interface ChatCompletionWrapperProps {
  instructions: string
  data: string | null
  messages: Message[]
  widgets?: LLMProps[]
}

interface PromptProps {
  instructions?: string | null
  data?: string | null
  messages: Message[]
  widgets?: LLMProps[]
}

function buildResponseSchema(widgets: LLMProps[]) {
  const itemSchemas = widgets.map((widget) => ({
    type: "object" as const,
    properties: {
      type: { type: "string" as const, enum: [widget.functionCall.name] },
      props: widget.functionCall.parameters,
    },
    required: ["type", "props"],
  }))

  return jsonSchema<LLMResponse>({
    type: "object",
    properties: {
      response: {
        type: "array",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: { anyOf: itemSchemas } as any,
        minItems: 1,
        description: "One or more response elements. Always populate this array — never return it empty.",
      },
    },
    required: ["response"],
  })
}

const CHAT_RESPONSE_EXAMPLE = {
  response: [
    {
      type: "text",
      props: {
        text: "In this text I either provide the only text response or context on the other widgets",
      },
    },
    {
      type: "area_chart",
      props: {
        title: "Chart title",
        description: "Chart short description or key value to highlight",
        data: [
          { x: "2021", y: 1234.12 },
          { x: "2022", y: 134.5 },
        ],
        xAxis: { key: "date", label: "Year" },
        yAxis: { key: "value", label: "Visitors" },
        lineType: "natural",
        aspectRatio: "4",
      },
    },
    {
      type: "text",
      props: {
        text: "I finally conclude my response by providing additional context if necessary",
      },
    },
  ],
}

function createPrompt({ instructions, data, widgets, messages }: PromptProps) {
  const history = messages
    ? JSON.stringify(messages.slice(0, -1), null)
    : "No messages provided"
  const message = messages
    ? JSON.stringify(messages?.at(-1)?.content)
    : "No user message provided"

  return `
----------------
CURRENT DATE & TIME

${new Date().toISOString()}

----------------
TASK

Answer the user's question by populating the "response" array with one or more items.
Each item must have a "type" matching one of the available widgets below, and "props" matching that widget's schema.
Always include at least one item — never return an empty response array.

----------------
INSTRUCTIONS

${instructions ?? "No instructions provided"}

----------------
AVAILABLE WIDGETS

${widgets ? JSON.stringify(widgets.map((widget) => widget.functionCall)) : "No widgets provided"}

----------------
CHAT HISTORY

${history ?? "No chat history provided"}

----------------
DATA

${data ?? "No data provided"}

----------------
USER QUESTION

${message ?? "No user message provided"}

----------------
EXAMPLE OUTPUT (follow this structure)

${JSON.stringify(CHAT_RESPONSE_EXAMPLE)}
`
}

export async function chatCompletionWrapper({
  instructions,
  data,
  messages,
  widgets,
}: ChatCompletionWrapperProps): Promise<LLMResponse> {
  try {
    const prompt = createPrompt({ instructions, data, widgets, messages })

    const { output: object } = await generateText({
      model: getModel(),
      output: Output.object({ schema: buildResponseSchema(widgets ?? []) }),
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    })

    return object as LLMResponse
  } catch (error) {
    console.error("Error processing message:", error)
    return {
      response: [
        {
          type: "text",
          props: { text: "Sorry, there was an error processing your request." },
        },
      ],
    }
  }
}
