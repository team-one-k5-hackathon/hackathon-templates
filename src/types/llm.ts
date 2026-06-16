// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import React from "react"

export interface FunctionCallProps {
  name: string
  description: string
  parameters: {
    type: string
    properties: object
    required?: string[]
  }
}

export interface LLMProps {
  functionCall: FunctionCallProps
  example?: object
}

interface LLMWidgetProps {
  llm: LLMProps
}

export type IWidget<P> = React.FC<P> & LLMWidgetProps
