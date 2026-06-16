// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import * as React from "react"

export function defaultXLabelFormatter(
  value: number | string | Date,
  idx: number
) {
  if (value instanceof Date) {
    return value.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }
  if (typeof value === "number") {
    return value.toString()
  }
  return value
}

interface AreaGradientProps {
  id: string
  color?: string
  topColor?: string
  bottomColor?: string
}

export function AreaGradient(props: AreaGradientProps) {
  const { id, color, topColor, bottomColor } = props

  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={color || topColor} stopOpacity={0.8} />
      <stop offset="95%" stopColor={color || bottomColor} stopOpacity={0.2} />
    </linearGradient>
  )
}
