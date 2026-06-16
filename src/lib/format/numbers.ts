// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}
