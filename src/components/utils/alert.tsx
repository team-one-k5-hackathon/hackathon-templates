// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

"use client"

import React from "react"

import { AlertCircle, Info, PartyPopper, TriangleAlert } from "lucide-react"
import { z } from "zod"

import {
  Alert as AlertBase,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const DEFAULT_ICONS = {
  success: <PartyPopper className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
  warning: <TriangleAlert className="h-4 w-4" />,
  error: <AlertCircle className="h-4 w-4" />,
}

const VARIANT_STYLES = {
  success: "bg-green-100 border-green-500 text-green-900",
  info: "",
  warning: "bg-yellow-100 border-yellow-500 text-yellow-900",
  error: "bg-red-100 border-red-500 text-red-900",
}

export interface AlertProps {
  type: "success" | "info" | "warning" | "error"
  icon?: React.ReactNode
  title: React.ReactNode
  content?: React.ReactNode
}

export function Alert({ type, icon, title, content }: AlertProps) {
  return (
    <AlertBase
      className={`${VARIANT_STYLES[type]} p-4 border-l-4 rounded-md flex items-start gap-2`}
    >
      {icon || DEFAULT_ICONS[type]}
      <div>
        <AlertTitle className="font-bold">{title}</AlertTitle>
        {content && <AlertDescription>{content}</AlertDescription>}
      </div>
    </AlertBase>
  )
}
