// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import React from "react"

import type { IWidget } from "@/types/llm"
import { parseTextWithLinks } from "@/lib/text"

interface TextProps {
  text: string
}

const TextWidget: IWidget<TextProps> = ({ text }) => {
  return <p className="whitespace-pre-wrap">{parseTextWithLinks(text)}</p>
}

TextWidget.llm = {
  functionCall: {
    name: "text",
    description: "A widget to display simple text",
    parameters: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description:
            "The text to show, can be a simple string or also markdown format",
        },
      },
      required: ["text"],
    },
  },
  example: {
    text: "I want to display a text with a link to [Google](https://www.google.com]",
  },
}

export { TextWidget }
