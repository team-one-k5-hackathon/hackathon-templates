// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use server"

import { AzureOpenAI } from "openai"
import { z } from "zod"

import { LLMProps } from "@/types/llm"
import { extractSchemaStructure } from "@/types/schema"

import type { LLMResponse, Message } from "./chat"

const azureOpenai = new AzureOpenAI({
  endpoint: process.env.AZURE_OPENAI_ENDPOINT!,
  apiKey: process.env.AZURE_OPENAI_API_KEY!,
  apiVersion: process.env.AZURE_OPENAI_API_VERSION!,
  deployment: "gpt-4o",
})

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

const ChatResponseZod = z.object({
  response: z
    .array(
      z.object({
        type: z.string().describe("The name of the widget to use"),
        props: z
          .record(z.any())
          .describe("The properties to be passed into the widget"),
      })
    )
    .describe(
      "The array can contain 1 or multiple elements, as many as need to respond to the user request"
    ),
})

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
          {
            date: 2021,
            value: 1234.12,
          },
          {
            date: 2022,
            value: 134.5,
          },
        ],
        xAxis: {
          key: "date",
          label: "Year",
        },
        yAxis: {
          key: "value",
          label: "Visitors",
        },
        lineType: "natural",
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
  // Process messages history
  const history = messages
    ? JSON.stringify(messages.slice(0, -1), null, 2)
    : "No messages provided"
  const message = messages
    ? JSON.stringify(messages?.at(-1)?.content)
    : "No user message provided"

  return `
----------------
INSTRUCTIONS

${instructions ?? "No instructions provided"}

----------------
WIDGETS

*******
Available Widgets

Find a list of widgets that can be used to display information, each widget is defined according to function_call schema from OpenAI.
To display widget data, respond with an entry in the JSON response object containing the widget name and the function call arguments.

${widgets ? JSON.stringify(widgets?.map((widget) => widget.functionCall)) : "No widgets provided"}

*******
Widgets Usage Example

Here an example of how the widget can be rendered by returning widget props in the JSON response

${
  widgets && widgets[0]?.example
    ? JSON.stringify({
        type: widgets[0].functionCall.name,
        props: widgets[0].example,
      })
    : "No example provided"
}

----------------
CHAT HISTORY

${history ?? "No chat history provided"}

----------------
DATA

${data ?? "No data provided"}

----------------
USER QUESTION

${message ?? "No user question provided"}

----------------
JSON STRUCTURE

${JSON.stringify(extractSchemaStructure(ChatResponseZod))}

----------------
EXAMPLE OUTPUT
    
${JSON.stringify(CHAT_RESPONSE_EXAMPLE) ?? "No example provided"}

----------------
IMPORTANT
    
Return only the JSON structure with no additional explanation. Ensure the response is a valid JSON object without any markdown formatting or code blocks.
`
}

export async function chatCompletionWrapper({
  instructions,
  data,
  messages,
  widgets,
}: ChatCompletionWrapperProps): Promise<LLMResponse> {
  try {
    // Prompt
    const prompt = createPrompt({
      instructions: instructions,
      data: data,
      widgets: widgets,
      messages: messages,
    })
    console.log(prompt)

    // Prompt
    const completion = await azureOpenai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    })

    const content = completion.choices[0].message?.content

    if (!content) {
      return {
        response: [
          {
            type: "text",
            props: {
              value:
                "Entschuldigung, ich konnte keine passende Antwort generieren.",
            },
          },
        ],
      }
    }
    return JSON.parse(content)
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
