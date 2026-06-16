// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

import React from "react"

export const formatPercentage = (value: number) => {
  return (
    <span className={value >= 0 ? "text-green-600" : "text-red-600"}>
      {value ? (value * 100)?.toFixed(1) : null}
    </span>
  )
}
