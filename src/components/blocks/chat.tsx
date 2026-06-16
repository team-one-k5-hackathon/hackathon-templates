// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"

import { AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"

import type { IWidget, LLMProps } from "@/types/llm"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { TextWidget } from "@/components/widgets/text"

interface Content {
  type: string
  props: object
}

export interface LLMResponse {
  response: Content[]
}

export interface Message {
  isUser: boolean
  content: Content[]
}

interface ChatProps<T> {
  data: T | null
  widgets?: IWidget<any>[]
  processMessages: ({
    messages,
    data,
    widgets,
  }: {
    messages: Message[]
    data: T | null
    widgets?: LLMProps[]
  }) => Promise<LLMResponse>
  onMessageCallback?: ({ messages }: { messages: Message[] }) => void
}

interface WidgetMap {
  [key: string]: IWidget<any>
}

const DEFAULT_WIDGETS = [TextWidget]

const simpleText = (value: string) => {
  return [
    {
      type: "text",
      props: {
        text: value,
      },
    },
  ]
}

export function Chat<T>({
  data,
  widgets,
  processMessages,
  onMessageCallback,
}: ChatProps<T>) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // Constants
  const singleLineHeight = 38
  const allWidgets = widgets
    ? [...DEFAULT_WIDGETS, ...widgets]
    : DEFAULT_WIDGETS
  const widgetsMap: WidgetMap = useMemo(() => {
    return allWidgets.reduce((map: WidgetMap, widget: IWidget<any>) => {
      if (widget?.llm?.functionCall?.name) {
        map[widget.llm.functionCall.name] = widget
      }
      return map
    }, {})
  }, [allWidgets])

  // This effect will scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current!.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Initialize textarea height
  useEffect(() => {
    if (textareaRef.current !== null) {
      textareaRef.current!.style.height = `${singleLineHeight}px`
    }
  }, [])

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current !== null) {
      const value = textareaRef.current!.value
      textareaRef.current!.style.height = `${singleLineHeight}px`
      if (value) {
        textareaRef.current!.style.height = `${textareaRef.current!.scrollHeight}px`
      }
    }
  }, [inputText])

  const handleSend = async () => {
    if (!inputText.trim() || isProcessing) return

    const userMessage = inputText.trim()
    setInputText("")
    setIsProcessing(true)

    try {
      // Add user message
      const updatedMessages = [
        ...messages,
        { isUser: true, content: simpleText(userMessage) },
      ]
      setMessages(updatedMessages)
      if (onMessageCallback) onMessageCallback({ messages: updatedMessages })

      // Get response from server
      const response = await processMessages({
        messages: updatedMessages,
        data: data,
        widgets: allWidgets.map((widget) => widget.llm) as LLMProps[],
      })

      // Add assistant response
      const finalMessages = [
        ...updatedMessages,
        { isUser: false, content: response.response },
      ]
      setMessages(finalMessages)
      if (onMessageCallback) onMessageCallback({ messages: finalMessages })
    } catch (error) {
      console.error("Error processing message:", error)
      const errorMessages = [
        ...messages,
        {
          isUser: true,
          content: simpleText(userMessage),
        },
        {
          isUser: false,
          content: simpleText(
            "Entschuldigung, es gab einen Fehler bei der Verarbeitung deiner Anfrage."
          ),
        },
      ] as Message[]
      setMessages(errorMessages)
      if (onMessageCallback) onMessageCallback({ messages: errorMessages })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Rendering functions
  const renderWidget = useMemo(
    () => (content: Content, idx: number) => {
      if (content.type in widgetsMap) {
        const WidgetElement = widgetsMap[content.type]
        return <WidgetElement key={idx} {...content.props} />
      } else {
        return `Widget '${content.type} not found`
      }
    },
    [widgetsMap]
  )

  const renderMessage = useMemo(
    () => (message: Message, idx: number) => {
      const contents = message.content
      return (
        <div
          key={idx}
          className={`rounded-lg px-4 py-4 flex flex-col gap-2
                    ${message.isUser ? "bg-primary text-primary-foreground self-end" : "bg-muted self-start"} 
                    ${contents.some((c) => c.type !== "text") ? "w-[80%]" : "max-w-[80%]"}`}
        >
          {contents.map((content, idx) => renderWidget(content, idx))}
        </div>
      )
    },
    [widgetsMap]
  )

  const renderMessages = useMemo(
    () => () => {
      return (
        <div className="flex flex-col w-full gap-4">
          {messages.map((message, index) => renderMessage(message, index))}
        </div>
      )
    },
    [widgetsMap, messages]
  )

  console.log("messages", messages)

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-4 w-full">
          <AnimatePresence>{renderMessages()}</AnimatePresence>
        </div>
        {/* This empty div serves as our scroll target */}
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="bg-background p-2">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            className="min-h-[38px] flex-1 overflow-hidden resize-none max-h-[200px]"
            placeholder="Wie kann ich Ihnen helfen?"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isProcessing}
            rows={1}
          />
          <Button onClick={handleSend} size="icon" disabled={isProcessing}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
