// Copyright (c) 2026. Sassalbo Ventures GmbH
// All rights reserved.

export function formatNumber(value: number, decimals: number = 0, locale?: string): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}
